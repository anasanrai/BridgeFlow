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
export default function Logo({ src = "/images/logo.png", alt = "BridgeFlow", className = "" }: LogoProps) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("bf-theme");
        if (saved === "light") {
            setIsDark(false);
            document.documentElement.classList.add("light");
        }
    }, []);

    const toggleTheme = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.remove("light");
            localStorage.setItem("bf-theme", "dark");
        } else {
            document.documentElement.classList.add("light");
            localStorage.setItem("bf-theme", "light");
        }
    };

    return (
        <div className={`flex items-center gap-2.5 group ${className}`}>
            {/* Premium Gold B Image — click to toggle theme */}
            <button
                onClick={toggleTheme}
                className="relative h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden hover:scale-110 active:scale-95 transition-transform duration-300 group/icon cursor-pointer"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
                <Image
                    src={src}
                    alt="B"
                    width={120}
                    height={120}
                    className="w-[200%] h-full object-cover object-left"
                    priority
                />
            </button>
            {/* BridgeFlow text — click navigates home */}
            <Link
                href="/"
                className="text-lg lg:text-xl font-semibold tracking-tight text-white dark:text-white transition-colors duration-300 hover:text-gold-400"
                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
            >
                BridgeFlow
            </Link>
        </div>
    );
}
