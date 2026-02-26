export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import {
    ScrollReveal,
    SectionHeader,
    Button,
    Card,
} from "@/components/ui";
import { ArrowRight } from "lucide-react";
import LucideIcon from "@/components/LucideIcon";
import { getAboutContent, getPageSEO } from "@/lib/supabase-data";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getPageSEO("/about");
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

export default async function About() {
    const { hero, mission, values, teamMember, techStack, milestones } =
        await getAboutContent();

    // Import founder-specific data directly (not in Supabase)
    const { founderStory, founderQuote } = await import("@/data/about");

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max px-4 sm:px-6">
                    <div className="max-w-3xl">
                        <ScrollReveal>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5">
                                {hero.badge}
                            </span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                                {hero.title}{" "}
                                <span className="gold-text">
                                    {hero.highlight}
                                </span>
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
                                {hero.description}
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="section-padding">
                <div className="container-max">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollReveal>
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                                    {mission.title}{" "}
                                    <span className="gold-text">
                                        {mission.highlight}
                                    </span>
                                </h2>
                                <div className="text-gray-400 text-lg leading-relaxed space-y-6">
                                    {mission.content
                                        .split("\n\n")
                                        .map(
                                            (
                                                para: string,
                                                idx: number
                                            ) => (
                                                <p key={idx}>{para}</p>
                                            )
                                        )}
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <div className="grid grid-cols-2 gap-4">
                                {values.map((v: any) => (
                                    <Card key={v.title}>
                                        <span className="text-3xl mb-3 block">
                                            {v.emoji || "⚡"}
                                        </span>
                                        <h3 className="font-display font-bold mb-1">
                                            {v.title}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {v.description}
                                        </p>
                                    </Card>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Meet the Founder */}
            <section className="section-padding bg-navy-900/20">
                <div className="container-max">
                    <SectionHeader
                        badge="The Founder"
                        title="Meet the"
                        highlight="founder"
                    />

                    <div className="max-w-3xl mx-auto">
                        {/* Founder Card */}
                        <ScrollReveal>
                            <Card className="text-center mb-12">
                                <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center mx-auto mb-5 text-navy-950 font-display font-bold text-2xl">
                                    AR
                                </div>
                                <h3 className="font-display font-bold text-2xl mb-1">
                                    Anasan Rai
                                </h3>
                                <p className="text-gold-400 text-sm font-medium mb-2">
                                    CEO &amp; Founder &amp; AI Automation
                                    Engineer
                                </p>
                                <p className="text-gray-500 text-sm">
                                    🇳🇵 Kathmandu, Nepal · Remote-first,
                                    Global
                                </p>
                            </Card>
                        </ScrollReveal>

                        {/* Founder Story */}
                        <ScrollReveal delay={0.1}>
                            <div className="space-y-5 text-gray-400 text-lg leading-relaxed mb-10">
                                {founderStory.map(
                                    (para: string, idx: number) => (
                                        <p key={idx}>{para}</p>
                                    )
                                )}
                            </div>
                        </ScrollReveal>

                        {/* Gold Quote Block */}
                        <ScrollReveal delay={0.2}>
                            <blockquote className="relative rounded-2xl border-l-4 border-gold-400 bg-gold-400/[0.04] backdrop-blur-sm px-8 py-6 mb-10">
                                <p className="text-white text-lg leading-relaxed italic mb-3">
                                    &ldquo;{founderQuote.text}&rdquo;
                                </p>
                                <cite className="text-gold-400 text-sm font-semibold not-italic">
                                    — {founderQuote.author}
                                </cite>
                            </blockquote>
                        </ScrollReveal>

                        {/* Careers Link */}
                        <ScrollReveal delay={0.3}>
                            <div className="text-center">
                                <Link
                                    href="/careers"
                                    className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium transition-colors group"
                                >
                                    We&apos;re growing — see open roles
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="section-padding">
                <div className="container-max">
                    <SectionHeader
                        badge="Technology"
                        title="Our tech"
                        highlight="stack"
                        description="We use best-in-class tools to build automations that are fast, reliable, and scalable."
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                        {techStack.map((tech: any, i: number) => (
                            <ScrollReveal key={tech.name} delay={i * 0.03}>
                                <Card className="text-center !p-4">
                                    <LucideIcon
                                        name={tech.icon}
                                        className="w-7 h-7 text-gold-400 mx-auto mb-2"
                                    />
                                    <h3 className="font-semibold text-xs">
                                        {tech.name}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 mt-0.5">
                                        {tech.desc}
                                    </p>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding bg-navy-900/20">
                <div className="container-max">
                    <SectionHeader
                        badge="Journey"
                        title="Our"
                        highlight="story"
                    />
                    <div className="max-w-2xl mx-auto">
                        {milestones.map((m: any, i: number) => (
                            <ScrollReveal
                                key={m.title + m.year}
                                delay={i * 0.1}
                            >
                                <div className="flex gap-6 mb-10 last:mb-0">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full border-2 border-gold-400/30 bg-gold-400/5 flex items-center justify-center flex-shrink-0">
                                            <span className="text-[10px] font-bold gold-text">
                                                {m.year}
                                            </span>
                                        </div>
                                        {i < milestones.length - 1 && (
                                            <div className="w-px flex-1 bg-gradient-to-b from-gold-400/30 to-transparent mt-2" />
                                        )}
                                    </div>
                                    <div className="pb-10">
                                        <h3 className="font-display font-bold text-lg mb-1">
                                            {m.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {m.description}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="container-max">
                    <ScrollReveal>
                        <div className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-center glass card-glow">
                            <div className="absolute inset-0 bg-hero-glow opacity-50" />
                            <div className="relative z-10">
                                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                                    Want to join our{" "}
                                    <span className="gold-text">
                                        journey?
                                    </span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                    Whether you&apos;re a potential client or
                                    future team member, we&apos;d love to hear
                                    from you.
                                </p>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    href="/contact"
                                >
                                    Get in Touch
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
