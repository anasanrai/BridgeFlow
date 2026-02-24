"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Plus, Pencil, Trash2, Globe, Save, X, Loader2, Info } from "lucide-react";

interface PageMetadata {
    id: string;
    path: string;
    title: string;
    description: string;
    og_image: string;
    updated_at: string;
}

const DEFAULT_PAGES = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/case-studies", label: "Case Studies" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
];

export default function SEOAdmin() {
    const [metadata, setMetadata] = useState<PageMetadata[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Partial<PageMetadata> | null>(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");

    const load = useCallback(async () => {
        const res = await fetch("/api/admin/content/page_metadata");
        const { data } = await res.json();
        setMetadata(data || []);
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    const handleSave = async () => {
        if (!editing || !editing.path) return;
        setSaving(true);
        try {
            const method = editing.id ? "PUT" : "POST";
            const res = await fetch("/api/admin/content/page_metadata", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editing),
            });
            if (res.ok) {
                showToast("SEO data saved!");
                setEditing(null);
                load();
            }
        } catch {
            showToast("Error saving data");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this override? Site defaults will be used.")) return;
        await fetch(`/api/admin/content/page_metadata?id=${id}`, { method: "DELETE" });
        showToast("Override deleted");
        load();
    };

    const filteredMetadata = metadata.filter(m => m.path.toLowerCase().includes(search.toLowerCase()) || m.title?.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            {toast && (
                <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
                    {toast}
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                        <Globe className="w-6 h-6 text-gold-400" />
                        SEO Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Control search appearance and social previews for all pages
                    </p>
                </div>
                <button
                    onClick={() => setEditing({ path: "", title: "", description: "", og_image: "" })}
                    className="flex items-center gap-2 px-4 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Page Override
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by path or title..."
                            className="w-full pl-11 pr-4 py-2.5 bg-navy-900/50 border border-white/10 rounded-lg text-white"
                        />
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => <div key={i} className="h-24 glass rounded-xl animate-pulse" />)}
                        </div>
                    ) : filteredMetadata.length === 0 ? (
                        <div className="text-center py-16 glass rounded-xl border border-dashed border-white/10">
                            <Globe className="w-10 h-10 mx-auto mb-4 text-gray-600" />
                            <p className="text-gray-400">No SEO overrides found</p>
                            <button onClick={() => setEditing({ path: "/" })} className="mt-4 text-gold-400 hover:text-gold-300">Add first override →</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredMetadata.map(m => (
                                <div key={m.id} className="glass rounded-xl p-5 card-glow group">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded">
                                                    {m.path}
                                                </span>
                                                <h3 className="font-semibold text-white">{m.title}</h3>
                                            </div>
                                            <p className="text-sm text-gray-400 line-clamp-2">{m.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditing(m)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(m.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    {m.og_image && (
                                        <div className="mt-4 p-2 bg-black/20 rounded-lg border border-white/5 inline-flex items-center gap-2">
                                            <div className="w-10 h-6 bg-gray-800 rounded overflow-hidden">
                                                <img src={m.og_image} alt="OG Preview" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-mono">OG Image Enabled</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Info / Tips */}
                <div className="space-y-6">
                    <div className="glass rounded-xl p-6 border border-gold-400/20">
                        <h4 className="flex items-center gap-2 text-gold-400 font-semibold mb-4 text-sm uppercase tracking-wider">
                            <Info className="w-4 h-4" />
                            SEO Quick Tips
                        </h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><strong className="text-gray-300">Meta Titles:</strong> Keep under 60 characters. Include your primary keyword.</li>
                            <li><strong className="text-gray-300">Descriptions:</strong> Aim for 150-160 characters. Write for clicks, not just bots.</li>
                            <li><strong className="text-gray-300">OG Images:</strong> Recommended size 1200x630. This is what people see on LinkedIn/X.</li>
                        </ul>
                    </div>

                    <div className="glass rounded-xl p-6">
                        <h4 className="text-white font-semibold mb-4 text-sm">Suggested Paths</h4>
                        <div className="flex flex-wrap gap-2">
                            {DEFAULT_PAGES.map(p => (
                                <button
                                    key={p.path}
                                    onClick={() => setEditing({ path: p.path, title: p.label })}
                                    className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 transition-colors"
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Editor Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="w-full max-w-2xl glass rounded-2xl p-6 card-glow border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-display font-bold text-white">
                                    {editing.id ? "Edit SEO Override" : "New SEO Override"}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Path: {editing.path || "/"}</p>
                            </div>
                            <button onClick={() => setEditing(null)} className="p-2 text-gray-400 hover:text-white rounded-xl bg-white/5"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Page Path</label>
                                    <input
                                        value={editing.path || ""}
                                        onChange={e => setEditing({ ...editing, path: e.target.value })}
                                        placeholder="/about-us"
                                        className="w-full px-4 py-3 bg-navy-950 border border-white/10 rounded-xl text-white font-mono text-sm focus:border-gold-400/50 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center justify-between">
                                        SEO Title
                                        <span className={`text-[10px] ${(editing.title?.length || 0) > 60 ? 'text-red-400' : 'text-gray-500'}`}>
                                            {editing.title?.length || 0}/60
                                        </span>
                                    </label>
                                    <input
                                        value={editing.title || ""}
                                        onChange={e => setEditing({ ...editing, title: e.target.value })}
                                        placeholder="Title | BridgeFlow Agency"
                                        className="w-full px-4 py-3 bg-navy-950 border border-white/10 rounded-xl text-white focus:border-gold-400/50 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center justify-between">
                                        Meta Description
                                        <span className={`text-[10px] ${(editing.description?.length || 0) > 160 ? 'text-red-400' : 'text-gray-500'}`}>
                                            {editing.description?.length || 0}/160
                                        </span>
                                    </label>
                                    <textarea
                                        value={editing.description || ""}
                                        onChange={e => setEditing({ ...editing, description: e.target.value })}
                                        rows={3}
                                        placeholder="Brief summary of the page for search results..."
                                        className="w-full px-4 py-3 bg-navy-950 border border-white/10 rounded-xl text-white resize-none focus:border-gold-400/50 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">OG Image URL</label>
                                    <input
                                        value={editing.og_image || ""}
                                        onChange={e => setEditing({ ...editing, og_image: e.target.value })}
                                        placeholder="https://"
                                        className="w-full px-4 py-3 bg-navy-950 border border-white/10 rounded-xl text-white focus:border-gold-400/50 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Previews */}
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Google Search Preview</h4>
                                    <div className="bg-white rounded-xl p-5 shadow-inner">
                                        <div className="text-[#1a0dab] text-xl font-medium truncate mb-1 leading-tight">
                                            {editing.title || "BridgeFlow — AI-Powered Automation Agency"}
                                        </div>
                                        <div className="text-[#006621] text-sm truncate mb-1">
                                            https://www.bridgeflow.agency{editing.path || ""}
                                        </div>
                                        <div className="text-[#4d5156] text-sm line-clamp-2 leading-relaxed">
                                            {editing.description || "Streamline your business workflows with AI-powered automation services and SaaS tools, built for global scale."}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Social Preview (OG)</h4>
                                    <div className="bg-[#1c1e21] rounded-xl overflow-hidden border border-white/10">
                                        <div className="aspect-[1.91/1] bg-navy-900 border-b border-white/5 overflow-hidden flex items-center justify-center">
                                            {editing.og_image ? (
                                                <img src={editing.og_image} alt="OG Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-gold-400/20 font-display font-bold text-4xl">BF</div>
                                            )}
                                        </div>
                                        <div className="p-4 bg-white/5">
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">BRIDGEFLOW.AGENCY</div>
                                            <div className="text-sm font-semibold text-white line-clamp-1">{editing.title || "BridgeFlow"}</div>
                                            <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{editing.description || "AI-Powered Automation Agency"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-white/5">
                            <button onClick={() => setEditing(null)} className="px-6 py-2.5 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !editing.path}
                                className="flex items-center gap-2 px-8 py-2.5 gold-gradient text-navy-950 font-bold rounded-xl text-sm shadow-lg shadow-gold-400/20 disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {saving ? "Saving..." : "Save Settings"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
