import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "BridgeFlow Terms of Service — the rules and guidelines governing the use of our automation products and services.",
};

export default function TermsOfService() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-950" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />
                <div className="relative z-10 container mx-auto text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-widest text-brand-coral border border-brand-coral/20 rounded-full bg-brand-coral/5">
                            <FileText className="w-3.5 h-3.5" />
                            Legal Protocol
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-4 text-white">
                            Terms of <span className="text-brand-coral">Service</span>
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
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">1. Agreement to Terms</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    By accessing or using the services provided by BridgeFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), including our website (bridgeflow.agency), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access or use our services.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">2. Our Services</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed mb-6">BridgeFlow operates as an AI automation agency offering the following core services:</p>

                                <ul className="list-disc list-inside text-neutral-400 space-y-3 mb-8">
                                    <li><strong className="text-white">Custom Automation Services:</strong> (Starter, Growth, Pro packages) Building tailored n8n workflows and AI integrations for your business.</li>
                                    <li><strong className="text-white">Automation Retainers:</strong> Ongoing support, monitoring, and proactive optimization of deployed systems.</li>
                                    <li><strong className="text-white">n8n Template Marketplace:</strong> Providing pre-built workflow JSON files for self-deployment by technical teams.</li>
                                </ul>

                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    We do not guarantee specific financial results (e.g., doubling your revenue). Automation removes manual work; it is up to your business model to convert that saved time into revenue.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">3. Payment & Billing</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed mb-6">Our payment structure prioritizes transparency and mutual commitment:</p>
                                <ul className="list-disc list-inside text-neutral-400 space-y-3">
                                    <li><strong className="text-white">Upfront Payments:</strong> Starter packages ($497) require 100% payment upfront. Growth ($997) and Pro ($1,797) packages require 50% upfront to initiate the build phase, with the remaining 50% due immediately upon successful delivery and sign-off.</li>
                                    <li><strong className="text-white">Retainers:</strong> Billed monthly. Can be cancelled at any time with a 30-day written notice.</li>
                                    <li><strong className="text-white">Templates:</strong> 100% upfront payment upon download. Due to the digital nature of the product, template purchases are non-refundable.</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">4. Refund Policy</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    We offer a scope-based refund policy. If, after utilizing your allocated revision rounds (2 rounds for Starter/Growth, 3 rounds for Pro), we are unable to deliver the automation system defined in the initial agreed-upon scope, we will issue a full refund without questions. We do not offer refunds if you change your mind, pivot your business model mid-build, or if third-party APIs change their pricing or functionality.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">5. Intellectual Property</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed mb-6">Who owns what when the project is done?</p>
                                <ul className="list-disc list-inside text-neutral-400 space-y-3">
                                    <li><strong className="text-white">You Own:</strong> Upon final payment, you own the deployed n8n workflow JSON files, data schemas, and the explicit rights to run and modify the automation for your business.</li>
                                    <li><strong className="text-white">We Retain:</strong> We retain the right to re-use underlying code blocks, architectural patterns, and generic logic structures built during the project to serve other clients or create templates (provided no proprietary client data or unique business secrets are exposed).</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">6. Client Responsibilities</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    Timely delivery requires participation. You agree to provide necessary API keys, SaaS account access, and prompt feedback during the build phase. If a project is blocked for more than 14 days due to client inaction, BridgeFlow reserves the right to pause the project and require a reactivation fee, or conclude the engagement, retaining the upfront deposit.
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        <ScrollReveal>
                            <div className="rounded-[40px] border-2 border-brand-teal/20 bg-brand-teal/5 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">7. Governing Law</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    These Terms shall be governed by and construed in accordance with the laws, without regard to its conflict of law provisions. As a global remote-first agency headquartered in Kathmandu, Nepal, any disputes shall seek mutual resolution through arbitration before proceeding to formal legal venues.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
