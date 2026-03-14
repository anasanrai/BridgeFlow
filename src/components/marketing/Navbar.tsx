"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Search from "../shared/Search";
import ThemeToggle from "../shared/ThemeToggle";

import Logo from "../shared/Logo";

interface NavLink {
    label: string;
    href: string;
}

interface SiteConfig {
    navLinks: NavLink[];
    logo?: string;
    name?: string;
}

export default function Navbar({ siteConfig }: { siteConfig: SiteConfig }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const pathname = usePathname();

    const { navLinks, logo, name } = siteConfig;

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Close on Escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
            setIsOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            setScrollProgress(Math.min(progress, 100));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Scroll Progress Bar */}
            <div
                className="scroll-progress"
                style={{ width: `${scrollProgress}%` }}
                aria-hidden="true"
                role="progressbar"
                aria-valuenow={Math.round(scrollProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
            />

            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "glass-strong shadow-2xl shadow-black/40 border-b border-white/5"
                    : "bg-transparent"
                    }`}
            >
                <nav
                    className="max-w-7xl mx-auto flex items-center justify-between h-20 lg:h-24 px-4 sm:px-6 lg:px-8"
                    aria-label="Main navigation"
                >
                    {/* Logo Lockup */}
                    <div className="flex items-center gap-10">
                        <Logo src={logo || "/images/logo-coral.png"} alt={name || "BridgeFlow"} />
                        
                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-8" role="list">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        role="listitem"
                                        aria-current={isActive ? "page" : undefined}
                                        className={`relative py-1 text-[13px] tracking-widest uppercase font-bold transition-all duration-300 group whitespace-nowrap ${isActive
                                            ? "text-brand-coral"
                                            : "text-neutral-400 hover:text-white"
                                            }`}
                                    >
                                        {link.label}
                                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-coral transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : ''}`} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="hidden lg:flex items-center gap-6">
                        <ThemeToggle />
                        <Link
                            href="/contact"
                            className="relative inline-flex items-center gap-2 px-8 py-3 text-[13px] font-bold tracking-widest uppercase text-white coral-gradient rounded-full hover:shadow-2xl hover:shadow-brand-coral/40 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex lg:hidden items-center gap-4 relative z-50">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-3 text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 z-40 lg:hidden bg-neutral-950/98 backdrop-blur-2xl"
                        >
                            <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-12">
                                {navLinks.map((link, index) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`text-3xl font-black uppercase tracking-tighter transition-all ${isActive ? "text-brand-coral" : "text-neutral-500 hover:text-white"}`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-8 pt-8 border-t border-white/5 w-full flex flex-col gap-4 items-center"
                                >
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full text-center px-12 py-5 text-xl font-bold uppercase tracking-widest text-white coral-gradient rounded-full"
                                    >
                                        Get Started
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

        </>
    );
}
