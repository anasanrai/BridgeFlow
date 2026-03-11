"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import AdminTemplateForm from "@/components/forms/AdminTemplateForm";
import N8nCanvas, { N8nNodeIconStrip } from "@/components/templates/N8nCanvas";
import { difficultyColors as difficultyColor } from "@/data/templates";
import Image from "next/image";
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
    Plus,
    Pencil,
    Trash2,
    GripVertical,
    Copy,
    EyeOff,
    Star,
    BarChart3,
    ImageIcon,
    Wand2,
    ZoomIn,
    ImagePlus,
    Lock,
    ShieldCheck,
} from "lucide-react";

// Dynamic import for live React Flow canvas in preview modal
const WorkflowCanvas = dynamic(() => import("@/components/WorkflowCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center" style={{ height: 400, background: "#0a0a0f" }}>
            <div className="w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
    ),
});

type Tab = "list" | "upload";

interface TemplateData {
    id: string;
    name: string;
    slug: string;
    categories: string[];
    difficulty: string;
    nodes: string[];
    nodeCount: number;
    setupTime: string;
    value: number;
    description: string;
    shortDescription?: string;
    longDescription?: string;
    whatItDoes: string[];
    featured: boolean;
    status: "published" | "draft";
    n8nWorkflowId: string;
    order: number;
    updatedAt?: string;
    workflowJson?: any;
    connectionCount?: number;
    imageUrls?: string[];
    jsonUrl?: string;
    jsonAccess?: "free" | "paid";
    tools?: string[];
}

export default function TemplateManager() {
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSlug, setSelectedSlug] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<TemplateData | null>(null);
    const [canvasPreviewSlug, setCanvasPreviewSlug] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
    const [jsonInput, setJsonInput] = useState("");
    const [parsedJson, setParsedJson] = useState<Record<string, any> | null>(null);
    const [parseError, setParseError] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"" | "success" | "error">("");
    const [saveMsg, setSaveMsg] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState("");
    // Image upload state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageRemoveBg, setImageRemoveBg] = useState(true);
    const [imageUpscale, setImageUpscale] = useState(true);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageUploadStatus, setImageUploadStatus] = useState<"" | "success" | "error">("");
    const [imageUploadMsg, setImageUploadMsg] = useState("");
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [instantPreviewImage, setInstantPreviewImage] = useState<string | null>(null);
    const [tab, setTab] = useState<Tab>("list");

    // Fetch templates
    const fetchTemplates = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/templates");
            const data = await res.json();
            if (data.ok) {
                setTemplates(data.templates.sort((a: TemplateData, b: TemplateData) => (a.order || 0) - (b.order || 0)));
                if (!selectedSlug && data.templates.length) setSelectedSlug(data.templates[0].slug);
            }
        } catch (err) {
            console.error("Failed to fetch templates:", err);
        } finally {
            setLoading(false);
        }
    }, [selectedSlug]);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    // Stats
    const publishedCount = templates.filter((t) => t.status === "published").length;
    const draftCount = templates.filter((t) => t.status === "draft").length;
    const featuredCount = templates.filter((t) => t.featured).length;
    const totalValue = templates.reduce((s, t) => s + (t.value || 0), 0);

    // Copy workflow ID
    const copyId = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Toggle status
    const toggleStatus = async (t: TemplateData) => {
        try {
            await fetch("/api/admin/templates", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: t.id, status: t.status === "published" ? "draft" : "published" }),
            });
            fetchTemplates();
        } catch (err) {
            console.error(err);
        }
    };

    // Delete template
    const deleteTemplate = async (id: string) => {
        if (!confirm("Are you sure you want to delete this template?")) return;
        try {
            await fetch(`/api/admin/templates?id=${id}`, { method: "DELETE" });
            fetchTemplates();
        } catch (err) {
            console.error(err);
        }
    };

    // Drag & drop reorder
    const handleDragStart = (idx: number) => setDraggedIdx(idx);
    const handleDragOver = (e: React.DragEvent, idx: number) => {
        e.preventDefault();
        if (draggedIdx === null || draggedIdx === idx) return;
        const reordered = [...templates];
        const [dragged] = reordered.splice(draggedIdx, 1);
        reordered.splice(idx, 0, dragged);
        setTemplates(reordered);
        setDraggedIdx(idx);
    };
    const handleDragEnd = async () => {
        if (draggedIdx === null) return;
        setDraggedIdx(null);
        try {
            await fetch("/api/admin/templates", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderedIds: templates.map((t) => t.id) }),
            });
        } catch (err) {
            console.error(err);
        }
    };

    // Upload tab handlers
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

    const handleSaveWorkflow = async () => {
        if (!parsedJson) return;
        setSaving(true);
        setSaveStatus("");
        try {
            const targetTemplate = templates.find((t) => t.slug === selectedSlug);
            if (!targetTemplate) throw new Error("Template not found");

            const res = await fetch("/api/admin/templates", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: targetTemplate.id, workflowJson: parsedJson }),
            });
            const data = await res.json();
            if (data.ok) {
                setSaveStatus("success");
                setSaveMsg(`Workflow saved to "${targetTemplate.name}"`);
                fetchTemplates();
            } else {
                throw new Error(data.error || "Save failed");
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
    };

    const selectedTemplate = templates.find((t) => t.slug === selectedSlug);

    // Image upload handler
    const handleImageUpload = async () => {
        if (!imageFile || !selectedSlug) return;
        setImageUploading(true);
        setImageUploadStatus("");
        setImageUploadMsg("");
        try {
            const fd = new FormData();
            fd.append("file", imageFile);
            fd.append("slug", selectedSlug);
            fd.append("removeBg", String(imageRemoveBg));
            fd.append("upscale", String(imageUpscale));
            const res = await fetch("/api/admin/templates/process-image", { method: "POST", body: fd });
            const data = await res.json();
            if (data.ok) {
                setUploadedImageUrl(data.url);
                setInstantPreviewImage(data.url); // Instant preview
                // Also update the template's image_url in DB
                const tpl = templates.find(t => t.slug === selectedSlug);
                if (tpl) {
                    const existingUrls = tpl.imageUrls || [];
                    const newUrls = existingUrls.includes(data.url) ? existingUrls : [...existingUrls, data.url];

                    await fetch("/api/admin/templates", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: tpl.id,
                            imageUrl: data.url,
                            imageUrls: newUrls
                        }),
                    });
                    fetchTemplates();
                }
                setImageUploadStatus("success");
                setImageUploadMsg(`Image processed & saved! ${data.processed.bgRemoved ? "BG removed. " : ""}${data.processed.upscaled ? "Upscaled to 4K." : ""}`);
            } else {
                throw new Error(data.error || "Upload failed");
            }
        } catch (err: any) {
            setImageUploadStatus("error");
            setImageUploadMsg(err.message);
        } finally {
            setImageUploading(false);
        }
    };

    const handleImageFileSelect = (file: File) => {
        if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
            setImageUploadStatus("error");
            setImageUploadMsg("Only JPEG, PNG, or WebP images are allowed");
            return;
        }
        setImageFile(file);
        setImageUploadStatus("");
        setUploadedImageUrl(null);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}>
                        <Workflow className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-display font-bold text-white">Template Manager</h1>
                        <p className="text-xs text-gray-500">{templates.length} templates · Manage, reorder, and preview workflows</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { setEditingTemplate(null); setShowForm(true); }}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 transition-all hover:shadow-[0_0_20px_rgba(230,180,34,0.3)]"
                        style={{ background: "linear-gradient(135deg, #e6b422, #c9a227)" }}
                    >
                        <Plus className="w-3.5 h-3.5" /> Add New
                    </button>
                    <Link
                        href="/templates"
                        target="_blank"
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                    >
                        <ExternalLink className="w-3.5 h-3.5" /> View Live
                    </Link>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: "Total", value: templates.length, icon: Layers, color: "#06b6d4" },
                    { label: "Published", value: publishedCount, icon: CheckCircle2, color: "#10b981" },
                    { label: "Drafts", value: draftCount, icon: EyeOff, color: "#f59e0b" },
                    { label: "Featured", value: featuredCount, icon: Star, color: "#e6b422" },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl p-4 border border-white/8"
                        style={{ background: "rgba(10,12,25,0.6)" }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{stat.label}</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-white">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Tab switcher */}
            <div className="flex gap-1 p-1 rounded-xl border border-white/8" style={{ background: "rgba(10,12,25,0.6)" }}>
                <button
                    onClick={() => setTab("list")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${tab === "list" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                    style={tab === "list" ? { background: "rgba(255,255,255,0.08)" } : {}}
                >
                    <Layers className="w-3.5 h-3.5" /> All Templates ({templates.length})
                </button>
                <button
                    onClick={() => setTab("upload")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${tab === "upload" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                    style={tab === "upload" ? { background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(8,145,178,0.1))", border: "1px solid rgba(6,182,212,0.2)" } : {}}
                >
                    <CloudUpload className="w-3.5 h-3.5" /> Upload Workflow JSON
                </button>
            </div>

            {/* LIST TAB */}
            {tab === "list" && (
                <div className="rounded-xl border border-white/8 overflow-hidden" style={{ background: "rgba(10,12,25,0.4)" }}>
                    {/* Table header */}
                    <div className="hidden md:grid grid-cols-[40px_1fr_140px_100px_100px_80px_100px_100px_140px] gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-600 border-b border-white/5">
                        <span></span>
                        <span>Template</span>
                        <span>Workflow ID</span>
                        <span>Category</span>
                        <span>Access</span>
                        <span>Difficulty</span>
                        <span>Updated</span>
                        <span>Status</span>
                        <span className="text-right">Actions</span>
                    </div>

                    {/* Template rows */}
                    {templates.map((t, idx) => (
                        <div
                            key={t.id}
                            draggable
                            onDragStart={() => handleDragStart(idx)}
                            onDragOver={(e) => handleDragOver(e, idx)}
                            onDragEnd={handleDragEnd}
                            className={`grid grid-cols-1 md:grid-cols-[40px_1fr_140px_100px_100px_80px_100px_100px_140px] gap-3 px-4 py-3 items-center border-b border-white/5 hover:bg-white/3 transition-all cursor-grab ${draggedIdx === idx ? "opacity-50" : ""
                                }`}
                        >
                            {/* Drag handle */}
                            <div className="hidden md:flex items-center justify-center">
                                <GripVertical className="w-4 h-4 text-gray-700" />
                            </div>

                            {/* Name + Description */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10" style={{ background: "#050510" }}>
                                    {t.workflowJson ? (
                                        <N8nCanvas workflowJson={t.workflowJson} compact height={40} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FileJson className="w-4 h-4 text-gray-700" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white line-clamp-1">{t.name}</h3>
                                    <p className="text-[10px] text-gray-600 line-clamp-1">${t.value.toLocaleString()} value · {t.nodeCount} nodes</p>
                                </div>
                                {t.featured && (
                                    <span className="px-2 py-0.5 rounded-full text-[8px] font-black text-navy-950" style={{ background: "linear-gradient(135deg, #e6b422, #c9a227)" }}>
                                        ⭐
                                    </span>
                                )}
                            </div>

                            {/* Workflow ID */}
                            <div className="flex items-center gap-1">
                                {t.n8nWorkflowId ? (
                                    <button
                                        onClick={() => copyId(t.n8nWorkflowId)}
                                        className="flex items-center gap-1 text-[10px] font-mono text-gray-500 hover:text-cyan-400 transition-colors"
                                        title={t.n8nWorkflowId}
                                    >
                                        {t.n8nWorkflowId.slice(0, 8)}…
                                        <Copy className="w-3 h-3" />
                                        {copiedId === t.n8nWorkflowId && <span className="text-[9px] text-cyan-400">✓</span>}
                                    </button>
                                ) : (
                                    <span className="text-[10px] text-gray-700">—</span>
                                )}
                            </div>

                            {/* Category */}
                            <div className="flex flex-wrap gap-1">
                                <span className="text-[9px] text-gray-500 line-clamp-1">{t.categories?.[0] || "—"}</span>
                            </div>

                            {/* Access */}
                            <div className="flex items-center gap-1.5">
                                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold border transition-all ${t.jsonAccess === "paid"
                                    ? "text-gold-400 bg-gold-400/10 border-gold-400/20"
                                    : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"}`}>
                                    {t.jsonAccess === "paid" ? <Lock className="w-2.5 h-2.5" /> : <ShieldCheck className="w-2.5 h-2.5" />}
                                    {t.jsonAccess === "paid" ? "Paid" : "Free"}
                                </span>
                            </div>

                            {/* Difficulty */}
                            <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold border w-fit ${difficultyColor[t.difficulty || "Beginner"]}`}>
                                {t.difficulty}
                            </span>

                            {/* Updated */}
                            <span className="text-[9px] text-gray-600 font-mono">
                                {t.updatedAt ? new Date(t.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                            </span>

                            {/* Status */}
                            <button
                                onClick={() => toggleStatus(t)}
                                className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold border w-fit transition-all cursor-pointer ${t.status === "published"
                                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20"
                                    : "text-gray-500 bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/20"
                                    }`}
                            >
                                {t.status === "published" ? "Published" : "Draft"}
                            </button>

                            {/* Actions */}
                            <div className="flex items-center gap-1 justify-end">
                                <button
                                    onClick={() => { setEditingTemplate(t); setShowForm(true); }}
                                    className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                                    title="Edit"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                {t.n8nWorkflowId && (
                                    <button
                                        onClick={() => setCanvasPreviewSlug(t.slug)}
                                        className="p-1.5 rounded-lg text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                                        title="Preview Canvas"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                    </button>
                                )}
                                <Link
                                    href={`/templates/${t.slug}`}
                                    target="_blank"
                                    className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                                    title="View Page"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                    onClick={() => deleteTemplate(t.id)}
                                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                    title="Delete"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
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
                        </div>

                        {/* ── IMAGE UPLOAD SECTION ── */}
                        <div className="rounded-xl p-4 border border-amber-400/20 space-y-4" style={{ background: "rgba(230,180,34,0.04)" }}>
                            <div className="flex items-center gap-2">
                                <ImagePlus className="w-4 h-4 text-amber-400" />
                                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Workflow Image Upload</h3>
                                <span className="text-[9px] text-gray-600 ml-auto">PNG · JPG · WebP · max 20MB</span>
                            </div>
                            {/* Image drop zone */}
                            <div
                                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleImageFileSelect(f); }}
                                onDragOver={(e) => e.preventDefault()}
                                className="relative rounded-xl border-2 border-dashed border-amber-400/30 hover:border-amber-400/60 p-6 text-center cursor-pointer transition-all"
                            >
                                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageFileSelect(f); }} className="absolute inset-0 opacity-0 cursor-pointer" />
                                {imagePreview ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="relative w-full max-w-xs mx-auto rounded-lg overflow-hidden border border-amber-400/20" style={{ aspectRatio: "16/9" }}>
                                            <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                                        </div>
                                        <p className="text-xs text-amber-400 font-semibold">{imageFile?.name}</p>
                                        <button onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); setUploadedImageUrl(null); setImageUploadStatus(""); }} className="text-[10px] text-gray-500 hover:text-red-400">
                                            <X className="w-3 h-3 inline mr-1" />Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                                        <ImageIcon className="w-8 h-8 text-amber-400/40" />
                                        <p className="text-sm font-bold text-white">Drop workflow screenshot here</p>
                                        <p className="text-xs text-gray-500">or click to browse</p>
                                    </div>
                                )}
                            </div>
                            {/* Processing options */}
                            <div className="flex gap-3">
                                <label className="flex items-center gap-2 cursor-pointer flex-1 p-3 rounded-xl border transition-all" style={{ background: imageRemoveBg ? "rgba(6,182,212,0.08)" : "rgba(10,12,25,0.6)", borderColor: imageRemoveBg ? "rgba(6,182,212,0.3)" : "rgba(255,255,255,0.08)" }}>
                                    <input type="checkbox" checked={imageRemoveBg} onChange={(e) => setImageRemoveBg(e.target.checked)} className="sr-only" />
                                    <Wand2 className={`w-4 h-4 ${imageRemoveBg ? "text-cyan-400" : "text-gray-600"}`} />
                                    <div>
                                        <p className={`text-xs font-bold ${imageRemoveBg ? "text-cyan-400" : "text-gray-500"}`}>Remove Background</p>
                                        <p className="text-[10px] text-gray-600">AI-powered BG removal</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer flex-1 p-3 rounded-xl border transition-all" style={{ background: imageUpscale ? "rgba(230,180,34,0.08)" : "rgba(10,12,25,0.6)", borderColor: imageUpscale ? "rgba(230,180,34,0.3)" : "rgba(255,255,255,0.08)" }}>
                                    <input type="checkbox" checked={imageUpscale} onChange={(e) => setImageUpscale(e.target.checked)} className="sr-only" />
                                    <ZoomIn className={`w-4 h-4 ${imageUpscale ? "text-amber-400" : "text-gray-600"}`} />
                                    <div>
                                        <p className={`text-xs font-bold ${imageUpscale ? "text-amber-400" : "text-gray-500"}`}>Upscale to 4K</p>
                                        <p className="text-[10px] text-gray-600">LANCZOS high-quality resize</p>
                                    </div>
                                </label>
                            </div>
                            {/* Upload result */}
                            {uploadedImageUrl && (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-emerald-400">Image saved to template!</p>
                                        <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-500 hover:text-cyan-400 truncate block">{uploadedImageUrl}</a>
                                    </div>
                                </div>
                            )}
                            {imageUploadStatus === "error" && (
                                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                    <span>{imageUploadMsg}</span>
                                </div>
                            )}
                            {imageUploadStatus === "success" && (
                                <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                    <span>{imageUploadMsg}</span>
                                </div>
                            )}
                            <button
                                onClick={handleImageUpload}
                                disabled={!imageFile || !selectedSlug || imageUploading}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ background: "linear-gradient(135deg, #e6b422, #c9a227)", color: "#0a0a0f" }}
                            >
                                {imageUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                                {imageUploading ? "Processing..." : "Process & Upload Image"}
                            </button>
                        </div>
                        {/* ── JSON UPLOAD SECTION ── */}
                        <div
                            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files?.[0]; if (file) processFile(file); }}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            className={`relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${isDragging ? "border-cyan-400/60 bg-cyan-400/5"
                                : uploadedFileName ? "border-emerald-400/40 bg-emerald-400/5"
                                    : "border-white/15 hover:border-white/30"
                                }`}
                        >
                            <input
                                type="file"
                                accept=".json"
                                onChange={(e) => { const file = e.target.files?.[0]; if (file) processFile(file); }}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {uploadedFileName ? (
                                <div className="flex flex-col items-center gap-2">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                    <p className="text-sm font-bold text-emerald-400">{uploadedFileName}</p>
                                    <p className="text-xs text-gray-500">{parsedJson?.nodes?.length || 0} nodes detected</p>
                                    <button onClick={(e) => { e.stopPropagation(); clearUpload(); }} className="text-[10px] text-gray-500 hover:text-red-400 flex items-center gap-1">
                                        <X className="w-3 h-3" /> Clear
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3 pointer-events-none">
                                    <CloudUpload className={`w-8 h-8 ${isDragging ? "text-cyan-400" : "text-gray-600"}`} />
                                    <p className="text-sm font-bold text-white">Drag and drop n8n JSON file</p>
                                    <p className="text-xs text-gray-500">or click to browse · .json files only</p>
                                </div>
                            )}
                        </div>

                        {/* Paste JSON */}
                        <div className="rounded-xl p-4 border border-white/8 space-y-3" style={{ background: "rgba(10,12,25,0.6)" }}>
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Or Paste JSON Directly</label>
                            <textarea
                                value={jsonInput}
                                onChange={(e) => { setJsonInput(e.target.value); setParsedJson(null); setSaveStatus(""); }}
                                placeholder='{"name": "My Workflow", "nodes": [...], "connections": {...}}'
                                rows={6}
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
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Eye className="w-3.5 h-3.5" /> Parse and Preview
                            </button>
                            <button
                                onClick={handleSaveWorkflow}
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
                            {(parsedJson || instantPreviewImage) && <span className="text-[10px] text-emerald-400 font-semibold">{instantPreviewImage ? "Image" : parsedJson?.nodes?.length || 0} {instantPreviewImage ? "" : "nodes"}</span>}
                        </div>

                        {instantPreviewImage ? (
                            <div className="rounded-xl overflow-hidden border border-emerald-500/15">
                                <img src={instantPreviewImage} alt="Processed workflow" className="w-full h-auto" />
                            </div>
                        ) : parsedJson ? (
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
                                {selectedTemplate && (
                                    <p className="text-[10px] text-gray-600 text-center">
                                        Targeting: <span className="text-gray-400 font-semibold">{selectedTemplate.name}</span>
                                    </p>
                                )}
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

            {/* Add/Edit Form Modal */}
            {showForm && (
                <AdminTemplateForm
                    template={editingTemplate ?? undefined}
                    onClose={() => { setShowForm(false); setEditingTemplate(null); }}
                    onSaved={fetchTemplates}
                />
            )}

            {/* Canvas Preview Modal */}
            {canvasPreviewSlug && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div
                        className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
                        style={{ background: "#0d0d1a", border: "1px solid rgba(0,255,200,0.15)" }}
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                            <h3 className="text-sm font-bold text-white">
                                Live Canvas — {templates.find((t) => t.slug === canvasPreviewSlug)?.name}
                            </h3>
                            <button
                                onClick={() => setCanvasPreviewSlug(null)}
                                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <WorkflowCanvas slug={canvasPreviewSlug} />
                    </div>
                </div>
            )}
        </div>
    );
}
