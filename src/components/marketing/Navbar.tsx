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
                    ? "glass-strong shadow-lg shadow-black/20"
                    : "bg-transparent"
                    }`}
            >
                <nav
                    className="container-max flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8"
                    aria-label="Main navigation"
                >
                    {/* Logo */}
                    <Logo src={logo || "/images/logo.png"} alt={name || "BridgeFlow"} />

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-0" role="list">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    role="listitem"
                                    aria-current={isActive ? "page" : undefined}
                                    className={`nav-active-indicator relative px-3 py-2 text-[13px] font-medium transition-colors duration-300 group whitespace-nowrap ${isActive
                                        ? "text-gold-400 active"
                                        : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop CTA + Search */}
                    <div className="hidden lg:flex items-center gap-2.5">
                        <Search />
                        <ThemeToggle />
                        <Link
                            href="/audit"
                            className="relative inline-flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white glass rounded-full hover:bg-white/10 transition-all duration-300 border border-white/10"
                        >
                            Free Audit
                        </Link>
                        <Link
                            href="/contact"
                            className="relative inline-flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-navy-950 gold-gradient rounded-full hover:shadow-lg hover:shadow-gold-400/25 transition-all duration-300 hover:scale-105"
                        >
                            Get Started
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Mobile Icons */}
                    <div className="flex lg:hidden items-center gap-2 relative z-50">
                        <Search />
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-40 lg:hidden"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                        >
                            <div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setIsOpen(false)}
                                aria-hidden="true"
                            />
                            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-navy-900/95 backdrop-blur-xl border-l border-white/5 p-8 pt-24">
                                <nav aria-label="Mobile navigation">
                                    <div className="flex flex-col gap-2">
                                        {navLinks.map((link, index) => {
                                            const isActive = pathname === link.href;
                                            return (
                                                <motion.div
                                                    key={link.href}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setIsOpen(false)}
                                                        aria-current={isActive ? "page" : undefined}
                                                        className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-200 ${isActive
                                                            ? "text-gold-400 bg-gold-400/5"
                                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                                            }`}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="mt-6 pt-6 border-t border-white/10 space-y-4"
                                        >
                                            <Link
                                                href="/audit"
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold text-white glass rounded-full border border-white/10"
                                            >
                                                Free Audit
                                            </Link>
                                            <Link
                                                href="/contact"
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold text-navy-950 gold-gradient rounded-full"
                                            >
                                                Get Started
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </motion.div>
                                    </div>
                                </nav>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
