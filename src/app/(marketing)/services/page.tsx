import type { Metadata } from "next";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import {
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import LucideIcon from "@/components/shared/LucideIcon";

import { getServices, getPageSEO, getSiteConfig } from "@/lib/supabase-data";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    const [seo, site] = await Promise.all([getPageSEO("/services"), getSiteConfig()]);
    const title = `AI Automation Services | ${site.name}`;
    const description = seo.description || "Enterprise-grade n8n automation, GoHighLevel CRM setup, and AI integration services for B2B businesses.";
    return {
        title,
        description,
        alternates: { canonical: `${site.url}/services` },
        openGraph: {
            title,
            description,
            url: `${site.url}/services`,
            type: "website",
            images: [{ url: seo.ogImage, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [seo.ogImage] },
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
        <main className="min-h-screen bg-neutral-950 text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero */}
            <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-10">
                            <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                                {hero.badge}
                            </span>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-10">
                            {hero.title}{" "}
                            {(hero as any).titleLine2 && <><br className="hidden sm:block" />{(hero as any).titleLine2} </>}
                            <span className="text-brand-coral">{hero.highlight}</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-3xl mx-auto text-xl text-neutral-400 font-medium leading-relaxed mb-12">
                            {hero.description}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button variant="primary" size="lg" href={hero.ctaLink} className="px-12 py-8 rounded-full !text-base">
                                {hero.ctaText}
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                            <Button variant="secondary" size="lg" href="#featured" className="px-12 py-8 rounded-full !text-base bg-white/5 border-white/10 hover:bg-white/10">
                                System Capabilities
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Premium GoHighLevel Protocol */}
            {ghlService && (
                <section id="gohighlevel" className="py-32 relative overflow-hidden scroll-mt-24 border-b border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="relative rounded-[60px] overflow-hidden p-10 lg:p-20 border-2 border-brand-coral/20 bg-neutral-900/30">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-coral/5 blur-[120px] pointer-events-none" />

                            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[9px] font-black uppercase tracking-[0.3em] text-white coral-gradient rounded-full">
                                        Enterprise Grade
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                                        HighLevel <br /><span className="text-brand-coral">Protocol</span>
                                    </h2>
                                    <p className="text-neutral-400 text-xl font-medium mb-12 leading-relaxed">
                                        BridgeFlow custom-engineers intelligent, self-sustaining sales machines using HighLevel&apos;s architecture. We don&apos;t just manage CRM — we deploy revenue systems.
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 mb-12">
                                        {ghlService.features.map((feature: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-4 group">
                                                <div className="mt-1 w-6 h-6 rounded-lg bg-brand-coral/10 border border-brand-coral/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    <CheckCircle2 className="w-4 h-4 text-brand-coral" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300 group-hover:text-white transition-colors">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button variant="primary" size="lg" href="/contact" className="px-12 py-8 rounded-full !text-base">
                                        Deploy Expert Solution
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </div>

                                <div className="relative group">
                                    <div className="absolute -inset-10 bg-brand-coral/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    <div className="relative aspect-square rounded-[40px] overflow-hidden border border-white/10 bg-neutral-950 p-1 lg:p-1">
                                        <div className="h-full w-full rounded-[38px] border border-white/5 p-10 flex flex-col bg-neutral-900/50">
                                            <div className="flex items-center justify-between mb-12">
                                                <div className="flex gap-2">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-coral/40" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-purple/40" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-teal/40" />
                                                </div>
                                                <div className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">GHL_INTEGRATOR_V.4.0</div>
                                            </div>

                                            <div className="space-y-8 flex-1">
                                                {[1, 2, 3].map((i) => (
                                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                                                        <div className="h-1.5 w-1/4 bg-brand-coral/30 rounded-full" />
                                                        <div className="h-1.5 w-full bg-neutral-800 rounded-full" />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-auto pt-12 flex items-center justify-center">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-brand-coral/20 blur-2xl animate-pulse" />
                                                    <div className="relative px-8 py-4 rounded-full border border-brand-coral/30 bg-neutral-950 text-brand-coral text-[10px] font-black uppercase tracking-[0.3em]">
                                                        PIPELINE_SYNCHRONIZED
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* specialized Solutions Detail */}
            <section className="py-32">
                <div className="container mx-auto px-4">
                    <div className="mb-24">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
                                <span className="w-2 h-2 rounded-full bg-brand-teal" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Our Expertise</span>
                            </div>
                        </ScrollReveal>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                            Specialized <br /><span className="text-neutral-600">Infrastructure</span>
                        </h2>
                    </div>

                    <div className="space-y-32">
                        {otherServices.map((service: any, i: number) => {
                            const lowerTitle = (service.title || "").toLowerCase();
                            const slug = lowerTitle.includes("n8n") ? "n8n" : 
                                         lowerTitle.includes("ai") ? "ai" : 
                                         service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').split('-')[0];
                            return (
                                <ScrollReveal key={service.title}>
                                    <div
                                        id={slug}
                                        className={`scroll-mt-40 grid lg:grid-cols-2 gap-20 items-center`}
                                    >
                                        <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                                            <div className="w-20 h-20 rounded-[24px] bg-neutral-900 border-2 border-white/5 flex items-center justify-center mb-10 group-hover:border-brand-coral/50 transition-all">
                                                <LucideIcon name={service.icon} className="w-10 h-10 text-brand-coral" />
                                            </div>
                                            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 italic">
                                                {service.title}
                                            </h2>
                                            <p className="text-neutral-400 text-xl font-medium leading-relaxed mb-10">
                                                {service.description}
                                            </p>
                                            <div className="flex gap-4">
                                                {lowerTitle.includes("consult") ? (
                                                    <Button variant="primary" href="/services/consulting" className="px-10 py-6 rounded-full !text-[11px] font-black uppercase tracking-widest">
                                                        View Consulting Packages
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                ) : (
                                                    <Button variant="secondary" href="/contact" className="px-10 py-6 rounded-full border-white/10 bg-white/5 hover:bg-white/10 !text-[11px] font-black uppercase tracking-widest">
                                                        Initiate Onboarding
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                                            <div className="relative rounded-[40px] overflow-hidden p-1 lg:p-1 bg-gradient-to-br from-white/10 to-transparent">
                                                <div className="bg-neutral-900/50 rounded-[38px] p-10 lg:p-12">
                                                    <div className="flex items-center gap-3 mb-10">
                                                        <div className="w-1 h-3 bg-brand-coral rounded-full" />
                                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                                                            Module architecture
                                                        </h4>
                                                    </div>
                                                    <div className="grid gap-6">
                                                        {service.features.map((feature: string) => (
                                                            <div
                                                                key={feature}
                                                                className="flex items-center gap-6 group/item"
                                                            >
                                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover/item:border-brand-coral/30 transition-all">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-coral/60" />
                                                                </div>
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover/item:text-white transition-colors">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefit Grid */}
            <section className="py-32 bg-neutral-900/30 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="mb-24 text-center">
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Operational Excellence</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                            The BridgeFlow <br /><span className="text-brand-coral">Advantage</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((b: any, i: number) => (
                            <ScrollReveal key={b.title} delay={i * 0.05}>
                                <div className="p-10 rounded-[40px] border border-white/5 bg-neutral-950/50 group hover:border-brand-coral/30 transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-coral/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-16 h-16 rounded-[20px] bg-brand-coral/10 border border-brand-coral/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-brand-coral/5">
                                        <LucideIcon name={b.icon} className="w-8 h-8 text-brand-coral" />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6">
                                        {b.title}
                                    </h3>
                                    <p className="text-neutral-500 font-medium leading-relaxed">{b.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Intervention */}
            <section className="py-40">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <div className="relative rounded-[80px] overflow-hidden p-20 md:p-32 border border-white/10 bg-neutral-900/50 text-center">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand-coral/10 blur-[100px] rounded-full pointer-events-none" />
                            
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-12 relative z-10">
                                Automate Your <br /> <span className="text-brand-coral">Success Vector</span>
                            </h2>
                            <p className="max-w-2xl mx-auto text-xl text-neutral-400 font-medium mb-16 relative z-10">
                                Schedule a technical audit with our leads to map your path to autonomous operations.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                                <Button variant="primary" size="lg" href="/contact" className="px-12 py-8 rounded-full !text-base">
                                    Initiate Technical Audit
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                                <Button variant="secondary" href="/pricing" className="px-12 py-8 rounded-full !text-base bg-white/5 border-white/10 hover:bg-white/10">
                                    Analyze Packages
                                </Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
