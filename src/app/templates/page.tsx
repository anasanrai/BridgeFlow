import type { Metadata } from "next";
import { ArrowRight, Zap, Layers, Clock, TrendingUp } from "lucide-react";
import FilterBar from "@/components/templates/FilterBar";

export const metadata: Metadata = {
    title: "n8n Workflow Templates | BridgeFlow — Automation Pattern Library",
    description:
        "Browse battle-tested n8n automation templates built for agencies and real estate teams. Real workflow canvases, instant deployment, lifetime support.",
    openGraph: {
        title: "n8n Workflow Templates | BridgeFlow",
        description: "Battle-tested n8n automation templates with real workflow canvas previews.",
        type: "website",
    },
};

const STATS = [
    { value: "7+", label: "Production Workflows", icon: "⚡" },
    { value: "100%", label: "Deployment Ready", icon: "✓" },
    { value: "< 1hr", label: "Average Setup Time", icon: "⏱" },
    { value: "10x", label: "Average ROI", icon: "📈" },
];

export default function TemplatesPage() {
    return (
        <>
            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative pt-28 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950" />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 60%)" }}
                />
                <div
                    className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-10 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, #e6b422 0%, transparent 70%)" }}
                />

                <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 border border-cyan-400/20 rounded-full bg-cyan-400/5 backdrop-blur-md">
                            <Zap className="w-3 h-3 fill-cyan-400" />
                            Workflow Marketplace
                        </span>
                    </div>

                    <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-5 tracking-tight">
                        <span className="text-white">Automation Templates</span>
                        <br />
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(135deg, #06b6d4 0%, #e6b422 100%)" }}
                        >
                            Built for Scale
                        </span>
                    </h1>

                    <p className="text-center max-w-2xl mx-auto text-base text-gray-400 mb-10 leading-relaxed">
                        Stop building from scratch. Every template includes the full n8n workflow JSON,
                        setup documentation, and lifetime support — ready to deploy in minutes.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 pt-6 border-t border-white/5">
                        {STATS.map(({ value, label, icon }) => (
                            <div key={label} className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-lg">{icon}</span>
                                    <span className="text-2xl font-display font-bold text-white">{value}</span>
                                </div>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Templates Grid (with FilterBar) ──────────────────── */}
            <section id="templates" className="relative pb-24">
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    <FilterBar />
                </div>
            </section>

            {/* ── CTA Section ──────────────────────────────────────── */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 text-center">
                    <div
                        className="inline-block px-6 py-3 rounded-2xl mb-8 border border-white/10"
                        style={{ background: "rgba(10,12,25,0.8)", backdropFilter: "blur(12px)" }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-400">Custom Build</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-5 text-white">
                        Need a{" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(135deg, #e6b422 0%, #c9a227 100%)" }}
                        >
                            Custom Workflow?
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Don&apos;t see what you need? We architect bespoke n8n automation systems
                        from scratch — tailored to your exact business processes and tech stack.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest text-navy-950 transition-all duration-300 hover:shadow-[0_0_40px_rgba(230,180,34,0.4)] hover:scale-105"
                            style={{ background: "linear-gradient(135deg, #e6b422 0%, #c9a227 100%)" }}
                        >
                            Book a Free Call
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="/services"
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest text-white glass border border-white/20 hover:bg-white/10 transition-all duration-300"
                        >
                            View Services
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
