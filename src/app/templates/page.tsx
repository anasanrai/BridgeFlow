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

const difficultyColors: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: "bg-green-900/50", text: "text-green-400", border: "border-green-800" },
  Intermediate: { bg: "bg-yellow-900/50", text: "text-yellow-400", border: "border-yellow-800" },
  Advanced: { bg: "bg-purple-900/50", text: "text-purple-400", border: "border-purple-800" },
};

export default function TemplatesPage() {
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
    const matchesDifficulty =
      activeDifficulty === "all" ||
      t.difficulty?.toLowerCase() === activeDifficulty.toLowerCase();
    const matchesSearch =
      (t.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero Section - Left Aligned */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Real Estate Automation Templates
          </h1>
          <p className="text-lg md:text-xl text-[#a1a1aa] mb-8">
            Built on n8n. Ready in minutes.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1aa]" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#121212] border border-[#27272a] text-white placeholder-[#a1a1aa] focus:outline-none focus:border-[#f97316] transition-all text-sm"
            />
          </div>

          {/* Difficulty Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveDifficulty(filter.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeDifficulty === filter.id
                    ? "bg-[#f97316] text-white border border-[#f97316]"
                    : "bg-black text-[#a1a1aa] border border-[#27272a] hover:text-white hover:border-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#27272a] mb-12"></div>

        {/* Template Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-[#f97316] animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredTemplates || []).length > 0 ? (
                filteredTemplates.map((template) => {
                  const badgeStyle = difficultyColors[template.difficulty] || difficultyColors.Beginner;
                  return (
                    <a
                      key={template.id}
                      href={`/templates/${template.slug}`}
                      className="group block bg-[#121212] rounded-xl overflow-hidden border border-[#27272a] hover:border-[#52525b] transition-all"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-[#1a1a1a] overflow-hidden">
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
                            <div className="w-16 h-16 rounded-lg bg-[#27272a] flex items-center justify-center">
                              <Zap className="w-8 h-8 text-[#f97316]" />
                            </div>
                          </div>
                        )}
                        {/* Difficulty Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                            {template.difficulty || "Beginner"}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#f97316] transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-sm text-[#a1a1aa] mb-4 line-clamp-2">
                          {template.description}
                        </p>

                        {/* Divider */}
                        <div className="border-t border-[#27272a] mb-3"></div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#a1a1aa]">
                            {template.nodeCount} nodes
                          </span>
                          <span className="text-base font-bold text-[#f97316]">
                            ${template.value}
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#121212] mb-4">
                    <Search className="w-8 h-8 text-[#52525b]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
                  <p className="text-[#a1a1aa] mb-4">Try adjusting your search or filters</p>
                  <button
                    onClick={() => { setActiveDifficulty("all"); setSearchQuery(""); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#f97316] border border-[#f97316]/20 rounded-full hover:bg-[#f97316]/10 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Footer Note */}
            {(filteredTemplates || []).length > 0 && (
              <div className="text-center mt-12 pt-8 border-t border-[#27272a]">
                <p className="text-sm text-[#a1a1aa]">
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
