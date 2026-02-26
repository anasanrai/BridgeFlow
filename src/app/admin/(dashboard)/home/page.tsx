"use client";

import { useEffect, useState, useCallback } from "react";
import { Home, Save, Loader2, Plus, X, Star, Play, Gift, Zap, Footprints } from "lucide-react";

interface HomeContent {
    id: string;
    hero: { badge: string; title: string; titleLine2: string; highlight: string; description: string; };
    stats: { end: number; suffix: string; label: string; }[];
    testimonials: { quote: string; author: string; role: string; rating: number; }[];
    cta: { title: string; highlight: string; description: string; };
    demos: { title: string; description: string; tags: string[]; }[];
    offers: { title: string; description: string; badge: string; href: string; highlight: boolean; }[];
    services_overview: { icon: string; title: string; description: string; href: string; }[];
    process_steps: { step: string; title: string; description: string; }[];
}

const blankTestimonial = { quote: "", author: "", role: "", rating: 5 };
const blankStat = { end: 0, suffix: "+", label: "" };
const blankDemo = { title: "", description: "", tags: [] as string[] };
const blankOffer = { title: "", description: "", badge: "", href: "/contact", highlight: false };
const blankService = { icon: "Zap", title: "", description: "", href: "" };
const blankStep = { step: "01", title: "", description: "" };

const INPUT = "w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50";
const INPUT_GOLD = "w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-gold-400 text-sm focus:outline-none focus:border-gold-400/50";
const TEXTAREA = `${INPUT} resize-none`;
const CARD = "glass rounded-xl p-6 card-glow";
const SECTION_TITLE = "text-sm font-bold text-white uppercase tracking-wider";

export default function HomeAdmin() {
    const [content, setContent] = useState<HomeContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");

    const load = useCallback(async () => {
        const res = await fetch("/api/admin/content/home_content");
        const { data } = await res.json();
        setContent(data?.[0] || null);
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    const handleSave = async () => {
        if (!content) return;
        setSaving(true);
        try {
            const method = content.id ? "PUT" : "POST";
            const res = await fetch("/api/admin/content/home_content", {
                method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(content),
            });
            if (res.ok) showToast("Saved!");
            else showToast("Error saving");
        } catch { showToast("Error"); } finally { setSaving(false); }
    };

    if (loading) return <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 glass rounded-lg animate-pulse" />)}</div>;
    if (!content) return (
        <div className="text-center py-16 glass rounded-xl">
            <Home className="w-10 h-10 mx-auto mb-3 text-gray-600" />
            <p className="text-gray-400 mb-4">No home content configured</p>
            <button onClick={async () => {
                await fetch("/api/admin/content/home_content", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        hero: { badge: "AI-Powered Automation Agency", title: "Automate your", titleLine2: "Business with", highlight: "AI", description: "" },
                        stats: [], testimonials: [], cta: { title: "Ready to", highlight: "Automate?", description: "" },
                        demos: [], offers: [], services_overview: [], process_steps: [],
                    }),
                });
                load();
            }} className="px-4 py-2 gold-gradient text-navy-950 font-semibold rounded-lg text-sm">
                Initialize Home Content
            </button>
        </div>
    );

    const hero = content.hero || { badge: "", title: "", titleLine2: "", highlight: "", description: "" };
    const cta = content.cta || { title: "", highlight: "", description: "" };

    return (
        <div>
            {toast && <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium animate-in">{toast}</div>}

            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-2xl font-display font-bold text-white flex items-center gap-2"><Home className="w-6 h-6 text-gold-400" />Home Page</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all homepage sections</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm disabled:opacity-50">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {saving ? "Saving..." : "Save All"}
                </button>
            </div>

            <div className="space-y-6">
                {/* ─── Hero ─── */}
                <div className={CARD}>
                    <h2 className={SECTION_TITLE + " mb-4"}>Hero Section</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Badge Text</label>
                            <input value={hero.badge} onChange={e => setContent({ ...content, hero: { ...hero, badge: e.target.value } })} className={INPUT} /></div>
                        <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Highlight Word</label>
                            <input value={hero.highlight} onChange={e => setContent({ ...content, hero: { ...hero, highlight: e.target.value } })} className={INPUT_GOLD} /></div>
                        <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Title Line 1</label>
                            <input value={hero.title} onChange={e => setContent({ ...content, hero: { ...hero, title: e.target.value } })} className={INPUT} /></div>
                        <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Title Line 2</label>
                            <input value={hero.titleLine2} onChange={e => setContent({ ...content, hero: { ...hero, titleLine2: e.target.value } })} className={INPUT} /></div>
                    </div>
                    <div className="mt-4"><label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                        <textarea value={hero.description} onChange={e => setContent({ ...content, hero: { ...hero, description: e.target.value } })} rows={2} className={TEXTAREA} /></div>
                </div>

                {/* ─── Stats ─── */}
                <div className={CARD}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={SECTION_TITLE}>Stats</h2>
                        <button onClick={() => setContent({ ...content, stats: [...(content.stats || []), { ...blankStat }] })} className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"><Plus className="w-3 h-3" />Add</button>
                    </div>
                    <div className="space-y-2">
                        {(content.stats || []).map((s, i) => (
                            <div key={i} className="flex gap-3 items-center">
                                <input type="number" value={s.end} onChange={e => { const stats = [...(content.stats || [])]; stats[i] = { ...s, end: parseInt(e.target.value) || 0 }; setContent({ ...content, stats }); }} className="w-20 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" />
                                <input value={s.suffix} onChange={e => { const stats = [...(content.stats || [])]; stats[i] = { ...s, suffix: e.target.value }; setContent({ ...content, stats }); }} className="w-16 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" placeholder="+" />
                                <input value={s.label} onChange={e => { const stats = [...(content.stats || [])]; stats[i] = { ...s, label: e.target.value }; setContent({ ...content, stats }); }} className="flex-1 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" placeholder="Label" />
                                <button onClick={() => setContent({ ...content, stats: (content.stats || []).filter((_, idx) => idx !== i) })} className="p-2 text-gray-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Live Demos ─── */}
                <div id="demos" className={CARD}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={SECTION_TITLE + " flex items-center gap-2"}><Play className="w-4 h-4 text-gold-400" />Live Demos</h2>
                        <button onClick={() => setContent({ ...content, demos: [...(content.demos || []), { ...blankDemo }] })} className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"><Plus className="w-3 h-3" />Add Demo</button>
                    </div>
                    <div className="space-y-4">
                        {(content.demos || []).map((d, i) => (
                            <div key={i} className="p-4 bg-navy-900/50 rounded-lg border border-white/5">
                                <div className="flex justify-between mb-3">
                                    <span className="text-xs text-gray-500 font-medium">Demo #{i + 1}</span>
                                    <button onClick={() => setContent({ ...content, demos: (content.demos || []).filter((_, idx) => idx !== i) })} className="p-1 text-gray-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                                        <input value={d.title} onChange={e => { const demos = [...(content.demos || [])]; demos[i] = { ...d, title: e.target.value }; setContent({ ...content, demos }); }} className={INPUT} placeholder="e.g. Lead-to-Close Pipeline" /></div>
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Tags (comma-separated)</label>
                                        <input value={(d.tags || []).join(", ")} onChange={e => { const demos = [...(content.demos || [])]; demos[i] = { ...d, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }; setContent({ ...content, demos }); }} className={INPUT} placeholder="n8n, GoHighLevel, AI" /></div>
                                </div>
                                <div><label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                                    <textarea value={d.description} onChange={e => { const demos = [...(content.demos || [])]; demos[i] = { ...d, description: e.target.value }; setContent({ ...content, demos }); }} rows={2} className={TEXTAREA} placeholder="What does this demo show?" /></div>
                            </div>
                        ))}
                        {!(content.demos || []).length && <p className="text-gray-500 text-sm text-center py-4">No demos yet — add one above</p>}
                    </div>
                </div>

                {/* ─── Offers ─── */}
                <div className={CARD}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={SECTION_TITLE + " flex items-center gap-2"}><Gift className="w-4 h-4 text-gold-400" />Offers / Packages</h2>
                        <button onClick={() => setContent({ ...content, offers: [...(content.offers || []), { ...blankOffer }] })} className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"><Plus className="w-3 h-3" />Add Offer</button>
                    </div>
                    <div className="space-y-4">
                        {(content.offers || []).map((o, i) => (
                            <div key={i} className="p-4 bg-navy-900/50 rounded-lg border border-white/5">
                                <div className="flex justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 font-medium">Offer #{i + 1}</span>
                                        <label className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer">
                                            <input type="checkbox" checked={o.highlight} onChange={e => { const offers = [...(content.offers || [])]; offers[i] = { ...o, highlight: e.target.checked }; setContent({ ...content, offers }); }} className="rounded border-gold-400/30 text-gold-400 focus:ring-gold-400/30" />
                                            Featured
                                        </label>
                                    </div>
                                    <button onClick={() => setContent({ ...content, offers: (content.offers || []).filter((_, idx) => idx !== i) })} className="p-1 text-gray-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                                </div>
                                <div className="grid sm:grid-cols-3 gap-3 mb-3">
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                                        <input value={o.title} onChange={e => { const offers = [...(content.offers || [])]; offers[i] = { ...o, title: e.target.value }; setContent({ ...content, offers }); }} className={INPUT} placeholder="Free Automation Audit" /></div>
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Badge / Price</label>
                                        <input value={o.badge} onChange={e => { const offers = [...(content.offers || [])]; offers[i] = { ...o, badge: e.target.value }; setContent({ ...content, offers }); }} className={INPUT_GOLD} placeholder="Free / $2,499" /></div>
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Link (href)</label>
                                        <input value={o.href} onChange={e => { const offers = [...(content.offers || [])]; offers[i] = { ...o, href: e.target.value }; setContent({ ...content, offers }); }} className={INPUT} placeholder="/contact" /></div>
                                </div>
                                <div><label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                                    <textarea value={o.description} onChange={e => { const offers = [...(content.offers || [])]; offers[i] = { ...o, description: e.target.value }; setContent({ ...content, offers }); }} rows={2} className={TEXTAREA} /></div>
                            </div>
                        ))}
                        {!(content.offers || []).length && <p className="text-gray-500 text-sm text-center py-4">No offers yet — add one above</p>}
                    </div>
                </div>

                {/* ─── Services Overview ─── */}
                <div className={CARD}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={SECTION_TITLE + " flex items-center gap-2"}><Zap className="w-4 h-4 text-gold-400" />Services Overview</h2>
                        <button onClick={() => setContent({ ...content, services_overview: [...(content.services_overview || []), { ...blankService }] })} className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"><Plus className="w-3 h-3" />Add Service</button>
                    </div>
                    <div className="space-y-4">
                        {(content.services_overview || []).map((s, i) => (
                            <div key={i} className="p-4 bg-navy-900/50 rounded-lg border border-white/5">
                                <div className="flex justify-between mb-3">
                                    <span className="text-xs text-gray-500 font-medium">Service #{i + 1}</span>
                                    <button onClick={() => setContent({ ...content, services_overview: (content.services_overview || []).filter((_, idx) => idx !== i) })} className="p-1 text-gray-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                                </div>
                                <div className="grid sm:grid-cols-3 gap-3 mb-3">
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Icon Name</label>
                                        <input value={s.icon} onChange={e => { const sv = [...(content.services_overview || [])]; sv[i] = { ...s, icon: e.target.value }; setContent({ ...content, services_overview: sv }); }} className={INPUT} placeholder="Zap, Bot, BarChart3, Boxes" /></div>
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                                        <input value={s.title} onChange={e => { const sv = [...(content.services_overview || [])]; sv[i] = { ...s, title: e.target.value }; setContent({ ...content, services_overview: sv }); }} className={INPUT} placeholder="n8n Automation" /></div>
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Link (href)</label>
                                        <input value={s.href} onChange={e => { const sv = [...(content.services_overview || [])]; sv[i] = { ...s, href: e.target.value }; setContent({ ...content, services_overview: sv }); }} className={INPUT} placeholder="/services#n8n" /></div>
                                </div>
                                <div><label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                                    <textarea value={s.description} onChange={e => { const sv = [...(content.services_overview || [])]; sv[i] = { ...s, description: e.target.value }; setContent({ ...content, services_overview: sv }); }} rows={2} className={TEXTAREA} /></div>
                            </div>
                        ))}
                        {!(content.services_overview || []).length && <p className="text-gray-500 text-sm text-center py-4">No services yet — add one above</p>}
                    </div>
                </div>

                {/* ─── Process Steps ─── */}
                <div className={CARD}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={SECTION_TITLE + " flex items-center gap-2"}><Footprints className="w-4 h-4 text-gold-400" />Process Steps</h2>
                        <button onClick={() => {
                            const steps = content.process_steps || [];
                            const nextNum = String(steps.length + 1).padStart(2, "0");
                            setContent({ ...content, process_steps: [...steps, { ...blankStep, step: nextNum }] });
                        }} className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"><Plus className="w-3 h-3" />Add Step</button>
                    </div>
                    <div className="space-y-3">
                        {(content.process_steps || []).map((p, i) => (
                            <div key={i} className="flex gap-3 items-start p-4 bg-navy-900/50 rounded-lg border border-white/5">
                                <div className="w-12 shrink-0"><label className="block text-xs font-medium text-gray-400 mb-1">Step</label>
                                    <input value={p.step} onChange={e => { const ps = [...(content.process_steps || [])]; ps[i] = { ...p, step: e.target.value }; setContent({ ...content, process_steps: ps }); }} className="w-full px-2 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-gold-400 text-sm text-center focus:outline-none focus:border-gold-400/50" /></div>
                                <div className="flex-1 space-y-2">
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                                        <input value={p.title} onChange={e => { const ps = [...(content.process_steps || [])]; ps[i] = { ...p, title: e.target.value }; setContent({ ...content, process_steps: ps }); }} className={INPUT} placeholder="Consult" /></div>
                                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                                        <textarea value={p.description} onChange={e => { const ps = [...(content.process_steps || [])]; ps[i] = { ...p, description: e.target.value }; setContent({ ...content, process_steps: ps }); }} rows={2} className={TEXTAREA} /></div>
                                </div>
                                <button onClick={() => setContent({ ...content, process_steps: (content.process_steps || []).filter((_, idx) => idx !== i) })} className="p-2 text-gray-500 hover:text-red-400 mt-5"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                        {!(content.process_steps || []).length && <p className="text-gray-500 text-sm text-center py-4">No steps yet — add one above</p>}
                    </div>
                </div>

                {/* ─── Testimonials ─── */}
                <div className={CARD}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={SECTION_TITLE}>Testimonials</h2>
                        <button onClick={() => setContent({ ...content, testimonials: [...(content.testimonials || []), { ...blankTestimonial }] })} className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"><Plus className="w-3 h-3" />Add</button>
                    </div>
                    <div className="space-y-4">
                        {(content.testimonials || []).map((t, i) => (
                            <div key={i} className="p-4 bg-navy-900/50 rounded-lg border border-white/5">
                                <div className="flex justify-between mb-3">
                                    <div className="flex gap-1">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`w-4 h-4 cursor-pointer ${s < t.rating ? "text-gold-400 fill-gold-400" : "text-gray-600"}`} onClick={() => { const testimonials = [...(content.testimonials || [])]; testimonials[i] = { ...t, rating: s + 1 }; setContent({ ...content, testimonials }); }} />)}</div>
                                    <button onClick={() => setContent({ ...content, testimonials: (content.testimonials || []).filter((_, idx) => idx !== i) })} className="p-1 text-gray-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                                </div>
                                <textarea value={t.quote} onChange={e => { const testimonials = [...(content.testimonials || [])]; testimonials[i] = { ...t, quote: e.target.value }; setContent({ ...content, testimonials }); }} rows={2} className={TEXTAREA + " mb-2"} placeholder="Quote..." />
                                <div className="grid grid-cols-2 gap-2">
                                    <input value={t.author} onChange={e => { const testimonials = [...(content.testimonials || [])]; testimonials[i] = { ...t, author: e.target.value }; setContent({ ...content, testimonials }); }} className="px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" placeholder="Author name" />
                                    <input value={t.role} onChange={e => { const testimonials = [...(content.testimonials || [])]; testimonials[i] = { ...t, role: e.target.value }; setContent({ ...content, testimonials }); }} className="px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" placeholder="Role, Company" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── CTA ─── */}
                <div className={CARD}>
                    <h2 className={SECTION_TITLE + " mb-4"}>CTA Section</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Title</label>
                            <input value={cta.title} onChange={e => setContent({ ...content, cta: { ...cta, title: e.target.value } })} className={INPUT} /></div>
                        <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Highlight</label>
                            <input value={cta.highlight} onChange={e => setContent({ ...content, cta: { ...cta, highlight: e.target.value } })} className={INPUT_GOLD} /></div>
                    </div>
                    <div className="mt-4"><label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                        <textarea value={cta.description} onChange={e => setContent({ ...content, cta: { ...cta, description: e.target.value } })} rows={2} className={TEXTAREA} /></div>
                </div>
            </div>
        </div>
    );
}
