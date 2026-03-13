import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import Stripe from "stripe";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
    try {
        // Rate limit checkout attempts
        const ip = req.headers.get("x-forwarded-for") ?? "unknown";
        const rateLimitResult = await checkRateLimit(req, "api-public");


        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { planName, planPrice, customerEmail, customerName, paymentMethod, currency = "USD", metadata = {} } = body;

        if (!planName || !planPrice || !customerEmail || !paymentMethod) {
            return NextResponse.json(
                { error: "Missing required fields: planName, planPrice, customerEmail, paymentMethod" },
                { status: 400 }
            );
        }

        const sb = createAdminClient();

        // Generate a unique order ID
        const orderId = `BF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        // 1. Stripe Checkout — keys from environment variables (not DB)
        if (paymentMethod === "stripe") {
            const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
            if (!stripeSecretKey) {
                return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
            }

            const stripe = new Stripe(stripeSecretKey, {
                apiVersion: "2023-10-16" as any,
            });

            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [{
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: { name: planName },
                        unit_amount: Math.round(Number(planPrice) * 100),
                    },
                    quantity: 1,
                }],
                mode: "payment",
                success_url: `${siteUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}&id=${orderId}`,
                cancel_url: `${siteUrl}/pricing`,
                customer_email: customerEmail,
                client_reference_id: orderId,
                metadata: { orderId, planName, ...metadata },
            });

            await (sb.from("orders" as any) as any).insert({
                order_id: orderId,
                plan_name: planName,
                plan_price: planPrice,
                customer_email: customerEmail,
                customer_name: customerName,
                payment_method: "stripe",
                status: "pending",
                metadata: { checkout_session_id: session.id, ...metadata },
                created_at: new Date().toISOString(),
            });

            return NextResponse.json({ success: true, orderId, url: session.url });
        }

        // 2. Moyasar — publishable key from environment
        if (paymentMethod === "moyasar") {
            await (sb.from("orders" as any) as any).insert({
                order_id: orderId, plan_name: planName, plan_price: planPrice,
                customer_email: customerEmail, customer_name: customerName,
                payment_method: "moyasar", status: "pending",
                created_at: new Date().toISOString(),
            });

            return NextResponse.json({
                success: true, orderId,
                publishableKey: process.env.NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY,
                amount: Math.round(Number(planPrice) * 100),
                callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin}/thank-you?id=${orderId}`,
            });
        }

        // 3. PayPal / Bank / Wallet fallback
        await (sb.from("orders" as any) as any).insert({
            order_id: orderId, plan_name: planName, plan_price: planPrice,
            customer_email: customerEmail, customer_name: customerName,
            payment_method: paymentMethod, status: "pending",
            created_at: new Date().toISOString(),
        });


        if (["paypal", "bank_transfer"].includes(paymentMethod) || paymentMethod.startsWith("wallet_")) {
            return NextResponse.json({ success: true, orderId, method: paymentMethod });
        }

        return NextResponse.json({ error: "Unknown payment method" }, { status: 400 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal server error";
        console.error("Checkout Error:", err);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// GET — get order status
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get("orderId");

        if (!orderId) {
            return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
        }

        const sb = createAdminClient();
        const { data, error } = await (sb
            .from("orders" as any) as any)
            .select("*")
            .eq("order_id", orderId)
            .single();


        if (error || !data) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal server error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
