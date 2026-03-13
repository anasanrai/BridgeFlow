import type { Metadata } from "next";
import { getBlogPost, getSiteConfig } from "@/lib/supabase-data";
import { ScrollReveal, Card } from "@/components/ui";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const [post, site] = await Promise.all([
        getBlogPost(params.slug),
        getSiteConfig(),
    ]);

    if (!post) {
        return {
            title: `Post Not Found | ${site.name}`,
            description: "The requested blog post could not be found.",
        };
    }

    const title = post.seo_title || `${post.title} | ${site.name} Blog`;
    const description = post.seo_description || post.excerpt || site.description;
    const ogImage = post.og_image || post.image_url || site.og_image || "/images/og-default.png";

    return {
        title,
        description,
        alternates: {
            canonical: `${site.url}/blog/${params.slug}`,
        },
        openGraph: {
            title: post.seo_title || post.title,
            description,
            url: `${site.url}/blog/${params.slug}`,
            type: "article",
            publishedTime: post.created_at,
            modifiedTime: post.updated_at || post.created_at,
            authors: ["Anasan Rai"],
            tags: post.tags || [],
            images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.seo_title || post.title,
            description,
            images: [ogImage],
        },
    };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const [post, site] = await Promise.all([
        getBlogPost(params.slug),
        getSiteConfig(),
    ]);

    if (!post) {
        notFound();
    }

    const publishedDate = post.created_at
        ? new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;

    // Article structured data
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt || "",
        "url": `${site.url}/blog/${params.slug}`,
        "datePublished": post.created_at,
        "dateModified": post.updated_at || post.created_at,
        "author": {
            "@type": "Person",
            "name": "Anasan Rai",
            "url": `${site.url}/about`,
            "jobTitle": "Founder & AI Automation Engineer",
        },
        "publisher": {
            "@type": "Organization",
            "name": site.name,
            "url": site.url,
            "logo": {
                "@type": "ImageObject",
                "url": `${site.url}${site.logo}`,
            },
        },
        "image": post.image_url || `${site.url}/images/og-default.png`,
        "articleSection": post.category || "AI Automation",
        "keywords": post.tags?.join(", ") || "AI automation, workflow automation",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${site.url}/blog/${params.slug}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />

            <section className="relative pt-32 pb-12 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max px-4 sm:px-6">
                    <ScrollReveal>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>
                    </ScrollReveal>

                    <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-center">
                        <ScrollReveal delay={0.1}>
                            <div className="max-w-3xl">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    {post.category && (
                                        <span className="px-3 py-1 text-xs font-semibold text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                                            {post.category}
                                        </span>
                                    )}
                                    {post.read_time && (
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.read_time}
                                        </span>
                                    )}
                                    {publishedDate && (
                                        <time
                                            dateTime={post.created_at}
                                            className="text-sm text-gray-500 flex items-center gap-1"
                                        >
                                            <Calendar className="w-3 h-3" />
                                            {publishedDate}
                                        </time>
                                    )}
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight">
                                    {post.title}
                                </h1>
                                {post.excerpt && (
                                    <p className="mt-6 text-xl text-gray-400 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                )}
                            </div>
                        </ScrollReveal>

                        {post.image_url && (
                            <ScrollReveal delay={0.2}>
                                <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                    <Image
                                        src={post.image_url}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 400px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </section>

            <section className="section-padding pt-8">
                <div className="container-max">
                    <div className="max-w-3xl">
                        <ScrollReveal>
                            <article className="prose prose-invert prose-lg max-w-none">
                                {Array.isArray(post.content) && post.content.map((paragraph: string, i: number) => (
                                    <p
                                        key={i}
                                        className="text-gray-300 leading-relaxed mb-6 text-lg"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </article>
                        </ScrollReveal>

                        {/* Author Card */}
                        <ScrollReveal>
                            <Card hover={false} className="mt-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-navy-950 font-bold flex-shrink-0">
                                        AR
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Anasan Rai</div>
                                        <div className="text-sm text-gray-400">
                                            Founder & AI Automation Engineer at BridgeFlow
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Back to Blog */}
                        <ScrollReveal>
                            <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    All Articles
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold gold-gradient text-navy-950 rounded-full hover:shadow-lg hover:shadow-gold-400/25 transition-all duration-300"
                                >
                                    Get a Free Audit
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
