import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui";
import { RefreshCcw } from "lucide-react";

export const metadata: Metadata = {
    title: "Refund Policy",
    description: "BridgeFlow's clear, scope-based refund policy for automation services and templates.",
};

export default function RefundPolicy() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-950" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />
                <div className="relative z-10 container mx-auto text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-widest text-brand-coral border border-brand-coral/20 rounded-full bg-brand-coral/5">
                            <RefreshCcw className="w-3.5 h-3.5" />
                            Legal Protocol
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-4 text-white">
                            Refund <span className="text-brand-coral">Policy</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-neutral-400 font-bold uppercase tracking-widest text-sm">Last Updated: March 2026</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 bg-neutral-950 relative">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="space-y-8">
                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">Our Guarantee: Honest Engineering</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    At BridgeFlow, we operate on a principle of Radical Honesty. We don't want your money if we can't deliver value. However, building custom automation systems requires significant engineering effort upfront. Our refund policy is designed to be fair to both parties, protecting your investment while compensating our engineers for their time.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">1. Custom Automation Services (Starter, Growth, Pro)</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed mb-6">Our custom service packages operate on a milestone and revision-based model.</p>
                                
                                <ul className="list-disc list-inside text-neutral-400 space-y-3 mb-6">
                                    <li><strong className="text-white">Failure to Deliver:</strong> If, after utilizing your allocated revision rounds (2 rounds for Starter/Growth, 3 rounds for Pro), we are technically unable to deliver the automation system defined in the initial agreed-upon Scope of Work, we will issue a full 100% refund of your deposit, no questions asked.</li>
                                    <li><strong className="text-white">Change of Mind:</strong> We do not offer refunds if you experience a "change of mind", decide to pivot your business model mid-build, or choose to abandon the project after engineering work has commenced.</li>
                                    <li><strong className="text-white">Third-Party Failures:</strong> We cannot guarantee refunds if a project fails because a third-party software you rely on (e.g., a specific CRM or SaaS) completely changes their API access, revokes connection privileges, or goes out of business during the build phase.</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">2. Template Marketplace (Digital Goods)</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    Due to the irretrievable nature of digital products, all purchases from the n8n Templates Marketplace are strictly <strong className="text-white">non-refundable</strong> once downloaded. If you experience technical issues deploying the JSON file, our support team will assist you in getting it running as advertised, but we cannot issue a refund simply because you decided you no longer want the template.
                                </p>
                            </div>
                        </ScrollReveal>

                         <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">3. Monthly Retainers</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    Retainer services are billed monthly in advance. You may cancel your retainer at any time with a 30-day written notice. We do not offer retroactive refunds for retainer months that have already begun or concluded, as you are paying for our engineers' reserved availability and proactive monitoring, regardless of how many support tickets you submitted that month.
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        <ScrollReveal>
                            <div className="rounded-[40px] border-2 border-brand-teal/20 bg-brand-teal/5 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">Requesting a Refund</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    If you believe you are entitled to a refund based on failure to deliver the agreed Scope of Work, please email <strong>billing@bridgeflow.agency</strong>. We will review the project status, documentation, and revision logs, and respond with a resolution within 3 business days. Approved refunds are processed back to the original payment method within 7 business days.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
