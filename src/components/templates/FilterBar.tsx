"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
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
                className="sticky top-[64px] lg:top-[80px] z-30 py-4 mb-10"
                style={{ background: "rgba(5,5,16,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        {/* Category pills */}
                        <div className="flex flex-wrap gap-2 flex-1">
                            {templateCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 whitespace-nowrap ${activeCategory === cat
                                        ? "text-navy-950 border-gold-400"
                                        : "bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                                        }`}
                                    style={activeCategory === cat
                                        ? { background: "linear-gradient(135deg, #e6b422 0%, #c9a227 100%)" }
                                        : {}}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Sort + Search */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                                    className="pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-white/10 text-gray-300 focus:outline-none focus:border-gold-400/40 transition-all"
                                    style={{ background: "rgba(12,12,28,0.9)" }}
                                >
                                    <option value="newest">Newest</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="value">Highest Value</option>
                                </select>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 pr-4 py-2 text-xs rounded-xl border border-white/10 text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-gold-400/40 transition-all w-44"
                                    style={{ background: "rgba(12,12,28,0.9)" }}
                                />
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
