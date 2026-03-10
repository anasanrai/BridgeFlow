import { NextRequest, NextResponse } from 'next/server'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox'

const PAYPAL_BASE =
  PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

async function getAccessToken(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal credentials not configured')
  }

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

// Package definitions — source of truth
export const PACKAGES: Record<string, { name: string; price: number; description: string }> = {
  starter: { name: 'Starter Package', price: 497, description: '1 custom n8n workflow + 14 days support' },
  growth:  { name: 'Growth Package',  price: 797, description: '3 custom n8n workflows + CRM integration + 30 days monitoring' },
  pro:     { name: 'Pro Package',     price: 1497, description: '5 workflows + full CRM + AI integrations + 60 days monitoring' },
}

export async function POST(req: NextRequest) {
  try {
    const { packageSlug } = await req.json()

    const pkg = PACKAGES[packageSlug]
    if (!pkg) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 })
    }

    const accessToken = await getAccessToken()

    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: packageSlug,
            description: pkg.description,
            amount: {
              currency_code: 'USD',
              value: pkg.price.toString(),
            },
          },
        ],
        application_context: {
          brand_name: 'BridgeFlow',
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/packages/${packageSlug}/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/packages/${packageSlug}`,
          user_action: 'PAY_NOW',
        },
      }),
    })

    const order = await res.json()

    if (!order.id) {
      console.error('[PayPal] Create order failed:', order)
      return NextResponse.json({ error: 'PayPal order creation failed' }, { status: 500 })
    }

    return NextResponse.json({ orderId: order.id })
  } catch (err) {
    console.error('[PayPal] Create order error:', err)
    return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 })
  }
}
