import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendTelegram, newPurchaseMessage } from '@/lib/telegram'
import { PACKAGES } from '../create-order/route'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox'
const PAYPAL_BASE =
  PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  if (!data.access_token) throw new Error('Failed to get PayPal access token')
  return data.access_token
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, packageSlug } = await req.json()

    if (!orderId || !packageSlug) {
      return NextResponse.json({ error: 'Missing orderId or packageSlug' }, { status: 400 })
    }

    const pkg = PACKAGES[packageSlug]
    if (!pkg) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 })
    }

    const accessToken = await getAccessToken()

    // Capture the PayPal order
    const captureRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const capture = await captureRes.json()

    if (capture.status !== 'COMPLETED') {
      console.error('[PayPal] Capture failed:', capture)
      return NextResponse.json({ error: 'Payment capture failed', details: capture }, { status: 400 })
    }

    const payer = capture.payer
    const captureUnit = capture.purchase_units?.[0]?.payments?.captures?.[0]
    const transactionId = captureUnit?.id || orderId
    const buyerName = `${payer?.name?.given_name || ''} ${payer?.name?.surname || ''}`.trim()
    const buyerEmail = payer?.email_address || ''

    // Save to Supabase purchases table
    if (supabaseAdmin) {
      const { error: dbErr } = await supabaseAdmin.from('purchases').insert({
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        email: buyerEmail,
        package_name: pkg.name,
        amount: pkg.price,
        currency: 'USD',
        paypal_order_id: orderId,
        transaction_id: transactionId,
        status: 'completed',
        payment_method: 'paypal',
      })

      if (dbErr) {
        console.error('[Purchase] Supabase insert error:', dbErr)
        // Don't fail the request — payment succeeded, just log
      }
    }

    // Fire Telegram notification
    sendTelegram(
      newPurchaseMessage({
        package_name: pkg.name,
        amount: pkg.price,
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        transaction_id: transactionId,
      })
    ).catch(console.error)

    // Send confirmation email to buyer
    await sendConfirmationEmail({ buyerName, buyerEmail, packageName: pkg.name, packageSlug })

    return NextResponse.json({
      success: true,
      transactionId,
      buyerName,
      buyerEmail,
      packageName: pkg.name,
      amount: pkg.price,
    })
  } catch (err) {
    console.error('[PayPal] Capture error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

async function sendConfirmationEmail({
  buyerName,
  buyerEmail,
  packageName,
  packageSlug,
}: {
  buyerName: string
  buyerEmail: string
  packageName: string
  packageSlug: string
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.log('[ConfirmEmail] RESEND_API_KEY not set, skipping')
    return
  }

  const packageFeatures: Record<string, string[]> = {
    starter: ['1 custom n8n workflow', 'Up to 5 integrations', '14 days support', '5 business day delivery'],
    growth:  ['3 custom n8n workflows', 'CRM integration', 'Email automation', '30 days monitoring'],
    pro:     ['5 custom workflows', 'Full CRM + GHL setup', 'AI integrations', '60 days monitoring', 'Team training'],
  }
  const features = packageFeatures[packageSlug] || []
  const featureList = features.map(f => `<li>${f}</li>`).join('')

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'BridgeFlow <hello@bridgeflow.agency>',
        to: buyerEmail,
        subject: `Welcome to BridgeFlow — Here's what happens next 🚀`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <div style="background: linear-gradient(135deg, #1a1a2e, #0f172a); padding: 40px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: #f59e0b; margin: 0; font-size: 28px;">🎉 Welcome to BridgeFlow</h1>
              <p style="color: #94a3b8; margin: 8px 0 0;">Your automation journey starts now</p>
            </div>
            <div style="background: #f8fafc; padding: 40px; border-radius: 0 0 12px 12px;">
              <h2>Hi ${buyerName.split(' ')[0] || 'there'},</h2>
              <p>Your <strong>${packageName}</strong> purchase is confirmed. Here's what you've unlocked:</p>
              <ul style="background: white; padding: 20px 20px 20px 40px; border-radius: 8px; border: 1px solid #e5e7eb;">
                ${featureList}
              </ul>
              <h3 style="color: #f59e0b;">What happens next?</h3>
              <ol>
                <li><strong>Within 2 hours:</strong> Anasan will email you directly to schedule your kickoff call</li>
                <li><strong>Kickoff call:</strong> We'll map out your automation strategy together</li>
                <li><strong>Build phase:</strong> Your workflows go live within the delivery window</li>
                <li><strong>Handoff:</strong> Full documentation + Loom walkthroughs delivered</li>
              </ol>
              <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; margin-top: 24px; text-align: center;">
                <p style="color: #94a3b8; margin: 0 0 12px;">Questions? Reply to this email or reach out directly:</p>
                <a href="mailto:hello@bridgeflow.agency" style="color: #f59e0b; font-weight: bold;">hello@bridgeflow.agency</a>
              </div>
              <hr style="border: 1px solid #e5e7eb; margin: 32px 0;" />
              <p style="color: #6b7280; font-size: 12px; text-align: center;">
                BridgeFlow — AI-Powered Automation Agency · bridgeflow.agency
              </p>
            </div>
          </div>
        `,
      }),
    })
  } catch (err) {
    console.error('[ConfirmEmail] Send failed:', err)
  }
}
