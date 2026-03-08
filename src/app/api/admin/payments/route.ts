import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

// GET — fetch payment gateway settings
export async function GET() {
    try {
        const sb = getAdminClient();
        if (!sb) {
            return NextResponse.json(getDefaultPaymentSettings());
        }

        const { data, error } = await sb
            .from("payment_settings")
            .select("*")
            .limit(1)
            .single();

        if (error || !data) {
            return NextResponse.json(getDefaultPaymentSettings());
        }

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(getDefaultPaymentSettings());
    }
}

// POST — save payment gateway settings
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const sb = getAdminClient();

        if (!sb) {
            return NextResponse.json({ error: "No DB connection" }, { status: 500 });
        }

        const { data: existing } = await sb
            .from("payment_settings")
            .select("id")
            .limit(1);

        const existingRow = existing && existing[0];
        let result;

        if (existingRow?.id) {
            result = await sb
                .from("payment_settings")
                .update({ ...body, updated_at: new Date().toISOString() })
                .eq("id", existingRow.id)
                .select()
                .single();
        } else {
            result = await sb
                .from("payment_settings")
                .insert(body)
                .select()
                .single();
        }

        if (result.error) {
            return NextResponse.json({ error: result.error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data: result.data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

function getDefaultPaymentSettings() {
    return {
        provider: "paypal",
        mode: "sandbox",
        client_id: "",
        client_secret: "",
        webhook_id: "",
        is_active: false,
        supports_cards: true,
        supports_bank: true,
        supports_wallets: true,
        // Keep existing fields for backward compatibility if needed by UI
        paypal_enabled: false,
        paypal_client_id: "",
        paypal_client_secret: "",
        paypal_mode: "sandbox",
        paypal_currency: "USD",
        bank_enabled: false,
        bank_name: "",
        bank_account_name: "BridgeFlow Agency",
        bank_account_number: "",
        bank_routing_number: "",
        bank_swift_code: "",
        bank_iban: "",
        bank_instructions: "Please include your invoice number as the payment reference.",
        wallets_enabled: false,
        wallet_payoneer_enabled: false,
        wallet_payoneer_email: "",
        wallet_wise_enabled: false,
        wallet_wise_email: "",
        wallet_usdt_enabled: false,
        wallet_usdt_address: "",
        wallet_esewa_enabled: false,
        wallet_esewa_id: "",
        wallet_khalti_enabled: false,
        wallet_khalti_id: "",
        currency: "USD",
        tax_rate: 0,
        invoice_prefix: "BF",
        payment_terms: "Payment due within 7 days of invoice",
    };
}
