import type { Metadata } from "next";
import Link from "next/link";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { plans, pricingHero, pricingFAQ } from "@/data/pricing";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Simple, transparent pricing for AI-powered automation services. Choose the plan that fits your business.",
};

export default function Pricing() {
    // FAQ structured data
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pricingFAQ.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a,
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
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <ScrollReveal key={plan.name} delay={i * 0.1}>
                                <Card className={`relative h-full flex flex-col ${plan.popular ? "ring-2 ring-gold-400/50" : ""}`}>
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <span className="inline-flex items-center gap-1.5 px-4 py-1 text-xs font-bold uppercase tracking-wider text-navy-950 gold-gradient rounded-full">
                                                <Sparkles className="w-3.5 h-3.5" />
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-center mb-8">
                                        <h3 className="text-xl font-display font-bold mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline justify-center gap-1 mb-3">
                                            <span className="text-4xl font-display font-bold gold-text">{plan.price}</span>
                                            {plan.period && <span className="text-gray-500">{plan.period}</span>}
                                        </div>
                                        <p className="text-sm text-gray-400">{plan.description}</p>
                                    </div>
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                                                <CheckCircle2 className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        variant={plan.popular ? "primary" : "secondary"}
                                        href={plan.cta.href}
                                        className="w-full justify-center"
                                    >
                                        {plan.cta.text}
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
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
                                    <h4 className="text-lg font-display font-bold mb-2">{item.q}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
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
                                    Need something <span className="gold-text">custom?</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                    Every business is different. Let&apos;s build a plan that fits your exact needs and budget.
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
