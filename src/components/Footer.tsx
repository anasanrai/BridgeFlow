"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
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


export default function Footer({ siteConfig }: { siteConfig: any }) {
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
                            session_id: sessionStorage.getItem("bf_session_id") || "unknown",
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
        <footer className="wave-separator relative z-10 border-t border-white/5 bg-navy-950/80 backdrop-blur-sm">
            <div className="container-max section-padding pb-10 pt-16">
                {/* Newsletter Banner */}
                <div className="relative mb-16 p-8 lg:p-12 rounded-2xl overflow-hidden glass card-glow">
                    <div className="absolute inset-0 bg-hero-glow opacity-50" />
                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-display font-bold mb-2">
                                Stay in the <span className="gold-text">loop</span>
                            </h3>
                            <p className="text-gray-400 max-w-md">
                                Get automation tips, AI insights, and product updates delivered
                                to your inbox.
                            </p>
                        </div>
                        {subscribed ? (
                            <div className="flex items-center gap-3 text-gold-400 font-medium animate-scale-in">
                                <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center animate-pulse-glow">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            className="success-check"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <span>You&apos;re subscribed! 🎉</span>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubscribe}
                                className="flex w-full lg:w-auto"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 lg:w-72 px-5 py-3 bg-navy-900/80 border border-white/10 rounded-l-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 gold-gradient text-navy-950 font-semibold rounded-r-xl hover:shadow-lg hover:shadow-gold-400/25 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                                >
                                    {loading ? "..." : "Subscribe"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <div className="mb-4">
                            <Logo src={logo || "/images/logo.png"} />
                        </div>
                        <p className="text-gray-400 text-sm mb-4 max-w-xs">
                            AI-powered automation agency helping B2B businesses streamline
                            workflows and scale operations.
                        </p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                            <Mail className="w-4 h-4 text-gold-400" />
                            <a
                                href={`mailto:${siteEmail}`}
                                className="hover:text-white transition-colors"
                            >
                                {siteEmail}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 text-gold-400" />
                            <span>{location}</span>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links]: [string, any]) => (
                        <div key={category}>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link: any) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                                        >
                                            {link.label}
                                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        {copyright}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                        {socialLinks.map((social: any) => {
                            const Icon = iconMap[social.platform];
                            return Icon ? (
                                <a
                                    key={social.platform}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.platform}
                                    className="social-bounce p-2.5 text-gray-400 hover:text-gold-400 hover:bg-gold-400/5 rounded-xl border border-transparent hover:border-gold-400/10 transition-all duration-200"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ) : null;
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
