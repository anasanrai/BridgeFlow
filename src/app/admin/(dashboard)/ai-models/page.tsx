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
                        <div className="grid md:grid-cols-2 gap-8">
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
                                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-widest">Background Audit Interval (min)</label>
                                <input
                                    type="number"
                                    value={auditSettings.background_audit_interval}
                                    onChange={(e) => setAuditSettings({ ...auditSettings, background_audit_interval: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 bg-navy-900 border border-white/10 rounded-lg text-white text-sm focus:border-gold-400/50 focus:outline-none"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Models Table */}
            <div className="grid gap-4">
                {models.map((model, idx) => (
                    <div key={idx} className={`glass rounded-xl p-5 border transition-all ${model.is_primary ? 'border-gold-400/30' : 'border-white/5'}`}>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${model.is_primary ? 'gold-gradient text-navy-950' : 'bg-white/5 text-gray-400'}`}>
                                    <Cpu className="w-5 h-5" />
                                </div>
                                <div>
                                    <input
                                        value={model.name}
                                        onChange={(e) => {
                                            const newModels = [...models];
                                            newModels[idx].name = e.target.value;
                                            setModels(newModels);
                                        }}
                                        className="bg-transparent text-white font-bold text-sm focus:outline-none focus:border-b border-gold-400/50"
                                    />
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <input
                                            value={model.provider}
                                            onChange={(e) => {
                                                const newModels = [...models];
                                                newModels[idx].provider = e.target.value;
                                                setModels(newModels);
                                            }}
                                            className="bg-transparent text-[10px] text-gray-500 font-bold uppercase w-24 focus:outline-none focus:text-white"
                                        />
                                        {model.is_primary && (
                                            <span className="flex items-center gap-1 text-[9px] text-gold-400 font-bold uppercase bg-gold-400/10 px-1.5 py-0.5 rounded">
                                                <CheckCircle2 className="w-2.5 h-2.5" /> Primary
                                            </span>
                                        )}
                                        {model.badge && model.badge !== "PRIMARY" && (
                                            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${model.badge === "RECOMMENDED" ? "text-purple-400 bg-purple-400/10" :
                                                    model.badge === "GATEWAY" ? "text-blue-400 bg-blue-400/10" :
                                                        "text-gray-400 bg-white/5"
                                                }`}>
                                                {model.badge}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-[10px] text-gray-600 font-bold uppercase mb-1">Model ID</label>
                                    <input
                                        value={model.model_id}
                                        onChange={(e) => {
                                            const newModels = [...models];
                                            newModels[idx].model_id = e.target.value;
                                            setModels(newModels);
                                        }}
                                        className="w-full bg-navy-900/50 border border-white/5 rounded px-2 py-1 text-xs text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-gray-600 font-bold uppercase mb-1">Env Key</label>
                                    <input
                                        value={model.api_key_env}
                                        onChange={(e) => {
                                            const newModels = [...models];
                                            newModels[idx].api_key_env = e.target.value;
                                            setModels(newModels);
                                        }}
                                        className="w-full bg-navy-900/50 border border-white/5 rounded px-2 py-1 text-xs text-white"
                                    />
                                </div>
                                <div className="flex items-center gap-4 h-full pt-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
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
                                            className="accent-gold-400"
                                        />
                                        <span className="text-xs text-gray-400">Primary</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={model.is_active}
                                            onChange={(e) => {
                                                const newModels = [...models];
                                                newModels[idx].is_active = e.target.checked;
                                                setModels(newModels);
                                            }}
                                            className="accent-emerald-400"
                                        />
                                        <span className="text-xs text-gray-400">Active</span>
                                    </label>
                                </div>
                                <div className="flex items-center justify-end gap-2 h-full pt-4">
                                    <button
                                        onClick={() => handleSaveModel(model)}
                                        className="p-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                    </button>
                                    {model.id && (
                                        <button
                                            onClick={() => deleteModel(model.id)}
                                            className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
