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
  Zap,
  Sparkles,
  Clock,
  Shield,
  TrendingUp,
  Users,
  Home,
  Bot,
  MessageSquare
} from "lucide-react";
import { ROICalculator } from "@/components/roi-calculator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Beta Launch Offer - The Deal Closer
const betaOffer = {
  setupPrice: 499,
  originalPrice: 1500,
  monthlyPrice: 299,
  features: [
    "24/7 AI Lead Response System",
    "Instant SMS & Email Follow-up",
    "GoHighLevel CRM Integration",
    "Lead Scoring & Prioritization",
    "Automated Appointment Booking",
    "Custom Response Scripting",
    "Performance Dashboard",
    "Dedicated Onboarding Call"
  ],
  guarantee: "3-Day Risk-Free Trial: If our AI doesn't catch a lead you would have missed, you pay nothing."
};

// Full Pricing Tiers (Real Estate Focused)
const pricingTiers = [
  {
    id: "speed-to-lead",
    name: "Speed-to-Lead Audit",
    tagline: "Know your gaps",
    price: "$497",
    priceNote: "one-time",
    icon: Search,
    description: "Discover exactly where you're losing leads and get a custom automation blueprint.",
    features: [
      "Response Time Analysis",
      "Lead Source Audit",
      "Follow-up Gap Assessment",
      "CRM Health Check",
      "Priority Action Plan",
      "ROI Projections",
    ],
    cta: "Get My Audit",
    popular: false,
    forWhom: "Solo Agents",
  },
  {
    id: "realtor-os",
    name: "Realtor OS",
    tagline: "Your complete system",
    price: "$2,497",
    priceNote: "one-time setup",
    icon: Home,
    description: "The Ultimate Realtor Operating System. CRM + AI Follow-up + Lead Database, fully automated.",
    features: [
      "Full GHL CRM Setup",
      "AI Conversation Bot",
      "Automated Drip Campaigns",
      "Appointment Scheduler",
      "Lead Nurturing Sequences",
      "Pipeline Automation",
      "Training & Documentation",
      "30-Day Support Included",
    ],
    cta: "Get Realtor OS",
    popular: true,
    forWhom: "Serious Agents",
  },
  {
    id: "brokerage",
    name: "Brokerage Build",
    tagline: "Scale your team",
    price: "$5,000+",
    priceNote: "custom project",
    icon: Users,
    description: "Custom automation systems for teams of 10+ agents. Full integration with your existing stack.",
    features: [
      "Multi-Agent CRM Setup",
      "Team Lead Distribution",
      "Agent Performance Tracking",
      "Custom API Integrations",
      "White-Label Options",
      "Priority Support SLA",
      "Quarterly Strategy Reviews",
      "Dedicated Account Manager",
    ],
    cta: "Schedule Consultation",
    popular: false,
    forWhom: "Brokerages & Teams",
  },
  {
    id: "retainer",
    name: "Growth Partner",
    tagline: "Ongoing optimization",
    price: "$499",
    priceNote: "per month",
    icon: RefreshCw,
    description: "Keep your systems running at peak performance while we continuously optimize for better results.",
    features: [
      "24/7 System Monitoring",
      "Monthly Optimization Sprints",
      "AI Response Tuning",
      "New Campaign Creation",
      "Performance Reports",
      "Priority Support Access",
      "99%+ Uptime Guarantee",
      "Cancel Anytime",
    ],
    cta: "Become a Partner",
    popular: false,
    forWhom: "Active Agents",
  },
];

const faqs = [
  {
    question: "What if I already have a CRM?",
    answer: "No problem! We work with GoHighLevel (GHL), but can also integrate with your existing CRM like Follow Up Boss, kvCORE, or BoomTown. During your audit, we'll assess the best approach.",
  },
  {
    question: "How quickly will I see results?",
    answer: "Most agents see their first AI-handled lead within 24-48 hours of going live. The system starts working immediately, responding to leads while you sleep.",
  },
  {
    question: "What's included in the $299/month retainer?",
    answer: "This covers 24/7 AI lead monitoring, GHL hosting costs, system maintenance, and priority support. It's less than the cost of one Zillow Premier Agent lead, but manages ALL your leads.",
  },
  {
    question: "Do I need to be tech-savvy?",
    answer: "Not at all. We handle all the technical setup. You'll receive a simple dashboard to monitor your leads and a training session to understand the system. Most agents are comfortable within the first week.",
  },
  {
    question: "What if the automation doesn't work for me?",
    answer: "We offer a 3-day risk-free trial. If our AI doesn't catch a lead you would have missed, you pay nothing for the setup. We're confident because we've seen the results.",
  },
  {
    question: "Can I upgrade or downgrade later?",
    answer: "Absolutely. Many agents start with the Beta Offer, then upgrade to the full Realtor OS once they see results. Your initial investment applies toward any upgrade.",
  },
];

import PageTransition from "@/components/page-transition";

export default function Pricing() {
  useSEO({
    title: "Pricing for Real Estate Agents",
    description: "AI-powered lead response for Realtors. Setup for $499, managed for $299/month. Never miss another lead. 3-day risk-free trial.",
  });

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Hero Section with Beta Offer */}
        <GradientBackground variant="hero" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
                  🚀 Beta Launch Offer — Limited Spots
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                  Stop Losing Leads{" "}
                  <span className="text-gradient-animated">While You Sleep</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Our AI responds to your leads in under 60 seconds, 24/7. Book more appointments. Close more deals. Never miss another opportunity.
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {[
                    { icon: Clock, text: "< 60s Response" },
                    { icon: Bot, text: "24/7 AI Active" },
                    { icon: Shield, text: "Risk-Free Trial" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="w-4 h-4 text-primary" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* The Hook */}
                <Card className="p-4 bg-accent/10 border-accent/30 mb-6">
                  <p className="text-sm font-medium text-accent flex items-start gap-2">
                    <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{betaOffer.guarantee}</span>
                  </p>
                </Card>
              </motion.div>

              {/* Right: Beta Pricing Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-8 bg-card border-primary/30 ring-2 ring-primary/20 shadow-2xl shadow-primary/10 relative overflow-hidden" data-testid="card-beta-offer">
                  {/* Glow Effect */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />

                  <div className="relative">
                    <Badge className="mb-4 bg-primary text-primary-foreground animate-pulse-glow">
                      Best Value for Solo Agents
                    </Badge>

                    <h3 className="text-2xl font-bold mb-2">AI Lead Response System</h3>
                    <p className="text-muted-foreground mb-6">Everything you need to capture and convert more leads, automatically.</p>

                    {/* Pricing */}
                    <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-4xl font-bold text-primary">${betaOffer.setupPrice}</span>
                        <span className="text-lg text-muted-foreground line-through">${betaOffer.originalPrice}</span>
                        <Badge variant="outline" className="text-green-400 border-green-400/30">Save 67%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">One-time setup fee</p>

                      <div className="mt-4 pt-4 border-t border-primary/10">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">${betaOffer.monthlyPrice}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        <p className="text-sm text-muted-foreground">24/7 AI monitoring + GHL hosting</p>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {betaOffer.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-3 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link href="/contact">
                      <Button size="lg" className="w-full gap-2 button-cta text-lg py-6" data-testid="button-beta-cta">
                        Claim Your Beta Spot
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>

                    <p className="text-center text-xs text-muted-foreground mt-4">
                      <MessageSquare className="w-3 h-3 inline mr-1" />
                      We'll reach out within 2 hours to schedule your setup call
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </GradientBackground>

        {/* Why This Works Section */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Why Realtors Choose Us</Badge>
              <h2 className="text-3xl font-bold mb-4">Less Than One Zillow Lead. Manages All Your Leads.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                At $299/month, you're paying less than the cost of a single lead-gen service — but getting 24/7 coverage for every lead source you have.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: "Speed Wins Deals",
                  description: "Studies show responding in under 5 minutes makes you 100x more likely to connect. Our AI responds in under 60 seconds."
                },
                {
                  icon: TrendingUp,
                  title: "More Appointments",
                  description: "Automated follow-up ensures no lead falls through the cracks. Average agents see 40% more booked appointments."
                },
                {
                  icon: Shield,
                  title: "Zero Risk",
                  description: "Our 3-day trial proves the value before you commit. If it doesn't work, you don't pay. Simple as that."
                },
              ].map((item, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <Card className="p-6 text-center h-full bg-card border-card-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Full Pricing Tiers */}
        <section className="py-20 lg:py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <AnimatedSection className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Full Service Menu</Badge>
              <h2 className="text-3xl font-bold mb-4">Solutions for Every Stage of Your Business</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're a solo agent or running a brokerage, we have a solution that fits.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier, index) => (
                <AnimatedCard key={tier.id} delay={index * 0.1}>
                  <Card
                    className={`p-6 h-full flex flex-col card-glow ${tier.popular
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

                    <div className="mb-2">
                      <span className="text-xs text-accent font-medium">{tier.forWhom}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${tier.popular ? "bg-primary/20" : "bg-primary/10"
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
                        className="w-full button-cta"
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

        {/* Value Guarantee */}
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
                { title: "Full Ownership", description: "You own everything we build. No vendor lock-in, no hidden platform fees." },
                { title: "White-Glove Setup", description: "We handle everything technical. You just focus on selling homes." },
                { title: "Ongoing Support", description: "30 days of post-launch support included with every setup. We're here to help." },
              ].map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.1} className="text-center">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </GradientBackground>

        {/* ROI Calculator Section */}
        <section className="py-20 lg:py-28 relative bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Value Discovery</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Calculate Your Automation ROI</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See exactly how much revenue you're leaving on the table with slow lead response times.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <ROICalculator />
            </AnimatedSection>
          </div>
        </section>

        {/* Lead Magnet Section */}
        <section className="py-12 bg-primary/5 border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Free Resource</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Not ready for automation yet?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Download our <strong>Realtor Speed-to-Lead Checklist</strong>. Learn the 5 critical response time mistakes that cost agents deals — and how to fix them today.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Response Time Benchmarks", "Lead Source Prioritization", "Follow-up Sequence Templates"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="p-8 bg-card border-card-border shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FileCode2 className="w-24 h-24" />
                  </div>
                  <h3 className="text-xl font-bold mb-6">Get the Free Checklist</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <Input id="email" type="email" placeholder="you@realestate.com" className="bg-background" />
                    </div>
                    <Button className="w-full gap-2">
                      Send Me the Checklist
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground italic">
                      No spam. Just actionable tips to close more deals.
                    </p>
                  </form>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Final CTA */}
        <GradientBackground variant="cta" className="py-20 lg:py-28 border-t border-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
                Limited Beta Spots Available
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Never Miss a Lead Again?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the beta at $499 setup + $299/month. Start converting leads while your competition sleeps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/contact">
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 text-lg px-8 py-6" data-testid="button-pricing-cta">
                      Claim Your Beta Spot
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
                <p className="text-sm text-muted-foreground">
                  or <Link href="/demos" className="text-primary hover:underline">see our automation demos →</Link>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </GradientBackground>
      </div>
    </PageTransition>
  );
}
