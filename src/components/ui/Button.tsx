"use client";
import React from "react";
import Link from "next/link";

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
            "coral-gradient text-white hover:shadow-[0_0_40px_rgba(255,109,90,0.5)] hover:scale-[1.03] active:scale-95",
        secondary:
            "glass-strong border border-white/10 text-white hover:bg-white/5 hover:border-white/20 hover:scale-[1.03] active:scale-95",
        ghost: "text-neutral-400 hover:text-white hover:bg-white/5 active:scale-95",
        outline: "border border-white/10 text-white hover:border-brand-coral/50 hover:text-brand-coral hover:bg-brand-coral/5 active:scale-95",
    };

    const sizes = {
        sm: "px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]",
        md: "px-8 py-4 text-xs font-black uppercase tracking-[0.2em]",
        lg: "px-12 py-5 text-sm font-black uppercase tracking-[0.2em]",
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
