import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { dispatchWebhook } from "@/lib/webhooks";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
    try {
        const { url, email } = await req.json();

        if (!url || !email) {
            return apiError("Missing required fields", 400);
        }

        const supabase = createAdminClient();

        // Log the audit request to the new Leads table
        const { data: submission, error } = await (supabase
            .from("leads" as any) as any)
            .insert([{
                name: "Audit Request",
                email,
                message: `Audit requested for: ${url}`,
                source: "audit_page",
                status: "new",
            }])
            .select()
            .single();


        if (error) {
            console.error("Audit API Error:", error);
            return apiError(error.message, 500);
        }

        // Trigger n8n Webhook
        await dispatchWebhook("audit.requested", {
            id: submission.id,
            url,
            email,
            timestamp: new Date().toISOString()
        });

        // Log to activity log
        await (supabase.from("activity_log" as any) as any).insert({
            action: "ai_audit_start",
            section: "AI Brain",
            details: `AI Brain started background audit for ${url}`
        });


        return apiSuccess({ message: "Audit requested successfully" });
    } catch (err: any) {
        return apiError("Internal Server Error", 500, err.message);
    }
}

