export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { getBlogPost } from "@/lib/supabase-data";
import { ScrollReveal, Card } from "@/components/ui";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await getBlogPost(params.slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: post.seo_title || `${post.title} | BridgeFlow Blog`,
        description: post.seo_description || post.excerpt,
        openGraph: {
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt,
            images: post.og_image ? [{ url: post.og_image }] : undefined,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt,
            images: post.og_image ? [post.og_image] : undefined,
        },
    };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        return (
            <section className="pt-32 pb-20 text-center">
                <div className="container-max px-4">
                    <h1 className="text-3xl font-display font-bold mb-4">
                        Post Coming Soon
                    </h1>
                    <p className="text-gray-400 mb-8">
                        This article is being written. Check back soon!
                    </p>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="relative pt-32 pb-12 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max px-4 sm:px-6">
                    <ScrollReveal>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 text-xs font-semibold text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                                    {post.category}
                                </span>
                                {post.readTime && (
                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                )}
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {post.date}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight">
                                {post.title}
                            </h1>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section-padding pt-8">
                <div className="container-max">
                    <div className="max-w-3xl">
                        <ScrollReveal>
                            <article className="prose prose-invert prose-lg max-w-none">
                                {post.content.map((paragraph: string, i: number) => (
                                    <p
                                        key={i}
                                        className="text-gray-300 leading-relaxed mb-6 text-lg"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </article>
                        </ScrollReveal>

                        {/* Author */}
                        <ScrollReveal>
                            <Card hover={false} className="mt-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-navy-950 font-bold">
                                        BF
                                    </div>
                                    <div>
                                        <div className="font-semibold">BridgeFlow Team</div>
                                        <div className="text-sm text-gray-400">
                                            AI Automation Experts
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}

