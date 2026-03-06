import type { Metadata } from "next";
import { ArrowRight, ChevronDown } from "lucide-react";
import FilterBar from "@/components/templates/FilterBar";

export const metadata: Metadata = {
    title: "n8n Workflow Templates | BridgeFlow",
    description:
        "Battle-tested n8n automation templates built for real estate agencies. Copy, customize, and deploy in minutes. Browse 7 proven workflows.",
};

export default function TemplatesPage() {
    return (
        <>
            {/* ── Hero ───────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-16 overflow-hidden aurora-glow">
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
                />

                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                        ⚡ n8n Workflow Templates
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-5">
                        Proven{" "}
                        <span
                            className="bg-clip-text"
                            style={{
                                backgroundImage: "linear-gradient(135deg, #06b6d4 0%, #67e8f9 50%, #e6b422 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Automation Templates
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10 leading-relaxed">
                        Battle-tested n8n workflows built for real estate agencies.{" "}
                        <span className="text-gray-300 font-medium">Copy, customize, and deploy in minutes.</span>
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#templates"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-navy-950 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105"
                            style={{ background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" }}
                        >
                            Browse Templates
                            <ChevronDown className="w-4 h-4" />
                        </a>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white glass border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                            Get Custom Build
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Stats strip */}
                    <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                        {[
                            { label: "Templates", value: "7" },
                            { label: "Avg. Setup", value: "45min" },
                            { label: "Value Saved", value: "$4K+" },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-2xl font-display font-bold gold-text">{s.value}</div>
                                <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Filter Bar + Grid ────────────────────────────────────── */}
            <section id="templates" className="pb-20">
                <FilterBar />
            </section>

            {/* ── Bottom CTA ──────────────────────────────────────────── */}
            <section className="section-padding">
                <div className="container-max px-4 sm:px-6">
                    <div
                        className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-center"
                        style={{
                            background: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(8,145,178,0.06) 50%, rgba(230,180,34,0.08) 100%)",
                            border: "1px solid rgba(6,182,212,0.15)",
                        }}
                    >
                        {/* Glow blob */}
                        <div
                            className="absolute inset-0 opacity-30 pointer-events-none"
                            style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.2) 0%, transparent 60%)" }}
                        />
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-white">
                                Need a{" "}
                                <span className="gold-text">Custom Workflow?</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                Don&apos;t see what you need? We build custom n8n automations for real estate agencies from scratch.
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-navy-950 transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,180,34,0.4)] hover:scale-105"
                                style={{ background: "linear-gradient(135deg, #e6b422 0%, #c9a227 100%)" }}
                            >
                                Book a Free Call
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
