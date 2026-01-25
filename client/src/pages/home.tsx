import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Zap, 
  GitBranch, 
  Database, 
  Bot, 
  Settings, 
  CheckCircle2,
  ArrowUpRight,
  Workflow,
  Shield,
  BarChart3,
  Layers
} from "lucide-react";

const problems = [
  {
    icon: Layers,
    title: "Fragmented Tools",
    description: "CRM, email, forms, AI, task management—all disconnected, creating data silos and manual work.",
  },
  {
    icon: GitBranch,
    title: "Manual Follow-ups",
    description: "Human dependency on repetitive tasks means dropped balls, missed opportunities, and inconsistent execution.",
  },
  {
    icon: Database,
    title: "No Single Source of Truth",
    description: "Information scattered across platforms makes decision-making slow and error-prone.",
  },
  {
    icon: Bot,
    title: "AI Without Execution",
    description: "Plenty of AI demos and hype, but no production-grade systems that actually run reliably.",
  },
];

const methodology = [
  {
    step: "01",
    title: "Discovery",
    description: "We audit your current operations, identify friction points, and map your workflow dependencies.",
  },
  {
    step: "02",
    title: "Design",
    description: "We architect a custom automation system aligned to your specific business processes and goals.",
  },
  {
    step: "03",
    title: "Deploy",
    description: "We build, test, and deploy production-grade systems with full documentation and training.",
  },
];

const solutions = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "n8n-based automation systems that connect your tools and eliminate manual processes.",
    features: ["Lead management", "Client onboarding", "Reporting automation"],
  },
  {
    icon: Bot,
    title: "AI Operations",
    description: "Intelligent agents for support, ops, sales, and research that work reliably at scale.",
    features: ["Customer support AI", "Sales assistants", "Research automation"],
  },
  {
    icon: Database,
    title: "CRM & Internal Ops",
    description: "Streamlined internal operations with proper data flows and automated handoffs.",
    features: ["Sales pipeline automation", "Team coordination", "Task management"],
  },
  {
    icon: Settings,
    title: "API Integrations",
    description: "Connect any platform—Supabase, Notion, Slack, WhatsApp, Stripe, and more.",
    features: ["Custom integrations", "Data synchronization", "Webhook orchestration"],
  },
];

const differentiators = [
  {
    icon: Zap,
    title: "Execution-First",
    description: "Not AI demos. Production systems that run your business.",
  },
  {
    icon: Shield,
    title: "System Ownership",
    description: "Documented, transferable workflows you fully own.",
  },
  {
    icon: BarChart3,
    title: "Measurable ROI",
    description: "Clear metrics on time saved and revenue impact.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI Automation & Workflow Engineering
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              We design automation systems that{" "}
              <span className="text-gradient">actually run</span>{" "}
              your business
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bridge the gap between strategy and execution with production-grade 
              workflows, intelligent AI agents, and systems built for operational reliability.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2" data-testid="button-hero-book-audit">
                  Book a System Audit
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="gap-2" data-testid="button-hero-learn-more">
                  See How It Works
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The operational reality most businesses face
            </h2>
            <p className="text-lg text-muted-foreground">
              Tools that don't talk to each other. AI promises that don't deliver. 
              Your team stuck in the middle, doing manual work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <Card 
                key={index} 
                className="p-6 hover-elevate bg-card border-card-border"
                data-testid={`card-problem-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <problem.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground">{problem.description}</p>
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
              The BridgeFlow methodology
            </h2>
            <p className="text-lg text-muted-foreground">
              A systematic approach to building automation systems that work. 
              No shortcuts. No guesswork. Just engineering discipline.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {methodology.map((step, index) => (
              <div 
                key={index} 
                className="relative"
                data-testid={`step-methodology-${index}`}
              >
                {index < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-border to-transparent" />
                )}
                <div className="relative bg-card border border-card-border rounded-lg p-6 hover-elevate">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{step.step}</div>
                  <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Core solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              Custom-designed, outcome-driven automation systems aligned to your business workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <Card 
                key={index} 
                className="p-6 hover-elevate bg-card border-card-border"
                data-testid={`card-solution-${index}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{solution.title}</h3>
                <p className="text-muted-foreground mb-4">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/solutions">
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-view-all-solutions">
                View All Solutions
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div 
                key={index} 
                className="text-center"
                data-testid={`differentiator-${index}`}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary/5 border-t border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to build systems that actually work?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a system audit to discover how automation can transform your operations. 
            No AI hype—just practical solutions with measurable impact.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-cta-book-audit">
              Request Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
