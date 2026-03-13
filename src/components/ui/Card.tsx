"use client";
import React from "react";

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
