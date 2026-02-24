import type { Metadata } from "next";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import { ArrowRight, MapPin, Briefcase, Heart, Rocket } from "lucide-react";

export const metadata: Metadata = {
    title: "Careers",
    description: "Join BridgeFlow — build the future of AI-powered automation. See open positions.",
};

const openings = [
    {
        title: "Senior Automation Engineer",
        type: "Full-time · Remote",
        department: "Engineering",
        description: "Design and deploy complex n8n workflows for enterprise clients. 3+ years in workflow automation required.",
    },
    {
        title: "AI/ML Engineer",
        type: "Full-time · Remote",
        department: "AI & Research",
        description: "Build and integrate AI models into production automation workflows. Experience with GPT APIs and fine-tuning required.",
    },
    {
        title: "Growth Marketing Manager",
        type: "Full-time · Remote",
        department: "Marketing",
        description: "Drive B2B lead generation through content, SEO, and paid channels. SaaS/agency marketing experience preferred.",
    },
    {
        title: "Customer Success Manager",
        type: "Full-time · Remote",
        department: "Operations",
        description: "Manage client relationships and ensure successful automation deployments. Strong technical communication skills required.",
    },
];

const perks = [
    { icon: MapPin, title: "100% Remote", desc: "Work from anywhere in the world" },
    { icon: Heart, title: "Health & Wellness", desc: "Comprehensive health coverage" },
    { icon: Briefcase, title: "Equity Options", desc: "Own a piece of what you build" },
    { icon: Rocket, title: "Growth Budget", desc: "$2,000/year for learning & conferences" },
];

export default function Careers() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            We&apos;re Hiring
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            Build the future of{" "}
                            <span className="gold-text">automation</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-8">
                            We&apos;re a remote-first team of engineers, designers, and strategists obsessed with making businesses run smarter.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Perks */}
            <section className="section-padding bg-navy-900/20">
                <div className="container-max">
                    <SectionHeader
                        badge="Benefits"
                        title="Why work at"
                        highlight="BridgeFlow?"
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {perks.map((perk, i) => (
                            <ScrollReveal key={perk.title} delay={i * 0.1}>
                                <Card className="text-center">
                                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4">
                                        <perk.icon className="w-6 h-6 text-navy-950" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold mb-1">{perk.title}</h3>
                                    <p className="text-sm text-gray-400">{perk.desc}</p>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Openings */}
            <section className="section-padding">
                <div className="container-max max-w-3xl">
                    <SectionHeader
                        badge="Open Positions"
                        title="Current"
                        highlight="openings"
                    />
                    <div className="space-y-6">
                        {openings.map((job, i) => (
                            <ScrollReveal key={job.title} delay={i * 0.05}>
                                <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-display font-bold">{job.title}</h3>
                                        </div>
                                        <p className="text-xs text-gold-400 mb-2">{job.type} · {job.department}</p>
                                        <p className="text-sm text-gray-400">{job.description}</p>
                                    </div>
                                    <Button variant="secondary" href="/contact" className="flex-shrink-0">
                                        Apply
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Card>
                            </ScrollReveal>
                        ))}
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
                                    Don&apos;t see your <span className="gold-text">role?</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                    We&apos;re always looking for exceptional people. Send us your resume and tell us how you can contribute.
                                </p>
                                <Button variant="primary" size="lg" href="mailto:careers@bridgeflow.agency">
                                    Send Your Resume
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
