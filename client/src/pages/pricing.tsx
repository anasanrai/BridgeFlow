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
  CheckCircle2,
  Search,
  FileCode2,
  Boxes,
  RefreshCw,
  Zap
} from "lucide-react";

const pricingTiers = [
  {
    id: "foundation",
    name: "Foundation",
    tagline: "Start with clarity",
    price: "$300 – $700",
    priceNote: "one-time",
    icon: Search,
    description: "Audit your operations and create a blueprint for automation.",
    features: [
      "Workflow Audit & Automation Blueprint",
      "Tool Stack Rationalization",
      "AI-Readiness Assessment",
      "Prioritized opportunity matrix",
      "ROI projections",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "implementation",
    name: "Implementation",
    tagline: "Build your systems",
    price: "$1,500 – $5,000+",
    priceNote: "per project",
    icon: FileCode2,
    description: "Custom-built automation systems for your specific workflows.",
    features: [
      "n8n-Based Automation Systems",
      "AI Agents (support, ops, sales)",
      "CRM & Internal Ops Automation",
      "API Integrations (Slack, Notion, etc.)",
      "Full documentation & training",
      "30-day support included",
    ],
    cta: "Start Project",
    popular: true,
  },
  {
    id: "productized",
    name: "Productized Systems",
    tagline: "Proven solutions",
    price: "$2,000 – $4,000",
    priceNote: "per system",
    icon: Boxes,
    description: "Battle-tested automation systems ready for deployment.",
    features: [
      "Lead-to-Close Automation",
      "AI Operations Assistant",
      "Client Onboarding Engine",
      "Pre-configured integrations",
      "Quick deployment (1-2 weeks)",
      "Documentation included",
    ],
    cta: "Choose System",
    popular: false,
  },
  {
    id: "retainer",
    name: "Retainer",
    tagline: "Ongoing excellence",
    price: "$300 – $1,000",
    priceNote: "per month",
    icon: RefreshCw,
    description: "Keep your systems running at peak performance.",
    features: [
      "Automation Monitoring",
      "System Optimization",
      "AI Updates & Maintenance",
      "Priority support access",
      "Monthly performance reports",
      "99%+ uptime guarantee",
    ],
    cta: "Start Retainer",
    popular: false,
  },
];

const faqs = [
  {
    question: "How do I know which tier is right for me?",
    answer: "Start with a Foundation audit if you're unsure. We'll analyze your operations and recommend the best path forward based on your specific needs and goals.",
  },
  {
    question: "What's included in the project pricing?",
    answer: "All projects include discovery, design, build, testing, deployment, documentation, team training, and 30 days of post-launch support.",
  },
  {
    question: "Can I upgrade from a smaller project?",
    answer: "Absolutely. Many clients start with a Foundation audit, then move to Implementation. Your audit investment applies toward larger projects.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, for projects over $2,000 we offer milestone-based payments. Typically 50% upfront and 50% on completion.",
  },
  {
    question: "What if the automation doesn't work as expected?",
    answer: "We stand behind our work. All projects include testing and validation before launch, plus 30 days of support to address any issues.",
  },
];

export default function Pricing() {
  useSEO({
    title: "Pricing",
    description: "Transparent pricing for AI automation services. From $300 audits to full system builds. No hidden fees, no surprises.",
  });

  return (
    <div className="min-h-screen pt-24">
      <GradientBackground variant="hero" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Transparent pricing for{" "}
              <span className="text-gradient-animated">real results</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Investment aligned with outcomes. No hourly billing, no hidden fees. 
              Choose the engagement model that fits your needs.
            </p>
          </motion.div>
        </div>
      </GradientBackground>

      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <AnimatedCard key={tier.id} delay={index * 0.1}>
                <Card 
                  className={`p-6 h-full flex flex-col card-glow ${
                    tier.popular 
                      ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20" 
                      : "bg-card border-card-border"
                  }`}
                  data-testid={`card-pricing-${tier.id}`}
                >
                  {tier.popular && (
                    <Badge className="self-start mb-4 bg-primary text-primary-foreground animate-pulse-glow">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        tier.popular ? "bg-primary/20" : "bg-primary/10"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <tier.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground">{tier.tagline}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <motion.div 
                      className="text-2xl font-bold text-accent"
                      whileHover={{ scale: 1.02 }}
                    >{tier.price}</motion.div>
                    <div className="text-sm text-muted-foreground">{tier.priceNote}</div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-6">
                    {tier.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6 flex-grow">
                    {tier.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.05 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Link href="/contact">
                    <Button 
                      className="w-full" 
                      variant={tier.popular ? "default" : "outline"}
                      data-testid={`button-pricing-${tier.id}`}
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <GradientBackground variant="section" className="py-20 lg:py-28 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Value Guarantee</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">What's included in every engagement</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Full Documentation", description: "Every workflow documented for your team to understand and maintain." },
              { title: "System Ownership", description: "You own everything we build. No vendor lock-in, no recurring platform fees." },
              { title: "Training & Support", description: "Hands-on training plus 30 days of post-launch support included." },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="text-center">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </GradientBackground>

      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </AnimatedSection>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <Card 
                  className="p-6 bg-card border-card-border"
                  data-testid={`faq-${index}`}
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <GradientBackground variant="cta" className="py-20 lg:py-28 border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to invest in real automation?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a consultation to discuss your needs. We'll recommend the right 
              engagement model and provide a detailed proposal.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" data-testid="button-pricing-cta">
                  Request a Proposal
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </GradientBackground>
    </div>
  );
}
