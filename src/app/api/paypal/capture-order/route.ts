import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const PAYPAL_API = process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
    const auth = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const data = await res.json();
    return data.access_token;
}

export async function POST(req: NextRequest) {
    try {
        const { orderID, itemId, type } = await req.json();

        const accessToken = await getAccessToken();
        const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const captureData = await res.json();

        if (captureData.status === "COMPLETED") {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );

            // Record the purchase
            const purchaseUnit = captureData.purchase_units[0];
            const amount = purchaseUnit.payments.captures[0].amount.value;
            const userEmail = captureData.payer.email_address;

            await supabase.from("purchases").insert({
                user_email: userEmail,
                template_id: type === "template" ? itemId : null,
                amount: parseFloat(amount),
                currency: "USD",
                gateway: "paypal",
                transaction_id: captureData.id,
                status: "completed"
            });

            // Update order status
            await supabase.from("orders")
                .update({
                    status: "completed",
                    customer_email: userEmail,
                    customer_name: captureData.payer.name.given_name + " " + captureData.payer.name.surname
                })
                .eq("order_id", orderID);
        }

        return NextResponse.json(captureData);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
