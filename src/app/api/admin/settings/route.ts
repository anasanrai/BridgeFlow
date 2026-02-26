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
                maintenance_mode: false,
                social_links: [],
                affiliate_links: [],
                smtp_host: "smtp.hostinger.com",
                smtp_port: "465",
                from_email: "hello@bridgeflow.agency"
            });
        }

        // Ensure arrays exist for new columns in existing row
        return NextResponse.json({
            ...data,
            social_links: data.social_links || [],
            affiliate_links: data.affiliate_links || []
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const sb = getAdminClient();
        if (!sb) return NextResponse.json({ error: "No DB" }, { status: 500 });

        // Try to create/update the table if it doesn't exist or is missing columns
        try {
            await sb.rpc("exec_sql", {
                sql: `
                CREATE TABLE IF NOT EXISTS site_settings (
                    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                    primary_ai_model text DEFAULT 'modal-glm5',
                    maintenance_mode boolean DEFAULT false,
                    social_links jsonb DEFAULT '[]'::jsonb,
                    affiliate_links jsonb DEFAULT '[]'::jsonb,
                    smtp_host text,
                    smtp_port text,
                    smtp_user text,
                    smtp_pass text,
                    from_email text,
                    created_at timestamptz DEFAULT now(),
                    updated_at timestamptz DEFAULT now()
                );
                
                -- Ensure columns exist if table was already created
                DO $$ 
                BEGIN 
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='site_settings' AND column_name='social_links') THEN
                        ALTER TABLE site_settings ADD COLUMN social_links jsonb DEFAULT '[]'::jsonb;
                    END IF;
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='site_settings' AND column_name='affiliate_links') THEN
                        ALTER TABLE site_settings ADD COLUMN affiliate_links jsonb DEFAULT '[]'::jsonb;
                    END IF;
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='site_settings' AND column_name='smtp_host') THEN
                        ALTER TABLE site_settings ADD COLUMN smtp_host text, 
                                          ADD COLUMN smtp_port text,
                                          ADD COLUMN smtp_user text,
                                          ADD COLUMN smtp_pass text,
                                          ADD COLUMN from_email text;
                    END IF;
                END $$;`
            });
        } catch (e) { console.error("DDL Error:", e); }

        // Try upsert — first check if any row exists
        const { data: existing } = await sb.from("site_settings").select("id").limit(1);
        const existingRow = existing && existing[0];

        let result;
        if (existingRow?.id) {
            // Update existing row
            result = await sb
                .from("site_settings")
                .update({ ...body, updated_at: new Date().toISOString() })
                .eq("id", existingRow.id)
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
