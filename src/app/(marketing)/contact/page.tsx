export const dynamic = "force-dynamic";
import { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal, SectionHeader, Card } from "@/components/ui";
import {
    Mail,
    MapPin,
    Phone,
    ArrowRight,
    Linkedin,
    Calendar,
    Twitter,
    Youtube,
    Instagram,
    Github,
    Facebook,
    MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui";
import ContactForm from "@/components/forms/ContactForm";
import nextDynamic from "next/dynamic";

const CalendlyEmbed = nextDynamic(() => import("@/components/marketing/CalendlyEmbed"), {
    loading: () => (
        <div className="h-[600px] w-full glass animate-pulse rounded-2xl flex items-center justify-center">
            <div className="text-gray-500 font-medium">Loading Scheduler...</div>
        </div>
    ),
    ssr: false,
});

import { getPageSEO, getSiteConfig } from "@/lib/supabase-data";

export async function generateMetadata(): Promise<Metadata> {
    const [seo, site] = await Promise.all([getPageSEO("/contact"), getSiteConfig()]);
    const title = `Contact Us | ${site.name}`;
    const description = "Get in touch with BridgeFlow to discuss your automation needs. Book a free consultation or send us a message — we respond within 24 hours.";
    return {
        title,
        description,
        alternates: { canonical: `${site.url}/contact` },
        openGraph: {
            title,
            description,
            url: `${site.url}/contact`,
            type: "website",
            images: [{ url: seo.ogImage, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [seo.ogImage] },
    };
}

export default async function Contact() {
    const site = await getSiteConfig();

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: site.email || "hello@bridgeflow.agency",
            href: `mailto:${site.email || "hello@bridgeflow.agency"}`,
        },
        {
            icon: MapPin,
            label: "Location",
            value: site.location || "Remote-first, Global",
            href: null,
        },
        {
            icon: Phone,
            label: "Response Time",
            value: "Within 24 hours",
            href: null,
        },
    ];

    const trustBadges = [
        { emoji: "🔒", text: "Secure & Confidential" },
        { emoji: "⚡", text: "Response within 24hrs" },
        { emoji: "🌍", text: "Remote-first, Global" },
        { emoji: "💰", text: "Free Initial Consultation" },
    ];

    return (
        <main className="min-h-screen bg-neutral-950 text-white">
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-10">
                            <Mail className="w-4 h-4 text-brand-coral" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                                Contact Infrastructure
                            </span>
                        </div>
                    </ScrollReveal>
                    
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                        Secure Your <span className="text-brand-coral">Pipeline</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-xl text-neutral-400 font-medium">
                        Book a strategic consultation or send a direct brief. Our engineering team responds within 24 hours.
                    </p>
                </div>
            </section>

            {/* Main Interaction Area */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Form & Calendly Side */}
                        <div className="lg:col-span-8 space-y-16">
                            {/* Calendly */}
                            <div>
                                <div className="mb-10">
                                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Strategy Call</h2>
                                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Direct Access to Engineering</p>
                                </div>
                                <div className="rounded-[40px] overflow-hidden border border-white/5 bg-neutral-900/30">
                                    <CalendlyEmbed url="https://calendly.com/raianasan10/30min" />
                                </div>
                            </div>

                            {/* Direct Form */}
                            <div id="brief">
                                <div className="mb-10">
                                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Project Brief</h2>
                                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Send detailed requirements</p>
                                </div>
                                <div className="p-10 rounded-[40px] border border-white/5 bg-neutral-900/50">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>

                        {/* Info Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Contact Details */}
                            <div className="p-10 rounded-[40px] border border-white/5 bg-neutral-900/30">
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-8">Global Access</h3>
                                <div className="space-y-8">
                                    {contactInfo.map((info) => (
                                        <div key={info.label} className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-brand-coral/10 border border-brand-coral/20 flex items-center justify-center flex-shrink-0">
                                                <info.icon className="w-5 h-5 text-brand-coral" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">{info.label}</div>
                                                {info.href ? (
                                                    <a href={info.href} className="text-sm font-bold text-white hover:text-brand-coral transition-colors">
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <div className="text-sm font-bold text-white">{info.value}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social Presence */}
                            <div className="p-10 rounded-[40px] border border-white/5 bg-neutral-900/30">
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-8">Network</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        { Icon: Linkedin, href: "https://www.linkedin.com/company/bridgeflow-agency" },
                                        { Icon: Twitter, href: "https://twitter.com/bridgeflowai" },
                                        { Icon: Github, href: "https://github.com/bridgeflow" },
                                        { Icon: Youtube, href: "https://www.youtube.com/@bridgeflow" },
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full aspect-square rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-brand-coral hover:border-brand-coral/50 transition-all"
                                        >
                                            <social.Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats/Trust */}
                            <div className="p-10 rounded-[40px] border-2 border-brand-teal/20 bg-brand-teal/5">
                                <h3 className="text-xl font-black uppercase tracking-tight text-brand-teal mb-4">Enterprise Standard</h3>
                                <ul className="space-y-4">
                                    {trustBadges.map((badge) => (
                                        <li key={badge.text} className="flex items-center gap-3">
                                            <span className="text-lg">{badge.emoji}</span>
                                            <span className="text-[11px] font-black uppercase tracking-widest text-neutral-300">{badge.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
