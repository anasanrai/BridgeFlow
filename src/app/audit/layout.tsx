import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/supabase-data";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
    const site = await getSiteConfig();
    const title = "Free Automation Audit | Find Your Revenue Leaks — BridgeFlow";
    const description =
        "Enter your website URL for a free Speed-to-Lead performance audit. Find out exactly how many leads you're losing to slow automation. Takes 60 seconds.";
    return {
        title,
        description,
        alternates: { canonical: `${site.url}/audit` },
        openGraph: {
            title: "Free Automation Audit",
            description: "Find out how many leads you're losing. Free 60-second audit.",
            url: `${site.url}/audit`,
            type: "website",
            images: [{ url: "/images/og-audit.png", width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title: "Free Automation Audit",
            description: "Find out how many leads you're losing. Free 60-second audit.",
            images: ["/images/og-audit.png"],
        },
    };
}

export default function AuditLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
