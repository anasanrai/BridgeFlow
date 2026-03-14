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
import dynamic from "next/dynamic";

const CalendlyEmbed = dynamic(() => import("@/components/marketing/CalendlyEmbed"), {
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
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-12 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            Contact Us
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            Let&apos;s build something{" "}
                            <span className="gold-text">amazing</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400">
                            Book a free 30-minute strategy call or fill out
                            the form below. We respond within 24 hours.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Calendly Section */}
            <section className="section-padding pt-12 pb-6">
                <div className="container-max max-w-4xl">
                    <ScrollReveal>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
                                Book a Free{" "}
                                <span className="gold-text">
                                    Strategy Call
                                </span>
                            </h2>
                            <p className="text-gray-400">
                                Pick a time that works for you — no back
                                and forth emails.
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <CalendlyEmbed url="https://calendly.com/raianasan10/30min" />
                    </ScrollReveal>
                </div>
            </section>

            {/* Divider */}
            <div className="container-max max-w-4xl py-8">
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-gray-500 text-sm whitespace-nowrap">
                        — Or fill out the form below —
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>
            </div>

            {/* Contact Form + Info */}
            <section className="section-padding pt-6">
                <div className="container-max">
                    <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <ScrollReveal>
                                <Card
                                    hover={false}
                                    className="!p-8 lg:!p-10"
                                >
                                    <ContactForm />
                                </Card>
                            </ScrollReveal>
                        </div>

                        {/* Info Sidebar */}
                        <div className="lg:col-span-2 space-y-6">
                            <ScrollReveal delay={0.1}>
                                <Card hover={false}>
                                    <h3 className="text-lg font-display font-bold mb-6">
                                        Get in touch
                                    </h3>
                                    <div className="space-y-5">
                                        {contactInfo.map((info) => (
                                            <div
                                                key={info.label}
                                                className="flex items-start gap-4"
                                            >
                                                <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                                                    <info.icon className="w-5 h-5 text-navy-950" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                                                        {info.label}
                                                    </div>
                                                    {info.href ? (
                                                        <a
                                                            href={
                                                                info.href
                                                            }
                                                            className="text-sm text-white hover:text-gold-400 transition-colors"
                                                        >
                                                            {info.value}
                                                        </a>
                                                    ) : (
                                                        <div className="text-sm text-white">
                                                            {info.value}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <Card hover={false}>
                                    <h3 className="text-lg font-display font-bold mb-4">
                                        Connect With Us
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {([
                                            { href: "https://www.linkedin.com/company/bridgeflow-agency", Icon: Linkedin, label: "LinkedIn", hoverCls: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30" },
                                            { href: "https://twitter.com/bridgeflowai", Icon: Twitter, label: "Twitter / X", hoverCls: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30" },
                                            { href: "https://www.youtube.com/@bridgeflow", Icon: Youtube, label: "YouTube", hoverCls: "hover:text-[#FF0000] hover:border-[#FF0000]/30" },
                                            { href: "https://www.instagram.com/bridgeflowai", Icon: Instagram, label: "Instagram", hoverCls: "hover:text-[#E1306C] hover:border-[#E1306C]/30" },
                                            { href: "https://github.com/bridgeflow", Icon: Github, label: "GitHub", hoverCls: "hover:text-white hover:border-white/30" },
                                            { href: "https://www.facebook.com/bridgeflowai", Icon: Facebook, label: "Facebook", hoverCls: "hover:text-[#1877F2] hover:border-[#1877F2]/30" },
                                            { href: "https://t.me/bridgeflowai", Icon: MessageCircle, label: "Telegram", hoverCls: "hover:text-[#26A5E4] hover:border-[#26A5E4]/30" },
                                            { href: `mailto:${site.email || "hello@bridgeflow.agency"}`, Icon: Mail, label: "Email", hoverCls: "hover:text-gold-400 hover:border-gold-400/30" },
                                        ] as const).map(({ href, Icon, label, hoverCls }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target={href.startsWith("mailto") ? undefined : "_blank"}
                                                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                                aria-label={label}
                                                title={label}
                                                className={`w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 transition-all ${hoverCls}`}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                </Card>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3}>
                                <Card
                                    hover={false}
                                    className="!bg-gold-400/5 !border-gold-400/15"
                                >
                                    <h3 className="text-lg font-display font-bold mb-2">
                                        Free Consultation
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Not sure where to start? Book a
                                        free 30-minute strategy call with
                                        one of our automation experts.
                                    </p>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        href="https://calendly.com/raianasan10/30min"
                                    >
                                        <Calendar className="w-3 h-3" />
                                        Book a Call
                                        <ArrowRight className="w-3 h-3" />
                                    </Button>
                                </Card>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <ScrollReveal>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
                            {trustBadges.map((badge) => (
                                <div
                                    key={badge.text}
                                    className="rounded-xl glass border border-white/10 p-4 text-center"
                                >
                                    <span className="text-2xl block mb-2">
                                        {badge.emoji}
                                    </span>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        {badge.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
