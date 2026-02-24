"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Search from "./Search";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ siteConfig }: { siteConfig: any }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const pathname = usePathname();

    const { navLinks, logo, name } = siteConfig;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            // Calculate scroll progress
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
            />

            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "glass-strong shadow-lg shadow-black/20"
                    : "bg-transparent"
                    }`}
            >
                <nav className="container-max flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Logo src={logo || "/images/logo.png"} alt={name || "BridgeFlow"} />

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link: any) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`nav-active-indicator relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${isActive
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
                    <div className="hidden lg:flex items-center gap-3">
                        <Search />
                        <ThemeToggle />
                        <Link
                            href="/audit"
                            className="relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white glass rounded-full hover:bg-white/10 transition-all duration-300 border border-white/10"
                        >
                            Free Audit
                        </Link>
                        <Link
                            href="/contact"
                            className="relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-navy-950 gold-gradient rounded-full hover:shadow-lg hover:shadow-gold-400/25 transition-all duration-300 hover:scale-105"
                        >
                            Get Started
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>

                    {/* Mobile Icons */}
                    <div className="flex lg:hidden items-center gap-2 relative z-50">
                        <ThemeToggle />
                        <Search />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-white"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-40 lg:hidden"
                        >
                            <div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setIsOpen(false)}
                            />
                            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-navy-900/95 backdrop-blur-xl border-l border-white/5 p-8 pt-24">
                                <div className="flex flex-col gap-2">
                                    {navLinks.map((link: any, index: number) => {
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
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
