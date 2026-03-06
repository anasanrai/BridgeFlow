import Link from "next/link";
import {
    Webhook,
    Database,
    Mail,
    MessageSquare,
    Send,
    FileText,
    Calendar,
    Cpu,
    Bot,
    Globe,
    Zap,
    Table2,
    Code2,
    Briefcase,
    Users,
    ArrowRight
} from "lucide-react";
import { Template, categoryColors, difficultyColors } from "@/data/templates";
import WorkflowDiagram from "./WorkflowDiagram";

// Mapping n8n node names to Lucide icons
const nodeIconMap: Record<string, any> = {
    "Webhook": Webhook,
    "Google Sheets": Table2,
    "Telegram": Send,
    "Gmail": Mail,
    "OpenAI": Cpu,
    "Claude AI": Bot,
    "OpenRouter": Globe,
    "Slack": MessageSquare,
    "Database": Database,
    "Airtable": Table2,
    "Notion": FileText,
    "Google Calendar": Calendar,
    "Code": Code2,
    "HTTP Request": Globe,
    "AI Agent": Zap,
    "CRM": Briefcase,
    "GoHighLevel": Briefcase,
    "Lead": Users,
};

interface TemplateCardProps {
    template: Template;
    compact?: boolean;
}

export default function TemplateCard({ template, compact = false }: TemplateCardProps) {
    const primaryCategory = template.categories[0];

    return (
        <div
            className="template-card relative flex flex-col rounded-2xl overflow-hidden border border-white/8 group"
            style={{
                background: "rgba(10,12,25,0.6)",
                backdropFilter: "blur(10px)",
                transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            {/* ── Workflow Preview (Canvas style) ─────────────── */}
            <div className="relative h-48 overflow-hidden bg-navy-950/40 border-b border-white/5">
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                    <WorkflowDiagram template={template} compact />
                </div>

                {/* Overlay for "View Pattern" hint */}
                <div className="absolute inset-0 flex items-center justify-center bg-navy-950/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white shadow-2xl">
                        Preview Workflow
                    </div>
                </div>

                {/* ── Category badges ───────────────────── */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                    {template.categories.slice(0, 1).map((cat) => (
                        <span
                            key={cat}
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${categoryColors[cat] || "bg-gray-500/15 text-gray-400 border-gray-500/20"}`}
                        >
                            {cat}
                        </span>
                    ))}
                </div>

                {/* ── Difficulty ───────────────────── */}
                <div className="absolute top-4 right-4 z-10">
                    <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold border ${difficultyColors[template.difficulty]}`}
                    >
                        {template.difficulty}
                    </span>
                </div>
            </div>

            {/* ── Content ──────────────────────────── */}
            <div className="flex flex-col flex-1 p-5 lg:p-6 gap-4">
                <div>
                    <h3 className="font-display font-bold text-white text-lg leading-snug mb-2 group-hover:text-gold-400 transition-colors">
                        {template.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 italic">
                        &quot;{template.description}&quot;
                    </p>
                </div>

                {/* ── "In this workflow" Icons (n8n style) ───────── */}
                <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 opacity-60">In this workflow:</div>
                    <div className="flex flex-wrap gap-2">
                        {template.nodes.slice(0, 6).map((node) => {
                            const Icon = nodeIconMap[node] || Cpu;
                            return (
                                <div
                                    key={node}
                                    className="w-8 h-8 rounded-lg bg-navy-900/80 border border-white/5 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-400/20 transition-all cursor-help"
                                    title={node}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                            );
                        })}
                        {template.nodes.length > 6 && (
                            <div className="w-8 h-8 rounded-lg bg-navy-900/80 border border-white/5 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                +{template.nodes.length - 6}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Stats Strip ─────────────────────────── */}
                <div className="flex items-center justify-between py-3 border-y border-white/5 my-1">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Nodes</span>
                        <span className="text-sm font-bold text-gray-200">{template.nodeCount}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Setup</span>
                        <span className="text-sm font-bold text-gray-200">{template.setupTime}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Est. Value</span>
                        <span className="text-sm font-bold text-gold-400">${template.value.toLocaleString()}</span>
                    </div>
                </div>

                {/* ── Actions ──────────────────────────── */}
                <div className="flex gap-3 mt-2">
                    <Link
                        href={`/templates/${template.slug}`}
                        className="flex-1 text-center px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-white glass border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                        Learn More
                    </Link>
                    <Link
                        href={`/templates/${template.slug}#canvas`}
                        className="flex-1 text-center px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-navy-950 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                        style={{ background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" }}
                    >
                        Use Workflow
                    </Link>
                </div>
            </div>

            {/* ── Ribbon (Only if featured) ─────────────── */}
            {template.featured && (
                <div className="absolute top-0 right-0 p-4">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                    </span>
                </div>
            )}
        </div>
    );
}
