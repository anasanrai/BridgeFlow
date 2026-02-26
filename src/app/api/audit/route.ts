import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { dispatchWebhook } from "@/lib/webhooks";

export async function POST(req: Request) {
    try {
        const { url, email } = await req.json();

        if (!url || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const supabase = createAdminClient();

        // Log the audit request
        const { data: submission, error } = await supabase
            .from("contact_submissions")
            .insert([{
                name: "Audit Request",
                email,
                message: `Audit requested for: ${url}`,
                status: "pending",
                notes: JSON.stringify({ url, type: "free_audit" })
            }])
            .select()
            .single();

        if (error) {
            console.error("Audit API Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Trigger n8n Webhook
        await dispatchWebhook("audit.requested", {
            id: submission.id,
            url,
            email,
            timestamp: new Date().toISOString()
        });

        // Simulate AI Brain in background
        // In a real app, this might trigger a serverless function or worker
        await supabase.from("activity_log").insert({
            action: "ai_audit_start",
            section: "AI Brain",
            details: `AI Brain started background audit for ${url}`
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
