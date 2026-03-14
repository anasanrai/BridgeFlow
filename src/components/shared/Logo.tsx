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
 * Logo component — clicking the icon toggles the theme.
 * The "BridgeFlow" text still navigates home.
 */
export default function Logo({ src = "/images/logo-coral.png", alt = "BridgeFlow", className = "" }: LogoProps) {
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
        <div className={`flex items-center gap-3 ${className}`}>
            <button
                onClick={toggleTheme}
                className="relative h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden transition-all duration-500 hover:scale-110 active:scale-95 group/logo"
                aria-label="Toggle theme"
                title="Click to toggle light/dark mode"
            >
                <Image
                    src={src}
                    alt="B"
                    width={80}
                    height={80}
                    className="w-full h-h-full object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-brand-coral/10 opacity-0 group-hover/logo:opacity-100 transition-opacity" />
            </button>
            <Link
                href="/"
                className="text-xl font-black tracking-tighter text-white uppercase hover:text-brand-coral transition-colors"
            >
                BridgeFlow
            </Link>
        </div>
    );
}
