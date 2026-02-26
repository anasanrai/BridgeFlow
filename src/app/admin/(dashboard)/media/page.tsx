"use client";

import { useEffect, useState, useCallback } from "react";
import { FolderOpen, Plus, Save, Loader2, X, Image as ImageIcon, Film, Type, Trash2, ExternalLink } from "lucide-react";

interface MediaItem {
    id: string;
    type: "image" | "video" | "text";
    title: string;
    url?: string;
    content?: string;
    category: string;
    created_at: string;
}

export default function MediaManagerAdmin() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState<Partial<MediaItem> | null>(null);
    const [toast, setToast] = useState("");

    const load = useCallback(async () => {
        setLoading(true);
        try {
            // We use the same content API but might need a 'media' section in DB
            // For now, let's assume valid section 'media' exists or we mock it
            const res = await fetch("/api/admin/content/media");
            const data = await res.json();
            setItems(data.data || []);
        } catch (error) {
            console.error("Failed to load media:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        try {
            const method = editing.id ? "PUT" : "POST";
            await fetch("/api/admin/content/media", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editing),
            });
            showToast("Media item saved!");
            setEditing(null);
            load();
        } catch { showToast("Error saving media"); } finally { setSaving(false); }
    };

    const deleteItem = async (id: string) => {
        if (!confirm("Delete this archive?")) return;
        try {
            await fetch(`/api/admin/content/media?id=${id}`, { method: "DELETE" });
            showToast("Item removed");
            load();
        } catch { showToast("Error deleting item"); }
    };

    if (loading) return <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 glass rounded-lg animate-pulse" />)}</div>;

    return (
        <div className="max-w-6xl mx-auto">
            {toast && <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium">{toast}</div>}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                        <FolderOpen className="w-6 h-6 text-gold-400" />
                        Media & Assets
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage realistic brand assets, videos, and copywriting</p>
                </div>
                <button
                    onClick={() => setEditing({ title: "", type: "image", category: "General", url: "" })}
                    className="flex items-center gap-2 px-4 py-2.5 gold-gradient text-navy-950 font-bold rounded-lg text-sm"
                >
                    <Plus className="w-4 h-4" /> Add Asset
                </button>
            </div>

            {/* Editor Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <div className="w-full max-w-xl glass rounded-2xl p-6 border border-white/10 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white">Asset Details</h2>
                            <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1.5">Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: "image", icon: ImageIcon, label: "Image" },
                                        { id: "video", icon: Film, label: "Video" },
                                        { id: "text", icon: Type, label: "Copy" },
                                    ].map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setEditing({ ...editing, type: t.id as any })}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${editing.type === t.id ? 'bg-gold-400/10 border-gold-400/50 text-gold-400' : 'bg-white/5 border-white/5 text-gray-400'}`}
                                        >
                                            <t.icon className="w-5 h-5" />
                                            <span className="text-[10px] font-bold">{t.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1.5">Asset Title</label>
                                <input
                                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-gold-400/50 outline-none"
                                    value={editing.title}
                                    onChange={e => setEditing({ ...editing, title: e.target.value })}
                                    placeholder="e.g., Hero Background Video"
                                />
                            </div>

                            {editing.type === "text" ? (
                                <div>
                                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1.5">Content / Copy</label>
                                    <textarea
                                        className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-gold-400/50 outline-none h-32 resize-none"
                                        value={editing.content || ""}
                                        onChange={e => setEditing({ ...editing, content: e.target.value })}
                                        placeholder="Paste enterprise copy here..."
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1.5">Public URL</label>
                                    <input
                                        className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-gold-400/50 outline-none"
                                        value={editing.url || ""}
                                        onChange={e => setEditing({ ...editing, url: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1.5">Category</label>
                                <input
                                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-gold-400/50 outline-none"
                                    value={editing.category}
                                    onChange={e => setEditing({ ...editing, category: e.target.value })}
                                    placeholder="e.g., Branding, Services, UI"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button onClick={() => setEditing(null)} className="flex-1 py-2.5 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 py-2.5 gold-gradient text-navy-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save Asset
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Asset List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.length === 0 ? (
                    <div className="col-span-full py-20 text-center glass rounded-2xl border border-dashed border-white/10">
                        <FolderOpen className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">Your asset vault is empty</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="glass rounded-2xl p-4 border border-white/5 hover:border-gold-400/20 transition-all group relative">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'image' ? 'bg-blue-500/10 text-blue-400' : item.type === 'video' ? 'bg-purple-500/10 text-purple-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                    {item.type === 'image' ? <ImageIcon className="w-5 h-5" /> : item.type === 'video' ? <Film className="w-5 h-5" /> : <Type className="w-5 h-5" />}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditing(item)} className="p-2 text-gray-500 hover:text-white"><Plus className="w-4 h-4 rotate-45" /></button>
                                    <button onClick={() => deleteItem(item.id)} className="p-2 text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{item.category}</div>

                            {item.type !== 'text' && (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-white/5 rounded-lg text-[10px] font-bold text-gray-400 hover:text-white transition-colors border border-white/5"
                                >
                                    <ExternalLink className="w-3 h-3" /> View Asset
                                </a>
                            )}

                            {item.type === 'text' && (
                                <div className="mt-4 p-3 bg-navy-950/50 rounded-lg border border-white/5 text-[10px] text-gray-500 line-clamp-3 italic">
                                    "{item.content}"
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
