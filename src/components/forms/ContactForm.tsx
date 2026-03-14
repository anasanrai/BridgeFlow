'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2, Mail, Phone, User, MessageSquare, Package } from 'lucide-react'

interface FormState {
  name: string
  email: string
  phone: string
  company: string
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
    company: '',
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
    if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
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
      setForm({ name: '', email: '', phone: '', company: '', package_interest: '', message: '' })
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Received! 🎉</h3>
        <p className="text-gray-400 mb-6">{serverMessage}</p>
        <button
          onClick={() => setStatus('idle')}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Send another message →
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-400 transition-colors pointer-events-none">
            <User className="w-4 h-4" />
          </div>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            {...field('name')}
            className={`w-full pl-12 pr-5 py-4 rounded-xl bg-white/5 border ${
              errors.name ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10 focus:border-gold-400/50'
            } text-white placeholder-gray-600 focus:outline-none focus:ring-1 ${
              errors.name ? 'focus:ring-red-500/30' : 'focus:ring-gold-400/20'
            } transition-all`}
          />
          {errors.name && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-400 transition-colors pointer-events-none">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            {...field('email')}
            className={`w-full pl-12 pr-5 py-4 rounded-xl bg-white/5 border ${
              errors.email ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10 focus:border-gold-400/50'
            } text-white placeholder-gray-600 focus:outline-none focus:ring-1 ${
              errors.email ? 'focus:ring-red-500/30' : 'focus:ring-gold-400/20'
            } transition-all`}
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-400 transition-colors pointer-events-none">
            <Phone className="w-4 h-4" />
          </div>
          <input
            id="phone"
            type="tel"
            placeholder="Phone (optional)"
            {...field('phone')}
            className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-400 transition-colors pointer-events-none">
            <User className="w-4 h-4" />
          </div>
          <input
            id="company"
            type="text"
            placeholder="Company (optional)"
            {...field('company')}
            className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
          />
        </div>
      </div>

      {/* Package Interest */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-400 transition-colors pointer-events-none z-10">
          <Package className="w-4 h-4" />
        </div>
        <select
          id="package_interest"
          {...field('package_interest')}
          className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all appearance-none cursor-pointer"
        >
          {PACKAGES.map((p) => (
            <option key={p.value} value={p.value} className="bg-navy-900">
              {p.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-focus-within:text-gold-400 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Message */}
      <div className="relative group">
        <div className="absolute left-4 top-4 text-gray-500 group-focus-within:text-gold-400 transition-colors pointer-events-none">
          <MessageSquare className="w-4 h-4" />
        </div>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project..."
          {...field('message')}
          className={`w-full pl-12 pr-5 py-4 rounded-xl bg-white/5 border ${
            errors.message ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10 focus:border-gold-400/50'
          } text-white placeholder-gray-600 focus:outline-none focus:ring-1 ${
            errors.message ? 'focus:ring-red-500/30' : 'focus:ring-gold-400/20'
          } transition-all resize-none`}
        />
        {errors.message && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          {form.message.length}/500 characters
        </p>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {serverMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full relative py-4 px-6 bg-gold-400 hover:bg-gold-300 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn overflow-hidden shadow-lg hover:shadow-gold-400/25"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="relative z-10">Processing...</span>
          </>
        ) : (
          <span className="relative z-10 flex items-center gap-2">
            Send Message <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </span>
        )}
      </button>

      <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
        🔒 Your data is encrypted and secure
      </p>
    </motion.form>
  )
}
