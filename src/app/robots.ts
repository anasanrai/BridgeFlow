import { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/supabase-data";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const site = await getSiteConfig();
    const baseUrl = site.url || "https://www.bridgeflow.agency";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/admin/",
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
