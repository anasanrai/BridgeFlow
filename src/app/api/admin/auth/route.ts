import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "bridgeflow-admin-secret-change-me"
);

export async function POST(req: NextRequest) {
    try {
        const { password } = await req.json();
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            return NextResponse.json(
                { error: "Admin password not configured. Set ADMIN_PASSWORD in .env.local" },
                { status: 500 }
            );
        }

        if (password !== adminPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

        // Generate JWT
        const token = await new SignJWT({ role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(secret);

        const response = NextResponse.json({ success: true });
        response.cookies.set("admin-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        return response;
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("admin-token");
    return response;
}

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("admin-token")?.value;
        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        await jwtVerify(token, secret);
        return NextResponse.json({ authenticated: true });
    } catch {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
