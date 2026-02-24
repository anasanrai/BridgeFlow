import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;

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

        // Check if a newsletter service is configured via env
        const newsletterApiKey = process.env.NEWSLETTER_API_KEY;
        const newsletterApiUrl = process.env.NEWSLETTER_API_URL;

        if (newsletterApiKey && newsletterApiUrl) {
            // Forward to external newsletter service (e.g., Mailchimp, ConvertKit, etc.)
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
                return NextResponse.json(
                    { error: "Failed to subscribe. Please try again." },
                    { status: 500 }
                );
            }
        } else {
            // Log to console when newsletter service not configured
            console.log("=== NEW NEWSLETTER SUBSCRIPTION ===");
            console.log(`Email: ${email}`);
            console.log(`Time: ${new Date().toISOString()}`);
            console.log("===================================");
            console.log(
                "TIP: Configure NEWSLETTER_API_KEY and NEWSLETTER_API_URL env vars to connect to your newsletter service."
            );
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
