"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { templates } from "@/data/templates";
import N8nCanvas, { N8nNodeIconStrip } from "@/components/templates/N8nCanvas";
import {
    Layers,
    Upload,
    CheckCircle2,
    AlertTriangle,
    ExternalLink,
    Eye,
    Save,
    Loader2,
    FileJson,
    X,
    CloudUpload,
    Workflow,
} from "lucide-react";

type Tab = "list" | "upload";

const difficultyColor: Record<string, string> = {
    Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Advanced: "text-red-400 bg-red-500/10 border-red-500/20",
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
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    const selectedTemplate = templates.find((t) => t.slug === selectedSlug)!;

    const processFile = (file: File) => {
        if (!file.name.endsWith(".json")) {
            setParseError("Please upload a .json file");
            return;
        }
        setUploadedFileName(file.name);
        const reader = new FileReader();
        reader.onload = (ev) => {
            const content = (ev.target?.result as string) || "";
            setJsonInput(content);
            setParsedJson(null);
            setSaveStatus("");
            setParseError("");
            try {
                const parsed = JSON.parse(content.trim());
                if (!parsed.nodes && !parsed.connections) {
                    setParseError("Not valid n8n JSON — missing nodes or connections fields.");
                    return;
                }
                setParsedJson(parsed);
            } catch (e: any) {
                setParseError("Invalid JSON: " + e.message);
            }
        };
        reader.readAsText(file);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    }, []);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleParse = () => {
        setParseError("");
        setParsedJson(null);
        setSaveStatus("");
        try {
            const parsed = JSON.parse(jsonInput.trim());
            if (!parsed.nodes && !parsed.connections) {
                setParseError("Not valid n8n JSON — missing nodes or connections fields.");
                return;
            }
            setParsedJson(parsed);
        } catch (e: any) {
            setParseError("Invalid JSON: " + e.message);
        }
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
            if (res.ok && data.ok) {
                setSaveStatus("success");
                setSaveMsg(`Workflow saved to "${selectedTemplate.name}" — redeploy to see changes on /templates`);
            } else {
                setSaveStatus("error");
                setSaveMsg(data.error || "Save failed");
            }
        } catch (err: any) {
            setSaveStatus("error");
            setSaveMsg(err.message);
        } finally {
            setSaving(false);
        }
    };

    const clearUpload = () => {
        setJsonInput("");
        setParsedJson(null);
        setParseError("");
        setSaveStatus("");
        setUploadedFileName("");
        if (fileRef.current) fileRef.current.value = "";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}>
                        <Workflow className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-display font-bold text-white">Workflow Templates</h1>
                        <p className="text-xs text-gray-500">{templates.length} templates · Upload n8n JSON to update canvas</p>
                    </div>
                </div>
                <Link
                    href="/templates"
                    target="_blank"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live
                </Link>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-1 p-1 rounded-xl border border-white/8" style={{ background: "rgba(10,12,25,0.6)" }}>
                <button
                    onClick={() => setTab("list")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${tab === "list" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                    style={tab === "list" ? { background: "rgba(255,255,255,0.08)" } : {}}
                >
                    <Layers className="w-3.5 h-3.5" />
                    All Templates ({templates.length})
                </button>
                <button
                    onClick={() => setTab("upload")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${tab === "upload" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                    style={tab === "upload" ? { background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(8,145,178,0.1))", border: "1px solid rgba(6,182,212,0.2)" } : {}}
                >
                    <CloudUpload className="w-3.5 h-3.5" />
                    Upload Workflow JSON
                </button>
            </div>

            {/* LIST TAB */}
            {tab === "list" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {templates.map((t) => (
                        <div
                            key={t.id}
                            className="rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 transition-all"
                            style={{ background: "rgba(10,12,25,0.7)" }}
                        >
                            <div className="h-36 relative overflow-hidden border-b border-white/5">
                                {t.workflowJson ? (
                                    <N8nCanvas workflowJson={t.workflowJson} compact height={144} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-navy-950/60">
                                        <div className="text-center">
                                            <FileJson className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                                            <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">No JSON uploaded</p>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-1.5">
                                    {t.workflowJson && (
                                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                                            JSON
                                        </span>
                                    )}
                                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${difficultyColor[t.difficulty]}`}>
                                        {t.difficulty}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{t.name}</h3>
                                <p className="text-[11px] text-gray-500 mb-3 line-clamp-2">{t.description}</p>
                                <N8nNodeIconStrip nodes={t.nodes.slice(0, 4)} />
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => {
                                            setSelectedSlug(t.slug);
                                            setTab("upload");
                                            clearUpload();
                                        }}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-cyan-400 border border-cyan-400/20 hover:bg-cyan-400/10 transition-all"
                                    >
                                        <Upload className="w-3 h-3" />
                                        {t.workflowJson ? "Update JSON" : "Upload JSON"}
                                    </button>
                                    <Link
                                        href={`/templates/${t.slug}`}
                                        target="_blank"
                                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                                    >
                                        <Eye className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* UPLOAD TAB */}
            {tab === "upload" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="rounded-xl p-4 border border-white/8" style={{ background: "rgba(10,12,25,0.6)" }}>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Target Template</label>
                            <select
                                value={selectedSlug}
                                onChange={(e) => { setSelectedSlug(e.target.value); clearUpload(); }}
                                className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-cyan-400/40 transition-all appearance-none cursor-pointer"
                                style={{ background: "rgba(5,5,16,0.9)" }}
                            >
                                {templates.map((t) => (
                                    <option key={t.slug} value={t.slug}>
                                        {t.name} {t.workflowJson ? "✓" : "○"}
                                    </option>
                                ))}
                            </select>
                            <p className="text-[10px] text-gray-600 mt-2">checkmark = has workflow JSON · circle = no JSON yet</p>
                        </div>

                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileRef.current?.click()}
                            className={`relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                                isDragging ? "border-cyan-400/60 bg-cyan-400/5"
                                : uploadedFileName ? "border-emerald-400/40 bg-emerald-400/5"
                                : "border-white/15 hover:border-white/30"
                            }`}
                        >
                            <input ref={fileRef} type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                            {uploadedFileName ? (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/20">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <p className="text-sm font-bold text-emerald-400">{uploadedFileName}</p>
                                    <p className="text-xs text-gray-500">File loaded · {parsedJson?.nodes?.length || 0} nodes detected</p>
                                    <button onClick={(e) => { e.stopPropagation(); clearUpload(); }} className="mt-1 flex items-center gap-1 text-[10px] text-gray-500 hover:text-red-400 transition-colors">
                                        <X className="w-3 h-3" /> Clear
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDragging ? "bg-cyan-400/20" : "bg-white/5"}`}>
                                        <CloudUpload className={`w-7 h-7 transition-colors ${isDragging ? "text-cyan-400" : "text-gray-500"}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white mb-1">{isDragging ? "Drop your n8n JSON file here" : "Drag and drop n8n JSON file"}</p>
                                        <p className="text-xs text-gray-500">or click to browse · .json files only</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="rounded-xl p-4 border border-white/8 space-y-3" style={{ background: "rgba(10,12,25,0.6)" }}>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Or Paste JSON Directly</label>
                                {jsonInput && (
                                    <button onClick={clearUpload} className="text-[10px] text-gray-600 hover:text-red-400 transition-colors flex items-center gap-1">
                                        <X className="w-3 h-3" /> Clear
                                    </button>
                                )}
                            </div>
                            <textarea
                                value={jsonInput}
                                onChange={(e) => { setJsonInput(e.target.value); setParsedJson(null); setSaveStatus(""); }}
                                placeholder='{"name": "My Workflow", "nodes": [...], "connections": {...}}'
                                rows={8}
                                className="w-full px-4 py-3 rounded-xl text-xs font-mono text-gray-300 border border-white/10 focus:outline-none focus:border-cyan-400/40 resize-none transition-all"
                                style={{ background: "rgba(5,5,16,0.9)" }}
                            />
                        </div>

                        {parseError && (
                            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span>{parseError}</span>
                            </div>
                        )}

                        {saveStatus && (
                            <div className={`flex items-start gap-2 p-3 rounded-xl text-xs ${saveStatus === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                                {saveStatus === "success" ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <X className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                                <span>{saveMsg}</span>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={handleParse}
                                disabled={!jsonInput.trim()}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                Parse and Preview
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!parsedJson || saving}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(230,180,34,0.3)]"
                                style={{ background: "linear-gradient(135deg, #e6b422, #c9a227)" }}
                            >
                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                {saving ? "Saving..." : "Save to Template"}
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl p-5 border border-white/8 space-y-4" style={{ background: "rgba(10,12,25,0.6)" }}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Canvas Preview</h3>
                            {parsedJson && (
                                <span className="text-[10px] text-emerald-400 font-semibold">
                                    {parsedJson.nodes?.length || 0} nodes
                                </span>
                            )}
                        </div>

                        {parsedJson ? (
                            <>
                                <div className="rounded-xl overflow-hidden border border-cyan-500/15">
                                    <N8nCanvas workflowJson={parsedJson} height={340} />
                                </div>
                                {parsedJson.name && (
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-white/3 border border-white/8">
                                        <Workflow className="w-4 h-4 text-cyan-400" />
                                        <span className="text-xs font-semibold text-gray-300">{parsedJson.name}</span>
                                    </div>
                                )}
                                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                                    {parsedJson.nodes?.map((n: any, i: number) => (
                                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5">
                                            <span className="text-[10px] font-mono text-gray-600">{String(i + 1).padStart(2, "0")}</span>
                                            <span className="text-xs font-semibold text-gray-300 flex-1">{n.name || n.type}</span>
                                            <span className="text-[9px] text-gray-600 truncate max-w-[120px]">{n.type}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-gray-600 text-center">
                                    Targeting: <span className="text-gray-400 font-semibold">{selectedTemplate.name}</span>
                                </p>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-80 text-gray-700">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/3 mb-4">
                                    <FileJson className="w-8 h-8 opacity-40" />
                                </div>
                                <p className="font-semibold text-sm text-gray-500">Upload or paste n8n JSON</p>
                                <p className="text-xs mt-1 text-gray-600">Real workflow canvas will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
