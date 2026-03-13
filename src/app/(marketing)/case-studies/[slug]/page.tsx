import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, TrendingUp, Lightbulb, Target, CheckCircle, Tag, Calendar, Building2, ExternalLink } from "lucide-react";
import { ScrollReveal, Card, Button } from "@/components/ui";
import { getCaseStudy, getCaseStudies, getSiteConfig } from "@/lib/supabase-data";

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    const caseStudies = await getCaseStudies();
    return caseStudies.map((cs: any) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const [cs, site] = await Promise.all([getCaseStudy(params.slug), getSiteConfig()]);
    if (!cs) return { title: "Case Study Not Found" };
    const title = `${cs.title} | Case Study | ${site.name}`;
    return {
        title,
        description: cs.excerpt,
        alternates: { canonical: `${site.url}/case-studies/${cs.slug}` },
        openGraph: {
            title,
            description: cs.excerpt,
            url: `${site.url}/case-studies/${cs.slug}`,
            type: "article",
        },
    };
}

export default async function CaseStudyDetail({ params }: Props) {
    const [cs, allCaseStudies] = await Promise.all([
        getCaseStudy(params.slug),
        getCaseStudies(),
    ]);

    if (!cs) notFound();

    // Get related case studies (exclude current)
    const related = allCaseStudies.filter((c: any) => c.slug !== cs.slug).slice(0, 2);

    // Industry color mapping
    const industryColors: Record<string, string> = {
        SaaS: "text-blue-400 bg-blue-400/10 border-blue-400/20",
        Consulting: "text-purple-400 bg-purple-400/10 border-purple-400/20",
        "Digital Marketing": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        "Real Estate": "text-orange-400 bg-orange-400/10 border-orange-400/20",
        "E-Commerce": "text-pink-400 bg-pink-400/10 border-pink-400/20",
    };
    const industryColor = industryColors[cs.industry] || "text-gold-400 bg-gold-400/10 border-gold-400/20";

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-navy-800/50 via-navy-950 to-navy-950" />
                <div className="relative z-10 container-max px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <ScrollReveal>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/case-studies" className="hover:text-gold-400 transition-colors">Case Studies</Link>
                            <span>/</span>
                            <span className="text-gray-400">{cs.title}</span>
                        </div>
                    </ScrollReveal>

                    <div className="max-w-4xl">
                        <ScrollReveal>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${industryColor}`}>
                                    <Building2 className="w-3 h-3" />
                                    {cs.industry}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border border-white/10 text-gray-400 bg-white/5">
                                    <Calendar className="w-3 h-3" />
                                    Case Study
                                </span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
                                {cs.title}
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
                                {cs.excerpt}
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <div className="flex items-center gap-6">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Client</div>
                                    <div className="text-white font-semibold">{cs.client}</div>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Industry</div>
                                    <div className="text-white font-semibold">{cs.industry}</div>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Service</div>
                                    <div className="text-white font-semibold">AI Automation</div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Results Banner */}
            <section className="py-12 bg-navy-900/50 border-y border-white/5">
                <div className="container-max px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {cs.results.map((result: any, i: number) => (
                                <div key={i} className="text-center">
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold gold-text mb-2">
                                        {result.metric}
                                    </div>
                                    <div className="text-sm text-gray-400 capitalize">
                                        {result.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-max px-4 sm:px-6">
                    <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* The Challenge */}
                            <ScrollReveal>
                                <div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center">
                                            <Target className="w-5 h-5 text-red-400" />
                                        </div>
                                        <h2 className="text-2xl font-display font-bold">The Challenge</h2>
                                    </div>
                                    <Card hover={false} className="!border-red-400/10">
                                        <p className="text-gray-300 leading-relaxed text-base">
                                            {cs.challenge}
                                        </p>
                                    </Card>
                                </div>
                            </ScrollReveal>

                            {/* Our Solution */}
                            <ScrollReveal delay={0.1}>
                                <div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                                            <Lightbulb className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <h2 className="text-2xl font-display font-bold">Our Solution</h2>
                                    </div>
                                    <Card hover={false} className="!border-emerald-400/10">
                                        <p className="text-gray-300 leading-relaxed text-base">
                                            {cs.solution}
                                        </p>
                                    </Card>
                                </div>
                            </ScrollReveal>

                            {/* Results Detail */}
                            <ScrollReveal delay={0.2}>
                                <div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-gold-400" />
                                        </div>
                                        <h2 className="text-2xl font-display font-bold">Measurable Results</h2>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {cs.results.map((result: any, i: number) => (
                                            <Card key={i} hover={false} className="!p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <CheckCircle className="w-4 h-4 text-gold-400" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-display font-bold gold-text mb-1">
                                                            {result.metric}
                                                        </div>
                                                        <div className="text-sm text-gray-400 capitalize">
                                                            {result.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Tags */}
                            <ScrollReveal delay={0.3}>
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Tag className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-500 uppercase tracking-wider">Technologies Used</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {cs.tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-1.5 text-sm text-gray-300 border border-white/10 rounded-full bg-white/5 hover:border-gold-400/30 hover:text-gold-400 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* CTA Card */}
                            <ScrollReveal delay={0.1}>
                                <Card hover={false} className="!bg-gold-400/5 !border-gold-400/20 sticky top-24">
                                    <h3 className="text-lg font-display font-bold mb-3">
                                        Want results like this?
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                        Every project starts with a free 30-minute strategy call. Let&apos;s identify your biggest automation opportunities.
                                    </p>
                                    <Button variant="primary" size="sm" href="/contact" className="w-full justify-center">
                                        Book a Free Call
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Button>
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <Link href="/pricing" className="flex items-center justify-between text-sm text-gray-400 hover:text-gold-400 transition-colors group">
                                            <span>View Pricing Plans</span>
                                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </Card>
                            </ScrollReveal>

                            {/* Quick Stats */}
                            <ScrollReveal delay={0.2}>
                                <Card hover={false}>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                        Project Overview
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Client</span>
                                            <span className="text-sm font-semibold text-white">{cs.client}</span>
                                        </div>
                                        <div className="h-px bg-white/5" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Industry</span>
                                            <span className="text-sm font-semibold text-white">{cs.industry}</span>
                                        </div>
                                        <div className="h-px bg-white/5" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Service</span>
                                            <span className="text-sm font-semibold text-white">AI Automation</span>
                                        </div>
                                        <div className="h-px bg-white/5" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Status</span>
                                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                Live
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Case Studies */}
            {related.length > 0 && (
                <section className="section-padding border-t border-white/5">
                    <div className="container-max px-4 sm:px-6">
                        <ScrollReveal>
                            <h2 className="text-2xl font-display font-bold mb-8">More Case Studies</h2>
                        </ScrollReveal>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {related.map((relatedCs: any, i: number) => (
                                <ScrollReveal key={relatedCs.slug} delay={i * 0.1}>
                                    <Link href={`/case-studies/${relatedCs.slug}`} className="block group">
                                        <Card className="h-full transition-all duration-300 group-hover:border-gold-400/30">
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider">{relatedCs.industry}</span>
                                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <h3 className="text-lg font-display font-bold mb-2 group-hover:text-gold-400 transition-colors">
                                                {relatedCs.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {relatedCs.excerpt}
                                            </p>
                                        </Card>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                        <ScrollReveal delay={0.2}>
                            <div className="mt-8 text-center">
                                <Button variant="secondary" href="/case-studies">
                                    <ArrowLeft className="w-4 h-4" />
                                    All Case Studies
                                </Button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="section-padding">
                <div className="container-max px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-center glass card-glow">
                            <div className="absolute inset-0 bg-hero-glow opacity-50" />
                            <div className="relative z-10">
                                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                                    Ready to be our next <span className="gold-text">success story?</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                    Every project starts with a conversation. Let&apos;s discuss what automation can do for your business.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button variant="primary" size="lg" href="/contact">
                                        Start Your Project
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                    <Button variant="secondary" size="lg" href="/pricing">
                                        View Pricing
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
