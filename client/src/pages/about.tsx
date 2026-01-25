import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
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
            </div>
            
            <Card className="p-8 bg-card border-card-border glow-primary">
              <Quote className="w-10 h-10 text-primary/30 mb-4" />
              <blockquote className="text-2xl font-medium mb-6 leading-relaxed">
                "If it doesn't run without me, it's not a system."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-bold text-primary">AR</span>
                </div>
                <div>
                  <div className="font-medium">Ansan Rai</div>
                  <div className="text-sm text-muted-foreground">Founder, BridgeFlow Agency</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our core values
            </h2>
            <p className="text-lg text-muted-foreground">
              These aren't aspirational statements. They're the principles we apply 
              to every project, every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="p-6 bg-card border-card-border hover-elevate"
                data-testid={`card-value-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why BridgeFlow is different
            </h2>
            <p className="text-lg text-muted-foreground">
              We're not another automation agency. Here's what sets us apart 
              from generic services.
            </p>
          </div>
          
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
                <div 
                  key={index} 
                  className="grid grid-cols-2 gap-4"
                  data-testid={`differentiator-row-${index}`}
                >
                  <Card className="p-4 bg-accent/5 border-accent/20">
                    <p className="text-sm">{item.us}</p>
                  </Card>
                  <Card className="p-4 bg-muted/50 border-border">
                    <p className="text-sm text-muted-foreground">{item.them}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Vision & Roadmap
            </h2>
            <p className="text-lg text-muted-foreground">
              BridgeFlow is building toward a future where operational excellence 
              is accessible to every business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map((item, index) => (
              <Card 
                key={index} 
                className={`p-6 ${index === 0 ? 'bg-primary/5 border-primary/20' : 'bg-card border-card-border'}`}
                data-testid={`card-timeline-${index}`}
              >
                <Badge variant={index === 0 ? "default" : "secondary"} className="mb-4">
                  {item.phase}
                </Badge>
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Agency work validates features, use cases, and pricing—creating a natural 
              migration path from custom services to scalable products.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our commitment
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center" data-testid="commitment-0">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Solve Real Pain</h3>
              <p className="text-sm text-muted-foreground">
                We focus on operational challenges that actually matter to your business.
              </p>
            </div>
            <div className="text-center" data-testid="commitment-1">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Create Leverage</h3>
              <p className="text-sm text-muted-foreground">
                Systems that multiply your team's capacity, not just automate tasks.
              </p>
            </div>
            <div className="text-center" data-testid="commitment-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Build Assets</h3>
              <p className="text-sm text-muted-foreground">
                Turn AI into a business asset, not a toy or experiment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary/5 border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let's build something that works
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you value execution over promises and want automation systems 
            built with engineering discipline, let's talk.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-about-cta">
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
