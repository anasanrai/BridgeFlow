"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, FileText, FolderOpen, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllSearchItems } from "@/lib/supabase-data";
import Link from "next/link";

interface SearchItem {
    title: string;
    slug: string;
    excerpt: string;
    type: "blog" | "case-study";
    url: string;
}

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [items, setItems] = useState<SearchItem[]>([]);
    const [results, setResults] = useState<SearchItem[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load data on first open
    useEffect(() => {
        if (isOpen && items.length === 0) {
            setLoading(true);
            getAllSearchItems().then(data => {
                setItems(data);
                setLoading(false);
            });
        }
    }, [isOpen, items.length]);

    // Handle search logic
    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        import("fuse.js").then(({ default: Fuse }) => {
            const fuse = new Fuse(items, {
                keys: ["title", "excerpt"],
                threshold: 0.4,
                distance: 100,
            });
            const searchResults = fuse.search(query);
            setResults(searchResults.map(r => r.item).slice(0, 8));
        });
    }, [query, items]);

    // Keyboard shortcut (Cmd+K or Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-400 hover:text-gold-400 hover:bg-white/5 rounded-lg transition-all duration-200 group"
                title="Search (Cmd+K)"
            >
                <SearchIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:px-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-2xl bg-navy-900/90 border border-white/10 rounded-2xl shadow-2xl shadow-gold-400/10 overflow-hidden"
                        >
                            <div className="p-4 border-b border-white/5 flex items-center gap-3">
                                <SearchIcon className="w-5 h-5 text-gold-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search articles, case studies, technologies..."
                                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-lg"
                                />
                                {loading ? (
                                    <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-sans font-medium text-gray-500 border border-white/10 rounded bg-white/5 uppercase">
                                            ESC
                                        </kbd>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-1 text-gray-500 hover:text-white transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                                {query.length < 2 ? (
                                    <div className="py-12 text-center text-gray-500">
                                        <SearchIcon className="w-12 h-12 mx-auto mb-3 opacity-10" />
                                        <p>Type at least 2 characters to search...</p>
                                    </div>
                                ) : results.length > 0 ? (
                                    <div className="space-y-1">
                                        {results.map((result) => (
                                            <Link
                                                key={result.url}
                                                href={result.url}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group"
                                            >
                                                <div className="mt-1 w-8 h-8 rounded-lg bg-navy-800 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-gold-400 group-hover:border-gold-400/20 transition-colors">
                                                    {result.type === "blog" ? (
                                                        <FileText className="w-4 h-4" />
                                                    ) : (
                                                        <FolderOpen className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-white group-hover:text-gold-400 transition-colors truncate">
                                                        {result.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                                        {result.excerpt}
                                                    </p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-gray-700 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all self-center" />
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center text-gray-500">
                                        <p>No results found for &quot;<span className="text-white">{query}</span>&quot;</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-3 bg-navy-950/50 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest font-medium">
                                <span>{results.length} Results</span>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 border border-white/10 rounded">↑↓</kbd> Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 border border-white/10 rounded">Enter</kbd> Select
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
