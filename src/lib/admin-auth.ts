import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getSecret(): Uint8Array {
    if (!process.env.JWT_SECRET) {
        throw new Error("FATAL: JWT_SECRET environment variable is not set. Admin authentication is unavailable.");
    }
    return new TextEncoder().encode(process.env.JWT_SECRET);
}

/**
 * Verifies the admin token from cookies.
 * Returns true if the token is valid, false otherwise.
 */
export async function verifyAdmin(): Promise<boolean> {
    try {
        const token = cookies().get("admin-token")?.value;
        if (!token) return false;
        const secret = getSecret();
        await jwtVerify(token, secret);
        return true;
    } catch {
        return false;
    }
}

/**
 * Returns a standard 401 Unauthorized response.
 */
export function unauthorizedResponse() {
    return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required." },
        { status: 401 }
    );
}

/**
 * Use at the top of every admin route handler.
 * Returns a 401 response if the request is not authenticated, or null if it is.
 *
 * Usage:
 *   const authError = await requireAdmin();
 *   if (authError) return authError;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
    const authenticated = await verifyAdmin();
    if (!authenticated) return unauthorizedResponse();
    return null;
}
