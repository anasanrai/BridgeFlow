"use client";
import React from "react";
import { ScrollReveal } from "./ScrollReveal";

interface SectionHeaderProps {
    badge?: string;
    title: string;
    highlight?: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}

export function SectionHeader({
    badge,
    title,
    highlight,
    description,
    align = "center",
    className = "",
}: SectionHeaderProps) {
    return (
        <div
            className={`mb-12 lg:mb-16 ${align === "center" ? "text-center mx-auto" : "text-left"
                } ${className}`}
        >
            {badge && (
                <ScrollReveal>
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                        {badge}
                    </span>
                </ScrollReveal>
            )}
            <ScrollReveal delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight">
                    {title} {highlight && <span className="gold-text">{highlight}</span>}
                </h2>
            </ScrollReveal>
            {description && (
                <ScrollReveal delay={0.2}>
                    <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                        {description}
                    </p>
                </ScrollReveal>
            )}
        </div>
    );
}
