import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service | BridgeFlow",
    description: "BridgeFlow Terms of Service — the legal agreement governing use of our AI automation services.",
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
                            <FileText className="w-3.5 h-3.5" />
                            Legal
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
                            Terms of <span className="gold-text">Service</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-gray-400">Last updated: February 26, 2026</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding pt-12">
                <div className="container-max max-w-3xl px-4 sm:px-6">
                    <div className="space-y-8">
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">1. Acceptance of Terms</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    By accessing, browsing, or using the BridgeFlow website (bridgeflow.agency) and any services provided by BridgeFlow (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you must not use our services. These Terms apply to all visitors, users, subscribers, and clients.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">2. Description of Services</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    BridgeFlow is an AI automation agency that provides the following services:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li>Custom workflow automation design and deployment using platforms like n8n and Make</li>
                                    <li>GoHighLevel CRM setup, configuration, and management</li>
                                    <li>AI integration services including GPT, Claude, and custom model deployment</li>
                                    <li>Business process analysis and automation consulting</li>
                                    <li>Ongoing maintenance, monitoring, and optimization of automation systems</li>
                                    <li>SaaS products and tools built for business automation</li>
                                </ul>
                                <p className="text-gray-400 leading-relaxed mt-4">
                                    The specific scope of services will be defined in individual proposals, statements of work (SOW), or service agreements between BridgeFlow and the client.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">3. Client Obligations</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">As a client, you agree to:</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li>Provide accurate, complete, and timely information required for project deliverables</li>
                                    <li>Grant necessary access to systems, platforms, and tools required for automation work</li>
                                    <li>Review and provide feedback on deliverables within agreed-upon timelines</li>
                                    <li>Maintain confidentiality of any shared credentials, API keys, and proprietary documentation</li>
                                    <li>Comply with all applicable laws and regulations regarding the use of automated systems and AI</li>
                                    <li>Ensure you have the authority to grant access to the tools and accounts needed for service delivery</li>
                                    <li>Not use our services for illegal, harmful, or unethical purposes</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">4. Payment Terms</h2>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li><strong className="text-white">Project-Based Work:</strong> 50% deposit required before work begins, with the remaining 50% due upon project completion and final delivery.</li>
                                    <li><strong className="text-white">Monthly Retainers:</strong> Billed at the beginning of each billing cycle. Services for the upcoming month are provided once payment is confirmed.</li>
                                    <li><strong className="text-white">Invoicing:</strong> All invoices are payable within 14 days of issuance unless otherwise agreed upon in the service agreement.</li>
                                    <li><strong className="text-white">Late Payments:</strong> Overdue invoices may be subject to a late fee of 1.5% per month. BridgeFlow reserves the right to suspend services for accounts with outstanding balances exceeding 30 days.</li>
                                    <li><strong className="text-white">Payment Methods:</strong> We accept bank transfer, credit/debit card, and select digital payment methods.</li>
                                    <li><strong className="text-white">Currency:</strong> All pricing is in USD unless otherwise specified in the service agreement.</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">5. Refund Policy</h2>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li><strong className="text-white">Before Work Begins:</strong> Full refund of any deposits if the project is cancelled before work has started.</li>
                                    <li><strong className="text-white">After Work Has Started:</strong> Refunds are prorated based on the work completed. Client will be billed for hours worked and resources consumed.</li>
                                    <li><strong className="text-white">Monthly Retainers:</strong> No refunds for the current billing period. You may cancel at the end of any billing cycle with 14 days&apos; notice.</li>
                                    <li><strong className="text-white">Free Audits and Consultations:</strong> These are provided at no cost and are not subject to refund.</li>
                                    <li><strong className="text-white">Satisfaction Guarantee:</strong> If you are unsatisfied with a deliverable, we will work with you to revise it at no additional charge (up to two revision cycles).</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">6. Intellectual Property</h2>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li><strong className="text-white">Client Ownership:</strong> Upon full payment, all custom workflows, automations, and deliverables built specifically for the client become the client&apos;s intellectual property.</li>
                                    <li><strong className="text-white">BridgeFlow IP:</strong> BridgeFlow retains ownership of proprietary tools, templates, frameworks, reusable code libraries, and methodologies. These may be used across multiple client projects.</li>
                                    <li><strong className="text-white">Third-Party Tools:</strong> Any third-party software, APIs, or platforms used in service delivery remain the property of their respective owners and are subject to their own licensing terms.</li>
                                    <li><strong className="text-white">Portfolio Rights:</strong> Unless otherwise agreed, BridgeFlow may reference the engagement (company name and general project description) in its portfolio, case studies, and marketing materials.</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">7. Confidentiality</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Both parties agree to maintain the confidentiality of proprietary information shared during the course of the engagement. This includes, but is not limited to: business strategies, technical architectures, customer data, financial information, and credentials. Confidentiality obligations survive the termination of any service agreement for a period of two (2) years.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">8. Limitation of Liability</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    To the maximum extent permitted by law:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li>BridgeFlow&apos;s total liability for any claims arising from our services shall not exceed the total amount paid by the client in the twelve (12) months preceding the claim.</li>
                                    <li>We are not liable for indirect, incidental, special, consequential, or punitive damages, including but not limited to lost profits, data loss, or business interruption.</li>
                                    <li>BridgeFlow is not responsible for failures or downtime caused by third-party platforms, services, or APIs (e.g., n8n cloud outages, GoHighLevel downtime).</li>
                                    <li>We make no guarantees regarding specific business outcomes, revenue increases, or ROI from automation implementations.</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">9. Warranties and Disclaimers</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Services are provided &quot;as is&quot; and &quot;as available.&quot; While we strive to deliver high-quality work, BridgeFlow makes no warranties, express or implied, regarding the merchantability, fitness for a particular purpose, or non-infringement of our services. We do not warrant that automations will operate uninterrupted or error-free, though we will promptly address any issues discovered during the warranty period (30 days from delivery).
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">10. Termination</h2>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li>Either party may terminate a service agreement with 30 days&apos; written notice to the other party.</li>
                                    <li>In the event of termination, the client is responsible for payment of all work completed up to the termination date.</li>
                                    <li>BridgeFlow will provide all documentation, credentials, and access needed for a smooth transition.</li>
                                    <li>BridgeFlow reserves the right to terminate services immediately if the client violates these Terms, engages in illegal activity, or fails to pay outstanding invoices.</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">11. Governing Law</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from or related to these Terms or our services shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">12. Changes to These Terms</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    We reserve the right to modify these Terms at any time. Material changes will be communicated via email to active clients and posted on this page. Your continued use of our services following changes constitutes acceptance of the updated Terms. We encourage you to review this page periodically.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8 border border-gold-400/10">
                                <h2 className="text-xl font-display font-bold mb-4 text-white">13. Contact</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    For questions, concerns, or requests regarding these Terms of Service, please contact us:
                                </p>
                                <div className="mt-4 p-4 rounded-xl bg-navy-900/50 border border-white/5">
                                    <p className="text-white font-semibold">BridgeFlow</p>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Email:{" "}
                                        <a href="mailto:hello@bridgeflow.agency" className="text-gold-400 hover:underline">
                                            hello@bridgeflow.agency
                                        </a>
                                    </p>
                                    <p className="text-gray-400 text-sm">Website: bridgeflow.agency</p>
                                    <p className="text-gray-400 text-sm">Location: Remote-first, Global</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
