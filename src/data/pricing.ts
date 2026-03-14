/**
 * =============================================
 *  PRICING DATA — Edit this file to update
 *  pricing tiers. No code changes needed.
 * =============================================
 */

export const pricingHero = {
    badge: "Simple, Transparent Pricing",
    title: "Ready-to-deploy",
    highlight: "automation packages",
    description:
        "Custom n8n workflows built and delivered in days. Choose the package that fits your business needs.",
};

export const plans = [
    {
        name: "Starter",
        price: "$497",
        originalPrice: null,
        period: "",
        savingsTag: null,
        spotsRemaining: null,
        description:
            "One fully-built n8n workflow tailored to your biggest bottleneck. Perfect for testing automation with zero risk.",
        popular: false,
        badge: null as string | null,
        features: [
            "1 custom n8n workflow",
            "Up to 5 integrations",
            "14-day support included",
            "Delivered in 5 business days",
            "Full documentation",
        ],
        cta: { text: "Buy Now — $497", href: "/contact?package=starter", paypal: true, amount: 497, packageName: "Starter" },
    },
    {
        name: "Growth",
        price: "$797",
        originalPrice: null,
        period: "",
        savingsTag: null,
        spotsRemaining: null,
        description:
            "3 custom n8n workflows with CRM integration, email automation, and 30 days of monitoring included.",
        popular: true,
        badge: "MOST POPULAR" as string | null,
        features: [
            "3 custom n8n workflows",
            "Up to 10 integrations",
            "CRM integration included",
            "Email automation setup",
            "30-day monitoring",
            "2 revision rounds",
        ],
        cta: { text: "Buy Now — $797", href: "/contact?package=growth", paypal: true, amount: 797, packageName: "Growth" },
    },
    {
        name: "Pro",
        price: "$1,497",
        originalPrice: null,
        period: "",
        savingsTag: null,
        spotsRemaining: null,
        description:
            "5+ custom workflows, unlimited integrations, full CRM + pipeline setup, AI agent integration, and a monthly strategy call.",
        popular: false,
        badge: "BEST VALUE" as string | null,
        features: [
            "5+ custom n8n workflows",
            "Unlimited integrations",
            "Full CRM + pipeline setup",
            "AI agent integration",
            "60-day monitoring + support",
            "Priority response",
            "Monthly strategy call",
        ],
        cta: { text: "Buy Now — $1,497", href: "/contact?package=pro", paypal: true, amount: 1497, packageName: "Pro" },
    },
];

export const pricingFAQ = [
    {
        q: "What's included in each package?",
        a: "Every package includes custom n8n workflows built specifically for your business, full documentation, and dedicated support. The number of workflows and integrations scales with the package tier.",
    },
    {
        q: "How long does delivery take?",
        a: "The Starter package is delivered in 5 business days. Growth takes 2–3 weeks. Pro packages are typically completed within 3–4 weeks, depending on complexity.",
    },
    {
        q: "Can I upgrade from Starter to Growth?",
        a: "Absolutely. Many clients start with the Starter to see results first, then upgrade. We'll apply your Starter investment as a credit toward the Growth or Pro package.",
    },
    {
        q: "Do you offer refunds?",
        a: "Yes. If you're not satisfied with the delivered work, we offer up to 2 revision rounds. If we still can't meet your expectations, we'll refund you — no questions asked.",
    },
    {
        q: "What tools do the workflows integrate with?",
        a: "n8n connects to 400+ apps including HubSpot, Salesforce, Notion, Slack, Gmail, WhatsApp, Airtable, and more. We'll integrate with whatever tools your business already uses.",
    },
];
