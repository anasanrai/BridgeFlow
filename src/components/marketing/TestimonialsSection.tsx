"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui";

const testimonials = [
    {
        name: "Marcus T.",
        role: "Operations Director",
        company: "SaaS Startup",
        content:
            "BridgeFlow automated our entire client onboarding process. What used to take 3 hours per client now runs in 8 minutes — completely hands-off. The ROI was immediate.",
        rating: 5,
        initials: "MT",
    },
    {
        name: "Priya K.",
        role: "Founder",
        company: "Digital Agency",
        content:
            "Anasan built us a lead qualification system that connects our CRM, email, and Slack. Our response time dropped from 24 hours to under 5 minutes. Clients noticed immediately.",
        rating: 5,
        initials: "PK",
    },
    {
        name: "James W.",
        role: "CEO",
        company: "E-commerce Brand",
        content:
            "The GoHighLevel setup BridgeFlow delivered is exactly what we needed. Our follow-up sequences now run automatically and our close rate has improved by 40%. Worth every penny.",
        rating: 5,
        initials: "JW",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="section-padding" aria-labelledby="testimonials-heading">
            <div className="container-max">
                <ScrollReveal>
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-brand-coral border border-gold-400/20 rounded-full bg-gold-400/5">
                            Client Results
                        </span>
                        <h2
                            id="testimonials-heading"
                            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight"
                        >
                            What our clients{" "}
                            <span className="text-brand-coral font-bold">say</span>
                        </h2>
                        <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                            Real feedback from businesses we&apos;ve helped automate and scale.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <ScrollReveal key={t.name} delay={i * 0.1}>
                            <div className="premium-card glass rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-gold-400/20 transition-all duration-500 h-full flex flex-col">
                                {/* Stars */}
                                <div className="flex items-center gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                                    {Array.from({ length: t.rating }).map((_, j) => (
                                        <Star
                                            key={j}
                                            className="w-4 h-4 text-brand-coral fill-gold-400"
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="flex-1">
                                    <Quote className="w-6 h-6 text-brand-coral/30 mb-3" aria-hidden="true" />
                                    <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                                        &ldquo;{t.content}&rdquo;
                                    </p>
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
                                    <div
                                        className="w-10 h-10 rounded-full bg-brand-coral text-neutral-950 font-bold flex items-center justify-center text-neutral-950 text-xs font-bold flex-shrink-0"
                                        aria-hidden="true"
                                    >
                                        {t.initials}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white text-sm">{t.name}</div>
                                        <div className="text-xs text-gray-400">
                                            {t.role}, {t.company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Trust indicators */}
                <ScrollReveal delay={0.3}>
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 lg:gap-10">
                        {[
                            { label: "100% Satisfaction Rate", icon: "⭐" },
                            { label: "No Long-Term Contracts", icon: "🤝" },
                            { label: "Results in 14 Days", icon: "⚡" },
                            { label: "Full Documentation Included", icon: "📋" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2 text-sm text-gray-400"
                            >
                                <span aria-hidden="true">{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
