import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

// GET — list all purchases/transactions
export async function GET() {
    try {
        const sb = getAdminClient();
        if (!sb) {
            return NextResponse.json({ ok: false, error: "No Supabase connection" }, { status: 500 });
        }

        const { data, error } = await sb
            .from("purchases")
            .select(`
                *,
                templates:template_id (name, slug)
            `)
            .order("created_at", { ascending: false });

        if (error) throw error;

        return NextResponse.json({ ok: true, purchases: data || [] });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}

// DELETE — remove a purchase record (admin only)
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ ok: false, error: "Missing ID" }, { status: 400 });

        const sb = getAdminClient();
        if (!sb) return NextResponse.json({ ok: false, error: "No Supabase connection" }, { status: 500 });

        const { error } = await sb.from("purchases").delete().eq("id", id);
        if (error) throw error;

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}
