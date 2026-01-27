import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GradientBackground } from "@/components/gradient-background";
import { useSEO } from "@/hooks/use-seo";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Homepage", icon: Home },
  { href: "/solutions", label: "Our Solutions", icon: Search },
  { href: "/contact", label: "Contact Us", icon: Mail },
];

export default function NotFound() {
  useSEO({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist. Let us help you find what you need.",
  });

  return (
    <div className="min-h-screen pt-24">
      <GradientBackground variant="hero" className="py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-8xl font-bold text-gradient">404</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Page Not Found
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground mb-8"
          >
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-card border-card-border">
              <h3 className="font-medium mb-4 text-left">Quick Links</h3>
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link href={link.href}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3"
                        data-testid={`link-404-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Link href="/">
              <Button size="lg" className="gap-2" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
                Back to Homepage
              </Button>
            </Link>
          </motion.div>
        </div>
      </GradientBackground>
    </div>
  );
}
