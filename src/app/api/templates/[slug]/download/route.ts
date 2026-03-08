import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Fetch template from Supabase
        const { data: template, error } = await supabase
            .from("templates")
            .select("*")
            .eq("slug", params.slug)
            .single();

        if (error || !template) {
            return NextResponse.json(
                { error: "Template not found" },
                { status: 404 }
            );
        }

        // Return the workflow JSON
        if (!template.workflow_json) {
            return NextResponse.json(
                { error: "No workflow JSON available for this template" },
                { status: 404 }
            );
        }

        const jsonString = JSON.stringify(template.workflow_json, null, 2);
        
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
