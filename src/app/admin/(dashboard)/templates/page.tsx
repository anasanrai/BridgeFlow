"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { templates } from "@/data/templates";
import WorkflowDiagram from "@/components/templates/WorkflowDiagram";
import {
    Layers,
    Upload,
    CheckCircle2,
    AlertTriangle,
    ExternalLink,
    Eye,
    Save,
    Loader2,
    ArrowLeft,
    FileJson,
    X,
} from "lucide-react";

type Tab = "list" | "upload";

const difficultyColor: Record<string, string> = {
    Beginner: "text-emerald-400 bg-emerald-500/10",
    Intermediate: "text-amber-400 bg-amber-500/10",
    Advanced: "text-red-400 bg-red-500/10",
};

export default function AdminTemplatesPage() {
    const [tab, setTab] = useState<Tab>("list");
    const [selectedSlug, setSelectedSlug] = useState(templates[0].slug);
    const [jsonInput, setJsonInput] = useState("");
    const [parsedJson, setParsedJson] = useState<Record<string, any> | null>(null);
    const [parseError, setParseError] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"" | "success" | "error">("");
    const [saveMsg, setSaveMsg] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    const selectedTemplate = templates.find((t) => t.slug === selectedSlug)!;

    const handleParse = () => {
        setParseError("");
        setParsedJson(null);
        setSaveStatus("");
        try {
            const parsed = JSON.parse(jsonInput.trim());
            if (!parsed.nodes && !parsed.connections) {
                setParseError("Doesn't look like valid n8n JSON — missing nodes or connections fields.");
                return;
            }
            setParsedJson(parsed);
        } catch (e: any) {
            setParseError("Invalid JSON: " + e.message);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setJsonInput((ev.target?.result as string) || "");
            setParsedJson(null);
            setSaveStatus("");
        };
        reader.readAsText(file);
    };

    const handleSave = async () => {
        if (!parsedJson) return;
        setSaving(true);
        setSaveStatus("");
        try {
            const res = await fetch("/api/admin/templates/save-workflow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug: selectedSlug, workflowJson: parsedJson }),
            });
            const data = await res.json();
            if (res.ok) {
                setSaveStatus("success");
                setSaveMsg(`Workflow JSON saved for "${selectedTemplate.name}". Rebuild the site to update the public canvas.`);
                setJsonInput("");
                setParsedJson(null);
            } else {
                setSaveStatus("error");
                setSaveMsg(data.error || "Save failed");
            }
        } catch (e: any) {
            setSaveStatus("error");
            setSaveMsg(e.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                            <Layers className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h1 className="text-2xl font-display font-bold text-white">Templates</h1>
                    </div>
                    <p className="text-sm text-gray-500 ml-[52px]">
                        Manage n8n workflow templates — {templates.length} total
                    </p>
                </div>
                <Link
                    href="/templates"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 border border-white/5 hover:border-cyan-400/20 hover:text-cyan-400 transition-all"
                >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Public Page
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/5 pb-0">
                {(["list", "upload"] as Tab[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${tab === t
                            ? "text-gold-400 border-gold-400"
                            : "text-gray-500 border-transparent hover:text-gray-300"
                            }`}
                    >
                        {t === "list" ? "Templates List" : "Upload Workflow JSON"}
                    </button>
                ))}
            </div>

            {/* ── Tab: List ──────────────────────────────────── */}
            {tab === "list" && (
                <div className="glass rounded-xl overflow-hidden border border-white/5">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="text-left p-4 font-semibold">Template</th>
                                <th className="text-left p-4 font-semibold hidden md:table-cell">Difficulty</th>
                                <th className="text-left p-4 font-semibold hidden lg:table-cell">Nodes</th>
                                <th className="text-left p-4 font-semibold hidden lg:table-cell">Value</th>
                                <th className="text-left p-4 font-semibold">JSON</th>
                                <th className="text-right p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {templates.map((t) => (
                                <tr key={t.id} className="hover:bg-white/2 transition-colors group">
                                    <td className="p-4">
                                        <div className="font-medium text-white text-sm">{t.name}</div>
                                        <div className="text-[11px] text-gray-600 mt-0.5">
                                            {t.categories.join(", ")}
                                        </div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${difficultyColor[t.difficulty]}`}>
                                            {t.difficulty}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden lg:table-cell text-gray-400">{t.nodeCount}{t.nodeCount >= 25 ? "+" : ""}</td>
                                    <td className="p-4 hidden lg:table-cell text-gold-400 font-bold">${t.value.toLocaleString()}</td>
                                    <td className="p-4">
                                        {t.workflowJson ? (
                                            <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-amber-400 text-xs">
                                                <AlertTriangle className="w-3.5 h-3.5" /> Missing
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => { setSelectedSlug(t.slug); setTab("upload"); }}
                                                className="p-2 rounded-lg text-gray-600 hover:text-gold-400 hover:bg-gold-400/10 transition-all"
                                                title="Upload JSON"
                                            >
                                                <Upload className="w-3.5 h-3.5" />
                                            </button>
                                            <Link
                                                href={`/templates/${t.slug}`}
                                                target="_blank"
                                                className="p-2 rounded-lg text-gray-600 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                                                title="View on site"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ── Tab: Upload ────────────────────────────────── */}
            {tab === "upload" && (
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Form */}
                    <div className="glass rounded-xl p-6 border border-white/5 space-y-5">
                        {/* Template selector */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                Select Template
                            </label>
                            <select
                                value={selectedSlug}
                                onChange={(e) => { setSelectedSlug(e.target.value); setParsedJson(null); setSaveStatus(""); }}
                                className="w-full px-3 py-2.5 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-gold-400/40 transition-all"
                                style={{ background: "rgba(12,12,28,0.9)" }}
                            >
                                {templates.map((t) => (
                                    <option key={t.slug} value={t.slug}>
                                        {t.workflowJson ? "✅ " : "⚠️ "}{t.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* File upload */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                Upload .json file or paste below
                            </label>
                            <div
                                className="flex items-center justify-center border border-dashed border-white/15 rounded-xl p-5 cursor-pointer hover:border-gold-400/30 transition-all"
                                onClick={() => fileRef.current?.click()}
                            >
                                <FileJson className="w-6 h-6 text-gray-600 mr-3" />
                                <span className="text-sm text-gray-500">Drag & drop or <span className="text-gold-400 font-semibold">click to upload</span> n8n .json</span>
                                <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
                            </div>
                        </div>

                        {/* Paste area */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                Or Paste JSON
                            </label>
                            <textarea
                                value={jsonInput}
                                onChange={(e) => { setJsonInput(e.target.value); setParsedJson(null); setSaveStatus(""); }}
                                placeholder='{"nodes": [...], "connections": {...}, ...}'
                                rows={10}
                                className="w-full px-4 py-3 rounded-xl text-xs font-mono text-gray-300 border border-white/10 focus:outline-none focus:border-gold-400/40 resize-none transition-all"
                                style={{ background: "rgba(5,5,16,0.9)" }}
                            />
                        </div>

                        {/* Parse error */}
                        {parseError && (
                            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                                <X className="w-4 h-4 flex-shrink-0 mt-0.5" /> {parseError}
                            </div>
                        )}

                        {/* Save status */}
                        {saveStatus && (
                            <div className={`flex items-start gap-2 p-3 rounded-xl text-xs ${saveStatus === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                                {saveStatus === "success" ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <X className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                                {saveMsg}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleParse}
                                disabled={!jsonInput.trim()}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-400 transition-all disabled:opacity-40"
                            >
                                <Eye className="w-3.5 h-3.5" /> Parse & Preview
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!parsedJson || saving}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 transition-all disabled:opacity-40 hover:shadow-[0_0_15px_rgba(230,180,34,0.3)]"
                                style={{ background: "linear-gradient(135deg, #e6b422, #c9a227)" }}
                            >
                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                {saving ? "Saving..." : "Save to Template"}
                            </button>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="glass rounded-xl p-6 border border-white/5 space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Live Canvas Preview
                        </h3>
                        {parsedJson ? (
                            <>
                                <div className="rounded-xl overflow-hidden border border-cyan-500/15">
                                    <WorkflowDiagram
                                        template={{ ...selectedTemplate, workflowJson: parsedJson }}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {parsedJson.nodes?.map((n: any, i: number) => (
                                        <span key={i} className="px-2 py-1 rounded-md text-[10px] font-semibold bg-white/5 text-gray-400 border border-white/8">
                                            {n.name || n.type}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600">
                                    {parsedJson.nodes?.length || 0} nodes detected. Click "Save to Template" to persist.
                                </p>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 text-gray-700 text-sm">
                                <FileJson className="w-10 h-10 mb-3 opacity-40" />
                                <p className="font-medium">Paste JSON and click Parse & Preview</p>
                                <p className="text-xs mt-1 text-gray-600">Canvas will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
