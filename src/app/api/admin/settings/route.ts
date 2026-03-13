import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

// GET — fetch admin settings
export async function GET() {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const sb = createAdminClient();

        const { data, error } = await sb.from("site_settings" as any).select("*").limit(1).single();
        if (error || !data) {
            return NextResponse.json({
                primary_ai_model: "openai",
                maintenance_mode: false,
                social_links: [],
                affiliate_links: [],
                live_demos: [],
                smtp_host: "",
                smtp_port: "465",
                from_email: "",
            });
        }

        const row = data as Record<string, unknown>;
        return NextResponse.json({
            ...row,
            social_links: row.social_links || [],
            affiliate_links: row.affiliate_links || [],
            live_demos: row.live_demos || [],
            custom_webhook_url: row.custom_webhook_url || "",
            custom_webhook_name: row.custom_webhook_name || "Custom Model",
            custom_webhook_enabled: row.custom_webhook_enabled || false,
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// POST / PUT — upsert admin settings
async function upsertSettings(body: Record<string, unknown>) {
    const sb = createAdminClient();

    const { data: existing } = await sb.from("site_settings" as any).select("id").limit(1);
    const existingRow = (existing as Array<{ id: string }> | null)?.[0];

    let result;
    if (existingRow?.id) {
        result = await (sb
            .from("site_settings" as any) as any)
            .update({ ...body, updated_at: new Date().toISOString() })
            .eq("id", existingRow.id)
            .select()
            .single();

    } else {
        result = await (sb
            .from("site_settings" as any) as any)
            .insert(body)
            .select()
            .single();

    }

    if (result.error) {
        return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.data });
}

export async function POST(req: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();
        return await upsertSettings(body);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();
        return await upsertSettings(body);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
