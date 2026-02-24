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
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            Our Process
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            From discovery to{" "}
                            <span className="gold-text">delivery</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-8">
                            A proven 6-step process refined over 150+ projects. We handle the complexity so you can focus on growth.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <Button variant="primary" size="lg" href="/contact">
                            Start Your Project
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </ScrollReveal>
                </div>
            </section>

            {/* Steps */}
            <section className="section-padding">
                <div className="container-max max-w-4xl">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/50 via-gold-400/20 to-transparent hidden md:block" />

                        <div className="space-y-12">
                            {steps.map((step, i) => (
                                <ScrollReveal key={step.step} delay={i * 0.1}>
                                    <div className="flex gap-8 items-start">
                                        {/* Timeline dot */}
                                        <div className="hidden md:flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center flex-shrink-0 relative z-10">
                                                <step.icon className="w-7 h-7 text-navy-950" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <Card className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full">
                                                    Step {step.step}
                                                </span>
                                                <span className="text-xs text-gray-500">{step.duration}</span>
                                            </div>
                                            <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                        </Card>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="container-max">
                    <ScrollReveal>
                        <div className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-center glass card-glow">
                            <div className="absolute inset-0 bg-hero-glow opacity-50" />
                            <div className="relative z-10">
                                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                                    Ready to <span className="gold-text">get started?</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                    Book your free discovery call today and see how automation can transform your business.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button variant="primary" size="lg" href="/contact">
                                        Book Discovery Call
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                    <Button variant="secondary" size="lg" href="/audit">
                                        Get Free Audit
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
