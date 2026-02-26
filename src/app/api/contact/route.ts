import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, company, budget, message } = body;

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

        // Check if SMTP is configured via env
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = parseInt(process.env.SMTP_PORT || "587");
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const contactEmail = process.env.CONTACT_EMAIL || "hello@bridgeflow.agency";

        if (smtpHost && smtpUser && smtpPass) {
            // Send email via SMTP
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
            </table>
            <h3 style="color: #e6b422; margin-top: 20px;">Message</h3>
            <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        `,
            });
        } else {
            // TIP: Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_EMAIL env vars to send real emails.
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
