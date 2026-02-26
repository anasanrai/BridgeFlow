export const dynamic = "force-dynamic";
import Image from "next/image";
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
    Play,
    Gift,
    Tag,
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
    const { hero, stats, servicesOverview, processSteps, testimonials, cta, offers, demos, affiliateLinks } = data;

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
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 drop-shadow-lg">
                            {hero.title}{" "}
                            {hero.titleLine2 && <><br className="hidden sm:block" />{hero.titleLine2} </>}
                            <span className="gold-text text-glow">{hero.highlight}</span>
                        </h1>
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
                                <ArrowRight className="w-4 h-4" />
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
                        description="A proven 3-step process to transform your business operations."
                    />

                    <div className="grid md:grid-cols-3 gap-8">
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

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {demos.map((demo: any, i: number) => (
                            <ScrollReveal key={demo.title} delay={i * 0.1}>
                                <Card className="h-full group premium-card">
                                    <div className="relative mb-5 rounded-xl overflow-hidden bg-navy-900/80 border border-white/5 aspect-video flex items-center justify-center">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 via-transparent to-purple-500/5" />
                                        <div className="relative w-14 h-14 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-400/20 transition-all duration-300">
                                            <Play className="w-6 h-6 text-gold-400 ml-0.5" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-display font-bold mb-2 text-white">{demo.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{demo.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {demo.tags.map((tag: string) => (
                                            <span key={tag} className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-gold-400 bg-gold-400/5 border border-gold-400/10 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding">
                <div className="container-max">
                    <SectionHeader
                        badge="Testimonials"
                        title="Trusted by"
                        highlight="industry leaders"
                        description="Hear from businesses that transformed their operations with BridgeFlow."
                    />

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {testimonials.map((t: any, i: number) => (
                            <ScrollReveal key={t.author} delay={i * 0.1}>
                                <Card className="h-full premium-card">
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: t.rating }).map((_, j) => (
                                            <Star
                                                key={j}
                                                className="w-4 h-4 fill-gold-400 text-gold-400"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 mb-6 leading-relaxed italic">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                        <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-navy-950 font-bold text-sm">
                                            {t.author
                                                .split(" ")
                                                .map((n: string) => n[0])
                                                .join("")}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">{t.author}</div>
                                            <div className="text-xs text-gray-500">{t.role}</div>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner & Affiliate Showcase */}
            <section className="section-padding bg-navy-900/20">
                <div className="container-max">
                    <SectionHeader
                        badge="Our Partners"
                        title="Tools we"
                        highlight="recommend"
                        description="Trusted platforms that power our automation stack. Exclusive partner offers for BridgeFlow clients."
                    />

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {affiliateLinks.map((link: any, i: number) => (
                            <ScrollReveal key={link.title} delay={i * 0.1}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="premium-card block p-6 lg:p-8 rounded-2xl glass border border-white/10 hover:border-gold-400/20 transition-all duration-500 group h-full"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/10 to-purple-500/10 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <LucideIcon name={link.logo} className="w-6 h-6 text-gold-400" />
                                        </div>
                                        <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-gold-400 bg-gold-400/5 border border-gold-400/10 rounded-full flex items-center gap-1">
                                            <Tag className="w-3 h-3" />
                                            {link.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
                                        {link.title}
                                        <ExternalLink className="w-3.5 h-3.5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{link.description}</p>
                                </a>
                            </ScrollReveal>
                        ))}
                    </div>
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
