import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Create a single redis instance globally
let redis: Redis | null = null;
const useFallback = process.env.NODE_ENV === "development" || !process.env.UPSTASH_REDIS_REST_URL;

try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
    }
} catch (error) {
    console.warn("Failed to initialize Upstash Redis. Rate limiting will be bypassed or use local cache.", error);
}

// Simple in-memory fallback for rate limiting when Redis is down
class MemoryStore {
    private cache = new Map<string, { count: number; reset: number }>();
    async get(key: string) { return this.cache.get(key); }
    async set(key: string, val: any) { this.cache.set(key, val); }
    async incr(key: string) {
        const entry = this.cache.get(key) || { count: 0, reset: Date.now() + 10000 };
        entry.count++;
        this.cache.set(key, entry);
        return entry.count;
    }
}
const memoryStore = new MemoryStore();

// Global cached rate limiters
const limiters: Record<string, Ratelimit> = {};

/**
 * Get or create a rate limiter with a specific configuration
 * @param identifier Unique identifier for this limiter type (e.g. 'api-global', 'admin-auth')
 * @param requests Number of allowed requests
 * @param window Time window string (e.g. '10 s', '1 m')
 */
export function getRateLimiter(
    identifier: string,
    requests: number = 100,
    window: Parameters<typeof Ratelimit.slidingWindow>[1] = "10 s"
): Ratelimit | null {
    if (!redis) return null;

    if (!limiters[identifier]) {
        limiters[identifier] = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(requests, window),
            analytics: true,
            prefix: `ratelimit:${identifier}`,
            ephemeralCache: new Map(),
        });
    }

    return limiters[identifier];
}

/**
 * Standard utility to check rate limits across the app
 * Returns true if allowed, false if blocked
 */
export async function checkRateLimit(
    req: Request,
    type: "admin-auth" | "api-global" | "api-public" = "api-global",
    ipFallback: string = "127.0.0.1"
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
    if (!redis) return { success: true }; // Bypass if redis is not configured

    // Extract IP safely, accommodating Vercel and generic proxies
    const ip =
        req.headers.get("x-real-ip") ||
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        ipFallback;

    let limiter: Ratelimit | null = null;

    if (type === "admin-auth") {
        // Strict limit for admin authentication attempts: 5 requests per minute
        limiter = getRateLimiter("admin-auth", 5, "1 m");
    } else if (type === "api-public") {
        // Generous limit for public APIs: 60 requests per minute
        limiter = getRateLimiter("api-public", 60, "1 m");
    } else {
        // Default global API limit: 100 requests per 10 seconds
        limiter = getRateLimiter("api-global", 100, "10 s");
    }

    if (!limiter) return { success: true };

    try {
        const result = redis
            ? await limiter.limit(ip)
            : {
                success: true, // Fail open logic stays for Redis failure
                limit: type === "admin-auth" ? 5 : 100,
                remaining: (type === "admin-auth" ? 5 : 100) - (await memoryStore.incr(`${type}:${ip}`)),
                reset: Date.now() + 10000,
            };

        // If memoryStore exceeds local limit, actually block
        if (!redis && (result.remaining ?? 0) < 0) {
            result.success = false;
        }

        return {
            success: result.success,
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset,
        };
    } catch (error) {
        console.warn(`Rate limit check failed for ${ip}. Bypassing safely.`, error);
        return { success: true }; // Fail open to not block legit traffic if Upstash is down
    }
}
