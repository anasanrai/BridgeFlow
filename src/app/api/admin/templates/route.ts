import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const TEMPLATES_PATH = join(process.cwd(), "src/data/templates.json");

function readTemplates() {
    try {
        const raw = readFileSync(TEMPLATES_PATH, "utf-8");
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function writeTemplates(templates: any[]) {
    writeFileSync(TEMPLATES_PATH, JSON.stringify(templates, null, 4), "utf-8");
}

// GET — list all templates
export async function GET() {
    const templates = readTemplates();
    return NextResponse.json({ ok: true, templates });
}

// POST — add new template
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const templates = readTemplates();

        const newId = String(Math.max(0, ...templates.map((t: any) => parseInt(t.id) || 0)) + 1);
        const newOrder = Math.max(0, ...templates.map((t: any) => t.order || 0)) + 1;

        const template = {
            id: newId,
            name: body.name || "Untitled Template",
            slug: body.slug || body.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `template-${newId}`,
            categories: body.categories || [],
            difficulty: body.difficulty || "Beginner",
            nodes: body.nodes || [],
            nodeCount: body.nodeCount || 0,
            setupTime: body.setupTime || "30 min",
            value: body.value || 0,
            description: body.description || "",
            whatItDoes: body.whatItDoes || [],
            featured: body.featured || false,
            status: body.status || "draft",
            n8nWorkflowId: body.n8nWorkflowId || "",
            order: newOrder,
            updatedAt: new Date().toISOString(),
        };

        templates.push(template);
        writeTemplates(templates);

        return NextResponse.json({ ok: true, template });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}

// PUT — update existing template
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const templates = readTemplates();

        const idx = templates.findIndex((t: any) => t.id === body.id);
        if (idx === -1) {
            return NextResponse.json({ ok: false, error: "Template not found" }, { status: 404 });
        }

        templates[idx] = {
            ...templates[idx],
            ...body,
            updatedAt: new Date().toISOString(),
        };

        writeTemplates(templates);
        return NextResponse.json({ ok: true, template: templates[idx] });
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

        const templates = readTemplates();
        orderedIds.forEach((id: string, idx: number) => {
            const t = templates.find((t: any) => t.id === id);
            if (t) t.order = idx + 1;
        });

        templates.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        writeTemplates(templates);

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

        let templates = readTemplates();
        templates = templates.filter((t: any) => t.id !== id);
        writeTemplates(templates);

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}
