import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { event_type, path, session_id, referrer, data } = body;

        const sb = getSupabase();
        const userAgent = req.headers.get("user-agent") || "unknown";

        const { error } = await sb.from("telemetry").insert({
            event_type,
            path,
            session_id,
            referrer,
            user_agent: userAgent,
            data: data || {},
        });

        if (error) {
            // If table is missing or other DB error, log it but don't break the frontend
            console.error("Telemetry DB Error:", error.message);
            return NextResponse.json({ success: false, message: "Telemetry logged to console only" }, { status: 202 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Telemetry Route Exception:", error.message);
        // Fallback to 202 to avoid blocking the client
        return NextResponse.json({ error: "Telemetry failed gracefully" }, { status: 202 });
    }
}
