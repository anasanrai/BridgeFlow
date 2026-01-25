import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Search,
  FileCode2,
  Boxes,
  RefreshCw,
  Workflow,
  Bot,
  Users,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Building2,
  Briefcase,
  User
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

export default function Solutions() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4">Solutions</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Automation systems built for{" "}
              <span className="text-gradient">real operations</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Not feature lists. Not tool demos. Solutions designed around your 
              business outcomes—from discovery to deployment to ongoing optimization.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium mb-8 text-center text-muted-foreground">Who we work with</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetCustomers.map((customer, index) => (
              <Card 
                key={index} 
                className="p-6 bg-card border-card-border"
                data-testid={`card-customer-${index}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <customer.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{customer.title}</h3>
                    <p className="text-sm text-muted-foreground">{customer.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {serviceCategories.map((category, categoryIndex) => (
              <div 
                key={category.id} 
                id={category.id}
                className="scroll-mt-24"
                data-testid={`section-${category.id}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div>
                    <Badge variant="secondary" className="mb-4">{category.badge}</Badge>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-primary" />
                      </div>
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
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium">{service.name}</h5>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Card className="p-6 bg-card border-card-border">
                    <h4 className="font-medium mb-4">Expected Outcomes</h4>
                    <ul className="space-y-3">
                      {category.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{outcome}</span>
                        </li>
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
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary/5 border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Not sure which solution fits?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with a workflow audit. We'll analyze your operations and recommend 
            the right approach based on your specific situation and goals.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-solutions-cta">
              Book a System Audit
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
