/**
 * =============================================
 *  PRICING DATA — Edit this file to update
 *  pricing tiers. No code changes needed.
 * =============================================
 */

export const pricingHero = {
    badge: "Pricing",
    title: "Simple, transparent",
    highlight: "pricing",
    description:
        "Choose the plan that fits your business. All plans include dedicated support and a 30-day money-back guarantee.",
};

export const plans = [
    {
        name: "Starter",
        price: "$1,497",
        period: "/project",
        description: "Perfect for businesses starting their automation journey.",
        popular: false,
        features: [
            "1 custom n8n workflow",
            "Up to 5 integrations",
            "Basic error handling",
            "Email support",
            "7-day delivery",
            "30 days of bug fixes",
        ],
        cta: { text: "Get Started", href: "/contact" },
    },
    {
        name: "Growth",
        price: "$3,997",
        period: "/month",
        description: "For teams ready to scale with ongoing automation support.",
        popular: true,
        features: [
            "Up to 5 workflows/month",
            "Unlimited integrations",
            "AI-powered automation",
            "Priority Slack support",
            "48-hour delivery",
            "Dedicated automation engineer",
            "Monthly strategy call",
            "Real-time monitoring dashboard",
        ],
        cta: { text: "Start Growing", href: "/contact" },
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Full-scale automation transformation for large organizations.",
        popular: false,
        features: [
            "Unlimited workflows",
            "Custom AI model training",
            "Dedicated team of engineers",
            "24/7 phone & Slack support",
            "Same-day critical fixes",
            "Quarterly business reviews",
            "SLA with uptime guarantee",
            "On-site workshops available",
        ],
        cta: { text: "Contact Sales", href: "/contact" },
    },
];

export const pricingFAQ = [
    {
        q: "What's included in the 30-day money-back guarantee?",
        a: "If you're not satisfied with our work within the first 30 days, we'll refund your payment in full. No questions asked.",
    },
    {
        q: "Can I switch plans later?",
        a: "Absolutely. You can upgrade or downgrade your plan at any time. We'll prorate the difference.",
    },
    {
        q: "Do you offer custom solutions?",
        a: "Yes. Our Enterprise plan is fully customizable. Contact our sales team to discuss your specific requirements.",
    },
    {
        q: "How long does a typical project take?",
        a: "Starter projects are delivered in 7 days. Growth plan workflows are typically delivered within 48 hours. Enterprise timelines are customized to your needs.",
    },
];
