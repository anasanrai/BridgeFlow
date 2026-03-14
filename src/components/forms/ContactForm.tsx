'use client'

import { motion, AnimatePresence } from 'framer-motion'

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
        <label className="relative group block">
          <input
            id="name"
            type="text"
            placeholder=" "
            {...field('name')}
            className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${
              errors.name ? 'border-red-500/50' : 'border-white/10'
            } text-white placeholder-transparent focus:outline-none focus:border-gold-400/50 focus:ring-0 transition-all peer`}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gold-400 peer-focus:bg-navy-950 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-navy-950 peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
            Full Name <span className="text-red-400">*</span>
          </span>
          <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold-400/0 to-transparent group-focus-within:via-gold-400 transition-all duration-500" />
          {errors.name && <p className="mt-1 text-xs text-red-400 ml-1">{errors.name}</p>}
        </label>

        <label className="relative group block">
          <input
            id="email"
            type="email"
            placeholder=" "
            {...field('email')}
            className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${
              errors.email ? 'border-red-500/50' : 'border-white/10'
            } text-white placeholder-transparent focus:outline-none focus:border-gold-400/50 focus:ring-0 transition-all peer`}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gold-400 peer-focus:bg-navy-950 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-navy-950 peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
            Email Address <span className="text-red-400">*</span>
          </span>
          <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold-400/0 to-transparent group-focus-within:via-gold-400 transition-all duration-500" />
          {errors.email && <p className="mt-1 text-xs text-red-400 ml-1">{errors.email}</p>}
        </label>
      </div>

      {/* Phone + Package */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="relative group block">
          <input
            id="phone"
            type="tel"
            placeholder=" "
            {...field('phone')}
            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-gold-400/50 focus:ring-0 transition-all peer"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gold-400 peer-focus:bg-navy-950 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-navy-950 peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
            Phone (optional)
          </span>
          <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold-400/0 to-transparent group-focus-within:via-gold-400 transition-all duration-500" />
        </label>

        <label className="relative group block">
          <select
            id="package_interest"
            {...field('package_interest')}
            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-400/50 focus:ring-0 transition-all appearance-none cursor-pointer"
          >
            {PACKAGES.map((p) => (
              <option key={p.value} value={p.value} className="bg-gray-900">
                {p.label || 'Select a package (optional)'}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold-400/0 to-transparent group-focus-within:via-gold-400 transition-all duration-500" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-focus-within:text-gold-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </label>
      </div>

      {/* Message */}
      <label className="relative group block">
        <textarea
          id="message"
          rows={5}
          placeholder=" "
          {...field('message')}
          className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${
            errors.message ? 'border-red-500/50' : 'border-white/10'
          } text-white placeholder-transparent focus:outline-none focus:border-gold-400/50 focus:ring-0 transition-all peer resize-none`}
        />
        <span className="absolute left-4 top-6 text-sm text-gray-500 transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gold-400 peer-focus:bg-navy-950 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-navy-950 peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
          Project Details <span className="text-red-400">*</span>
        </span>
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold-400/0 to-transparent group-focus-within:via-gold-400 transition-all duration-500" />
        {errors.message && <p className="mt-1 text-xs text-red-400 ml-1">{errors.message}</p>}
      </label>

      {status === 'error' && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400"
        >
          {serverMessage}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full relative py-4 px-6 bg-gold-400 hover:bg-gold-300 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer-btn transition-transform" />
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </>
        ) : (
          <span className="relative z-10 flex items-center gap-2">
            Send Message <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </span>
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        🔒 Encrypted & Direct Protocol
      </p>
    </motion.form>
  )
}</form>
  )
}
