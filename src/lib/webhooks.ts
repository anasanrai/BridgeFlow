import { createAdminClient } from "./supabase";
import { Database } from "@/types/database";

/**
 * Dispatches a webhook event to all active webhooks registered in the database.
 * If N8N_WEBHOOK_URL is set in environment variables, it is also triggered as a
 * fallback for all events (useful when Supabase is not yet configured).
 *
 * @param event   The event type (e.g., 'audit.requested', 'contact.submitted')
 * @param payload The data to send with the event
 */
export async function dispatchWebhook(event: string, payload: unknown) {
    const dispatched: Promise<void>[] = [];

    // ── 1. Dispatch to all active webhooks stored in Supabase ──
    try {
        const supabase = createAdminClient<Database>();
        const { data: webhooks, error } = await supabase
            .from("webhooks")
            .select("*")
            .eq("is_active", true) as { data: Database['public']['Tables']['webhooks']['Row'][] | null, error: any };

        if (!error && webhooks && webhooks.length > 0) {
            for (const webhook of webhooks) {
                const isSubscribed =
                    webhook.events.includes("*") || webhook.events.includes(event);
                if (!isSubscribed) continue;

                dispatched.push(
                    fetch(webhook.url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-BridgeFlow-Event": event,
                            "X-BridgeFlow-Secret": webhook.secret || "",
                        },
                        body: JSON.stringify({
                            event,
                            timestamp: new Date().toISOString(),
                            payload,
                        }),
                    })
                        .then((res) => {
                            if (!res.ok) {
                                console.warn(
                                    `[webhook] Failed for "${webhook.name}": ${res.statusText}`
                                );
                            }
                        })
                        .catch((err) => {
                            console.error(`[webhook] Error for "${webhook.name}":`, err);
                        })
                );
            }
        }
    } catch (err) {
        console.error("[webhook] Failed to fetch webhooks from Supabase:", err);
    }

    // ── 2. Also trigger the n8n webhook URL from env vars (if configured) ──
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
        dispatched.push(
            fetch(n8nWebhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-BridgeFlow-Event": event,
                },
                body: JSON.stringify({
                    event,
                    timestamp: new Date().toISOString(),
                    payload,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        console.warn(`[webhook] n8n webhook failed: ${res.statusText}`);
                    }
                })
                .catch((err) => {
                    console.error("[webhook] n8n webhook error:", err);
                })
        );
    }

    await Promise.allSettled(dispatched);
}
