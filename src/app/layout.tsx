import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

import { getSiteConfig } from "@/lib/supabase-data";

export async function generateMetadata(): Promise<Metadata> {
    const site = await getSiteConfig();

    return {
        title: {
            default: `${site.name} — ${site.tagline}`,
            template: `%s | ${site.name}`,
        },
        description: site.description,
        metadataBase: new URL(site.url),
        openGraph: {
            type: "website",
            locale: "en_US",
            url: site.url,
            siteName: site.name,
            title: `${site.name} — ${site.tagline}`,
            description: site.description,
            images: site.logo ? [{ url: site.logo }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: `${site.name} — ${site.tagline}`,
            description: site.description,
            images: site.logo ? [site.logo] : undefined,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}
import TelemetryProvider from "@/components/TelemetryProvider";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const siteConfig = await getSiteConfig();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": siteConfig.logo,
        "description": siteConfig.description,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": siteConfig.location,
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": siteConfig.email,
            "contactType": "customer service",
        },
    };

    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="font-sans antialiased bg-navy-950 text-white min-h-screen">
                <TelemetryProvider>
                    <LayoutShell siteConfig={siteConfig}>{children}</LayoutShell>
                </TelemetryProvider>
            </body>
        </html>
    );
}

