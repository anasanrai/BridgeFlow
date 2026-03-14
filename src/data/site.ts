/**
 * =============================================
 *  SITE-WIDE DATA — Source of Truth
 *  Edit this file to update company info, nav,
 *  social media, and SEO.
 * =============================================
 */

export const siteConfig = {
    name: "BridgeFlow",
    tagline: "Automate Everything. Launch in Days.",
    description:
        "BridgeFlow is an AI automation agency from Kathmandu, Nepal. We build custom n8n workflows that eliminate manual work from your business — lead capture, CRM updates, email sequences, and AI-powered operations.",
    url: "https://bridgeflow.agency",
    email: "hello@bridgeflow.agency",
    admin_email: "anasan@bridgeflow.agency",
    location: "Kathmandu, Nepal · Remote-first, Global",
    operating_location: "Riyadh, KSA",
    founder: "Anasan Rai",
    founded: 2025,
    copyright: `© ${new Date().getFullYear()} BridgeFlow. All rights reserved.`,
    logo: "/images/logo-coral.png", // Will need to ensure this exists or use text logo
    og_image: "/images/og-bridgeflow.png",
    stats: {
        total_workflows_built: 7,
        client_satisfaction: "100%",
        avg_delivery: "5 Days",
        global_presence: "Remote-first",
    }
};

export const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/templates", label: "Templates" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export const footerLinks = {
    company: [
        { label: "About", href: "/about" },
        { label: "Our Story", href: "/about#story" },
        { label: "Founder", href: "/about#founder" },
        { label: "Mission", href: "/about#mission" },
    ],
    services: [
        { label: "n8n Automation", href: "/services#n8n" },
        { label: "AI Integration", href: "/services/ai" },
        { label: "Starter Package", href: "/pricing" },
        { label: "Growth Package", href: "/pricing" },
        { label: "Pro Package", href: "/pricing" },
    ],
    resources: [
        { label: "n8nGalaxy", href: "https://n8ngalaxy.com" },
        { label: "Automation Audit", href: "/audit" },
        { label: "Documentation", href: "/docs" },
        { label: "Sitemap", href: "/sitemap" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Refund Policy", href: "/refund-policy" },
    ],
};

export const socialLinks = [
    { platform: "LinkedIn", href: "https://linkedin.com/in/anasanrai" },
    { platform: "X", href: "https://x.com/bridgeflowai" },
    { platform: "GitHub", href: "https://github.com/anasanrai" },
];
