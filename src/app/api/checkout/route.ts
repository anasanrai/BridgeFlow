import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getPublicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

// POST — create a checkout session / payment intent
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { planName, planPrice, customerEmail, customerName, paymentMethod, currency = "USD" } = body;

        if (!planName || !planPrice || !customerEmail || !paymentMethod) {
            return NextResponse.json(
                { error: "Missing required fields: planName, planPrice, customerEmail, paymentMethod" },
                { status: 400 }
            );
        }

        // Generate a unique order ID
        const orderId = `BF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        // Store the order in Supabase
        const sb = getPublicClient();
        if (sb) {
            try {
                await sb.from("orders").insert({
                    order_id: orderId,
                    plan_name: planName,
                    plan_price: planPrice,
                    customer_email: customerEmail,
                    customer_name: customerName,
                    payment_method: paymentMethod,
                    currency,
                    status: "pending",
                    created_at: new Date().toISOString(),
                });
            } catch (e) {
                console.warn("Could not save order to DB:", e);
            }
        }

        // Return checkout details based on payment method
        if (paymentMethod === "paypal") {
            return NextResponse.json({
                success: true,
                orderId,
                method: "paypal",
                message: "Redirect to PayPal for payment",
                redirectUrl: `/checkout/paypal?orderId=${orderId}&amount=${planPrice}&currency=${currency}`,
            });
        }

        if (paymentMethod === "bank_transfer") {
            return NextResponse.json({
                success: true,
                orderId,
                method: "bank_transfer",
                message: "Bank transfer instructions sent",
                instructions: "Please check your email for bank transfer details.",
            });
        }

        if (paymentMethod.startsWith("wallet_")) {
            const walletType = paymentMethod.replace("wallet_", "");
            return NextResponse.json({
                success: true,
                orderId,
                method: paymentMethod,
                walletType,
                message: `${walletType} payment instructions sent`,
            });
        }

        return NextResponse.json({ error: "Unknown payment method" }, { status: 400 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
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

        const sb = getPublicClient();
        if (!sb) {
            return NextResponse.json({ error: "No DB connection" }, { status: 500 });
        }

        const { data, error } = await sb
            .from("orders")
            .select("*")
            .eq("order_id", orderId)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
