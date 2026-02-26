/**
 * =============================================
 *  PRICING DATA — Edit this file to update
 *  pricing tiers. No code changes needed.
 * =============================================
 */

export const pricingHero = {
    badge: "Founding Member Pricing — Limited Time",
    title: "Simple, transparent",
    highlight: "pricing",
    description:
        "We're onboarding our first founding clients at a special rate. Prices increase once all founding spots are filled.",
};

export const plans = [
    {
        name: "Free Automation Audit",
        price: "Free",
        originalPrice: null,
        period: "",
        savingsTag: null,
        spotsRemaining: null,
        description:
            "Get a complimentary 30-minute deep-dive into your current workflows. We'll identify your top 3 automation opportunities with the highest ROI potential.",
        popular: true,
        badge: "MOST POPULAR",
        features: [
            "30-minute strategy call",
            "Top 3 automation opportunities identified",
            "Custom ROI estimate",
            "No credit card required",
        ],
        cta: { text: "Claim Free Audit →", href: "/audit" },
    },
    {
        name: "Quick Win Automation",
        price: "$497",
        originalPrice: "$997",
        period: "",
        savingsTag: "Founding Rate",
        spotsRemaining: "2 of 5 founding spots remaining",
        description:
            "One fully-built automation workflow tailored to your biggest bottleneck. Perfect for businesses wanting to test automation with zero risk.",
        popular: false,
        badge: "BEST FIRST STEP",
        features: [
            "1 custom n8n workflow",
            "Up to 5 integrated tools",
            "14 days of support included",
            "Delivered in 5 business days",
            "Full workflow documentation",
        ],
        cta: { text: "Get Started →", href: "/contact" },
    },
    {
        name: "Starter Automation Package",
        price: "$997",
        originalPrice: "$2,499",
        period: "",
        savingsTag: "Founding Rate — Save $1,502",
        spotsRemaining: "1 of 3 founding spots remaining",
        description:
            "5 custom n8n workflows built for your business. Full CRM integration, email automation, and 30 days of monitoring included.",
        popular: false,
        badge: "POPULAR",
        features: [
            "5 custom n8n workflows",
            "CRM integration (any platform)",
            "Email automation sequences",
            "Slack notifications setup",
            "30 days monitoring included",
            "Full workflow documentation",
            "2 revision rounds",
        ],
        cta: { text: "Get Started →", href: "/contact" },
    },
    {
        name: "GoHighLevel Pro Setup",
        price: "$1,997",
        originalPrice: "$3,999",
        period: "",
        savingsTag: "Founding Rate — Save $2,002",
        spotsRemaining: "2 of 3 founding spots remaining",
        description:
            "Complete GHL setup with 3 funnels, pipeline configuration, automated follow-ups, review management, and full team training.",
        popular: false,
        badge: "BEST VALUE",
        features: [
            "Complete GHL account setup",
            "3 custom sales funnels",
            "Pipeline & CRM configuration",
            "Automated follow-up sequences",
            "Review management automation",
            "Full team training (2 sessions)",
            "30 days priority support",
        ],
        cta: { text: "Get Started →", href: "/contact" },
    },
];

export const pricingFAQ = [
    {
        q: "What's included in the free audit?",
        a: "You'll get a 30-minute strategy call where we analyze your current workflows, identify your top 3 automation opportunities, and provide a custom ROI estimate — completely free, no strings attached.",
    },
    {
        q: "What does 'Founding Rate' mean?",
        a: "We're offering special discounted pricing to our first founding clients. Once all founding spots are filled, prices will increase to standard rates. This is a limited-time opportunity.",
    },
    {
        q: "Can I upgrade from Quick Win to a larger package?",
        a: "Absolutely. Many clients start with a Quick Win to see results first, then upgrade. We'll apply your Quick Win investment as a credit toward a larger package.",
    },
    {
        q: "How long does a typical project take?",
        a: "Quick Win workflows are delivered in 5 business days. Starter packages take 2-3 weeks. GoHighLevel Pro Setup is typically completed within 3-4 weeks including training.",
    },
    {
        q: "Do you offer refunds?",
        a: "Yes. If you're not satisfied with the delivered work, we offer up to 2 revision rounds. If we still can't meet your expectations, we'll refund you — no questions asked.",
    },
];
