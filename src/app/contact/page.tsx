import { Metadata } from "next";
import { ScrollReveal, SectionHeader, Card } from "@/components/ui";
import {
    Mail,
    MapPin,
    Phone,
    ArrowRight,
    Github,
    Linkedin,
    Twitter,
} from "lucide-react";
import { Button } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { getPageSEO } from "@/lib/supabase-data";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSEO("/contact");
    return {
        title: seo.title,
        description: seo.description,
        openGraph: {
            title: seo.title,
            description: seo.description,
            images: [{ url: seo.ogImage }],
        },
    };
}

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "hello@bridgeflow.agency",
        href: "mailto:hello@bridgeflow.agency",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Remote-first, Global",
        href: null,
    },
    {
        icon: Phone,
        label: "Response Time",
        value: "Within 24 hours",
        href: null,
    },
];

export default function Contact() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-12 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                            Contact Us
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            Let&apos;s build something{" "}
                            <span className="gold-text">amazing</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400">
                            Ready to automate? Tell us about your project and we&apos;ll get
                            back to you within 24 hours with a tailored plan.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Contact Form + Info */}
            <section className="section-padding pt-12">
                <div className="container-max">
                    <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <ScrollReveal>
                                <Card hover={false} className="!p-8 lg:!p-10">
                                    <ContactForm />
                                </Card>
                            </ScrollReveal>
                        </div>

                        {/* Info Sidebar */}
                        <div className="lg:col-span-2 space-y-6">
                            <ScrollReveal delay={0.1}>
                                <Card hover={false}>
                                    <h3 className="text-lg font-display font-bold mb-6">
                                        Get in touch
                                    </h3>
                                    <div className="space-y-5">
                                        {contactInfo.map((info) => (
                                            <div key={info.label} className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                                                    <info.icon className="w-5 h-5 text-navy-950" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                                                        {info.label}
                                                    </div>
                                                    {info.href ? (
                                                        <a
                                                            href={info.href}
                                                            className="text-sm text-white hover:text-gold-400 transition-colors"
                                                        >
                                                            {info.value}
                                                        </a>
                                                    ) : (
                                                        <div className="text-sm text-white">
                                                            {info.value}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <Card hover={false}>
                                    <h3 className="text-lg font-display font-bold mb-4">
                                        Follow Us
                                    </h3>
                                    <div className="flex gap-3">
                                        {[
                                            { icon: Twitter, label: "Twitter" },
                                            { icon: Linkedin, label: "LinkedIn" },
                                            { icon: Github, label: "GitHub" },
                                        ].map((social) => (
                                            <a
                                                key={social.label}
                                                href="#"
                                                aria-label={social.label}
                                                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-400/30 transition-all"
                                            >
                                                <social.icon className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                </Card>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3}>
                                <Card hover={false} className="!bg-gold-400/5 !border-gold-400/15">
                                    <h3 className="text-lg font-display font-bold mb-2">
                                        Free Consultation
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Not sure where to start? Book a free 30-minute strategy
                                        call with one of our automation experts.
                                    </p>
                                    <Button variant="secondary" size="sm" href="mailto:hello@bridgeflow.agency">
                                        Book a Call
                                        <ArrowRight className="w-3 h-3" />
                                    </Button>
                                </Card>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
