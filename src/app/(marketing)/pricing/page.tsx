import type { Metadata } from "next";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Clock, Globe, Zap } from "lucide-react";
import { plans, pricingHero, pricingFAQ } from "@/data/pricing";
import { getSiteConfig } from "@/lib/supabase-data";
import PricingCard from "@/components/marketing/PricingCard";


export const revalidate = 60;

export async function generateMetadata() {
    const site = await getSiteConfig();
    return {
        title: `Pricing | ${site.name}`,
        description: "Transparent founding-member pricing for AI-powered automation services. Limited spots available at special rates.",
        alternates: { canonical: `${site.url}/pricing` },
        openGraph: {
            title: `Pricing | ${site.name}`,
            description: "Simple, transparent pricing for AI automation services.",
            url: `${site.url}/pricing`,
            type: "website",
        },
    };
}

export default function Pricing() {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: pricingFAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            <Sparkles className="w-3.5 h-3.5" />
                            {pricingHero.badge}
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            {pricingHero.title}{" "}
                            <span className="gold-text">{pricingHero.highlight}</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-8">
                            {pricingHero.description}
                        </p>
                    </ScrollReveal>

                    {/* Trust badges */}
                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                            {[
                                { icon: Shield, text: "Secure Checkout" },
                                { icon: Clock, text: "No Long-term Contracts" },
                                { icon: Zap, text: "ROI Guarantee" },
                                { icon: Globe, text: "Remote-first, Global" },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-1.5">
                                    <Icon className="w-3.5 h-3.5 text-gold-400/60" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Plans */}
            <section className="section-padding -mt-10">
                <div className="container-max">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map((plan, i) => (
                            <PricingCard key={plan.name} plan={plan} index={i} />
                        ))}
                    </div>

                    {/* Payment Methods Note */}
                    <ScrollReveal>
                        <div className="mt-10 p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                            <p className="text-sm text-gray-500 mb-2">
                                <span className="text-gray-400 font-semibold">Accepted Payment Methods:</span>
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                                    <Globe className="w-3 h-3 text-blue-400" /> PayPal
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                                    🏦 Bank Transfer
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                                    💳 Payoneer
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                                    🌐 Wise
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                                    🪙 USDT
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                                    🇳🇵 eSewa / Khalti
                                </span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding bg-navy-900/20">
                <div className="container-max max-w-3xl">
                    <SectionHeader
                        badge="FAQ"
                        title="Frequently asked"
                        highlight="questions"
                    />
                    <div className="space-y-6">
                        {pricingFAQ.map((item) => (
                            <ScrollReveal key={item.q}>
                                <Card>
                                    <h4 className="text-lg font-display font-bold mb-2">
                                        {item.q}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.a}
                                    </p>
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
                                    Need something{" "}
                                    <span className="gold-text">custom?</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                    Every business is different. Let&apos;s build a plan
                                    that fits your exact needs and budget.
                                </p>
                                <Button variant="primary" size="lg" href="/contact">
                                    Talk to Sales
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
