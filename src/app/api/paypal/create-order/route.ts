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
        const { itemId, type } = await req.json(); // type: 'template' or 'package'

        // 1. Get price from DB or config
        let amount = "0.00";
        let description = "";

        if (type === "template") {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );
            const { data: template } = await supabase
                .from("templates")
                .select("value, name")
                .eq("id", itemId)
                .single();

            if (!template) return NextResponse.json({ error: "Item not found" }, { status: 404 });
            amount = template.value.toString();
            description = `BridgeFlow Template: ${template.name}`;
        } else if (type === "package") {
            const pricing: Record<string, string> = {
                starter: "497.00",
                growth: "797.00",
                pro: "1497.00"
            };
            amount = pricing[itemId] || "0.00";
            description = `BridgeFlow Package: ${itemId.toUpperCase()}`;
        }

        const accessToken = await getAccessToken();
        const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        description,
                        amount: {
                            currency_code: "USD",
                            value: amount,
                        },
                    },
                ],
            }),
        });

        const order = await res.json();

        if (order.id) {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );

            await supabase.from("orders").insert({
                order_id: order.id,
                plan_name: description,
                plan_price: parseFloat(amount),
                payment_method: "paypal",
                status: "pending",
                metadata: {
                    type,
                    item_id: itemId
                },
                created_at: new Date().toISOString()
            });
        }

        return NextResponse.json(order);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
