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
  Boxes,
  RefreshCw,
  CheckCircle2,
  Building2,
  Briefcase,
  User,
  AlertCircle,
  Zap,
  Settings
} from "lucide-react";

const serviceCategories = [
  {
    id: "foundation",
    badge: "Entry",
    title: "Foundation Services",
    description: "Start with clarity. We audit your current operations, map your workflow dependencies, and create a blueprint for automation.",
    icon: Search,
    services: [
      {
        name: "Workflow Audit & Automation Blueprint",
        description: "A comprehensive analysis of your current operations with actionable recommendations.",
      },
      {
        name: "Tool Stack Rationalization",
        description: "Identify redundant tools, integration gaps, and consolidation opportunities.",
      },
      {
        name: "AI-Readiness Assessment",
        description: "Evaluate which processes are ready for AI automation and which need preparation.",
      },
    ],
    outcomes: [
      "Clear visibility into operational bottlenecks",
      "Prioritized automation opportunities",
      "ROI projections for each initiative",
    ],
    priceRange: "$300 – $700",
  },
  {
    id: "implementation",
    badge: "Core",
    title: "Implementation Services",
    description: "Custom-built automation systems designed for your specific workflows. Production-grade, documented, and reliable.",
    icon: FileCode2,
    services: [
      {
        name: "n8n-Based Automation Systems",
        description: "Powerful workflow automations built on a proven open-source platform.",
      },
      {
        name: "AI Agents",
        description: "Intelligent agents for support, operations, sales, and research tasks.",
      },
      {
        name: "CRM & Internal Ops Automation",
        description: "Streamlined sales pipelines, team coordination, and task management.",
      },
      {
        name: "API Integrations",
        description: "Connect Supabase, Notion, Slack, WhatsApp, Email, Stripe, and more.",
      },
    ],
    outcomes: [
      "Automated lead-to-close workflows",
      "24/7 AI-powered customer support",
      "Seamless tool integrations",
    ],
    priceRange: "$1,500 – $5,000+",
  },
  {
    id: "productized",
    badge: "Systems",
    title: "Productized Systems",
    description: "Pre-designed, battle-tested automation systems that solve common operational challenges. Faster deployment, proven results.",
    icon: Boxes,
    services: [
      {
        name: "Lead-to-Close Automation System",
        description: "Capture leads, qualify automatically, nurture with sequences, and close efficiently.",
      },
      {
        name: "AI Operations Assistant",
        description: "An intelligent assistant that handles routine operational queries and tasks.",
      },
      {
        name: "Client Onboarding & Delivery Engine",
        description: "Automated onboarding flows, milestone tracking, and delivery management.",
      },
    ],
    outcomes: [
      "80% faster lead response time",
      "Consistent client experience",
      "Reduced manual coordination",
    ],
    priceRange: "$2,000 – $4,000",
  },
  {
    id: "retainers",
    badge: "Ongoing",
    title: "Retainer Services",
    description: "Keep your automation systems running at peak performance with ongoing monitoring, optimization, and updates.",
    icon: RefreshCw,
    services: [
      {
        name: "Automation Monitoring",
        description: "Proactive monitoring of all workflows with rapid issue resolution.",
      },
      {
        name: "System Optimization",
        description: "Continuous improvements based on performance data and evolving needs.",
      },
      {
        name: "AI Updates & Maintenance",
        description: "Keep AI agents current with model updates and training refinements.",
      },
    ],
    outcomes: [
      "99%+ automation uptime",
      "Evolving systems that grow with you",
      "Priority support access",
    ],
    priceRange: "$300 – $1,000/month",
  },
];

const targetCustomers = [
  {
    icon: Briefcase,
    title: "Agencies & Consultants",
    description: "Lead management, onboarding, reporting, and delivery automation.",
  },
  {
    icon: Building2,
    title: "SMBs (5–50 employees)",
    description: "Sales ops, internal workflows, and customer support automation.",
  },
  {
    icon: User,
    title: "Creators & Solopreneurs",
    description: "Funnel automation, content ops, and monetization systems.",
  },
];

import PageTransition from "@/components/page-transition";

export default function Solutions() {
  useSEO({
    title: "Solutions",
    description: "Explore BridgeFlow's automation services: Foundation audits, Implementation builds, Productized systems, and Retainer support packages.",
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
              <Badge variant="outline" className="mb-4">Solutions</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Automation systems built for{" "}
                <span className="text-gradient-animated">real operations</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Not feature lists. Not tool demos. Solutions designed around your
                business outcomes—from discovery to deployment to ongoing optimization.
              </p>
            </motion.div>
          </div>
        </GradientBackground>

        <section className="py-12 bg-gradient-to-b from-card/50 to-background border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-lg font-medium mb-8 text-center text-muted-foreground">Who we work with</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {targetCustomers.map((customer, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <Card
                    className="p-6 bg-card border-card-border card-glow"
                    data-testid={`customer-type-${index}`}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <customer.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold">{customer.title}</h3>
                        <p className="text-sm text-muted-foreground">{customer.description}</p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Gallery */}
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <AnimatedSection className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">Performance Deep-Dives</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Engineering Business Outcomes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We don't just build workflows. We solve specific operational bottlenecks with measurable ROI.
              </p>
            </AnimatedSection>

            <div className="space-y-12">
              {[
                {
                  title: "Real Estate Lead Routing",
                  client: "Legacy Homes Group",
                  problem: "Manual lead sorting took 12+ hours/week. Response time was 3 hours.",
                  solution: "Built an n8n + OpenAI agent that qualifies leads 24/7 and routes high-intent prospects to WhatsApp.",
                  result: "0 hours manual work, < 2 min response time, 40% increase in bookings.",
                  tags: ["n8n", "OpenAI", "WhatsApp API"],
                  metric: "40% Booking Uplift"
                },
                {
                  title: "Automated Client Onboarding",
                  client: "Venture Digital Agency",
                  problem: "Onboarding a single client required 8 disjointed manual steps across 4 tools.",
                  solution: "Engineered a production-grade orchestration layer connecting Stripe, Notion, and Slack.",
                  result: "Instant onboarding, 100% data accuracy, 12 hours saved/month/CM.",
                  tags: ["Stripe", "Notion", "Slack Orchestration"],
                  metric: "100% Data Accuracy"
                }
              ].map((study, index) => (
                <AnimatedSection key={index} delay={index * 0.2}>
                  <Card className="overflow-hidden border-card-border bg-card/50 backdrop-blur card-glow group">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      <div className="lg:col-span-8 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-border/50">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {study.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="px-2 py-0 text-[10px] uppercase font-bold tracking-tighter">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{study.title}</h3>
                        <p className="text-primary font-medium mb-6">{study.client}</p>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-accent" />
                              The Challenge
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">{study.problem}</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              The Solution
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-4 p-8 md:p-10 bg-primary/5 flex flex-col justify-center items-center text-center">
                        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2 font-medium">The Result</p>
                        <div className="text-4xl font-black text-primary mb-4 group-hover:scale-110 transition-transform duration-500">
                          {study.metric}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed italic mb-8">
                          "{study.result}"
                        </p>
                        <Link href="/contact">
                          <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            Build This System
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* The BridgeFlow Framework */}
        <section className="py-20 lg:py-28 bg-card/30 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Settings className="w-4 h-4" />
                  <span>Methodology</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">The BridgeFlow Framework</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We apply software engineering discipline to business operations. No "no-code" black boxes—just versioned, testable, and reliable systems.
                </p>

                <div className="space-y-6">
                  {[
                    { title: "Audit & Map", desc: "We identify manual bottlenecks and map workflow dependencies before touching a single tool." },
                    { title: "Architect & Build", desc: "Production-grade development using version-controlled workflows and externalized prompts." },
                    { title: "Test & Monitor", desc: "Rigorous stress-testing and 24/7 uptime monitoring to ensure execution reliability." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-border/50 hover:bg-background/50 transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <span className="font-bold text-primary">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl card-glow">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 pointer-events-none" />
                  <img
                    src="/demo-assets/n8n-workflow.png"
                    alt="BridgeFlow Engineering Framework"
                    className="w-full h-auto opacity-80"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-background to-transparent pt-20">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-medium">Version-Controlled Workflows</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-medium">Automated Error Recovery</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="space-y-20">
              {serviceCategories.map((category, categoryIndex) => (
                <AnimatedSection
                  key={category.id}
                  delay={categoryIndex * 0.1}
                >
                  <div
                    id={category.id}
                    className="scroll-mt-24"
                    data-testid={`section-${category.id}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div>
                        <Badge variant="secondary" className="mb-4">{category.badge}</Badge>
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                            whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                          >
                            <category.icon className="w-5 h-5 text-primary" />
                          </motion.div>
                          <h2 className="text-2xl sm:text-3xl font-bold">{category.title}</h2>
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-2 mb-6">
                          <span className="text-sm text-muted-foreground">Investment:</span>
                          <span className="font-semibold text-accent">{category.priceRange}</span>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                            What you get
                          </h4>
                          {category.services.map((service, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>
                                <h5 className="font-medium">{service.name}</h5>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <Card className="p-6 bg-card border-card-border">
                        <h4 className="font-medium mb-4">Expected Outcomes</h4>
                        <ul className="space-y-3">
                          {category.outcomes.map((outcome, index) => (
                            <motion.li
                              key={index}
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                              <span className="text-muted-foreground">{outcome}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-6 border-t border-border">
                          <Link href="/contact">
                            <Button className="w-full gap-2" data-testid={`button-get-started-${category.id}`}>
                              Get Started
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </div>

                    {categoryIndex < serviceCategories.length - 1 && (
                      <div className="border-t border-border mt-20" />
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <GradientBackground variant="cta" className="py-20 lg:py-28 border-t border-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Not sure which solution fits?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start with a workflow audit. We'll analyze your operations and recommend
                the right approach based on your specific situation and goals.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact">
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" data-testid="button-solutions-cta">
                    Book a System Audit
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
