import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const VALID_SECTIONS = [
    "site_config",
    "home_content",
    "services",
    "benefits",
    "team_members",
    "company_values",
    "milestones",
    "tech_stack",
    "blog_posts",
    "case_studies",
    "contact_submissions",
    "newsletter_subscribers",
    "activity_log",
    "telemetry",
    "page_metadata",
    "ai_models",
    "api_tokens",
    "webhooks",
    "audit_settings",
];

const SORTABLE_SECTIONS = [
    "services", "benefits", "team_members", "company_values",
    "milestones", "tech_stack", "case_studies",
];

export async function GET(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const { section } = params;

    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    try {
        const supabase = createAdminClient();
        let query = supabase.from(section).select("*");

        if (SORTABLE_SECTIONS.includes(section)) {
            query = query.order("sort_order", { ascending: true });
        }
        query = query.order("created_at", { ascending: false });

        const { data, error } = await query;

        if (error) {
            // Handle missing table gracefully (e.g., if telemetry table hasn't been created yet)
            const isMissingTable =
                error.code === "PGRST116" ||
                error.message?.includes("does not exist") ||
                error.message?.includes("schema cache");

            if (isMissingTable) {
                console.warn(`Admin API: Table "${section}" does not exist. Returning empty dataset.`);
                return NextResponse.json({ data: [] });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const { section } = params;

    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    const body = await req.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from(section)
        .insert(body)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log activity
    await supabase.from("activity_log").insert({
        action: "create",
        section,
        details: `Created new item in ${section}`,
    });

    return NextResponse.json({ data }, { status: 201 });
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const { section } = params;

    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from(section)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log").insert({
        action: "update",
        section,
        details: `Updated item in ${section}`,
    });

    return NextResponse.json({ data });
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const { section } = params;

    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from(section).delete().eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log").insert({
        action: "delete",
        section,
        details: `Deleted item from ${section}`,
    });

    return NextResponse.json({ success: true });
}
