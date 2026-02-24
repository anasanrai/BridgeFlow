import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "bridgeflow-admin-secret-change-me"
);

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Only protect admin routes (except login page and auth API)
    if (!pathname.startsWith("/admin")) return NextResponse.next();
    if (pathname === "/admin" || pathname === "/admin/") return NextResponse.next();
    if (pathname.startsWith("/api/admin/auth")) return NextResponse.next();

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
    matcher: ["/admin/:path+", "/api/admin/:path+"],
};
