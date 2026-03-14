import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui";
import { getBlogPosts, getPageSEO, getSiteConfig } from "@/lib/supabase-data";
import BlogContent from "@/components/blog/BlogContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    const [seo, site] = await Promise.all([
        getPageSEO("/blog"),
        getSiteConfig(),
    ]);

    const title = `Blog & Insights | ${site.name}`;
    const description = "Expert insights on AI automation, workflow engineering, and scaling your business with intelligent systems.";

    return {
        title,
        description,
        alternates: {
            canonical: `${site.url}/blog`,
        },
        openGraph: {
            title,
            description,
            url: `${site.url}/blog`,
            type: "website",
            images: [{ url: seo.ogImage, width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [seo.ogImage],
        },
    };
}

export default async function Blog() {
    const [posts, site] = await Promise.all([
        getBlogPosts(),
        getSiteConfig(),
    ]);

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set((posts as any[]).map((p) => p.category).filter(Boolean)))];

    // Blog listing structured data
    const blogListJsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": `${site.name} Blog`,
        "description": "Expert insights on AI automation, workflow engineering, and scaling your business.",
        "url": `${site.url}/blog`,
        "publisher": {
            "@type": "Organization",
            "name": site.name,
            "url": site.url,
        },
        "blogPost": (posts as any[]).slice(0, 10).map((p) => ({
            "@type": "BlogPosting",
            "headline": p.title,
            "url": `${site.url}/blog/${p.slug}`,
            "description": p.excerpt || "",
            "datePublished": p.date,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
            />

            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-neutral-800/50 via-neutral-950 to-neutral-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-brand-coral border border-gold-400/20 rounded-full bg-gold-400/5">
                            Blog
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            Insights & <span className="text-brand-coral font-bold">Resources</span>
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

            <BlogContent posts={posts as any} categories={categories} />
        </>
    );
}
