import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

// GET — list all purchases/transactions
export async function GET() {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const sb = createAdminClient();
        const { data, error } = await sb
            .from("purchases" as any)
            .select(`*, templates:template_id (name, slug)`)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return NextResponse.json({ ok: true, purchases: data || [] });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}

// DELETE — remove a purchase record
export async function DELETE(req: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ ok: false, error: "Missing ID" }, { status: 400 });

        const sb = createAdminClient();
        const { error } = await (sb.from("purchases" as any) as any).delete().eq("id", id);

        if (error) throw error;

        return NextResponse.json({ ok: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
