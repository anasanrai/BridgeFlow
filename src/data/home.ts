/**
 * =============================================
 *  HOME PAGE DATA — Edit this file to update
 *  the Home page content. No code changes needed.
 * =============================================
 */

export const hero = {
    badge: "AI-Powered Automation Agency",
    title: "Automate your",
    titleLine2: "Business with",
    highlight: "AI",
    description:
        "BridgeFlow helps B2B businesses streamline workflows with AI-powered automation, n8n workflows, and GoHighLevel CRM pipelines — built for global scale.",
    ctaPrimary: { text: "Get Started", href: "/contact" },
    ctaSecondary: { text: "View Services", href: "/services" },
    heroImage: "/images/hero-automation.png",
    heroImageAlt: "AI Automation Workspace",
};

export const stats = [
    { end: 150, suffix: "+", label: "Workflows Built" },
    { end: 40, suffix: "+", label: "Happy Clients" },
    { end: 98, suffix: "%", label: "Uptime SLA" },
    { end: 10, suffix: "x", label: "Avg. ROI" },
];

export const servicesOverview = [
    {
        icon: "Zap",
        title: "n8n Automation",
        description:
            "Custom workflow builds using n8n for any business process. Automate lead gen, onboarding, reporting, and more.",
        href: "/services",
    },
    {
        icon: "BarChart3",
        title: "GoHighLevel CRM",
        description:
            "Full-stack CRM setup with automated funnels, SMS/email sequences, and appointment booking to close more deals.",
        href: "/services",
    },
    {
        icon: "Bot",
        title: "AI Integration",
        description:
            "Connect your tools with AI to work smarter. GPT, Claude, and custom models integrated into your workflows.",
        href: "/services",
    },
    {
        icon: "Boxes",
        title: "SaaS Tools",
        description:
            "Access our growing suite of automation SaaS products built for specific business verticals.",
        href: "/services",
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
