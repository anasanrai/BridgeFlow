import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import Stripe from "stripe";

/**
 * Stripe webhook handler.
 * Secret key and webhook secret come from environment variables — never from the database.
 */
export async function POST(req: NextRequest) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey || !stripeWebhookSecret) {
        console.error("Stripe env vars not configured: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET");
        return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" as any });
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, stripeWebhookSecret);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Invalid signature";
        console.error("Webhook signature verification failed:", message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const sb = createAdminClient();

    // 1. One-off Template Purchase logic
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Check if this was a subscription or one-off
        if (session.mode === 'payment') {
            const orderId = session.client_reference_id;
            const customerEmail = session.customer_details?.email;
            const amount = (session.amount_total || 0) / 100;

            if (orderId) {
                await (sb.from("orders" as any) as any).update({ status: "completed" }).eq("order_id", orderId);
                const { data: order } = await (sb.from("orders" as any) as any).select("*").eq("order_id", orderId).single();

                if (order && customerEmail) {
                    const orderData = order as Record<string, unknown>;
                    await (sb.from("purchases" as any) as any).insert({
                        user_email: customerEmail,
                        template_id: (orderData.metadata as Record<string, unknown>)?.template_id as string ?? null,
                        amount,
                        currency: session.currency?.toUpperCase() || "USD",
                        gateway: "stripe",
                        transaction_id: session.id,
                        status: "completed",
                    });
                }
            }
        }
    }

    // 2. SaaS Subscription Logic
    if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
        const subscription = event.data.object as Stripe.Subscription;
        const orgId = subscription.metadata.orgId;
        
        if (orgId) {
            const planId = subscription.metadata.planId || 'unknown';
            
            // Update subscription record
            await (sb.from("subscriptions" as any) as any).upsert({
                org_id: orgId,
                stripe_subscription_id: subscription.id,
                plan: planId,
                status: subscription.status,
                current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
                current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
            }, { onConflict: 'stripe_subscription_id' });


            // Update organization plan
            await (sb.from("organizations" as any) as any).update({ plan: planId }).eq("id", orgId);
        }
    }

    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;
        const orgId = subscription.metadata.orgId;

        if (orgId) {
            await (sb.from("subscriptions" as any) as any).update({ status: 'canceled' }).eq("stripe_subscription_id", subscription.id);
            await (sb.from("organizations" as any) as any).update({ plan: 'free' }).eq("id", orgId);
        }
    }

    return NextResponse.json({ received: true });
}

