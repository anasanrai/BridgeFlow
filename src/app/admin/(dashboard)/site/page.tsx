"use client";

import { useEffect, useState, useCallback } from "react";
import { Globe, Save, Loader2, Plus, X } from "lucide-react";

interface SiteConfig {
    id: string; name: string; tagline: string; description: string; url: string;
    email: string; location: string; copyright: string; logo: string;
    nav_links: { href: string; label: string }[];
    footer_links: Record<string, { label: string; href: string }[]>;
    social_links: { platform: string; href: string }[];
}

export default function SiteConfigAdmin() {
    const [config, setConfig] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");

    const load = useCallback(async () => {
        const res = await fetch("/api/admin/content/site_config");
        const { data } = await res.json();
        setConfig(data?.[0] || null);
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    const handleSave = async () => {
        if (!config) return;
        setSaving(true);
        try {
            const method = config.id ? "PUT" : "POST";
            const res = await fetch("/api/admin/content/site_config", {
                method, headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            if (res.ok) showToast("Saved!");
        } catch { showToast("Error"); } finally { setSaving(false); }
    };

    const addNavLink = () => {
        if (!config) return;
        setConfig({ ...config, nav_links: [...(config.nav_links || []), { href: "/", label: "" }] });
    };
    const removeNavLink = (i: number) => {
        if (!config) return;
        setConfig({ ...config, nav_links: (config.nav_links || []).filter((_, idx) => idx !== i) });
    };
    const updateNavLink = (i: number, field: string, value: string) => {
        if (!config) return;
        const links = [...(config.nav_links || [])];
        links[i] = { ...links[i], [field]: value };
        setConfig({ ...config, nav_links: links });
    };

    const addSocial = () => {
        if (!config) return;
        setConfig({ ...config, social_links: [...(config.social_links || []), { platform: "", href: "#" }] });
    };
    const removeSocial = (i: number) => {
        if (!config) return;
        setConfig({ ...config, social_links: (config.social_links || []).filter((_, idx) => idx !== i) });
    };
    const updateSocial = (i: number, field: string, value: string) => {
        if (!config) return;
        const links = [...(config.social_links || [])];
        links[i] = { ...links[i], [field]: value };
        setConfig({ ...config, social_links: links });
    };

    if (loading) return <div className="space-y-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-16 glass rounded-lg animate-pulse" />)}</div>;
    if (!config) return (
        <div className="text-center py-16 glass rounded-xl">
            <Globe className="w-10 h-10 mx-auto mb-3 text-gray-600" />
            <p className="text-gray-400 mb-4">No site configuration found</p>
            <button onClick={async () => {
                await fetch("/api/admin/content/site_config", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: "BridgeFlow", tagline: "AI-Powered Automation Agency", email: "hello@bridgeflow.agency", url: "https://www.bridgeflow.agency", location: "Remote-first, Global", copyright: "© 2026 BridgeFlow. All rights reserved.", nav_links: [], social_links: [] }),
                });
                load();
            }} className="px-4 py-2 gold-gradient text-navy-950 font-semibold rounded-lg text-sm">
                Initialize Site Config
            </button>
        </div>
    );

    return (
        <div>
            {toast && <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium">{toast}</div>}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2"><Globe className="w-6 h-6 text-gold-400" />Site Configuration</h1>
                    <p className="text-sm text-gray-500 mt-1">Global settings for your website</p>
                </div>
                <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm disabled:opacity-50">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="space-y-6">
                {/* General */}
                <div className="glass rounded-xl p-6 card-glow">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">General</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { label: "Site Name", key: "name" }, { label: "Tagline", key: "tagline" },
                            { label: "Email", key: "email" }, { label: "URL", key: "url" },
                            { label: "Location", key: "location" }, { label: "Copyright", key: "copyright" },
                        ].map(field => (
                            <div key={field.key}>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5">{field.label}</label>
                                <input
                                    value={(config as unknown as Record<string, string>)[field.key] || ""}
                                    onChange={e => setConfig({ ...config, [field.key]: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                        <textarea value={config.description || ""} onChange={e => setConfig({ ...config, description: e.target.value })} rows={2}
                            className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 resize-none" />
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="glass rounded-xl p-6 card-glow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Navigation Links</h2>
                        <button onClick={addNavLink} className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"><Plus className="w-3 h-3" />Add</button>
                    </div>
                    <div className="space-y-2">
                        {(config.nav_links || []).map((link, i) => (
                            <div key={i} className="flex gap-3 items-center">
                                <input value={link.label} onChange={e => updateNavLink(i, "label", e.target.value)} className="flex-1 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" placeholder="Label" />
                                <input value={link.href} onChange={e => updateNavLink(i, "href", e.target.value)} className="flex-1 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-gold-400/50" placeholder="/path" />
                                <button onClick={() => removeNavLink(i)} className="p-2 text-gray-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links */}
                <div className="glass rounded-xl p-6 card-glow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Social Links</h2>
                        <button onClick={addSocial} className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"><Plus className="w-3 h-3" />Add</button>
                    </div>
                    <div className="space-y-2">
                        {(config.social_links || []).map((link, i) => (
                            <div key={i} className="flex gap-3 items-center">
                                <input value={link.platform} onChange={e => updateSocial(i, "platform", e.target.value)} className="w-32 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50" placeholder="Twitter" />
                                <input value={link.href} onChange={e => updateSocial(i, "href", e.target.value)} className="flex-1 px-3 py-2 bg-navy-900/80 border border-white/10 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-gold-400/50" placeholder="https://..." />
                                <button onClick={() => removeSocial(i)} className="p-2 text-gray-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
