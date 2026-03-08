"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Zap, Clock, ArrowRight, CheckCircle2, Search, SlidersHorizontal, ChevronRight, Loader2 } from "lucide-react";
import N8nCanvas from "@/components/templates/N8nCanvas";

interface Template {
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
  whatItDoes: string[];
  featured: boolean;
  status: string;
  imageUrl?: string | null;
  workflowJson?: Record<string, unknown> | null;
}

const CATEGORIES = [
  { id: "all", label: "All Templates", icon: "🏠" },
  { id: "Real Estate", label: "Real Estate", icon: "🏢" },
  { id: "Lead Management", label: "Lead Generation", icon: "🎯" },
  { id: "Marketing", label: "Marketing", icon: "📣" },
  { id: "Sales", label: "Sales Ops", icon: "💰" },
  { id: "AI-Powered", label: "AI & Agents", icon: "🤖" },
  { id: "E-Commerce", label: "E-Commerce", icon: "🛒" },
  { id: "CRM", label: "CRM", icon: "🤝" },
  { id: "Communication", label: "Communication", icon: "💬" },
  { id: "Operations", label: "Operations", icon: "⚙️" },
  { id: "Customer Support", label: "Customer Support", icon: "🎧" },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then(({ templates: data }) => {
        setTemplates(data || []);
      })
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredTemplates = templates.filter((t) => {
    const matchesCategory =
      activeCategory === "all" ||
      t.categories.some(
        (c) => c.toLowerCase() === activeCategory.toLowerCase()
      );
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-20">
      <div className="container-max px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Zap className="w-3 h-3 fill-cyan-400" />
                n8n Workflow Marketplace
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight">
                Automate your <br />
                <span className="gold-text">business patterns.</span>
              </h1>
            </div>
            <div className="max-w-md text-gray-400 text-sm leading-relaxed">
              Stop building from scratch. Every template includes the full n8n workflow JSON,
              setup documentation, and lifetime support — ready to deploy in minutes.
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap gap-6 mb-10 py-4 border-y border-white/5">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-white font-bold">{loading ? "..." : templates.length}</span> templates available
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-white font-bold">100%</span> ready to deploy
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-white font-bold">Lifetime</span> support included
          </div>
        </div>

        {/* Main Layout: Sidebar + Grid */}
        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28 space-y-1">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-3">Categories</p>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${
                    activeCategory === cat.id
                      ? "bg-white/10 text-white font-bold"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">{cat.icon}</span>
                    {cat.label}
                  </span>
                  {activeCategory === cat.id && <ChevronRight className="w-4 h-4 text-cyan-400" />}
                </button>
              ))}
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 min-w-0">

            {/* Mobile Category Pills */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-12">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <div key={template.id} className="group relative">
                      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">

                        {/* Left: Info (2 cols) */}
                        <div className="xl:col-span-2 space-y-6">
                          <div className="flex items-center gap-3 flex-wrap">
                            {template.categories.map((c) => (
                              <span key={c} className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                                {c}
                              </span>
                            ))}
                          </div>
                          <h2 className="text-2xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {template.name}
                          </h2>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {template.description}
                          </p>
                          <div className="flex flex-wrap gap-4 py-4 border-y border-white/5">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-300">{template.setupTime} setup</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-gray-500" />
                              <span className="text-xs text-gray-300">{template.difficulty}</span>
                            </div>
                          </div>
                          <ul className="space-y-3">
                            {(template.whatItDoes || []).slice(0, 3).map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs text-gray-400">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="pt-4">
                            <a
                              href={`/templates/${template.slug}`}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-navy-950 text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all"
                            >
                              Get Template
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>

                        {/* Right: Image or Canvas (3 cols) */}
                        <div className="xl:col-span-3">
                          <div className="relative rounded-3xl overflow-hidden border border-white/10 group-hover:border-cyan-500/30 transition-all shadow-2xl">
                            {template.imageUrl ? (
                              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                                <Image
                                  src={template.imageUrl}
                                  alt={template.name}
                                  fill
                                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                  sizes="(max-width: 768px) 100vw, 60vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-40" />
                              </div>
                            ) : (
                              <>
                                <N8nCanvas
                                  workflowJson={template.workflowJson}
                                  height={380}
                                  className="scale-105 group-hover:scale-100 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-40" />
                              </>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 glass rounded-3xl border border-white/10">
                    <SlidersHorizontal className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
                    <p className="text-gray-500">Try adjusting your search or category filters.</p>
                  </div>
                )}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
