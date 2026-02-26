import { MetadataRoute } from "next";
import { getSiteConfig, getBlogPosts, getCaseStudies } from "@/lib/supabase-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const site = await getSiteConfig();
    const baseUrl = site.url || "https://bridgeflow.agency";

    const [posts, cases] = await Promise.all([
        getBlogPosts(),
        getCaseStudies()
    ]);

    const staticRoutes = [
        "",
        "/about",
        "/contact",
        "/services",
        "/pricing",
        "/how-it-works",
        "/audit",
        "/careers",
        "/blog",
        "/case-studies",
        "/privacy-policy",
        "/terms-of-service",
        "/calculator",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    const blogRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.published_at || post.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    const caseRoutes = cases.map((item: any) => ({
        url: `${baseUrl}/case-studies/${item.slug}`,
        lastModified: new Date(item.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes, ...caseRoutes];
}
