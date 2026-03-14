// ISR: Revalidate every 60 seconds
export const revalidate = 60;

import { getHomeContent, getPageSEO, getSiteConfig } from "@/lib/supabase-data";
import EnterpriseHomePage from "@/components/pages/EnterpriseHomePage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const [seo, site] = await Promise.all([getPageSEO("/"), getSiteConfig()]);
    const title = `${site.name} — ${site.tagline}`;
    const description = seo.description || site.description;
    return {
        title,
        description,
        alternates: { canonical: site.url },
        openGraph: {
            title,
            description,
            url: site.url,
            type: "website",
            images: [{ url: seo.ogImage, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [seo.ogImage] },
    };
}

export default async function Home() {
    const content = await getHomeContent();

    return <EnterpriseHomePage content={content as any} />;

}
