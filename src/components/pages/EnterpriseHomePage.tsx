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
export default function EnterprisHomePage({ content }: HomePageProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center py-20 lg:py-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="z-10"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 mb-6 w-fit"
              >
                <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-gold-400 text-sm font-semibold">
                  {content.hero.badge}
                </span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4">
                  {content.hero.title}
                  <br />
                  <span className="text-5xl lg:text-6xl xl:text-7xl">
                    {content.hero.titleLine2}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                    {content.hero.highlight}
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl"
              >
                {content.hero.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href={content.hero.ctaPrimary.href}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 font-bold rounded-xl hover:shadow-lg hover:shadow-gold-400/50 transition-all group"
                >
                  {content.hero.ctaPrimary.text}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={content.hero.ctaSecondary.href}
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
                >
                  {content.hero.ctaSecondary.text}
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                <Image
                  src={content.hero.image || '/images/hero-automation.png'}
                  alt="Hero"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
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

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to scale your automation operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-8 rounded-2xl border border-white/10 transition-all duration-300 ${
                  hoveredCard === index
                    ? 'bg-white/5 border-gold-400/30 shadow-lg shadow-gold-400/10'
                    : 'bg-white/2.5'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${feature.color}`}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS SECTION ===== */}
      {content.results && content.results.length > 0 && (
        <section className="py-24 lg:py-32 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Real Results from Real Clients
              </h2>
              <p className="text-gray-400 text-lg">
                See the tangible impact of enterprise automation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {content.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-gold-400/10 to-transparent border border-gold-400/20"
                >
                  <div className="text-3xl font-bold text-gold-400 mb-2">
                    {result.metric}
                  </div>
                  <p className="text-gray-300 mb-3">{result.description}</p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    {result.improvement}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== PROCESS SECTION ===== */}
      {content.process && content.process.length > 0 && (
        <section className="py-24 lg:py-32 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Our Process
              </h2>
              <p className="text-gray-400 text-lg">
                A proven approach to enterprise automation success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {content.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < content.process.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gold-400/50 to-transparent" />
                  )}

                  <div className="p-6 rounded-2xl border border-white/10 bg-white/2.5 relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center mb-4 text-navy-950 font-bold text-lg">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TESTIMONIALS SECTION ===== */}
      {content.testimonials && content.testimonials.length > 0 && (
        <section className="py-24 lg:py-32 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Loved by Industry Leaders
              </h2>
              <p className="text-gray-400 text-lg">
                See what our clients say about working with us
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array(testimonial.rating).fill(null).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {testimonial.image && (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 to-blue-500/5 -z-10" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-400/20 to-transparent rounded-3xl -z-10 blur" />

            <div className="p-12 lg:p-20 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {content.cta.title}
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                {content.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={content.cta.primaryCta.href}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 font-bold rounded-xl hover:shadow-lg hover:shadow-gold-400/50 transition-all group"
                >
                  {content.cta.primaryCta.text}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={content.cta.secondaryCta.href}
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
                >
                  {content.cta.secondaryCta.text}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
