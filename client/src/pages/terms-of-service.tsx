import { useSEO } from "@/hooks/use-seo";
import { GradientBackground } from "@/components/gradient-background";
import PageTransition from "@/components/page-transition";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
    useSEO({
        title: "Terms of Service",
        description: "Terms of Service for BridgeFlow Agency. The rules and regulations for using our website and services.",
    });

    return (
        <PageTransition>
            <div className="min-h-screen pt-24 pb-16">
                <GradientBackground variant="section" className="py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/">
                            <Button variant="ghost" className="mb-8 gap-2 pl-0 hover:bg-transparent hover:text-primary">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Button>
                        </Link>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <h1 className="text-4xl font-bold mb-4">TERMS OF SERVICE</h1>
                            <p className="text-muted-foreground mb-8"><strong>Last Updated: January 28, 2026</strong></p>

                            <h2 className="text-2xl font-bold mt-12 mb-6">1. AGREEMENT TO TERMS</h2>
                            <p>Welcome to BridgeFlow Agency. These Terms of Service ("Terms") govern your use of our websites (bridgeflow.agency and n8ngalaxy.com) and services.</p>
                            <p><strong>By accessing or using our services, you agree to be bound by these Terms.</strong> If you do not agree, do not use our services.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">2. DEFINITIONS</h2>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>"We," "us," "our"</strong> refers to BridgeFlow Agency, operating in Unaizah, Al Qassim, Saudi Arabia</li>
                                <li><strong>"You," "your," "Client"</strong> refers to the individual or entity using our services</li>
                                <li><strong>"Services"</strong> refers to all automation, consulting, and technical services we provide</li>
                                <li><strong>"Sites"</strong> refers to bridgeflow.agency and n8ngalaxy.com</li>
                                <li><strong>"Platform"</strong> refers to third-party services we use (GoHighLevel, n8n, etc.)</li>
                                <li><strong>"Deliverables"</strong> refers to work products, systems, or implementations we create</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">3. SERVICES DESCRIPTION</h2>
                            <h3 className="text-xl font-semibold mt-8 mb-4">3.1 Scope of Services</h3>
                            <p>BridgeFlow Agency provides:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>AI Automation Systems:</strong> Lead response automation, workflow automation, CRM setup</li>
                                <li><strong>System Integration:</strong> GoHighLevel, n8n, API integrations, third-party tool connections</li>
                                <li><strong>Consulting Services:</strong> Automation strategy, process optimization, technical guidance</li>
                                <li><strong>Maintenance & Support:</strong> Ongoing system maintenance, updates, and technical support</li>
                                <li><strong>Custom Development:</strong> Bespoke automation solutions tailored to client needs</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">3.2 Service Packages</h3>
                            <p>We offer tiered service packages with varying features, support levels, and pricing. Specific package details are outlined in individual Service Agreements or Proposals.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">3.3 Service Limitations</h3>
                            <p>We provide automation and integration services. We do not:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Guarantee specific business outcomes or revenue increases</li>
                                <li>Provide legal, financial, or medical advice</li>
                                <li>Guarantee 100% uptime of third-party platforms</li>
                                <li>Take responsibility for client's use of automated systems</li>
                                <li>Guarantee compatibility with all future platform updates</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">4. ACCOUNT REGISTRATION AND ELIGIBILITY</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.1 Eligibility</h3>
                            <p>You must be:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>At least 18 years old</li>
                                <li>Legally capable of entering into binding contracts</li>
                                <li>Authorized to bind any company or entity you represent</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.2 Account Security</h3>
                            <p>You are responsible for:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Maintaining confidentiality of account credentials</li>
                                <li>All activities under your account</li>
                                <li>Notifying us immediately of unauthorized access</li>
                                <li>Ensuring account information is accurate and current</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">4.3 Account Termination</h3>
                            <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">5. FEES AND PAYMENT</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">5.1 Service Fees</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>Setup Fees:</strong> One-time fees for initial system configuration and implementation</li>
                                <li><strong>Monthly Recurring Fees:</strong> Ongoing fees for maintenance, hosting, and support</li>
                                <li><strong>Additional Services:</strong> Billed separately at agreed rates</li>
                            </ul>
                            <p><strong>Specific pricing is outlined in your Service Agreement or Proposal.</strong></p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">5.2 Payment Terms</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>Setup Fees:</strong> Due before project commencement or according to payment schedule in Agreement</li>
                                <li><strong>Monthly Fees:</strong> Due on the 1st of each month or anniversary of service start date</li>
                                <li><strong>Payment Methods:</strong> Credit card, bank transfer, PayPal, or other agreed methods</li>
                                <li><strong>Currency:</strong> USD or SAR as specified in Agreement</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">5.3 Late Payments</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>Grace Period:</strong> 5 business days after due date</li>
                                <li><strong>Late Fee:</strong> 5% of outstanding amount after grace period</li>
                                <li><strong>Service Suspension:</strong> Services may be suspended after 15 days of non-payment</li>
                                <li><strong>Termination:</strong> Accounts may be terminated after 30 days of non-payment</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">5.4 Refund Policy</h3>
                            <p><strong>Setup Fees:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Refundable within 7 days of payment if project has not commenced</li>
                                <li>50% refundable if less than 25% of work completed</li>
                                <li>Non-refundable if more than 25% of work completed</li>
                            </ul>

                            <p><strong>Monthly Fees:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Pro-rated refunds for unused full months if service terminated with 30 days' notice</li>
                                <li>No refunds for partial months</li>
                            </ul>

                            <p><strong>Money-Back Guarantee (if applicable):</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>30-day money-back guarantee on initial setup if system does not function as specified</li>
                                <li>Client must provide documented evidence of failures</li>
                                <li>Refund excludes third-party platform fees</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">5.5 Price Changes</h3>
                            <p>We reserve the right to change pricing with 30 days' notice to active clients. Price changes do not affect current billing cycles.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">6. SERVICE DELIVERY AND TIMELINES</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">6.1 Project Timelines</h3>
                            <p>Estimated timelines are provided in Service Agreements. Actual delivery may vary based on:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Client responsiveness and provision of required materials</li>
                                <li>Complexity discovered during implementation</li>
                                <li>Third-party platform limitations or changes</li>
                                <li>Force majeure events</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">6.2 Client Responsibilities</h3>
                            <p>Timely delivery requires client to:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Provide necessary access, credentials, and materials within 48 hours of request</li>
                                <li>Respond to questions and approval requests within 3 business days</li>
                                <li>Review deliverables and provide feedback within 5 business days</li>
                                <li>Provide accurate and complete information</li>
                            </ul>
                            <p><strong>Delays caused by client non-responsiveness do not constitute breach by BridgeFlow Agency.</strong></p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">6.3 Acceptance and Revisions</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>Acceptance Period:</strong> 7 days from delivery notification</li>
                                <li><strong>Revisions Included:</strong> As specified in Service Agreement (typically 2-3 rounds)</li>
                                <li><strong>Additional Revisions:</strong> Billed at hourly rate</li>
                                <li><strong>Deemed Acceptance:</strong> Deliverables are deemed accepted if no feedback provided within 14 days</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">7. INTELLECTUAL PROPERTY RIGHTS</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">7.1 Client-Owned Materials</h3>
                            <p>You retain all rights to:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Your business name, logo, and brand materials</li>
                                <li>Content you provide (copy, images, data)</li>
                                <li>Pre-existing intellectual property</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">7.2 BridgeFlow-Created Deliverables</h3>
                            <p><strong>Upon full payment, you receive:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Ownership of custom configurations specific to your business</li>
                                <li>License to use workflows and automations created for you</li>
                                <li>Access to system documentation</li>
                            </ul>

                            <p><strong>BridgeFlow retains:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Rights to underlying code frameworks and templates</li>
                                <li>Rights to reuse general methodologies and techniques</li>
                                <li>Rights to showcase work (with your permission) in portfolio</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">7.3 Third-Party Platform Rights</h3>
                            <p>You acknowledge that:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>GoHighLevel, n8n, and other platforms retain ownership of their software</li>
                                <li>Your use is governed by their respective Terms of Service</li>
                                <li>We are not liable for changes, limitations, or terminations by platform providers</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">7.4 BridgeFlow Brand Assets</h3>
                            <p>Our name, logo, and brand materials remain our exclusive property. You may not use them without written permission.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">8. CONFIDENTIALITY</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">8.1 Confidential Information</h3>
                            <p>Both parties agree to protect confidential information including:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Business strategies and plans</li>
                                <li>Financial information</li>
                                <li>Customer data and lists</li>
                                <li>Technical implementations</li>
                                <li>Proprietary processes</li>
                                <li>Login credentials and access details</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">8.2 Exceptions</h3>
                            <p>Confidentiality does not apply to information that:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Is publicly available</li>
                                <li>Was known prior to disclosure</li>
                                <li>Is independently developed</li>
                                <li>Must be disclosed by law</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">8.3 Duration</h3>
                            <p>Confidentiality obligations survive for 3 years after service termination.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">9. DATA PROTECTION AND PRIVACY</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">9.1 Data Processing</h3>
                            <p>We process client and end-user data as outlined in our Privacy Policy. By using our services, you agree to our data practices.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">9.2 Client Data Responsibilities</h3>
                            <p>You are responsible for:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Obtaining necessary consents from end-users</li>
                                <li>Complying with applicable data protection laws (GDPR, CCPA, etc.)</li>
                                <li>Ensuring data you provide is lawfully collected</li>
                                <li>Implementing appropriate security measures</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">9.3 Data Security</h3>
                            <p>We implement reasonable security measures, but cannot guarantee absolute security. You acknowledge risks inherent in internet transmission and electronic storage.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">9.4 Data Breaches</h3>
                            <p>We will notify you of any data breach affecting your data within 72 hours of discovery, as required by applicable law.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">10. WARRANTIES AND DISCLAIMERS</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">10.1 Our Warranties</h3>
                            <p>We warrant that:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Services will be performed in a professional manner</li>
                                <li>We have the right to provide services</li>
                                <li>Deliverables will substantially conform to specifications in Agreements</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">10.2 Disclaimer of Other Warranties</h3>
                            <p><strong>EXCEPT AS EXPRESSLY STATED, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Merchantability or fitness for a particular purpose</li>
                                <li>Uninterrupted or error-free operation</li>
                                <li>Compatibility with all third-party systems</li>
                                <li>Specific business results or revenue increases</li>
                                <li>Third-party platform availability or performance</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">10.3 Third-Party Services</h3>
                            <p>We are not responsible for:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Performance, availability, or changes to third-party platforms</li>
                                <li>Data loss or security breaches caused by third-party services</li>
                                <li>Compatibility issues with third-party updates</li>
                                <li>Third-party pricing changes or terms modifications</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">11. LIMITATION OF LIABILITY</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">11.1 Liability Cap</h3>
                            <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ALL CLAIMS ARISING FROM OR RELATED TO SERVICES SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM.</strong></p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">11.2 Excluded Damages</h3>
                            <p><strong>WE SHALL NOT BE LIABLE FOR:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Indirect, incidental, or consequential damages</li>
                                <li>Lost profits, revenue, or business opportunities</li>
                                <li>Data loss or corruption (beyond reasonable restoration efforts)</li>
                                <li>Service interruptions or downtime</li>
                                <li>Third-party claims</li>
                                <li>Damages exceeding amounts paid to us</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">11.3 Exceptions</h3>
                            <p>Liability limitations do not apply to:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Gross negligence or willful misconduct</li>
                                <li>Fraud or fraudulent misrepresentation</li>
                                <li>Violations of intellectual property rights</li>
                                <li>Claims that cannot be limited by law</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">12. INDEMNIFICATION</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">12.1 Your Indemnification</h3>
                            <p>You agree to indemnify and hold harmless BridgeFlow Agency from claims arising from:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Your use or misuse of services</li>
                                <li>Violation of these Terms</li>
                                <li>Violation of third-party rights</li>
                                <li>Content you provide or actions you take</li>
                                <li>Your end-users' claims</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">12.2 Our Indemnification</h3>
                            <p>We agree to indemnify you from third-party claims that our services infringe intellectual property rights, provided you:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Notify us promptly of claims</li>
                                <li>Grant us control of defense and settlement</li>
                                <li>Provide reasonable cooperation</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">13. TERM AND TERMINATION</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">13.1 Service Term</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>Setup Projects:</strong> Term ends upon delivery and acceptance</li>
                                <li><strong>Ongoing Services:</strong> Month-to-month or annual terms as specified in Agreement</li>
                                <li><strong>Auto-Renewal:</strong> Monthly subscriptions auto-renew unless cancelled</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">13.2 Termination by You</h3>
                            <p>You may terminate by:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Providing 30 days' written notice</li>
                                <li>Paying all outstanding fees</li>
                                <li>Exporting your data before termination</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">13.3 Termination by Us</h3>
                            <p>We may terminate immediately if you:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Breach these Terms materially</li>
                                <li>Fail to pay after 30 days</li>
                                <li>Engage in illegal or unethical conduct</li>
                                <li>Abuse or misuse services</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">13.4 Effect of Termination</h3>
                            <p>Upon termination:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Access to services ceases</li>
                                <li>Outstanding fees become immediately due</li>
                                <li>We may delete your data after 30 days (unless legally required to retain)</li>
                                <li>Sections 7, 8, 10, 11, 12, and 15 survive termination</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">13.5 Data Export</h3>
                            <p>You may request data export within 30 days of termination. Fees may apply for extensive data extraction.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">14. ACCEPTABLE USE POLICY</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">14.1 Prohibited Uses</h3>
                            <p>You may not use services for:</p>
                            <p><strong>Illegal Activities:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Violating laws or regulations</li>
                                <li>Fraud, phishing, or scams</li>
                                <li>Unauthorized access to systems</li>
                                <li>Intellectual property infringement</li>
                            </ul>

                            <p><strong>Harmful Content:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Malware, viruses, or harmful code</li>
                                <li>Spam or unsolicited mass communications</li>
                                <li>Hate speech, harassment, or threats</li>
                                <li>Pornographic or obscene material</li>
                            </ul>

                            <p><strong>Abusive Behavior:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Overloading or disrupting services</li>
                                <li>Reverse engineering platforms</li>
                                <li>Sharing account credentials</li>
                                <li>Circumventing security measures</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">14.2 Compliance</h3>
                            <p>You agree to:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Comply with all applicable laws (CAN-SPAM, GDPR, TCPA, etc.)</li>
                                <li>Obtain proper consents for communications</li>
                                <li>Honor opt-out requests promptly</li>
                                <li>Use ethical marketing practices</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">14.3 Enforcement</h3>
                            <p>Violations may result in:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Immediate service suspension</li>
                                <li>Account termination without refund</li>
                                <li>Reporting to authorities</li>
                                <li>Legal action</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">15. DISPUTE RESOLUTION</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">15.1 Governing Law</h3>
                            <p>These Terms are governed by the laws of Saudi Arabia, without regard to conflict of law principles.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">15.2 Negotiation</h3>
                            <p>Before formal proceedings, parties agree to negotiate in good faith for 30 days.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">15.3 Arbitration</h3>
                            <p>If negotiation fails, disputes will be resolved through binding arbitration in accordance with the rules of the Saudi Center for Commercial Arbitration (SCCA).</p>
                            <p><strong>Arbitration Terms:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Location: Riyadh, Saudi Arabia</li>
                                <li>Language: English or Arabic</li>
                                <li>Arbitrator: Single arbitrator mutually agreed</li>
                                <li>Award: Final and binding</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">15.4 Exceptions</h3>
                            <p>Either party may seek injunctive relief in court for:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Intellectual property violations</li>
                                <li>Confidentiality breaches</li>
                                <li>Urgent matters requiring immediate action</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">15.5 Class Action Waiver</h3>
                            <p>You agree to resolve disputes individually. You waive rights to participate in class actions or collective proceedings.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">16. GENERAL PROVISIONS</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.1 Entire Agreement</h3>
                            <p>These Terms, together with your Service Agreement and our Privacy Policy, constitute the entire agreement between parties.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.2 Amendments</h3>
                            <p>We may modify these Terms by:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Posting updated Terms with new "Last Updated" date</li>
                                <li>Notifying active clients via email</li>
                                <li>Providing 30 days' notice for material changes</li>
                            </ul>
                            <p>Continued use after changes constitutes acceptance.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.3 Severability</h3>
                            <p>If any provision is found invalid or unenforceable, remaining provisions remain in full effect.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.4 Waiver</h3>
                            <p>Our failure to enforce any right or provision does not constitute a waiver of that right.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.5 Assignment</h3>
                            <p>You may not assign or transfer your rights without our written consent. We may assign our rights with notice to you.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.6 Force Majeure</h3>
                            <p>Neither party is liable for delays or failures due to circumstances beyond reasonable control (natural disasters, pandemics, wars, government actions, internet outages, platform failures).</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.7 Independent Contractors</h3>
                            <p>Parties are independent contractors. Nothing creates partnership, agency, or employment relationship.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.8 Notices</h3>
                            <p><strong>To You:</strong> Via email to address on file</p>
                            <p><strong>To Us:</strong><br />Email: legal@bridgeflow.agency<br />Address: BridgeFlow Agency, Unaizah, Al Qassim, Saudi Arabia</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.9 Language</h3>
                            <p>These Terms are in English. Translations are for convenience only. English version controls in disputes.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">17. CONTACT INFORMATION</h2>
                            <p>For questions about these Terms:</p>
                            <p className="mt-4"><strong>BridgeFlow Agency</strong></p>
                            <p><strong>Email:</strong> <a href="mailto:legal@bridgeflow.agency" className="text-primary hover:underline">legal@bridgeflow.agency</a></p>
                            <p><strong>Support:</strong> <a href="mailto:support@bridgeflow.agency" className="text-primary hover:underline">support@bridgeflow.agency</a></p>
                            <p><strong>General Inquiries:</strong> <a href="mailto:hello@bridgeflow.agency" className="text-primary hover:underline">hello@bridgeflow.agency</a></p>
                            <p><strong>Primary Contact:</strong> Ansan Rai</p>
                            <p><strong>Mailing Address:</strong><br />BridgeFlow Agency<br />Unaizah, Al Qassim<br />Saudi Arabia</p>

                            <div className="mt-12 p-6 bg-card border border-border rounded-lg text-center">
                                <p><strong>By using our services, you acknowledge that you have read and understood these Terms of Service.</strong></p>
                                <p className="text-sm text-muted-foreground mt-2">These Terms of Service are effective as of January 28, 2026.</p>
                            </div>
                        </div>
                    </div>
                </GradientBackground>
            </div>
        </PageTransition>
    );
}
