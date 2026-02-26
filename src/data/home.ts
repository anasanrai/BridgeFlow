/**
 * =============================================
 *  HOME PAGE DATA — Edit this file to update
 *  the Home page content. No code changes needed.
 * =============================================
 */

export const hero = {
    badge: "Enterprise AI Orchestration",
    title: "Scale Your Operations with",
    titleLine2: "Autonomous AI",
    highlight: "Systems",
    description:
        "We don't just automate; we architect intelligent ecosystems that think, learn, and execute at the speed of light. Experience the 10x multiplier of true AI integration.",
    ctaPrimary: { text: "Book Discovery Call", href: "/contact" },
    ctaSecondary: { text: "Explore AI Calculator", href: "/calculator" },
    heroImage: "/images/hero-automation.png",
    heroImageAlt: "Enterprise AI Automation",
};

export const stats = [
    { end: 500, suffix: "+", label: "Enterprise Automations" },
    { end: 15, suffix: "M", label: "Annual Client Savings" },
    { end: 99, suffix: ".9%", label: "Automation Uptime" },
    { end: 12, suffix: "x", label: "Average Client ROI" },
];

export const servicesOverview = [
    {
        icon: "Zap",
        title: "n8n Automation",
        description:
            "Custom workflow builds using n8n for any business process. Automate lead gen, onboarding, reporting, and more.",
        href: "/services#n8n",
    },
    {
        icon: "BarChart3",
        title: "GoHighLevel CRM",
        description:
            "Full-stack CRM setup with automated funnels, SMS/email sequences, and appointment booking to close more deals.",
        href: "/services#gohighlevel",
    },
    {
        icon: "Bot",
        title: "AI Integration",
        description:
            "Connect your tools with AI to work smarter. GPT, Claude, and custom models integrated into your workflows.",
        href: "/services#ai",
    },
    {
        icon: "Boxes",
        title: "SaaS Tools",
        description:
            "Access our growing suite of automation SaaS products built for specific business verticals.",
        href: "/services#saas",
    },
];

export const processSteps = [
    {
        step: "01",
        title: "Consult",
        description:
            "We analyze your business processes and identify automation opportunities that deliver the highest ROI.",
    },
    {
        step: "02",
        title: "Build",
        description:
            "Our engineers architect and deploy custom automation workflows tailored to your exact needs.",
    },
    {
        step: "03",
        title: "Scale",
        description:
            "We monitor, optimize, and scale your automations as your business grows — zero downtime guaranteed.",
    },
];

export const testimonials = [
    {
        quote:
            "BridgeFlow automated our entire lead pipeline. We went from 4 hours of manual work daily to completely hands-off in 2 weeks.",
        author: "Sarah Chen",
        role: "VP Operations, TechScale Inc.",
        rating: 5,
    },
    {
        quote:
            "The GoHighLevel CRM they set up tripled our appointment bookings. The ROI was immediate — onboarding dropped by 80%.",
        author: "Marcus Rivera",
        role: "CEO, GrowthBase",
        rating: 5,
    },
    {
        quote:
            "Their AI integration with our CRM was seamless. The team is incredibly responsive and the results speak for themselves.",
        author: "Aisha Patel",
        role: "Head of Sales, Nexus Digital",
        rating: 5,
    },
];

export const offers = [
    {
        title: "Free Automation Audit",
        description: "Get a complimentary 30-minute deep-dive into your current workflows. We'll identify the top 3 automation opportunities with the highest ROI potential.",
        badge: "Free",
        href: "/audit",
        highlight: true,
    },
    {
        title: "Starter n8n Package",
        description: "5 custom n8n workflows, CRM integration, email automation, and 30 days of monitoring included. Perfect for small teams getting started.",
        badge: "$2,499",
        href: "/contact",
        highlight: false,
    },
    {
        title: "GoHighLevel Pro Setup",
        description: "Complete GHL setup with 3 funnels, pipeline configuration, automated follow-ups, review management, and full team training.",
        badge: "$3,999",
        href: "/contact",
        highlight: false,
    },
];

export const demos = [
    {
        title: "Lead-to-Close Pipeline",
        description: "Watch a real n8n + GoHighLevel pipeline capture a lead from a web form, score it with AI, route it to a sales rep, and trigger an automated follow-up sequence.",
        tags: ["n8n", "GoHighLevel", "AI Scoring"],
    },
    {
        title: "AI Content Generator",
        description: "See how we use GPT-4 to generate SEO-optimized blog posts, social captions, and email drafts — all triggered from a single Slack command.",
        tags: ["GPT-4", "n8n", "Slack"],
    },
    {
        title: "E-commerce Review Automation",
        description: "Automatic review requests via SMS after purchase, negative review alerts to Slack, and AI-generated response suggestions for your team.",
        tags: ["GoHighLevel", "SMS", "AI"],
    },
];

export const cta = {
    title: "Ready to",
    highlight: "Automate?",
    description:
        "Let's talk about your business and build your first automation together — no commitments.",
    ctaPrimary: { text: "Start a Conversation", href: "/contact" },
    ctaSecondary: { text: "hello@bridgeflow.agency", href: "mailto:hello@bridgeflow.agency" },
};
