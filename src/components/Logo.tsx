"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    src?: string;
    alt?: string;
    className?: string;
}

/**
 * Logo component that renders the gold 'B' icon from the logo image
 * with a crisp white "BridgeFlow" text overlay — ensuring perfect
 * visibility on both dark and light backgrounds.
 */
export default function Logo({ src = "/images/logo.png", alt = "BridgeFlow", className = "" }: LogoProps) {
    return (
        <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
            {/* Gold B icon — use the original logo but crop to just the icon */}
            <div className="relative h-8 lg:h-10 w-8 lg:w-10 flex-shrink-0 overflow-hidden">
                <Image
                    src={src}
                    alt=""
                    width={160}
                    height={40}
                    className="h-full w-auto object-cover object-left"
                    priority
                    style={{ maxWidth: "none", width: "auto" }}
                />
            </div>
            {/* BridgeFlow as styled text — always visible */}
            <span className="text-lg lg:text-xl font-semibold tracking-tight text-white dark:text-white transition-colors duration-300 group-hover:text-gold-400"
                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
            >
                BridgeFlow
            </span>
        </Link>
    );
}
