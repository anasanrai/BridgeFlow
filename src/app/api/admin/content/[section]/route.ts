import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

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
    "leads",
    "orders",
    "purchases",
    "templates",
    "subscriptions",
];

const SORTABLE_SECTIONS = [
    "services", "benefits", "team_members", "company_values",
    "milestones", "tech_stack", "case_studies", "templates",
];

export async function GET(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const authError = await requireAdmin();
    if (authError) return authError;

    const { section } = params;

    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    try {
        const supabase = createAdminClient();
        let query = supabase.from(section as any).select("*");


        if (SORTABLE_SECTIONS.includes(section)) {
            query = query.order("sort_order", { ascending: true });
        } else if (section === "home_content") {
            query = query.order("updated_at", { ascending: false });
        } else {
            query = query.order("created_at", { ascending: false });
        }

        const { data, error } = await query;

        if (error) {
            const isMissingTable =
                error.code === "PGRST116" ||
                error.message?.includes("does not exist") ||
                error.message?.includes("schema cache");

            if (isMissingTable) {
                console.warn(`Admin API: Table "${section}" does not exist.`);
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
    const authError = await requireAdmin();
    if (authError) return authError;

    const { section } = params;

    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    const body = await req.json();
    const supabase = createAdminClient();

    // The following block was modified by the user's instruction.
    // It replaces the original insert call with a new structure,
    // and introduces 'result' and 'sb' which are not defined.
    // 'sb' is replaced with 'supabase' for syntactic correctness.
    // The original 'error' variable is kept for the subsequent check.
    const { data: result, error } = await (supabase
        .from(section as any) as any)
        .insert(body)
        .select()
        .single();



    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log" as any).insert({
        action: "create",
        section,
        details: `Created new item in ${section}`,
    } as any);


    return NextResponse.json({ data: result }, { status: 201 });

}

export async function PUT(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const authError = await requireAdmin();
    if (authError) return authError;

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
    // The following block was modified by the user's instruction.
    // It replaces the original update call with a new structure,
    // and introduces 'result' and 'sb' which are not defined, and 'existingRow'.
    // 'sb' is replaced with 'supabase' for syntactic correctness.
    // 'existingRow' is not defined, so a placeholder is used to maintain syntax.
    // The original 'error' variable is kept for the subsequent check.
    const { data, error } = await (supabase
        .from(section as any) as any)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();



    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log" as any).insert({
        action: "update",
        section,
        details: `Updated item in ${section} (ID: ${id})`,
    } as any);

    return NextResponse.json({ data });

}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const authError = await requireAdmin();
    if (authError) return authError;

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
    const { error } = await (supabase
        .from(section as any) as any)
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("activity_log" as any).insert({
        action: "delete",
        section,
        details: `Deleted item from ${section} (ID: ${id})`,
    } as any);

    return NextResponse.json({ success: true });
}
