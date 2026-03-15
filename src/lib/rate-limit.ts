import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

let redis: Redis | null = null;

try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
    }
} catch (error) {
    console.warn("Failed to initialize Upstash Redis. Falling back to in-memory rate limiting.", error);
}

// Per-type config: requests allowed per window
const LIMITS = {
    "admin-auth": { requests: 5, windowMs: 60_000, windowStr: "1 m" as const },
    "api-public":  { requests: 60, windowMs: 60_000, windowStr: "1 m" as const },
    "api-global":  { requests: 100, windowMs: 10_000, windowStr: "10 s" as const },
} as const;

type LimitType = keyof typeof LIMITS;

// In-memory counters used when Redis is unavailable
const memoryCounters = new Map<string, { count: number; reset: number }>();

// Redis-backed limiters (lazy init)
const limiters: Partial<Record<LimitType, Ratelimit>> = {};

function getRateLimiter(type: LimitType): Ratelimit | null {
    if (!redis) return null;
    if (!limiters[type]) {
        const { requests, windowStr } = LIMITS[type];
        limiters[type] = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(requests, windowStr),
            analytics: true,
            prefix: `ratelimit:${type}`,
            ephemeralCache: new Map(),
        });
    }
    return limiters[type]!;
}

function checkMemoryLimit(
    key: string,
    type: LimitType
): { success: boolean; limit: number; remaining: number; reset: number } {
    const { requests, windowMs } = LIMITS[type];
    const now = Date.now();
    const entry = memoryCounters.get(key);

    if (!entry || now > entry.reset) {
        memoryCounters.set(key, { count: 1, reset: now + windowMs });
        return { success: true, limit: requests, remaining: requests - 1, reset: now + windowMs };
    }

    entry.count++;
    const remaining = requests - entry.count;
    return {
        success: remaining >= 0,
        limit: requests,
        remaining: Math.max(0, remaining),
        reset: entry.reset,
    };
}

/**
 * Check rate limit for an incoming request.
 * Uses Redis when available, in-memory store as fallback — never bypasses.
 */
export async function checkRateLimit(
    req: Request,
    type: LimitType = "api-global",
    ipFallback = "127.0.0.1"
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
    const ip =
        req.headers.get("x-real-ip") ||
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        ipFallback;

    const key = `${type}:${ip}`;

    if (redis) {
        const limiter = getRateLimiter(type);
        if (limiter) {
            try {
                const result = await limiter.limit(ip);
                return {
                    success: result.success,
                    limit: result.limit,
                    remaining: result.remaining,
                    reset: result.reset,
                };
            } catch (error) {
                console.warn(`Redis rate limit check failed for ${ip}. Using in-memory fallback.`, error);
            }
        }
    }

    // Always fall back to in-memory — never fail open
    return checkMemoryLimit(key, type);
}
