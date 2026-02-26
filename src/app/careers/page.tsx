"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ScrollReveal,
    SectionHeader,
    Card,
} from "@/components/ui";
import {
    ArrowRight,
    MapPin,
    Clock,
    Briefcase,
    Send,
    Loader2,
    CheckCircle,
    Users,
    Sparkles,
} from "lucide-react";

const openRoles = [
    {
        title: "AI Automation Engineer",
        location: "Remote",
        type: "Full-time",
        description:
            "Design, build, and deploy intelligent automation workflows using n8n, Make, and custom AI integrations. You'll work directly with clients to architect systems that save thousands of hours.",
        requirements: [
            "3+ years experience with workflow automation platforms",
            "Strong understanding of REST APIs and webhooks",
            "Experience with AI/ML model integration (GPT, Claude, etc.)",
            "Excellent problem-solving and communication skills",
        ],
    },
    {
        title: "Growth & Outreach Specialist",
        location: "Remote",
        type: "Part-time",
        description:
            "Drive awareness and lead generation for BridgeFlow through content marketing, partnerships, and outbound campaigns. Help us reach businesses ready to embrace AI automation.",
        requirements: [
            "2+ years in B2B marketing or growth roles",
            "Experience with CRM tools (GoHighLevel, HubSpot, etc.)",
            "Strong copywriting and content creation skills",
            "Self-motivated with a track record of hitting targets",
        ],
    },
];

export default function Careers() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        linkedin: "",
        role: "",
        whyBridgeflow: "",
        portfolio: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitted(true);
        setSubmitting(false);
    };

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/[0.04] rounded-full blur-3xl" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            <Users className="w-3.5 h-3.5" />
                            We&apos;re Hiring
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            Join the BridgeFlow{" "}
                            <span className="gold-text">Team</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
                            We&apos;re a remote-first AI automation company. We hire for
                            talent, not location.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Open Roles */}
            <section className="section-padding">
                <div className="container-max max-w-4xl">
                    <SectionHeader
                        badge="Open Positions"
                        title="Current"
                        highlight="openings"
                        description="Join us in building the future of business automation."
                    />

                    <div className="space-y-6">
                        {openRoles.map((role, i) => (
                            <ScrollReveal key={role.title} delay={i * 0.1}>
                                <div className="premium-card glass rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-gold-400/20 transition-all duration-500">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-display font-bold text-white mb-2">
                                                {role.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full">
                                                    <MapPin className="w-3 h-3" />
                                                    {role.location}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 bg-white/5 px-3 py-1 rounded-full">
                                                    <Clock className="w-3 h-3" />
                                                    {role.type}
                                                </span>
                                            </div>
                                        </div>
                                        <a
                                            href="#apply"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider gold-gradient text-navy-950 rounded-full hover:shadow-[0_0_25px_rgba(230,180,34,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0"
                                        >
                                            Apply
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed mb-4">
                                        {role.description}
                                    </p>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white mb-2">
                                            Requirements:
                                        </h4>
                                        <ul className="space-y-1.5">
                                            {role.requirements.map((req, j) => (
                                                <li
                                                    key={j}
                                                    className="flex items-start gap-2 text-sm text-gray-400"
                                                >
                                                    <Sparkles className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="apply" className="section-padding bg-navy-900/20">
                <div className="container-max max-w-2xl">
                    <SectionHeader
                        badge="Apply Now"
                        title="General"
                        highlight="application"
                        description="Interested in joining us? Fill out the form below and we'll get back to you."
                    />

                    <ScrollReveal>
                        <Card hover={false} className="!p-8 lg:!p-10">
                            {submitted ? (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle className="w-8 h-8 text-gold-400" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-3">
                                        Application Received!
                                    </h3>
                                    <p className="text-gray-400 max-w-md mx-auto">
                                        Thank you for your interest in BridgeFlow. We&apos;ll review
                                        your application and get back to you within 5 business days.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Full Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => updateField("fullName", e.target.value)}
                                            placeholder="Your full name"
                                            className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Email <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => updateField("email", e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors"
                                        />
                                    </div>

                                    {/* LinkedIn */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            LinkedIn Profile URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.linkedin}
                                            onChange={(e) => updateField("linkedin", e.target.value)}
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors"
                                        />
                                    </div>

                                    {/* Role Interested In */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Role Interested In <span className="text-red-400">*</span>
                                        </label>
                                        <select
                                            required
                                            value={formData.role}
                                            onChange={(e) => updateField("role", e.target.value)}
                                            className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-400/50 transition-colors appearance-none"
                                        >
                                            <option value="" className="bg-navy-950">Select a role...</option>
                                            <option value="AI Automation Engineer" className="bg-navy-950">
                                                AI Automation Engineer
                                            </option>
                                            <option value="Growth & Outreach Specialist" className="bg-navy-950">
                                                Growth &amp; Outreach Specialist
                                            </option>
                                            <option value="General Application" className="bg-navy-950">
                                                General Application
                                            </option>
                                        </select>
                                    </div>

                                    {/* Why BridgeFlow */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Why BridgeFlow? <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.whyBridgeflow}
                                            onChange={(e) => updateField("whyBridgeflow", e.target.value)}
                                            placeholder="Tell us why you want to join BridgeFlow and what excites you about AI automation..."
                                            className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Portfolio / GitHub */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Portfolio / GitHub URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.portfolio}
                                            onChange={(e) => updateField("portfolio", e.target.value)}
                                            placeholder="https://github.com/yourusername"
                                            className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest gold-gradient text-navy-950 rounded-full hover:shadow-[0_0_30px_rgba(230,180,34,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Apply Now
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </Card>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
