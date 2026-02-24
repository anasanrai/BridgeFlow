import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "BridgeFlow Terms of Service — the legal agreement between you and BridgeFlow.",
};

export default function TermsOfService() {
    return (
        <section className="pt-32 pb-20">
            <div className="container-max max-w-3xl px-4 sm:px-6">
                <ScrollReveal>
                    <h1 className="text-4xl font-display font-bold mb-4">Terms of Service</h1>
                    <p className="text-gray-400 mb-12">Last updated: February 24, 2026</p>
                </ScrollReveal>

                <div className="prose prose-invert prose-gold max-w-none space-y-8">
                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-400 leading-relaxed">
                                By accessing or using BridgeFlow&apos;s website and services (&quot;Services&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services. These Terms apply to all visitors, users, and clients of BridgeFlow.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">2. Services Description</h2>
                            <p className="text-gray-400 leading-relaxed">
                                BridgeFlow provides AI-powered workflow automation services, consulting, and SaaS tools for B2B businesses. Our services include but are not limited to: custom n8n workflow design, AI integration, automation consulting, and ongoing maintenance and optimization.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">3. Client Obligations</h2>
                            <ul className="list-disc list-inside text-gray-400 space-y-2">
                                <li>Provide accurate and complete information for project requirements</li>
                                <li>Grant necessary access to systems and tools required for automation work</li>
                                <li>Review and approve deliverables within agreed timelines</li>
                                <li>Maintain confidentiality of shared credentials and documentation</li>
                                <li>Comply with all applicable laws regarding the use of automated systems</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">4. Payment Terms</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Project-based engagements require 50% upfront with the remainder due upon delivery. Monthly retainer plans are billed at the beginning of each billing cycle. All invoices are payable within 14 days. We accept bank transfer, credit card, and cryptocurrency payments.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">5. Intellectual Property</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Upon full payment, all custom workflows and automations built specifically for the client become the client&apos;s property. BridgeFlow retains the right to use generalized methodologies, techniques, and non-client-specific code in future projects. Our proprietary tools and templates remain BridgeFlow&apos;s intellectual property.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">6. Limitation of Liability</h2>
                            <p className="text-gray-400 leading-relaxed">
                                BridgeFlow&apos;s total liability for any claim arising from our services shall not exceed the total amount paid by the client in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages, including lost profits or business interruption.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">7. Termination</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Either party may terminate a service agreement with 30 days written notice. In the event of termination, the client is responsible for payment of all work completed up to the termination date. We will provide all documentation and access needed for a smooth transition.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">8. Contact</h2>
                            <p className="text-gray-400 leading-relaxed">
                                For questions about these Terms, please contact us at{" "}
                                <a href="mailto:hello@bridgeflow.agency" className="text-gold-400 hover:underline">
                                    hello@bridgeflow.agency
                                </a>.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
