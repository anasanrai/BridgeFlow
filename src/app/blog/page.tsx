export const dynamic = "force-dynamic";
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

import BlogContent from "@/components/blog/BlogContent";

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

            <BlogContent posts={posts} categories={categories} />
        </>
    );
}

