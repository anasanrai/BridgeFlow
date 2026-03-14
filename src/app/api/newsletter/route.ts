import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/api-response";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, source } = body;

        // Validation
        if (!email) {
            return apiError("Email is required", 400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return apiError("Please provide a valid email address.", 400);
        }

        // Always save to Supabase (primary storage)
        const supabase = createAdminClient();
        let dbOk = false;

        if (supabase) {
            try {
                // Upsert to avoid duplicate errors
                const { error } = await (supabase
                    .from("newsletter_subscribers" as any) as any)
                    .upsert(
                        [{ email, is_active: true, subscribed_at: new Date().toISOString() }],
                        { onConflict: "email", ignoreDuplicates: false }
                    );


                if (error) {
                    // Check if user is already subscribed (PostgREST error code 23505)
                    if (error.code === '23505') {
                        return apiSuccess({ message: "Already subscribed" });
                    }
                    console.error("Supabase newsletter insert error:", error);
                } else {
                    dbOk = true;
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

        return apiSuccess({ message: "Subscribed successfully" });
    } catch (error) {
        console.error("Newsletter error:", error);
        return apiError("Internal server error. Please try again later.", 500);
    }
}
