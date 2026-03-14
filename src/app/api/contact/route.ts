import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendTelegram, newLeadMessage } from "@/lib/telegram";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, package_interest, message, source } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        const { error } = await (supabase.from("leads" as any) as any).insert({
            name: String(name || ""),
            email: String(email || ""),
            phone: String(phone || "") || null,
            message: String(message || ""),
            package_interest: String(package_interest || "") || null,
            source: String(source || "contact-form"),
            status: "new",
        });

        if (error) {
            console.error("[Contact] Supabase insert error:", error);
            // Don't fail silently — but also handle the case where the leads table
            // might not exist yet (fall through to Telegram anyway)
        }

        // Fire Telegram notification (non-blocking)
        sendTelegram(
            newLeadMessage({
                name: String(name),
                email: String(email),
                phone: String(phone || ""),
                package_interest: String(package_interest || ""),
                message: String(message || ""),
            })
        ).catch((err) => console.error("[Contact] Telegram error:", err));

        return NextResponse.json(
            { message: "Thank you! Your message has been received. We'll be in touch within 24 hours." },
            { status: 201 }
        );
    } catch (error) {
        console.error("[Contact] API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
