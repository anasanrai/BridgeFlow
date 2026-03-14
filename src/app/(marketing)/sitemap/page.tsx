import { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui";
import { siteConfig, navLinks, footerLinks } from "@/data/site";
import { getBlogPosts, getCaseStudies } from "@/lib/supabase-data";
import { FileText, FolderOpen, Layout, Globe, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: `Sitemap | ${siteConfig.name}`,
    description: `Complete directory of all pages on the ${siteConfig.name} website.`,
};

export default async function SitemapPage() {
    const [posts, cases] = await Promise.all([
        getBlogPosts(),
        getCaseStudies()
    ]);

    const sections = [
        {
            title: "Main Pages",
            icon: Globe,
            links: navLinks.map(link => ({ label: link.label, href: link.href }))
        },
        {
            title: "Resources",
            icon: Layout,
            links: [
                { label: "Documentation", href: "/docs" },
                { label: "API Reference", href: "/api-reference" },
                { label: "AI ROI Calculator", href: "/calculator" },
                { label: "Free Revenue Audit", href: "/audit" },
            ]
        },
        {
            title: "Legal",
            icon: FileText,
            links: footerLinks.legal
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="container-max px-4 sm:px-6">
                <ScrollReveal>
                    <div className="max-w-3xl mb-16">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Site <span className="gold-text">Map</span>
                        </h1>
                        <p className="text-lg text-gray-400">
                            A complete directory of all pages, articles, and resources available on the BridgeFlow platform.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {sections.map((section, idx) => (
                        <ScrollReveal key={section.title} delay={idx * 0.1}>
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                                        <section.icon className="w-5 h-5 text-gold-400" />
                                    </div>
                                    <h2 className="text-xl font-display font-bold text-white">{section.title}</h2>
                                </div>
                                <ul className="space-y-3 pl-2 border-l border-white/5">
                                    {section.links.map(link => (
                                        <li key={link.href}>
                                            <Link 
                                                href={link.href}
                                                className="text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                                            >
                                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}

                    {/* Blog Posts */}
                    <ScrollReveal delay={0.3}>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-400" />
                                </div>
                                <h2 className="text-xl font-display font-bold text-white">Blog Articles</h2>
                            </div>
                            <ul className="space-y-3 pl-2 border-l border-white/5">
                                {posts.slice(0, 15).map((post: any) => (
                                    <li key={post.slug}>
                                        <Link 
                                            href={`/blog/${post.slug}`}
                                            className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group text-sm"
                                        >
                                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            {post.title}
                                        </Link>
                                    </li>
                                ))}
                                {posts.length > 15 && (
                                    <li>
                                        <Link href="/blog" className="text-gold-400 text-sm font-semibold hover:underline">View all articles →</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* Case Studies */}
                    <ScrollReveal delay={0.4}>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                                    <FolderOpen className="w-5 h-5 text-emerald-400" />
                                </div>
                                <h2 className="text-xl font-display font-bold text-white">Case Studies</h2>
                            </div>
                            <ul className="space-y-3 pl-2 border-l border-white/5">
                                {cases.map((cs: any) => (
                                    <li key={cs.slug}>
                                        <Link 
                                            href={`/case-studies/${cs.slug}`}
                                            className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group text-sm"
                                        >
                                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            {cs.title}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href="/case-studies" className="text-gold-400 text-sm font-semibold hover:underline">View all case studies →</Link>
                                </li>
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
