import { Link } from "wouter";
import { Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/solutions", label: "Solutions" },
    { href: "/how-it-works", label: "How It Works" },
  ],
  resources: [
    { href: "/contact", label: "Contact" },
    { href: "/contact", label: "Book Consultation" },
  ],
};

export function Footer() {
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

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
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
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BridgeFlow Agency. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Founded by Ansan Rai
          </p>
        </div>
      </div>
    </footer>
  );
}
