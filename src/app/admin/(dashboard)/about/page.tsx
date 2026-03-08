"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Users, Plus, Pencil, Trash2, Save, X, Loader2, Camera, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

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
    const [tab, setTab] = useState<"team" | "values" | "milestones" | "founder">("team");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [founderUploading, setFounderUploading] = useState(false);
    const [founderImageUrl, setFounderImageUrl] = useState("/images/founder-portrait.png");
    const teamImageInputRef = useRef<HTMLInputElement>(null);
    const founderImageInputRef = useRef<HTMLInputElement>(null);

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

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3500); };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        const tableMap = { team: "team_members", value: "company_values", milestone: "milestones" };
        try {
            const method = editing.data.id ? "PUT" : "POST";
            const res = await fetch(`/api/admin/content/${tableMap[editing.type]}`, {
                method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing.data),
            });
            if (res.ok) { showToast("✅ Saved successfully!"); setEditing(null); load(); }
            else showToast("❌ Error saving");
        } catch { showToast("❌ Error saving"); } finally { setSaving(false); }
    };

    const handleDelete = async (type: "team" | "value" | "milestone", id: string) => {
        if (!confirm("Delete this item?")) return;
        const tableMap = { team: "team_members", value: "company_values", milestone: "milestones" };
        await fetch(`/api/admin/content/${tableMap[type]}?id=${id}`, { method: "DELETE" });
        showToast("🗑️ Deleted"); load();
    };

    const handleTeamImageUpload = async (file: File, memberId: string) => {
        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "team");
            const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.url) {
                // Update the team member's avatar_url
                await fetch("/api/admin/content/team_members", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: memberId, avatar_url: data.url }),
                });
                showToast("✅ Profile photo updated!");
                load();
            } else {
                showToast("❌ Upload failed: " + (data.error || "Unknown error"));
            }
        } catch { showToast("❌ Upload failed"); } finally { setUploadingImage(false); }
    };

    const handleFounderImageUpload = async (file: File) => {
        setFounderUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "founder");
            const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.url) {
                // Save to site_config as founder_image
                await fetch("/api/admin/settings", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ founder_image: data.url }),
                });
                setFounderImageUrl(data.url);
                showToast("✅ Founder photo updated! Changes are live.");
            } else {
                showToast("❌ Upload failed: " + (data.error || "Unknown error"));
            }
        } catch { showToast("❌ Upload failed"); } finally { setFounderUploading(false); }
    };

    // Circular image upload component for team members
    const TeamMemberAvatar = ({ member }: { member: TeamMember }) => {
        const fileRef = useRef<HTMLInputElement>(null);
        const [localUploading, setLocalUploading] = useState(false);

        const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setLocalUploading(true);
            await handleTeamImageUpload(file, member.id);
            setLocalUploading(false);
        };

        return (
            <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold-400/30 bg-gradient-to-br from-gold-400/20 to-gold-400/5 flex items-center justify-center">
                    {member.avatar_url ? (
                        <Image src={member.avatar_url} alt={member.name} width={56} height={56} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gold-400 font-display font-bold text-base">{member.initials}</span>
                    )}
                </div>
                <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {localUploading ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                        <Camera className="w-4 h-4 text-white" />
                    )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>
        );
    };

    return (
        <div>
            {toast && (
                <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium shadow-2xl backdrop-blur-md">
                    {toast}
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                        <Users className="w-6 h-6 text-gold-400" />About & Team
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">{team.length} members · {values.length} values · {milestones.length} milestones</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 p-1 glass rounded-lg w-fit flex-wrap">
                {[
                    { key: "team" as const, label: "Team Members" },
                    { key: "founder" as const, label: "Founder Photo" },
                    { key: "values" as const, label: "Values" },
                    { key: "milestones" as const, label: "Timeline" }
                ].map(t => (
                    <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === t.key ? "bg-gold-400/10 text-gold-400" : "text-gray-400 hover:text-white"}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Founder Photo Tab */}
            {tab === "founder" && (
                <div className="glass rounded-2xl p-8 card-glow max-w-lg">
                    <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-gold-400" /> Founder Portrait
                    </h2>
                    <p className="text-sm text-gray-400 mb-6">Upload a portrait photo for the founder section on the About page. For best results, use a square image with a transparent or clean background.</p>

                    <div className="flex flex-col items-center gap-6">
                        {/* Current photo preview */}
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gold-400/30 bg-gradient-to-br from-gold-400/10 to-navy-900 shadow-2xl">
                                <Image
                                    src={founderImageUrl}
                                    alt="Founder portrait"
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                    onError={() => setFounderImageUrl("/images/founder-portrait.png")}
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-lg">
                                <span className="text-navy-950 text-xs font-bold">CEO</span>
                            </div>
                        </div>

                        {/* Upload button */}
                        <div className="w-full">
                            <input
                                ref={founderImageInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) await handleFounderImageUpload(file);
                                }}
                            />
                            <button
                                onClick={() => founderImageInputRef.current?.click()}
                                disabled={founderUploading}
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-gold-400/30 hover:border-gold-400/60 rounded-xl text-gold-400 hover:bg-gold-400/5 transition-all disabled:opacity-50"
                            >
                                {founderUploading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</>
                                ) : (
                                    <><Upload className="w-5 h-5" /> Click to upload new founder photo</>
                                )}
                            </button>
                            <p className="text-xs text-gray-600 text-center mt-2">PNG, JPG, WebP · Max 5MB · Portrait format recommended</p>
                        </div>

                        <div className="w-full p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                            <p className="text-xs text-blue-400 leading-relaxed">
                                <strong>Tip:</strong> Upload a PNG with transparent background for the best look. The image will be displayed in a rounded square frame on the About page. Recommended size: 400×500px or larger.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Button (for team/values/milestones) */}
            {tab !== "founder" && (
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
            )}

            {/* Editor Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-lg glass rounded-2xl p-6 card-glow max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-display font-bold text-white">
                                {editing.data.id ? "Edit" : "Add"} {editing.type === "team" ? "Team Member" : editing.type === "value" ? "Value" : "Milestone"}
                            </h2>
                            <button onClick={() => setEditing(null)} className="p-2 text-gray-400 hover:text-white rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            {editing.type === "team" && (
                                <>
                                    {/* Profile photo upload in modal */}
                                    {editing.data.id && (
                                        <div className="flex items-center gap-4 p-4 bg-navy-900/50 rounded-xl border border-white/5">
                                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400/30 bg-gradient-to-br from-gold-400/20 to-gold-400/5 flex items-center justify-center flex-shrink-0">
                                                {(editing.data as Partial<TeamMember>).avatar_url ? (
                                                    <Image src={(editing.data as Partial<TeamMember>).avatar_url!} alt="Avatar" width={64} height={64} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-gold-400 font-bold text-lg">{(editing.data as Partial<TeamMember>).initials}</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-white mb-1">Profile Photo</p>
                                                <p className="text-xs text-gray-500 mb-2">Click to upload a circular profile photo</p>
                                                <label className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 cursor-pointer transition-all w-fit">
                                                    <ImageIcon className="w-3.5 h-3.5" />
                                                    {uploadingImage ? "Uploading..." : "Upload Photo"}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file && editing.data.id) {
                                                                await handleTeamImageUpload(file, editing.data.id);
                                                                // Update local editing state with new avatar_url
                                                                const updated = team.find(m => m.id === editing.data.id);
                                                                if (updated) setEditing({ ...editing, data: { ...editing.data, avatar_url: updated.avatar_url } });
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                                            <input value={(editing.data as Partial<TeamMember>).name || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, name: e.target.value, initials: e.target.value.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2) } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="Anasan Rai" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Initials</label>
                                            <input value={(editing.data as Partial<TeamMember>).initials || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, initials: e.target.value } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="AR" maxLength={2} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Role / Title</label>
                                        <input value={(editing.data as Partial<TeamMember>).role || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, role: e.target.value } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="AI Automation Engineer" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Bio</label>
                                        <textarea value={(editing.data as Partial<TeamMember>).bio || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, bio: e.target.value } })} rows={3} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 resize-none" placeholder="Short bio..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Avatar URL (optional)</label>
                                        <input value={(editing.data as Partial<TeamMember>).avatar_url || ""} onChange={e => setEditing({ ...editing, data: { ...editing.data, avatar_url: e.target.value } })} className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50" placeholder="https://..." />
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
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Lists */}
            {tab !== "founder" && (
                loading ? (
                    <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 glass rounded-lg animate-pulse" />)}</div>
                ) : (
                    <>
                        {tab === "team" && (
                            <div className="space-y-3">
                                <p className="text-xs text-gray-500 mb-4">Click on a team member&apos;s photo to upload a new circular profile image directly.</p>
                                {team.map(m => (
                                    <div key={m.id} className="glass rounded-xl p-4 flex items-center gap-4 card-glow">
                                        {/* Clickable circular avatar with upload overlay */}
                                        <TeamMemberAvatar member={m} />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-white">{m.name}</h3>
                                            <p className="text-xs text-gray-500">{m.role}</p>
                                            {m.avatar_url && (
                                                <p className="text-[10px] text-emerald-400 mt-0.5">✓ Custom photo uploaded</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1 flex-shrink-0">
                                            <button onClick={() => setEditing({ type: "team", data: m })} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg" title="Edit">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete("team", m.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {team.length === 0 && (
                                    <div className="text-center py-12 text-gray-500 text-sm">No team members yet. Click &quot;Add Member&quot; to get started.</div>
                                )}
                            </div>
                        )}
                        {tab === "values" && (
                            <div className="grid sm:grid-cols-2 gap-3">
                                {values.map(v => (
                                    <div key={v.id} className="glass rounded-xl p-4 card-glow">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-sm font-semibold text-white">{v.title}</h3>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{v.description}</p>
                                            </div>
                                            <div className="flex gap-1 ml-2 flex-shrink-0">
                                                <button onClick={() => setEditing({ type: "value", data: v })} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><Pencil className="w-3.5 h-3.5" /></button>
                                                <button onClick={() => handleDelete("value", v.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {tab === "milestones" && (
                            <div className="space-y-3">
                                {milestones.map(m => (
                                    <div key={m.id} className="glass rounded-xl p-4 flex items-center gap-4 card-glow">
                                        <div className="w-12 h-12 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 font-display font-bold text-xs flex-shrink-0">{m.year}</div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-white">{m.title}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-1">{m.description}</p>
                                        </div>
                                        <div className="flex gap-1 flex-shrink-0">
                                            <button onClick={() => setEditing({ type: "milestone", data: m })} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete("milestone", m.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )
            )}
        </div>
    );
}
