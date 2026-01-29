import { Link } from "wouter";
import { Mail, ArrowUpRight, Youtube, Linkedin, Twitter, Instagram, Facebook, Globe, Laptop } from "lucide-react";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/solutions", label: "Solutions" },
    { href: "/pricing", label: "Pricing" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "https://n8ngalaxy.com", label: "n8nGalaxy Platform" },
  ],
  resources: [
    { href: "/contact", label: "Contact" },
    { href: "/contact", label: "Book Free Audit" },
  ],
  social: [
    { href: "https://www.youtube.com/@BridgeFlowAgency", label: "YouTube", icon: Youtube, color: "text-[#FF0000]" },
    { href: "https://www.linkedin.com/company/bridgeflow-agency", label: "LinkedIn", icon: Linkedin, color: "text-[#0077B5]" },
    { href: "https://twitter.com/BridgeFlow", label: "X (Twitter)", icon: Twitter, color: "text-foreground hover:text-foreground/80" },
    { href: "https://instagram.com/bridgeflow.agency", label: "Instagram", icon: Instagram, color: "text-[#E1306C]" },
    { href: "https://m.me/bridgeflow", label: "Messenger", icon: Facebook, color: "text-[#0084FF]" },
  ],
  freelance: [
    { href: "https://www.upwork.com/agencies/bridgeflow", label: "Upwork", icon: Laptop, color: "text-[#14A800]" },
    { href: "https://www.fiverr.com/bridgeflow", label: "Fiverr", icon: Globe, color: "text-[#1DBF73]" },
  ]
};

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to subscribe");
      }

      toast({
        title: "Subscribed!",
        description: "You have successfully subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to subscribe",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4" data-testid="link-footer-logo">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              We design automation systems that actually run your business.
              Production-grade workflows with measurable ROI.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:hello@bridgeflow.agency"
                className="hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                hello@bridgeflow.agency
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-medium mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get the latest automation strategies.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-input focus:border-primary"
                required
              />
              <Button type="submit" className="w-full button-cta">
                Subscribe
              </Button>
            </form>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => {
                const isExternal = link.href.startsWith('http');
                const content = (
                  <>
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </>
                );
                const className = "text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group";
                const testId = `link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`;

                return (
                  <li key={link.href + link.label}>
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                        data-testid={testId}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={className}
                        data-testid={testId}
                      >
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Get Started</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={link.href + link.label + index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}-${index}`}
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link, index) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                    data-testid={`link-footer-social-${index}`}
                  >
                    <link.icon className={`w-4 h-4 ${link.color}`} />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all ml-auto" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Hire Us On</h4>
            <ul className="space-y-3">
              {footerLinks.freelance.map((link, index) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                    data-testid={`link-footer-freelance-${index}`}
                  >
                    <link.icon className={`w-4 h-4 ${link.color}`} />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all ml-auto" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} BridgeFlow Agency. All rights reserved.</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-border" />
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Founded by Ansan Rai
          </p>
        </div>
      </div>
    </footer>
  );
}
