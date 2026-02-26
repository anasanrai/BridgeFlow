"use client";

import { useEffect, useState, useCallback } from "react";
import { Link2, Save, Loader2, Plus, X, Key, Zap, Copy, Trash2, Globe } from "lucide-react";

interface ApiToken {
    id: string;
    name: string;
    token: string;
    scopes: string[];
    last_used_at: string | null;
}

interface Webhook {
    id: string;
    name: string;
    url: string;
    secret: string;
    events: string[];
    is_active: boolean;
}

export default function IntegrationsAdmin() {
    const [tokens, setTokens] = useState<ApiToken[]>([]);
    const [webhooks, setWebhooks] = useState<Webhook[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");
    const [n8nWebhookUrl, setN8nWebhookUrl] = useState("");
    const [savingN8n, setSavingN8n] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const tokensRes = await fetch("/api/admin/content/api_tokens");
            const tokensData = await tokensRes.json();
            setTokens(tokensData.data || []);

            const webhooksRes = await fetch("/api/admin/content/webhooks");
            const webhooksData = await webhooksRes.json();
            setWebhooks(webhooksData.data || []);
        } catch (error) {
            console.error("Failed to load integration data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const generateToken = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let retVal = "bf_";
        for (let i = 0, n = charset.length; i < 32; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    };

    const addToken = async () => {
        const name = prompt("Token Name (e.g., n8n Integration):");
        if (!name) return;

        const newToken = {
            name,
            token: generateToken(),
            scopes: ["read", "write"]
        };

        try {
            await fetch("/api/admin/content/api_tokens", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newToken),
            });
            showToast("Token generated!");
            load();
        } catch { showToast("Error generating token"); }
    };

    const addWebhook = () => {
        const newWebhook: Webhook = {
            id: "",
            name: "New Webhook",
            url: "https://",
            secret: generateToken().substring(0, 16),
            events: ["*"],
            is_active: true
        };
        setWebhooks([...webhooks, newWebhook]);
    };

    const handleSaveWebhook = async (webhook: Webhook) => {
        setSaving(true);
        try {
            const method = webhook.id ? "PUT" : "POST";
            await fetch("/api/admin/content/webhooks", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(webhook),
            });
            showToast("Webhook saved!");
            load();
        } catch { showToast("Error saving webhook"); } finally { setSaving(false); }
    };

    const handleSaveN8nWebhook = async () => {
        if (!n8nWebhookUrl) { showToast("Please enter a webhook URL"); return; }
        setSavingN8n(true);
        try {
            await fetch("/api/admin/content/webhooks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "n8n Trojan Horse Audit Pipeline",
                    url: n8nWebhookUrl,
                    secret: "",
                    events: ["audit.requested"],
                    is_active: true,
                }),
            });
            showToast("✅ n8n webhook saved!");
            setN8nWebhookUrl("");
            load();
        } catch { showToast("❌ Error saving webhook"); }
        finally { setSavingN8n(false); }
    };

    const deleteItem = async (section: string, id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/admin/content/${section}?id=${id}`, { method: "DELETE" });
            showToast("Item deleted");
            load();
        } catch { showToast("Error deleting item"); }
    };

    if (loading) return <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 glass rounded-lg animate-pulse" />)}</div>;

    return (
        <div className="max-w-6xl mx-auto">
            {toast && (
                <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium shadow-2xl backdrop-blur-md">
                    {toast}
                </div>
            )}

            <div className="mb-12">
                <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                    <Link2 className="w-6 h-6 text-gold-400" />
                    Integrations & Webhooks
                </h1>
                <p className="text-sm text-gray-500 mt-1">Connect BridgeFlow with n8n, Zapier, and your custom apps</p>
            </div>

            {/* API Tokens Section */}
            <div className="glass rounded-xl p-6 card-glow mb-12">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Key className="w-5 h-5 text-gold-400" />
                            API Tokens
                        </h2>
                        <p className="text-xs text-gray-500">Provide these tokens to external apps to access BridgeFlow API</p>
                    </div>
                    <button
                        onClick={addToken}
                        className="flex items-center gap-2 px-4 py-2 bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 font-bold rounded-lg text-xs border border-gold-400/20 transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" /> Generate Token
                    </button>
                </div>

                <div className="space-y-3">
                    {tokens.length === 0 ? (
                        <div className="text-center py-8 bg-navy-900/50 rounded-xl border border-dashed border-white/10">
                            <p className="text-xs text-gray-500 font-medium">No API tokens generated yet</p>
                        </div>
                    ) : (
                        tokens.map((token) => (
                            <div key={token.id} className="flex items-center justify-between p-4 bg-navy-900/50 rounded-xl border border-white/5 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500">
                                        <Key className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">{token.name}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <code className="text-[10px] text-gold-400/80 font-mono bg-navy-950 px-1.5 py-0.5 rounded">
                                                {token.token.substring(0, 8)}••••••••••••••••
                                            </code>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(token.token);
                                                    showToast("Token copied!");
                                                }}
                                                className="p-1 text-gray-600 hover:text-white transition-colors"
                                            >
                                                <Copy className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-[10px] text-gray-600 font-bold uppercase">Last Used</div>
                                        <div className="text-[10px] text-gray-400">{token.last_used_at ? new Date(token.last_used_at).toLocaleDateString() : "Never"}</div>
                                    </div>
                                    <button
                                        onClick={() => deleteItem("api_tokens", token.id)}
                                        className="p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Webhooks Section */}
            <div className="glass rounded-xl p-6 card-glow">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-blue-400" />
                            Outbound Webhooks
                        </h2>
                        <p className="text-xs text-gray-500">Trigger external workflows (like n8n) on site events</p>
                    </div>
                    <button
                        onClick={addWebhook}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 font-bold rounded-lg text-xs border border-blue-500/20 transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Webhook
                    </button>
                </div>

                <div className="grid gap-4">
                    {webhooks.length === 0 ? (
                        <div className="text-center py-8 bg-navy-900/50 rounded-xl border border-dashed border-white/10">
                            <p className="text-xs text-gray-500 font-medium">No webhooks configured yet</p>
                        </div>
                    ) : (
                        webhooks.map((webhook, idx) => (
                            <div key={idx} className="p-5 bg-navy-900/30 rounded-xl border border-white/5 space-y-4 overflow-hidden relative">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${webhook.is_active ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`} />
                                        <input
                                            value={webhook.name}
                                            onChange={(e) => {
                                                const news = [...webhooks];
                                                news[idx].name = e.target.value;
                                                setWebhooks(news);
                                            }}
                                            className="bg-transparent text-sm font-bold text-white focus:outline-none focus:border-b border-white/20"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleSaveWebhook(webhook)}
                                            className="p-1.5 text-emerald-400 hover:bg-emerald-400/10 rounded transition-colors"
                                        >
                                            <Save className="w-4 h-4" />
                                        </button>
                                        {webhook.id && (
                                            <button
                                                onClick={() => deleteItem("webhooks", webhook.id)}
                                                className="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] text-gray-600 font-bold uppercase mb-1">Payload URL</label>
                                        <div className="relative">
                                            <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                            <input
                                                value={webhook.url}
                                                onChange={(e) => {
                                                    const news = [...webhooks];
                                                    news[idx].url = e.target.value;
                                                    setWebhooks(news);
                                                }}
                                                placeholder="https://n8n.your-domain.com/webhook/..."
                                                className="w-full pl-8 pr-3 py-2 bg-navy-950/50 border border-white/10 rounded text-xs text-white focus:border-blue-500/50 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-gray-600 font-bold uppercase mb-1">Secret Key (HMAC)</label>
                                        <div className="relative">
                                            <Key className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                            <input
                                                value={webhook.secret}
                                                disabled
                                                className="w-full pl-8 pr-3 py-2 bg-navy-950/50 border border-white/10 rounded text-xs text-gray-400 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={webhook.is_active}
                                            onChange={(e) => {
                                                const news = [...webhooks];
                                                news[idx].is_active = e.target.checked;
                                                setWebhooks(news);
                                            }}
                                            className="accent-emerald-400"
                                        />
                                        <span className="text-xs text-gray-400">Enabled</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-600 font-bold uppercase">Events:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {webhook.events.map(ev => (
                                                <span key={ev} className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-400">{ev}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/15 rounded-xl">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-bold text-white mb-1">n8n &quot;Trojan Horse&quot; Audit Pipeline</div>
                            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                                Paste your n8n webhook URL here to activate the Trojan Horse audit pipeline.
                                When a user requests a Free Audit, BridgeFlow will POST the site URL and email to this webhook.
                                n8n will then perform a deeper analysis and send the report automatically.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        value={n8nWebhookUrl}
                                        onChange={(e) => setN8nWebhookUrl(e.target.value)}
                                        placeholder="https://your-n8n-instance.app.n8n.cloud/webhook/abc123"
                                        className="w-full pl-10 pr-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:outline-none"
                                    />
                                </div>
                                <button
                                    onClick={handleSaveN8nWebhook}
                                    disabled={savingN8n}
                                    className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-navy-950 font-bold rounded-lg text-xs disabled:opacity-50"
                                >
                                    {savingN8n ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                    {savingN8n ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
