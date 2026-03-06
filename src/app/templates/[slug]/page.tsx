import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Zap, DollarSign } from "lucide-react";
import { templates, categoryColors, difficultyColors } from "@/data/templates";
import WorkflowCanvas from "@/components/templates/N8nCanvasWrapper";
import TemplateCard from "@/components/templates/TemplateCard";

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const template = templates.find((t) => t.slug === params.slug);
    if (!template) return { title: "Template Not Found | BridgeFlow" };
    return {
        title: `${template.name} — Bridgeflow`,
        description: template.description,
        openGraph: {
            title: `${template.name} — Bridgeflow`,
            description: template.description,
            images: [`/images/templates/${template.slug}.png`],
            type: "website",
        },
    };
}

const whatYouGet = [
    "Complete n8n workflow JSON file",
    "Step-by-step setup guide (PDF)",
    "Video walkthrough",
    "30 days email support",
];

export default function TemplateDetailPage({ params }: Props) {
    const template = templates.find((t) => t.slug === params.slug);
    if (!template) notFound();

    const related = templates.filter((t) => t.slug !== template.slug && t.categories.some((c) => template.categories.includes(c))).slice(0, 3);

    return (
        <>
            {/* ── Header / Hero ─────────────────────────────────── */}
            <section className="relative pt-32 pb-12 overflow-hidden aurora-glow">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/40 via-navy-950 to-navy-950" />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-15 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
                />

                <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8">
                    {/* Back link */}
                    <Link
                        href="/templates"
                        className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gold-400 transition-colors mb-8 uppercase tracking-wider font-semibold"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        All Templates
                    </Link>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {template.categories.map((cat) => (
                            <span
                                key={cat}
                                className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[cat] || "bg-gray-500/15 text-gray-400 border-gray-500/20"}`}
                            >
                                {cat}
                            </span>
                        ))}
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${difficultyColors[template.difficulty]}`}>
                            {template.difficulty}
                        </span>
                        {template.featured && (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-navy-950" style={{ background: "linear-gradient(135deg, #e6b422, #c9a227)" }}>
                                ⭐ MOST POPULAR
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4">
                        {template.name}
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">{template.description}</p>
                </div>
            </section>

            {/* ── Main Content ──────────────────────────────────── */}
            <section className="section-padding -mt-4">
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* LEFT — main content */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Stat boxes */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: Zap, label: "Nodes", value: template.nodeCount.toString() + (template.nodeCount >= 25 ? "+" : "") },
                                    { icon: Clock, label: "Setup Time", value: template.setupTime },
                                    { icon: DollarSign, label: "Est. Value", value: `$${template.value.toLocaleString()}` },
                                ].map((s) => (
                                    <div
                                        key={s.label}
                                        className="rounded-2xl p-5 text-center"
                                        style={{ background: "rgba(12,12,28,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
                                    >
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(230,180,34,0.1)", border: "1px solid rgba(230,180,34,0.15)" }}>
                                            <s.icon className="w-5 h-5 text-gold-400" />
                                        </div>
                                        <div className="text-2xl font-display font-bold gold-text">{s.value}</div>
                                        <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What it does */}
                            <div
                                className="rounded-2xl p-7"
                                style={{ background: "rgba(12,12,28,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}
                            >
                                <h2 className="text-xl font-display font-bold text-white mb-5">What this workflow does</h2>
                                <ul className="space-y-3">
                                    {template.whatItDoes.map((step, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Nodes used */}
                            <div>
                                <h2 className="text-lg font-display font-bold text-white mb-3">Tools & Nodes</h2>
                                <div className="flex flex-wrap gap-2">
                                    {template.nodes.map((node) => (
                                        <span
                                            key={node}
                                            className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold border"
                                            style={{ background: "rgba(12,12,28,0.9)", border: "1px solid rgba(255,255,255,0.08)", color: "#d1d5db" }}
                                        >
                                            {node}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Workflow diagram */}
                            <div id="canvas">
                                <h2 className="text-lg font-display font-bold text-white mb-3">Live Workflow</h2>
                                <div
                                    className="rounded-2xl overflow-hidden"
                                    style={{ border: "1px solid rgba(0,255,200,0.15)", borderRadius: 12 }}
                                >
                                    <WorkflowCanvas slug={template.slug} workflowId={template.n8nWorkflowId} fallbackWorkflowJson={template.workflowJson} />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — sidebar */}
                        <div className="space-y-6">
                            {/* CTA card */}
                            <div
                                className="rounded-2xl overflow-hidden sticky top-24"
                                style={{ background: "rgba(12,12,28,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
                            >
                                <div
                                    className="h-2 w-full"
                                    style={{ background: "linear-gradient(90deg, #06b6d4, #e6b422)" }}
                                />
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="text-4xl font-display font-bold gold-text mb-1">
                                            ${template.value.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">Estimated value saved</div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <a
                                            href="/contact"
                                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-navy-950 transition-all duration-300 hover:shadow-[0_0_20px_rgba(230,180,34,0.4)] hover:scale-105"
                                            style={{ background: "linear-gradient(135deg, #e6b422 0%, #c9a227 100%)" }}
                                        >
                                            Get This Template — ${template.value.toLocaleString()}
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="/contact"
                                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white glass border border-white/10 hover:bg-white/10 transition-all duration-300"
                                        >
                                            Get Custom Build
                                        </a>
                                    </div>

                                    {/* What you get */}
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">What you get</p>
                                        <ul className="space-y-2">
                                            {whatYouGet.map((item) => (
                                                <li key={item} className="flex items-center gap-2 text-xs text-gray-300">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Related Templates ─────────────────────────────── */}
            {related.length > 0 && (
                <section className="section-padding bg-navy-900/20">
                    <div className="container-max px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-display font-bold text-white mb-8">Related Templates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map((t) => (
                                <TemplateCard key={t.id} template={t} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
