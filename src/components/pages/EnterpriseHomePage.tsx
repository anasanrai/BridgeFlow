'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  TrendingUp,
  Users,
  Lightbulb,
  Target,
} from 'lucide-react'

interface HomeContentProps {
  hero: {
    badge: string
    title: string
    titleLine2: string
    highlight: string
    description: string
    ctaPrimary: { text: string; href: string }
    ctaSecondary: { text: string; href: string }
    image: string
  }
  stats: Array<{
    label: string
    value: string | number
    suffix: string
    icon?: string
  }>
  trustedBy: {
    title: string
    description: string
    companies: Array<{ name: string; logo: string }>
  }
  features: Array<{
    title: string
    description: string
    icon: string
    color: string
  }>
  results: Array<{
    metric: string
    description: string
    improvement: string
  }>
  testimonials: Array<{
    content: string
    author: string
    role: string
    company: string
    image: string
    rating: number
  }>
  process: Array<{
    number: string
    title: string
    description: string
    icon: string
  }>
  cta: {
    title: string
    description: string
    primaryCta: { text: string; href: string }
    secondaryCta: { text: string; href: string }
  }
}

interface HomePageProps {
  content: HomeContentProps
}

/**
 * Enterprise-level home page component
 * Dynamically renders all sections from admin-managed content
 */
export default function EnterpriseHomePage({ content }: HomePageProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* ===== PREMIUM HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-coral/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-[0.03]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-10"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-brand-coral animate-ping" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-400">
              {content.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-[0.85] mb-8">
              {content.hero.title} <span className="text-brand-coral">{content.hero.highlight}</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-neutral-400 font-medium mb-12 leading-relaxed"
          >
            {content.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href={content.hero.ctaPrimary.href}
              className="px-12 py-6 bg-brand-coral text-white text-xl font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_50px_-12px_rgba(255,109,90,0.5)] transition-all transform hover:-translate-y-1 active:scale-95"
            >
              {content.hero.ctaPrimary.text}
            </Link>
            <Link
              href={content.hero.ctaSecondary.href}
              className="px-12 py-6 border-2 border-white/10 bg-white/5 text-white text-xl font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-coral to-transparent" />
          <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">Scroll</span>
        </motion.div>
      </section>


      {/* ===== STATS SECTION ===== */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-gold-400 mb-2">
                  {stat.value}
                  <span className="text-gold-400">{stat.suffix}</span>
                </div>
                <p className="text-gray-400 text-sm lg:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== STATS BAR ===== */}
      <section className="py-20 border-y border-white/5 bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-brand-coral mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES / CAPABILITIES ===== */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                Enterprise <span className="text-brand-purple">Capabilities</span>
              </h2>
              <p className="text-xl text-neutral-400 font-medium">
                We don't build toys. We build mission-critical infrastructure that scales.
              </p>
            </div>
            <Link href="/services" className="text-brand-coral font-black uppercase tracking-widest text-sm hover:underline">
              View All Services →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 rounded-[40px] border border-white/5 bg-neutral-900/30 hover:bg-neutral-900/60 hover:border-brand-coral/20 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-white/5 group-hover:bg-brand-coral/10 transition-colors`}>
                  <Zap className="w-8 h-8 text-neutral-400 group-hover:text-brand-coral transition-colors" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS SECTION ===== */}
      <section className="py-32 lg:py-48 bg-neutral-900/20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 underline decoration-brand-teal decoration-8 underline-offset-8">
              Proven ROI
            </h2>
            <p className="text-xl text-neutral-400 font-medium">
              Real metrics from global enterprise implementations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {content.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-[50px] bg-neutral-900 border border-white/5 relative group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 blur-[60px] group-hover:bg-brand-teal/10 transition-colors" />
                <div className="text-6xl font-black text-brand-teal mb-6">
                  {result.metric}
                </div>
                <p className="text-lg font-bold text-white mb-4 uppercase tracking-tight">
                  {result.description}
                </p>
                <div className="inline-flex items-center gap-2 text-neutral-500 text-[11px] font-black uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {result.improvement}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="py-32 lg:py-48">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
              The <span className="text-brand-purple">Flow</span> State
            </h2>
            <p className="text-xl text-neutral-400 font-medium max-w-2xl mx-auto">
              Deployment in days, not months. A lean, high-velocity approach for the modern enterprise.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {content.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group p-8"
              >
                <div className="text-9xl font-black text-white/5 absolute -top-10 -left-4 pointer-events-none group-hover:text-brand-purple/10 transition-colors">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-48 lg:py-64 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-brand-coral/5 opacity-30 blur-[150px] -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto rounded-[60px] border border-white/10 bg-neutral-900/50 backdrop-blur-xl p-16 md:p-32 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-coral/50 to-transparent" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
                Ready to <span className="text-brand-coral">Bridge</span> the Gap?
              </h2>
              <p className="text-2xl text-neutral-400 font-medium mb-16 max-w-3xl mx-auto">
                Stop talking about efficiency. Start operating with it.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href={content.cta.primaryCta.href}
                  className="px-16 py-8 bg-brand-coral text-white text-2xl font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_80px_-15px_rgba(255,109,90,0.6)] transition-all transform hover:-translate-y-2 active:scale-95"
                >
                  Book Your Audit
                </Link>
                <Link
                  href="/solutions"
                  className="px-16 py-8 border-2 border-white/10 bg-white/5 text-white text-2xl font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all transform hover:-translate-y-2 active:scale-95"
                >
                  Our Solutions
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

