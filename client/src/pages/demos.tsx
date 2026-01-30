
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GradientBackground } from "@/components/gradient-background";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import PageTransition from "@/components/page-transition";
import { ArrowRight, Workflow, Zap, Bot, Database } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useSEO } from "@/hooks/use-seo";

import n8nGmailImg from "../assets/n8n-gmail-workflow.png";
import n8nAiImg from "../assets/n8n-ai-agent-workflow.png";
import n8nTelegramImg from "../assets/n8n-telegram-bot.png";
import ghlDashboardImg from "../assets/ghl-pipeline-dashboard.png";
import ghlWorkflowImg from "../assets/ghl-workflow.png";

export default function Demos() {
    useSEO({
        title: "Live Automation Demos | BridgeFlow Agency",
        description: "See our n8n and GoHighLevel automation workflows in action. We build complex systems that scale.",
    });

    return (
        <PageTransition>
            <div className="min-h-screen pt-24 pb-16">
                <GradientBackground variant="hero" className="mb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 lg:pt-24 pb-16">
                        <AnimatedSection>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                                Automation in <span className="text-gradient">Action</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                                Don't just take our word for it. See the complex workflows we build to power businesses like yours.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25 button-cta">
                                    Build My System <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </AnimatedSection>
                    </div>
                </GradientBackground>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

                    {/* 90-Second Demo Section */}
                    <section id="fast-demo">
                        <AnimatedSection className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                <Zap className="w-4 h-4" />
                                <span>See It In 90 Seconds</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-4">How We Build Systems</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Watch a quick breakdown of a live GoHighLevel automation setup to see exactly how we engineer reliability.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card/50 backdrop-blur ring-1 ring-white/10 group aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/n9pNMVsvITE?si=pcurhPiZNv5USofz"
                                    title="BridgeFlow Agency - n8n & GHL Automation Architecture"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </AnimatedSection>
                    </section>

                    {/* n8n Section */}
                    <section className="scroll-mt-24" id="n8n-demo">
                        <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1 max-w-[500px] lg:max-w-none mx-auto w-full px-8 lg:px-0">
                                <Carousel className="w-full" opts={{ loop: true }} autoplay autoplayInterval={3500} pauseOnHover>
                                    <CarouselContent>
                                        <CarouselItem>
                                            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card/50 backdrop-blur ring-1 ring-white/10 group aspect-video">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <img
                                                    src={n8nGmailImg}
                                                    alt="Gmail Automation Workflow with n8n"
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Gmail Inbox Manager Agent
                                                </div>
                                            </div>
                                        </CarouselItem>
                                        <CarouselItem>
                                            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card/50 backdrop-blur ring-1 ring-white/10 group aspect-video">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <img
                                                    src={n8nAiImg}
                                                    alt="AI Agent Workflow Architecture"
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    AI Research & Summary Agent
                                                </div>
                                            </div>
                                        </CarouselItem>
                                        <CarouselItem>
                                            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card/50 backdrop-blur ring-1 ring-white/10 group aspect-video">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <img
                                                    src={n8nTelegramImg}
                                                    alt="Telegram Voice Bot Workflow"
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Multi-Modal Telegram Bot (Voice + Text)
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    </CarouselContent>
                                    {/* Removed manual arrows for a cleaner auto-slide experience */}
                                </Carousel>
                                <div className="text-center mt-4 text-xs text-muted-foreground md:hidden">
                                    Swipe to see more workflows
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                                    <Workflow className="w-4 h-4" />
                                    <span>Workflow Orchestration</span>
                                </div>
                                <h2 className="text-3xl font-bold">Intelligent Process Routing with n8n</h2>
                                <p className="text-lg text-muted-foreground">
                                    Our n8n workflows aren't just simple triggers. We build sophisticated logic layers that handle data enrichment, conditional routing, and multi-service orchestration.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Bot className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">AI Agent Integration</h3>
                                            <p className="text-sm text-muted-foreground">Seamlessly pass context between LLMs and your internal tools.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <Database className="w-4 h-4 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Data Synchronization</h3>
                                            <p className="text-sm text-muted-foreground">Keep your CRM, Project Management, and Communication tools in perfect sync.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </AnimatedSection>
                    </section>

                    {/* GoHighLevel Section */}
                    <section className="scroll-mt-24" id="ghl-demo">
                        <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center" delay={0.2}>
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                    <Zap className="w-4 h-4" />
                                    <span>Marketing Automation</span>
                                </div>
                                <h2 className="text-3xl font-bold">GoHighLevel Lead Nurturing</h2>
                                <p className="text-lg text-muted-foreground">
                                    Capture, nurture, and close leads on autopilot. Our GHL setups ensure no opportunity slips through the cracks.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Card className="p-4 bg-background/50 border-border/50">
                                        <h3 className="font-semibold mb-2">Smart Triggers</h3>
                                        <p className="text-sm text-muted-foreground">Instant actions based on user behavior and engagement scores.</p>
                                    </Card>
                                    <Card className="p-4 bg-background/50 border-border/50">
                                        <h3 className="font-semibold mb-2">Pipeline Management</h3>
                                        <p className="text-sm text-muted-foreground">Visual deal tracking with automated stage progression.</p>
                                    </Card>
                                </div>
                            </div>
                            <Carousel className="w-full" opts={{ loop: true }} autoplay autoplayInterval={3500} pauseOnHover>
                                <CarouselContent>
                                    <CarouselItem>
                                        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card/50 backdrop-blur ring-1 ring-white/10 group aspect-video">
                                            <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <img
                                                src={ghlDashboardImg}
                                                alt="GoHighLevel Pipeline Dashboard with Sales Analytics"
                                                className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-[1.02]"
                                            />
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card/50 backdrop-blur ring-1 ring-white/10 group aspect-video">
                                            <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <img
                                                src={ghlWorkflowImg}
                                                alt="GoHighLevel Workflow Builder - New Lead Welcome Sequence"
                                                className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-[1.02]"
                                            />
                                        </div>
                                    </CarouselItem>

                                </CarouselContent>
                                {/* Removed manual arrows for a cleaner auto-slide experience */}
                            </Carousel>
                        </AnimatedSection>
                    </section>

                    {/* CTA Section */}
                    <AnimatedSection delay={0.4} className="text-center py-16 bg-gradient-to-b from-transparent to-accent/5 rounded-3xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-6">Ready to automate your operations?</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                            We build custom systems tailored to your unique business needs. Let's discuss your workflow.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="h-12 px-8">
                                    Get Your Custom Build
                                </Button>
                            </Link>
                            <Link href="/pricing">
                                <Button variant="outline" size="lg" className="h-12 px-8">
                                    View Pricing
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </PageTransition>
    );
}
