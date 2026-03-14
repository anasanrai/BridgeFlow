import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight, CheckCircle2, Clock, Users, TrendingUp, Zap,
    BarChart3, Brain, Workflow, Shield, Star, MessageSquare,
    Calendar, Target, Lightbulb, Settings, ChevronRight,
} from "lucide-react";
import { ScrollReveal, SectionHeader, Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { getSiteConfig } from "@/lib/supabase-data";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "AI Automation Consulting",
        description: "Work 1-on-1 with BridgeFlow's automation experts. We audit your workflows, identify revenue leaks, and build a custom automation roadmap — in a single strategy session.",
        alternates: { canonical: "https://www.bridgeflow.agency/services/consulting" },
        openGraph: {
            title: "AI Automation Consulting | BridgeFlow",
            description: "Work 1-on-1 with BridgeFlow's automation experts. Get a custom automation roadmap in a single strategy session.",
            url: "https://www.bridgeflow.agency/services/consulting",
            type: "website",
        },
    };
}

const CONSULTING_PACKAGES = [
    {
        name: "Strategy Session",
        duration: "60 min",
        price: "$197",
        priceNote: "one-time",
        color: "from-blue-500/10 to-blue-600/5",
        border: "border-blue-500/20",
        badge: null,
        description: "A focused 1-on-1 call to audit your current workflows and identify your top 3 automation opportunities.",
        includes: [
            "60-minute recorded Zoom session",
            "Workflow audit of your top 3 pain points",
            "Custom automation opportunity report",
            "Priority ranking of quick wins",
            "Tool & platform recommendations",
            "Follow-up action plan (PDF)",
        ],
        cta: "Book Strategy Session",
        href: "https://calendly.com/raianasan10/30min",
        external: true,
    },
    {
        name: "Automation Roadmap",
        duration: "3–5 days",
        price: "$497",
        priceNote: "one-time",
        color: "from-gold-400/10 to-amber-500/5",
        border: "border-gold-400/30",
        badge: "Most Popular",
        description: "A complete automation blueprint for your business — from discovery to a prioritized 90-day implementation plan.",
        includes: [
            "2 × 60-minute discovery calls",
            "Full workflow audit (all departments)",
            "Custom n8n workflow architecture diagrams",
            "90-day phased implementation roadmap",
            "ROI projections for each automation",
            "Tool stack recommendations with pricing",
            "Vendor negotiation guide",
            "30-day async Slack support",
        ],
        cta: "Get Your Roadmap",
        href: "/contact",
        external: false,
    },
    {
        name: "Fractional CTO",
        duration: "Monthly retainer",
        price: "$1,997",
        priceNote: "per month",
        color: "from-purple-500/10 to-purple-600/5",
        border: "border-purple-500/20",
        badge: "Enterprise",
        description: "Ongoing strategic oversight of your entire automation stack — as if you had a senior AI engineer on your team.",
        includes: [
            "4 × 60-minute strategy calls per month",
            "Unlimited async Slack/email support",
            "Monthly automation performance review",
            "Proactive workflow optimisation",
            "New tool evaluation & integration",
            "Team training sessions (up to 5 staff)",
            "Priority implementation queue",
            "Quarterly business automation audit",
        ],
        cta: "Apply for Retainer",
        href: "/contact",
        external: false,
    },
];

const PROCESS_STEPS = [
    {
        step: "01",
        icon: MessageSquare,
        title: "Discovery Call",
        description: "We start with a 30-minute intro call to understand your business, current tools, and biggest operational pain points.",
    },
    {
        step: "02",
        icon: Target,
        title: "Workflow Audit",
        description: "We map every manual process in your business, calculate the true cost of each, and identify automation opportunities.",
    },
    {
        step: "03",
        icon: Lightbulb,
        title: "Strategy Design",
        description: "We design a custom automation architecture using n8n, AI agents, and your existing tool stack — with ROI projections.",
    },
    {
        step: "04",
        icon: Settings,
        title: "Implementation Plan",
        description: "You receive a detailed, phased roadmap with exact steps, timelines, and cost estimates — ready to execute immediately.",
    },
    {
        step: "05",
        icon: TrendingUp,
        title: "Ongoing Optimisation",
        description: "We monitor performance, refine workflows, and continuously identify new automation opportunities as your business grows.",
    },
];

const OUTCOMES = [
    { icon: Clock, stat: "90%", label: "Reduction in manual task time" },
    { icon: TrendingUp, stat: "$130K+", label: "Average yearly ROI per client" },
    { icon: Zap, stat: "10×", label: "Output scale without hiring" },
    { icon: Users, stat: "50+", label: "Businesses automated globally" },
];

const FAQS = [
    {
        q: "What types of businesses do you consult for?",
        a: "We work with B2B service businesses, agencies, SaaS companies, real estate firms, e-commerce brands, and healthcare practices. If your business has repetitive manual processes, we can automate them.",
    },
    {
        q: "Do I need technical knowledge to work with you?",
        a: "Not at all. We handle all the technical architecture and implementation. You just need to understand your business processes — we translate them into automated systems.",
    },
    {
        q: "How long does it take to see results?",
        a: "Most clients see their first automation running within 1–2 weeks of the strategy session. Full ROI is typically realised within 60–90 days.",
    },
    {
        q: "What tools do you work with?",
        a: "We specialise in n8n, Make (Integromat), GoHighLevel, Airtable, Notion, OpenAI, and all major CRM/ERP platforms. We also build custom API integrations.",
    },
    {
        q: "Can you implement the automations for us?",
        a: "Yes. Consulting is the strategy layer — if you want us to build and deploy the automations, we offer full implementation services. See our Services page for details.",
    },
    {
        q: "Is there a refund policy?",
        a: "Yes. If you are not satisfied with your Strategy Session, we offer a full refund within 7 days. See our Refund Policy for details.",
    },
];

export default async function ConsultingPage() {
    return (
        <main className="min-h-screen bg-neutral-950">
            {/* Hero */}
            <section className="relative section-padding pt-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gold-400/5 via-transparent to-transparent" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
                <div className="container-max relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
                        <Link href="/" className="hover:text-brand-coral transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/services" className="hover:text-brand-coral transition-colors">Services</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-brand-coral">Consulting</span>
                    </nav>
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/20 bg-gold-400/5 text-brand-coral text-xs font-bold uppercase tracking-widest mb-6">
                            <Brain className="w-3.5 h-3.5" />
                            AI Automation Consulting
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6">
                            Build Your{" "}
                            <span className="text-brand-coral font-bold">Automation</span>
                            <br />
                            Strategy With Us
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
                            Stop guessing which processes to automate. Work 1-on-1 with BridgeFlow&apos;s
                            automation experts to audit your workflows, calculate your true ROI, and build
                            a custom implementation roadmap — in a single focused session.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-wrap gap-4">
                            <Link href="https://calendly.com/raianasan10/30min" target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="bg-brand-coral text-neutral-950 font-bold text-neutral-950 font-bold">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Book Free Discovery Call
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="border-white/20 hover:border-gold-400/40">
                                    View All Services
                                </Button>
                            </Link>
                        </div>
                    </ScrollReveal>
                    {/* Outcome Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
                        {OUTCOMES.map((o, i) => (
                            <ScrollReveal key={o.label} delay={i * 0.08}>
                                <Card className="text-center !p-6">
                                    <o.icon className="w-6 h-6 text-brand-coral mx-auto mb-3" />
                                    <div className="text-3xl font-black text-brand-coral font-bold mb-1">{o.stat}</div>
                                    <div className="text-xs text-gray-500">{o.label}</div>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="section-padding">
                <div className="container-max">
                    <SectionHeader
                        badge="Consulting Packages"
                        title="Choose Your"
                        highlight="Engagement"
                        description="From a single strategy session to ongoing fractional CTO support — we have an engagement model for every stage of your automation journey."
                    />
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        {CONSULTING_PACKAGES.map((pkg, i) => (
                            <ScrollReveal key={pkg.name} delay={i * 0.1}>
                                <div className={`relative rounded-2xl border ${pkg.border} bg-gradient-to-b ${pkg.color} p-8 flex flex-col h-full`}>
                                    {pkg.badge && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-coral text-neutral-950 font-bold text-neutral-950 text-xs font-black uppercase tracking-wider rounded-full">
                                            {pkg.badge}
                                        </div>
                                    )}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-display font-bold text-xl">{pkg.name}</h3>
                                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{pkg.duration}</span>
                                        </div>
                                        <div className="flex items-baseline gap-1 mb-3">
                                            <span className="text-4xl font-black text-brand-coral font-bold">{pkg.price}</span>
                                            <span className="text-sm text-gray-500">/ {pkg.priceNote}</span>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">{pkg.description}</p>
                                    </div>
                                    <ul className="space-y-2.5 mb-8 flex-1">
                                        {pkg.includes.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    {pkg.external ? (
                                        <a href={pkg.href} target="_blank" rel="noopener noreferrer" className="block">
                                            <Button className="w-full bg-brand-coral text-neutral-950 font-bold text-neutral-950 font-bold">
                                                {pkg.cta} <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </a>
                                    ) : (
                                        <Link href={pkg.href}>
                                            <Button className="w-full bg-brand-coral text-neutral-950 font-bold text-neutral-950 font-bold">
                                                {pkg.cta} <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section-padding bg-neutral-900/30">
                <div className="container-max">
                    <SectionHeader
                        badge="Our Process"
                        title="How We"
                        highlight="Work"
                        description="A structured, results-driven consulting process designed to deliver maximum ROI in minimum time."
                    />
                    <div className="relative mt-12">
                        {/* Connecting line */}
                        <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {PROCESS_STEPS.map((step, i) => (
                                <ScrollReveal key={step.step} delay={i * 0.08}>
                                    <div className="text-center">
                                        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-800 border border-gold-400/20 mb-4 mx-auto">
                                            <step.icon className="w-7 h-7 text-brand-coral" />
                                            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-coral text-neutral-950 font-bold text-neutral-950 text-[10px] font-black flex items-center justify-center">
                                                {step.step.slice(1)}
                                            </span>
                                        </div>
                                        <h3 className="font-display font-bold text-sm mb-2">{step.title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding">
                <div className="container-max max-w-3xl">
                    <SectionHeader
                        badge="FAQ"
                        title="Common"
                        highlight="Questions"
                    />
                    <div className="mt-10 space-y-4">
                        {FAQS.map((faq, i) => (
                            <ScrollReveal key={i} delay={i * 0.05}>
                                <Card className="!p-6">
                                    <h3 className="font-semibold text-white mb-2 flex items-start gap-2">
                                        <span className="text-brand-coral font-black text-sm mt-0.5">Q.</span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed pl-5">{faq.a}</p>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-neutral-900/30">
                <div className="container-max text-center">
                    <ScrollReveal>
                        <div className="max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/20 bg-gold-400/5 text-brand-coral text-xs font-bold uppercase tracking-widest mb-6">
                                <Star className="w-3.5 h-3.5" />
                                Free Discovery Call
                            </div>
                            <h2 className="font-display font-black text-4xl sm:text-5xl mb-4">
                                Ready to Stop Leaving{" "}
                                <span className="text-brand-coral font-bold">Money on the Table?</span>
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Book a free 30-minute discovery call. We&apos;ll audit one of your workflows live
                                and show you exactly how much time and money you&apos;re losing — at no cost.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a href="https://calendly.com/raianasan10/30min" target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" className="bg-brand-coral text-neutral-950 font-bold text-neutral-950 font-bold">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Book Free Call Now
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </a>
                                <Link href="/pricing">
                                    <Button size="lg" variant="outline" className="border-white/20">
                                        View All Pricing
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
