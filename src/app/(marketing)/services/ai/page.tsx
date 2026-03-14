import { Metadata } from "next";
import {
    ArrowRight, CheckCircle2, Bot, Brain, Zap, Shield,
    BarChart3, Code2, MessageSquare, Workflow, Sparkles,
    Target, TrendingUp, Settings, ChevronRight, Star,
} from "lucide-react";
import { ScrollReveal, SectionHeader, Card, Button } from "@/components/ui";
import { getSiteConfig } from "@/lib/supabase-data";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "AI Integration Services | BridgeFlow",
        description: "Supercharge your workflows with AI. We integrate GPT-4, Claude, and custom models directly into your business processes for intelligent automation that scales.",
        alternates: { canonical: "https://www.bridgeflow.agency/services/ai" },
        openGraph: {
            title: "AI Integration Services | BridgeFlow",
            description: "Supercharge your workflows with AI. GPT-4, Claude, and custom models integrated into your business processes.",
            url: "https://www.bridgeflow.agency/services/ai",
            type: "website",
        },
    };
}

const AI_CAPABILITIES = [
    {
        icon: Brain,
        title: "Autonomous Agent Architecture",
        description: "Build multi-agent systems that reason, plan, and execute complex tasks without human intervention. From research agents to decision-making pipelines.",
        features: [
            "Multi-agent orchestration with LangChain / LangGraph",
            "Tool-use and function-calling agents",
            "Memory and context management",
            "Human-in-the-loop checkpoints",
        ],
        color: "from-gold-600 to-amber-400",
    },
    {
        icon: MessageSquare,
        title: "Conversational AI & Chatbots",
        description: "Deploy intelligent chatbots and virtual assistants that understand context, handle objections, and convert leads — 24/7, without human oversight.",
        features: [
            "GPT-4 & Claude-powered chat interfaces",
            "CRM-integrated lead qualification bots",
            "Multi-channel deployment (web, SMS, WhatsApp)",
            "Sentiment analysis and escalation routing",
        ],
        color: "from-blue-500 to-cyan-400",
    },
    {
        icon: Code2,
        title: "Natural Language Processing",
        description: "Extract structured data from unstructured text, automate document processing, and build intelligent classification pipelines at scale.",
        features: [
            "Document parsing and data extraction",
            "Email classification and auto-routing",
            "Contract analysis and summarization",
            "Custom fine-tuned models for your domain",
        ],
        color: "from-purple-500 to-pink-400",
    },
    {
        icon: BarChart3,
        title: "AI-Powered Analytics",
        description: "Turn raw data into actionable intelligence. Build predictive models, anomaly detection systems, and automated reporting pipelines.",
        features: [
            "Lead scoring and churn prediction",
            "Sales forecasting models",
            "Automated insight generation",
            "Real-time anomaly detection",
        ],
        color: "from-emerald-500 to-teal-400",
    },
    {
        icon: Workflow,
        title: "AI Workflow Automation",
        description: "Embed AI decision-making directly into your n8n workflows. Replace manual review steps with intelligent automation that learns from your data.",
        features: [
            "AI-powered conditional routing",
            "Dynamic content generation in workflows",
            "Intelligent data enrichment",
            "Automated quality control checks",
        ],
        color: "from-orange-500 to-red-400",
    },
    {
        icon: Settings,
        title: "Custom Model Fine-Tuning",
        description: "Train AI models on your proprietary data for domain-specific performance that generic models cannot match.",
        features: [
            "OpenAI fine-tuning on your datasets",
            "Custom embedding models for search",
            "Industry-specific language models",
            "Ongoing model evaluation and improvement",
        ],
        color: "from-indigo-500 to-violet-400",
    },
];

const AI_MODELS = [
    { name: "GPT-4.1", provider: "OpenAI", badge: "Primary", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
    { name: "Claude 3.5 Sonnet", provider: "Anthropic", badge: "Recommended", color: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
    { name: "Gemini 2.0 Flash", provider: "Google", badge: "Fast", color: "text-amber-400 border-amber-400/30 bg-amber-400/10" },
    { name: "Llama 3.3 70B", provider: "Meta / Open Source", badge: "Private", color: "text-purple-400 border-purple-400/30 bg-purple-400/10" },
    { name: "Mistral Large", provider: "Mistral AI", badge: "EU", color: "text-orange-400 border-orange-400/30 bg-orange-400/10" },
    { name: "Custom Fine-tuned", provider: "Your Data", badge: "Bespoke", color: "text-brand-coral border-gold-400/30 bg-gold-400/10" },
];

const PROCESS_STEPS = [
    {
        step: "01",
        icon: Target,
        title: "AI Readiness Audit",
        description: "We assess your current data, workflows, and infrastructure to identify the highest-ROI AI integration opportunities.",
    },
    {
        step: "02",
        icon: Brain,
        title: "Model Selection & Design",
        description: "We select the optimal AI model(s) for your use case — balancing cost, speed, accuracy, and privacy requirements.",
    },
    {
        step: "03",
        icon: Code2,
        title: "Integration & Testing",
        description: "We build the integration, connect it to your existing tools, and rigorously test with real-world edge cases.",
    },
    {
        step: "04",
        icon: TrendingUp,
        title: "Deploy & Optimise",
        description: "We deploy to production, monitor performance, and continuously optimise prompts and model parameters for peak results.",
    },
];

const STATS = [
    { value: "10x", label: "Average productivity gain" },
    { value: "< 2 weeks", label: "Time to first AI workflow live" },
    { value: "99.9%", label: "Uptime on production AI systems" },
    { value: "50+", label: "AI integrations delivered" },
];

export default async function AIServicesPage() {
    const site = await getSiteConfig();

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-neutral-800/50 via-neutral-950 to-neutral-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/[0.04] rounded-full blur-[120px] animate-pulse" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-brand-coral border border-gold-400/20 rounded-full bg-gold-400/5">
                            <Bot className="w-3.5 h-3.5" />
                            AI Integration Services
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
                            Supercharge your business{" "}
                            <span className="text-brand-coral font-bold text-glow">with AI</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed">
                            We integrate GPT-4, Claude, and custom AI models directly into your workflows — replacing manual decision-making with intelligent automation that scales without limits.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button variant="primary" size="lg" href="/contact">
                                Start Your AI Project
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button variant="secondary" size="lg" href="/audit">
                                Free AI Readiness Audit
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="section-padding border-y border-white/5 bg-neutral-900/30">
                <div className="container-max">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {STATS.map((stat, i) => (
                            <ScrollReveal key={stat.label} delay={i * 0.1}>
                                <div className="text-center">
                                    <div className="text-3xl sm:text-4xl font-display font-bold text-brand-coral font-bold mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Capabilities */}
            <section className="section-padding">
                <div className="container-max">
                    <SectionHeader
                        badge="What We Build"
                        title="AI capabilities we"
                        highlight="deploy for you"
                        description="From conversational agents to predictive analytics — we build production-grade AI systems tailored to your exact use case."
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {AI_CAPABILITIES.map((cap, i) => (
                            <ScrollReveal key={cap.title} delay={i * 0.08}>
                                <Card className="h-full group hover:bg-white/[0.02] transition-colors premium-card">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <cap.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-white mb-3">{cap.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{cap.description}</p>
                                    <ul className="space-y-2">
                                        {cap.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-sm text-gray-400">
                                                <CheckCircle2 className="w-4 h-4 text-brand-coral flex-shrink-0 mt-0.5" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Models We Work With */}
            <section className="section-padding bg-neutral-900/20">
                <div className="container-max">
                    <SectionHeader
                        badge="Model Stack"
                        title="AI models we"
                        highlight="work with"
                        description="We're model-agnostic — we select the best AI for your specific requirements, budget, and data privacy needs."
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                        {AI_MODELS.map((model, i) => (
                            <ScrollReveal key={model.name} delay={i * 0.08}>
                                <div className="flex items-center gap-4 p-4 rounded-xl glass border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-5 h-5 text-brand-coral" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-semibold text-white">{model.name}</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${model.color}`}>
                                                {model.badge}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5">{model.provider}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section-padding">
                <div className="container-max">
                    <SectionHeader
                        badge="Our Process"
                        title="How we deliver"
                        highlight="AI integrations"
                        description="A proven 4-step process that takes you from idea to production AI in under 2 weeks."
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {PROCESS_STEPS.map((step, i) => (
                            <ScrollReveal key={step.step} delay={i * 0.1}>
                                <div className="relative">
                                    {i < PROCESS_STEPS.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold-400/30 to-transparent z-0" />
                                    )}
                                    <Card className="relative z-10 text-center h-full">
                                        <div className="text-4xl font-display font-bold text-brand-coral/20 mb-4">{step.step}</div>
                                        <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mx-auto mb-4">
                                            <step.icon className="w-6 h-6 text-brand-coral" />
                                        </div>
                                        <h3 className="text-base font-display font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                                    </Card>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="container-max">
                    <ScrollReveal>
                        <div className="relative rounded-[3rem] overflow-hidden p-10 lg:p-20 text-center glass border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/[0.02] blur-[150px] pointer-events-none" />
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-brand-coral border border-gold-400/20 rounded-full bg-gold-400/5">
                                    <Star className="w-3.5 h-3.5" />
                                    Limited Spots Available
                                </div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                                    Ready to integrate{" "}
                                    <span className="text-brand-coral font-bold">AI into your business?</span>
                                </h2>
                                <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
                                    Book a free AI readiness audit and we&apos;ll show you exactly where AI can save you time and money — with a clear implementation plan.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button variant="primary" size="lg" href="/audit" className="w-full sm:w-auto">
                                        Get Free AI Audit
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                    <Button variant="secondary" size="lg" href="/contact" className="w-full sm:w-auto">
                                        Talk to an Expert
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
