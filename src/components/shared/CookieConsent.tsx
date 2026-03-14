"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented or dismissed
        const consent = localStorage.getItem("bridgeflow_cookie_consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("bridgeflow_cookie_consent", "accepted");
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem("bridgeflow_cookie_consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[100] max-w-sm w-full"
                >
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-6 relative overflow-hidden backdrop-blur-xl">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-coral/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-coral/10 rounded-lg border border-brand-coral/20 text-brand-coral">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <h3 className="text-white font-bold tracking-tight">Cookie Policy</h3>
                            </div>
                            <button
                                onClick={declineCookies}
                                className="text-neutral-500 hover:text-white transition-colors p-1"
                                aria-label="Close"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-medium relative z-10">
                            We use precision tracking to analyze traffic and provide a secure, tailored experience. Read our{" "}
                            <Link href="/privacy-policy" className="text-brand-coral hover:underline font-bold">
                                Privacy Policy
                            </Link>{" "}
                            to learn more.
                        </p>

                        <div className="flex items-center gap-3 relative z-10">
                            <button
                                onClick={acceptCookies}
                                className="flex-1 bg-white text-neutral-950 px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide hover:bg-neutral-200 transition-colors shadow-sm"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={declineCookies}
                                className="flex-1 bg-neutral-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide border border-white/10 hover:bg-neutral-700 transition-colors"
                            >
                                Decline Optional
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
