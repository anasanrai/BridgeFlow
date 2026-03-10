'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const PayPalCheckout = dynamic(() => import('@/components/PayPalCheckout'), {
  loading: () => (
    <div className="h-16 rounded-xl bg-white/5 border border-white/10 animate-pulse flex items-center justify-center text-gray-500 text-sm">
      Loading payment options...
    </div>
  ),
  ssr: false,
})

interface PackagePageProps {
  slug: 'starter' | 'growth' | 'pro'
  name: string
  price: number
  tagline: string
  description: string
  included: string[]
  notIncluded: string[]
  badge?: string
  accentFrom?: string
  accentTo?: string
}

export default function PackagePage({
  slug,
  name,
  price,
  tagline,
  description,
  included,
  notIncluded,
  badge,
  accentFrom = 'from-amber-400',
  accentTo = 'to-orange-500',
}: PackagePageProps) {
  const [purchased, setPurchased] = useState(false)
  const [purchaseData, setPurchaseData] = useState<{ transactionId: string; buyerName: string; buyerEmail: string } | null>(null)
  const [payError, setPayError] = useState<string | null>(null)

  if (purchased && purchaseData) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-white mb-3">Payment Successful!</h1>
          <p className="text-gray-400 mb-6">
            Welcome to BridgeFlow, {purchaseData.buyerName?.split(' ')[0] || 'there'}! A confirmation email has been sent to{' '}
            <span className="text-amber-400">{purchaseData.buyerEmail}</span>.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Package</span>
              <span className="text-white font-medium">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount paid</span>
              <span className="text-amber-400 font-bold">${price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Transaction ID</span>
              <span className="text-white text-xs font-mono">{purchaseData.transactionId}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Anasan will reach out to you within 2 hours to kick things off.
          </p>
          <Link href="/" className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl transition">
            Back to Home →
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <Link href="/pricing" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm mb-8 transition">
            ← All Packages
          </Link>
          {badge && (
            <div className="inline-flex mb-4">
              <span className="bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1 text-sm text-amber-400 font-medium">
                {badge}
              </span>
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className={`bg-gradient-to-r ${accentFrom} ${accentTo} bg-clip-text text-transparent`}>
              {name}
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-2">{tagline}</p>
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-5xl font-bold text-white">${price}</span>
            <span className="text-gray-500">one-time</span>
          </div>
        </div>
      </section>

      {/* Content + Checkout */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: What's included */}
          <div className="space-y-8">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{description}</p>
              
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-green-400">✓</span> What's included
              </h2>
              <ul className="space-y-3">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {notIncluded.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-red-400">✕</span> Not included
                </h2>
                <ul className="space-y-3">
                  {notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-500">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xs">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: '🔒', text: 'Secure checkout' },
                { icon: '↩️', text: 'Revision guarantee' },
                { icon: '⚡', text: 'Fast delivery' },
                { icon: '📋', text: 'Full documentation' },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{t.icon}</span>
                  {t.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Checkout */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">Complete your purchase</h3>
                <p className="text-gray-400 text-sm">
                  Pay securely with PayPal, credit/debit card, or bank transfer.
                </p>
              </div>

              {/* Order summary */}
              <div className="bg-black/30 rounded-xl p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>{name}</span>
                  <span>${price}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span className="text-amber-400">${price} USD</span>
                </div>
              </div>

              {payError && (
                <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
                  {payError}
                </div>
              )}

              <PayPalCheckout
                packageSlug={slug}
                packageName={name}
                price={price}
                onSuccess={(data) => {
                  setPurchaseData(data)
                  setPurchased(true)
                }}
                onError={(err) => setPayError(err)}
              />

              <p className="text-center text-xs text-gray-600 mt-4">
                By completing this purchase you agree to our{' '}
                <Link href="/terms-of-service" className="underline hover:text-gray-400">
                  Terms of Service
                </Link>
              </p>
            </div>

            {/* Alternative: Book a call */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/3 p-5 text-center">
              <p className="text-sm text-gray-400 mb-3">
                Not ready to pay online? Prefer to talk first?
              </p>
              <a
                href="https://calendly.com/raianasan10/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-sm font-medium underline underline-offset-2 transition"
              >
                Book a free 30-min call →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
