import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, source } = body;

        // Validation
        if (!email) {
            return NextResponse.json(
                { error: "Email is required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        // Always save to Supabase (primary storage)
        const supabase = getAdminClient();
        if (supabase) {
            try {
                // Upsert to avoid duplicate errors
                const { error } = await supabase
                    .from("newsletter_subscribers")
                    .upsert(
                        [{ email, is_active: true, subscribed_at: new Date().toISOString() }],
                        { onConflict: "email", ignoreDuplicates: false }
                    );

                if (error && error.code !== "23505") {
                    // 23505 = unique violation (already subscribed) — that's fine
                    console.error("Supabase newsletter insert error:", error);
                }
            } catch (dbErr) {
                console.error("Supabase newsletter error:", dbErr);
            }
        }

        // Forward to external newsletter service if configured
        const newsletterApiKey = process.env.NEWSLETTER_API_KEY;
        const newsletterApiUrl = process.env.NEWSLETTER_API_URL;

        if (newsletterApiKey && newsletterApiUrl) {
            try {
                const response = await fetch(newsletterApiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${newsletterApiKey}`,
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    console.error("Newsletter API error:", await response.text());
                    // Don't fail — already saved to Supabase
                }
            } catch (extErr) {
                console.error("External newsletter error:", extErr);
            }
        }

        return NextResponse.json(
            { success: true, message: "Successfully subscribed!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Newsletter error:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
