import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const { url, email } = await req.json();

        if (!url || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const supabase = createAdminClient();
        const { error } = await supabase
            .from("lead_audits")
            .insert([{ url, email, status: "pending" }]);

        if (error) {
            console.error("Audit API Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
