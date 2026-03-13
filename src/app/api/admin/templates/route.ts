import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

// ── Local JSON fallback (read-only) ──────────────────────────────────────────
async function getLocalTemplates() {
    try {
        const data = await import("@/data/templates.json");
        return Array.isArray(data.default) ? data.default : [];
    } catch {
        return [];
    }
}

// ── Helper: normalize DB snake_case → camelCase for the frontend ─────────────
function normalizeTemplate(t: any) {
    if (!t) return null;
    return {
        id: String(t.id || ''),
        name: t.name || 'Untitled Template',
        slug: t.slug || '',
        categories: Array.isArray(t.categories) ? t.categories : [],
        difficulty: t.difficulty || 'Beginner',
        nodes: Array.isArray(t.nodes) ? t.nodes : [],
        nodeCount: Number(t.node_count || t.nodeCount || 0),
        setupTime: String(t.setup_time || t.setupTime || '15 min'),
        value: Number(t.value || t.value || 0),
        description: t.description || t.short_description || '',
        longDescription: t.long_description || t.longDescription || t.description || '',
        whatItDoes: Array.isArray(t.what_it_does) ? t.what_it_does : (Array.isArray(t.whatItDoes) ? t.whatItDoes : []),
        featured: Boolean(t.featured),
        status: t.status || 'published',
        n8nWorkflowId: t.n8n_workflow_id || t.n8nWorkflowId || "",
        order: Number(t.order || 0),
        updatedAt: t.updated_at || t.updatedAt,
        imageUrl: t.image_url || t.imageUrl || null,
        imageUrls: Array.isArray(t.image_urls) ? t.image_urls : (Array.isArray(t.imageUrls) ? t.imageUrls : []),
        workflowJson: t.workflow_json || t.workflowJson || null,
        shortDescription: t.short_description || t.shortDescription || t.description || "",
        connectionCount: Number(t.connection_count || t.connectionCount || 0),
        jsonUrl: t.json_url || t.jsonUrl || "",
        jsonAccess: t.json_access || t.jsonAccess || "free",
        tools: Array.isArray(t.tools) ? t.tools : [],
    };
}

// GET — list all templates
export async function GET() {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const sb = createAdminClient();
        const { data, error } = await (sb
            .from("templates" as any) as any)
            .select("*")
            .order("order", { ascending: true });


        if (error) throw error;
        return NextResponse.json({ ok: true, templates: (data || []).map(normalizeTemplate) });
    } catch (err: any) {
        console.error('[Admin Templates GET] Error:', err.message);
        const raw = await getLocalTemplates();
        const templates = raw.map(normalizeTemplate);
        return NextResponse.json({ ok: true, templates });
    }
}

// POST — add new template
export async function POST(req: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();
        const sb = createAdminClient();

        // Calculate next order number
        const { data: existing } = await (sb
            .from("templates" as any) as any)
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
            short_description: body.shortDescription || "",
            long_description: body.longDescription || "",
            connection_count: body.connectionCount || 0,
            image_urls: body.imageUrls || [],
            json_url: body.jsonUrl || "",
            json_access: body.jsonAccess || "free",
            tools: body.tools || [],
        };

        const { data, error } = await (sb
            .from("templates" as any) as any)
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
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();
        const sb = createAdminClient();

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
        if (body.imageUrl !== undefined) updatePayload.image_url = body.imageUrl;
        if (body.imageUrls !== undefined) updatePayload.image_urls = body.imageUrls;
        if (body.workflowJson !== undefined) updatePayload.workflow_json = body.workflowJson;
        if (body.shortDescription !== undefined) updatePayload.short_description = body.shortDescription;
        if (body.longDescription !== undefined) updatePayload.long_description = body.longDescription;
        if (body.connectionCount !== undefined) updatePayload.connection_count = body.connectionCount;
        if (body.jsonUrl !== undefined) updatePayload.json_url = body.jsonUrl;
        if (body.jsonAccess !== undefined) updatePayload.json_access = body.jsonAccess;
        if (body.tools !== undefined) updatePayload.tools = body.tools;

        const { data, error } = await (sb
            .from("templates" as any) as any)
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
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();
        const { orderedIds } = body;

        if (!Array.isArray(orderedIds)) {
            return NextResponse.json({ ok: false, error: "orderedIds must be an array" }, { status: 400 });
        }

        const sb = createAdminClient();
        const updates = orderedIds.map((id: string, idx: number) =>
            (sb.from("templates" as any) as any).update({ order: idx + 1 }).eq("id", id)
        );


        await Promise.all(updates);
        return NextResponse.json({ ok: true });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}

// DELETE — remove template
export async function DELETE(req: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
        }

        const sb = createAdminClient();
        const { error } = await (sb.from("templates" as any) as any).delete().eq("id", id);

        if (error) throw error;

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}
