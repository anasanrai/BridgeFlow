import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ── Supabase admin client (uses service role key for write access) ────────────
function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase env vars not set");
    return createClient(url, key);
}

// ── Local JSON fallback (read-only) ──────────────────────────────────────────
async function getLocalTemplates() {
    try {
        const data = await import("@/data/templates.json");
        return Array.isArray(data.default) ? data.default : [];
    } catch {
        return [];
    }
}

// GET — list all templates
export async function GET() {
    try {
        const sb = getAdminClient();
        const { data, error } = await sb
            .from("templates")
            .select("*")
            .order("order", { ascending: true });

        if (error) throw error;
        // Normalize all rows from snake_case DB columns → camelCase for the frontend
        return NextResponse.json({ ok: true, templates: (data || []).map(normalizeTemplate) });
    } catch {
        // Fallback to local JSON if Supabase unavailable
        const raw = await getLocalTemplates();
        // Local JSON already uses camelCase — pass through a normalizer to ensure consistency
        const templates = raw.map((t: Record<string, unknown>) => ({
            id: String(t.id),
            name: t.name,
            slug: t.slug,
            categories: t.categories,
            difficulty: t.difficulty,
            nodes: t.nodes,
            nodeCount: t.nodeCount,
            setupTime: t.setupTime,
            value: t.value,
            description: t.description,
            whatItDoes: t.whatItDoes,
            featured: t.featured,
            status: t.status,
            n8nWorkflowId: t.n8nWorkflowId,
            order: t.order,
            updatedAt: t.updatedAt,
            workflowJson: t.workflowJson ?? null,
        }));
        return NextResponse.json({ ok: true, templates });
    }
}

// POST — add new template
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const sb = getAdminClient();

        // Calculate next order number
        const { data: existing } = await sb
            .from("templates")
            .select("order")
            .order("order", { ascending: false })
            .limit(1);

        const nextOrder = existing && existing.length > 0 ? (existing[0].order || 0) + 1 : 1;

        const template = {
            name: body.name || "Untitled Template",
            slug: body.slug || body.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `template-${Date.now()}`,
            categories: body.categories || [],
            difficulty: body.difficulty || "Beginner",
            nodes: body.nodes || [],
            node_count: body.nodeCount || 0,
            setup_time: body.setupTime || "30 min",
            value: body.value || 0,
            description: body.description || "",
            what_it_does: body.whatItDoes || [],
            featured: body.featured || false,
            status: body.status || "draft",
            n8n_workflow_id: body.n8nWorkflowId || "",
            order: nextOrder,
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await sb
            .from("templates")
            .insert(template)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ ok: true, template: normalizeTemplate(data) });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}

// PUT — update existing template
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const sb = getAdminClient();

        const updatePayload: Record<string, unknown> = {
            updated_at: new Date().toISOString(),
        };

        // Map camelCase body fields to snake_case DB columns
        if (body.name !== undefined) updatePayload.name = body.name;
        if (body.slug !== undefined) updatePayload.slug = body.slug;
        if (body.categories !== undefined) updatePayload.categories = body.categories;
        if (body.difficulty !== undefined) updatePayload.difficulty = body.difficulty;
        if (body.nodes !== undefined) updatePayload.nodes = body.nodes;
        if (body.nodeCount !== undefined) updatePayload.node_count = body.nodeCount;
        if (body.setupTime !== undefined) updatePayload.setup_time = body.setupTime;
        if (body.value !== undefined) updatePayload.value = body.value;
        if (body.description !== undefined) updatePayload.description = body.description;
        if (body.whatItDoes !== undefined) updatePayload.what_it_does = body.whatItDoes;
        if (body.featured !== undefined) updatePayload.featured = body.featured;
        if (body.status !== undefined) updatePayload.status = body.status;
        if (body.n8nWorkflowId !== undefined) updatePayload.n8n_workflow_id = body.n8nWorkflowId;
        if (body.order !== undefined) updatePayload.order = body.order;

        const { data, error } = await sb
            .from("templates")
            .update(updatePayload)
            .eq("id", body.id)
            .select()
            .single();

        if (error) throw error;
        if (!data) {
            return NextResponse.json({ ok: false, error: "Template not found" }, { status: 404 });
        }

        return NextResponse.json({ ok: true, template: normalizeTemplate(data) });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}

// PATCH — reorder templates
export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { orderedIds } = body;

        if (!Array.isArray(orderedIds)) {
            return NextResponse.json({ ok: false, error: "orderedIds must be an array" }, { status: 400 });
        }

        const sb = getAdminClient();
        const updates = orderedIds.map((id: string, idx: number) =>
            sb.from("templates").update({ order: idx + 1 }).eq("id", id)
        );

        await Promise.all(updates);
        return NextResponse.json({ ok: true });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}

// DELETE — remove template
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
        }

        const sb = getAdminClient();
        const { error } = await sb.from("templates").delete().eq("id", id);
        if (error) throw error;

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}

// ── Helper: normalize DB snake_case → camelCase for the frontend ─────────────
function normalizeTemplate(row: Record<string, unknown>) {
    return {
        id: String(row.id),
        name: row.name,
        slug: row.slug,
        categories: row.categories,
        difficulty: row.difficulty,
        nodes: row.nodes,
        nodeCount: row.node_count,
        setupTime: row.setup_time,
        value: row.value,
        description: row.description,
        whatItDoes: row.what_it_does,
        featured: row.featured,
        status: row.status,
        n8nWorkflowId: row.n8n_workflow_id,
        order: row.order,
        updatedAt: row.updated_at,
    };
}
