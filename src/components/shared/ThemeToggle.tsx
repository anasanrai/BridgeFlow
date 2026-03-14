"use client";

import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("bf-theme");
        if (saved === "light") {
            setIsDark(false);
            document.documentElement.classList.add("light");
        }
    }, []);

    const toggle = () => {
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
        <button
            onClick={toggle}
            className="flex items-center gap-2 p-2 px-3 rounded-lg text-gray-400 hover:text-brand-coral hover:bg-white/5 transition-all duration-300 group"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? (
                <Sun className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            ) : (
                <Moon className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline-block">
                {isDark ? "Light" : "Dark"}
            </span>
        </button>
    );
}
