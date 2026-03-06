import Link from "next/link";
import { Template, categoryColors, difficultyColors } from "@/data/templates";
import WorkflowDiagram from "./WorkflowDiagram";

interface TemplateCardProps {
    template: Template;
    compact?: boolean;
}

export default function TemplateCard({ template, compact = false }: TemplateCardProps) {
    const primaryCategory = template.categories[0];

    return (
        <div
            className="template-card relative flex flex-col rounded-2xl overflow-hidden border border-white/8"
            style={{
                background: "rgba(12,12,28,0.8)",
                transition: "transform 250ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out",
            }}
        >
            {/* ── MOST POPULAR ribbon ─────────────── */}
            {template.featured && (
                <div
                    className="absolute top-4 right-[-28px] z-10 rotate-45 px-8 py-1 text-[9px] font-black uppercase tracking-widest text-navy-950"
                    style={{
                        background: "linear-gradient(135deg, #e6b422 0%, #c9a227 100%)",
                        boxShadow: "0 2px 12px rgba(230,180,34,0.4)",
                    }}
                >
                    Most Popular
                </div>
            )}

            {/* ── Header badges ───────────────────── */}
            <div className="flex items-start justify-between gap-2 p-4 pb-0">
                <div className="flex flex-wrap gap-1.5">
                    {template.categories.slice(0, 2).map((cat) => (
                        <span
                            key={cat}
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${categoryColors[cat] || "bg-gray-500/15 text-gray-400 border-gray-500/20"}`}
                        >
                            {cat}
                        </span>
                    ))}
                </div>
                <span
                    className={`flex-shrink-0 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${difficultyColors[template.difficulty]}`}
                >
                    {template.difficulty}
                </span>
            </div>

            {/* ── Workflow mini-diagram ─────────────── */}
            <div className="px-4 pt-3">
                <WorkflowDiagram template={template} compact />
            </div>

            {/* ── Content ──────────────────────────── */}
            <div className="flex flex-col flex-1 gap-3 p-4">
                <div>
                    <h3 className="font-display font-bold text-white text-base leading-snug mb-1">
                        {template.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                        {template.description}
                    </p>
                </div>

                {/* Node pills */}
                <div className="flex flex-wrap gap-1.5">
                    {template.nodes.slice(0, 5).map((node) => (
                        <span
                            key={node}
                            className="inline-block px-2 py-0.5 rounded-md text-[9px] font-semibold bg-white/5 text-gray-400 border border-white/8"
                        >
                            {node}
                        </span>
                    ))}
                    {template.nodes.length > 5 && (
                        <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-semibold bg-white/5 text-gray-500 border border-white/8">
                            +{template.nodes.length - 5} more
                        </span>
                    )}
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-[11px] text-gray-500 border-t border-white/6 pt-3">
                    <span title="Node count">⚡ <span className="text-gray-300 font-semibold">{template.nodeCount}</span> nodes</span>
                    <span title="Setup time">⏱ <span className="text-gray-300 font-semibold">{template.setupTime}</span></span>
                    <span title="Estimated value" className="ml-auto text-gold-400 font-bold text-sm">
                        ${template.value.toLocaleString()}
                    </span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-auto">
                    <Link
                        href={`/templates/${template.slug}`}
                        className="flex-1 text-center px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gold-400 border border-gold-400/30 hover:bg-gold-400/10 hover:border-gold-400/50 transition-all duration-200"
                    >
                        View Details
                    </Link>
                    <Link
                        href="/contact"
                        className="flex-1 text-center px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-navy-950 transition-all duration-200 hover:shadow-[0_0_20px_rgba(230,180,34,0.4)] hover:scale-105"
                        style={{ background: "linear-gradient(135deg, #e6b422 0%, #c9a227 100%)" }}
                    >
                        Get Template
                    </Link>
                </div>
            </div>
        </div>
    );
}
