"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Scroll Reveal ───────────────────────────────────────────────────────────

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export function ScrollReveal({
    children,
    delay = 0,
    direction = "up",
    className = "",
}: ScrollRevealProps) {
    const directions = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ─── Section Header ──────────────────────────────────────────────────────────

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
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-brand-coral border border-gold-400/20 rounded-full bg-gold-400/5">
                        {badge}
                    </span>
                </ScrollReveal>
            )}
            <ScrollReveal delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight">
                    {title} {highlight && <span className="text-brand-coral font-bold">{highlight}</span>}
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

// ─── Animated Counter ─────────────────────────────────────────────────────────────

interface AnimatedCounterProps {
    end: number;
    label: string;
    prefix?: string;
    suffix?: string;
    duration?: number;
}

export function AnimatedCounter({
    end,
    label,
    prefix = "",
    suffix = "",
    duration = 2,
}: AnimatedCounterProps) {
    const [count, setCount] = React.useState(0);
    const countRef = React.useRef(0);

    React.useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            const currentCount = Math.floor(progress * end);
            if (currentCount !== countRef.current) {
                countRef.current = currentCount;
                setCount(currentCount);
            }
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return (
        <div className="text-center">
            <div
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-coral font-bold"
                aria-label={`${prefix}${end}${suffix}`}
            >
                {prefix}
                {count}
                {suffix}
            </div>
            <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider">
                {label}
            </div>
        </div>
    );
}

// ─── Button ───────────────────────────────────────────────────────────────────

type ButtonBaseProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string;
    disabled?: boolean;
};

type ButtonAsButton = ButtonBaseProps & {
    href?: undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    external?: never;
};

type ButtonAsLink = ButtonBaseProps & {
    href: string;
    onClick?: never;
    type?: never;
    external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const TRANSITION_STYLE = {
    transition:
        "transform 150ms ease-out, box-shadow 200ms ease-out, background-color 200ms ease-out, color 200ms ease-out, border-color 200ms ease-out, opacity 200ms ease-out",
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    className = "",
    onClick,
    type = "button",
    disabled = false,
    external = false,
}: ButtonProps) {
    const baseClasses =
        "inline-flex items-center justify-center gap-2 font-bold rounded-full btn-liquid relative overflow-hidden group/btn";

    const variants = {
        primary:
            "bg-brand-coral text-neutral-950 font-bold text-neutral-950 hover:shadow-[0_0_40px_rgba(230,180,34,0.5)] hover:scale-[1.03] active:scale-95",
        secondary:
            "glass-strong border border-gold-400/30 text-brand-coral hover:bg-gold-400/10 hover:border-gold-400/50 hover:shadow-[0_0_20px_rgba(230,180,34,0.1)] hover:scale-[1.03] active:scale-95",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5 active:scale-95",
        outline: "border border-white/10 text-white hover:border-gold-400/50 hover:text-brand-coral hover:bg-gold-400/5 active:scale-95",
    };

    const sizes = {
        sm: "px-4 py-2 text-[10px] uppercase tracking-widest",
        md: "px-7 py-3 text-xs uppercase tracking-widest",
        lg: "px-10 py-4 text-sm uppercase tracking-widest",
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`;

    const innerContent = (
        <>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </>
    );

    if (href) {
        const isExternal = external || href.startsWith("http") || href.startsWith("//");
        if (isExternal) {
            return (
                <a
                    href={href}
                    className={classes}
                    style={TRANSITION_STYLE}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {innerContent}
                </a>
            );
        }
        return (
            <Link href={href} className={classes} style={TRANSITION_STYLE}>
                {innerContent}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            style={TRANSITION_STYLE}
        >
            {innerContent}
        </button>
    );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
    return (
        <div
            className={`glass rounded-3xl p-6 lg:p-10 premium-card relative overflow-hidden group/card ${hover ? "hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(230,180,34,0.15)]" : ""} ${className}`}
            style={{
                transition:
                    "transform 300ms cubic-bezier(0.2, 0, 0, 1), box-shadow 300ms cubic-bezier(0.2, 0, 0, 1), background-color 300ms ease-out, border-color 300ms ease-out",
            }}
        >
            {/* Interactive Glow Effect */}
            <div className="absolute -inset-[100%] bg-gradient-to-br from-gold-400/0 via-gold-400/[0.03] to-gold-400/0 group-hover/card:translate-x-[50%] group-hover/card:translate-y-[50%] transition-transform duration-1000 pointer-events-none" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
