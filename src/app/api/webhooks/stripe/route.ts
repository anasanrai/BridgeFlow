import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

export async function POST(req: NextRequest) {
    const sb = getAdminClient();
    if (!sb) return NextResponse.json({ error: "No DB connection" }, { status: 500 });

    // Fetch stripe webhook secret from DB
    const { data: settings } = await sb
        .from("payment_settings")
        .select("stripe_secret_key, stripe_webhook_secret")
        .limit(1)
        .single();

    if (!settings?.stripe_secret_key || !settings?.stripe_webhook_secret) {
        return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const stripe = new Stripe(settings.stripe_secret_key, {
        apiVersion: "2023-10-16" as any,
    });

    const payload = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, settings.stripe_webhook_secret);
    } catch (err: any) {
        console.error("Webhook signature verification failed:", err.message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.client_reference_id;
        const customerEmail = session.customer_details?.email;
        const amount = (session.amount_total || 0) / 100;

        if (orderId) {
            // 1. Update order status
            await sb.from("orders").update({ status: "completed" }).eq("order_id", orderId);

            // 2. Fetch order to get items (if it was a template)
            const { data: order } = await sb.from("orders").select("*").eq("order_id", orderId).single();

            if (order && customerEmail) {
                // 3. Create purchase record
                await sb.from("purchases").insert({
                    user_email: customerEmail,
                    template_id: order.metadata?.template_id || null, // Ensure template_id is stored in metadata during checkout
                    amount: amount,
                    currency: session.currency?.toUpperCase() || "USD",
                    gateway: "stripe",
                    transaction_id: session.id,
                    status: "completed"
                });
            }
        }
    }

    return NextResponse.json({ received: true });
}
