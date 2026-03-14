"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "bf_cookie_consent";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only show if consent hasn't been given
        try {
            const stored = localStorage.getItem(COOKIE_KEY);
            if (!stored) {
                // Small delay so it doesn't flash on first render
                const timer = setTimeout(() => setVisible(true), 1500);
                return () => clearTimeout(timer);
            }
        } catch {
            // localStorage unavailable (SSR or private mode)
        }
    }, []);

    const accept = () => {
        try {
            localStorage.setItem(COOKIE_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
        } catch { }
        setVisible(false);
    };

    const decline = () => {
        try {
            localStorage.setItem(COOKIE_KEY, JSON.stringify({ accepted: false, date: new Date().toISOString() }));
        } catch { }
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    role="dialog"
                    aria-label="Cookie consent"
                    aria-live="polite"
                    className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[9999]"
                >
                    <div className="glass-strong rounded-2xl p-5 border border-white/10 shadow-2xl shadow-black/40">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-gold-400/10 text-brand-coral flex-shrink-0">
                                <Cookie className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white mb-1">
                                    We use cookies
                                </p>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    We use essential cookies to make our site work. With your consent, we&apos;ll also use analytics cookies to improve your experience.{" "}
                                    <Link
                                        href="/privacy-policy"
                                        className="text-brand-coral hover:text-gold-300 underline underline-offset-2"
                                    >
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>
                            <button
                                onClick={decline}
                                aria-label="Close cookie banner"
                                className="text-gray-500 hover:text-white transition-colors flex-shrink-0 -mt-1 -mr-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={decline}
                                className="flex-1 px-4 py-2 text-xs font-semibold text-gray-400 glass rounded-xl border border-white/10 hover:text-white hover:border-white/20 transition-all duration-200"
                            >
                                Decline
                            </button>
                            <button
                                onClick={accept}
                                className="flex-1 px-4 py-2 text-xs font-semibold text-neutral-950 bg-brand-coral text-neutral-950 font-bold rounded-xl hover:shadow-lg hover:shadow-brand-coral/20 transition-all duration-200"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
