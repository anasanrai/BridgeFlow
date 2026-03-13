import { NextRequest } from 'next/server'
import { createServerSideClient } from '@/lib/supabase/server'
import { createOrder } from '@/services/paypal/client'
import { apiSuccess, apiError } from '@/lib/api-response'
import { getPlanById } from '@/modules/billing/plans'

/**
 * POST /api/billing/paypal/create
 * Creates a PayPal Order for a subscription plan or one-off purchase
 */
export async function POST(req: NextRequest) {
  try {
    const { planId, orgId } = await req.json()
    const supabase = createServerSideClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return apiError('Unauthorized', 401)

    const plan = getPlanById(planId)
    if (!plan) return apiError('Invalid plan selected', 400)

    // Create PayPal Order
    const order = await createOrder(plan.price, plan.currency, {
      userId: user.id,
      orgId: orgId || '',
      planId: plan.id,
    })

    if (!order.id) {
      return apiError('Failed to create PayPal order', 500)
    }

    return apiSuccess({ orderID: order.id })
  } catch (error: any) {
    return apiError('Internal Server Error', 500, error.message)
  }
}
