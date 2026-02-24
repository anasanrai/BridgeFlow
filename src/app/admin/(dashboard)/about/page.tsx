"use client";

import { useEffect, useState, useCallback } from "react";
import { Users, Plus, Pencil, Trash2, Save, X, Loader2, Target, Rocket, Heart, Lightbulb, Calendar } from "lucide-react";

interface TeamMember { id: string; name: string; role: string; initials: string; bio: string; avatar_url: string; sort_order: number; is_active: boolean; }
interface Value { id: string; icon: string; title: string; description: string; sort_order: number; }
interface Milestone { id: string; year: string; title: string; description: string; sort_order: number; }

type EditingType = { type: "team"; data: Partial<TeamMember> } | { type: "value"; data: Partial<Value> } | { type: "milestone"; data: Partial<Milestone> } | null;

export default function AboutAdmin() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [values, setValues] = useState<Value[]>([]);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<EditingType>(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");
    const [tab, setTab] = useState<"team" | "values" | "milestones">("team");

    const load = useCallback(async () => {
        const [t, v, m] = await Promise.all([
            fetch("/api/admin/content/team_members").then(r => r.json()),
            fetch("/api/admin/content/company_values").then(r => r.json()),
            fetch("/api/admin/content/milestones").then(r => r.json()),
        ]);
        setTeam(t.data || []); setValues(v.data || []); setMilestones(m.data || []);
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        const tableMap = { team: "team_members", value: "company_values", milestone: "milestones" };
        try {
            const method = editing.data.id ? "PUT" : "POST";
            const res = await fetch(`/api/admin/content/${tableMap[editing.type]}`, {
                method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing.data),
            });
            if (res.ok) { showToast("Saved!"); setEditing(null); load(); }
        } catch { showToast("Error"); } finally { setSaving(false); }
    };

    const handleDelete = async (type: "team" | "value" | "milestone", id: string) => {
        if (!confirm("Delete?")) return;
        const tableMap = { team: "team_members", value: "company_values", milestone: "milestones" };
        await fetch(`/api/admin/content/${tableMap[type]}?id=${id}`, { method: "DELETE" });
        showToast("Deleted"); load();
    };

    return (
        <div>
            {toast && <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium">{toast}</div>}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2"><Users className="w-6 h-6 text-gold-400" />About & Team</h1>
                    <p className="text-sm text-gray-500 mt-1">{team.length} members · {values.length} values · {milestones.length} milestones</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 p-1 glass rounded-lg w-fit">
                {[{ key: "team" as const, label: "Team" }, { key: "values" as const, label: "Values" }, { key: "milestones" as const, label: "Timeline" }].map(t => (
                    <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === t.key ? "bg-gold-400/10 text-gold-400" : "text-gray-400 hover:text-white"}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Add Button */}
            <button
                onClick={() => {
                    if (tab === "team") setEditing({ type: "team", data: { name: "", role: "", initials: "", is_active: true } });
                    if (tab === "values") setEditing({ type: "value", data: { icon: "Target", title: "", description: "" } });
                    if (tab === "milestones") setEditing({ type: "milestone", data: { year: "2026", title: "", description: "" } });
                }}
                className="flex items-center gap-2 px-4 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm mb-6"
            >
                <Plus className="w-4 h-4" /> Add {tab === "team" ? "Member" : tab === "values" ? "Value" : "Milestone"}
            </button>

            {/* Editor Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-lg glass rounded-2xl p-6 card-glow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-display font-bold text-white">{editing.data.id ? "Edit" : "Add"} {editing.type === "team" ? "Team Member" : editing.type === "value" ? "Value" : "Milestone"}</h2>
                            <button onClick={() => setEditing(null)} className="p-2 text-gray-400 hover:text-white rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            {editing.type === "team" && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                                            <input value={(editing.data as Partial<TeamMember>).name || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, name: e.target.value, initials: e.target.value.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="Full name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Initials</label>
                                            <input value={(editing.data as Partial<TeamMember>).initials || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, initials: e.target.value } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="AM" maxLength={2} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Role</label>
                                        <input value={(editing.data as Partial<TeamMember>).role || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, role: e.target.value } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="Job title" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Bio</label>
                                        <textarea value={(editing.data as Partial<TeamMember>).bio || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, bio: e.target.value } })} rows={3} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 resize-none" placeholder="Short bio..." />
                                    </div>
                                </>
                            )}
                            {editing.type === "value" && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
                                        <input value={(editing.data as Partial<Value>).title || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, title: e.target.value } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="Value name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
                                        <textarea value={(editing.data as Partial<Value>).description || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, description: e.target.value } })} rows={2} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 resize-none" placeholder="Description..." />
                                    </div>
                                </>
                            )}
                            {editing.type === "milestone" && (
                                <>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Year</label>
                                            <input value={(editing.data as Partial<Milestone>).year || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, year: e.target.value } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="2026" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
                                            <input value={(editing.data as Partial<Milestone>).title || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, title: e.target.value } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="Milestone title" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
                                        <textarea value={(editing.data as Partial<Milestone>).description || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, description: e.target.value } })} rows={2} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 resize-none" placeholder="Description..." />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5">
                            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm disabled:opacity-50">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Lists */}
            {loading ? (
                <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 glass rounded-lg animate-pulse" />)}</div>
            ) : (
                <>
                    {tab === "team" && (
                        <div className="grid sm:grid-cols-2 gap-3">
                            {team.map(m => (
                                <div key={m.id} className="glass rounded-xl p-4 flex items-center gap-4 card-glow">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/20 flex items-center justify-center text-gold-400 font-display font-bold text-sm">{m.initials}</div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-white">{m.name}</h3>
                                        <p className="text-xs text-gray-500">{m.role}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => setEditing({ type: "team", data: m })} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete("team", m.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                            {team.length === 0 && <div className="col-span-2 text-center py-12 glass rounded-xl text-gray-500">No team members yet</div>}
                        </div>
                    )}
                    {tab === "values" && (
                        <div className="grid sm:grid-cols-2 gap-3">
                            {values.map(v => (
                                <div key={v.id} className="glass rounded-xl p-4 flex items-center gap-4 card-glow">
                                    <div className="w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center"><Target className="w-5 h-5 text-gold-400" /></div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-white">{v.title}</h3>
                                        <p className="text-xs text-gray-500 truncate">{v.description}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => setEditing({ type: "value", data: v })} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete("value", v.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                            {values.length === 0 && <div className="col-span-2 text-center py-12 glass rounded-xl text-gray-500">No values yet</div>}
                        </div>
                    )}
                    {tab === "milestones" && (
                        <div className="space-y-3">
                            {milestones.map(m => (
                                <div key={m.id} className="glass rounded-xl p-4 flex items-center gap-4 card-glow">
                                    <div className="w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center"><Calendar className="w-5 h-5 text-gold-400" /></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs px-2 py-0.5 rounded bg-gold-400/10 text-gold-400 font-medium">{m.year}</span>
                                            <h3 className="text-sm font-semibold text-white">{m.title}</h3>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">{m.description}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => setEditing({ type: "milestone", data: m })} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete("milestone", m.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                            {milestones.length === 0 && <div className="text-center py-12 glass rounded-xl text-gray-500">No milestones yet</div>}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
