import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradientBackground } from "@/components/gradient-background";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { GlowingText } from "@/components/animated-text";
import { useSEO } from "@/hooks/use-seo";
import dashboardImage from "@assets/Final_Hero_1769540604311.png";
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

export default function Home() {
  useSEO({
    title: "AI Automation & Workflow Engineering",
    description: "Respond to leads in 60 seconds. BridgeFlow builds AI-powered automation systems that capture, qualify, and follow up with leads 24/7.",
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <GradientBackground variant="hero" className="pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Respond to Leads in{" "}
                <GlowingText color="gold" className="text-gradient-gold">60 Seconds</GlowingText>, <GlowingText color="gold" className="text-gradient-gold">24/7</GlowingText> And Book More Appointments
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground mb-6"
              >
                BridgeFlow delivers an end-to-end AI framework to capture leads, respond instantly by SMS and email, and route conversations—without manual work.
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
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/20" data-testid="button-hero-book-audit">
                    Book Free Automation Audit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="gap-2" data-testid="button-hero-watch-demo">
                  <Play className="w-4 h-4" />
                  Watch 90-Second Demo
                </Button>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-sm text-muted-foreground mt-4"
              >
                Free 30-minute audit. No pitch—just a custom automation map for you.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/50">
                <img 
                  src={dashboardImage} 
                  alt="BridgeFlow Dashboard showing lead pipeline and automation metrics"
                  className="w-full h-auto"
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
            <AnimatedCard delay={0}>
              <Card className="p-8 bg-card border-card-border h-full card-glow">
                <div className="mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Setup Fee</p>
                  <div className="flex items-baseline gap-1">
                    <motion.span 
                      className="text-4xl font-bold text-accent"
                      whileHover={{ scale: 1.05 }}
                    >$1,500</motion.span>
                    <span className="text-muted-foreground">one-time</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Complete funnel/landing page</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>CRM + Pipeline Configuration</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Automated 60-second follow-up</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>AI Assistant + Booking System</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Full documentation & training</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="w-full" data-testid="button-pricing-setup">
                    Get Started
                  </Button>
                </Link>
              </Card>
            </AnimatedCard>
            
            <AnimatedCard delay={0.1}>
              <Card className="p-8 bg-primary/5 border-primary/30 ring-1 ring-primary/20 h-full relative card-glow">
                <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground animate-pulse-glow">
                  Recommended
                </Badge>
                <div className="mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Service</p>
                  <div className="flex items-baseline gap-1">
                    <motion.span 
                      className="text-4xl font-bold text-gradient-animated"
                      whileHover={{ scale: 1.05 }}
                    >$297</motion.span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Platform access + maintenance</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>AI agent updates & optimization</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Ongoing support and improvements</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Monthly performance reports</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Priority response times</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="w-full" data-testid="button-pricing-monthly">
                    Get Started
                  </Button>
                </Link>
              </Card>
            </AnimatedCard>
          </div>
          
          <AnimatedSection delay={0.3} className="text-center mt-8">
            <p className="text-muted-foreground text-sm mb-4">
              Add-on options available: AI SMS setup + $500/month, ongoing launches $100 per month per funnel.
            </p>
            <Link href="/pricing">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-pricing">
                View Full Pricing Details
                <ArrowRight className="w-4 h-4" />
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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" data-testid="button-audit-cta">
                  Book Free Audit
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
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
                <Button size="lg" className="gap-2" data-testid="button-final-cta">
                  Book a Free Automation Audit
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-final-demo">
                <Play className="w-4 h-4" />
                Watch 90-Second Demo
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </GradientBackground>
    </div>
  );
}
