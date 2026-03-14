"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown, ArrowRight, Zap } from "lucide-react";
import { templates as allTemplates, templateCategories, TemplateCategory, Template } from "@/data/templates";
import TemplateCard from "./TemplateCard";

type SortOrder = "newest" | "popular" | "value";

export default function FilterBar() {
    const [activeCategory, setActiveCategory] = useState<TemplateCategory>("All");
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
    const [search, setSearch] = useState("");

    const filtered: Template[] = useMemo(() => {
        let result = allTemplates;

        // Category filter
        if (activeCategory !== "All") {
            result = result.filter((t) => t.categories.includes(activeCategory));
        }

        // Search filter
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (t) =>
                    t.name.toLowerCase().includes(q) ||
                    t.description.toLowerCase().includes(q) ||
                    t.nodes.some((n) => n.toLowerCase().includes(q)) ||
                    t.categories.some((c) => c.toLowerCase().includes(q))
            );
        }

        // Sort
        if (sortOrder === "popular") {
            result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        } else if (sortOrder === "value") {
            result = [...result].sort((a, b) => b.value - a.value);
        }
        // "newest" keeps insertion order (id ascending)

        return result;
    }, [activeCategory, sortOrder, search]);

    return (
        <div>
            {/* ── Sticky filter bar ──────────────────────────────── */}
            <div
                className="sticky top-[64px] lg:top-[80px] z-30 py-6 mb-12 border-b border-white/5"
                style={{ background: "rgba(5,7,18,0.8)", backdropFilter: "blur(12px)" }}
            >
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        {/* Category pills */}
                        <div className="flex flex-wrap gap-2.5">
                            {templateCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                                        ? "text-neutral-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                                        }`}
                                    style={activeCategory === cat
                                        ? { background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" }
                                        : {}}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Sort + Search */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                            <div className="relative w-full sm:w-44">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by node or industry..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 text-[11px] font-medium rounded-xl border border-white/10 text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-all bg-neutral-900/50"
                                />
                            </div>

                            <div className="relative w-full sm:w-auto">
                                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                                    className="w-full pl-9 pr-10 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-xl border border-white/10 text-gray-300 focus:outline-none focus:border-cyan-400/40 transition-all bg-neutral-900/50 appearance-none cursor-pointer"
                                >
                                    <option value="newest">Latest</option>
                                    <option value="popular">Popular</option>
                                    <option value="value">Top Value</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Template cards grid ────────────────────────────── */}
            <div className="container-max px-4 sm:px-6 lg:px-8">
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-gray-500">
                        <p className="text-4xl mb-4">🔍</p>
                        <p className="text-lg font-semibold text-gray-400">No templates found</p>
                        <p className="text-sm mt-2">Try a different search or category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((template, i) => (
                            <div
                                key={template.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "both" }}
                            >
                                <TemplateCard template={template} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
