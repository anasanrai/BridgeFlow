import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * POST /api/admin/templates/save-workflow
 * Body: { slug: string; workflowJson: object }
 *
 * Patches the matching template's `workflowJson` field in
 * src/data/templates.ts and writes the file back to disk.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { slug, workflowJson } = body as { slug: string; workflowJson: Record<string, any> };

        if (!slug || !workflowJson) {
            return NextResponse.json({ error: "Missing slug or workflowJson" }, { status: 400 });
        }

        // Basic n8n JSON structure validation
        if (!workflowJson.nodes && !workflowJson.connections) {
            return NextResponse.json(
                { error: "Invalid n8n JSON — must contain nodes and connections fields" },
                { status: 400 }
            );
        }

        const templatesPath = join(process.cwd(), "src", "data", "templates.ts");
        let src = readFileSync(templatesPath, "utf-8");

        // Find the template block by slug
        const slugPattern = new RegExp(
            `(slug:\\s*["']${slug}["'][\\s\\S]*?workflowJson:\\s*)(?:null|\\{[\\s\\S]*?\\})(,?)`,
            "m"
        );

        const jsonStr = JSON.stringify(workflowJson, null, 4)
            .split("\n")
            .join("\n    "); // indent to match file

        if (slugPattern.test(src)) {
            src = src.replace(slugPattern, `$1${jsonStr}$2`);
        } else {
            // Fallback: try simple null replacement near the slug
            const nullPattern = new RegExp(
                `(slug:\\s*["']${slug}["'][\\s\\S]{0,600}?workflowJson:\\s*)null`
            );
            if (!nullPattern.test(src)) {
                return NextResponse.json(
                    { error: `Template with slug "${slug}" not found in templates.ts` },
                    { status: 404 }
                );
            }
            src = src.replace(nullPattern, `$1${jsonStr}`);
        }

        writeFileSync(templatesPath, src, "utf-8");
        return NextResponse.json({ ok: true, slug });
    } catch (err: any) {
        console.error("[save-workflow] error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
