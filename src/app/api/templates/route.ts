import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getPublicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

async function getLocalTemplates() {
    try {
        const data = await import("@/data/templates.json");
        return Array.isArray(data.default) ? data.default : [];
    } catch {
        return [];
    }
}

// GET — list published templates (public, no auth required)
export async function GET() {
    try {
        const sb = getPublicClient();
        if (!sb) {
            const local = await getLocalTemplates();
            return NextResponse.json({ templates: local });
        }

        const { data, error } = await sb
            .from("templates")
            .select("*")
            .eq("status", "published")
            .order("order", { ascending: true });

        if (error || !data || data.length === 0) {
            const local = await getLocalTemplates();
            return NextResponse.json({ templates: local });
        }

        // Normalize field names (DB uses snake_case, frontend uses camelCase)
        const templates = data.map((t: Record<string, unknown>) => ({
            id: String(t.id),
            name: t.name,
            slug: t.slug,
            categories: t.categories || [],
            difficulty: t.difficulty || "Beginner",
            nodes: t.nodes || [],
            nodeCount: t.node_count || t.nodeCount || 0,
            setupTime: t.setup_time || t.setupTime || "15 min",
            value: t.value || 0,
            description: t.description || "",
            whatItDoes: t.what_it_does || t.whatItDoes || [],
            featured: t.featured || false,
            status: t.status || "published",
            imageUrl: t.image_url || t.imageUrl || null,
            workflowJson: t.workflow_json || t.workflowJson || null,
        }));

        return NextResponse.json({ templates });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Public templates API error:", message);
        const local = await getLocalTemplates();
        return NextResponse.json({ templates: local });
    }
}
