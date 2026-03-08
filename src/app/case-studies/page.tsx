import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal, Button, Card } from "@/components/ui";
import { ArrowRight, Building2 } from "lucide-react";
import { getCaseStudies, getSiteConfig } from "@/lib/supabase-data";

export const revalidate = 60;

export async function generateMetadata() {
    const site = await getSiteConfig();
    return {
        title: `Case Studies | ${site.name}`,
        description: "See how BridgeFlow has helped businesses automate workflows, reduce costs, and scale operations with AI-powered automation.",
        alternates: { canonical: `${site.url}/case-studies` },
        openGraph: {
            title: `Case Studies | ${site.name}`,
            description: "Real results from real businesses — AI automation transformations.",
            url: `${site.url}/case-studies`,
            type: "website",
        },
    };
}

export default async function CaseStudies() {
    const caseStudies = await getCaseStudies();

    const industryColors: Record<string, string> = {
        SaaS: "text-blue-400 bg-blue-400/10 border-blue-400/20",
        Consulting: "text-purple-400 bg-purple-400/10 border-purple-400/20",
        "Digital Marketing": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        "Real Estate": "text-orange-400 bg-orange-400/10 border-orange-400/20",
        "E-Commerce": "text-pink-400 bg-pink-400/10 border-pink-400/20",
    };

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

            {/* Stats Bar */}
            <section className="py-10 bg-navy-900/50 border-y border-white/5">
                <div className="container-max px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
                            <div>
                                <div className="text-3xl font-display font-bold gold-text mb-1">{caseStudies.length}+</div>
                                <div className="text-sm text-gray-400">Case Studies</div>
                            </div>
                            <div>
                                <div className="text-3xl font-display font-bold gold-text mb-1">340%</div>
                                <div className="text-sm text-gray-400">Avg. Client ROI</div>
                            </div>
                            <div>
                                <div className="text-3xl font-display font-bold gold-text mb-1">98%</div>
                                <div className="text-sm text-gray-400">Satisfaction Rate</div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="section-padding">
                <div className="container-max px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {caseStudies.map((cs: any, i: number) => {
                            const colorClass = industryColors[cs.industry] || "text-gold-400 bg-gold-400/10 border-gold-400/20";
                            return (
                                <ScrollReveal key={cs.slug} delay={i * 0.05}>
                                    <Link href={`/case-studies/${cs.slug}`} className="block group h-full">
                                        <Card className="h-full flex flex-col transition-all duration-300 group-hover:border-gold-400/30 group-hover:-translate-y-1">
                                            <div className="flex items-start justify-between gap-3 mb-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${colorClass}`}>
                                                    <Building2 className="w-3 h-3" />
                                                    {cs.industry}
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gold-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                                            </div>
                                            <h2 className="text-lg font-display font-bold mb-2 group-hover:text-gold-400 transition-colors leading-snug">
                                                {cs.title}
                                            </h2>
                                            <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
                                                {cs.excerpt}
                                            </p>
                                            <div className="grid grid-cols-2 gap-3 mb-5 p-4 rounded-xl bg-white/3 border border-white/5">
                                                {cs.results.slice(0, 4).map((r: any, ri: number) => (
                                                    <div key={ri}>
                                                        <div className="text-lg font-display font-bold gold-text leading-tight">{r.metric}</div>
                                                        <div className="text-xs text-gray-500 capitalize leading-tight mt-0.5">{r.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {cs.tags.slice(0, 3).map((tag: string) => (
                                                    <span key={tag} className="px-2.5 py-0.5 text-xs text-gray-400 border border-white/10 rounded-full bg-white/5">{tag}</span>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <span className="text-xs text-gray-500">{cs.client}</span>
                                                <span className="text-xs font-semibold text-gold-400 group-hover:underline">Read Case Study →</span>
                                            </div>
                                        </Card>
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                    {/* CTA */}
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
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button variant="primary" size="lg" href="/contact">
                                        Start Your Project
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                    <Button variant="secondary" size="lg" href="/pricing">
                                        View Pricing
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

