export const dynamic = "force-dynamic";
import Image from "next/image";
import RotatingHeadline from "@/components/RotatingHeadline";
import LiveDemos from "@/components/LiveDemos";
import PartnersSection from "@/components/PartnersSection";
import Link from "next/link";
import {
    ScrollReveal,
    SectionHeader,
    AnimatedCounter,
    Button,
    Card,
} from "@/components/ui";
import {
    Zap,
    Bot,
    Boxes,
    MessageSquare,
    ArrowRight,
    Star,
    Clock,
    BarChart3,
    Shield,
    Globe,
    Settings,
    Users,
    ExternalLink,
    Sparkles,
    // Tag removed - now in PartnersSection

    Gift,
} from "lucide-react";
import LucideIcon from "@/components/LucideIcon";
import { getHomeContent, getPageSEO } from "@/lib/supabase-data";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSEO("/");
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

export default async function Home() {
    const data = await getHomeContent();
    const { hero, stats, servicesOverview, processSteps, cta, offers } = data;

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
                {/* Full-section background image */}
                <div className="absolute inset-0">
                    <Image
                        src={hero.heroImage || "/images/hero-automation.png"}
                        alt=""
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Layered overlays for text readability */}
                    <div className="absolute inset-0 bg-navy-950/60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/40 to-navy-950" />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-950/50 via-transparent to-navy-950/50" />
                </div>
                {/* Soft accent glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/[0.04] rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gold-400/[0.03] rounded-full blur-2xl animate-float" />

                <div className="relative z-10 container-max text-center px-4 sm:px-6 pt-24 pb-20">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5 backdrop-blur-sm">
                            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                            {hero.badge}
                        </span>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <RotatingHeadline />
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed drop-shadow-md">
                            {hero.description}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button variant="primary" size="lg" href={hero.ctaPrimary.href}>
                                {hero.ctaPrimary.text}
                            </Button>
                            <Button variant="secondary" size="lg" href={hero.ctaSecondary.href}>
                                {hero.ctaSecondary.text}
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce z-10">
                    <span className="text-xs uppercase tracking-wider">Scroll</span>
                    <div className="w-5 h-8 border border-gray-600 rounded-full flex justify-center pt-1.5">
                        <div className="w-1 h-2 bg-gold-400 rounded-full" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding border-y border-white/5 bg-navy-900/30">
                <div className="container-max">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {stats.map((stat: any, i: number) => (
                            <ScrollReveal key={stat.label} delay={i * 0.1}>
                                <div className="premium-card p-1 rounded-xl">
                                    <AnimatedCounter
                                        end={stat.end}
                                        suffix={stat.suffix}
                                        label={stat.label}
                                    />
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="section-padding">
                <div className="container-max">
                    <SectionHeader
                        badge="What We Do"
                        title="Automation services that"
                        highlight="deliver results"
                        description="We don't just build workflows — we engineer systems that transform how your business operates."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {servicesOverview.map((service: any, i: number) => (
                            <ScrollReveal key={service.title} delay={i * 0.1}>
                                <Card className="h-full group premium-card">
                                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <LucideIcon name={service.icon} className="w-6 h-6 text-navy-950" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 mb-5 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <Link
                                        href={service.href}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group/link"
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Offers Section */}
            <section className="section-padding bg-navy-900/20">
                <div className="container-max">
                    <SectionHeader
                        badge="Special Offers"
                        title="Launch your automation"
                        highlight="journey"
                        description="Choose from our curated packages designed to deliver maximum impact from day one."
                    />

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {offers.map((offer: any, i: number) => (
                            <ScrollReveal key={offer.title} delay={i * 0.1}>
                                <div className={`premium-card relative p-6 lg:p-8 rounded-2xl glass border transition-all duration-500 h-full flex flex-col ${offer.highlight ? 'border-gold-400/30 shadow-lg shadow-gold-400/10' : 'border-white/10'}`}>
                                    {offer.highlight && (
                                        <div className="absolute -top-3 left-6 px-4 py-1 gold-gradient rounded-full text-navy-950 text-xs font-bold uppercase tracking-wider">
                                            Most Popular
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-2.5 rounded-xl bg-gold-400/10 text-gold-400">
                                            <Gift className="w-5 h-5" />
                                        </div>
                                        <span className={`text-2xl font-display font-bold ${offer.highlight ? 'gold-text' : 'text-white'}`}>
                                            {offer.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-white mb-3">{offer.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{offer.description}</p>
                                    <Button variant={offer.highlight ? "primary" : "secondary"} href={offer.href} className="w-full justify-center">
                                        {offer.highlight ? "Claim Free Audit" : "Get Started"}
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section-padding">
                <div className="container-max">
                    <SectionHeader
                        badge="Process"
                        title="How it"
                        highlight="works"
                        description="A proven 4-step process to transform your business operations."
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step: any, i: number) => (
                            <ScrollReveal key={step.step} delay={i * 0.15}>
                                <div className="relative text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold-400/30 bg-gold-400/5 mb-6">
                                        <span className="text-2xl font-display font-bold gold-text">
                                            {step.step}
                                        </span>
                                    </div>
                                    {i < processSteps.length - 1 && (
                                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold-400/30 to-transparent" />
                                    )}
                                    <h3 className="text-xl font-display font-bold mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Demos Section */}
            <section className="section-padding bg-navy-900/20">
                <div className="container-max">
                    <SectionHeader
                        badge="Live Demos"
                        title="See it in"
                        highlight="action"
                        description="Watch real automation workflows that we've built for clients across industries."
                    />

                    <LiveDemos />
                </div>
            </section>

            {/* Founding Clients */}
            <section className="section-padding">
                <div className="container-max">
                    <div className="max-w-3xl mx-auto text-center">
                        <ScrollReveal>
                            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 mb-6">
                                Limited Offer
                            </span>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                                Become a BridgeFlow{" "}
                                <span className="gold-text">Founding Client</span>
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal delay={0.15}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
                                We&apos;re onboarding our first 5 clients at a special founding rate.
                                Get enterprise-grade automation at startup-friendly pricing — and shape the product with us.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
                                {[
                                    { status: "taken", label: "TAKEN" },
                                    { status: "taken", label: "TAKEN" },
                                    { status: "open", label: "OPEN" },
                                    { status: "open", label: "OPEN" },
                                    { status: "open", label: "OPEN" },
                                ].map((spot, i) => (
                                    <div
                                        key={i}
                                        className={`flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${spot.status === "taken"
                                            ? "gold-gradient text-navy-950 shadow-lg shadow-gold-400/20"
                                            : "border-2 border-dashed border-gold-400/30 text-gold-400/70 hover:border-gold-400/60 hover:text-gold-400"
                                            }`}
                                    >
                                        <span className="text-[10px] md:text-xs">{spot.label}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.25}>
                            <p className="text-sm text-gold-400/80 font-medium mb-10">
                                3 of 5 founding spots remaining
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <div className="flex flex-col items-center gap-4">
                                <Button href="/contact" variant="primary" size="lg">
                                    Claim Your Founding Spot
                                    <ArrowRight className="w-5 h-5 ml-1" />
                                </Button>
                                <p className="text-xs text-gray-600">
                                    No long-term contracts. Cancel anytime.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Tech Stack & Partner Offers */}
            <section className="section-padding bg-navy-900/20">
                <div className="container-max">
                    <SectionHeader
                        badge="Our Partners"
                        title="Our Tech Stack &"
                        highlight="Partner Offers"
                        description="Tools we use daily and recommend to every client. Some links include exclusive partner discounts."
                    />

                    <PartnersSection />
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding">
                <div className="container-max">
                    <ScrollReveal>
                        <div className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-center">
                            {/* Background */}
                            <div className="absolute inset-0 gold-gradient opacity-[0.08]" />
                            <div className="absolute inset-0 glass" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

                            <div className="relative z-10">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                                    {cta.title}{" "}
                                    <span className="gold-text">{cta.highlight}</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                    {cta.description}
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button variant="primary" size="lg" href={cta.ctaPrimary.href}>
                                        {cta.ctaPrimary.text}
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        href={cta.ctaSecondary.href}
                                    >
                                        {cta.ctaSecondary.text}
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
