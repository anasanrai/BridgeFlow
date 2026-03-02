import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, email, linkedin, role, whyBridgeflow, portfolio } = body;

        // Validation
        if (!fullName || !email || !role || !whyBridgeflow) {
            return NextResponse.json(
                { error: "Full name, email, role, and motivation are required." },
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

        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = parseInt(process.env.SMTP_PORT || "587");
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const contactEmail = process.env.CONTACT_EMAIL || "hello@bridgeflow.agency";

        if (smtpHost && smtpUser && smtpPass) {
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: { user: smtpUser, pass: smtpPass },
            });

            await transporter.sendMail({
                from: `"BridgeFlow Careers" <${smtpUser}>`,
                to: contactEmail,
                replyTo: email,
                subject: `New Job Application: ${role} — ${fullName}`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #e6b422;">New Job Application</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Name</td><td style="padding: 8px 0;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Role</td><td style="padding: 8px 0;">${role}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">LinkedIn</td><td style="padding: 8px 0;">${linkedin || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Portfolio</td><td style="padding: 8px 0;">${portfolio || "Not provided"}</td></tr>
            </table>
            <h3 style="color: #e6b422; margin-top: 20px;">Why BridgeFlow?</h3>
            <p style="line-height: 1.6; color: #333;">${whyBridgeflow.replace(/\n/g, "<br>")}</p>
          </div>
        `,
            });
        }

        return NextResponse.json(
            { success: true, message: "Application submitted successfully!" },
            { status: 200 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Careers form error:", message);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
