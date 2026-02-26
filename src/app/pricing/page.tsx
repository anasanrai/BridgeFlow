import type { Metadata } from "next";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Check, DollarSign, Globe } from "lucide-react";
import { plans, pricingHero, pricingFAQ } from "@/data/pricing";

export const metadata: Metadata = {
    title: "Pricing | BridgeFlow",
    description:
        "Founding member pricing for AI-powered automation services. Limited spots available at special rates.",
};

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
                </div>
            </section>

            {/* Plans */}
            <section className="section-padding -mt-10">
                <div className="container-max">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map((plan, i) => (
                            <ScrollReveal key={plan.name} delay={i * 0.1}>
                                <Card
                                    className={`relative h-full flex flex-col ${plan.popular
                                            ? "ring-2 ring-gold-400/50"
                                            : ""
                                        }`}
                                >
                                    {/* Badge */}
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-4 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full whitespace-nowrap ${plan.popular
                                                    ? "text-navy-950 gold-gradient"
                                                    : "text-gold-400 bg-navy-900 border border-gold-400/20"
                                                }`}
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            {plan.badge}
                                        </span>
                                    </div>

                                    <div className="text-center mb-6 pt-2">
                                        <h3 className="text-lg font-display font-bold mb-3">
                                            {plan.name}
                                        </h3>

                                        {/* Price */}
                                        <div className="flex items-baseline justify-center gap-2 mb-1">
                                            {plan.originalPrice && (
                                                <span className="text-lg text-gray-500 line-through">
                                                    {plan.originalPrice}
                                                </span>
                                            )}
                                            <span className="text-3xl sm:text-4xl font-display font-bold gold-text">
                                                {plan.price}
                                            </span>
                                            {plan.period && (
                                                <span className="text-gray-500">
                                                    {plan.period}
                                                </span>
                                            )}
                                        </div>

                                        {/* Savings Tag */}
                                        {plan.savingsTag && (
                                            <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full mt-2">
                                                {plan.savingsTag}
                                            </span>
                                        )}

                                        <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                                            {plan.description}
                                        </p>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-2.5 mb-6 flex-1">
                                        {plan.features.map((f) => (
                                            <li
                                                key={f}
                                                className="flex items-start gap-2.5 text-sm text-gray-300"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Button
                                        variant={plan.popular ? "primary" : "secondary"}
                                        href={plan.cta.href}
                                        className="w-full justify-center"
                                    >
                                        {plan.cta.text}
                                    </Button>

                                    {/* Spots remaining */}
                                    {plan.spotsRemaining && (
                                        <p className="text-center text-xs text-gold-400 mt-3 font-medium">
                                            {plan.spotsRemaining}
                                        </p>
                                    )}
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Trust Bar */}
                    <ScrollReveal>
                        <div className="mt-12 text-center">
                            <p className="text-sm text-gray-500 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                                <span className="inline-flex items-center gap-1.5">
                                    🔒 Secure Checkout
                                </span>
                                <span className="text-gray-700">|</span>
                                <span className="inline-flex items-center gap-1.5">
                                    ✅ No Long-term Contracts
                                </span>
                                <span className="text-gray-700">|</span>
                                <span className="inline-flex items-center gap-1.5">
                                    💰 ROI Guarantee
                                </span>
                                <span className="text-gray-700">|</span>
                                <span className="inline-flex items-center gap-1.5">
                                    🌍 Remote-first, Global Team
                                </span>
                            </p>
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
