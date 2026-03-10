'use client'

import { useState } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

interface PayPalCheckoutProps {
  packageSlug: 'starter' | 'growth' | 'pro'
  packageName: string
  price: number
  onSuccess?: (data: { transactionId: string; buyerName: string; buyerEmail: string }) => void
  onError?: (err: string) => void
}

export default function PayPalCheckout({
  packageSlug,
  packageName,
  price,
  onSuccess,
  onError,
}: PayPalCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''

  if (!clientId) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-center text-sm text-amber-400">
        Payment system is being configured. Please contact{' '}
        <a href="mailto:hello@bridgeflow.agency" className="underline">
          hello@bridgeflow.agency
        </a>{' '}
        to purchase.
      </div>
    )
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <div className="space-y-3">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center text-sm text-gray-400 py-2 animate-pulse">
            Processing your payment...
          </div>
        )}

        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'pay',
            height: 48,
          }}
          disabled={loading}
          createOrder={async () => {
            setLoading(true)
            setError(null)
            try {
              const res = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ packageSlug }),
              })
              const data = await res.json()
              if (!res.ok || !data.orderId) {
                throw new Error(data.error || 'Failed to create order')
              }
              return data.orderId
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : 'Failed to initialize payment'
              setError(msg)
              onError?.(msg)
              setLoading(false)
              throw err
            }
          }}
          onApprove={async (data) => {
            setLoading(true)
            try {
              const res = await fetch('/api/paypal/capture-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: data.orderID, packageSlug }),
              })
              const result = await res.json()
              if (!res.ok || !result.success) {
                throw new Error(result.error || 'Payment capture failed')
              }
              onSuccess?.({
                transactionId: result.transactionId,
                buyerName: result.buyerName,
                buyerEmail: result.buyerEmail,
              })
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : 'Payment capture failed'
              setError(msg)
              onError?.(msg)
            } finally {
              setLoading(false)
            }
          }}
          onError={(err) => {
            console.error('[PayPal] Button error:', err)
            const msg = 'Payment failed. Please try again or contact us.'
            setError(msg)
            onError?.(msg)
            setLoading(false)
          }}
          onCancel={() => {
            setLoading(false)
          }}
        />
        <p className="text-center text-xs text-gray-500">
          🔒 Secured by PayPal · 256-bit SSL encryption
        </p>
      </div>
    </PayPalScriptProvider>
  )
}
