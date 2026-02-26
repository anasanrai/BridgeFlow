"use client";

import { useState } from "react";
import {
    ScrollReveal,
    Card,
} from "@/components/ui";
import {
    BookOpen,
    Bell,
    Loader2,
    CheckCircle,
    FileText,
    Code,
    Puzzle,
} from "lucide-react";

const comingSoonTopics = [
    { icon: FileText, title: "Getting Started", desc: "Quick-start guides for new clients" },
    { icon: Code, title: "API Documentation", desc: "Integrate with our automation tools" },
    { icon: Puzzle, title: "Integration Guides", desc: "Connect n8n, GoHighLevel, and more" },
];

export default function Docs() {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setSubmitted(true);
        setSubmitting(false);
    };

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/[0.04] rounded-full blur-3xl" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            <BookOpen className="w-3.5 h-3.5" />
                            Documentation
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            BridgeFlow{" "}
                            <span className="gold-text">Documentation</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
                            Coming soon. We&apos;re building our knowledge base.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Planned Topics */}
            <section className="section-padding">
                <div className="container-max max-w-3xl">
                    <div className="grid sm:grid-cols-3 gap-6 mb-16">
                        {comingSoonTopics.map((topic, i) => (
                            <ScrollReveal key={topic.title} delay={i * 0.1}>
                                <Card className="text-center h-full">
                                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mx-auto mb-4">
                                        <topic.icon className="w-6 h-6 text-gold-400" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-white mb-1">
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">{topic.desc}</p>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Email Signup */}
                    <ScrollReveal>
                        <div className="relative rounded-2xl overflow-hidden p-8 lg:p-12 text-center glass card-glow">
                            <div className="absolute inset-0 gold-gradient opacity-[0.05]" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-5">
                                    <Bell className="w-6 h-6 text-gold-400" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-white mb-3">
                                    Get notified when docs launch
                                </h2>
                                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                    Be the first to access our comprehensive documentation, tutorials, and integration guides.
                                </p>

                                {submitted ? (
                                    <div className="flex items-center justify-center gap-3 text-gold-400 font-medium animate-scale-in">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>You&apos;re on the list! We&apos;ll notify you when docs launch.</span>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="flex-1 px-5 py-3.5 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider gold-gradient text-navy-950 rounded-xl hover:shadow-[0_0_25px_rgba(230,180,34,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                                        >
                                            {submitting ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                "Notify Me"
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
