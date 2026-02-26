import { createAdminClient } from "./supabase";

/**
 * Dispatches a webhook event to all active webhooks.
 * @param event The event type (e.g., 'audit.requested')
 * @param payload The data to send
 */
export async function dispatchWebhook(event: string, payload: any) {
    const supabase = createAdminClient();

    // Get active webhooks
    const { data: webhooks, error } = await supabase
        .from("webhooks")
        .select("*")
        .eq("is_active", true);

    if (error || !webhooks) {
        console.error("Webhook Dispatch: Failed to fetch webhooks", error);
        return;
    }

    const promises = webhooks.map(async (webhook) => {
        // Check if event is subscribed
        const isSubscribed = webhook.events.includes("*") || webhook.events.includes(event);
        if (!isSubscribed) return;

        try {
            const response = await fetch(webhook.url, {
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
            });

            if (!response.ok) {
                console.warn(`Webhook failed for ${webhook.name}: ${response.statusText}`);
            }
        } catch (err) {
            console.error(`Webhook error for ${webhook.name}:`, err);
        }
    });

    await Promise.allSettled(promises);
}
