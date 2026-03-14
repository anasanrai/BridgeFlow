import type { Metadata } from "next";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Clock, Globe, Zap } from "lucide-react";
import { plans, pricingHero, pricingFAQ } from "@/data/pricing";
import { getSiteConfig } from "@/lib/supabase-data";
import PricingCard from "@/components/marketing/PricingCard";
import ROICalculator from "@/components/marketing/ROICalculator";


export const revalidate = 60;

export async function generateMetadata() {
    const site = await getSiteConfig();
    return {
        title: `Pricing | ${site.name}`,
        description: "Transparent founding-member pricing for AI-powered automation services. Limited spots available at special rates.",
        alternates: { canonical: `${site.url}/pricing` },
        openGraph: {
            title: `Pricing | ${site.name}`,
            description: "Simple, transparent pricing for AI automation services.",
            url: `${site.url}/pricing`,
            type: "website",
        },
    };
}

export default function Pricing() {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: pricingFAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };

    return (
        <main className="bg-neutral-950 min-h-screen text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-neutral-950">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-10">
                            <Sparkles className="w-4 h-4 text-brand-coral" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                                {pricingHero.badge}
                            </span>
                        </div>
                    </ScrollReveal>
                    
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                        {pricingHero.title} <span className="text-brand-coral">{pricingHero.highlight}</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-xl text-neutral-400 font-medium mb-12">
                        {pricingHero.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-10">
                        {[
                            { icon: Shield, text: "Secure Infrastructure" },
                            { icon: Clock, text: "Fast Delivery" },
                            { icon: Zap, text: "ROI Focused" },
                            { icon: Globe, text: "Global Standards" },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-3">
                                <Icon className="w-4 h-4 text-brand-coral" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-500">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans Grid */}
            <section className="pb-32 relative">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {plans.map((plan, i) => (
                            <PricingCard key={plan.name} plan={plan} index={i} />
                        ))}
                    </div>

                    {/* Payment Network */}
                    <div className="mt-24 p-12 rounded-[40px] border border-white/5 bg-neutral-900/50 text-center">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-8">Global Payment Network</h4>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            {["PayPal", "Bank Transfer", "Wise", "USDT", "ESewa", "Khalti"].map((method) => (
                                <span key={method} className="px-6 py-3 rounded-full bg-white/5 border border-white/5 text-[11px] font-bold text-white uppercase tracking-widest">
                                    {method}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI Calculator Section */}
            <section className="py-32 border-t border-white/5 bg-neutral-900/20">
                <div className="container mx-auto px-4">
                    <ROICalculator />
                </div>
            </section>

            {/* FAQ Overhaul */}
            <section className="py-32 lg:py-64 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                            Transparent <span className="text-brand-teal">Intel</span>
                        </h2>
                        <p className="text-lg text-neutral-400 font-bold uppercase tracking-widest">Common Questions Answered</p>
                    </div>

                    <div className="space-y-4">
                        {pricingFAQ.map((item) => (
                            <div key={item.q} className="p-10 rounded-[40px] border border-white/5 bg-neutral-900/30">
                                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-4">
                                    {item.q}
                                </h4>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 lg:py-64">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto rounded-[60px] border border-white/10 p-20 text-center relative overflow-hidden bg-brand-coral">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
                            Enterprise Custom?
                        </h2>
                        <p className="text-xl text-white/80 font-bold uppercase tracking-widest mb-12">
                            Hybrid plans for unique requirements
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-16 py-8 bg-white text-brand-coral text-2xl font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_80px_-15px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-2 active:scale-95"
                        >
                            Talk to Scale
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
