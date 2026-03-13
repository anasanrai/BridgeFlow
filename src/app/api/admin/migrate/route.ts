import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * One-time data migration endpoint.
 * Requires admin authentication.
 * Safe to run multiple times (uses upsert).
 */
export async function GET() {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const supabase = createAdminClient();

        const { error: siteError } = await (supabase.from("site_config" as any) as any).upsert({
            name: "BridgeFlow",
            tagline: "Architecting the Future of Enterprise Automation",
            description: "BridgeFlow is a premier AI automation agency specializing in building high-performance, enterprise-grade workflows and intelligent decision systems.",
            social_links: [
                { platform: "X", href: "https://x.com/bridgeflow" },
                { platform: "LinkedIn", href: "https://linkedin.com/company/bridgeflow" },
                { platform: "GitHub", href: "https://github.com/bridgeflow" },
            ]
        }, { onConflict: "name" });


        const { error: homeError } = await (supabase.from("home_content" as any) as any).upsert({
            id: "00000000-0000-0000-0000-000000000001",
            hero: {
                badge: "Enterprise AI Orchestration",
                title: "Scale Your Operations with",
                titleLine2: "Autonomous AI",
                highlight: "Systems",
            },
            stats: [
                { end: 500, suffix: "+", label: "Enterprise Automations" },
                { end: 15, suffix: "M", label: "Annual Client Savings" },
                { end: 99, suffix: ".9%", label: "Automation Uptime" },
                { end: 12, suffix: "x", label: "Average Client ROI" }
            ]
        });


        return NextResponse.json({
            message: "Migration completed",
            results: {
                siteError: siteError?.message || null,
                homeError: homeError?.message || null,
            }
        });
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
