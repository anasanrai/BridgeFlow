import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

function defaultPaymentSettings() {
    return {
        provider: "paypal",
        mode: "sandbox",
        is_active: false,
        supports_cards: true,
        supports_bank: true,
        supports_wallets: true,
        paypal_enabled: false,
        paypal_mode: "sandbox",
        paypal_currency: "USD",
        bank_enabled: false,
        bank_account_name: "BridgeFlow Agency",
        bank_instructions: "Please include your invoice number as the payment reference.",
        wallets_enabled: false,
        currency: "USD",
        tax_rate: 0,
        invoice_prefix: "BF",
        payment_terms: "Payment due within 7 days of invoice",
        stripe_enabled: false,
        moyasar_enabled: false,
    };
}

// GET — payment gateway configuration (keys come from env vars, not DB)
export async function GET() {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const sb = createAdminClient();
        const { data, error } = await sb
            .from("payment_settings" as any)
            .select("*")
            .limit(1)
            .single();

        if (error || !data) {
            return NextResponse.json(defaultPaymentSettings());
        }

        // Strip any secret keys that may have been stored previously
        const safeData = data as Record<string, unknown>;
        delete safeData.stripe_secret_key;
        delete safeData.stripe_webhook_secret;
        delete safeData.moyasar_secret_key;
        delete safeData.paypal_client_secret;

        return NextResponse.json({ ...defaultPaymentSettings(), ...safeData });
    } catch {
        return NextResponse.json(defaultPaymentSettings());
    }
}

// POST — save payment gateway configuration (non-secret settings only)
export async function POST(req: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json() as Record<string, unknown>;
        const sb = createAdminClient();

        // Never persist secret keys to DB — they must stay in env vars
        const safeBody = { ...body };
        delete safeBody.stripe_secret_key;
        delete safeBody.stripe_webhook_secret;
        delete safeBody.moyasar_secret_key;
        delete safeBody.paypal_client_secret;
        delete safeBody.client_secret;

        const { data: existing } = await sb.from("payment_settings" as any).select("id").limit(1);
        const existingRow = (existing as Array<{ id: string }> | null)?.[0];

        let result;
        if (existingRow?.id) {
            result = await (sb
                .from("payment_settings" as any) as any)
                .update({ ...safeBody, updated_at: new Date().toISOString() })
                .eq("id", existingRow.id)
                .select()
                .single();

        } else {
            result = await (sb
                .from("payment_settings" as any) as any)
                .insert(safeBody)
                .select()
                .single();

        }

        if (result.error) {
            return NextResponse.json({ error: result.error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data: result.data });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
