import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Clock, CheckCircle2, AlertCircle, Mail, DollarSign, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Client Service Agreement | BridgeFlow AI Automation Agency",
    description: "BridgeFlow's standard Client Service Agreement governing AI automation services, payment terms, intellectual property, and confidentiality.",
    alternates: { canonical: "https://bridgeflow.agency/client-service-agreement" },
};

const lastUpdated = "March 1, 2025";

export default function ClientServiceAgreement() {
    return (
        <div className="min-h-screen bg-navy-950">
            {/* Header */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/30 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gold-400 transition-colors mb-8 uppercase tracking-wider font-semibold"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-gold-400/10 border border-gold-400/20">
                            <FileText className="w-6 h-6 text-gold-400" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Legal</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                        Client Service Agreement
                    </h1>
                    <p className="text-gray-400 text-lg mb-6">
                        BridgeFlow | AI Automation Agency
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        Effective: {lastUpdated}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-24">
                <div className="container-max px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">

                    {/* Intro */}
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-gray-400 leading-relaxed">
                            This Client Service Agreement (the &quot;Agreement&quot;) is entered into between <strong className="text-white">BridgeFlow</strong> (&quot;Service Provider&quot;) and the Client.
                            This Agreement governs all AI automation setup, development, and support services provided by BridgeFlow.
                        </p>
                    </div>

                    {/* Section 1 — Services */}
                    <div className="glass rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">1</span>
                            Services
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            BridgeFlow agrees to provide the Client with AI automation setup, development, and support services as detailed in the
                            Scope of Work document associated with the selected package. Services may include, but are not limited to:
                        </p>
                        <ul className="space-y-2">
                            {[
                                "Process analysis and automation design",
                                "Software development and workflow engineering",
                                "System integration (CRM, email, APIs, databases)",
                                "AI model configuration and deployment",
                                "Ongoing maintenance and optimization",
                                "Documentation and training",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 2 — Payment Terms */}
                    <div className="glass rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">2</span>
                            Payment Terms
                        </h2>

                        <h3 className="text-base font-bold text-white mb-2">2.1 Project Fees</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            The total cost for the services will be outlined in the Scope of Work document. All fees are quoted in USD unless otherwise agreed.
                        </p>

                        <h3 className="text-base font-bold text-white mb-2">2.2 Payment Schedule</h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            A non-refundable deposit of 50% of the total project fee is required before any work commences.
                            The remaining 50% is due upon the final delivery and sign-off of the completed automation project.
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-3 pr-6 text-gray-400 font-semibold">Payment Milestone</th>
                                        <th className="text-left py-3 pr-6 text-gray-400 font-semibold">Amount Due</th>
                                        <th className="text-left py-3 text-gray-400 font-semibold">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { milestone: "Initial Deposit (50%)", amount: "50% of total project fee", due: "Before work commences" },
                                        { milestone: "Final Payment (50%)", amount: "50% of total project fee", due: "Upon delivery & sign-off" },
                                        { milestone: "Monthly Retainer", amount: "As per Scope of Work", due: "First of each month" },
                                    ].map((row) => (
                                        <tr key={row.milestone}>
                                            <td className="py-3 pr-6 text-white font-medium">{row.milestone}</td>
                                            <td className="py-3 pr-6 text-gray-400">{row.amount}</td>
                                            <td className="py-3 text-gray-400">{row.due}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section 3 — IP */}
                    <div className="glass rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">3</span>
                            Intellectual Property Rights
                        </h2>
                        <h3 className="text-base font-bold text-white mb-2">3.1 Pre-Existing Intellectual Property</h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Each party will retain all rights, title, and interest in its own pre-existing intellectual property, including but not limited to
                            proprietary tools, libraries, frameworks, and methodologies.
                        </p>
                        <h3 className="text-base font-bold text-white mb-2">3.2 Developed Intellectual Property</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Upon receipt of full and final payment, BridgeFlow grants and assigns to the Client all rights, title, and interest in the
                            custom-developed automation solutions created specifically for the Client under this Agreement. BridgeFlow retains ownership of
                            all its proprietary tools, libraries, and underlying technologies used to develop the solution.
                        </p>
                    </div>

                    {/* Section 4 — Confidentiality */}
                    <div className="glass rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">4</span>
                            Confidentiality
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            Both parties agree to protect the other&apos;s confidential information. The terms governing confidentiality are set forth in the
                            Non-Disclosure Agreement (NDA) executed concurrently with this Agreement.
                        </p>
                    </div>

                    {/* Section 5 — Term & Termination */}
                    <div className="glass rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">5</span>
                            Term and Termination
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-3">
                            This Agreement shall commence on the effective date and will continue until the services are completed and delivered,
                            or until terminated by either party.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Either party may terminate this Agreement with thirty (30) days&apos; written notice. In the event of termination by the Client,
                            the Client agrees to pay for all work completed up to the date of termination.
                        </p>
                    </div>

                    {/* Section 6 — Satisfaction Guarantee */}
                    <div className="glass rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">6</span>
                            Satisfaction Guarantee
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            BridgeFlow offers a 30-day satisfaction guarantee commencing upon final delivery of the project. If the Client is not satisfied
                            with the delivered work, BridgeFlow will make reasonable revisions to meet the requirements outlined in the Scope of Work.
                            This guarantee is subject to the terms of the Refund Policy and does not cover changes to the project scope.
                        </p>
                    </div>

                    {/* Section 7 — Limitation of Liability */}
                    <div className="glass rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">7</span>
                            Limitation of Liability
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            In no event shall BridgeFlow be liable for any indirect, incidental, special, or consequential damages arising out of or in
                            connection with this Agreement. BridgeFlow&apos;s total liability shall not exceed the total fees paid by the Client under this Agreement.
                        </p>
                    </div>

                    {/* Section 8 — Governing Law */}
                    <div className="glass rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">8</span>
                            Governing Law
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            This Agreement shall be governed by and construed in accordance with applicable laws. Any disputes arising under this Agreement
                            shall be resolved through good-faith negotiation between the parties.
                        </p>
                    </div>

                    {/* Section 9 — Entire Agreement */}
                    <div className="glass rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">9</span>
                            Entire Agreement
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            This Agreement, together with the Scope of Work, Non-Disclosure Agreement, and Refund Policy, constitutes the entire agreement
                            between the parties and supersedes all prior communications, understandings, and agreements, whether oral or written.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="glass rounded-2xl p-8 border border-gold-400/10 bg-gold-400/[0.02]">
                        <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-gold-400" />
                            Ready to Get Started?
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            To begin a project with BridgeFlow, contact us to receive a customized Scope of Work and Agreement for your specific requirements.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-navy-950 bg-gold-400 hover:bg-gold-300 transition-all"
                        >
                            Start a Project
                        </Link>
                    </div>

                    {/* Legal Navigation */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-4">Related Legal Documents</p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { href: "/privacy-policy", label: "Privacy Policy" },
                                { href: "/terms-of-service", label: "Terms of Service" },
                                { href: "/refund-policy", label: "Refund Policy" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
