"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface LogoProps {
    src?: string;
    alt?: string;
    className?: string;
}

/**
 * Logo component — clicking the gold 'B' icon toggles the theme.
 * The "BridgeFlow" text still navigates home.
 */
export default function Logo({ src = "/images/logo-coral.png", alt = "BridgeFlow", className = "" }: LogoProps) {
    return (
        <Link
            href="/"
            className={`flex items-center gap-3 group ${className}`}
        >
            <div className="relative h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-110">
                <Image
                    src={src}
                    alt="B"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    priority
                />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase group-hover:text-brand-coral transition-colors">
                BridgeFlow
            </span>
        </Link>
    );
}
