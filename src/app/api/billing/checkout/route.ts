import { NextRequest } from 'next/server'
import { createServerSideClient } from '@/lib/supabase/server'
import { stripe } from '@/services/stripe/client'
import { apiSuccess, apiError } from '@/lib/api-response'
import { getPlanById } from '@/modules/billing/plans'

/**
 * POST /api/billing/checkout
 * Creates a Stripe Checkout Session for a subscription plan
 */
export async function POST(req: NextRequest) {
  try {
    const { planId, orgId } = await req.json()
    const supabase = createServerSideClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return apiError('Unauthorized', 401)

    const plan = getPlanById(planId)
    if (!plan) return apiError('Invalid plan selected', 400)

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing?status=cancelled`,
      customer_email: user.email,
      client_reference_id: orgId || user.id,
      metadata: {
        userId: user.id,
        orgId: orgId || '',
        planId: plan.id,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          orgId: orgId || '',
        },
      },
    })

    return apiSuccess({ url: session.url })
  } catch (error: any) {
    return apiError('Internal Server Error', 500, error.message)
  }
}
