"use client";
import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "gold" | "outline" | "success" | "danger";
    className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
    const variants = {
        default: "bg-white/10 text-white",
        gold: "bg-gold-400/10 text-brand-coral border border-gold-400/20",
        outline: "border border-white/20 text-gray-400",
        success: "bg-green-500/10 text-green-500 border border-green-500/20",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20",
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
