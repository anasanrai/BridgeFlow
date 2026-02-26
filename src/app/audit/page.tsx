"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Zap, ArrowRight, ShieldCheck, BarChart, Loader2, AlertTriangle } from "lucide-react";

const ROTATING_PHRASES = [
    "Real Estate Deals",
    "E-commerce Revenue",
    "Consulting Clients",
    "SaaS Signups",
    "Agency Retainers",
    "Coaching Bookings",
    "Clinic Appointments",
    "Law Firm Leads",
    "Insurance Renewals",
    "B2B Contracts",
];

export default function AuditPage() {
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, email }),
            });

            if (res.ok) {
                setStatus("success");
                setUrl("");
                setEmail("");

                // Track telemetry
                fetch("/api/telemetry", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        event_type: "form_submit",
                        path: "/audit",
                        session_id: sessionStorage.getItem("bf_session_id") || "unknown",
                        data: { type: "audit_request" }
                    }),
                }).catch(() => { });
            } else {
                const data = await res.json();
                setStatus("error");
                setErrorMsg(data.error || "Failed to process audit. Please try again.");
            }
        } catch (err) {
            setStatus("error");
            setErrorMsg("Network error. Please check your connection.");
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/10 blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 blur-[120px] -z-10 animate-pulse" />

            <div className="container-max px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-red-500/20 mb-6"
                    >
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-red-400 uppercase tracking-wider">Revenue Leak Detector</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
                    >
                        Your{" "}
                        <span className="relative inline-block min-w-[280px] md:min-w-[420px]">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={phraseIndex}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -30, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="gold-text inline-block"
                                >
                                    {ROTATING_PHRASES[phraseIndex]}
                                </motion.span>
                            </AnimatePresence>
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
                        </span>
                        <br />
                        Are Dying in Your Inbox
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Find out exactly how many leads you&apos;re losing — in <strong className="text-white">60 seconds</strong>. Free.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden card-glow">
                        {status === "success" ? (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
                                    <Zap className="w-10 h-10 text-navy-950" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Your Report Is Being Generated!</h3>
                                <p className="text-gray-400 mb-8">
                                    Our engine is scanning your funnel for revenue leaks. You&apos;ll receive your custom report via email within 24 hours.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="px-8 py-3 glass rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    Submit Another Site
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Website URL</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="url"
                                            required
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://your-business.com"
                                            className="w-full pl-12 pr-4 py-4 bg-navy-900 border border-white/10 rounded-2xl focus:outline-none focus:border-gold-400/50 transition-colors bg-navy-950/50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Business Email</label>
                                    <div className="relative">
                                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@email.com"
                                            className="w-full pl-12 pr-4 py-4 bg-navy-900 border border-white/10 rounded-2xl focus:outline-none focus:border-gold-400/50 transition-colors bg-navy-950/50"
                                        />
                                    </div>
                                </div>

                                {status === "error" && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                        {errorMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full py-4 gold-gradient text-navy-950 font-bold text-lg rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-gold-400/20 transition-all active:scale-95 disabled:opacity-70"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Scanning for leaks...
                                        </>
                                    ) : (
                                        <>
                                            Reveal My Revenue Leaks
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    No signup needed. Instant results. Used by <strong className="text-gray-400">500+ businesses</strong> globally.
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mt-24">
                    {[
                        {
                            icon: Zap,
                            title: "Performance Leak Test",
                            desc: "We measure exactly how long it takes for your system to acknowledge a new real estate lead."
                        },
                        {
                            icon: ShieldCheck,
                            title: "Reliability Score",
                            desc: "Comprehensive check of data synchronization across your CRM and automation stacks."
                        },
                        {
                            icon: BarChart,
                            title: "Revenue Recovery Map",
                            desc: "A detailed roadmap of how many deals you&apos;re losing and how to recover them today."
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="glass p-8 rounded-3xl text-center card-glow"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                                <item.icon className="w-6 h-6 text-gold-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
