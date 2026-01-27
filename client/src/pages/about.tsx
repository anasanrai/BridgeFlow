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
  Quote,
  Target,
  Lightbulb,
  Shield,
  Code2,
  FileCheck,
  Eye,
  Zap
} from "lucide-react";

const values = [
  {
    icon: Code2,
    title: "Engineering Discipline",
    description: "Versioned, testable, monitored automations. We apply software engineering rigor to operational systems.",
  },
  {
    icon: FileCheck,
    title: "System Ownership",
    description: "Everything we build is documented and transferable. You own your systems completely—no vendor lock-in.",
  },
  {
    icon: Eye,
    title: "Execution Reliability",
    description: "We build systems that run consistently. If it can't run without intervention, it's not a real system.",
  },
  {
    icon: Zap,
    title: "Outcome Focus",
    description: "We measure success by business impact—time saved, revenue increased, errors reduced—not features shipped.",
  },
];

const differentiators = [
  {
    us: "Production-grade systems designed for reliability",
    them: "Quick demos and proof-of-concepts",
  },
  {
    us: "Documented, transferable workflows you own",
    them: "Black-box solutions with vendor dependency",
  },
  {
    us: "Founder-led architecture and implementation",
    them: "Outsourced to junior developers",
  },
  {
    us: "Outcome-based pricing aligned with your ROI",
    them: "Hourly billing regardless of results",
  },
];

const timeline = [
  {
    phase: "Now",
    title: "Services",
    description: "Custom automation systems for operations-heavy businesses.",
  },
  {
    phase: "Soon",
    title: "Productized Solutions",
    description: "Battle-tested systems available as plug-and-play products.",
  },
  {
    phase: "Future",
    title: "n8nGalaxy Platform",
    description: "Full SaaS platform for workflow automation and AI operations.",
  },
];

export default function About() {
  useSEO({
    title: "About",
    description: "Meet BridgeFlow Agency. We build production-grade automation systems with engineering discipline. Learn our story and values.",
  });

  return (
    <div className="min-h-screen pt-24">
      <GradientBackground variant="hero" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">About</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Built on execution,{" "}
                <span className="text-gradient">not promises</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                BridgeFlow Agency exists to bridge the gap between strategy and execution. 
                We're not here to sell AI dreams—we're here to build systems that actually 
                run your business.
              </p>
              <p className="text-muted-foreground">
                Founded by Ansan Rai, BridgeFlow is built on the belief that automation 
                isn't about tools. It's about accountability, flow, and execution.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 bg-card border-card-border glow-primary">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <blockquote className="text-2xl font-medium mb-6 leading-relaxed">
                  "If it doesn't run without me, it's not a system."
                </blockquote>
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="font-bold text-primary">AR</span>
                  </motion.div>
                  <div>
                    <div className="font-medium">Ansan Rai</div>
                    <div className="text-sm text-muted-foreground">Founder, BridgeFlow Agency</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </GradientBackground>

      <GradientBackground variant="section" className="py-20 lg:py-28 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our core values
            </h2>
            <p className="text-lg text-muted-foreground">
              These aren't aspirational statements. They're the principles we apply 
              to every project, every day.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <Card 
                  className="p-6 bg-card border-card-border h-full"
                  data-testid={`card-value-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--accent) / 0.2)" }}
                    >
                      <value.icon className="w-6 h-6 text-accent" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </GradientBackground>

      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why BridgeFlow is different
            </h2>
            <p className="text-lg text-muted-foreground">
              We're not another automation agency. Here's what sets us apart 
              from generic services.
            </p>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <Badge className="bg-accent text-accent-foreground">BridgeFlow</Badge>
              </div>
              <div className="text-center">
                <Badge variant="secondary">Generic Agencies</Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              {differentiators.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`differentiator-row-${index}`}
                >
                  <Card className="p-4 bg-accent/5 border-accent/20">
                    <p className="text-sm">{item.us}</p>
                  </Card>
                  <Card className="p-4 bg-muted/50 border-border">
                    <p className="text-sm text-muted-foreground">{item.them}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GradientBackground variant="section" className="py-20 lg:py-28 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Vision & Roadmap
            </h2>
            <p className="text-lg text-muted-foreground">
              BridgeFlow is building toward a future where operational excellence 
              is accessible to every business.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map((item, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <Card 
                  className={`p-6 h-full ${index === 0 ? 'bg-primary/5 border-primary/20' : 'bg-card border-card-border'}`}
                  data-testid={`card-timeline-${index}`}
                >
                  <Badge variant={index === 0 ? "default" : "secondary"} className="mb-4">
                    {item.phase}
                  </Badge>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </AnimatedCard>
            ))}
          </div>
          
          <AnimatedSection delay={0.3} className="mt-12 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Agency work validates features, use cases, and pricing—creating a natural 
              migration path from custom services to scalable products.
            </p>
          </AnimatedSection>
        </div>
      </GradientBackground>

      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our commitment
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Target, title: "Solve Real Pain", description: "We focus on operational challenges that actually matter to your business." },
              { icon: Lightbulb, title: "Create Leverage", description: "Systems that multiply your team's capacity, not just automate tasks." },
              { icon: Shield, title: "Build Assets", description: "Turn AI into a business asset, not a toy or experiment." },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="text-center">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                  data-testid={`commitment-${index}`}
                >
                  <item.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <GradientBackground variant="cta" className="py-20 lg:py-28 border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Let's build something that works
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you value execution over promises and want automation systems 
              built with engineering discipline, let's talk.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" data-testid="button-about-cta">
                  Start a Conversation
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
