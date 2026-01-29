import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradientBackground } from "@/components/gradient-background";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { useSEO } from "@/hooks/use-seo";
import {
  ArrowRight,
  Search,
  FileCode2,
  Hammer,
  FlaskConical,
  Rocket,
  RefreshCw,
  CheckCircle2
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Audit",
    duration: "1-2 weeks",
    description: "We dive deep into your current operations to understand how work actually flows through your organization.",
    activities: [
      "Stakeholder interviews",
      "Process documentation review",
      "Tool stack analysis",
      "Pain point identification",
      "Opportunity mapping",
    ],
    deliverables: [
      "Current state documentation",
      "Workflow dependency map",
      "Automation opportunity matrix",
    ],
  },
  {
    number: "02",
    icon: FileCode2,
    title: "System Design",
    duration: "1-2 weeks",
    description: "We architect a custom automation system that addresses your specific challenges and aligns with your goals.",
    activities: [
      "Solution architecture",
      "Integration planning",
      "Data flow design",
      "AI agent specifications",
      "Rollout strategy",
    ],
    deliverables: [
      "System design document",
      "Technical specifications",
      "Implementation roadmap",
    ],
  },
  {
    number: "03",
    icon: Hammer,
    title: "Build",
    duration: "2-4 weeks",
    description: "We construct your automation system using production-grade tools and engineering best practices.",
    activities: [
      "Workflow development",
      "AI agent training",
      "Integration building",
      "Error handling setup",
      "Logging & monitoring",
    ],
    deliverables: [
      "Working automation system",
      "Integration connectors",
      "Trained AI agents",
    ],
  },
  {
    number: "04",
    icon: FlaskConical,
    title: "Test & Validate",
    duration: "1 week",
    description: "Rigorous testing ensures your system works reliably under real-world conditions before going live.",
    activities: [
      "Unit testing",
      "Integration testing",
      "Load testing",
      "Edge case handling",
      "User acceptance testing",
    ],
    deliverables: [
      "Test results documentation",
      "Performance benchmarks",
      "Sign-off checklist",
    ],
  },
  {
    number: "05",
    icon: Rocket,
    title: "Deploy",
    duration: "1 week",
    description: "We carefully roll out your system with proper change management and team enablement.",
    activities: [
      "Production deployment",
      "Team training sessions",
      "Documentation handover",
      "Go-live support",
      "Monitoring setup",
    ],
    deliverables: [
      "Live production system",
      "Training materials",
      "Operations manual",
    ],
  },
  {
    number: "06",
    icon: RefreshCw,
    title: "Optimize & Maintain",
    duration: "Ongoing",
    description: "Continuous monitoring and improvement ensures your system evolves with your business needs.",
    activities: [
      "Performance monitoring",
      "Proactive optimization",
      "Issue resolution",
      "Feature enhancements",
      "AI model updates",
    ],
    deliverables: [
      "Monthly performance reports",
      "Optimization recommendations",
      "Updated documentation",
    ],
  },
];

const principles = [
  {
    title: "Documentation First",
    description: "Every workflow is documented, versioned, and transferable. You own your systems completely.",
  },
  {
    title: "Engineering Discipline",
    description: "Proper testing, error handling, and monitoring. No shortcuts that create technical debt.",
  },
  {
    title: "Outcome Alignment",
    description: "We measure success by business impact, not features shipped or hours logged.",
  },
];

import PageTransition from "@/components/page-transition";

export default function HowItWorks() {
  useSEO({
    title: "How It Works",
    description: "Our 6-step delivery process: Discovery, Design, Build, Test, Deploy, and Support. See how we build reliable automation systems.",
  });

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <GradientBackground variant="hero" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">Process</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                How we build systems that{" "}
                <span className="text-gradient-animated">actually work</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A systematic, engineering-driven approach to automation.
                Six phases. Clear deliverables. Documented, transferable results.
              </p>
            </motion.div>
          </div>
        </GradientBackground>

        <section className="py-12 bg-gradient-to-b from-card/50 to-background border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {principles.map((principle, index) => (
                <AnimatedSection key={index} delay={index * 0.1} className="text-center">
                  <div data-testid={`principle-${index}`}>
                    <h3 className="font-semibold mb-2">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div data-testid={`step-${index}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      <div className="lg:col-span-4">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                            whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                          >
                            <step.icon className="w-7 h-7 text-primary" />
                          </motion.div>
                          <div>
                            <div className="text-sm text-primary font-mono mb-1">Step {step.number}</div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1">{step.duration}</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground mt-4 lg:ml-[4.5rem]">
                          {step.description}
                        </p>
                      </div>

                      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="p-5 bg-card border-card-border">
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                            Activities
                          </h4>
                          <ul className="space-y-2">
                            {step.activities.map((activity, actIndex) => (
                              <motion.li
                                key={actIndex}
                                className="flex items-center gap-2 text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: actIndex * 0.05 }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                {activity}
                              </motion.li>
                            ))}
                          </ul>
                        </Card>

                        <Card className="p-5 bg-card border-card-border">
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                            Deliverables
                          </h4>
                          <ul className="space-y-2">
                            {step.deliverables.map((deliverable, delIndex) => (
                              <motion.li
                                key={delIndex}
                                className="flex items-center gap-2 text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: delIndex * 0.05 }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                                {deliverable}
                              </motion.li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </div>

                    {index < processSteps.length - 1 && (
                      <div className="flex justify-center my-8">
                        <motion.div
                          className="w-px h-12"
                          style={{
                            background: "linear-gradient(180deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0) 100%)",
                          }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <GradientBackground variant="section" className="py-20 lg:py-28 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Timeline Overview</h2>
              <p className="text-muted-foreground">
                From audit to deployment in 6-10 weeks for most projects.
                Complex enterprise solutions may require additional time.
              </p>
            </AnimatedSection>

            <div className="relative overflow-hidden">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                {processSteps.slice(0, 5).map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center z-10 border-2 border-primary"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--primary) / 0.3)" }}
                    >
                      <span className="text-xs font-bold">{step.number}</span>
                    </motion.div>
                    <span className="text-xs text-muted-foreground mt-2 text-center max-w-[80px]">
                      {step.title.split(' ')[0]}
                    </span>
                    {index < 4 && (
                      <div className="absolute top-5 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 -z-10"
                        style={{ width: 'calc(100% + 2rem)' }} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </GradientBackground>

        <GradientBackground variant="cta" className="py-20 lg:py-28 border-t border-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to start the process?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Begin with a discovery call to discuss your operations, challenges, and goals.
                We'll determine if BridgeFlow is the right fit for your needs.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact">
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" data-testid="button-how-it-works-cta">
                    Book a Discovery Call
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </GradientBackground>
      </div>
    </PageTransition>
  );
}
