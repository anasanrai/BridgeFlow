"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const directionMap = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...directionMap[direction],
            }}
            animate={
                isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, ...directionMap[direction] }
            }
            transition={{
                duration: 0.7,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface SectionHeaderProps {
    badge?: string;
    title: string;
    highlight?: string;
    description?: string;
    align?: "left" | "center";
}

export function SectionHeader({
    badge,
    title,
    highlight,
    description,
    align = "center",
}: SectionHeaderProps) {
    return (
        <ScrollReveal
            className={`mb-12 lg:mb-16 ${align === "center" ? "text-center" : "text-left"
                }`}
        >
            {badge && (
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                    {badge}
                </span>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight">
                {title}{" "}
                {highlight && <span className="gold-text">{highlight}</span>}
            </h2>
            {description && (
                <p
                    className={`mt-4 text-gray-400 text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""
                        }`}
                >
                    {description}
                </p>
            )}
        </ScrollReveal>
    );
}

interface AnimatedCounterProps {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    label: string;
}

export function AnimatedCounter({
    end,
    suffix = "",
    prefix = "",
    duration = 2,
    label,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const step = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min(
                (currentTime - startTime) / (duration * 1000),
                1
            );
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [isInView, end, duration]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold gold-text">
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

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    className = "",
    onClick,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const baseClasses =
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-full";

    const variants = {
        primary:
            "gold-gradient text-navy-950 hover:shadow-lg hover:shadow-gold-400/25 hover:scale-105",
        secondary:
            "border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400/50",
        ghost: "text-gray-300 hover:text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base",
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`;

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {children}
        </button>
    );
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
    return (
        <div
            className={`glass rounded-2xl p-6 lg:p-8 card-glow ${hover ? "card-glow-hover hover:-translate-y-1" : ""
                } transition-all duration-300 ${className}`}
        >
            {children}
        </div>
    );
}
