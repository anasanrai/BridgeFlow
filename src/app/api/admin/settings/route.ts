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

        // Try to create the table if it doesn't exist
        try {
            await sb.rpc("exec_sql", {
                sql: `CREATE TABLE IF NOT EXISTS site_settings (
                    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                    primary_ai_model text DEFAULT 'modal-glm5',
                    maintenance_mode boolean DEFAULT false,
                    social_links jsonb DEFAULT '[]'::jsonb,
                    affiliate_links jsonb DEFAULT '[]'::jsonb,
                    created_at timestamptz DEFAULT now(),
                    updated_at timestamptz DEFAULT now()
                )`
            });
        } catch { /* RPC might not exist, that's ok */ }

        // Try upsert — first check if any row exists
        const { data: existing } = await sb.from("site_settings").select("id").limit(1).single();

        let result;
        if (existing?.id) {
            // Update existing row
            result = await sb
                .from("site_settings")
                .update({ ...body, updated_at: new Date().toISOString() })
                .eq("id", existing.id)
                .select()
                .single();
        } else {
            // Insert new row
            result = await sb
                .from("site_settings")
                .insert(body)
                .select()
                .single();
        }

        if (result.error) {
            return NextResponse.json({ error: result.error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data: result.data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
