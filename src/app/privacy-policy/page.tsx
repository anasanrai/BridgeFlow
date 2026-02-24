import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "BridgeFlow Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
    return (
        <section className="pt-32 pb-20">
            <div className="container-max max-w-3xl px-4 sm:px-6">
                <ScrollReveal>
                    <h1 className="text-4xl font-display font-bold mb-4">Privacy Policy</h1>
                    <p className="text-gray-400 mb-12">Last updated: February 24, 2026</p>
                </ScrollReveal>

                <div className="prose prose-invert prose-gold max-w-none space-y-8">
                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">1. Information We Collect</h2>
                            <p className="text-gray-400 leading-relaxed mb-3">We collect information you provide directly to us, including:</p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2">
                                <li><strong className="text-white">Contact Information:</strong> Name, email address, phone number when you fill out our contact form or subscribe to our newsletter.</li>
                                <li><strong className="text-white">Business Information:</strong> Company name, website URL, industry when you request an audit or consultation.</li>
                                <li><strong className="text-white">Usage Data:</strong> Pages visited, time spent on site, scroll depth, and click events collected via our telemetry system.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">2. How We Use Your Information</h2>
                            <ul className="list-disc list-inside text-gray-400 space-y-2">
                                <li>To provide, maintain, and improve our services</li>
                                <li>To send you technical notices, updates, and support messages</li>
                                <li>To respond to your comments, questions, and customer service requests</li>
                                <li>To analyze usage patterns and improve our website experience</li>
                                <li>To send marketing communications (with your consent)</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">3. Data Security</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We implement industry-standard security measures to protect your personal information. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Our infrastructure is hosted on SOC 2 compliant platforms.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">4. Third-Party Services</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We use Supabase for data storage, Vercel for hosting, and Modal/Ollama for AI services. These providers have their own privacy policies governing the use of your information. We do not sell your personal information to third parties.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">5. Your Rights</h2>
                            <p className="text-gray-400 leading-relaxed mb-3">You have the right to:</p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2">
                                <li>Access, correct, or delete your personal data</li>
                                <li>Opt out of marketing communications at any time</li>
                                <li>Request a copy of all data we hold about you</li>
                                <li>Lodge a complaint with a data protection authority</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-xl font-display font-bold mb-4">6. Contact Us</h2>
                            <p className="text-gray-400 leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at{" "}
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
