"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ParticleBackground from "./ParticleBackground";
import ChatWidget from "./ChatWidget";
import CookieConsent from "./CookieConsent";
import BackToTop from "./BackToTop";

interface SiteConfig {
    name: string;
    tagline: string;
    description: string;
    email: string;
    url: string;
    location: string;
    copyright: string;
    logo: string;
    og_image: string;
    navLinks: Array<{ label: string; href: string }>;
    footerLinks: Record<string, Array<{ label: string; href: string }>>;
    socialLinks: Array<{ platform: string; url: string; icon?: string }>;
    liveDemos?: Array<{ title: string; url: string; description?: string }> | null;
}

export default function LayoutShell({
    children,
    siteConfig,
}: {
    children: React.ReactNode;
    siteConfig: SiteConfig;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return <>{children}</>;

    return (
        <>
            {/* Skip to main content — accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950 focus:gold-gradient focus:rounded-lg focus:shadow-lg"
            >
                Skip to main content
            </a>

            <div className="flex flex-col min-h-screen">
                <Navbar siteConfig={siteConfig} />
                <ParticleBackground />
                <main id="main-content" className="flex-grow" tabIndex={-1}>
                    {children}
                </main>
                <Footer siteConfig={siteConfig} />
                <ChatWidget />
                <CookieConsent />
                <BackToTop />
            </div>
        </>
    );
}
