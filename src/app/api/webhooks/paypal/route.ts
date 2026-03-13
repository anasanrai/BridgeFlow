import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

/**
 * PayPal Webhook Handler
 * Handles recurring payment events, cancellations, and status changes.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { event_type, resource } = body
    const supabase = createAdminClient()

    // 1. Log the webhook event
    await (supabase.from('activity_log' as any) as any).insert({
      action: `paypal_webhook_${event_type}`,
      section: 'Billing',
      details: JSON.stringify(body)
    })

    // 2. Handle specific event types
    switch (event_type) {
      case 'BILLING.SUBSCRIPTION.CREATED':
      case 'BILLING.SUBSCRIPTION.ACTIVATED': {
        const orgId = resource.custom_id || resource.metadata?.orgId
        if (orgId) {
          await (supabase.from('organizations' as any) as any)
            .update({ plan: resource.plan_id }) // Map this to your internal plan ID if needed
            .eq('id', orgId)
        }
        break
      }

      case 'BILLING.SUBSCRIPTION.CANCELLED':
      case 'BILLING.SUBSCRIPTION.EXPIRED':
      case 'BILLING.SUBSCRIPTION.SUSPENDED': {
        const orgId = resource.custom_id || resource.metadata?.orgId
        if (orgId) {
          await (supabase.from('organizations' as any) as any)
            .update({ plan: 'free' })
            .eq('id', orgId)
          
          await (supabase.from('subscriptions' as any) as any)
            .update({ status: 'inactive' })
            .eq('org_id', orgId)
        }
        break
      }

      case 'PAYMENT.SALE.COMPLETED': {
        // Handle successful recurring payment
        const subscriptionId = resource.billing_agreement_id
        if (subscriptionId) {
          await (supabase.from('subscriptions' as any) as any)
            .update({ 
              status: 'active',
              updated_at: new Date().toISOString()
            })
            .eq('stripe_subscription_id', subscriptionId) // Reusing the column
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('PayPal Webhook Error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
