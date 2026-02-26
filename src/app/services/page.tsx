export const dynamic = "force-dynamic";
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

    // Separate GHL for special feature section — case-insensitive match
    const isGHL = (s: any) => {
        const t = (s.title || "").toLowerCase();
        return t.includes("gohighlevel") || t.includes("highlevel") || t.includes("ghl");
    };
    const ghlService = services.find(isGHL);
    const otherServices = services.filter((s: any) => !isGHL(s));

    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "BridgeFlow Automation Services",
        "itemListElement": services.map((s: any, i: number) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "Service",
                "name": s.title,
                "description": s.description,
                "provider": {
                    "@type": "Organization",
                    "name": "BridgeFlow",
                },
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/[0.03] rounded-full blur-[120px] animate-pulse" />

                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            {hero.badge}
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
                            {hero.title}{" "}
                            {(hero as any).titleLine2 && <><br className="hidden sm:block" />{(hero as any).titleLine2} </>}
                            <span className="gold-text text-glow">{hero.highlight}</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed">
                            {hero.description}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button variant="primary" size="lg" href={hero.ctaLink}>
                                {hero.ctaText}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button variant="secondary" size="lg" href="#featured">
                                Explore Features
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Premium GoHighLevel Section */}
            {ghlService && (
                <section id="gohighlevel" className="section-padding relative overflow-hidden scroll-mt-24">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
                    <div className="container-max">
                        <ScrollReveal>
                            <div className="relative rounded-[2.5rem] overflow-hidden p-8 lg:p-16 glass card-glow border-gold-400/20">
                                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold-400/5 blur-[100px] pointer-events-none" />

                                <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest text-navy-950 gold-gradient rounded-full">
                                            Premium Feature
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                                            The Ultimate <br /><span className="gold-text">HighLevel</span> Experience
                                        </h2>
                                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                            We don&apos;t just set up CRM accounts. We build intelligent, self-sustaining sales machines using the world&apos;s most powerful marketing platform.
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
                                            {ghlService.features.map((feature: string, idx: number) => (
                                                <div key={idx} className="flex items-start gap-3 group">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                        <CheckCircle2 className="w-3 h-3 text-gold-400" />
                                                    </div>
                                                    <span className="text-sm text-gray-300 font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto">
                                            Get GHL Expert Help
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-gold-400/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-navy-950/50" />
                                            <div className="p-8 h-full flex flex-col">
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className="flex gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                                    </div>
                                                    <div className="text-[10px] text-gray-500 font-mono">FLOW_GEN_V.2.0</div>
                                                </div>

                                                <div className="space-y-4">
                                                    {[1, 2, 3].map((i) => (
                                                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 animate-shimmer" style={{ animationDelay: `${i * 0.2}s` }}>
                                                            <div className="h-2 w-1/3 bg-gold-400/20 rounded mb-2" />
                                                            <div className="h-2 w-full bg-white/5 rounded" />
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-auto pt-8 flex items-center justify-center">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-gold-400/20 blur-xl animate-pulse" />
                                                        <div className="relative px-6 py-3 rounded-xl gold-gradient text-navy-950 font-bold text-sm shadow-xl">
                                                            PIPELINE ACTIVE
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* Other Services Detail */}
            <section className="section-padding">
                <div className="container-max">
                    <SectionHeader
                        badge="Our Expertise"
                        title="Specialized"
                        highlight="solutions"
                        description="Tailored automation systems built on industry-leading technologies."
                    />
                    <div className="space-y-20 mt-16">
                        {otherServices.map((service: any, i: number) => {
                            const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').split('-')[0];
                            return (
                                <ScrollReveal key={service.title}>
                                    <div
                                        id={slug}
                                        className={`scroll-mt-24 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""
                                            }`}
                                    >
                                        <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                                            <div
                                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}
                                            >
                                                <LucideIcon name={service.icon} className="w-7 h-7 text-white" />
                                            </div>
                                            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                                                {service.title}
                                            </h2>
                                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                                {service.description}
                                            </p>
                                            <Button variant="secondary" href="/contact" className="group">
                                                Get Started
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                        <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                                            <Card hover={false} className="!p-0 relative overflow-hidden group premium-card">
                                                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-transparent via-gold-400/20 to-transparent" />
                                                <div className="p-8 lg:p-10">
                                                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-6">
                                                        Inside the Engine
                                                    </h4>
                                                    <ul className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                                        {service.features.map((feature: string) => (
                                                            <li
                                                                key={feature}
                                                                className="flex items-start gap-3 text-gray-300 group/item"
                                                            >
                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-400 group-hover/item:scale-125 transition-transform" />
                                                                <span className="text-sm leading-relaxed">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 bg-navy-900/40" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

                <div className="container-max relative z-10">
                    <SectionHeader
                        badge="Why BridgeFlow"
                        title="Built for"
                        highlight="high performance"
                        description="Every solution we deliver is designed to make a measurable impact on your bottom line."
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {benefits.map((b: any, i: number) => (
                            <ScrollReveal key={b.title} delay={i * 0.05}>
                                <Card className="text-center group hover:bg-white/[0.02] transition-colors premium-card">
                                    <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-gold-400/10">
                                        <LucideIcon name={b.icon} className="w-7 h-7 text-navy-950" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-3">
                                        {b.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{b.description}</p>
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
                        <div className="relative rounded-[3rem] overflow-hidden p-10 lg:p-20 text-center glass border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-400/[0.02] blur-[150px] pointer-events-none" />

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                                    Ready to <span className="gold-text">automate</span> your success?
                                </h2>
                                <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
                                    Book a strategy session with our automation architects and we&apos;ll help you map out a roadmap for exponential growth.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto">
                                        Book Free Session
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                    <Button variant="secondary" size="lg" href="https://calendly.com" className="w-full sm:w-auto">
                                        View Full Pricing
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

