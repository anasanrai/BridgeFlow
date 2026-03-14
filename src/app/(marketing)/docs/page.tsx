import { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal, Card } from "@/components/ui";
import { siteConfig } from "@/data/site";
import { 
    BookOpen, 
    Zap, 
    Workflow, 
    Bot, 
    Webhook, 
    Puzzle, 
    Code2, 
    ArrowRight, 
    ChevronRight,
    Search
} from "lucide-react";

export const metadata: Metadata = {
    title: `Documentation | ${siteConfig.name}`,
    description: `Learn how to build, deploy, and scale automations with ${siteConfig.name}.`,
};

const DOC_SECTIONS = [
    {
        id: "getting-started",
        icon: Zap,
        title: "Getting Started",
        color: "from-gold-600 to-amber-400",
        description: "Everything you need to get your first automation running.",
        articles: [
            { title: "What is BridgeFlow?", time: "3 min read", href: "#" },
            { title: "How automation works", time: "5 min read", href: "#" },
            { title: "Your first workflow", time: "10 min read", href: "#" },
            { title: "Connecting your tools", time: "7 min read", href: "#" },
        ],
    },
    {
        id: "n8n",
        icon: Workflow,
        title: "n8n Automation",
        color: "from-blue-600 to-cyan-400",
        description: "Build powerful workflows with n8n — the open-source automation platform.",
        articles: [
            { title: "n8n overview & setup", time: "8 min read", href: "#" },
            { title: "Creating your first n8n workflow", time: "12 min read", href: "#" },
            { title: "Using webhooks in n8n", time: "6 min read", href: "#" },
            { title: "n8n + AI nodes guide", time: "10 min read", href: "#" },
        ],
    },
    {
        id: "ai-integration",
        icon: Bot,
        title: "AI Integration",
        color: "from-purple-600 to-pink-400",
        description: "Integrate GPT-4, Claude, and other AI models into your workflows.",
        articles: [
            { title: "Choosing the right AI model", time: "5 min read", href: "#" },
            { title: "Building AI chatbots", time: "15 min read", href: "#" },
            { title: "AI-powered data extraction", time: "10 min read", href: "#" },
            { title: "Fine-tuning for your use case", time: "20 min read", href: "#" },
        ],
    },
    {
        id: "webhooks",
        icon: Webhook,
        title: "Webhooks & Events",
        color: "from-emerald-600 to-teal-400",
        description: "Trigger automations in real-time with webhook events.",
        articles: [
            { title: "Understanding webhooks", time: "4 min read", href: "#" },
            { title: "Setting up inbound webhooks", time: "8 min read", href: "#" },
            { title: "Outbound event notifications", time: "6 min read", href: "#" },
            { title: "Webhook security & validation", time: "5 min read", href: "#" },
        ],
    },
    {
        id: "integrations",
        icon: Puzzle,
        title: "Integrations",
        color: "from-orange-500 to-red-400",
        description: "Connect BridgeFlow with your existing tools and platforms.",
        articles: [
            { title: "GoHighLevel CRM setup", time: "12 min read", href: "#" },
            { title: "Slack notifications", time: "5 min read", href: "#" },
            { title: "Google Workspace", time: "8 min read", href: "#" },
            { title: "HubSpot integration", time: "10 min read", href: "#" },
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

export default function DocsPage() {
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="container-max px-4 sm:px-6">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold-400/20 mb-6">
                            <BookOpen className="w-4 h-4 text-gold-400" />
                            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Knowledge Base</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            BridgeFlow <span className="gold-text">Documentation</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Comprehensive guides and references to help you build enterprise-grade automation systems.
                        </p>
                        
                        <div className="mt-10 relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Search documentation..." 
                                className="w-full pl-12 pr-4 py-4 bg-navy-900/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-gold-400/50 transition-all"
                            />
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DOC_SECTIONS.map((section, idx) => (
                        <ScrollReveal key={section.id} delay={idx * 0.05}>
                            <Card className="h-full p-8 group hover:border-gold-400/30 transition-all flex flex-col">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <div className="w-full h-full rounded-[14px] bg-navy-950 flex items-center justify-center">
                                        <section.icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                
                                <h2 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                                    {section.title}
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                                    {section.description}
                                </p>
                                
                                <ul className="space-y-4 mb-8">
                                    {section.articles.map((article) => (
                                        <li key={article.title}>
                                            <Link 
                                                href={article.href}
                                                className="flex items-center justify-between group/link"
                                            >
                                                <span className="text-sm text-gray-300 group-hover/link:text-white transition-colors flex items-center gap-2">
                                                    <ChevronRight className="w-3.5 h-3.5 text-gold-400/50 group-hover/link:text-gold-400" />
                                                    {article.title}
                                                </span>
                                                <span className="text-[10px] text-gray-600 font-medium uppercase tracking-tighter">
                                                    {article.time}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                
                                <Link 
                                    href="#"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-gold-400 hover:gap-3 transition-all"
                                >
                                    Explore Section
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
