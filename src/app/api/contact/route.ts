import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

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
        
        // Map the form fields to the database columns
        const submission = {
            name,
            email,
            message,
            company: package_interest || "", // Using package_interest as company/context if company is missing
            budget: package_interest || "",  // Also saving to budget field
            status: "new",
            created_at: new Date().toISOString(),
            notes: `Source: ${source || "unknown"}${phone ? ` | Phone: ${phone}` : ""}`
        };

        const { data, error } = await supabase
            .from("contact_submissions")
            .insert(submission)
            .select()
            .single();

        if (error) {
            console.error("Error saving contact submission:", error);
            return NextResponse.json(
                { error: "Failed to save submission. Please try again later." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Thank you! Your message has been received.", data },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
