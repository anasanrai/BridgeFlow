import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
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
        const { name, email, company, budget, message, service } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        // Always save to Supabase (primary storage)
        const supabase = getAdminClient();
        let submissionId: string | null = null;
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from("contact_submissions")
                    .insert([{
                        name,
                        email,
                        message,
                        status: "new",
                        notes: JSON.stringify({ company, budget, service, source: "contact_form" }),
                    }])
                    .select("id")
                    .single();

                if (error) {
                    console.error("Supabase contact insert error:", error);
                } else {
                    submissionId = data?.id;
                    // Log activity
                    try {
                        await supabase.from("activity_log").insert({
                            action: "contact_form_submitted",
                            section: "Contact",
                            details: `New contact from ${name} (${email})${company ? ` — ${company}` : ""}`,
                        });
                    } catch (activityErr) {
                        console.error("Activity log error:", activityErr);
                    }
                }
            } catch (dbErr) {
                console.error("Supabase error:", dbErr);
            }
        }

        // Dispatch n8n webhook if configured
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
        if (n8nWebhookUrl) {
            fetch(n8nWebhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-BridgeFlow-Event": "contact.submitted",
                },
                body: JSON.stringify({
                    event: "contact.submitted",
                    timestamp: new Date().toISOString(),
                    payload: { id: submissionId, name, email, company, budget, service, message },
                }),
            }).catch((err) => console.error("Webhook dispatch error:", err));
        }

        // Send email via SMTP if configured
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = parseInt(process.env.SMTP_PORT || "587");
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const contactEmail = process.env.CONTACT_EMAIL || "hello@bridgeflow.agency";

        if (smtpHost && smtpUser && smtpPass) {
            try {
                const transporter = nodemailer.createTransport({
                    host: smtpHost,
                    port: smtpPort,
                    secure: smtpPort === 465,
                    auth: {
                        user: smtpUser,
                        pass: smtpPass,
                    },
                });

                await transporter.sendMail({
                    from: `"BridgeFlow Contact Form" <${smtpUser}>`,
                    to: contactEmail,
                    replyTo: email,
                    subject: `New Contact: ${name} — ${company || "No Company"}`,
                    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #e6b422;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Company</td><td style="padding: 8px 0;">${company || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Budget</td><td style="padding: 8px 0;">${budget || "Not specified"}</td></tr>
              ${service ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Service</td><td style="padding: 8px 0;">${service}</td></tr>` : ""}
            </table>
            <h3 style="color: #e6b422; margin-top: 20px;">Message</h3>
            <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, "<br>")}</p>
            ${submissionId ? `<p style="color: #999; font-size: 12px; margin-top: 20px;">Submission ID: ${submissionId}</p>` : ""}
          </div>
        `,
                });
            } catch (emailErr) {
                console.error("SMTP email error:", emailErr);
                // Don't fail the request if email fails — data is already in Supabase
            }
        }

        return NextResponse.json(
            { success: true, message: "Message sent successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
