import { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/supabase-data";

export const revalidate = 86400; // Revalidate once per day

export default async function robots(): Promise<MetadataRoute.Robots> {
    const site = await getSiteConfig();
    const baseUrl = site.url || "https://www.bridgeflow.agency";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin/",
                    "/api/",
                    "/_next/",
                    "/admin",
                ],
            },
            {
                // Block AI training bots
                userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web"],
                disallow: "/",
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
