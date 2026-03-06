import type { Metadata } from "next";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";
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
            <section className="relative pt-32 pb-20 overflow-hidden aurora-glow">
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/60 via-navy-950 to-navy-950" />
                <div
                    className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
                />

                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    {/* Badge */}
                    <div className="flex justify-center mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 border border-cyan-400/20 rounded-full bg-cyan-400/5 backdrop-blur-md">
                            <Zap className="w-3 h-3 fill-cyan-400" />
                            Workflow Marketplace
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight">
                        The n8n <br className="hidden sm:block" />
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-gold-400"
                        >
                            Pattern Library
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-12 leading-relaxed font-medium">
                        Stop building from scratch. Access our private collection of
                        <span className="text-white"> battle-tested n8n workflows</span>
                        built specifically for High-Scale Agencies & Real Estate teams.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <a
                            href="#templates"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest text-navy-950 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95"
                            style={{ background: "linear-gradient(135deg, #06b6d4 0%, #67e8f9 100%)" }}
                        >
                            Browse Workflows
                            <ChevronDown className="w-4 h-4" />
                        </a>
                        <a
                            href="/contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest text-white glass border border-white/20 hover:bg-white/10 transition-all duration-300"
                        >
                            Get Custom Build
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Trust/Stats */}
                    <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60">
                        {[
                            { label: "Production Workflows", value: "7+" },
                            { label: "Deployment Ready", value: "100%" },
                            { label: "Support Included", value: "Lifetime" },
                        ].map((s) => (
                            <div key={s.label} className="flex flex-col items-center">
                                <div className="text-xl font-display font-bold text-white">{s.value}</div>
                                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-black mt-1">{s.label}</div>
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
