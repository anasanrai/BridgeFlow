import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { GradientBackground } from "@/components/gradient-background";
import { AnimatedSection } from "@/components/animated-section";
import { Search, Globe, Zap, ArrowRight, ShieldCheck, BarChart } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import PageTransition from "@/components/page-transition";

export default function Audit() {
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    useSEO({
        title: "Free Real Estate Speed-to-Lead Audit | BridgeFlow Agency",
        description: "Get a custom report of your website's lead response performance. See how much money you're losing to slow response times and how to automate it in <60 seconds.",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Direct integration with n8n webhook as requested in the plan
            const response = await fetch("https://n8n.n8ngalaxy.com/webhook/real-estate-demo-lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url,
                    email,
                    type: "audit_request",
                    source: "audit_page"
                }),
            });

            if (!response.ok) throw new Error("Failed to submit");

            toast({
                title: "Audit Request Received!",
                description: "Our engine is analyzing your URL. You'll receive your Speed-to-Lead report via email shortly.",
            });
            setUrl("");
            setEmail("");
        } catch (error) {
            toast({
                title: "Submission Error",
                description: "Failed to process your audit. Please try again or contact hello@bridgeflow.agency.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen pt-24 pb-16">
                <GradientBackground variant="hero" className="py-20 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <AnimatedSection>
                            <Badge variant="outline" className="mb-4 gap-2 py-1 px-4 border-primary/30 bg-primary/5 text-primary">
                                <Search className="w-3 h-3" />
                                The "Trojan Horse" Audit
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                Stop Losing Real Estate Deals to <br />
                                <span className="text-gradient-animated">Slow Responsiveness</span>
                            </h1>
                            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                                Is your website leaking leads? Enter your URL below for a benchmark-setting
                                <strong> Speed-to-Lead Performance Audit</strong>. See the gap between your current flow and a technical authority engine.
                            </p>

                            <Card className="p-8 md:p-10 border-primary/20 bg-card/50 backdrop-blur-sm max-w-2xl mx-auto shadow-2xl shadow-primary/10">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2 text-left">
                                        <label className="text-sm font-medium text-muted-foreground ml-1">Website URL</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                placeholder="https://your-agency.com"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                className="pl-10 h-12 bg-background/50"
                                                required
                                                type="url"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <label className="text-sm font-medium text-muted-foreground ml-1">Business Email</label>
                                        <div className="relative">
                                            <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                placeholder="you@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10 h-12 bg-background/50"
                                                required
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full h-14 text-lg button-cta gap-2 shadow-lg shadow-primary/20"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Engine Running..." : "Generate My Custom Audit Report"}
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                    <p className="text-xs text-muted-foreground">
                                        *Our n8n-powered engine will perform a live speed-to-lead test on your domain.
                                    </p>
                                </form>
                            </Card>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                            <AnimatedSection delay={0.1}>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">Performance Leak Test</h3>
                                    <p className="text-sm text-muted-foreground">We measure exactly how long it takes for your system to acknowledge a new real estate lead.</p>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection delay={0.2}>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                        <ShieldCheck className="w-6 h-6 text-accent" />
                                    </div>
                                    <h3 className="font-semibold">Reliability Score</h3>
                                    <p className="text-sm text-muted-foreground">Comprehensive check of data synchronization across your CRM and automation stacks.</p>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection delay={0.3}>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <BarChart className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">Revenue Recovery Map</h3>
                                    <p className="text-sm text-muted-foreground">A detailed roadmap of how many deals you're losing and how to recover them today.</p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </GradientBackground>
            </div>
        </PageTransition>
    );
}
