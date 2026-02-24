import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal, SectionHeader, Card } from "@/components/ui";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { getBlogPosts, getPageSEO } from "@/lib/supabase-data";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSEO("/blog");
    return {
        title: seo.title,
        description: seo.description,
        openGraph: {
            title: seo.title,
            description: seo.description,
            images: [{ url: seo.ogImage }],
        },
    };
}

export default async function Blog() {
    const posts = await getBlogPosts();

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(posts.map(p => p.category)))];

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            Blog
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            Insights & <span className="gold-text">Resources</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400">
                            Expert insights on AI automation, workflow engineering, and
                            scaling your business with intelligent systems.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-6 border-b border-white/5 sticky top-16 lg:top-20 z-30 bg-navy-950/80 backdrop-blur-xl">
                <div className="container-max px-4 sm:px-6">
                    <div className="flex gap-2 overflow-x-auto scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ${cat === "All"
                                    ? "gold-gradient text-navy-950"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-white/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="section-padding pb-10">
                <div className="container-max">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {posts
                            .filter((p) => p.featured)
                            .map((post, i) => (
                                <ScrollReveal key={post.slug} delay={i * 0.1}>
                                    <Link href={`/blog/${post.slug}`}>
                                        <Card className="h-full group cursor-pointer">
                                            <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-navy-700 to-navy-800 mb-6 flex items-center justify-center overflow-hidden">
                                                <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
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
                                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
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

            {/* All Posts */}
            <section className="section-padding pt-10">
                <div className="container-max">
                    <h2 className="text-2xl font-display font-bold mb-8">
                        Latest Articles
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts
                            .filter((p) => !p.featured)
                            .map((post, i) => (
                                <ScrollReveal key={post.slug} delay={i * 0.05}>
                                    <Link href={`/blog/${post.slug}`}>
                                        <Card className="h-full group cursor-pointer">
                                            <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-navy-700 to-navy-800 mb-4 flex items-center justify-center">
                                                <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
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
                                            <h3 className="text-lg font-display font-bold mb-2 group-hover:text-gold-400 transition-colors leading-tight">
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
                </div>
            </section>
        </>
    );
}

