"use client";

import { useEffect, useState, useCallback } from "react";
import {
    Briefcase,
    Plus,
    Pencil,
    Trash2,
    Save,
    X,
    Loader2,
    GripVertical,
    Eye,
    EyeOff,
} from "lucide-react";

interface Service {
    id: string;
    title: string;
    icon: string;
    description: string;
    features: string[];
    color: string;
    sort_order: number;
    is_active: boolean;
}

const ICONS = ["Zap", "Bot", "Boxes", "MessageSquare", "Code", "Globe", "Shield", "Cpu", "Database", "Workflow"];
const COLORS = [
    "from-amber-500 to-gold-400",
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-emerald-500 to-teal-400",
    "from-red-500 to-orange-400",
    "from-indigo-500 to-violet-400",
];

export default function ServicesAdmin() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Partial<Service> | null>(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");
    const [featureInput, setFeatureInput] = useState("");

    const loadServices = useCallback(async () => {
        const res = await fetch("/api/admin/content/services");
        const { data } = await res.json();
        setServices(data || []);
        setLoading(false);
    }, []);

    useEffect(() => { loadServices(); }, [loadServices]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        try {
            const method = editing.id ? "PUT" : "POST";
            const payload = { ...editing, sort_order: editing.sort_order || services.length };
            const res = await fetch("/api/admin/content/services", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                showToast(editing.id ? "Service updated!" : "Service created!");
                setEditing(null);
                loadServices();
            }
        } catch { showToast("Error saving"); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this service?")) return;
        await fetch(`/api/admin/content/services?id=${id}`, { method: "DELETE" });
        showToast("Service deleted");
        loadServices();
    };

    const addFeature = () => {
        if (!featureInput.trim() || !editing) return;
        setEditing({ ...editing, features: [...(editing.features || []), featureInput.trim()] });
        setFeatureInput("");
    };

    const removeFeature = (idx: number) => {
        if (!editing) return;
        setEditing({ ...editing, features: (editing.features || []).filter((_, i) => i !== idx) });
    };

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
                        <Briefcase className="w-6 h-6 text-gold-400" />
                        Services
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">{services.length} services</p>
                </div>
                <button
                    onClick={() => setEditing({ title: "", icon: "Zap", description: "", features: [], color: COLORS[0], is_active: true })}
                    className="flex items-center gap-2 px-4 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-gold-400/25 transition-all"
                >
                    <Plus className="w-4 h-4" /> New Service
                </button>
            </div>

            {/* Editor Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-6 card-glow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-display font-bold text-white">
                                {editing.id ? "Edit Service" : "New Service"}
                            </h2>
                            <button onClick={() => setEditing(null)} className="p-2 text-gray-400 hover:text-white rounded-lg"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
                                <input
                                    value={editing.title || ""}
                                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50"
                                    placeholder="Service name"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Icon</label>
                                    <select
                                        value={editing.icon || "Zap"}
                                        onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50"
                                    >
                                        {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Color</label>
                                    <select
                                        value={editing.color || COLORS[0]}
                                        onChange={(e) => setEditing({ ...editing, color: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50"
                                    >
                                        {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
                                <textarea
                                    value={editing.description || ""}
                                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 resize-none"
                                    placeholder="Service description..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Features</label>
                                <div className="space-y-2 mb-3">
                                    {(editing.features || []).map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 p-2 bg-navy-900/50 rounded-lg border border-white/5">
                                            <GripVertical className="w-4 h-4 text-gray-600" />
                                            <span className="flex-1 text-sm text-gray-300">{f}</span>
                                            <button onClick={() => removeFeature(i)} className="p-1 text-gray-500 hover:text-red-400"><X className="w-3 h-3" /></button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        value={featureInput}
                                        onChange={(e) => setFeatureInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                                        className="flex-1 px-4 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50"
                                        placeholder="Add a feature..."
                                    />
                                    <button onClick={addFeature} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white text-sm">Add</button>
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={editing.is_active !== false}
                                    onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                                    className="accent-gold-400 w-4 h-4"
                                />
                                <span className="text-sm text-gray-300">Active (visible on website)</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5">
                            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !editing.title}
                                className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Services List */}
            {loading ? (
                <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 glass rounded-lg animate-pulse" />)}</div>
            ) : services.length === 0 ? (
                <div className="text-center py-16 glass rounded-xl">
                    <Briefcase className="w-10 h-10 mx-auto mb-3 text-gray-600" />
                    <p className="text-gray-400">No services yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {services.map((svc) => (
                        <div key={svc.id} className="glass rounded-xl p-4 flex items-center gap-4 card-glow hover:border-white/10 transition-all">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${svc.color} flex items-center justify-center flex-shrink-0`}>
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-semibold text-white">{svc.title}</h3>
                                    {!svc.is_active && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-500/10 text-gray-500 border border-gray-500/20">Hidden</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 truncate mt-0.5">{svc.description}</p>
                                <p className="text-[10px] text-gray-600 mt-1">{(svc.features || []).length} features</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => { setEditing(svc); setFeatureInput(""); }} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(svc.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
