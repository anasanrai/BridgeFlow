import { MetadataRoute } from "next";
import { getSiteConfig, getBlogPosts, getCaseStudies } from "@/lib/supabase-data";

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const site = await getSiteConfig();
    const baseUrl = site.url || "https://www.bridgeflow.agency";

    const [posts, cases] = await Promise.all([
        getBlogPosts(),
        getCaseStudies()
    ]);

    // Only include pages with real content — exclude placeholder/thin pages
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/audit`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/how-it-works`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/case-studies`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/careers`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/calculator`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post: { slug: string; published_at?: string; created_at?: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.published_at || post.created_at || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const caseRoutes: MetadataRoute.Sitemap = cases.map((item: { slug: string; created_at?: string; updated_at?: string }) => ({
        url: `${baseUrl}/case-studies/${item.slug}`,
        lastModified: new Date(item.updated_at || item.created_at || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.75,
    }));

    return [...staticRoutes, ...blogRoutes, ...caseRoutes];
}
