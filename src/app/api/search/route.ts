import { NextRequest, NextResponse } from "next/server";
import { getAllSearchItems } from "@/lib/supabase-data";

export const dynamic = "force-dynamic";

/**
 * Public search API — called by the Search component (client-side).
 * Moving supabase-data access here keeps server-only imports server-side.
 */
export async function GET(req: NextRequest) {
    try {
        const items = await getAllSearchItems();
        return NextResponse.json(items);
    } catch (err) {
        console.error("Search API error:", err);
        return NextResponse.json([], { status: 200 }); // Fail gracefully
    }
}
