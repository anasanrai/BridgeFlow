"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, Zap, DollarSign, ShoppingCart } from "lucide-react";
import { Template, categoryColors, difficultyColors } from "@/data/templates";
import N8nCanvas, { N8nNodeIconStrip, getN8nNodeStyle } from "./N8nCanvas";
import PaymentModal from "@/components/PaymentModal";

interface TemplateCardProps {
    template: Template;
    compact?: boolean;
}

export default function TemplateCard({ template, compact = false }: TemplateCardProps) {
    const [showPayment, setShowPayment] = useState(false);
    const primaryCategory = template.categories?.[0] || "General";
    const hasWorkflow = !!template.workflowJson;
    const priceStr = (template.value || 0) > 0 ? `$${(template.value || 0).toLocaleString()}` : "Free";

    return (
        <>
            <div
                className="template-card group relative flex flex-col rounded-2xl overflow-hidden border border-white/8 hover:border-gold-400/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(230,180,34,0.05)]"
                style={{
                    background: "rgba(10,12,25,0.7)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
            >
                {/* Canvas Preview */}
                <Link href={`/templates/${template.slug}`} className="block">
                    <div className="relative h-44 overflow-hidden border-b border-white/5">
                        {hasWorkflow ? (
                            <N8nCanvas
                                workflowJson={template.workflowJson}
                                compact
                                className="w-full h-full"
                                height={176}
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center relative"
                                style={{ background: "radial-gradient(ellipse at 50% 50%, #0d0d20 0%, #050510 100%)" }}
                            >
                                <svg width="100%" height="100%" className="absolute inset-0 opacity-30">
                                    <defs>
                                        <pattern id="grid-card" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.1)" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid-card)" />
                                </svg>
                                <div className="relative z-10 flex flex-wrap gap-2 justify-center px-4">
                                    {(template.nodes || []).slice(0, 5).map((name, i) => {
                                        const style = getN8nNodeStyle("", name);
                                        return (
                                            <div
                                                key={i}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                                                style={{
                                                    background: style.iconBg + "25",
                                                    border: `1px solid ${style.border}50`,
                                                    color: "rgba(255,255,255,0.85)",
                                                }}
                                            >
                                                <span style={{ fontSize: 12 }}>{style.icon}</span>
                                                <span>{name.length > 12 ? name.slice(0, 11) + "…" : name}</span>
                                            </div>
                                        );
                                    })}
                                    {Array.isArray(template.nodes) && template.nodes.length > 5 && (
                                        <div className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-gray-500 border border-white/10">
                                            +{template.nodes.length - 5} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center bg-navy-950/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="px-4 py-2 rounded-full glass border border-white/15 text-[10px] font-bold uppercase tracking-widest text-white shadow-2xl backdrop-blur-sm">
                                View Workflow →
                            </div>
                        </div>

                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight border backdrop-blur-sm ${categoryColors[primaryCategory] || "bg-gray-500/15 text-gray-400 border-gray-500/20"}`}>
                                {primaryCategory}
                            </span>
                        </div>

                        <div className="absolute top-3 right-3 z-10">
                            <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold border backdrop-blur-sm ${difficultyColors[template.difficulty]}`}>
                                {template.difficulty}
                            </span>
                        </div>

                        {template.featured && (
                            <div className="absolute bottom-3 left-3 z-10">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight text-navy-950 backdrop-blur-sm" style={{ background: "linear-gradient(135deg, #e6b422, #c9a227)" }}>
                                    ⭐ Most Popular
                                </span>
                            </div>
                        )}
                    </div>
                </Link>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                    <Link href={`/templates/${template.slug}`}>
                        <h3 className="font-display font-bold text-white text-base leading-snug group-hover:text-gold-400 transition-colors line-clamp-2">
                            {template.name}
                        </h3>
                    </Link>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
                        {template.description}
                    </p>
                    <N8nNodeIconStrip nodes={template.nodes} />
                    <div className="flex items-center gap-3 pt-1 border-t border-white/5">
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                            <Zap className="w-3 h-3 text-gold-400" />
                            <span className="font-semibold text-gray-400">{template.nodeCount}</span>
                            <span>nodes</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            <span>{template.setupTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 ml-auto">
                            <DollarSign className="w-3 h-3 text-emerald-400" />
                            <span className="font-bold text-emerald-400">{template.value}</span>
                            <span>value</span>
                        </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                        <Link
                            href={`/templates/${template.slug}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-300 border border-white/10 hover:border-white/25 hover:text-white transition-all"
                        >
                            Learn More
                        </Link>
                        <button
                            onClick={() => setShowPayment(true)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-navy-950 transition-all hover:shadow-[0_0_20px_rgba(230,180,34,0.3)] hover:scale-[1.02]"
                            style={{ background: "linear-gradient(135deg, #e6b422 0%, #c9a227 100%)" }}
                        >
                            <ShoppingCart className="w-3 h-3" />
                            Get {priceStr}
                        </button>
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                planName={`Template: ${template.name}`}
                planPrice={priceStr}
                planPriceNumeric={template.value}
            />
        </>
    );
}
