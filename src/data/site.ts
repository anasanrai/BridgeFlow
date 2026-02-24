/**
 * =============================================
 *  SITE-WIDE DATA — Edit this file to update
 *  company info, nav links, footer links,
 *  social media, and SEO.
 *  No code changes needed.
 * =============================================
 */

export const siteConfig = {
    name: "BridgeFlow",
    tagline: "AI-Powered Automation Agency",
    description:
        "BridgeFlow helps B2B businesses streamline workflows with AI-powered automation services and SaaS tools, built for global scale.",
    url: "https://www.bridgeflow.agency",
    email: "hello@bridgeflow.agency",
    location: "Remote-first, Global",
    copyright: "© 2026 BridgeFlow. All rights reserved.",
    logo: "/images/logo.png",
    og_image: "/images/og-default.png",
};

export const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export const footerLinks = {
    company: [
        { label: "About", href: "/about" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Careers", href: "/careers" },
    ],
    services: [
        { label: "n8n Automation", href: "/services" },
        { label: "GoHighLevel CRM", href: "/services" },
        { label: "AI Integration", href: "/services" },
        { label: "Pricing", href: "/pricing" },
        { label: "Free Audit", href: "/audit" },
    ],
    resources: [
        { label: "Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
    ],
};

/**
 * Social media links — add more platforms here, they will render in footer
 */
export const socialLinks = [
    { platform: "Twitter", href: "https://x.com/bridgeflowai" },
    { platform: "LinkedIn", href: "https://linkedin.com/company/bridgeflow-agency" },
    { platform: "GitHub", href: "https://github.com/bridgeflow-agency" },
    { platform: "Instagram", href: "https://instagram.com/bridgeflow.agency" },
    { platform: "YouTube", href: "https://youtube.com/@bridgeflow" },
    { platform: "Facebook", href: "https://facebook.com/bridgeflowagency" },
];

/**
 * Default affiliate/advertise links — can be overridden from admin settings
 */
export const defaultAffiliateLinks = [
    {
        title: "n8n Cloud",
        description: "The most flexible workflow automation tool. Start building powerful automations today.",
        href: "https://n8n.io/?ref=bridgeflow",
        badge: "Recommended",
        logo: "Zap",
    },
    {
        title: "GoHighLevel",
        description: "All-in-one CRM, funnels, and marketing automation platform for agencies.",
        href: "https://www.gohighlevel.com/?fp_ref=bridgeflow",
        badge: "Partner",
        logo: "BarChart3",
    },
    {
        title: "Hostinger",
        description: "Premium web hosting with 99.9% uptime. AI-powered website builder included.",
        href: "https://hostinger.com?ref=bridgeflow",
        badge: "Hosting",
        logo: "Globe",
    },
];
