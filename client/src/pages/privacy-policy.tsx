import { useSEO } from "@/hooks/use-seo";
import { GradientBackground } from "@/components/gradient-background";
import PageTransition from "@/components/page-transition";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
    useSEO({
        title: "Privacy Policy",
        description: "Privacy Policy for BridgeFlow Agency. How we collect, use, and protect your data.",
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
                            <h1 className="text-4xl font-bold mb-4">PRIVACY POLICY</h1>
                            <p className="text-muted-foreground mb-8"><strong>Last Updated: January 28, 2026</strong></p>

                            <h2 className="text-2xl font-bold mt-12 mb-6">1. INTRODUCTION</h2>
                            <p>BridgeFlow Agency ("we," "us," or "our") operates bridgeflow.agency and n8ngalaxy.com (the "Sites"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Sites or use our services.</p>
                            <p>By accessing or using our Sites and services, you agree to this Privacy Policy. If you do not agree, please do not use our Sites or services.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">2. INFORMATION WE COLLECT</h2>
                            <h3 className="text-xl font-semibold mt-8 mb-4">2.1 Information You Provide</h3>
                            <p>We collect information that you voluntarily provide when you:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Fill out contact forms or request consultations</li>
                                <li>Subscribe to our newsletter or communications</li>
                                <li>Create an account or sign up for our services</li>
                                <li>Communicate with us via email, phone, or chat</li>
                                <li>Participate in surveys or feedback requests</li>
                            </ul>
                            <p><strong>This information may include:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Full name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Company name and business details</li>
                                <li>Website URL</li>
                                <li>Service preferences and requirements</li>
                                <li>Payment and billing information</li>
                                <li>Any other information you choose to provide</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">2.2 Information Collected Automatically</h3>
                            <p>When you visit our Sites, we automatically collect certain information about your device and browsing activity:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>IP address and location data</li>
                                <li>Browser type and version</li>
                                <li>Operating system</li>
                                <li>Pages visited and time spent on pages</li>
                                <li>Referring website addresses</li>
                                <li>Device identifiers</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">2.3 Information from Third Parties</h3>
                            <p>We may receive information about you from:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Payment processors (Stripe, PayPal)</li>
                                <li>Analytics providers (Google Analytics)</li>
                                <li>Social media platforms (LinkedIn, Facebook)</li>
                                <li>Business partners and affiliates</li>
                                <li>Publicly available sources</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">3. HOW WE USE YOUR INFORMATION</h2>
                            <p>We use collected information for the following purposes:</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">3.1 Service Delivery</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Provide, operate, and maintain our automation services</li>
                                <li>Process transactions and send related information</li>
                                <li>Create and manage client accounts</li>
                                <li>Deliver customer support and respond to inquiries</li>
                                <li>Configure and deploy automation systems</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">3.2 Business Operations</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Improve and optimize our Sites and services</li>
                                <li>Develop new products and features</li>
                                <li>Conduct analytics and research</li>
                                <li>Monitor and analyze usage patterns</li>
                                <li>Prevent fraud and ensure security</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">3.3 Communications</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Send administrative information and updates</li>
                                <li>Provide service-related notifications</li>
                                <li>Deliver marketing and promotional materials (with consent)</li>
                                <li>Send newsletters and educational content</li>
                                <li>Respond to customer inquiries</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">3.4 Legal and Security</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Comply with legal obligations</li>
                                <li>Enforce our Terms of Service</li>
                                <li>Protect our rights and property</li>
                                <li>Prevent illegal activities</li>
                                <li>Resolve disputes</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">4. LEGAL BASIS FOR PROCESSING (GDPR)</h2>
                            <p>For users in the European Economic Area (EEA), we process personal data based on:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>Consent:</strong> You have given explicit consent for specific purposes</li>
                                <li><strong>Contract:</strong> Processing is necessary to fulfill our service agreement</li>
                                <li><strong>Legal Obligation:</strong> Processing is required by law</li>
                                <li><strong>Legitimate Interests:</strong> Processing serves our legitimate business interests while respecting your rights</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">5. DATA SHARING AND DISCLOSURE</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">5.1 Service Providers</h3>
                            <p>We share information with trusted third-party service providers who assist us:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>GoHighLevel:</strong> CRM and automation platform</li>
                                <li><strong>n8n:</strong> Workflow automation infrastructure</li>
                                <li><strong>Hostinger:</strong> Web hosting services</li>
                                <li><strong>Stripe/PayPal:</strong> Payment processing</li>
                                <li><strong>Google Workspace:</strong> Email and productivity tools</li>
                                <li><strong>Loom/Zoom:</strong> Video communication platforms</li>
                                <li><strong>Analytics providers:</strong> Google Analytics, etc.</li>
                            </ul>
                            <p>All service providers are contractually obligated to maintain data confidentiality.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">5.2 Business Transfers</h3>
                            <p>If we are involved in a merger, acquisition, sale of assets, or bankruptcy, your information may be transferred as part of that transaction. We will notify you of any such change.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">5.3 Legal Requirements</h3>
                            <p>We may disclose your information when required by law or to:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Comply with legal processes or government requests</li>
                                <li>Enforce our Terms of Service</li>
                                <li>Protect our rights, property, or safety</li>
                                <li>Prevent fraud or illegal activities</li>
                                <li>Protect the rights and safety of others</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">5.4 With Your Consent</h3>
                            <p>We may share information for other purposes with your explicit consent.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">6. DATA RETENTION</h2>
                            <p>We retain your personal information only as long as necessary for the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.</p>
                            <p><strong>Retention periods:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong>Active clients:</strong> Duration of service relationship plus 7 years for financial records</li>
                                <li><strong>Prospective clients:</strong> 3 years from last contact</li>
                                <li><strong>Marketing contacts:</strong> Until you unsubscribe</li>
                                <li><strong>Support tickets:</strong> 5 years</li>
                                <li><strong>Analytics data:</strong> 26 months (Google Analytics default)</li>
                            </ul>
                            <p>After the retention period, we securely delete or anonymize your information.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">7. DATA SECURITY</h2>
                            <p>We implement industry-standard security measures to protect your information:</p>

                            <p className="mt-4"><strong>Technical Safeguards:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>SSL/TLS encryption for data transmission</li>
                                <li>Encrypted databases and storage</li>
                                <li>Secure authentication and access controls</li>
                                <li>Regular security audits and updates</li>
                                <li>Firewall and intrusion detection systems</li>
                            </ul>

                            <p><strong>Organizational Safeguards:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Limited employee access on need-to-know basis</li>
                                <li>Confidentiality agreements with staff and partners</li>
                                <li>Regular security training</li>
                                <li>Incident response procedures</li>
                            </ul>

                            <p><strong>However, no method of transmission or storage is 100% secure.</strong> While we strive to protect your information, we cannot guarantee absolute security.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">8. YOUR RIGHTS AND CHOICES</h2>

                            <h3 className="text-xl font-semibold mt-8 mb-4">8.1 Access and Correction</h3>
                            <p>You have the right to access and update your personal information. Contact us at <a href="mailto:privacy@bridgeflow.agency" className="text-primary hover:underline">privacy@bridgeflow.agency</a> to request access or corrections.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">8.2 Data Portability (GDPR)</h3>
                            <p>You have the right to receive your personal data in a structured, commonly used format and transmit it to another controller.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">8.3 Deletion (Right to be Forgotten)</h3>
                            <p>You may request deletion of your personal information, subject to legal retention requirements. Email <a href="mailto:privacy@bridgeflow.agency" className="text-primary hover:underline">privacy@bridgeflow.agency</a> to request deletion.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">8.4 Marketing Opt-Out</h3>
                            <p>You can opt out of marketing communications by:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Clicking "unsubscribe" in any marketing email</li>
                                <li>Emailing unsubscribe@bridgeflow.agency</li>
                                <li>Updating preferences in your account settings</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">8.5 Cookie Management</h3>
                            <p>You can control cookies through your browser settings. Note that disabling cookies may affect Site functionality.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">8.6 Do Not Track</h3>
                            <p>Our Sites do not respond to Do Not Track (DNT) signals. You may use browser privacy settings to limit tracking.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">9. INTERNATIONAL DATA TRANSFERS</h2>
                            <p><strong>Our primary operations are based in Saudi Arabia.</strong> If you access our services from outside Saudi Arabia, your information may be transferred to, stored, and processed in Saudi Arabia or other countries where our service providers operate.</p>
                            <p>We ensure appropriate safeguards are in place for international transfers, including:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                                <li>Data Processing Agreements with service providers</li>
                                <li>Adherence to GDPR requirements for EEA users</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">10. CHILDREN'S PRIVACY</h2>
                            <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn we have collected information from a child under 18, we will delete it promptly.</p>
                            <p>If you believe we have collected information from a child, contact us at <a href="mailto:privacy@bridgeflow.agency" className="text-primary hover:underline">privacy@bridgeflow.agency</a>.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">11. CALIFORNIA PRIVACY RIGHTS (CCPA)</h2>
                            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">11.1 Right to Know</h3>
                            <p>You have the right to request information about:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Categories of personal information collected</li>
                                <li>Sources of personal information</li>
                                <li>Business purpose for collection</li>
                                <li>Categories of third parties we share with</li>
                                <li>Specific pieces of personal information collected</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">11.2 Right to Delete</h3>
                            <p>You have the right to request deletion of your personal information, subject to certain exceptions.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">11.3 Right to Opt-Out</h3>
                            <p>You have the right to opt out of the "sale" of personal information. <strong>We do not sell personal information.</strong></p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">11.4 Right to Non-Discrimination</h3>
                            <p>We will not discriminate against you for exercising your CCPA rights.</p>
                            <p><strong>To exercise your rights:</strong> Email <a href="mailto:privacy@bridgeflow.agency" className="text-primary hover:underline">privacy@bridgeflow.agency</a></p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">12. COOKIES AND TRACKING TECHNOLOGIES</h2>
                            <h3 className="text-xl font-semibold mt-8 mb-4">12.1 What Are Cookies</h3>
                            <p>Cookies are small text files stored on your device when you visit websites. We use cookies and similar technologies to:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Remember your preferences and settings</li>
                                <li>Analyze Site performance and usage</li>
                                <li>Deliver relevant advertising</li>
                                <li>Improve user experience</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-8 mb-4">12.2 Types of Cookies We Use</h3>
                            <p><strong>Essential Cookies (Always Active):</strong> Required for Site functionality. Cannot be disabled.</p>
                            <p><strong>Analytics Cookies:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Google Analytics (tracks usage patterns)</li>
                                <li>Hotjar (heatmaps and session recordings)</li>
                            </ul>
                            <p><strong>Marketing Cookies:</strong></p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Google Ads (ad targeting and remarketing)</li>
                                <li>Facebook Pixel (ad performance tracking)</li>
                                <li>LinkedIn Insight Tag (B2B targeting)</li>
                            </ul>
                            <p><strong>Preference Cookies:</strong> Remember your settings and preferences</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">12.3 Managing Cookies</h3>
                            <p>Control cookies through your browser settings:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Chrome: Settings {">"} Privacy and Security {">"} Cookies</li>
                                <li>Firefox: Options {">"} Privacy & Security {">"} Cookies</li>
                                <li>Safari: Preferences {">"} Privacy {">"} Cookies</li>
                                <li>Edge: Settings {">"} Privacy {">"} Cookies</li>
                            </ul>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">13. THIRD-PARTY LINKS</h2>
                            <p>Our Sites may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">14. CHANGES TO THIS PRIVACY POLICY</h2>
                            <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes by:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Posting the updated policy on our Sites with a new "Last Updated" date</li>
                                <li>Sending email notifications to registered users</li>
                                <li>Displaying a notice on our Sites</li>
                            </ul>
                            <p>Your continued use of our services after changes constitutes acceptance of the updated policy.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">15. CONTACT US</h2>
                            <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices:</p>
                            <p className="mt-4"><strong>BridgeFlow Agency</strong></p>
                            <p><strong>Email:</strong> <a href="mailto:privacy@bridgeflow.agency" className="text-primary hover:underline">privacy@bridgeflow.agency</a></p>
                            <p><strong>Primary Contact:</strong> Ansan Rai</p>
                            <p><strong>Mailing Address:</strong><br />BridgeFlow Agency<br />Unaizah, Al Qassim<br />Saudi Arabia</p>
                            <p><strong>Data Protection Officer (DPO):</strong> <a href="mailto:privacy@bridgeflow.agency" className="text-primary hover:underline">privacy@bridgeflow.agency</a></p>
                            <p><strong>Response Time:</strong> We will respond to privacy requests within 30 days.</p>

                            <hr className="my-8 border-border" />

                            <h2 className="text-2xl font-bold mt-12 mb-6">16. JURISDICTION-SPECIFIC PROVISIONS</h2>
                            <h3 className="text-xl font-semibold mt-8 mb-4">16.1 European Union (GDPR)</h3>
                            <p>For EEA residents, we comply with the General Data Protection Regulation (GDPR). Your personal data is processed lawfully, fairly, and transparently. You have enhanced rights under GDPR as outlined in Section 8.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.2 United Kingdom (UK GDPR)</h3>
                            <p>For UK residents, we comply with the UK GDPR and Data Protection Act 2018.</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.3 Saudi Arabia</h3>
                            <p>We comply with applicable Saudi Arabian data protection laws and regulations, including the Personal Data Protection Law (PDPL).</p>

                            <h3 className="text-xl font-semibold mt-8 mb-4">16.4 United States</h3>
                            <p>For US residents, we comply with applicable federal and state privacy laws, including CCPA (Section 11).</p>

                            <div className="mt-12 p-6 bg-card border border-border rounded-lg text-center">
                                <p><strong>By using our services, you acknowledge that you have read and understood this Privacy Policy.</strong></p>
                                <p className="text-sm text-muted-foreground mt-2">This Privacy Policy is effective as of January 28, 2026.</p>
                            </div>
                        </div>
                    </div>
                </GradientBackground>
            </div>
        </PageTransition>
    );
}
