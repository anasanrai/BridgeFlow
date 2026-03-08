import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Clock, CheckCircle2, AlertCircle, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "Refund Policy | BridgeFlow AI Automation Agency",
    description: "BridgeFlow's refund policy for AI automation services. Understand our 30-day satisfaction guarantee and payment terms.",
    alternates: { canonical: "https://bridgeflow.agency/refund-policy" },
};

const lastUpdated = "March 1, 2025";

export default function RefundPolicy() {
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
                            <Shield className="w-6 h-6 text-gold-400" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Legal</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                        Refund Policy
                    </h1>
                    <p className="text-gray-400 text-lg mb-6">
                        BridgeFlow | AI Automation Agency
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        Last updated: {lastUpdated}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-24">
                <div className="container-max px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Highlight Box */}
                    <div className="p-6 rounded-2xl bg-gold-400/5 border border-gold-400/20 mb-12">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h2 className="text-lg font-display font-bold text-white mb-2">30-Day Satisfaction Guarantee</h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    We stand behind our work. If you are not satisfied with the delivered automation solution within 30 days of final delivery,
                                    we will make all commercially reasonable efforts to revise the work to meet the specifications outlined in your Scope of Work.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-gold max-w-none space-y-10">

                        {/* Section 1 */}
                        <div className="glass rounded-2xl p-8 border border-white/5">
                            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">1</span>
                                General Policy
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Due to the nature of our services, which involve significant upfront investment in time, resources, and proprietary expertise,
                                BridgeFlow does not offer refunds for any payments made once work has commenced on a project.
                                <strong className="text-white"> The initial 50% deposit is strictly non-refundable.</strong>
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="glass rounded-2xl p-8 border border-white/5">
                            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">2</span>
                                Commencement of Work
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Work is considered to have commenced upon the receipt of the initial 50% deposit and the execution of both the
                                Client Service Agreement and the Scope of Work. From this point forward, the no-refund policy is in full effect.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="glass rounded-2xl p-8 border border-white/5">
                            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">3</span>
                                30-Day Satisfaction Guarantee
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                BridgeFlow is committed to delivering high-quality, effective automation solutions. We offer a 30-day satisfaction guarantee,
                                which begins upon the final delivery of the completed project.
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                If you are not satisfied with the delivered work, you must notify BridgeFlow in writing within thirty (30) calendar days of delivery.
                                Upon receiving such notification, BridgeFlow will make all commercially reasonable efforts to revise the work to meet the specifications
                                and requirements outlined in the agreed-upon Scope of Work.
                            </p>

                            {/* Guarantee Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-3 pr-6 text-gray-400 font-semibold">Guarantee Term</th>
                                            <th className="text-left py-3 text-gray-400 font-semibold">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { term: "Guarantee Period", detail: "30 calendar days from final delivery" },
                                            { term: "Notification Method", detail: "Written notice (email or letter)" },
                                            { term: "Resolution", detail: "Revisions to meet original Scope of Work" },
                                            { term: "Exclusions", detail: "Changes to scope, new features, or third-party issues" },
                                            { term: "Post-Guarantee Refunds", detail: "No refunds issued after the 30-day period" },
                                        ].map((row) => (
                                            <tr key={row.term}>
                                                <td className="py-3 pr-6 text-white font-medium">{row.term}</td>
                                                <td className="py-3 text-gray-400">{row.detail}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-base font-bold text-white mb-3">3.1 Scope of the Guarantee</h3>
                                <p className="text-gray-400 leading-relaxed mb-3">
                                    The satisfaction guarantee covers revisions and corrections to ensure the delivered automation solution functions as described
                                    in the original Scope of Work. It does <strong className="text-white">not</strong> cover:
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        "Changes to the project scope or requirements not included in the original Scope of Work",
                                        "New features or functionality requested after project delivery",
                                        "Issues arising from third-party software, APIs, or platforms outside BridgeFlow's control",
                                        "Issues caused by modifications made to the delivered solution by the Client or a third party",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                                            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="glass rounded-2xl p-8 border border-white/5">
                            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">4</span>
                                No Refunds After Guarantee Period
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                After the 30-day satisfaction guarantee period has expired, or once the Client has formally signed off on the delivered project,
                                no refunds will be issued under any circumstances. All sales are final. BridgeFlow&apos;s obligation is limited to the revision
                                rights described in Section 3.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="glass rounded-2xl p-8 border border-white/5">
                            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">5</span>
                                Exceptional Circumstances
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                In the rare event that BridgeFlow is unable to deliver the agreed-upon services due to circumstances within BridgeFlow&apos;s control,
                                the parties agree to negotiate in good faith to determine an appropriate remedy, which may include a partial credit toward future services.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="glass rounded-2xl p-8 border border-white/5">
                            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">6</span>
                                Governing Law
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                This Refund Policy shall be governed by and construed in accordance with applicable laws. Any disputes arising under this policy
                                shall be resolved through good-faith negotiation between the parties.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="glass rounded-2xl p-8 border border-gold-400/10 bg-gold-400/[0.02]">
                            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-gold-400" />
                                Contact &amp; Disputes
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                For any questions or concerns regarding this Refund Policy, please contact BridgeFlow in writing.
                                Both parties agree to attempt to resolve any disputes through good-faith negotiation before pursuing any other legal remedy.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-navy-950 bg-gold-400 hover:bg-gold-300 transition-all"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Legal Navigation */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-4">Related Legal Documents</p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { href: "/privacy-policy", label: "Privacy Policy" },
                                { href: "/terms-of-service", label: "Terms of Service" },
                                { href: "/client-service-agreement", label: "Client Service Agreement" },
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
