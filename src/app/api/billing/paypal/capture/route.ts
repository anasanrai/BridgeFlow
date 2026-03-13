import { NextRequest } from 'next/server'
import { createServerSideClient } from '@/lib/supabase/server'
import { captureOrder } from '@/services/paypal/client'
import { apiSuccess, apiError } from '@/lib/api-response'

/**
 * POST /api/billing/paypal/capture
 * Captures a PayPal order after user approval
 */
export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json()
    const supabase = createServerSideClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return apiError('Unauthorized', 401)

    // Capture the payment
    const capture = await captureOrder(orderID)

    if (capture.status !== 'COMPLETED') {
      return apiError(`Payment status: ${capture.status}`, 400)
    }

    // Extract metadata from custom_id
    const metadata = JSON.parse(capture.purchase_units[0].payments.captures[0].custom_id || '{}')
    const { orgId, planId } = metadata

    // Synchronize with database
    if (orgId) {
      // 1. Update Organization Plan
      await (supabase.from('organizations' as any) as any).update({ plan: planId }).eq('id', orgId)

      // 2. Insert Subscription Record
      await (supabase.from('subscriptions' as any) as any).upsert({
        org_id: orgId,
        stripe_subscription_id: `paypal_${capture.id}`, // Reuse column or generic name
        plan: planId,
        status: 'active',
        // In a real app, calculate actual period from PayPal response
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      })
    }

    return apiSuccess({ 
      message: 'Payment captured successfully',
      captureID: capture.id 
    })
  } catch (error: any) {
    return apiError('Internal Server Error', 500, error.message)
  }
}
