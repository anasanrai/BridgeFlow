"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, Card } from "@/components/ui";
import { ArrowRight, Clock, Tag } from "lucide-react";

interface Post {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime?: string;
    image_url?: string;
    featured: boolean;
}

interface BlogContentProps {
    posts: Post[];
    categories: string[];
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredPosts = posts.filter(
        (post) => activeCategory === "All" || post.category === activeCategory
    );

    const featuredPosts = filteredPosts.filter((p) => p.featured);
    const regularPosts = filteredPosts.filter((p) => !p.featured);

    return (
        <>
            {/* Category Filter */}
            <section className="py-6 border-b border-white/5 sticky top-16 lg:top-20 z-40 bg-navy-950/80 backdrop-blur-xl">
                <div className="container-max px-4 sm:px-6">
                    <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300 border ${activeCategory === cat
                                    ? "gold-gradient text-navy-950 border-transparent shadow-lg shadow-gold-400/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border-white/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Featured Posts */}
                    {featuredPosts.length > 0 && (
                        <section className="section-padding pb-10">
                            <div className="container-max">
                                <div className="grid lg:grid-cols-2 gap-6">
                                    {featuredPosts.map((post, i) => (
                                        <ScrollReveal key={post.slug} delay={i * 0.1}>
                                            <Link href={`/blog/${post.slug}`}>
                                                <Card className="h-full group cursor-pointer transition-all duration-500 hover:border-gold-400/30">
                                                    <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-navy-700 to-navy-800 mb-6 flex items-center justify-center overflow-hidden relative">
                                                        {post.image_url ? (
                                                            <img
                                                                src={post.image_url}
                                                                alt={post.title}
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                                onError={(e) => (e.currentTarget.style.display = 'none')}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full gold-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                                                        )}
                                                        <div className="absolute inset-0 bg-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                        <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-2xl">
                                                            <span className="text-2xl font-display font-bold text-navy-950">
                                                                BF
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="px-3 py-1 text-xs font-semibold text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                                                            {post.category}
                                                        </span>
                                                        {post.readTime && (
                                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {post.readTime}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h2 className="text-xl font-display font-bold mb-2 group-hover:text-gold-400 transition-colors">
                                                        {post.title}
                                                    </h2>
                                                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-sm font-semibold text-gold-400 group-hover:gap-2 transition-all">
                                                        Read Article
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </Card>
                                            </Link>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Latest Articles */}
                    <section className="section-padding pt-10">
                        <div className="container-max">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-display font-bold">
                                    {activeCategory === "All" ? "Latest Articles" : `${activeCategory} Articles`}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {regularPosts.length} {regularPosts.length === 1 ? 'post' : 'posts'} found
                                </span>
                            </div>

                            {regularPosts.length > 0 ? (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {regularPosts.map((post, i) => (
                                        <ScrollReveal key={post.slug} delay={i * 0.05}>
                                            <Link href={`/blog/${post.slug}`}>
                                                <Card className="h-full group cursor-pointer hover:border-gold-400/30 transition-all duration-300">
                                                    <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-navy-700 to-navy-800 mb-4 flex items-center justify-center overflow-hidden relative">
                                                        {post.image_url ? (
                                                            <img
                                                                src={post.image_url}
                                                                alt={post.title}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                onError={(e) => (e.currentTarget.style.display = 'none')}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full gold-gradient opacity-10" />
                                                        )}
                                                        <div className="absolute inset-0 bg-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-xl">
                                                            <span className="text-sm font-display font-bold text-navy-950">
                                                                BF
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="px-2 py-0.5 text-[10px] font-semibold text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                                                            {post.category}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {post.date}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-display font-bold mb-2 group-hover:text-gold-400 transition-colors leading-tight line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                </Card>
                                            </Link>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            ) : featuredPosts.length === 0 ? (
                                <div className="text-center py-20 glass rounded-3xl border border-dashed border-white/10">
                                    <Tag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-display font-bold text-white mb-2">No posts found</h3>
                                    <p className="text-gray-400">We haven't published any articles in the "{activeCategory}" category yet.</p>
                                    <button
                                        onClick={() => setActiveCategory("All")}
                                        className="mt-6 text-gold-400 font-semibold hover:underline"
                                    >
                                        Back to all posts
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>
        </>
    );
}
