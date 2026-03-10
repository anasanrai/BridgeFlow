"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Zap, Clock, Search, Loader2 } from "lucide-react";

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
  longDescription?: string;
  whatItDoes: string[];
  featured: boolean;
  status: string;
  imageUrl?: string | null;
  workflowJson?: Record<string, unknown> | null;
}

const DIFFICULTY_FILTERS = [
  { id: "all", label: "All" },
  { id: "Beginner", label: "Beginner" },
  { id: "Intermediate", label: "Intermediate" },
  { id: "Advanced", label: "Advanced" },
];

const CATEGORIES = [
  { id: "all", label: "All Templates", icon: "🏠" },
  { id: "Real Estate", label: "Real Estate", icon: "🏢" },
  { id: "Lead Management", label: "Lead Generation", icon: "🎯" },
  { id: "Marketing", label: "Marketing", icon: "📣" },
  { id: "AI-Powered", label: "AI & Agents", icon: "🤖" },
  { id: "Communication", label: "Communication", icon: "💬" },
  { id: "Operations", label: "Operations", icon: "⚙️" },
];

const difficultyColors: Record<string, string> = {
  Beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Advanced: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = useCallback(() => {
    fetch(`/api/templates?t=${Date.now()}`)
      .then((r) => r.json())
      .then(({ templates: data }) => {
        setTemplates(data || []);
      })
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Refresh templates every 30 seconds to catch updates from admin panel
  useEffect(() => {
    const interval = setInterval(fetchTemplates, 30000);
    return () => clearInterval(interval);
  }, [fetchTemplates]);

  const filteredTemplates = templates.filter((t) => {
    const matchesCategory =
      activeCategory === "all" ||
      (t.categories || []).some(
        (c) => c.toLowerCase() === activeCategory.toLowerCase()
      );
    const matchesDifficulty =
      activeDifficulty === "all" ||
      t.difficulty?.toLowerCase() === activeDifficulty.toLowerCase();
    const matchesSearch =
      (t.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-20">
      <div className="container-max px-4 sm:px-6 lg:px-8">

        {/* Hero Section - Figma Style */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Real Estate Automation Templates
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Built on n8n. Ready in minutes.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-navy-800 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400/50 transition-all text-sm"
            />
          </div>

          {/* Difficulty Filter Tabs - Figma Style */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {DIFFICULTY_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveDifficulty(filter.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeDifficulty === filter.id
                    ? "bg-gold-500 text-navy-950"
                    : "bg-navy-800 text-gray-400 hover:text-white hover:bg-navy-700 border border-white/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-gold-500/20 text-gold-400 border border-gold-400/30"
                    : "bg-navy-800 text-gray-400 border border-white/10 hover:text-white"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 py-6 border-y border-white/5">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gold-400 font-bold">{loading ? "..." : templates.length}</span>
            <span className="text-gray-500">templates</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gold-400 font-bold">100%</span>
            <span className="text-gray-500">ready to deploy</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gold-400 font-bold">Lifetime</span>
            <span className="text-gray-500">support included</span>
          </div>
        </div>

        {/* Template Grid - Figma Style Card Layout */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredTemplates || []).length > 0 ? (
                filteredTemplates.map((template) => (
                  <a
                    key={template.id}
                    href={`/templates/${template.slug}`}
                    className="group block bg-navy-800 rounded-2xl overflow-hidden border border-white/10 hover:border-gold-400/30 transition-all hover:shadow-lg hover:shadow-gold-500/10"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-navy-900 overflow-hidden">
                      {template.imageUrl ? (
                        <Image
                          src={template.imageUrl}
                          alt={template.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-2xl bg-navy-700 flex items-center justify-center">
                            <Zap className="w-10 h-10 text-gold-400" />
                          </div>
                        </div>
                      )}
                      {/* Difficulty Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyColors[template.difficulty] || difficultyColors.Beginner}`}>
                          {template.difficulty || "Beginner"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {template.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" />
                            {template.nodeCount} nodes
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {template.setupTime}
                          </span>
                        </div>
                        <span className="text-gold-400 font-bold text-lg">
                          ${template.value}
                        </span>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy-800 mb-4">
                    <Search className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                  <button
                    onClick={() => { setActiveCategory("all"); setActiveDifficulty("all"); setSearchQuery(""); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gold-400 border border-gold-400/20 rounded-full hover:bg-gold-400/10 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Footer Note */}
            {(filteredTemplates || []).length > 0 && (
              <div className="text-center mt-12 pt-8 border-t border-white/5">
                <p className="text-sm text-gray-500">
                  All templates include JSON file + setup guide
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
