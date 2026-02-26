"use client";

import { useState } from "react";
import {
    ScrollReveal,
    Card,
} from "@/components/ui";
import {
    Code2,
    Loader2,
    CheckCircle,
    Terminal,
    Webhook,
    Shield,
    Zap,
} from "lucide-react";

const apiFeatures = [
    { icon: Webhook, title: "Webhooks", desc: "Real-time event notifications" },
    { icon: Terminal, title: "REST API", desc: "Standard RESTful endpoints" },
    { icon: Shield, title: "OAuth 2.0", desc: "Secure authentication" },
    { icon: Zap, title: "Rate Limiting", desc: "Fair usage with generous limits" },
];

export default function ApiReference() {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setSubmitted(true);
        setSubmitting(false);
    };

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/[0.04] rounded-full blur-3xl" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            <Code2 className="w-3.5 h-3.5" />
                            Developers
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            BridgeFlow{" "}
                            <span className="gold-text">API</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
                            Developer API coming soon. Join the waitlist for early access.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Code Preview */}
            <section className="section-padding">
                <div className="container-max max-w-3xl">
                    <ScrollReveal>
                        <div className="rounded-2xl overflow-hidden border border-white/10 mb-12">
                            <div className="flex items-center gap-2 px-4 py-3 bg-navy-900/80 border-b border-white/10">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                <span className="ml-2 text-xs text-gray-500 font-mono">api-example.sh</span>
                            </div>
                            <pre className="p-6 bg-navy-950/80 text-sm font-mono overflow-x-auto">
                                <code className="text-gray-300">
                                    <span className="text-gray-500"># Coming soon — BridgeFlow API</span>{"\n"}
                                    <span className="text-gold-400">curl</span>{" "}<span className="text-green-400">-X POST</span>{" "}https://api.bridgeflow.agency/v1/workflows \{"\n"}
                                    {"  "}<span className="text-green-400">-H</span>{" "}<span className="text-amber-300">&quot;Authorization: Bearer bf_your_api_key&quot;</span>{" "}\{"\n"}
                                    {"  "}<span className="text-green-400">-H</span>{" "}<span className="text-amber-300">&quot;Content-Type: application/json&quot;</span>{" "}\{"\n"}
                                    {"  "}<span className="text-green-400">-d</span>{" "}<span className="text-amber-300">&apos;&#123;&quot;name&quot;: &quot;My Workflow&quot;&#125;&apos;</span>
                                </code>
                            </pre>
                        </div>
                    </ScrollReveal>

                    {/* API Features */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-16">
                        {apiFeatures.map((feature, i) => (
                            <ScrollReveal key={feature.title} delay={i * 0.1}>
                                <Card className="h-full">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0">
                                            <feature.icon className="w-5 h-5 text-gold-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-display font-bold text-white mb-1">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-gray-400">{feature.desc}</p>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Waitlist */}
                    <ScrollReveal>
                        <div className="relative rounded-2xl overflow-hidden p-8 lg:p-12 text-center glass card-glow">
                            <div className="absolute inset-0 gold-gradient opacity-[0.05]" />
                            <div className="relative z-10">
                                <h2 className="text-2xl font-display font-bold text-white mb-3">
                                    Join the <span className="gold-text">Waitlist</span>
                                </h2>
                                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                    Get early access to the BridgeFlow API, developer documentation, and SDKs.
                                </p>

                                {submitted ? (
                                    <div className="flex items-center justify-center gap-3 text-gold-400 font-medium animate-scale-in">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>You&apos;re on the waitlist! We&apos;ll reach out soon.</span>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="flex-1 px-5 py-3.5 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider gold-gradient text-navy-950 rounded-xl hover:shadow-[0_0_25px_rgba(230,180,34,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                                        >
                                            {submitting ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                "Join Waitlist"
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
