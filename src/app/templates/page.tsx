"use client";
import React, { useState } from "react";
import type { Metadata } from "next";
import { Zap, Clock, Users, ArrowRight, CheckCircle2, Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { publishedTemplates as allTemplates } from "@/data/templates";
import N8nCanvas from "@/components/templates/N8nCanvas";

const CATEGORIES = [
  { id: "all", label: "All Templates", icon: "🏠" },
  { id: "real-estate", label: "Real Estate", icon: "🏢" },
  { id: "lead-gen", label: "Lead Generation", icon: "🎯" },
  { id: "marketing", label: "Marketing", icon: "📣" },
  { id: "sales", label: "Sales Ops", icon: "💰" },
  { id: "ai", label: "AI & Agents", icon: "🤖" },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = allTemplates.filter((t) => {
    const matchesCategory = activeCategory === "all" || t.categories.some(c => c.toLowerCase().includes(activeCategory.toLowerCase()));
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050510] text-white pt-24 pb-20">
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
          <div className="relative max-w-2xl mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search 100+ automation templates..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-1">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 px-3">Categories</h3>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${activeCategory === cat.id
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

          {/* Content Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 gap-12">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <div key={template.id} className="group relative">
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">

                      {/* Left: Info (2 cols) */}
                      <div className="xl:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                          {template.categories.map(c => (
                            <span key={c} className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{c}</span>
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
                          {template.whatItDoes.slice(0, 3).map((item, i) => (
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

                      {/* Right: Canvas (3 cols) */}
                      <div className="xl:col-span-3">
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 group-hover:border-cyan-500/30 transition-all shadow-2xl">
                          <N8nCanvas
                            workflowJson={template.workflowJson}
                            height={380}
                            className="scale-105 group-hover:scale-100 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-40" />
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
          </main>

        </div>
      </div>
    </div>
  );
}
