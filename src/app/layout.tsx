import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./animations.css";
import LayoutShell from "@/components/LayoutShell";
import { getSiteConfig } from "@/lib/supabase-data";
import TelemetryProvider from "@/components/TelemetryProvider";

// Use next/font ONLY — do NOT also import via CSS @import
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    preload: true,
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
    preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
    const site = await getSiteConfig();

    return {
        title: {
            default: `${site.name} — ${site.tagline}`,
            template: `%s | ${site.name}`,
        },
        description: site.description,
        metadataBase: new URL(site.url),
        keywords: [
            "AI automation agency",
            "n8n automation",
            "GoHighLevel setup",
            "workflow automation",
            "B2B automation",
            "AI integration",
            "business process automation",
            "automation consultant",
            "enterprise automation",
            "AI ROI calculator",
            "workflow templates",
        ],
        authors: [{ name: site.name, url: site.url }],
        creator: site.name,
        alternates: {
            canonical: site.url,
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: site.url,
            siteName: site.name,
            title: `${site.name} — ${site.tagline}`,
            description: site.description,
            images: [
                {
                    url: "/images/og-home.png",
                    width: 1200,
                    height: 630,
                    alt: `${site.name} — ${site.tagline}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            site: "@bridgeflowai",
            creator: "@bridgeflowai",
            title: `${site.name} — ${site.tagline}`,
            description: site.description,
            images: ["/images/og-home.png"],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
    };
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const siteConfig = await getSiteConfig();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": `${siteConfig.url}${siteConfig.logo}`,
        "description": siteConfig.description,
        "founder": {
            "@type": "Person",
            "name": "Anasan Rai",
            "jobTitle": "Founder & AI Automation Engineer",
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Riyadh",
            "addressCountry": "SA",
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": siteConfig.email,
            "contactType": "customer service",
            "availableLanguage": "English",
        },
        "serviceType": [
            "AI Automation",
            "Workflow Automation",
            "GoHighLevel CRM Setup",
            "n8n Automation",
            "AI Integration",
        ],
        "areaServed": "Worldwide",
        "priceRange": "$$",
    };

    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
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
