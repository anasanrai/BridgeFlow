import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useSEO } from "@/hooks/use-seo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GradientBackground } from "@/components/gradient-background";
import { AnimatedSection } from "@/components/animated-section";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import {
  CheckCircle2,
  Clock,
  FileCheck,
  MessageSquare,
  Loader2,
  Sparkles
} from "lucide-react";
import PageTransition from "@/components/page-transition";
import confetti from "canvas-confetti";

const interestOptions = [
  { value: "lead-automation", label: "Lead Response Automation" },
  { value: "ai-agents", label: "AI Agents (Support, Sales, Ops)" },
  { value: "crm-automation", label: "CRM & Pipeline Automation" },
  { value: "full-system", label: "Full System Build" },
  { value: "consultation", label: "Just want a consultation" },
];

const budgetOptions = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 - $3,000" },
  { value: "3k-5k", label: "$3,000 - $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-plus", label: "$10,000+" },
];

const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone Call" },
  { value: "sms", label: "SMS / Text" },
  { value: "whatsapp", label: "WhatsApp" },
];

const bestTimeOptions = [
  { value: "morning", label: "Morning (9am - 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
  { value: "evening", label: "Evening (5pm - 8pm)" },
  { value: "anytime", label: "Anytime" },
];

const expectations = [
  {
    icon: Clock,
    title: "Response Time",
    description: "We respond within 24 hours.",
  },
  {
    icon: FileCheck,
    title: "What to Expect",
    description: "A free audit call to understand your needs.",
  },
  {
    icon: MessageSquare,
    title: "No Pressure",
    description: "No obligation. You'll get a free automation map.",
  },
];

export default function Contact() {
  useSEO({
    title: "Contact",
    description: "Book your free automation audit. Tell us about your business and get a custom automation map—no obligation.",
  });

  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      interest: undefined,
      budgetRange: undefined,
      contactMethod: undefined,
      bestTime: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#10b981', '#f59e0b']
      });
      toast({
        title: "Request received!",
        description: "We'll be in touch within 24 hours.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-24">
          <GradientBackground variant="hero" className="py-16 lg:py-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                Thank you for reaching out!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted-foreground mb-8"
              >
                We've received your request and will be in touch within 24 hours.
                Keep an eye on your inbox for our response.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6 bg-card border-card-border text-left">
                  <h3 className="font-medium mb-4">What happens next?</h3>
                  <ol className="space-y-3">
                    {[
                      "We review your submission and prepare for your call.",
                      "You'll receive a calendar link to book your free audit.",
                      "On the call, we'll map out your automation opportunities.",
                    ].map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </Card>
              </motion.div>
            </div>
          </GradientBackground>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <GradientBackground variant="hero" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="outline" className="mb-4 gap-2">
                  <Sparkles className="w-3 h-3" />
                  Free Consultation
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                  Book Your Free{" "}
                  <span className="text-gradient-animated">Automation Audit</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Tell us about your business and we'll create a custom automation
                  map—whether or not you work with us. No obligation.
                </p>
                <Badge variant="outline" className="mb-8">
                  ⚡ We typically respond within 24 hours
                </Badge>

                <div className="space-y-6 mb-8">
                  {expectations.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      data-testid={`expectation-${index}`}
                    >
                      <motion.div
                        className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <item.icon className="w-5 h-5 text-accent" />
                      </motion.div>
                      <div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-6 sm:p-8 bg-card border-card-border card-glow relative overflow-visible">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="First Name"
                                  {...field}
                                  data-testid="input-first-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Last Name"
                                  {...field}
                                  data-testid="input-last-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone *</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Phone Number"
                                {...field}
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Email Address"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="interest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What are you looking for? *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-interest">
                                  <SelectValue placeholder="What are you looking to do?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {interestOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    data-testid={`option-interest-${option.value}`}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budgetRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Range *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-budget">
                                  <SelectValue placeholder="Your Budget Range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    data-testid={`option-budget-${option.value}`}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Contact Method *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-contact-method">
                                  <SelectValue placeholder="How should we contact you?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {contactMethodOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    data-testid={`option-contact-${option.value}`}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bestTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Best Time to Contact *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-best-time">
                                  <SelectValue placeholder="Best Time to Reach You" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {bestTimeOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    data-testid={`option-time-${option.value}`}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button
                          type="submit"
                          className="w-full h-12 text-base button-cta"
                          disabled={mutation.isPending}
                          data-testid="button-contact-submit"
                        >
                          {mutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Get Started"
                          )}
                        </Button>
                      </motion.div>

                      <p className="text-xs text-muted-foreground text-center">
                        <Link href="/privacy-policy" className="text-primary hover:underline" data-testid="link-contact-privacy">Privacy Policy</Link>
                        {" | "}
                        <Link href="/terms-of-service" className="text-primary hover:underline" data-testid="link-contact-terms">Terms of Service</Link>
                      </p>
                    </form>
                  </Form>
                </Card>
              </motion.div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </PageTransition>
  );
}
