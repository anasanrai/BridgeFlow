import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui";
import { FileText, Gavel, CheckCircle2, AlertCircle, DollarSign, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "BridgeFlow Client Service Agreement and Terms of Service — the legal agreement governing use of our AI automation services.",
};

export default function TermsOfService() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            <Gavel className="w-3.5 h-3.5" />
                            Legal
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
                            Terms of <span className="gold-text">Service</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-gray-400">Last updated: March 2026</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding pt-12">
                <div className="container-max max-w-4xl px-4 sm:px-6">
                    <div className="space-y-8">
                        {/* 1. Services */}
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8 border border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <FileText className="w-6 h-6 text-gold-400" />
                                    <h2 className="text-2xl font-display font-bold text-white">1. Services</h2>
                                </div>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Bridgeflow agrees to provide the Client with AI automation setup, development, and support services as detailed in the Scope of Work document associated with the selected package. Services may include, but are not limited to, process analysis, automation design, software development, system integration, and ongoing maintenance.
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                    {[
                                        "Process Analysis & Strategy",
                                        "Automation Design & Architecture",
                                        "Custom Software Development",
                                        "System Integration (n8n, Make, etc.)",
                                        "AI Model Implementation",
                                        "Ongoing Maintenance & Support"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                            <CheckCircle2 className="w-4 h-4 text-gold-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>

                        {/* 2. Payment Terms */}
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8 border border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <DollarSign className="w-6 h-6 text-gold-400" />
                                    <h2 className="text-2xl font-display font-bold text-white">2. Payment Terms</h2>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">2.1 Project Fees</h3>
                                        <p className="text-gray-400">The total cost for the services will be outlined in the Scope of Work document provided during the onboarding process.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">2.2 Payment Schedule</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-white/10">
                                                        <th className="py-3 px-4 text-gold-400">Milestone</th>
                                                        <th className="py-3 px-4 text-gold-400">Amount</th>
                                                        <th className="py-3 px-4 text-gold-400">Due Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5 text-gray-400">
                                                    <tr>
                                                        <td className="py-3 px-4">Initial Deposit</td>
                                                        <td className="py-3 px-4 font-bold text-white">50%</td>
                                                        <td className="py-3 px-4">Before work commences</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-3 px-4">Final Payment</td>
                                                        <td className="py-3 px-4 font-bold text-white">50%</td>
                                                        <td className="py-3 px-4">Upon delivery & sign-off</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-3 px-4">Monthly Retainer</td>
                                                        <td className="py-3 px-4 font-bold text-white">As per SOW</td>
                                                        <td className="py-3 px-4">1st of each month</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="mt-4 text-sm text-gray-500 italic">
                                            * A non-refundable deposit of 50% is required before any work commences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 3. Refund Policy */}
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8 border border-red-500/10 bg-red-500/5">
                                <div className="flex items-center gap-3 mb-6">
                                    <AlertCircle className="w-6 h-6 text-red-400" />
                                    <h2 className="text-2xl font-display font-bold text-white">3. Refund Policy</h2>
                                </div>
                                <div className="space-y-4">
                                    <p className="font-bold text-white">Strict No-Refund Policy</p>
                                    <p className="text-gray-400 leading-relaxed">
                                        Due to the nature of our services, which involve significant upfront investment in time, resources, and proprietary expertise, Bridgeflow does not offer refunds for any payments made once work has commenced. The initial 50% deposit is strictly non-refundable.
                                    </p>
                                    <div className="bg-navy-900/50 p-4 rounded-xl border border-white/5">
                                        <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4" /> 30-Day Satisfaction Guarantee
                                        </h3>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            We offer a 30-day satisfaction guarantee beginning upon final delivery. If you are not satisfied, Bridgeflow will make all commercially reasonable efforts to revise the work to meet the original Scope of Work specifications.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 4. Intellectual Property */}
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8 border border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Shield className="w-6 h-6 text-gold-400" />
                                    <h2 className="text-2xl font-display font-bold text-white">4. Intellectual Property</h2>
                                </div>
                                <div className="space-y-4 text-gray-400">
                                    <p>
                                        <span className="text-white font-bold">4.1 Pre-Existing IP:</span> Each party retains all rights, title, and interest in its own pre-existing intellectual property, including proprietary tools, libraries, frameworks, and methodologies.
                                    </p>
                                    <p>
                                        <span className="text-white font-bold">4.2 Developed IP:</span> Upon receipt of full and final payment, Bridgeflow grants and assigns to the Client all rights, title, and interest in the custom-developed automation solutions created specifically for the Client. Bridgeflow retains ownership of its underlying proprietary technologies.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 5. Confidentiality & Termination */}
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8 border border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Clock className="w-6 h-6 text-gold-400" />
                                    <h2 className="text-2xl font-display font-bold text-white">5. Confidentiality & Termination</h2>
                                </div>
                                <div className="space-y-4 text-gray-400">
                                    <p>
                                        Both parties agree to protect the other's confidential information as set forth in the Non-Disclosure Agreement (NDA). Confidential Information includes technical data, product plans, software, processes, and business strategies.
                                    </p>
                                    <p>
                                        Either party may terminate this Agreement with <span className="text-white font-bold">thirty (30) days' written notice</span>. In the event of termination by the Client, the Client agrees to pay for all work completed up to the date of termination.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Governing Law */}
                        <ScrollReveal>
                            <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
                                <p>Governing Law: This Agreement shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.</p>
                                <p className="mt-2">© 2026 Bridgeflow AI Automation Agency. All rights reserved.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
