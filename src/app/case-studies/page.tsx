export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { ScrollReveal, SectionHeader, Button, Card } from "@/components/ui";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getCaseStudies } from "@/lib/supabase-data";

export const metadata: Metadata = {
    title: "Case Studies",
    description:
        "See how BridgeFlow has helped businesses automate workflows, reduce costs, and scale operations with AI.",
};

export default async function CaseStudies() {
    const caseStudies = await getCaseStudies();

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            Case Studies
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            Real results from{" "}
                            <br className="hidden sm:block" />
                            <span className="gold-text">real businesses</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400">
                            See how we&apos;ve helped companies transform their operations
                            with intelligent automation.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Case Studies */}
            <section className="section-padding">
                <div className="container-max space-y-24">
                    {caseStudies.map((cs: any, i: number) => (
                        <ScrollReveal key={cs.slug}>
                            <div className="relative">
                                {/* Header */}
                                <div className="mb-8">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                                            {cs.industry}
                                        </span>
                                        <span className="text-sm text-gray-500">{cs.client}</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4">
                                        {cs.title}
                                    </h2>
                                    <p className="text-gray-400 text-lg max-w-3xl">
                                        {cs.excerpt}
                                    </p>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Challenge & Solution */}
                                    <div className="space-y-6">
                                        <Card hover={false}>
                                            <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">
                                                The Challenge
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {cs.challenge}
                                            </p>
                                        </Card>
                                        <Card hover={false}>
                                            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                                                Our Solution
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {cs.solution}
                                            </p>
                                        </Card>
                                        <div className="flex flex-wrap gap-2">
                                            {cs.tags.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs text-gray-400 border border-white/10 rounded-full bg-white/5"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Results */}
                                    <div>
                                        <Card hover={false} className="h-full">
                                            <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4" />
                                                Results
                                            </h3>
                                            <div className="grid grid-cols-2 gap-6">
                                                {cs.results.map((r: any) => (
                                                    <div key={r.label}>
                                                        <div className="text-2xl sm:text-3xl font-display font-bold gold-text mb-1">
                                                            {r.metric}
                                                        </div>
                                                        <div className="text-sm text-gray-400">
                                                            {r.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                    </div>
                                </div>

                                {i < caseStudies.length - 1 && (
                                    <div className="mt-16 border-b border-white/5" />
                                )}
                            </div>
                        </ScrollReveal>
                    ))}
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
                                    Want results like <span className="gold-text">these?</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                    Every project starts with a conversation. Let&apos;s discuss
                                    what automation can do for your business.
                                </p>
                                <Button variant="primary" size="lg" href="/contact">
                                    Start Your Project
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

