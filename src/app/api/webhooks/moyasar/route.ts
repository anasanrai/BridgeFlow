import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id: paymentId, status, amount, currency, metadata } = body.data || body;

        console.log(`Moyasar Webhook received: ${paymentId} (${status})`);

        if (status === "paid" || status === "captured") {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );

            // 1. Update the order in our DB
            // Moyasar usually doesn't have our internal order ID in the top level, 
            // but we might have passed it in metadata during initiation or use the payment ID.
            const orderId = metadata?.order_id;

            if (orderId) {
                await supabase.from("orders")
                    .update({ status: "completed", gateway_id: paymentId })
                    .eq("order_id", orderId);
            }

            // 2. Create a purchase record
            const templateId = metadata?.template_id;
            const customerEmail = body.data?.source?.email || metadata?.customer_email || "moyasar-customer@example.com";

            await supabase.from("purchases").insert({
                user_email: customerEmail,
                template_id: templateId,
                amount: amount / 100, // Moyasar amount is in subunits
                currency: currency || "SAR",
                gateway: "moyasar",
                transaction_id: paymentId,
                status: "completed"
            });

            console.log(`Moyasar purchase recorded for ${customerEmail}`);
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error("Moyasar Webhook Error:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
