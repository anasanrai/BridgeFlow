import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "BridgeFlow Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-950" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />
                <div className="relative z-10 container mx-auto text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-widest text-brand-coral border border-brand-coral/20 rounded-full bg-brand-coral/5">
                            <Shield className="w-3.5 h-3.5" />
                            Legal Protocol
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-4 text-white">
                            Privacy <span className="text-brand-coral">Intelligence</span>
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
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">1. Introduction</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    BridgeFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is an AI automation agency committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at bridgeflow.agency, use our services, or interact with us in any way. By accessing or using our services, you agree to the terms of this Privacy Policy.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">2. Information We Collect</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed mb-6">We collect information in the following ways:</p>

                                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-widest text-[11px]">2.1 Information You Provide</h3>
                                <ul className="list-disc list-inside text-neutral-400 space-y-3 mb-8">
                                    <li><strong className="text-white">Contact Information:</strong> Name, email address, phone number, and company name when you fill out forms, subscribe to our newsletter, or contact us.</li>
                                    <li><strong className="text-white">Business Information:</strong> Website URL, industry, business size, and operational details provided during consultations or audit requests.</li>
                                    <li><strong className="text-white">Account Credentials:</strong> Third-party platform credentials (e.g., n8n, GoHighLevel, CRM tools) shared with us to perform automation work. These are stored securely and used solely for service delivery.</li>
                                    <li><strong className="text-white">Payment Information:</strong> Billing details processed through our secure payment providers. We do not store credit card numbers on our servers.</li>
                                    <li><strong className="text-white">Career Applications:</strong> Resumes, portfolio links, and career-related information submitted through our careers page.</li>
                                </ul>

                                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-widest text-[11px]">2.2 Information Collected Automatically</h3>
                                <ul className="list-disc list-inside text-neutral-400 space-y-3">
                                    <li><strong className="text-white">Usage Data:</strong> Pages visited, time spent on pages, scroll depth, click events, referral source, and navigation patterns.</li>
                                    <li><strong className="text-white">Device Information:</strong> Browser type, operating system, screen resolution, and device type.</li>
                                    <li><strong className="text-white">IP Address:</strong> Used for approximate geolocation and security purposes. We do not use IP addresses to personally identify you.</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">3. Cookies and Tracking Technologies</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed mb-6">We use the following types of cookies and tracking technologies:</p>
                                <ul className="list-disc list-inside text-neutral-400 space-y-3">
                                    <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function properly (e.g., session management, authentication).</li>
                                    <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website. We use a custom telemetry system to track anonymized page views and user interactions.</li>
                                    <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences, such as theme settings and form inputs.</li>
                                </ul>
                                <p className="text-neutral-400 font-medium leading-relaxed mt-6">
                                    You can manage cookie preferences through your browser settings. Disabling cookies may affect the functionality of certain features.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">4. How We Use Your Information</h2>
                                <ul className="list-disc list-inside text-neutral-400 space-y-3">
                                    <li>To provide, maintain, and improve our automation services</li>
                                    <li>To communicate with you about projects, proposals, and service updates</li>
                                    <li>To send you marketing communications, newsletters, and product updates (with your consent)</li>
                                    <li>To respond to inquiries, support requests, and feedback</li>
                                    <li>To analyze website usage and improve the user experience</li>
                                    <li>To detect, prevent, and address technical issues and security threats</li>
                                    <li>To comply with legal obligations and enforce our terms of service</li>
                                    <li>To process career applications and evaluate candidates</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">5. Third-Party Tools and Services</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed mb-6">We integrate with and use the following third-party services in delivering our work:</p>
                                <ul className="list-disc list-inside text-neutral-400 space-y-3">
                                    <li><strong className="text-white">Supabase:</strong> Database hosting and authentication.</li>
                                    <li><strong className="text-white">Vercel:</strong> Website hosting and deployment.</li>
                                    <li><strong className="text-white">n8n:</strong> Workflow automation platform used for building client automations.</li>
                                    <li><strong className="text-white">GoHighLevel:</strong> CRM and marketing automation platform.</li>
                                    <li><strong className="text-white">OpenAI / Anthropic:</strong> AI model providers used within automation workflows.</li>
                                    <li><strong className="text-white">Stripe:</strong> Payment processing (when applicable).</li>
                                </ul>
                                <p className="text-neutral-400 font-medium leading-relaxed mt-6">
                                    Each of these providers has their own privacy policies. We encourage you to review them. We do not sell, rent, or trade your personal information to any third party.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">6. Data Security</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    We implement industry-standard security measures to protect your information, including: encryption in transit (TLS 1.3), encryption at rest (AES-256), role-based access control, regular security audits, and secure credential management. However, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">7. Non-Disclosure Agreement (NDA)</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed mb-6">
                                    For all client engagements, we enter into a formal Non-Disclosure Agreement (NDA) to protect your proprietary technical and business information. This includes:
                                </p>
                                <ul className="list-disc list-inside text-neutral-400 space-y-3">
                                    <li>Protection of research, product plans, customer data, and software developments</li>
                                    <li>Strict obligations of non-use and non-disclosure for a period of five (5) years</li>
                                    <li>Reasonable measures to protect the secrecy of and avoid unauthorized use of confidential information</li>
                                    <li>Requirement to return or destroy confidential information upon written request</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">8. Data Retention</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    We retain your personal data only for as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce agreements. Contact form submissions are retained for 24 months. Newsletter subscriptions remain active until you unsubscribe. Client project data is retained for the duration of the engagement plus 12 months.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">9. Your Rights</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed mb-6">Depending on your jurisdiction, you may have the following rights:</p>
                                <ul className="list-disc list-inside text-neutral-400 space-y-3">
                                    <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you.</li>
                                    <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                                    <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;).</li>
                                    <li><strong className="text-white">Portability:</strong> Request a copy of your data in a machine-readable format.</li>
                                    <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
                                    <li><strong className="text-white">Restrict Processing:</strong> Request that we limit the processing of your data.</li>
                                </ul>
                                <p className="text-neutral-400 font-medium leading-relaxed mt-6">
                                    To exercise any of these rights, please contact us at the email below. We will respond within 30 days.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">10. Children&apos;s Privacy</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us and we will promptly delete it.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border border-white/5 bg-neutral-900/40 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">11. Changes to This Policy</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after changes constitutes acceptance of the updated policy.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="rounded-[40px] border-2 border-brand-teal/20 bg-brand-teal/5 p-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">12. Contact Us</h2>
                                <p className="text-neutral-400 font-medium leading-relaxed">
                                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                                </p>
                                <div className="mt-8 p-6 rounded-[20px] bg-neutral-900/50 border border-white/5">
                                    <p className="text-white font-black uppercase tracking-widest text-[11px] mb-2">BridgeFlow</p>
                                    <p className="text-neutral-400 font-bold text-sm mt-1">
                                        Email:{" "}
                                        <a href="mailto:hello@bridgeflow.agency" className="text-brand-coral hover:text-white transition-colors">
                                            hello@bridgeflow.agency
                                        </a>
                                    </p>
                                    <p className="text-neutral-400 font-bold text-sm mt-1">Website: bridgeflow.agency</p>
                                    <p className="text-neutral-400 font-bold text-sm mt-1">Location: Remote-first, Global</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
