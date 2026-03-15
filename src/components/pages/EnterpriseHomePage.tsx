'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Zap, TrendingUp, ArrowRight, MapPin, Clock, CheckCircle } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

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
  stats: Array<{ label: string; value: string | number; suffix: string; icon?: string }>
  trustedBy: { title: string; description: string; companies: Array<{ name: string; logo: string }> }
  features: Array<{ title: string; description: string; icon: string; color: string }>
  results: Array<{ metric: string; description: string; improvement: string }>
  testimonials: Array<{ content: string; author: string; role: string; company: string; image: string; rating: number }>
  process: Array<{ number: string; title: string; description: string; icon: string }>
  cta: { title: string; description: string; primaryCta: { text: string; href: string }; secondaryCta: { text: string; href: string } }
}

// ─── 3D Tilt Hook ────────────────────────────────────────────────────────────

function useTilt(max = 10) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 260, damping: 28 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 260, damping: 28 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onMouseLeave() { x.set(0); y.set(0) }

  return { rotateX, rotateY, onMouseMove, onMouseLeave }
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

const WORKFLOW_IMAGES = [
  '/images/workflow-1.png',
  '/images/workflow-2.png',
  '/images/workflow-3.png',
]

function FeatureCard({ feature, index }: { feature: HomeContentProps['features'][number]; index: number }) {
  const tilt = useTilt(8)
  return (
    <motion.div
      style={{ perspective: 900 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="group relative p-8 rounded-[28px] border border-white/5 bg-neutral-900/40 hover:border-brand-coral/20 transition-colors duration-500 cursor-default overflow-hidden h-full"
      >
        {/* Glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-coral/5 to-transparent rounded-[28px]" />

        {/* Workflow image if available */}
        {WORKFLOW_IMAGES[index % 3] && (
          <div
            style={{ transform: 'translateZ(6px)' }}
            className="relative w-full h-36 rounded-2xl overflow-hidden mb-6 border border-white/5"
          >
            <Image
              src={WORKFLOW_IMAGES[index % 3]}
              alt={feature.title}
              fill
              className="object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
          </div>
        )}

        {/* Icon */}
        <div
          style={{ transform: 'translateZ(18px)' }}
          className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-white/5 group-hover:bg-brand-coral/10 transition-colors"
        >
          <Zap className="w-6 h-6 text-neutral-400 group-hover:text-brand-coral transition-colors" />
        </div>

        <h3
          style={{ transform: 'translateZ(14px)' }}
          className="text-xl font-black uppercase tracking-tight text-white mb-3"
        >
          {feature.title}
        </h3>
        <p
          style={{ transform: 'translateZ(10px)' }}
          className="text-neutral-400 leading-relaxed text-sm font-medium"
        >
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

// ─── Result Card ─────────────────────────────────────────────────────────────

function ResultCard({ result, index }: { result: HomeContentProps['results'][number]; index: number }) {
  const tilt = useTilt(6)
  return (
    <motion.div
      style={{ perspective: 900 }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="relative p-10 rounded-[40px] bg-neutral-900 border border-white/5 hover:border-brand-teal/20 transition-colors duration-500 cursor-default overflow-hidden group"
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-brand-teal/8 blur-[80px] group-hover:bg-brand-teal/14 transition-colors duration-700 rounded-full" />
        <div
          style={{ transform: 'translateZ(24px)' }}
          className="text-5xl md:text-6xl font-black text-brand-teal mb-4 leading-none"
        >
          {result.metric}
        </div>
        <p style={{ transform: 'translateZ(14px)' }} className="text-base font-bold text-white mb-4 uppercase tracking-tight">
          {result.description}
        </p>
        <div
          style={{ transform: 'translateZ(8px)' }}
          className="inline-flex items-center gap-2 text-neutral-500 text-[10px] font-black uppercase tracking-widest border border-white/8 px-3 py-1.5 rounded-full"
        >
          <TrendingUp className="w-3 h-3" />
          {result.improvement}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EnterpriseHomePage({ content }: { content: HomeContentProps }) {
  return (
    <main className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — Split layout: text left, 3D floating image right
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">

        {/* Background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/3 -left-48 w-[700px] h-[700px] bg-brand-coral/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-brand-purple/8 rounded-full blur-[120px]" />
          {/* 3D perspective grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              transform: 'perspective(800px) rotateX(20deg) scaleY(1.4)',
              transformOrigin: 'bottom center',
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left: Text ── */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-brand-coral animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                  {content.hero.badge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6"
              >
                {content.hero.title}{' '}
                <span className="text-brand-coral">{content.hero.highlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-neutral-400 font-medium mb-10 leading-relaxed max-w-lg"
              >
                {content.hero.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href={content.hero.ctaPrimary.href}
                  className="px-10 py-5 bg-brand-coral text-white text-base font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_50px_-10px_rgba(255,109,90,0.6)] transition-all hover:-translate-y-1 active:scale-95 inline-flex items-center gap-2"
                >
                  {content.hero.ctaPrimary.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={content.hero.ctaSecondary.href}
                  className="px-10 py-5 border border-white/10 bg-white/5 text-white text-base font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 active:scale-95"
                >
                  See How It Works
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-6 mt-10"
              >
                {['100% satisfaction', '5-day delivery', 'You own the code'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-teal" />
                    {t}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: 3D Floating Image ── */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, x: 60, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: 1200 }}
                className="relative"
              >
                {/* Outer float animation wrapper */}
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative"
                >
                  {/* Main hero image */}
                  <div className="relative w-[340px] md:w-[440px] lg:w-[500px] aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                    <Image
                      src="/images/hero-automation.png"
                      alt="BridgeFlow automation workflow"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                  </div>

                  {/* Floating badge — top left */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ delay: 0.4, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transform: 'translateZ(50px)' }}
                    className="absolute -top-5 -left-8 flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl shadow-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-coral/15 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-brand-coral" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Delivery</p>
                      <p className="text-sm font-black text-white">5 Business Days</p>
                    </div>
                  </motion.div>

                  {/* Floating badge — bottom right */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ delay: 1, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transform: 'translateZ(40px)' }}
                    className="absolute -bottom-5 -right-8 flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl shadow-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-teal/15 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-brand-teal" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Client ROI</p>
                      <p className="text-sm font-black text-white">Week 1 Payback</p>
                    </div>
                  </motion.div>

                  {/* Floating badge — right side */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ delay: 0.7, duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transform: 'translateZ(30px)' }}
                    className="absolute top-1/2 -translate-y-1/2 -right-12 flex items-center gap-2 px-3 py-2 rounded-xl border border-brand-teal/20 bg-brand-teal/5 backdrop-blur-xl"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                    <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Live</span>
                  </motion.div>
                </motion.div>

                {/* Glow beneath image */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-brand-coral/20 blur-[60px] rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-brand-coral to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 font-black">Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-y border-white/5 bg-neutral-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {content.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-brand-coral mb-2 leading-none">
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURES — 3D tilt cards with workflow images
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        {/* Section glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 blur-[200px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-coral mb-4"
              >
                What We Build
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-black uppercase tracking-tighter"
              >
                Automation <span className="text-brand-purple">That Ships</span>
              </motion.h2>
            </div>
            <Link href="/services" className="text-brand-coral font-black uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
              All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOUNDER SECTION — Real photo + brand story
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 lg:py-48 border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Photo — 3D frame */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 1000 }}
              className="flex justify-center lg:justify-start"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative"
              >
                {/* Portrait */}
                <div className="relative w-[300px] md:w-[380px] aspect-[3/4] rounded-[36px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/images/founder-portrait.png"
                    alt="Anasan Rai — Founder, BridgeFlow"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-coral mb-1">Founder</p>
                    <p className="text-xl font-black text-white">Anasan Rai</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <p className="text-xs text-neutral-400 font-medium">Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>

                {/* Floating quote card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ delay: 1, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transform: 'translateZ(40px)' }}
                  className="absolute -right-10 top-12 max-w-[200px] p-4 rounded-2xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-xl"
                >
                  <p className="text-[11px] text-neutral-300 leading-relaxed font-medium italic">
                    "n8n open in one tab. YouTube in the other. That's how BridgeFlow started."
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-coral mb-5">The Story</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8">
                Built From <span className="text-brand-purple">Zero</span>.
                <br />For Everyone Else.
              </h2>
              <div className="space-y-5 text-neutral-400 leading-relaxed font-medium">
                <p>
                  Before BridgeFlow, Anasan was carrying boxes on construction sites and doing delivery work in Kathmandu.
                  Not a CS graduate. Not a bootcamp alumni. Self-taught — driven purely by frustration at watching
                  businesses waste hundreds of hours on work that could be automated in minutes.
                </p>
                <p>
                  He taught AI tools to non-technical people in Nepal. That teaching became BridgeFlow.
                  Today we build custom n8n workflows for B2B businesses worldwide — from real estate agencies in Riyadh
                  to SaaS companies in London.
                </p>
                <p className="text-white font-bold">
                  Built in Nepal. No VC. No fancy office. Just deep automation expertise and the work ethic
                  of someone who had to earn every skill from scratch.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">
                {[
                  { label: 'Founded', value: '2025' },
                  { label: 'HQ', value: 'Kathmandu' },
                  { label: 'Clients', value: 'Global' },
                  { label: 'Model', value: 'Remote-first' },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-1">{item.label}</p>
                    <p className="text-lg font-black text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          RESULTS — 3D metric cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 lg:py-48 bg-neutral-900/20 border-b border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-teal mb-4">Proof</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Proven <span className="underline decoration-brand-teal decoration-8 underline-offset-8">ROI</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.results.map((result, i) => (
              <ResultCard key={i} result={result} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROCESS — numbered steps with depth
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 lg:py-48">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-24"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-purple mb-4">How It Works</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              The <span className="text-brand-purple">Flow</span> State
            </h2>
            <p className="mt-5 text-xl text-neutral-400 font-medium">
              Deployment in days, not months.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Connector line */}
                {i < content.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-6 h-px bg-gradient-to-r from-brand-purple/30 to-transparent z-10" />
                )}

                <div className="p-8 rounded-[28px] border border-white/5 bg-neutral-900/30 group-hover:border-brand-purple/20 group-hover:bg-neutral-900/50 transition-all duration-500 h-full">
                  {/* Large background number */}
                  <div className="text-8xl font-black text-white/[0.04] group-hover:text-brand-purple/8 transition-colors leading-none mb-4 -mt-2 -ml-1 select-none">
                    {step.number}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-brand-purple/15 flex items-center justify-center">
                      <span className="text-[10px] font-black text-brand-purple">{step.number}</span>
                    </div>
                    <Clock className="w-4 h-4 text-neutral-600" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-3">{step.title}</h3>
                  <p className="text-neutral-400 text-sm font-medium leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-40 lg:py-56 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-brand-coral/3 blur-[200px] pointer-events-none" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto rounded-[56px] border border-white/8 bg-neutral-900/50 backdrop-blur-xl p-16 md:p-28 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-coral/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-coral mb-6">Ready?</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              Stop Doing Manually<br />
              What a <span className="text-brand-coral">Machine</span> Can Do.
            </h2>
            <p className="text-xl text-neutral-400 font-medium mb-14 max-w-2xl mx-auto">
              30-minute free audit. Top 3 automation opportunities. ROI estimate with real numbers. No pitch.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href={content.cta.primaryCta.href}
                className="px-14 py-7 bg-brand-coral text-white text-xl font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_70px_-15px_rgba(255,109,90,0.7)] transition-all hover:-translate-y-2 active:scale-95 inline-flex items-center gap-2"
              >
                Book Free Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="px-14 py-7 border border-white/10 bg-white/5 text-white text-xl font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all hover:-translate-y-2 active:scale-95"
              >
                View Services
              </Link>
            </div>

            <p className="mt-8 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-600">
              No credit card. No pressure. No sales pitch. — Anasan Rai, Founder
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
