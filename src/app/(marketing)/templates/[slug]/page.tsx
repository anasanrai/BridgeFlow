import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Zap, DollarSign, Lock } from "lucide-react";
import { templates, categoryColors, difficultyColors } from "@/data/templates";
import { WorkflowImageViewer } from "@/components/templates/WorkflowImageViewer";
import TemplateCard from "@/components/templates/TemplateCard";
import TemplatePurchaseButton from "@/components/templates/TemplatePurchaseButton";
import JsonViewer from "@/components/templates/JsonViewer";
import CopyJsonButton from "@/components/templates/CopyJsonButton";
import { createAdminClient } from "@/lib/supabase/server";


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

async function getTemplateWithWorkflowId(slug: string) {
    try {
        const sb = createAdminClient();

        const { data, error } = await sb
            .from("templates")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error || !data) {
            console.warn(`[Template] Supabase fetch failed for ${slug}, using local data`);
            const local = templates.find((t) => t.slug === slug);
            return local ? {
                ...local,
                jsonAccess: "free",
                shortDescription: local.description,
                longDescription: local.longDescription || local.description,
                connectionCount: 0,
                imageUrls: [],
                jsonUrl: "",
                tools: local.nodes || []
            } : null;
        }

        const d = data as any;
        return {
            id: d.id || '',
            name: d.name || 'Untitled Template',
            slug: d.slug || '',
            categories: Array.isArray(d.categories) ? d.categories : [],
            difficulty: d.difficulty || "Beginner",
            nodes: Array.isArray(d.nodes) ? d.nodes : [],
            nodeCount: Number(d.node_count || 0),
            setupTime: String(d.setup_time || "30 min"),
            value: Number(d.value || 0),
            description: d.short_description || d.description || "",
            shortDescription: d.short_description || d.description || "",
            longDescription: d.long_description || d.description || "",
            whatItDoes: Array.isArray(d.what_it_does) ? d.what_it_does : [],
            featured: Boolean(d.featured),
            status: d.status || "published",
            n8nWorkflowId: d.n8n_workflow_id || "",
            updatedAt: d.updated_at,
            imageUrl: d.image_url || null,
            imageUrls: Array.isArray(d.image_urls) ? d.image_urls : [],
            workflowJson: d.workflow_json || null,
            jsonAccess: d.json_access || "paid",
            connectionCount: Number(d.connection_count || 0),
            tools: Array.isArray(d.tools) ? d.tools : (Array.isArray(d.nodes) ? d.nodes : []),
        };

    } catch (err) {
        console.warn(`[Template] Error fetching from Supabase: ${err}`);
        const local = templates.find((t) => t.slug === slug);
        return local ? {
            ...local,
            jsonAccess: "free",
            shortDescription: local.description,
            longDescription: local.description,
            imageUrls: [],
            whatItDoes: [],
            nodes: local.nodes || []
        } : null;
    }
}

export default async function TemplateDetailPage({ params }: Props) {
    const template = await getTemplateWithWorkflowId(params.slug);
    if (!template) notFound();

    const templateCategories = Array.isArray(template.categories) ? template.categories : [];
    const related = templates.filter((t: any) =>
        t && t.slug !== template.slug &&
        Array.isArray(t.categories) &&
        t.categories.some((c: string) => templateCategories.includes(c))
    ).slice(0, 3);

    return (
        <>
            <section className="relative pt-32 pb-12 overflow-hidden aurora-glow">
                <div className="absolute inset-0 bg-gradient-radial from-neutral-800/40 via-neutral-950 to-neutral-950" />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-15 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
                />

                <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/templates"
                        className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-brand-coral transition-colors mb-8 uppercase tracking-wider font-semibold"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        All Templates
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {(templateCategories || []).map((cat: string) => (
                            <span
                                key={cat}
                                className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[cat] || "bg-gray-500/15 text-gray-400 border-gray-500/20"}`}
                            >
                                {cat}
                            </span>
                        ))}
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${difficultyColors[template.difficulty || "Beginner"]}`}>
                            {template.difficulty}
                        </span>
                        {template.featured && (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-neutral-950" style={{ background: "linear-gradient(135deg, #e6b422, #c9a227)" }}>
                                ⭐ MOST POPULAR
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4">
                        {template.name}
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">{template.shortDescription || template.description}</p>
                </div>
            </section>

            <section className="section-padding -mt-4">
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-10">
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: Zap, label: "Nodes", value: (template.nodeCount || 0).toString() + ((template.nodeCount || 0) >= 25 ? "+" : "") },
                                    { icon: Clock, label: "Setup Time", value: template.setupTime || "30 min" },
                                    { icon: DollarSign, label: "Est. Value", value: `$${(template.value || 0).toLocaleString()}` },
                                ].map((s: { icon: any; label: string; value: string }) => (
                                    <div
                                        key={s.label}
                                        className="rounded-2xl p-5 text-center"
                                        style={{ background: "rgba(12,12,28,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
                                    >
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(230,180,34,0.1)", border: "1px solid rgba(230,180,34,0.15)" }}>
                                            <s.icon className="w-5 h-5 text-brand-coral" />
                                        </div>
                                        <div className="text-2xl font-display font-bold text-brand-coral font-bold">{s.value}</div>
                                        <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="rounded-2xl p-7"
                                style={{ background: "rgba(12,12,28,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}
                            >
                                <h2 className="text-xl font-display font-bold text-white mb-5">Workflow Overview</h2>
                                <div
                                    className="text-gray-300 text-sm leading-relaxed mb-6 prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: template.longDescription || template.description || "" }}
                                />
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Key Features</h3>
                                <ul className="space-y-3">
                                    {(Array.isArray(template.whatItDoes) ? template.whatItDoes : []).map((step: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-lg font-display font-bold text-white mb-3">Tools & Nodes</h2>
                                <div className="flex flex-wrap gap-2">
                                    {(Array.isArray(template.nodes) ? template.nodes : []).map((node: string) => (
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

                            <div id="canvas">
                                <h2 className="text-lg font-display font-bold text-white mb-3">Live Workflow</h2>
                                <div
                                    className="rounded-2xl overflow-hidden"
                                    style={{ border: "1px solid rgba(0,255,200,0.15)", borderRadius: 12 }}
                                >
                                    <WorkflowImageViewer
                                        slug={template.slug || ""}
                                        templateName={template.name || ""}
                                        imageUrls={Array.isArray(template.imageUrls) ? template.imageUrls : []}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
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
                                        <div className="text-4xl font-display font-bold text-brand-coral font-bold mb-1">
                                            ${(template.value || 0).toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">Estimated value saved</div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <TemplatePurchaseButton
                                            templateId={template.id}
                                            templateName={template.name || ""}
                                            templateValue={template.value || 0}
                                            templateSlug={template.slug || ""}
                                            variant="primary"
                                        />
                                        <a
                                            href="/contact"
                                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white glass border border-white/10 hover:bg-white/10 transition-all duration-300"
                                        >
                                            Get Custom Build
                                        </a>
                                    </div>

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

            <section className="section-padding bg-neutral-900/30 border-t border-white/5">
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-white mb-2">Workflow Structure</h2>
                            <p className="text-gray-400 text-sm">Technical blueprint and node configuration.</p>
                        </div>
                        {template.jsonAccess === "free" && template.workflowJson && (
                            <CopyJsonButton json={template.workflowJson} />
                        )}
                    </div>

                    {template.jsonAccess === "paid" ? (
                        <div className="relative rounded-2xl overflow-hidden glass border border-white/10 p-12 text-center group">
                            <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6">
                                <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Lock className="w-8 h-8 text-brand-coral" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Premium Workflow File</h3>
                                <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
                                    This is a premium high-performance workflow. Purchase the template to unlock the full JSON file and setup instructions.
                                </p>
                                <div className="w-full max-w-xs">
                                    <TemplatePurchaseButton
                                        templateId={template.id}
                                        templateName={template.name}
                                        templateValue={template.value}
                                        templateSlug={template.slug}
                                    />
                                </div>
                            </div>

                            <div className="opacity-20 select-none pointer-events-none filter blur-sm">
                                <pre className="text-[10px] text-cyan-400 font-mono text-left">
                                    {`{
  "name": "${template.name}",
  "nodes": [
    { "parameters": {}, "id": "uuid-1", "name": "Start", "type": "n8n-nodes-base.start", "position": [250, 300] },
    { "parameters": {}, "id": "uuid-2", "name": "AI Agent", "type": "n8n-nodes-base.ai", "position": [450, 300] },
    { "parameters": {}, "id": "uuid-3", "name": "Database", "type": "n8n-nodes-base.supabase", "position": [650, 300] }
  ],
  "connections": { ... }
}`}
                                </pre>
                            </div>
                        </div>
                    ) : (
                        template.workflowJson ? (
                            <JsonViewer json={template.workflowJson} />
                        ) : (
                            <div className="p-12 text-center rounded-2xl border border-dashed border-white/10 text-gray-500 italic text-sm">
                                No workflow JSON provided for this template yet.
                            </div>
                        )
                    )}
                </div>
            </section>

            {Array.isArray(related) && related.length > 0 && (
                <section className="section-padding bg-neutral-900/20">
                    <div className="container-max px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-display font-bold text-white mb-8">Related Templates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map((t: any) => (
                                <TemplateCard key={t.id} template={t} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
