/**
 * =============================================
 *  CASE STUDIES DATA — Edit this file to
 *  add/update case studies. No code changes needed.
 * =============================================
 *
 *  To add a new case study:
 *  1. Add a new entry to the `caseStudies` array below
 *  2. Fill in: slug, title, industry, client, excerpt,
 *     challenge, solution, results, and tags
 *  3. It will automatically appear on the Case Studies page
 */

export const caseStudiesHero = {
    badge: "Case Studies",
    title: "Real results from",
    highlight: "real businesses",
    description:
        "See how we've helped companies transform their operations with intelligent automation.",
};

export const caseStudies = [
    {
        slug: "techscale-lead-automation",
        title: "TechScale Lead Pipeline Automation",
        industry: "SaaS",
        client: "TechScale Inc.",
        excerpt:
            "Automated their entire lead capture, qualification, and nurture pipeline — reducing manual work from 4 hours daily to zero.",
        challenge:
            "TechScale's sales team spent 4+ hours daily manually processing leads from multiple sources, qualifying them, and entering data into their CRM. Leads were falling through the cracks and response times were too slow.",
        solution:
            "We built a comprehensive n8n automation that captures leads from web forms, LinkedIn, and email, auto-qualifies them using AI scoring, enriches contact data via APIs, and routes qualified leads to sales reps with full context — all in real-time.",
        results: [
            { metric: "4h → 0h", label: "daily manual work eliminated" },
            { metric: "300%", label: "increase in lead response speed" },
            { metric: "45%", label: "improvement in conversion rate" },
            { metric: "$120K", label: "annual cost savings" },
        ],
        tags: ["n8n", "CRM Integration", "AI Scoring", "Lead Automation"],
    },
    {
        slug: "growthbase-onboarding",
        title: "GrowthBase Client Onboarding",
        industry: "Consulting",
        client: "GrowthBase",
        excerpt:
            "Reduced client onboarding time by 80% with automated document processing, contract generation, and welcome sequences.",
        challenge:
            "GrowthBase was manually onboarding each new client — creating contracts, setting up project spaces, sending welcome materials, and scheduling kickoff calls. The process took 3-5 days per client.",
        solution:
            "We implemented an end-to-end onboarding automation: AI-powered contract generation based on proposal data, automatic workspace creation in project management tools, personalized welcome email sequences, and intelligent scheduling integration.",
        results: [
            { metric: "80%", label: "reduction in onboarding time" },
            { metric: "3-5 days → 4 hours", label: "new onboarding speed" },
            { metric: "95%", label: "client satisfaction score" },
            { metric: "2x", label: "client capacity increase" },
        ],
        tags: ["Document Automation", "AI Generation", "Onboarding", "CRM"],
    },
    {
        slug: "nexus-digital-crm-ai",
        title: "Nexus Digital AI-Powered CRM",
        industry: "Digital Marketing",
        client: "Nexus Digital",
        excerpt:
            "Integrated AI directly into their CRM for intelligent lead scoring, automated follow-ups, and predictive analytics.",
        challenge:
            "Nexus Digital's sales team couldn't effectively prioritize leads in their CRM. They were spending equal time on all leads regardless of quality, resulting in wasted effort and missed high-value opportunities.",
        solution:
            "We integrated GPT-4 and custom ML models into their CRM pipeline. The AI scores every lead based on 20+ signals, generates personalized follow-up emails, predicts conversion probability, and alerts reps when high-intent leads need immediate attention.",
        results: [
            { metric: "60%", label: "increase in sales efficiency" },
            { metric: "3.5x", label: "ROI in first quarter" },
            { metric: "40%", label: "more deals closed" },
            { metric: "50%", label: "reduction in sales cycle" },
        ],
        tags: ["AI Integration", "GPT-4", "CRM", "Predictive Analytics"],
    },
];

export const caseStudiesCta = {
    title: "Want results like",
    highlight: "these?",
    description:
        "Every project starts with a conversation. Let's discuss what automation can do for your business.",
    ctaText: "Start Your Project",
    ctaLink: "/contact",
};
