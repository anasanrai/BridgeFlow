import type { Metadata } from "next";
import Link from "next/link";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import {
    Zap,
    Bot,
    Boxes,
    MessageSquare,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import LucideIcon from "@/components/LucideIcon";
import { getServices, getPageSEO } from "@/lib/supabase-data";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSEO("/services");
    return {
        title: seo.title,
        description: seo.description,
        openGraph: {
            title: seo.title,
            description: seo.description,
            images: [{ url: seo.ogImage }],
        },
    };
}

export default async function Services() {
    const { hero, services, benefits } = await getServices();

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            {hero.badge}
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            {hero.title}{" "}
                            {(hero as any).titleLine2 && <><br className="hidden sm:block" />{(hero as any).titleLine2} </>}
                            <span className="gold-text">{hero.highlight}</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-8">
                            {hero.description}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <Button variant="primary" size="lg" href={hero.ctaLink}>
                            {hero.ctaText}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </ScrollReveal>
                </div>
            </section>

            {/* Services Detail */}
            <section className="section-padding">
                <div className="container-max space-y-20">
                    {services.map((service: any, i: number) => (
                        <ScrollReveal key={service.title}>
                            <div
                                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""
                                    }`}
                            >
                                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                                    <div
                                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                                    >
                                        <LucideIcon name={service.icon} className="w-7 h-7 text-white" />
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                                        {service.title}
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                        {service.description}
                                    </p>
                                    <Button variant="secondary" href="/contact">
                                        Get Started
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                                    <Card hover={false} className="!p-0">
                                        <div className="p-6 lg:p-8">
                                            <h4 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-5">
                                                What&apos;s Included
                                            </h4>
                                            <ul className="space-y-4">
                                                {service.features.map((feature: string) => (
                                                    <li
                                                        key={feature}
                                                        className="flex items-start gap-3 text-gray-300"
                                                    >
                                                        <CheckCircle2 className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="section-padding bg-navy-900/20">
                <div className="container-max">
                    <SectionHeader
                        badge="Why BridgeFlow"
                        title="Built for"
                        highlight="results"
                        description="Every solution we deliver is designed to make a measurable impact."
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((b: any, i: number) => (
                            <ScrollReveal key={b.title} delay={i * 0.05}>
                                <Card className="text-center">
                                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4">
                                        <LucideIcon name={b.icon} className="w-6 h-6 text-navy-950" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold mb-1">
                                        {b.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">{b.description}</p>
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
                                    Not sure which service fits?
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                    Book a free 30-minute consultation and we&apos;ll map out the
                                    perfect automation strategy for your business.
                                </p>
                                <Button variant="primary" size="lg" href="/contact">
                                    Book Free Consultation
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

