/**
 * =============================================
 *  PRICING DATA — Canonical Tiers
 *  Edit this file to update pricing tiers.
 * =============================================
 */

export const pricingHero = {
    badge: "Results Over Reports",
    title: "Simple, honest",
    highlight: "automation pricing",
    description:
        "No hidden fees. No per-task costs. Choose the package that fits your stage of growth.",
};

export const plans = [
    {
        name: "Starter",
        price: "$497",
        amount: 497,
        slug: "starter",
        description: "The lowest-risk way to start automating. Best for testing automation for the first time.",
        delivery: "5 business days",
        popular: false,
        badge: null,
        features: [
            "1 fully custom n8n workflow",
            "Up to 5 tool integrations",
            "Full workflow documentation",
            "Video walkthrough of system",
            "14 days of support",
            "2 revision rounds",
        ],
        cta: { text: "Get Started — $497", href: "/contact?package=starter", paypal: true },
    },
    {
        name: "Growth",
        price: "$997",
        amount: 997,
        slug: "growth",
        description: "The most popular choice. Perfect for agencies and teams with multiple broken processes.",
        delivery: "2–3 weeks",
        popular: true,
        badge: "MOST POPULAR",
        features: [
            "3 fully custom n8n workflows",
            "Up to 10 tool integrations",
            "CRM integration (any platform)",
            "Email automation sequences",
            "Slack/Telegram notification setup",
            "30 days monitoring",
            "2 revision rounds",
        ],
        cta: { text: "Choose Growth — $997", href: "/contact?package=growth", paypal: true },
    },
    {
        name: "Pro",
        price: "$1,797",
        amount: 1797,
        slug: "pro",
        description: "The full transformation for established businesses ready to scale operations.",
        delivery: "3–4 weeks",
        popular: false,
        badge: "BEST VALUE",
        features: [
            "5+ custom n8n workflows",
            "Unlimited integrations",
            "Full CRM + sales pipeline setup",
            "AI agent integration",
            "60 days monitoring + support",
            "Priority response (<4 hours)",
            "Monthly strategy call",
        ],
        cta: { text: "Go Pro — $1,797", href: "/contact?package=pro", paypal: true },
    },
    {
        name: "Retainer",
        price: "$697",
        period: "/month",
        amount: 697,
        slug: "retainer",
        description: "Your ongoing automation partner on call. Cancel anytime with 30-day notice.",
        delivery: "Ongoing",
        popular: false,
        badge: "PARTNER",
        features: [
            "Up to 2 new workflows/modifications",
            "Monitoring of all systems",
            "Priority Slack/Telegram channel",
            "Monthly 30-min strategy call",
            "Bug fixes & integration updates",
            "Under 8h response time",
        ],
        cta: { text: "Add Retainer — $697", href: "/contact?package=retainer", paypal: true },
    },
];

export const pricingFAQ = [
    {
        q: "n8n vs Zapier: Why do you use n8n?",
        a: "Zapier charges you per-task, which gets expensive fast. n8n is open-source, more powerful, and can be self-hosted. Our clients own their systems forever and save 10x on running costs.",
    },
    {
        q: "What happens after the support period ends?",
        a: "Your automations are built to last. After the inclusive support period (14-60 days), you can either maintain it yourself (we provide full documentation) or join our $697/mo retainer.",
    },
    {
        q: "Do I need to be technical?",
        a: "Not at all. We handle everything — architecture, building, testing, and deployment. We deliver a working system and a video showing you exactly how to use it.",
    },
    {
        q: "What if it doesn't work for my business?",
        a: "Wecalculate the ROI before we start. If we can't meet the agreed scope after revisions, we offer a full refund, no questions asked.",
    },
];
