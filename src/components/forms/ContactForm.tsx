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
        className="rounded-[40px] border border-brand-teal/30 bg-brand-teal/5 p-16 text-center"
      >
        <div className="flex justify-center mb-10">
          <CheckCircle className="w-20 h-20 text-brand-teal" />
        </div>
        <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Brief Received</h3>
        <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs mb-10">{serverMessage}</p>
        <button
          onClick={() => setStatus('idle')}
          className="px-12 py-5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white/10 transition-all"
        >
          Send New Brief
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
      className="space-y-10"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 ml-6">Engineering Lead</label>
          <div className="relative group">
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-brand-coral transition-colors pointer-events-none">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              {...field('name')}
              className={`w-full pl-16 pr-8 py-6 rounded-full bg-neutral-900 border ${
                errors.name ? 'border-brand-coral/50' : 'border-white/5 focus:border-brand-coral/50'
              } text-white placeholder-neutral-700 focus:outline-none transition-all font-medium`}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 ml-6">Secure Email</label>
          <div className="relative group">
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-brand-coral transition-colors pointer-events-none">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="work@enterprise.com"
              {...field('email')}
              className={`w-full pl-16 pr-8 py-6 rounded-full bg-neutral-900 border ${
                errors.email ? 'border-brand-coral/50' : 'border-white/5 focus:border-brand-coral/50'
              } text-white placeholder-neutral-700 focus:outline-none transition-all font-medium`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 ml-6">Communications</label>
          <div className="relative group">
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-brand-coral transition-colors pointer-events-none">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              placeholder="Phone (optional)"
              {...field('phone')}
              className="w-full pl-16 pr-8 py-6 rounded-full bg-neutral-900 border border-white/5 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-coral/50 transition-all font-medium"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 ml-6">Selection</label>
          <div className="relative group">
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-brand-coral transition-colors pointer-events-none z-10">
              <Package className="w-4 h-4" />
            </div>
            <select
              {...field('package_interest')}
              className="w-full pl-16 pr-12 py-6 rounded-full bg-neutral-900 border border-white/5 text-white focus:outline-none focus:border-brand-coral/50 transition-all appearance-none cursor-pointer font-medium"
            >
              {PACKAGES.map((p) => (
                <option key={p.value} value={p.value} className="bg-neutral-900">
                  {p.label}
                </option>
              ))}
            </select>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600 group-focus-within:text-brand-coral">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 ml-6">Technical Brief</label>
        <div className="relative group">
          <div className="absolute left-8 top-8 text-neutral-600 group-focus-within:text-brand-coral transition-colors pointer-events-none">
            <MessageSquare className="w-4 h-4" />
          </div>
          <textarea
            rows={6}
            placeholder="Tell us about your automation goals..."
            {...field('message')}
            className={`w-full pl-16 pr-8 py-8 rounded-[40px] bg-neutral-900 border ${
              errors.message ? 'border-brand-coral/50' : 'border-white/5 focus:border-brand-coral/50'
            } text-white placeholder-neutral-700 focus:outline-none transition-all resize-none font-medium`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-8 coral-gradient text-white text-sm font-black uppercase tracking-[0.3em] rounded-full hover:shadow-[0_0_80px_-15px_rgba(255,109,90,0.6)] transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
      >
        {status === 'loading' ? "TRANSMITTING..." : "SEND Project Brief"}
      </button>

      <div className="flex items-center justify-center gap-2 text-neutral-600">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
        <p className="text-[9px] font-black uppercase tracking-[0.2em]">Encrypted Transmission Protocol Active</p>
      </div>
    </motion.form>
  )
}
