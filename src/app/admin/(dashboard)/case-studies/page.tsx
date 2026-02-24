"use client";

import { useEffect, useState, useCallback } from "react";
import { FolderOpen, Plus, Pencil, Trash2, Save, X, Loader2, Eye, EyeOff, TrendingUp } from "lucide-react";

interface CaseStudy {
    id: string; slug: string; title: string; industry: string; client: string;
    excerpt: string; challenge: string; solution: string;
    results: { metric: string; label: string }[];
    tags: string[];
    is_published: boolean; sort_order: number;
    seo_title?: string; seo_description?: string; og_image?: string;
}

export default function CaseStudiesAdmin() {
    const [studies, setStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Partial<CaseStudy> | null>(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [metricInput, setMetricInput] = useState({ metric: "", label: "" });
    const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

    const load = useCallback(async () => {
        const res = await fetch("/api/admin/content/case_studies");
        const { data } = await res.json();
        setStudies(data || []);
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        try {
            const method = editing.id ? "PUT" : "POST";
            const res = await fetch("/api/admin/content/case_studies", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
            if (res.ok) { showToast("Saved!"); setEditing(null); load(); }
        } catch { showToast("Error"); } finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        await fetch(`/api/admin/content/case_studies?id=${id}`, { method: "DELETE" });
        showToast("Deleted"); load();
    };

    const addTag = () => { if (!tagInput.trim() || !editing) return; setEditing({ ...editing, tags: [...(editing.tags || []), tagInput.trim()] }); setTagInput(""); };
    const removeTag = (i: number) => { if (!editing) return; setEditing({ ...editing, tags: (editing.tags || []).filter((_, idx) => idx !== i) }); };
    const addResult = () => {
        if (!metricInput.metric || !metricInput.label || !editing) return;
        setEditing({ ...editing, results: [...(editing.results || []), { ...metricInput }] });
        setMetricInput({ metric: "", label: "" });
    };
    const removeResult = (i: number) => { if (!editing) return; setEditing({ ...editing, results: (editing.results || []).filter((_, idx) => idx !== i) }); };

    const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return (
        <div>
            {toast && <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium">{toast}</div>}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2"><FolderOpen className="w-6 h-6 text-gold-400" />Case Studies</h1>
                    <p className="text-sm text-gray-500 mt-1">{studies.length} case studies</p>
                </div>
                <button onClick={() => {
                    setEditing({ title: "", slug: "", industry: "", client: "", excerpt: "", challenge: "", solution: "", results: [], tags: [], is_published: true, seo_title: "", seo_description: "", og_image: "" });
                    setActiveTab("content");
                }}
                    className="flex items-center gap-2 px-4 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm"><Plus className="w-4 h-4" /> New Case Study</button>
            </div>

            {/* Editor Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-6 card-glow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-display font-bold text-white">{editing.id ? "Edit" : "New"} Case Study</h2>
                            <button onClick={() => setEditing(null)} className="p-2 text-gray-400 hover:text-white rounded-lg"><X className="w-5 h-5" /></button>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-4 mb-6 border-b border-white/5">
                            <button onClick={() => setActiveTab("content")} className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === "content" ? "text-gold-400" : "text-gray-500 hover:text-white"}`}>
                                Content {activeTab === "content" && <span className="absolute bottom-0 left-0 right-0 h-0.5 gold-gradient" />}
                            </button>
                            <button onClick={() => setActiveTab("seo")} className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === "seo" ? "text-gold-400" : "text-gray-500 hover:text-white"}`}>
                                SEO & Social {activeTab === "seo" && <span className="absolute bottom-0 left-0 right-0 h-0.5 gold-gradient" />}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {activeTab === "content" ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
                                            <input value={editing.title || ""} onChange={e => setEditing({ ...editing, title: e.target.value, slug: editing.id ? editing.slug : generateSlug(e.target.value) })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
                                            <input value={editing.slug || ""} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-gold-400/50" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Client</label>
                                            <input value={editing.client || ""} onChange={e => setEditing({ ...editing, client: e.target.value })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Industry</label>
                                            <input value={editing.industry || ""} onChange={e => setEditing({ ...editing, industry: e.target.value })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" />
                                        </div>
                                    </div>
                                    <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt</label>
                                        <textarea value={editing.excerpt || ""} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 resize-none" /></div>
                                    <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Challenge</label>
                                        <textarea value={editing.challenge || ""} onChange={e => setEditing({ ...editing, challenge: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 resize-none" /></div>
                                    <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Solution</label>
                                        <textarea value={editing.solution || ""} onChange={e => setEditing({ ...editing, solution: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 resize-none" /></div>

                                    {/* Results */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Results Metrics</label>
                                        {(editing.results || []).map((r, i) => (
                                            <div key={i} className="flex items-center gap-2 mb-2 p-2 bg-navy-900/50 rounded-lg border border-white/5">
                                                <TrendingUp className="w-4 h-4 text-gold-400" /><span className="font-semibold text-white text-sm">{r.metric}</span><span className="text-gray-400 text-sm">{r.label}</span>
                                                <button onClick={() => removeResult(i)} className="ml-auto p-1 text-gray-500 hover:text-red-400"><X className="w-3 h-3" /></button>
                                            </div>
                                        ))}
                                        <div className="flex gap-2">
                                            <input value={metricInput.metric} onChange={e => setMetricInput({ ...metricInput, metric: e.target.value })} className="w-24 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" placeholder="300%" />
                                            <input value={metricInput.label} onChange={e => setMetricInput({ ...metricInput, label: e.target.value })} className="flex-1 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" placeholder="increase in leads" />
                                            <button onClick={addResult} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm">Add</button>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Tags</label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {(editing.tags || []).map((t, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-gold-400/10 text-gold-400 border border-gold-400/20">
                                                    {t}<button onClick={() => removeTag(i)} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} className="flex-1 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" placeholder="Add tag..." />
                                            <button onClick={addTag} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm">Add</button>
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={editing.is_published !== false} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} className="accent-gold-400 w-4 h-4" />
                                        <span className="text-sm text-gray-300">Published</span>
                                    </label>
                                </>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-4 rounded-xl bg-gold-400/5 border border-gold-400/10">
                                        <h4 className="text-sm font-semibold text-gold-400 mb-2">SEO Optimization</h4>
                                        <p className="text-xs text-gray-400">Customize search appearance. If blank, we use the title and industry.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">SEO Title</label>
                                        <input value={editing.seo_title || ""} onChange={e => setEditing({ ...editing, seo_title: e.target.value })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="Custom SEO Title" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">SEO Description</label>
                                        <textarea value={editing.seo_description || ""} onChange={e => setEditing({ ...editing, seo_description: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 resize-none" placeholder="Meta description..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">OG Image URL</label>
                                        <input value={editing.og_image || ""} onChange={e => setEditing({ ...editing, og_image: e.target.value })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="https://..." />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5">
                            <button onClick={() => { setEditing(null); setActiveTab("content"); }} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                            <button onClick={handleSave} disabled={saving || !editing.title} className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm disabled:opacity-50">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {studies.map(s => (
                <div key={s.id} className="glass rounded-xl p-4 card-glow">
                    <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                                {!s.is_published && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-500/10 text-gray-500 border border-gray-500/20">Draft</span>}
                            </div>
                            <p className="text-xs text-gray-500">{s.client} · {s.industry}</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {(s.results || []).slice(0, 3).map((r, i) => (
                                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-gold-400/10 text-gold-400 font-medium">{r.metric} {r.label}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => setEditing(s)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(s.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            ))}
            {studies.length === 0 && <div className="text-center py-16 glass rounded-xl text-gray-500">No case studies yet</div>}
        </div>
    );
}
