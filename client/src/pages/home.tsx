import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradientBackground } from "@/components/gradient-background";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { GlowingText, TypewriterText, AnimatedCounter, InfiniteMarquee, TiltCard, ParallaxShape } from "@/components/animated-text";
import { useSEO } from "@/hooks/use-seo";
import dashboardImage from "../assets/hero-visual.png";
import {
  ArrowRight,
  Zap,
  Clock,
  MessageSquare,
  BarChart3,
  Users,
  Bot,
  Calendar,
  FileText,
  CheckCircle2,
  Play,
  Search,
  Map,
  ThumbsUp,
  Sparkles
} from "lucide-react";

const whyChoose = [
  {
    icon: Clock,
    title: "Fast Response",
    description: "Auto-reply and route leads instantly, no waiting. Your leads get responses within 60 seconds, 24/7.",
  },
  {
    icon: MessageSquare,
    title: "Persistent Follow-Up",
    description: "Sequences that ping until they reply or stop. Never let a qualified lead slip through the cracks.",
  },
  {
    icon: BarChart3,
    title: "Clear Tracking",
    description: "Dashboards and reporting so you see every lead status. Know exactly what's happening in your pipeline.",
  },
];

const whatWeSetUp = [
  {
    icon: Users,
    title: "Lead Capture",
    description: "Forms, landing pages, and tracking to capture leads from multiple sources.",
  },
  {
    icon: Zap,
    title: "Instant Response",
    description: "SMS + email auto-reply within seconds, not hours or days.",
  },
  {
    icon: Bot,
    title: "Follow-Up Sequences",
    description: "Multi-step follow-up over time until they book or opt out.",
  },
  {
    icon: Calendar,
    title: "Pipeline & Booking",
    description: "Clear pipeline, booking links, and reminders to move leads to appointments.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Audit & Strategy",
    description: "We review your flow, respond times, and pain points. Identify quick wins and automation opportunities.",
  },
  {
    step: "2",
    title: "Build & Launch",
    description: "We set up automations, pipelines, and AI. Everything is configured, tested, and deployed.",
  },
  {
    step: "3",
    title: "Optimize & Scale",
    description: "We provide refinements and continuous improvements. Your system gets better over time.",
  },
];

const afterYouBook = [
  {
    icon: Search,
    title: "Book Your Free Audit",
    description: "Choose a time that works for you. We'll get to know your business and current lead flow.",
  },
  {
    icon: Map,
    title: "We Map Your Automation",
    description: "We review your flow, respond times, and identify automations that will generate quick wins.",
  },
  {
    icon: ThumbsUp,
    title: "You Decide (No Pressure)",
    description: "If it's a fit, we start. If not—no worries. You'll get a clear automation map either way.",
  },
];

import PageTransition from "@/components/page-transition";

export default function Home() {
  useSEO({
    title: "AI Real Estate Automation Agency | BridgeFlow Agency",
    description: "Stop losing leads to slow response times. BridgeFlow builds GoHighLevel Austin Realtor automation and AI systems that capture, qualify, and follow up in <60 seconds, 24/7/365.",
  });

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <GradientBackground variant="hero" className="pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden">
          {/* Parallax floating shapes */}
          <ParallaxShape color="primary" size="lg" speed={0.8} className="top-20 left-10 opacity-40" />
          <ParallaxShape color="accent" size="md" speed={1.2} shape="square" className="top-40 right-20 opacity-30" />
          <ParallaxShape color="primary" size="sm" speed={1.5} className="bottom-20 left-1/4 opacity-50" />
          <ParallaxShape color="accent" size="lg" speed={0.6} className="bottom-10 right-1/3 opacity-25" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge variant="outline" className="mb-6 gap-2">
                    <Sparkles className="w-3 h-3" />
                    AI-Powered Automation
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
                >
                  <span className="block">Stop Losing Leads to</span>
                  <span className="block text-gradient-animated">Slow Response Times</span>
                  <span className="block mt-2">Automate Speed-to-Lead in</span>
                  <span className="block text-gradient-gold whitespace-nowrap">
                    <TypewriterText
                      texts={["<60 Seconds", "Real-Time"]}
                      speed={100}
                      pauseDuration={3000}
                    />
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-xl sm:text-2xl text-accent font-medium mb-4 h-8"
                >
                  Automating Real Estate Lead Flow in{" "}
                  <span className="text-primary">
                    <TypewriterText
                      texts={["Austin", "Phoenix", "Riyadh"]}
                      speed={80}
                      pauseDuration={2500}
                    />
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-muted-foreground mb-6"
                >
                  Real estate moves fast. BridgeFlow delivers production-grade automation to capture leads instantly, respond in under 60 seconds via SMS and email, and book appointments—while you focus on closing deals.
                </motion.p>

                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-2 mb-8"
                >
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Instant SMS and email responses in under 60 seconds</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>A smart AI conversation assistant that books appointments</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Automatic follow-up—no leads left behind</span>
                  </li>
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-start gap-4"
                >
                  <Link href="/contact">
                    <Button size="lg" className="button-cta gap-2 shadow-lg shadow-primary/20" data-testid="button-hero-book-audit">
                      Book Free Automation Audit
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="https://n8n.n8ngalaxy.com/webhook/real-estate-demo-lead" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="button-cta gap-2" data-testid="button-hero-demo">
                      <Play className="w-4 h-4" />
                      Try Live Demo (Get a Text Now)
                    </Button>
                  </a>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-sm text-muted-foreground mt-4"
                >
                  Free 30-minute audit. No pitch—just a custom automation map for you.
                </motion.p>

                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "BridgeFlow Agency",
                    "description": "AI Real Estate Automation Agency specializing in GoHighLevel systems for Realtors in Austin, Phoenix, and Riyadh.",
                    "image": "https://bridgeflow.agency/assets/hero-visual.png",
                    "url": "https://bridgeflow.agency",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Austin",
                      "addressRegion": "TX",
                      "addressCountry": "US"
                    },
                    "areaServed": ["Austin, TX", "Phoenix, AZ", "Riyadh, SA"],
                    "serviceType": "Real Estate Automation",
                    "openingHoursSpecification": {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                      ],
                      "opens": "00:00",
                      "closes": "23:59"
                    }
                  })}
                </script>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border border-border/80 bg-card">
                  <img
                    src={dashboardImage}
                    alt="BridgeFlow Autonomous Workflow Engine"
                    className="w-full h-auto opacity-100 hover:scale-[1.02] transition-transform duration-700"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-3xl animate-float" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
              </motion.div>
            </div>
          </div>
        </GradientBackground>

        {/* Updated Trusted By Section with Marquee */}
        <section className="py-12 border-b border-white/5 bg-background/50 backdrop-blur-sm overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest opacity-70">
              Integrates with Real Estate Tools
            </p>
          </div>
          <InfiniteMarquee speed={30} direction="left" className="opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-16 md:gap-24 px-12">
              <span className="text-xl font-bold font-sans tracking-tight">Zillow</span>
              <span className="text-xl font-bold font-sans tracking-tight">MLS</span>
              <span className="text-xl font-bold font-sans tracking-tight">Realtor.com</span>
              <span className="text-xl font-bold font-sans tracking-tight">n8n</span>
              <span className="text-xl font-bold font-sans tracking-tight">GoHighLevel</span>
              <span className="text-xl font-bold font-sans tracking-tight">OpenAI API</span>
              <span className="text-xl font-bold font-sans tracking-tight">Claude API</span>
              <span className="text-xl font-bold font-sans tracking-tight">Twilio</span>
              <span className="text-xl font-bold font-sans tracking-tight">Calendly</span>
            </div>
          </InfiniteMarquee>
        </section>

        {/* Animated Stats Section */}
        <section className="py-12 border-y border-border/50 bg-card/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  100%
                </div>
                <p className="text-sm text-muted-foreground">Lead Capture Reliability</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-bold text-accent">
                  &lt;2s
                </div>
                <p className="text-sm text-muted-foreground">Data Synchronization</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  24/7/365
                </div>
                <p className="text-sm text-muted-foreground">AI Availability</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-bold text-accent">
                  &lt;30s
                </div>
                <p className="text-sm text-muted-foreground">Speed-to-Lead Target</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integration Marquee */}
        <section className="py-10 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <p className="text-center text-sm text-muted-foreground uppercase tracking-wider">
              Integrates with your favorite tools
            </p>
          </div>
          <InfiniteMarquee speed={25} direction="left" className="py-4">
            <div className="flex items-center gap-12">
              {["Salesforce", "HubSpot", "Zapier", "Slack", "Gmail", "Twilio", "Calendly", "Stripe", "n8n", "Make"].map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card/50 border border-border/50 whitespace-nowrap"
                >
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{tool}</span>
                </div>
              ))}
            </div>
          </InfiniteMarquee>
        </section>



        {/* Why Choose BridgeFlow */}
        <section className="py-20 lg:py-28 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Businesses Choose BridgeFlow
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Strategic automation built to respond faster, follow up longer, and book more appointments—without manual work.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChoose.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.1} className="text-center">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    data-testid={`icon-why-${index}`}
                  >
                    <item.icon className="w-8 h-8 text-primary transition-all group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
                  </motion.div>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* What BridgeFlow Sets Up For You */}
        <GradientBackground variant="section" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What BridgeFlow Sets Up For You
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A complete automation foundation designed to capture, respond, and convert leads automatically.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whatWeSetUp.map((item, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <Card
                    className="p-6 bg-card border-card-border h-full text-center group card-glow"
                    data-testid={`card-setup-${index}`}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <item.icon className="w-7 h-7 text-accent transition-transform group-hover:scale-110" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </GradientBackground>

        {/* How BridgeFlow Works */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How BridgeFlow Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple, proven process designed to remove guesswork and deliver results.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <AnimatedCard key={index} delay={index * 0.15}>
                  <div className="relative" data-testid={`step-how-${index}`}>
                    {index < howItWorks.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/40 to-transparent" />
                    )}
                    <Card className="p-6 bg-card border-card-border h-full card-glow">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {step.step}
                      </motion.div>
                      <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </Card>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section - Honest "Coming Soon" State */}
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden" id="success-stories">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <AnimatedSection className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Success Stories</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Engineering the First Wave</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're a new breed of automation agency. Instead of buying fake reviews, we're heads-down building production systems for our initial partners.
              </p>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto">
              <AnimatedCard delay={0.2}>
                <Card className="p-8 md:p-12 bg-card border-card-border ring-1 ring-primary/10 relative overflow-hidden group hover:border-primary/50 transition-colors card-glow">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Sparkles className="w-32 h-32 text-primary" />
                  </div>

                  <div className="relative z-10 text-center space-y-8">
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Sparkles key={s} className="w-5 h-5 text-primary/40" />
                      ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold italic text-muted-foreground/80 leading-relaxed">
                      "To be honest: we just started. But our engineering is deep. We're currently building systems that will be the benchmarks of 2026."
                    </h3>

                    <div className="pt-6 border-t border-border/50">
                      <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">The Next Success Story is Yours</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                          <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                            Partner With Us
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Badge variant="secondary" className="px-4 py-2 bg-primary/5 text-primary border-primary/20">
                          Beta Pricing Available
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* What Happens After You Book */}
        <section className="py-20 lg:py-28 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What Happens After You Book
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple, no-pressure process designed to give you clarity before you commit.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {afterYouBook.map((item, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <Card
                    className="p-6 bg-card border-card-border h-full card-glow"
                    data-testid={`card-after-${index}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Simple, Transparent Pricing Preview */}
        <GradientBackground variant="section" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to capture, respond, and close leads on autopilot.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Implementation Tier */}
              <AnimatedCard delay={0}>
                <Card className="p-8 bg-card border-card-border h-full relative card-glow">
                  <div className="mb-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Make It Real</p>
                    <div className="flex items-baseline gap-1">
                      <motion.span
                        className="text-4xl font-bold text-accent"
                        whileHover={{ scale: 1.05 }}
                      >$1,500+</motion.span>
                      <span className="text-muted-foreground">project</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>n8n-Based Automation Systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>AI Agents (support, ops, sales)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>CRM & Internal Ops Automation</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Full documentation & training</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>30-day support included</span>
                    </li>
                  </ul>
                  <Link href="/contact">
                    <Button className="w-full button-cta" data-testid="button-pricing-implementation">
                      Start Project
                    </Button>
                  </Link>
                </Card>
              </AnimatedCard>

              {/* Retainer Tier */}
              <AnimatedCard delay={0.1}>
                <Card className="p-8 bg-primary/5 border-primary/30 ring-1 ring-primary/20 h-full relative card-glow">
                  <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground animate-pulse-glow">
                    Recommended
                  </Badge>
                  <div className="mb-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Keep It Running</p>
                    <div className="flex items-baseline gap-1">
                      <motion.span
                        className="text-4xl font-bold text-gradient-animated"
                        whileHover={{ scale: 1.05 }}
                      >$300+</motion.span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Automation Monitoring</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>System Optimization</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>AI Updates & Maintenance</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Priority support access</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>99%+ uptime guarantee</span>
                    </li>
                  </ul>
                  <Link href="/contact">
                    <Button className="w-full button-cta" data-testid="button-pricing-retainer">
                      Start Retainer
                    </Button>
                  </Link>
                </Card>
              </AnimatedCard>
            </div>

            <AnimatedSection delay={0.3} className="text-center mt-8">
              <Link href="/pricing">
                <Button variant="outline" className="button-cta min-w-[200px] h-12 text-base border-primary/20 hover:bg-primary/5">
                  View Full Pricing Details <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </GradientBackground>

        {/* Book Your Free Audit CTA */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <AnimatedSection>
              <FileText className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Book Your Free Automation Audit
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Tell us a bit about your business. You'll get a clear automation
                map—whether or not you work with us. No obligation.
              </p>
              <Link href="/contact">
                <Button size="lg" className="button-cta gap-2 shadow-lg shadow-primary/25" data-testid="button-book-audit">
                  Book Free Audit
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Free, no obligation. We respond within 24 hours.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Final CTA Banner */}
        <GradientBackground variant="cta" className="py-16 lg:py-20 border-t border-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Turn More Leads Into Booked Appointments — Automatically
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your leads are waiting. Stop losing them to slow response times and manual follow-up.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="button-cta gap-2 shadow-lg shadow-primary/20" data-testid="button-final-cta">
                    Book a Free Automation Audit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/demos#fast-demo">
                  <Button variant="outline" size="lg" className="button-cta gap-2" data-testid="button-final-demo">
                    <Play className="w-4 h-4" />
                    Watch 90-Second Demo
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </GradientBackground>
      </div>
    </PageTransition>
  );
}
