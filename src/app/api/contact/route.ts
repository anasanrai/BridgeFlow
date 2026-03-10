import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendTelegram, newLeadMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, message, package_interest, source } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    // 1. Save to leads table
    const { error: leadsErr } = await supabaseAdmin.from('leads').insert({
      name,
      email,
      phone: phone || null,
      message,
      package_interest: package_interest || null,
      source: source || 'contact_form',
      status: 'new',
    })

    if (leadsErr) {
      console.error('[Contact] Supabase leads insert error:', leadsErr)
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again.' },
        { status: 500 }
      )
    }

    // 2. Also save to contact_submissions (legacy / dashboard compatibility)
    await supabaseAdmin.from('contact_submissions').insert({
      name,
      email,
      phone: phone || null,
      message,
      package_interest: package_interest || null,
      source: source || 'contact_form',
      status: 'new',
    })

    // 3. Fire Telegram notification (non-blocking)
    sendTelegram(newLeadMessage({ name, email, phone, package_interest, message })).catch(
      console.error
    )

    // 4. Send auto-reply email via Resend (if configured) or log
    await sendAutoReply({ name, email, package_interest })

    return NextResponse.json({ success: true, message: 'Message received! We\'ll respond within 24 hours.' })
  } catch (err) {
    console.error('[Contact] Unexpected error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}

async function sendAutoReply({
  name,
  email,
  package_interest,
}: {
  name: string
  email: string
  package_interest?: string
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.log('[AutoReply] RESEND_API_KEY not set, skipping email')
    return
  }

  const pkg = package_interest ? ` about ${package_interest}` : ''

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'BridgeFlow <hello@bridgeflow.agency>',
        to: email,
        subject: `Got it, ${name.split(' ')[0]}! We'll be in touch soon 🚀`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f59e0b;">Thanks for reaching out, ${name.split(' ')[0]}!</h2>
            <p>We've received your message${pkg} and will get back to you within <strong>24 hours</strong>.</p>
            <p>While you wait, you can:</p>
            <ul>
              <li><a href="https://bridgeflow.agency/templates">Browse our workflow templates</a></li>
              <li><a href="https://calendly.com/raianasan10/30min">Book a free strategy call</a></li>
              <li><a href="https://bridgeflow.agency/case-studies">Read our case studies</a></li>
            </ul>
            <hr style="border: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #6b7280; font-size: 14px;">
              BridgeFlow — AI-Powered Automation Agency<br/>
              hello@bridgeflow.agency · bridgeflow.agency
            </p>
          </div>
        `,
      }),
    })
  } catch (err) {
    console.error('[AutoReply] Email send failed:', err)
  }
}
