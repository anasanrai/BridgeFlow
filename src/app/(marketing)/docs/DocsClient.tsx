"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ScrollReveal,
    Card,
} from "@/components/ui";
import {
    BookOpen,
    ChevronRight,
    Search,
    Zap,
    Bot,
    Webhook,
    Code2,
    Workflow,
    Settings,
    ArrowRight,
    ExternalLink,
    FileText,
    Puzzle,
    Terminal,
    CheckCircle2,
    Clock,
    Users,
    Star,
    Copy,
    Check,
} from "lucide-react";

const DOC_SECTIONS = [
    {
        id: "getting-started",
        icon: Zap,
        title: "Getting Started",
        color: "from-gold-600 to-amber-400",
        description: "Everything you need to get your first automation running.",
        articles: [
            { title: "What is BridgeFlow?", time: "3 min read", href: "#what-is-bridgeflow" },
            { title: "How automation works", time: "5 min read", href: "#how-automation-works" },
            { title: "Your first workflow", time: "10 min read", href: "#first-workflow" },
            { title: "Connecting your tools", time: "7 min read", href: "#connecting-tools" },
        ],
    },
    {
        id: "n8n",
        icon: Workflow,
        title: "n8n Automation",
        color: "from-blue-600 to-cyan-400",
        description: "Build powerful workflows with n8n — the open-source automation platform.",
        articles: [
            { title: "n8n overview & setup", time: "8 min read", href: "#n8n-overview" },
            { title: "Creating your first n8n workflow", time: "12 min read", href: "#n8n-first-workflow" },
            { title: "Using webhooks in n8n", time: "6 min read", href: "#n8n-webhooks" },
            { title: "n8n + AI nodes guide", time: "10 min read", href: "#n8n-ai-nodes" },
        ],
    },
    {
        id: "ai-integration",
        icon: Bot,
        title: "AI Integration",
        color: "from-purple-600 to-pink-400",
        description: "Integrate GPT-4, Claude, and other AI models into your workflows.",
        articles: [
            { title: "Choosing the right AI model", time: "5 min read", href: "#choosing-ai-model" },
            { title: "Building AI chatbots", time: "15 min read", href: "#building-chatbots" },
            { title: "AI-powered data extraction", time: "10 min read", href: "#ai-data-extraction" },
            { title: "Fine-tuning for your use case", time: "20 min read", href: "#fine-tuning" },
        ],
    },
    {
        id: "webhooks",
        icon: Webhook,
        title: "Webhooks & Events",
        color: "from-emerald-600 to-teal-400",
        description: "Trigger automations in real-time with webhook events.",
        articles: [
            { title: "Understanding webhooks", time: "4 min read", href: "#webhooks-intro" },
            { title: "Setting up inbound webhooks", time: "8 min read", href: "#inbound-webhooks" },
            { title: "Outbound event notifications", time: "6 min read", href: "#outbound-events" },
            { title: "Webhook security & validation", time: "5 min read", href: "#webhook-security" },
        ],
    },
    {
        id: "integrations",
        icon: Puzzle,
        title: "Integrations",
        color: "from-orange-500 to-red-400",
        description: "Connect BridgeFlow with your existing tools and platforms.",
        articles: [
            { title: "GoHighLevel CRM setup", time: "12 min read", href: "#ghl-setup" },
            { title: "Slack notifications", time: "5 min read", href: "#slack" },
            { title: "Google Workspace", time: "8 min read", href: "#google-workspace" },
            { title: "HubSpot integration", time: "10 min read", href: "#hubspot" },
        ],
    },
    {
        id: "api",
        icon: Code2,
        title: "API Reference",
        color: "from-indigo-600 to-violet-400",
        description: "Programmatic access to BridgeFlow's automation platform.",
        articles: [
            { title: "Authentication & API keys", time: "4 min read", href: "/api-reference#auth" },
            { title: "Workflows API", time: "8 min read", href: "/api-reference#workflows" },
            { title: "Contacts API", time: "6 min read", href: "/api-reference#contacts" },
            { title: "Webhooks API", time: "5 min read", href: "/api-reference#webhooks-api" },
        ],
    },
];

const QUICK_LINKS = [
    { icon: Zap, label: "Quick Start Guide", href: "#first-workflow", color: "text-gold-400" },
    { icon: Code2, label: "API Reference", href: "/api-reference", color: "text-blue-400" },
    { icon: Webhook, label: "Webhook Setup", href: "#inbound-webhooks", color: "text-emerald-400" },
    { icon: Bot, label: "AI Integration Guide", href: "#building-chatbots", color: "text-purple-400" },
];

const CONTENT_SECTIONS = [
    {
        id: "what-is-bridgeflow",
        title: "What is BridgeFlow?",
        content: `BridgeFlow is an AI-powered automation agency that helps businesses eliminate repetitive manual work by building intelligent, scalable workflows.

We specialise in three core areas:

**1. n8n Workflow Automation** — We design and deploy custom n8n workflows that connect your apps, automate data flows, and trigger actions without any manual intervention.

**2. AI Integration** — We embed GPT-4, Claude, and custom AI models directly into your business processes — from lead qualification chatbots to intelligent document processing pipelines.

**3. GoHighLevel CRM Setup** — We configure and automate your entire GoHighLevel CRM, including pipelines, follow-up sequences, and reporting dashboards.

BridgeFlow is founded and operated by **Anasan Rai**, a solo automation engineer with 50+ workflows delivered across real estate, e-commerce, and agency verticals.`,
    },
    {
        id: "how-automation-works",
        title: "How Automation Works",
        content: `At its core, automation is about connecting events to actions. When something happens (a trigger), a predefined sequence of actions runs automatically.

**The Trigger → Action Model**

Every BridgeFlow workflow follows this pattern:

- **Trigger**: Something happens — a form is submitted, an email arrives, a webhook fires, a schedule runs
- **Process**: Data is transformed, filtered, or enriched — AI models analyse it, conditions are checked
- **Action**: Something is done — a CRM is updated, a Slack message is sent, a document is generated

**Example: Lead Qualification Workflow**

1. New lead fills out contact form (Trigger)
2. AI model scores the lead based on company size and budget (Process)
3. High-score leads are added to GoHighLevel pipeline (Action)
4. Low-score leads receive automated nurture email sequence (Action)
5. Slack notification sent to founder with lead summary (Action)

This entire sequence runs in under 30 seconds, 24/7, without human involvement.`,
    },
    {
        id: "first-workflow",
        title: "Your First Workflow",
        content: `This guide walks you through building your first automation with BridgeFlow.

**Prerequisites**
- An active BridgeFlow client account
- Access to your n8n instance (provided after onboarding)
- At least one connected app (e.g., Gmail, Slack, or a CRM)

**Step 1: Access Your n8n Dashboard**

Log into your n8n instance at the URL provided during onboarding. You'll see the workflow canvas — a drag-and-drop interface for building automations.

**Step 2: Create a New Workflow**

Click **+ New Workflow** in the top-right corner. Give it a descriptive name like "Contact Form → Slack Notification".

**Step 3: Add a Trigger Node**

Click the **+** button on the canvas and search for your trigger. For a contact form, use the **Webhook** node — it generates a unique URL that your form can POST data to.

**Step 4: Add Action Nodes**

Connect your trigger to action nodes. For Slack notifications, search for the **Slack** node, select "Send Message", and configure your channel and message template.

**Step 5: Test & Activate**

Use the **Test Workflow** button to run a test with sample data. Once satisfied, click **Activate** to make it live.

Need help? Book a [free strategy session](/services/consulting) with our team.`,
    },
    {
        id: "n8n-webhooks",
        title: "Using Webhooks in n8n",
        content: `Webhooks are the most powerful trigger mechanism in n8n — they allow external services to instantly notify your workflows of events.

**Setting Up an Inbound Webhook**

1. Add a **Webhook** node to your workflow
2. Set the HTTP Method to \`POST\` (most common) or \`GET\`
3. Copy the generated webhook URL
4. Paste it into the external service's webhook settings
5. Click **Listen for Test Event** and trigger the webhook from the external service
6. n8n will capture the payload and you can map the fields to subsequent nodes

**Webhook URL Format**
\`\`\`
https://your-n8n-instance.app.n8n.cloud/webhook/your-unique-id
\`\`\`

**Security Best Practice**

Always validate webhook signatures. Add a **Code** node after your Webhook trigger:

\`\`\`javascript
const signature = $input.first().headers['x-signature'];
const secret = 'your-webhook-secret';
// Validate HMAC signature here
\`\`\`

**Common Webhook Sources**
- Stripe payment events
- GoHighLevel CRM triggers
- Typeform / Tally form submissions
- Shopify order events
- GitHub repository events`,
    },
    {
        id: "n8n-ai-nodes",
        title: "n8n + AI Nodes Guide",
        content: `n8n has native AI nodes that make it easy to integrate LLMs directly into your workflows.

**Available AI Nodes in n8n**

- **AI Agent** — A full autonomous agent that can use tools and make decisions
- **OpenAI** — Direct access to GPT-4, GPT-4o, and other OpenAI models
- **Anthropic** — Claude 3.5 Sonnet and other Anthropic models
- **Google Gemini** — Gemini 2.0 Flash and Pro models
- **Ollama** — Run open-source models locally

**Example: AI-Powered Email Classifier**

\`\`\`
Webhook (inbound email) 
  → OpenAI node (classify as: support/sales/spam)
  → Switch node (route based on classification)
    → Support: Create Zendesk ticket
    → Sales: Add to GoHighLevel pipeline
    → Spam: Archive and ignore
\`\`\`

**Prompt Engineering Tips**

Always use structured output prompts for reliable parsing:

\`\`\`
Classify the following email into one of these categories: support, sales, spam.
Respond with ONLY the category name, nothing else.

Email: {{ $json.body }}
\`\`\`

**Cost Optimisation**

Use GPT-4o-mini for classification tasks (10x cheaper than GPT-4) and reserve GPT-4 for complex reasoning or content generation.`,
    },
    {
        id: "building-chatbots",
        title: "Building AI Chatbots",
        content: `BridgeFlow builds production-grade AI chatbots that integrate with your website and CRM.

**Architecture Overview**

A BridgeFlow chatbot consists of:
1. **Frontend widget** — Embedded on your website via a script tag
2. **API endpoint** — A Next.js API route that processes messages
3. **AI model** — GPT-4 or Claude with a custom system prompt
4. **CRM integration** — Automatically logs conversations and qualifies leads

**System Prompt Design**

The system prompt defines your chatbot's personality, knowledge, and constraints:

\`\`\`
You are [Company]'s AI assistant. You help visitors understand our services 
and book consultations.

Key information:
- Services: [list your services]
- Pricing: [pricing overview]
- CTA: Always direct qualified leads to /contact

Rules:
- Keep responses under 100 words
- Never make up information
- If unsure, say "Let me connect you with our team"
\`\`\`

**Lead Qualification Logic**

Configure the chatbot to detect buying signals:

\`\`\`javascript
// After each message, check for qualification signals
const qualificationSignals = ['budget', 'timeline', 'team size', 'ready to start'];
const isQualified = qualificationSignals.some(signal => 
  message.toLowerCase().includes(signal)
);

if (isQualified) {
  // Trigger CRM lead creation
  await createCRMLead({ name, email, conversation });
}
\`\`\`

**Deployment**

Add the chat widget to your site with a single script tag — provided after setup.`,
    },
    {
        id: "ghl-setup",
        title: "GoHighLevel CRM Setup",
        content: `GoHighLevel (GHL) is the all-in-one CRM platform BridgeFlow uses for client relationship management and marketing automation.

**Initial Setup Checklist**

- [ ] Create your GHL sub-account
- [ ] Configure your business profile and branding
- [ ] Set up your pipeline stages
- [ ] Import existing contacts
- [ ] Configure email and SMS sending domains
- [ ] Set up your first automation workflow

**Pipeline Configuration**

A typical BridgeFlow client pipeline:

\`\`\`
New Lead → Contacted → Qualified → Proposal Sent → Negotiation → Won / Lost
\`\`\`

Each stage can trigger automated actions:
- **New Lead**: Send welcome email + Slack notification
- **Contacted**: Start 5-day follow-up sequence
- **Qualified**: Schedule discovery call via Calendly
- **Proposal Sent**: Send proposal + follow-up reminders

**n8n + GHL Integration**

Connect n8n to GHL via the GoHighLevel API:

\`\`\`javascript
// Create a contact in GHL from n8n
const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_GHL_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: '{{ $json.name.split(" ")[0] }}',
    email: '{{ $json.email }}',
    phone: '{{ $json.phone }}',
    tags: ['bridgeflow-lead'],
  }),
});
\`\`\`

**Automation Templates**

BridgeFlow provides pre-built GHL automation templates for common use cases. Browse them at [/templates](/templates).`,
    },
];

function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                title="Copy code"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
            </button>
            <pre className="p-4 bg-navy-950/80 rounded-xl border border-white/10 text-sm font-mono text-gray-300 overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
}

function renderContent(content: string) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let codeBlock: string[] = [];
    let inCode = false;
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith("```")) {
            if (inCode) {
                elements.push(<CodeBlock key={key++} code={codeBlock.join("\n")} />);
                codeBlock = [];
                inCode = false;
            } else {
                inCode = true;
            }
            continue;
        }

        if (inCode) {
            codeBlock.push(line);
            continue;
        }

        if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
            elements.push(
                <h4 key={key++} className="text-base font-bold text-white mt-6 mb-2">
                    {line.slice(2, -2)}
                </h4>
            );
        } else if (line.startsWith("- [ ] ")) {
            elements.push(
                <div key={key++} className="flex items-center gap-2 text-sm text-gray-400 py-1">
                    <div className="w-4 h-4 rounded border border-white/20 flex-shrink-0" />
                    {line.slice(6)}
                </div>
            );
        } else if (line.startsWith("- ")) {
            elements.push(
                <div key={key++} className="flex items-start gap-2 text-sm text-gray-400 py-0.5">
                    <span className="text-gold-400 mt-1.5 flex-shrink-0">•</span>
                    <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-gold-400 hover:underline">$1</a>') }} />
                </div>
            );
        } else if (line === "") {
            elements.push(<div key={key++} className="h-2" />);
        } else {
            elements.push(
                <p key={key++} className="text-sm text-gray-400 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono text-gold-300">$1</code>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-gold-400 hover:underline">$1</a>') }}
                />
            );
        }
    }

    return elements;
}

export default function DocsClient() {
    const [search, setSearch] = useState("");
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const filteredSections = DOC_SECTIONS.filter(
        (s) =>
            s.title.toLowerCase().includes(search.toLowerCase()) ||
            s.articles.some((a) => a.title.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/[0.04] rounded-full blur-3xl" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            <BookOpen className="w-3.5 h-3.5" />
                            Documentation
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            BridgeFlow{" "}
                            <span className="gold-text">Documentation</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed mb-8">
                            Everything you need to build, deploy, and scale your automations with BridgeFlow.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <div className="max-w-lg mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search documentation..."
                                className="w-full pl-11 pr-5 py-4 bg-navy-900/80 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors text-sm"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Quick Links */}
            <section className="border-y border-white/5 bg-navy-900/20">
                <div className="container-max px-4 sm:px-6 py-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mr-2">Quick Links:</span>
                        {QUICK_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                <link.icon className={`w-3.5 h-3.5 ${link.color}`} />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-max px-4 sm:px-6">
                    <div className="lg:grid lg:grid-cols-[280px_1fr] gap-12">
                        {/* Sidebar */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24 space-y-1">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-3">Contents</h3>
                                {DOC_SECTIONS.map((section) => (
                                    <div key={section.id}>
                                        <button
                                            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${activeSection === section.id ? "bg-gold-400/10 text-gold-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                                        >
                                            <section.icon className="w-4 h-4 flex-shrink-0" />
                                            {section.title}
                                            <ChevronRight className={`w-3 h-3 ml-auto transition-transform ${activeSection === section.id ? "rotate-90" : ""}`} />
                                        </button>
                                        {activeSection === section.id && (
                                            <div className="ml-6 mt-1 space-y-0.5">
                                                {section.articles.map((article) => (
                                                    <Link
                                                        key={article.title}
                                                        href={article.href}
                                                        className="block px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/5"
                                                    >
                                                        {article.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-white/5 mt-4">
                                    <Link
                                        href="/api-reference"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <Code2 className="w-4 h-4" />
                                        API Reference
                                        <ExternalLink className="w-3 h-3 ml-auto" />
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <Users className="w-4 h-4" />
                                        Get Support
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Doc Content */}
                        <main className="min-w-0">
                            {/* Section Cards */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                                {filteredSections.map((section, i) => (
                                    <ScrollReveal key={section.id} delay={i * 0.05}>
                                        <Card className="h-full group hover:bg-white/[0.02] transition-colors cursor-pointer" hover={false}>
                                            <div className="flex items-start gap-4">
                                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                    <section.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base font-display font-bold text-white mb-1">{section.title}</h3>
                                                    <p className="text-xs text-gray-500 mb-3">{section.description}</p>
                                                    <ul className="space-y-1">
                                                        {section.articles.slice(0, 3).map((article) => (
                                                            <li key={article.title}>
                                                                <Link
                                                                    href={article.href}
                                                                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-gold-400 transition-colors group/link"
                                                                >
                                                                    <ChevronRight className="w-3 h-3 text-gray-600 group-hover/link:text-gold-400 flex-shrink-0" />
                                                                    <span className="truncate">{article.title}</span>
                                                                    <span className="ml-auto text-gray-600 flex-shrink-0">{article.time}</span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </Card>
                                    </ScrollReveal>
                                ))}
                            </div>

                            {/* Article Content */}
                            <div className="space-y-16">
                                {CONTENT_SECTIONS.map((section) => (
                                    <article
                                        key={section.id}
                                        id={section.id}
                                        className="scroll-mt-24 border-t border-white/5 pt-12 first:border-t-0 first:pt-0"
                                    >
                                        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                                            <span className="w-1 h-6 bg-gradient-to-b from-gold-400 to-amber-600 rounded-full flex-shrink-0" />
                                            {section.title}
                                        </h2>
                                        <div className="space-y-2">
                                            {renderContent(section.content)}
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Help CTA */}
                            <div className="mt-16 p-8 rounded-2xl glass border border-white/10 text-center">
                                <Star className="w-8 h-8 text-gold-400 mx-auto mb-4" />
                                <h3 className="text-xl font-display font-bold text-white mb-2">Need personalised help?</h3>
                                <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                                    Our team can walk you through any integration, build custom workflows, or answer technical questions directly.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider gold-gradient text-navy-950 rounded-xl hover:shadow-[0_0_25px_rgba(230,180,34,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                                    >
                                        Contact Support
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/services/consulting"
                                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
                                    >
                                        Book a Strategy Call
                                    </Link>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
}
