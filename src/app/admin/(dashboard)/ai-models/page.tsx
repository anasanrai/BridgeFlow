"use client";

import { useEffect, useState, useCallback } from "react";
import { Cpu, Save, Loader2, Plus, X, Brain, CheckCircle2, Sparkles } from "lucide-react";

interface AIModel {
    id: string;
    name: string;
    provider: string;
    model_id: string;
    api_key_env: string;
    is_primary: boolean;
    is_active: boolean;
    badge?: string;
    settings: any;
}

interface AuditSettings {
    id: string;
    ai_brain_enabled: boolean;
    background_audit_interval: number;
    brain_mode?: 'DIRECT' | 'WEBHOOK';
    n8n_webhook_url?: string;
}

const DEFAULT_MODELS: Omit<AIModel, "id">[] = [
    {
        name: "GPT-4 (OpenAI)",
        provider: "OPENAI",
        model_id: "gpt-4",
        api_key_env: "OPENAI_API_KEY",
        is_primary: true,
        is_active: true,
        badge: "PRIMARY",
        settings: {},
    },
    {
        name: "Claude (Anthropic)",
        provider: "ANTHROPIC",
        model_id: "claude-sonnet-4-6",
        api_key_env: "ANTHROPIC_API_KEY",
        is_primary: false,
        is_active: true,
        badge: "RECOMMENDED",
        settings: {},
    },
    {
        name: "OpenRouter",
        provider: "OPENROUTER",
        model_id: "openrouter/auto",
        api_key_env: "OPENROUTER_API_KEY",
        is_primary: false,
        is_active: true,
        badge: "GATEWAY",
        settings: {},
    },
];

export default function AIModelsAdmin() {
    const [models, setModels] = useState<AIModel[]>([]);
    const [auditSettings, setAuditSettings] = useState<AuditSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const modelsRes = await fetch("/api/admin/content/ai_models");
            const modelsData = await modelsRes.json();
            const loadedModels = modelsData.data || [];
            // Show defaults if no models in DB
            if (loadedModels.length === 0) {
                setModels(DEFAULT_MODELS.map((m) => ({ ...m, id: "" } as AIModel)));
            } else {
                setModels(loadedModels);
            }

            const auditRes = await fetch("/api/admin/content/audit_settings");
            const auditData = await auditRes.json();
            setAuditSettings(auditData.data?.[0] || null);
        } catch (error) {
            console.error("Failed to load AI data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSaveAudit = async () => {
        if (!auditSettings) return;
        setSaving(true);
        try {
            const method = auditSettings.id?.length ? "PUT" : "POST";
            await fetch("/api/admin/content/audit_settings", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(auditSettings),
            });
            showToast("Audit settings saved!");
            load();
        } catch {
            showToast("Error saving audit settings");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveModel = async (model: AIModel) => {
        setSaving(true);
        try {
            // FIX: empty string "" is truthy — use .length check
            const isNew = !model.id || model.id.length === 0;
            const method = isNew ? "POST" : "PUT";
            const payload = isNew
                ? (({ id, ...rest }) => rest)(model) // strip empty id for POST
                : model;
            const res = await fetch("/api/admin/content/ai_models", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                showToast("✅ Model saved!");
            } else {
                const err = await res.json();
                showToast("❌ " + (err.error || "Error saving model"));
            }
            load();
        } catch {
            showToast("❌ Error saving model");
        } finally {
            setSaving(false);
        }
    };

    const deleteModel = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/admin/content/ai_models?id=${id}`, { method: "DELETE" });
            showToast("Model deleted");
            load();
        } catch { showToast("Error deleting model"); }
    };

    const addModel = () => {
        const newModel: AIModel = {
            id: "",
            name: "New Model",
            provider: "OpenAI",
            model_id: "gpt-4",
            api_key_env: "OPENAI_API_KEY",
            is_primary: false,
            is_active: true,
            badge: "",
            settings: {},
        };
        setModels([...models, newModel]);
    };

    if (loading) return <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 glass rounded-lg animate-pulse" />)}</div>;

    return (
        <div className="max-w-6xl mx-auto">
            {toast && (
                <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium shadow-2xl backdrop-blur-md">
                    {toast}
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                        <Cpu className="w-6 h-6 text-gold-400" />
                        AI Model Stack
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage fallback models and AI Brain orchestration</p>
                </div>
                <button
                    onClick={addModel}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg text-sm border border-white/10 transition-all"
                >
                    <Plus className="w-4 h-4" /> Add Model
                </button>
            </div>

            {/* AI Brain Control */}
            <div className="glass rounded-xl p-6 card-glow mb-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Brain className="w-24 h-24 text-gold-400" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-400" />
                                AI Brain Configuration
                            </h2>
                            <p className="text-xs text-gray-500">Powering background audits and smart automations</p>
                        </div>
                        <button
                            onClick={handleSaveAudit}
                            disabled={saving}
                            className="px-4 py-2 gold-gradient text-navy-950 font-bold rounded-lg text-xs"
                        >
                            {saving ? "Saving..." : "Save Config"}
                        </button>
                    </div>

                    {auditSettings && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-center justify-between p-4 bg-navy-900/50 rounded-xl border border-white/5">
                                    <div>
                                        <div className="text-sm font-semibold text-white">Enable AI Brain</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Background Audit Engine</div>
                                    </div>
                                    <button
                                        onClick={() => setAuditSettings({ ...auditSettings, ai_brain_enabled: !auditSettings.ai_brain_enabled })}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${auditSettings.ai_brain_enabled ? 'bg-gold-500' : 'bg-gray-700'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${auditSettings.ai_brain_enabled ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-widest">Audit Interval (min)</label>
                                    <input
                                        type="number"
                                        value={auditSettings.background_audit_interval}
                                        onChange={(e) => setAuditSettings({ ...auditSettings, background_audit_interval: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 bg-navy-900 border border-white/10 rounded-lg text-white text-sm focus:border-gold-400/50 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="p-5 bg-navy-900/30 rounded-xl border border-white/5">
                                <label className="block text-xs font-semibold text-gray-400 mb-4 uppercase tracking-widest">Brain Routing Strategy</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setAuditSettings({ ...auditSettings, brain_mode: 'DIRECT' })}
                                        className={`flex flex-col gap-1 p-4 rounded-xl border transition-all text-left ${(auditSettings.brain_mode || 'DIRECT') === 'DIRECT'
                                                ? 'bg-gold-400/10 border-gold-400/40'
                                                : 'bg-navy-900/50 border-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <div className={`text-sm font-bold ${(auditSettings.brain_mode || 'DIRECT') === 'DIRECT' ? 'text-gold-400' : 'text-white'}`}>Direct Model</div>
                                        <div className="text-[10px] text-gray-500">Use primary model from stack below</div>
                                    </button>
                                    <button
                                        onClick={() => setAuditSettings({ ...auditSettings, brain_mode: 'WEBHOOK' })}
                                        className={`flex flex-col gap-1 p-4 rounded-xl border transition-all text-left ${auditSettings.brain_mode === 'WEBHOOK'
                                                ? 'bg-purple-400/10 border-purple-400/40'
                                                : 'bg-navy-900/50 border-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <div className={`text-sm font-bold ${auditSettings.brain_mode === 'WEBHOOK' ? 'text-purple-400' : 'text-white'}`}>n8n Webhook / RAG</div>
                                        <div className="text-[10px] text-gray-500">Execute through external workflow</div>
                                    </button>
                                </div>

                                {auditSettings.brain_mode === 'WEBHOOK' && (
                                    <div className="mt-6 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                                        <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">n8n Webhook URL</label>
                                        <input
                                            value={auditSettings.n8n_webhook_url || ""}
                                            onChange={(e) => setAuditSettings({ ...auditSettings, n8n_webhook_url: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white text-sm font-mono placeholder:text-gray-700 focus:border-purple-400/50 focus:outline-none transition-all"
                                            placeholder="https://n8n.yourdomain.com/webhook/..."
                                        />
                                        <p className="mt-2 text-[10px] text-gray-600">
                                            The brain will send a POST request to this URL including the audit data and current context.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {models.map((model, idx) => (
                    <div
                        key={idx}
                        className={`glass rounded-2xl p-6 border transition-all duration-300 relative group flex flex-col h-full ${model.is_primary
                            ? 'border-gold-400/30 bg-gold-400/[0.02] shadow-[0_0_20px_rgba(230,180,34,0.05)]'
                            : 'border-white/5 hover:border-white/10'
                            }`}
                    >
                        {/* Status Badges */}
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${model.is_primary
                                ? 'gold-gradient text-navy-950 shadow-lg shadow-gold-400/20'
                                : 'bg-white/5 text-gray-400 group-hover:text-gold-400 group-hover:bg-gold-400/10'
                                }`}>
                                <Cpu className="w-6 h-6" />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 justify-end">
                                {model.is_primary && (
                                    <span className="flex items-center gap-1.5 text-[10px] text-gold-400 font-bold uppercase tracking-wider bg-gold-400/10 px-2 py-1 rounded-full border border-gold-400/20">
                                        <Sparkles className="w-3 h-3" /> Primary
                                    </span>
                                )}
                                {model.badge && model.badge !== "PRIMARY" && (
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${model.badge === "RECOMMENDED" ? "text-purple-400 bg-purple-400/10 border-purple-400/20" :
                                        model.badge === "GATEWAY" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" :
                                            "text-gray-400 bg-white/5 border-white/10"
                                        }`}>
                                        {model.badge}
                                    </span>
                                )}
                                <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${model.is_active
                                    ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
                                    : 'bg-gray-400/10 text-gray-400 border-gray-400/20'
                                    }`}>
                                    {model.is_active ? 'Online' : 'Disabled'}
                                </div>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4 flex-1">
                            <div>
                                <label className="block text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1.5">Model Name</label>
                                <input
                                    value={model.name}
                                    onChange={(e) => {
                                        const newModels = [...models];
                                        newModels[idx].name = e.target.value;
                                        setModels(newModels);
                                    }}
                                    className="w-full bg-navy-900/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-400/50 transition-colors"
                                    placeholder="Model Display Name"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1.5">Provider</label>
                                    <input
                                        value={model.provider}
                                        onChange={(e) => {
                                            const newModels = [...models];
                                            newModels[idx].provider = e.target.value;
                                            setModels(newModels);
                                        }}
                                        className="w-full bg-navy-900/50 border border-white/5 rounded-lg px-3 py-2 text-[11px] text-gray-300 font-mono uppercase focus:outline-none focus:border-gold-400/50 transition-colors"
                                        placeholder="e.g. OPENAI"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1.5">Model ID</label>
                                    <input
                                        value={model.model_id}
                                        onChange={(e) => {
                                            const newModels = [...models];
                                            newModels[idx].model_id = e.target.value;
                                            setModels(newModels);
                                        }}
                                        className="w-full bg-navy-900/50 border border-white/5 rounded-lg px-3 py-2 text-[11px] text-gray-300 font-mono focus:outline-none focus:border-gold-400/50 transition-colors"
                                        placeholder="e.g. gpt-4"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1.5 flex items-center justify-between">
                                    Environment Key
                                    <span className="text-[9px] text-gray-500 font-normal normal-case italic">Must match .env variable</span>
                                </label>
                                <input
                                    value={model.api_key_env}
                                    onChange={(e) => {
                                        const newModels = [...models];
                                        newModels[idx].api_key_env = e.target.value;
                                        setModels(newModels);
                                    }}
                                    className="w-full bg-navy-900/50 border border-white/5 rounded-lg px-3 py-2 text-[11px] text-gold-400/80 font-mono focus:outline-none focus:border-gold-400/50 transition-colors"
                                    placeholder="API_KEY_NAME"
                                />
                            </div>

                            <div className="pt-4 flex items-center gap-6 border-t border-white/5">
                                <label className="flex items-center gap-3 cursor-pointer group/toggle">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={model.is_primary}
                                            onChange={(e) => {
                                                const newModels = models.map((m, i) => ({
                                                    ...m,
                                                    is_primary: i === idx ? e.target.checked : false
                                                }));
                                                setModels(newModels);
                                            }}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-5 bg-navy-800 rounded-full border border-white/10 peer-checked:bg-gold-500/20 peer-checked:border-gold-500/50 transition-all" />
                                        <div className="absolute top-1 left-1 w-3 h-3 bg-gray-500 rounded-full transition-all peer-checked:left-6 peer-checked:bg-gold-500" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400 group-hover/toggle:text-gray-200 transition-colors">Primary</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group/toggle">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={model.is_active}
                                            onChange={(e) => {
                                                const newModels = [...models];
                                                newModels[idx].is_active = e.target.checked;
                                                setModels(newModels);
                                            }}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-5 bg-navy-800 rounded-full border border-white/10 peer-checked:bg-emerald-500/20 peer-checked:border-emerald-500/50 transition-all" />
                                        <div className="absolute top-1 left-1 w-3 h-3 bg-gray-500 rounded-full transition-all peer-checked:left-6 peer-checked:bg-emerald-500" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400 group-hover/toggle:text-gray-200 transition-colors">Active</span>
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex items-center justify-between gap-3 pt-6 border-t border-white/5">
                            {model.id && (
                                <button
                                    onClick={() => deleteModel(model.id)}
                                    className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-red-400 hover:text-red-300 bg-red-400/5 hover:bg-red-400/10 rounded-lg border border-red-400/20 transition-all"
                                >
                                    <X className="w-3.5 h-3.5" /> Remove
                                </button>
                            )}
                            <div className="flex-1" />
                            <button
                                onClick={() => handleSaveModel(model)}
                                className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-navy-950 font-bold rounded-xl text-xs shadow-lg shadow-gold-400/10 hover:shadow-gold-400/25 transition-all"
                            >
                                <Save className="w-4 h-4" /> Save Model
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
