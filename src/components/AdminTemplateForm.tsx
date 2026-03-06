"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Minus, Loader2 } from "lucide-react";

interface AdminTemplateFormProps {
    template?: any;
    onClose: () => void;
    onSaved: () => void;
}

const ALL_CATEGORIES = ["Real Estate", "AI-Powered", "Lead Management", "CRM", "Communication"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export default function AdminTemplateForm({ template, onClose, onSaved }: AdminTemplateFormProps) {
    const isEditing = !!template;

    const [name, setName] = useState(template?.name || "");
    const [slug, setSlug] = useState(template?.slug || "");
    const [description, setDescription] = useState(template?.description || "");
    const [categories, setCategories] = useState<string[]>(template?.categories || []);
    const [difficulty, setDifficulty] = useState(template?.difficulty || "Beginner");
    const [n8nWorkflowId, setN8nWorkflowId] = useState(template?.n8nWorkflowId || "");
    const [nodeCount, setNodeCount] = useState(template?.nodeCount || 0);
    const [setupTime, setSetupTime] = useState(template?.setupTime || "30 min");
    const [value, setValue] = useState(template?.value || 0);
    const [whatItDoes, setWhatItDoes] = useState<string[]>(template?.whatItDoes || [""]);
    const [status, setStatus] = useState<"published" | "draft">(template?.status || "draft");
    const [featured, setFeatured] = useState(template?.featured || false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Auto-generate slug from name
    useEffect(() => {
        if (!isEditing && name) {
            setSlug(slugify(name));
        }
    }, [name, isEditing]);

    const toggleCategory = (cat: string) => {
        setCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const updateBullet = (idx: number, val: string) => {
        const updated = [...whatItDoes];
        updated[idx] = val;
        setWhatItDoes(updated);
    };

    const addBullet = () => setWhatItDoes([...whatItDoes, ""]);
    const removeBullet = (idx: number) => {
        if (whatItDoes.length <= 1) return;
        setWhatItDoes(whatItDoes.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        const payload = {
            ...(isEditing ? { id: template.id } : {}),
            name,
            slug,
            description,
            categories,
            difficulty,
            n8nWorkflowId,
            nodeCount: Number(nodeCount),
            setupTime,
            value: Number(value),
            whatItDoes: whatItDoes.filter((b) => b.trim()),
            status,
            featured,
            nodes: [], // Will be auto-populated from n8n API
        };

        try {
            const res = await fetch("/api/admin/templates", {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error || "Failed to save");
            onSaved();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6"
                style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.08)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-display font-bold text-white">
                        {isEditing ? "Edit Template" : "Add New Template"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Template Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. AI Lead Scoring System"
                            className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-400/40 transition-all"
                            style={{ background: "rgba(5,5,16,0.9)" }}
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="ai-lead-scoring"
                            className="w-full px-4 py-3 rounded-xl text-sm text-gray-400 border border-white/10 focus:outline-none focus:border-cyan-400/40 transition-all font-mono"
                            style={{ background: "rgba(5,5,16,0.9)" }}
                            required
                        />
                        <p className="text-[10px] text-gray-600 mt-1">Auto-generated from name, but editable</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="A brief summary of what this template does..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-400/40 resize-none transition-all"
                            style={{ background: "rgba(5,5,16,0.9)" }}
                        />
                    </div>

                    {/* Categories */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {ALL_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${categories.includes(cat)
                                        ? "text-cyan-400 border-cyan-400/30 bg-cyan-400/10"
                                        : "text-gray-500 border-white/10 hover:border-white/20"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Row: Difficulty + n8n Workflow ID */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Difficulty</label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-400/40 transition-all appearance-none cursor-pointer"
                                style={{ background: "rgba(5,5,16,0.9)" }}
                            >
                                {DIFFICULTIES.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">n8n Workflow ID</label>
                            <input
                                type="text"
                                value={n8nWorkflowId}
                                onChange={(e) => setN8nWorkflowId(e.target.value)}
                                placeholder="e.g. wKBnBodZY46OaPoA"
                                className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-400/40 transition-all font-mono"
                                style={{ background: "rgba(5,5,16,0.9)" }}
                            />
                            <p className="text-[10px] text-gray-500 mt-1.5 font-semibold">
                                Find this in your n8n workflow URL
                            </p>
                        </div>
                    </div>

                    {/* Row: Node count + Setup time + Value */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Node Count</label>
                            <input
                                type="number"
                                value={nodeCount}
                                onChange={(e) => setNodeCount(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-400/40 transition-all"
                                style={{ background: "rgba(5,5,16,0.9)" }}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Setup Time</label>
                            <input
                                type="text"
                                value={setupTime}
                                onChange={(e) => setSetupTime(e.target.value)}
                                placeholder="30 min"
                                className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-400/40 transition-all"
                                style={{ background: "rgba(5,5,16,0.9)" }}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Value (USD)</label>
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-400/40 transition-all"
                                style={{ background: "rgba(5,5,16,0.9)" }}
                            />
                        </div>
                    </div>

                    {/* What it does — dynamic bullets */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">What It Does</label>
                        <div className="space-y-2">
                            {whatItDoes.map((bullet, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-xs text-gray-600 font-mono w-6">{i + 1}.</span>
                                    <input
                                        type="text"
                                        value={bullet}
                                        onChange={(e) => updateBullet(i, e.target.value)}
                                        placeholder="Describe a feature..."
                                        className="flex-1 px-4 py-2 rounded-lg text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-400/40 transition-all"
                                        style={{ background: "rgba(5,5,16,0.9)" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeBullet(i)}
                                        className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addBullet}
                            className="mt-2 flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add bullet point
                        </button>
                    </div>

                    {/* Toggles */}
                    <div className="flex items-center gap-6 py-3 border-y border-white/5">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status:</span>
                            <button
                                type="button"
                                onClick={() => setStatus(status === "published" ? "draft" : "published")}
                                className={`relative w-12 h-6 rounded-full transition-all ${status === "published" ? "bg-cyan-500" : "bg-gray-700"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${status === "published" ? "left-6" : "left-0.5"
                                        }`}
                                />
                            </button>
                            <span className={`text-xs font-bold ${status === "published" ? "text-cyan-400" : "text-gray-500"}`}>
                                {status === "published" ? "Published" : "Draft"}
                            </span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Featured:</span>
                            <button
                                type="button"
                                onClick={() => setFeatured(!featured)}
                                className={`relative w-12 h-6 rounded-full transition-all ${featured ? "bg-gold-400" : "bg-gray-700"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${featured ? "left-6" : "left-0.5"
                                        }`}
                                />
                            </button>
                            <span className={`text-xs font-bold ${featured ? "text-gold-400" : "text-gray-500"}`}>
                                {featured ? "⭐ MOST POPULAR" : "Normal"}
                            </span>
                        </label>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving || !name.trim()}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 transition-all disabled:opacity-50 hover:shadow-[0_0_20px_rgba(230,180,34,0.3)]"
                            style={{ background: "linear-gradient(135deg, #e6b422, #c9a227)" }}
                        >
                            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                            {saving ? "Saving..." : isEditing ? "Update Template" : "Create Template"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
