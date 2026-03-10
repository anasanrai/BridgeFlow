'use client'

import { useState, FormEvent } from 'react'

interface FormState {
  name: string
  email: string
  phone: string
  package_interest: string
  message: string
}

const PACKAGES = [
  { value: '', label: 'Select a package (optional)' },
  { value: 'Starter Package ($497)', label: 'Starter — $497' },
  { value: 'Growth Package ($797)', label: 'Growth — $797' },
  { value: 'Pro Package ($1,497)', label: 'Pro — $1,497' },
  { value: 'Not sure yet', label: 'Not sure yet' },
  { value: 'Custom Project', label: 'Custom Project' },
]

export default function ContactForm({ defaultPackage }: { defaultPackage?: string }) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    package_interest: defaultPackage || '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const validate = (): boolean => {
    const errs: Partial<FormState> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address'
    }
    if (!form.message.trim()) errs.message = 'Tell us about your project'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact_page' }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setServerMessage(data.message || 'Message sent! We\'ll respond within 24 hours.')
      setForm({ name: '', email: '', phone: '', package_interest: '', message: '' })
    } catch (err: unknown) {
      setStatus('error')
      setServerMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    }
  }

  const field = (id: keyof FormState) => ({
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [id]: e.target.value })),
  })

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-white mb-2">Message received!</h3>
        <p className="text-gray-400">{serverMessage}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-amber-400 hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            {...field('name')}
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
              errors.name ? 'border-red-500/50' : 'border-white/10'
            } text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            {...field('email')}
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
              errors.email ? 'border-red-500/50' : 'border-white/10'
            } text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      {/* Phone + Package */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...field('phone')}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition"
          />
        </div>
        <div>
          <label htmlFor="package_interest" className="block text-sm font-medium text-gray-300 mb-1.5">
            Package Interest
          </label>
          <select
            id="package_interest"
            {...field('package_interest')}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition appearance-none"
          >
            {PACKAGES.map((p) => (
              <option key={p.value} value={p.value} className="bg-gray-900">
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">
          Project Details <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your business, what you want to automate, and your current tools..."
          {...field('message')}
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
            errors.message ? 'border-red-500/50' : 'border-white/10'
          } text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          {serverMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 px-6 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message →'
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        🔒 Your information is secure and will never be shared.
      </p>
    </form>
  )
}
