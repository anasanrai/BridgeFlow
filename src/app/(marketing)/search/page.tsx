"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search as SearchIcon, FileText, FolderOpen, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { ScrollReveal, Card } from "@/components/ui";

interface SearchItem {
    title: string;
    href: string;
    excerpt?: string;
    type: string;
}

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<SearchItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [allItems, setAllItems] = useState<SearchItem[]>([]);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/search");
                if (res.ok) {
                    const data = await res.json();
                    setAllItems(data);
                }
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        };
        loadItems();
    }, []);

    useEffect(() => {
        if (!query || allItems.length === 0) {
            setResults([]);
            return;
        }

        const performSearch = async () => {
            const { default: Fuse } = await import("fuse.js");
            const fuse = new Fuse(allItems, {
                keys: ["title", "excerpt"],
                threshold: 0.4,
                distance: 100,
            });
            const searchResults = fuse.search(query);
            setResults(searchResults.map(r => r.item));
        };

        performSearch();
    }, [query, allItems]);

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="container-max px-4">
                <ScrollReveal>
                    <div className="max-w-3xl mx-auto mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Search <span className="gold-text">BridgeFlow</span>
                        </h1>
                        <div className="relative max-w-2xl mx-auto">
                            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gold-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search articles, case studies, technologies..."
                                className="w-full pl-14 pr-6 py-5 bg-navy-900/50 border border-white/10 rounded-2xl text-white text-xl focus:outline-none focus:border-gold-400/50 transition-all card-glow"
                                autoFocus
                            />
                        </div>
                    </div>
                </ScrollReveal>

                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                            <Loader2 className="w-12 h-12 animate-spin mb-4 text-gold-400" />
                            <p className="text-lg font-medium">Searching the knowledge base...</p>
                        </div>
                    ) : query.length > 0 ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h2 className="text-gray-400 font-medium">
                                    Found <span className="text-white font-bold">{results.length}</span> results for &quot;<span className="text-white">{query}</span>&quot;
                                </h2>
                                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
                                    <Sparkles className="w-3 h-3 text-gold-400" />
                                    AI-Powered Search
                                </div>
                            </div>

                            {results.length > 0 ? (
                                <div className="grid gap-4">
                                    {results.map((result, idx) => (
                                        <ScrollReveal key={result.href} delay={idx * 0.05}>
                                            <Link href={result.href}>
                                                <Card className="p-6 hover:border-gold-400/30 transition-all group relative overflow-hidden">
                                                    <div className="flex items-start gap-6">
                                                        <div className="w-12 h-12 rounded-xl bg-navy-800 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-gold-400 group-hover:border-gold-400/20 transition-all">
                                                            {result.type === "blog" ? (
                                                                <FileText className="w-6 h-6" />
                                                            ) : (
                                                                <FolderOpen className="w-6 h-6" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400/60">
                                                                    {result.type}
                                                                </span>
                                                            </div>
                                                            <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors mb-2">
                                                                {result.title}
                                                            </h3>
                                                            <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed">
                                                                {result.excerpt}
                                                            </p>
                                                        </div>
                                                        <div className="self-center">
                                                            <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-gray-600 group-hover:text-gold-400 group-hover:border-gold-400/20 group-hover:bg-gold-400/5 transition-all">
                                                                <ArrowRight className="w-5 h-5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-24 glass rounded-3xl border border-dashed border-white/10">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                                        <SearchIcon className="w-10 h-10 text-gray-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">No matches found</h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        We couldn&apos;t find any results for &quot;{query}&quot;. Try using different keywords or check your spelling.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-24 text-gray-500">
                            <p className="text-lg">Start typing to search the BridgeFlow ecosystem.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-gold-400" />
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
