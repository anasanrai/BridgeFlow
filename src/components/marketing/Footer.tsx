"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../shared/Logo";

import {
    Mail,
    MapPin,
    ArrowRight,
    Github,
    Linkedin,
    X,
    Instagram,
    Youtube,
    Facebook,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    X,
    LinkedIn: Linkedin,
    GitHub: Github,
    Instagram,
    YouTube: Youtube,
    Facebook,
};


interface FooterSiteConfig {
    email?: string;
    location?: string;
    copyright?: string;
    logo?: string;
    name?: string;
    footerLinks?: Record<string, Array<{ label: string; href: string }>>;
    socialLinks?: Array<{ platform: string; url: string; icon?: string }>;
}

export default function Footer({ siteConfig }: { siteConfig: FooterSiteConfig }) {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        email: siteEmail,
        location,
        copyright,
        logo,
        footerLinks,
        socialLinks,
    } = siteConfig;

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setSubscribed(true);
                setEmail("");
                try {
                    fetch("/api/telemetry", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            event_type: "form_submit",
                            path: window.location.pathname,
                            session_id: "anonymous",
                            data: { type: "newsletter" }
                        }),
                    });
                } catch (err) { }
            }
        } catch {
            // Silently fail
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="relative z-10 border-t border-white/5 bg-neutral-950 pt-32 pb-16 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Newsletter Box */}
                <div className="relative mb-32 p-12 lg:p-20 rounded-3xl overflow-hidden glass-strong border border-white/10 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6">
                            Scale your <span className="text-brand-coral">Output</span>
                        </h3>
                        <p className="text-neutral-400 text-lg mb-10">
                            The best n8n automation tips and AI insights, delivered to your inbox weekly.
                        </p>
                        
                        {subscribed ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-4 text-brand-teal font-bold px-8 py-4 rounded-full bg-brand-teal/10 border border-brand-teal/20"
                            >
                                <span>Successfully Subscribed!</span>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="flex-grow px-8 py-5 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-coral/50 transition-all font-bold"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-10 py-5 bg-brand-coral text-white font-black uppercase tracking-widest rounded-full hover:shadow-2xl hover:shadow-brand-coral/40 transition-all disabled:opacity-50"
                                >
                                    {loading ? "..." : "Join"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Main Link Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
                    {/* Brand Meta */}
                    <div className="lg:col-span-1">
                        <Logo src={logo || "/images/logo-coral.png"} />
                        <p className="mt-8 text-neutral-400 text-sm leading-relaxed max-w-xs">
                            Architecting the future of enterprise operations from Kathmandu, Nepal. Custom systems for the world's most ambitious companies.
                        </p>
                        <div className="mt-10 flex gap-4">
                            {(socialLinks || []).map((social: any) => {
                                const Icon = iconMap[social.platform];
                                return Icon ? (
                                    <a
                                        key={social.platform}
                                        href={social.href || social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 text-neutral-500 hover:text-brand-coral hover:bg-white/5 rounded-full border border-white/5 transition-all"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ) : null;
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks || {}).map(([category, links]: [string, any]) => (
                        <div key={category}>
                            <h4 className="text-[11px] font-black text-brand-coral uppercase tracking-[0.2em] mb-8">
                                {category}
                            </h4>
                            <ul className="space-y-4">
                                {links.map((link: any) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm font-bold text-neutral-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Legal & Local */}
                <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-10 text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                        <span>{copyright}</span>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-brand-coral" />
                            <span>{location}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Service Status: Operational</span>
                    </div>
                </div>
            </div>
        </footer>

    );
}
