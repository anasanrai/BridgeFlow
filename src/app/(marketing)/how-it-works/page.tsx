import type { Metadata } from "next";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import { ArrowRight, Search, Cpu, Rocket, BarChart3, Headphones, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "How It Works",
    description: "Our proven 6-step process to transform your business operations with AI-powered automation.",
};

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Discovery Call",
        description: "We start with a 30-minute consultation to understand your business, current tech stack, and automation goals. No commitment required.",
        duration: "Day 1",
    },
    {
        icon: BarChart3,
        step: "02",
        title: "Process Audit",
        description: "Our team maps your existing workflows, identifies bottlenecks, and quantifies the ROI potential of automation for each process.",
        duration: "Days 2-3",
    },
    {
        icon: Cpu,
        step: "03",
        title: "Architecture & Design",
        description: "We design the optimal automation architecture — selecting the right tools, integrations, and AI models for your specific use case.",
        duration: "Days 4-5",
    },
    {
        icon: Zap,
        step: "04",
        title: "Build & Test",
        description: "Our engineers build your custom workflows with built-in error handling, retry logic, and comprehensive testing before deployment.",
        duration: "Days 5-12",
    },
    {
        icon: Rocket,
        step: "05",
        title: "Launch & Train",
        description: "We deploy your automation to production, provide team training, and ensure everything runs smoothly from day one.",
        duration: "Day 13",
    },
    {
        icon: Headphones,
        step: "06",
        title: "Monitor & Optimize",
        description: "Ongoing monitoring, performance optimization, and iterative improvements to ensure your automations evolve with your business.",
        duration: "Ongoing",
    },
];

export default function HowItWorks() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white">
            {/* Hero */}
            <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-10">
                            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                                Engineering Protocol
                            </span>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-10">
                            Discovery to <br /><span className="text-brand-coral">Production</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-3xl mx-auto text-xl text-neutral-400 font-medium leading-relaxed mb-12">
                            A battle-tested 6-phase engineering lifecycle refined over 150+ enterprise deployments. We manage the complexity; you scale the output.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <Button variant="primary" size="lg" href="/contact" className="px-12 py-8 rounded-full !text-base">
                            Initiate Selection Process
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </ScrollReveal>
                </div>
            </section>

            {/* Steps */}
            <section className="py-32">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-[39px] top-0 bottom-0 w-px bg-white/5 hidden md:block" />

                        <div className="space-y-16">
                            {steps.map((step, i) => (
                                <ScrollReveal key={step.step} delay={i * 0.1}>
                                    <div className="flex gap-12 items-start group">
                                        {/* Timeline indicator */}
                                        <div className="hidden md:flex flex-col items-center relative">
                                            <div className="w-20 h-20 rounded-[24px] border-2 border-white/5 bg-neutral-900 flex items-center justify-center flex-shrink-0 relative z-10 group-hover:border-brand-coral/50 transition-all duration-500">
                                                <step.icon className="w-8 h-8 text-brand-coral" />
                                            </div>
                                            <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-[100px] font-black text-white/[0.02] pointer-events-none select-none">
                                                {step.step}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-10 lg:p-12 rounded-[40px] border border-white/5 bg-neutral-900/30 group-hover:border-white/10 transition-all">
                                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                                <div className="px-4 py-1.5 rounded-full bg-brand-coral/10 border border-brand-coral/20 text-[9px] font-black uppercase tracking-[0.2em] text-brand-coral">
                                                    Phase {step.step}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{step.duration}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-6 group-hover:text-brand-coral transition-colors">{step.title}</h3>
                                            <p className="text-neutral-400 text-lg font-medium leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-40">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <div className="relative rounded-[80px] overflow-hidden p-20 md:p-32 border border-white/10 bg-neutral-900/50 text-center">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand-coral/10 blur-[100px] rounded-full pointer-events-none" />
                            
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-12 relative z-10">
                                Execute Your <br /> <span className="text-brand-coral">Expansion Plan</span>
                            </h2>
                            <p className="max-w-2xl mx-auto text-xl text-neutral-400 font-medium mb-16 relative z-10">
                                Deploy BridgeFlow as your technical infrastructure partner and solve for scale.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                                <Button variant="primary" size="lg" href="/contact" className="px-12 py-8 rounded-full !text-base">
                                    Initiate Discovery Protocol
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                                <Button variant="secondary" href="/audit" className="px-12 py-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 !text-base">
                                    Request Technical Audit
                                </Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
