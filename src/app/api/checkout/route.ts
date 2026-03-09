import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

// POST — create a checkout session / payment intent
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { planName, planPrice, customerEmail, customerName, paymentMethod, currency = "USD", metadata = {} } = body;

        if (!planName || !planPrice || !customerEmail || !paymentMethod) {
            return NextResponse.json(
                { error: "Missing required fields: planName, planPrice, customerEmail, paymentMethod" },
                { status: 400 }
            );
        }

        const sb = getAdminClient();
        if (!sb) {
            return NextResponse.json({ error: "No DB connection" }, { status: 500 });
        }

        // Fetch payment settings to get API keys
        const { data: settings } = await sb
            .from("payment_settings")
            .select("*")
            .limit(1)
            .single();

        // Generate a unique order ID
        const orderId = `BF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        // 1. Stripe Checkout
        if (paymentMethod === "stripe") {
            if (!settings?.stripe_secret_key) {
                return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
            }

            const stripe = new Stripe(settings.stripe_secret_key, {
                apiVersion: "2023-10-16" as any,
            });

            // Create a checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: currency.toLowerCase(),
                            product_data: {
                                name: planName,
                            },
                            unit_amount: Math.round(Number(planPrice) * 100), // Stripe uses cents
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}&id=${orderId}`,
                cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin}/pricing`,
                customer_email: customerEmail,
                client_reference_id: orderId,
                metadata: {
                    orderId,
                    planName,
                    ...metadata
                },
            });

            // Record pending order
            await sb.from("orders").insert({
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

            return NextResponse.json({
                success: true,
                orderId,
                url: session.url, // Redirect client to this URL
            });
        }

        // 2. Moyasar simulated or API call (Moyasar uses a simpler form-based integration often)
        if (paymentMethod === "moyasar") {
            // For Moyasar, we'll return the publishable key for their frontend form
            // and record the order
            await sb.from("orders").insert({
                order_id: orderId,
                plan_name: planName,
                plan_price: planPrice,
                customer_email: customerEmail,
                customer_name: customerName,
                payment_method: "moyasar",
                status: "pending",
                created_at: new Date().toISOString(),
            });

            return NextResponse.json({
                success: true,
                orderId,
                publishableKey: settings?.moyasar_publishable_key,
                amount: Math.round(Number(planPrice) * 100), // Moyasar also uses subunits
                callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin}/thank-you?id=${orderId}`
            });
        }

        // 3. PayPal, Bank, etc. (handled same as before but recording to orders)
        await sb.from("orders").insert({
            order_id: orderId,
            plan_name: planName,
            plan_price: planPrice,
            customer_email: customerEmail,
            customer_name: customerName,
            payment_method: paymentMethod,
            status: "pending",
            created_at: new Date().toISOString(),
        });

        if (paymentMethod === "paypal") {
            return NextResponse.json({
                success: true,
                orderId,
                method: "paypal",
            });
        }

        if (paymentMethod === "bank_transfer") {
            return NextResponse.json({
                success: true,
                orderId,
                method: "bank_transfer",
            });
        }

        if (paymentMethod.startsWith("wallet_")) {
            return NextResponse.json({
                success: true,
                orderId,
                method: paymentMethod,
            });
        }

        return NextResponse.json({ error: "Unknown payment method" }, { status: 400 });
    } catch (err: any) {
        console.error("Checkout Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// GET — get order status
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get("orderId");
        const sessionId = searchParams.get("sessionId");

        if (!orderId && !sessionId) {
            return NextResponse.json({ error: "Missing orderId or sessionId" }, { status: 400 });
        }

        const sb = getAdminClient();
        if (!sb) {
            return NextResponse.json({ error: "No DB connection" }, { status: 500 });
        }

        let query = sb.from("orders").select("*");

        if (orderId) {
            query = query.eq("order_id", orderId);
        } else if (sessionId) {
            query = query.eq("checkout_session_id", sessionId);
        }

        const { data, error } = await query.single();

        if (error || !data) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
