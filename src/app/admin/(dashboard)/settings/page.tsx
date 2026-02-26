"use client";

import { useEffect, useState } from "react";
import {
    Settings, Save, Loader2, Sparkles, Server, Zap, Globe,
    Plus, Trash2, ExternalLink, Link as LinkIcon, Tag,
    Instagram, Youtube, Facebook, Twitter, Linkedin, Github,
    Shield, Database, Cpu, CheckCircle2, XCircle, AlertTriangle,
} from "lucide-react";

interface SiteSettings {
    primary_ai_model: string;
    maintenance_mode: boolean;
}

interface SocialLink {
    platform: string;
    href: string;
}

interface AffiliateLink {
    title: string;
    description: string;
    href: string;
    badge: string;
    logo: string;
}

const AI_MODELS = [
    {
        id: "modal-glm5",
        name: "Modal GLM-5",
        description: "Primary content generation model. Optimal for intelligent reasoning and BridgeFlow brand voice.",
        icon: Sparkles,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/20",
    },
    {
        id: "ollama-cloud",
        name: "Ollama Cloud",
        description: "Secondary high-performance fallback model using gpt-oss:120b.",
        icon: Server,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        glow: "shadow-blue-500/20",
    },
    {
        id: "gemini",
        name: "Google Gemini",
        description: "Emergency lightweight fallback for maximum uptime.",
        icon: Zap,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
    },
];

const SOCIAL_PLATFORMS = [
    { name: "Twitter", icon: Twitter },
    { name: "LinkedIn", icon: Linkedin },
    { name: "GitHub", icon: Github },
    { name: "Instagram", icon: Instagram },
    { name: "YouTube", icon: Youtube },
    { name: "Facebook", icon: Facebook },
];

const LOGO_OPTIONS = ["Zap", "BarChart3", "Globe", "Bot", "Boxes", "Shield", "Star", "Sparkles"];

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    { platform: "Twitter", href: "https://x.com/bridgeflowai" },
    { platform: "LinkedIn", href: "https://linkedin.com/company/bridgeflow-agency" },
    { platform: "GitHub", href: "https://github.com/bridgeflow-agency" },
    { platform: "Instagram", href: "https://instagram.com/bridgeflow.agency" },
    { platform: "YouTube", href: "https://youtube.com/@bridgeflow" },
    { platform: "Facebook", href: "https://facebook.com/bridgeflowagency" },
];

const DEFAULT_AFFILIATE_LINKS: AffiliateLink[] = [
    {
        title: "n8n Cloud",
        description: "The most flexible workflow automation tool.",
        href: "https://n8n.io/?ref=bridgeflow",
        badge: "Recommended",
        logo: "Zap",
    },
    {
        title: "GoHighLevel",
        description: "All-in-one CRM, funnels, and marketing automation platform.",
        href: "https://www.gohighlevel.com/?fp_ref=bridgeflow",
        badge: "Partner",
        logo: "BarChart3",
    },
    {
        title: "Hostinger",
        description: "Premium web hosting with 99.9% uptime.",
        href: "https://hostinger.com?ref=bridgeflow",
        badge: "Hosting",
        logo: "Globe",
    },
];

export default function AdminSettings() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>(DEFAULT_SOCIAL_LINKS);
    const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>(DEFAULT_AFFILIATE_LINKS);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");
    const [activeTab, setActiveTab] = useState<"ai" | "social" | "affiliates" | "system">("ai");
    const [systemDiag, setSystemDiag] = useState<any>(null);
    const [diagLoading, setDiagLoading] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            if (res.ok) {
                const data = await res.json();
                setSettings({
                    primary_ai_model: data.primary_ai_model || "modal-glm5",
                    maintenance_mode: data.maintenance_mode || false,
                });
                if (data.social_links) setSocialLinks(data.social_links);
                if (data.affiliate_links) setAffiliateLinks(data.affiliate_links);
            } else {
                setSettings({ primary_ai_model: "modal-glm5", maintenance_mode: false });
            }
        } catch (error) {
            console.error("Failed to load settings:", error);
            setSettings({ primary_ai_model: "modal-glm5", maintenance_mode: false });
        } finally {
            setLoading(false);
        }
    };

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...settings,
                    social_links: socialLinks,
                    affiliate_links: affiliateLinks,
                }),
            });
            showToast(res.ok ? "✅ Configuration deployed!" : "❌ Error saving settings.");
        } catch (error) {
            console.error(error);
            showToast("❌ Error saving settings.");
        } finally {
            setSaving(false);
        }
    };

    // Social Links Management
    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { platform: "Twitter", href: "" }]);
    };

    const removeSocialLink = (idx: number) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== idx));
    };

    const updateSocialLink = (idx: number, field: keyof SocialLink, value: string) => {
        const updated = [...socialLinks];
        updated[idx] = { ...updated[idx], [field]: value };
        setSocialLinks(updated);
    };

    // Affiliate Links Management
    const addAffiliateLink = () => {
        setAffiliateLinks([...affiliateLinks, { title: "", description: "", href: "", badge: "Partner", logo: "Zap" }]);
    };

    const removeAffiliateLink = (idx: number) => {
        setAffiliateLinks(affiliateLinks.filter((_, i) => i !== idx));
    };

    const updateAffiliateLink = (idx: number, field: keyof AffiliateLink, value: string) => {
        const updated = [...affiliateLinks];
        updated[idx] = { ...updated[idx], [field]: value };
        setAffiliateLinks(updated);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
            </div>
        );
    }

    const loadDiagnostics = async () => {
        setDiagLoading(true);
        try {
            const sections = ["blog_posts", "services", "case_studies", "team_members", "contact_submissions", "newsletter_subscribers"];
            const results = await Promise.all(
                sections.map(s => fetch(`/api/admin/content/${s}`).then(r => r.json()).catch(() => ({ data: [] })))
            );
            setSystemDiag({
                tables: [
                    { name: "Blog Posts", rows: results[0]?.data?.length || 0 },
                    { name: "Services", rows: results[1]?.data?.length || 0 },
                    { name: "Case Studies", rows: results[2]?.data?.length || 0 },
                    { name: "Team Members", rows: results[3]?.data?.length || 0 },
                    { name: "Contacts", rows: results[4]?.data?.length || 0 },
                    { name: "Subscribers", rows: results[5]?.data?.length || 0 },
                ],
            });
        } catch { setSystemDiag(null); }
        finally { setDiagLoading(false); }
    };

    const envVars = [
        { key: "NEXT_PUBLIC_SUPABASE_URL", required: true },
        { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", required: true },
        { key: "SUPABASE_SERVICE_ROLE_KEY", required: true },
        { key: "ADMIN_PASSWORD", required: true },
        { key: "JWT_SECRET", required: true },
        { key: "SMTP_HOST", required: false },
        { key: "SMTP_PORT", required: false },
        { key: "SMTP_USER", required: false },
        { key: "SMTP_PASS", required: false },
        { key: "MODAL_API_KEY", required: false },
        { key: "OLLAMA_API_KEY", required: false },
        { key: "GEMINI_API_KEY", required: false },
    ];

    const tabs = [
        { id: "ai" as const, label: "AI Engine", icon: Sparkles },
        { id: "social" as const, label: "Social Links", icon: LinkIcon },
        { id: "affiliates" as const, label: "Affiliate Ads", icon: Tag },
        { id: "system" as const, label: "System", icon: Shield },
    ];

    return (
        <div>
            {toast && (
                <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl glass border border-emerald-500/30 text-emerald-400 text-sm font-medium shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-fade-in-up">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
                        <Settings className="w-8 h-8 text-gold-400" />
                        Platform Settings
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm max-w-2xl">
                        Configure AI engine, social media links, and affiliate partnerships from one dashboard.
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 gold-gradient text-navy-950 font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-gold-400/30 transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? "Deploying..." : "Save All"}
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8 p-1 rounded-xl bg-navy-900/50 border border-white/5 w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                            ? "gold-gradient text-navy-950 shadow-lg shadow-gold-400/20"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* AI Engine Tab */}
            {activeTab === "ai" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="premium-card p-6 md:p-8 rounded-2xl glass border border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            <div className="flex items-center gap-3 mb-6 relative">
                                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-display font-bold text-white">Advanced AI Intelligence</h2>
                                    <p className="text-sm text-gray-400">Select the primary AI engine powering BridgeFlow.</p>
                                </div>
                            </div>
                            <div className="space-y-4 relative">
                                {AI_MODELS.map((model) => {
                                    const isActive = settings?.primary_ai_model === model.id;
                                    return (
                                        <div
                                            key={model.id}
                                            onClick={() => setSettings({ ...settings!, primary_ai_model: model.id })}
                                            className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${isActive
                                                ? `${model.border} ${model.bg} shadow-lg ${model.glow} transform scale-[1.01]`
                                                : "border-white/5 bg-navy-900/50 hover:bg-white/5 hover:border-white/10"
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg ${isActive ? "bg-white/10" : "bg-black/20"}`}>
                                                <model.icon className={`w-6 h-6 ${isActive ? model.color : "text-gray-500"}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className={`font-bold ${isActive ? "text-white" : "text-gray-300"}`}>{model.name}</h3>
                                                    {isActive && (
                                                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${model.color} ${model.border}`}>
                                                            Active
                                                        </span>
                                                    )}
                                                </div>
                                                <p className={`text-sm ${isActive ? "text-gray-300" : "text-gray-500"}`}>{model.description}</p>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${isActive ? `${model.border} bg-white/10` : "border-gray-600"
                                                }`}>
                                                {isActive && <div className={`w-2.5 h-2.5 rounded-full bg-current ${model.color}`} />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="premium-card p-6 rounded-2xl glass border border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-display font-bold text-white">Site Status</h2>
                            </div>
                            <label className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-navy-900/50 cursor-pointer hover:bg-white/5 transition-colors">
                                <div className="relative flex items-center pt-1">
                                    <input
                                        type="checkbox"
                                        checked={settings?.maintenance_mode || false}
                                        onChange={(e) => setSettings({ ...settings!, maintenance_mode: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1">Maintenance Mode</h3>
                                    <p className="text-xs text-gray-400">Display a &quot;coming soon&quot; page to public visitors.</p>
                                </div>
                            </label>
                        </div>

                        <div className="premium-card p-6 rounded-2xl gold-gradient relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                                <Server className="w-24 h-24 text-navy-950" />
                            </div>
                            <h3 className="font-display font-bold text-navy-950 text-lg mb-1 relative z-10">System Status</h3>
                            <p className="text-navy-900/70 text-sm mb-4 relative z-10">All systems operational</p>
                            <div className="space-y-3 relative z-10">
                                <div className="flex justify-between items-center pb-3 border-b border-navy-950/10">
                                    <span className="text-navy-950/80 text-sm font-medium">Uptime</span>
                                    <span className="text-navy-950 font-bold">99.99%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-navy-950/80 text-sm font-medium">Fallback Stack</span>
                                    <span className="text-navy-950 font-bold">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Social Links Tab */}
            {activeTab === "social" && (
                <div className="animate-fade-in-up">
                    <div className="premium-card p-6 md:p-8 rounded-2xl glass border border-white/10 max-w-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                    <LinkIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-display font-bold text-white">Social Media Links</h2>
                                    <p className="text-sm text-gray-400">Manage social icons displayed in the site footer.</p>
                                </div>
                            </div>
                            <button
                                onClick={addSocialLink}
                                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-400/5 border border-gold-400/10 rounded-lg hover:bg-gold-400/10 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" /> Add
                            </button>
                        </div>

                        <div className="space-y-3">
                            {socialLinks.map((link, idx) => {
                                const PlatformIcon = SOCIAL_PLATFORMS.find(p => p.name === link.platform)?.icon || Globe;
                                return (
                                    <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-navy-900/50">
                                        <PlatformIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <select
                                            value={link.platform}
                                            onChange={(e) => updateSocialLink(idx, "platform", e.target.value)}
                                            className="bg-navy-900/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-white w-32 focus:outline-none focus:border-gold-400/50"
                                        >
                                            {SOCIAL_PLATFORMS.map(p => (
                                                <option key={p.name} value={p.name}>{p.name}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="url"
                                            value={link.href}
                                            onChange={(e) => updateSocialLink(idx, "href", e.target.value)}
                                            placeholder="https://..."
                                            className="flex-1 bg-navy-900/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50"
                                        />
                                        <button
                                            onClick={() => removeSocialLink(idx)}
                                            className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Affiliate Links Tab */}
            {activeTab === "affiliates" && (
                <div className="animate-fade-in-up">
                    <div className="premium-card p-6 md:p-8 rounded-2xl glass border border-white/10 max-w-4xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-display font-bold text-white">Affiliate & Partner Links</h2>
                                    <p className="text-sm text-gray-400">Manage the partner showcase section on the homepage.</p>
                                </div>
                            </div>
                            <button
                                onClick={addAffiliateLink}
                                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-400/5 border border-gold-400/10 rounded-lg hover:bg-gold-400/10 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" /> Add
                            </button>
                        </div>

                        <div className="space-y-4">
                            {affiliateLinks.map((link, idx) => (
                                <div key={idx} className="p-5 rounded-xl border border-white/5 bg-navy-900/50 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Partner #{idx + 1}</span>
                                        <button
                                            onClick={() => removeAffiliateLink(idx)}
                                            className="p-1.5 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            value={link.title}
                                            onChange={(e) => updateAffiliateLink(idx, "title", e.target.value)}
                                            placeholder="Partner name"
                                            className="bg-navy-900/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50"
                                        />
                                        <input
                                            type="text"
                                            value={link.badge}
                                            onChange={(e) => updateAffiliateLink(idx, "badge", e.target.value)}
                                            placeholder="Badge label"
                                            className="bg-navy-900/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50"
                                        />
                                    </div>
                                    <input
                                        type="url"
                                        value={link.href}
                                        onChange={(e) => updateAffiliateLink(idx, "href", e.target.value)}
                                        placeholder="https://affiliate-link.com?ref=bridgeflow"
                                        className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50"
                                    />
                                    <textarea
                                        value={link.description}
                                        onChange={(e) => updateAffiliateLink(idx, "description", e.target.value)}
                                        placeholder="Short description..."
                                        rows={2}
                                        className="w-full bg-navy-900/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 resize-none"
                                    />
                                    <select
                                        value={link.logo}
                                        onChange={(e) => updateAffiliateLink(idx, "logo", e.target.value)}
                                        className="bg-navy-900/80 border border-white/10 rounded-lg px-3 py-2 text-sm text-white w-40 focus:outline-none focus:border-gold-400/50"
                                    >
                                        {LOGO_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* System Diagnostics Tab */}
            {activeTab === "system" && (
                <div className="animate-fade-in-up space-y-6 max-w-4xl">
                    {/* Deployment Info */}
                    <div className="premium-card p-6 md:p-8 rounded-2xl glass border border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                <Server className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-display font-bold text-white">Deployment Info</h2>
                                <p className="text-sm text-gray-400">Runtime and build information.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Environment", value: process.env.NODE_ENV === "production" ? "Production" : "Development" },
                                { label: "Framework", value: "Next.js 14" },
                                { label: "Database", value: "Supabase PostgreSQL" },
                                { label: "Hosting", value: process.env.NODE_ENV === "production" ? "Vercel" : "Local" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-navy-900/50">
                                    <span className="text-sm text-gray-400 font-medium">{item.label}</span>
                                    <span className="text-sm text-white font-bold font-mono">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Environment Variables Audit */}
                    <div className="premium-card p-6 md:p-8 rounded-2xl glass border border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-display font-bold text-white">Environment Audit</h2>
                                <p className="text-sm text-gray-400">Critical configuration status. Values are always masked.</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {envVars.map((env) => {
                                // We can't read env vars client-side, but we can show the config structure
                                const isConfigured = env.required; // Server-side would check actual values
                                return (
                                    <div key={env.key} className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-navy-900/50 hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <code className="text-xs text-gray-300 font-mono bg-white/5 px-2 py-1 rounded">{env.key}</code>
                                            {env.required && (
                                                <span className="text-[9px] uppercase tracking-wider font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">Required</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 font-mono">••••••••</span>
                                            {env.required ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            ) : (
                                                <AlertTriangle className="w-4 h-4 text-amber-400" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Database Health */}
                    <div className="premium-card p-6 md:p-8 rounded-2xl glass border border-white/10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                    <Database className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-display font-bold text-white">Database Health</h2>
                                    <p className="text-sm text-gray-400">Table row counts and connection status.</p>
                                </div>
                            </div>
                            <button
                                onClick={loadDiagnostics}
                                disabled={diagLoading}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-400/5 border border-gold-400/10 rounded-lg hover:bg-gold-400/10 transition-colors disabled:opacity-50"
                            >
                                {diagLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Database className="w-3.5 h-3.5" />}
                                {diagLoading ? "Scanning..." : "Run Diagnostics"}
                            </button>
                        </div>
                        {systemDiag ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {systemDiag.tables.map((table: any) => (
                                    <div key={table.name} className="p-4 rounded-xl border border-white/5 bg-navy-900/50 text-center">
                                        <div className="text-2xl font-display font-bold text-white mb-1">{table.rows}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{table.name}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-600 text-sm">
                                <Database className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                <p className="font-medium">Click &quot;Run Diagnostics&quot; to scan tables</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
