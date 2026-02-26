import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "bridgeflow-admin-secret-change-me"
);

// --- Rate limiting ---
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 60; // max requests per window

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimit.get(ip);
    if (!record || now > record.resetTime) {
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }
    record.count++;
    return record.count > RATE_LIMIT_MAX;
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // --- Rate limit all API routes ---
    if (pathname.startsWith("/api/")) {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }
    }

    // Only protect admin routes (except login page and auth API)
    if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
        return NextResponse.next();
    }
    if (pathname === "/admin" || pathname === "/admin/") return NextResponse.next();
    if (pathname.startsWith("/api/admin/auth")) return NextResponse.next();
    if (pathname === "/api/admin/migrate") return NextResponse.next();

    // Check for admin API routes
    if (pathname.startsWith("/api/admin")) {
        const token = req.cookies.get("admin-token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        try {
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    // Check for admin pages
    const token = req.cookies.get("admin-token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    try {
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/admin", req.url));
    }
}

export const config = {
    matcher: ["/admin/:path+", "/api/:path+"],
};
