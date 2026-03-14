import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import { ArrowRight, Linkedin, Twitter, Globe, MapPin } from "lucide-react";
import LucideIcon from "@/components/shared/LucideIcon";

import { getAboutContent, getPageSEO, getSiteConfig } from "@/lib/supabase-data";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    const [seo, site] = await Promise.all([getPageSEO("/about"), getSiteConfig()]);
    const title = `About | ${site.name}`;
    const description = seo.description || "Meet Anasan Rai, founder of BridgeFlow — a self-taught AI automation engineer helping B2B businesses eliminate manual work and scale operations.";
    return {
        title,
        description,
        alternates: { canonical: `${site.url}/about` },
        openGraph: {
            title,
            description,
            url: `${site.url}/about`,
            type: "profile",
            images: [{ url: seo.ogImage, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [seo.ogImage] },
    };
}

export default async function About() {
    const { hero, mission, values, teamMember, techStack, milestones } =
        await getAboutContent();

    // Import founder-specific data directly (not in Supabase)
    const { founderStory, founderQuote } = await import("@/data/about");

    return (
        <main className="min-h-screen bg-neutral-950 text-white">
            {/* Hero */}
            <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
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
                                {hero.title} <span className="text-brand-coral">{hero.highlight}</span>
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <p className="max-w-2xl text-xl text-neutral-400 font-medium leading-relaxed">
                                {hero.description}
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-32">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <ScrollReveal>
                            <div>
                                <h2 className="text-5xl font-black uppercase tracking-tighter mb-10">
                                    {mission.title} <span className="text-brand-coral">{mission.highlight}</span>
                                </h2>
                                <div className="space-y-8">
                                    {mission.content.split("\n\n").map((para: string, idx: number) => (
                                        <p key={idx} className="text-lg text-neutral-400 leading-relaxed font-medium">
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {values.map((v: any) => (
                                    <div key={v.title} className="p-8 rounded-[40px] border border-white/5 bg-neutral-900/30 group hover:border-brand-coral/30 transition-all duration-500">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-coral/10 flex items-center justify-center mb-8 border border-brand-coral/20">
                                            <LucideIcon name={v.icon || "Zap"} className="w-6 h-6 text-brand-coral" />
                                        </div>
                                        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2 group-hover:text-brand-coral transition-colors">
                                            {v.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                                            {v.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Founder Protocol */}
            <section className="py-32 bg-neutral-900/30 border-y border-white/5 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-20 items-start">
                        {/* Portrait Container */}
                        <div className="lg:col-span-5 relative">
                            <ScrollReveal>
                                <div className="relative group">
                                    {/* Abstract shapes */}
                                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-coral/20 blur-[80px] rounded-full" />
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-purple/20 blur-[80px] rounded-full" />
                                    
                                    <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden border-2 border-white/10 group-hover:border-brand-coral/50 transition-all duration-700">
                                        <Image
                                            src={(teamMember as any)?.avatar_url || (teamMember as any)?.image_url || "/images/founder-portrait.png"}
                                            alt={teamMember?.name || "Anasan Rai"}
                                            fill
                                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                                        
                                        {/* Name Label */}
                                        <div className="absolute bottom-10 left-10">
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-coral mb-1">Founder / CEO</div>
                                            <h3 className="text-3xl font-black uppercase tracking-tighter text-white">{teamMember?.name || "Anasan Rai"}</h3>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Story Content */}
                        <div className="lg:col-span-7 space-y-12">
                            <ScrollReveal delay={0.2}>
                                <div className="space-y-8">
                                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                                        Founder <span className="text-neutral-600">Protocol</span>
                                    </h2>
                                    
                                    <div className="space-y-6 text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl">
                                        {founderStory.map((para: string, idx: number) => (
                                            <p key={idx}>{para}</p>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3}>
                                <blockquote className="p-10 rounded-[40px] border-2 border-brand-coral/20 bg-brand-coral/5 relative overflow-hidden group">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-coral/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700" />
                                    <p className="text-2xl font-black uppercase tracking-tight text-white mb-6 relative z-10">
                                        &ldquo;{founderQuote.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-1 h-6 bg-brand-coral" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">{founderQuote.author}</span>
                                    </div>
                                </blockquote>
                            </ScrollReveal>

                            <ScrollReveal delay={0.4}>
                                <div className="flex flex-wrap gap-6 pt-8 border-t border-white/5">
                                    <a href="https://linkedin.com/in/anasanrai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-brand-coral hover:border-brand-coral/50 transition-all">
                                        <Linkedin className="w-4 h-4" /> LinkedIn
                                    </a>
                                    <a href="https://twitter.com/raianasan10" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-brand-coral hover:border-brand-coral/50 transition-all">
                                        <Twitter className="w-4 h-4" /> Twitter
                                    </a>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Stack */}
            <section className="py-32 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="mb-20">
                        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Core Infrastructure</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Industry Standard Automation stack</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {techStack.map((tech: any, i: number) => (
                            <ScrollReveal key={tech.name} delay={i * 0.05}>
                                <div className="p-8 rounded-[40px] border border-white/5 bg-neutral-900/30 text-center group hover:border-brand-coral/30 transition-all duration-500">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-coral/10 transition-colors">
                                        <LucideIcon name={tech.icon} className="w-7 h-7 text-neutral-500 group-hover:text-brand-coral transition-colors" />
                                    </div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white">{tech.name}</h3>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Narrative Timeline */}
            <section className="py-32 bg-neutral-900/30 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-20">
                        <div className="lg:col-span-4">
                            <h2 className="text-5xl font-black uppercase tracking-tighter sticky top-40">
                                Evolution <span className="text-neutral-600">History</span>
                            </h2>
                        </div>
                        
                        <div className="lg:col-span-8 space-y-16">
                            {milestones.map((m: any, i: number) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <div className="relative pl-16 group">
                                        {/* Dot */}
                                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full border border-brand-coral/30 bg-neutral-950 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                                            <div className="w-2 h-2 rounded-full bg-brand-coral" />
                                        </div>
                                        {/* Line */}
                                        {i < milestones.length - 1 && (
                                            <div className="absolute left-4 top-8 w-px h-[calc(100%+64px)] bg-white/5" />
                                        )}
                                        
                                        <div className="space-y-4">
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-coral opacity-60">{m.year}</div>
                                            <h3 className="text-3xl font-black uppercase tracking-tight text-white">{m.title}</h3>
                                            <p className="text-lg text-neutral-400 font-medium leading-relaxed max-w-xl">
                                                {m.description}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Expansion */}
            <section className="py-40">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <div className="relative rounded-[80px] overflow-hidden p-20 md:p-32 border border-white/10 bg-neutral-900/50 text-center">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand-coral/10 blur-[100px] rounded-full" />
                            
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-12 relative z-10">
                                Deploy Your <br /> <span className="text-brand-coral">Next Initiative</span>
                            </h2>
                            
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    href="/contact"
                                    className="px-12 py-8 rounded-full !text-base"
                                >
                                    Initiate Direct Contact
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
