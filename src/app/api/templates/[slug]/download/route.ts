import { createAdminClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const supabase = createAdminClient();
        if (!supabase) return NextResponse.json({ error: "DB configuration error" }, { status: 500 });


        // Fetch template from Supabase
        const { data: template, error } = await (supabase
            .from("templates" as any) as any)
            .select("*")
            .eq("slug", params.slug)
            .single();

        const t = template as any;

        if (error || !t) {

            return NextResponse.json(
                { error: "Template not found" },
                { status: 404 }
            );
        }

        // Return the workflow JSON
        if (!t.workflow_json) {
            return NextResponse.json(
                { error: "No workflow JSON available for this template" },
                { status: 404 }
            );
        }

        const jsonString = JSON.stringify(t.workflow_json, null, 2);

        
        return new NextResponse(jsonString, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Content-Disposition": `attachment; filename="${params.slug}-workflow.json"`,
            },
        });
    } catch (err: any) {
        console.error("Download error:", err);
        return NextResponse.json(
            { error: "Failed to download template" },
            { status: 500 }
        );
    }
}
