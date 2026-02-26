"use client";

import {
    Zap,
    BarChart3,
    Globe,
    Bot,
    Network,
    Workflow,
    ArrowRight,
    Tag,
} from "lucide-react";

const partners = [
    {
        name: "n8n Cloud",
        badge: "Recommended",
        badgeColor: "text-gold-400 bg-gold-400/10 border-gold-400/20",
        description:
            "The most powerful workflow automation tool we build on. Start automating today.",
        href: "https://n8n.io/?ref=bridgeflow",
        icon: Zap,
    },
    {
        name: "GoHighLevel",
        badge: "Partner",
        badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        description:
            "All-in-one CRM, funnels, and marketing automation. Perfect for agencies.",
        href: "https://www.gohighlevel.com/main-page?fp_ref=bridgeflow-agency97",
        icon: BarChart3,
    },
    {
        name: "Hostinger",
        badge: "Hosting Partner",
        badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
        description:
            "Reliable hosting with 99.9% uptime. Get started with our exclusive referral discount.",
        href: "https://hostinger.com?REFERRALCODE=RWWRAIANAQZ4",
        icon: Globe,
    },
    {
        name: "OpenClaw",
        badge: "AI Partner",
        badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
        description:
            "Powerful AI tool integration for n8n workflows. Supercharge your automations with cutting-edge AI capabilities.",
        href: "https://openclaw.ai",
        icon: Bot,
    },
    {
        name: "OpenRouter",
        badge: "AI Gateway",
        badgeColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
        description:
            "Access 100+ AI models through one unified API. We use it to power AI nodes inside every automation we build.",
        href: "https://openrouter.ai",
        icon: Network,
    },
    {
        name: "Zapier",
        badge: "Integration",
        badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
        description:
            "Quick integrations for 5,000+ apps. Great for simple automation needs.",
        href: "https://zapier.com",
        icon: Workflow,
    },
];

export default function PartnersSection() {
    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {partners.map((partner) => (
                    <a
                        key={partner.name}
                        href={partner.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block rounded-2xl glass border border-white/10 hover:border-gold-400/30 transition-all duration-500 overflow-hidden h-full"
                    >
                        {/* Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full border ${partner.badgeColor}`}
                            >
                                <Tag className="w-2.5 h-2.5" />
                                {partner.badge}
                            </span>
                        </div>

                        <div className="p-6 lg:p-8 flex flex-col h-full">
                            {/* Logo */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400/10 to-purple-500/10 border border-white/10 flex items-center justify-center mb-5 mx-auto group-hover:scale-110 group-hover:from-gold-400/20 group-hover:to-purple-500/20 transition-all duration-500">
                                <partner.icon className="w-8 h-8 text-gold-400" />
                            </div>

                            {/* Name */}
                            <h3 className="text-lg font-display font-bold text-white text-center mb-2">
                                {partner.name}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed text-center mb-5 flex-1">
                                {partner.description}
                            </p>

                            {/* CTA Button */}
                            <div className="flex justify-center">
                                <span className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5 group-hover:bg-gold-400/10 group-hover:border-gold-400/30 transition-all duration-300">
                                    Learn More
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Disclaimer */}
            <p className="text-center text-xs text-gray-500 italic mt-8">
                * Some links are affiliate links. We only recommend tools we actively use and trust.
            </p>
        </>
    );
}
