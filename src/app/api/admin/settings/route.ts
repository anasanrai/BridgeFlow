import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

export async function GET() {
    try {
        const sb = getAdminClient();
        if (!sb) return NextResponse.json({ error: "No DB" }, { status: 500 });

        const { data, error } = await sb.from("site_settings").select("*").limit(1).single();
        if (error || !data) {
            // Return defaults if not configured
            return NextResponse.json({
                primary_ai_model: "modal-glm5",
                maintenance_mode: false
            });
        }
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const sb = getAdminClient();
        if (!sb) return NextResponse.json({ error: "No DB" }, { status: 500 });

        // Update the single row
        const { data, error } = await sb
            .from("site_settings")
            .update(body)
            .neq("id", "00000000-0000-0000-0000-000000000000") // forces an update on all rows, but there should only be one
            .select()
            .single();

        // If no rows, we might need to insert
        if (error) {
            const { data: newData, error: insertError } = await sb
                .from("site_settings")
                .insert(body)
                .select()
                .single();
            if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 });
            return NextResponse.json({ success: true, data: newData });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
