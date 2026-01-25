import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Mail, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  MessageSquare,
  Loader2
} from "lucide-react";

const businessSizeOptions = [
  { value: "solo", label: "Solo / Freelancer" },
  { value: "2-10", label: "2-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "50+", label: "50+ employees" },
];

const expectations = [
  {
    icon: Clock,
    title: "Response Time",
    description: "We respond within 24-48 hours on business days.",
  },
  {
    icon: FileCheck,
    title: "What to Expect",
    description: "A brief discovery call to understand your needs and determine fit.",
  },
  {
    icon: MessageSquare,
    title: "No Obligation",
    description: "Exploratory conversations are always free. No pressure, no sales tactics.",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      businessSize: undefined,
      operationalPain: "",
      goals: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message sent",
        description: "We'll be in touch within 24-48 hours.",
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
              Thank you for reaching out
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8"
            >
              We've received your message and will be in touch within 24-48 hours. 
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
                    "We review your submission and assess the fit.",
                    "You'll receive an email with next steps or a link to schedule a discovery call.",
                    "On the call, we'll discuss your operations and explore potential solutions.",
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
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <GradientBackground variant="hero" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">Contact</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Let's discuss your{" "}
                <span className="text-gradient">automation needs</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                This is a premium, execution-focused service. Tell us about your 
                operations, challenges, and goals—and we'll determine if BridgeFlow 
                is the right fit.
              </p>
              
              <div className="space-y-6 mb-8">
                {expectations.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    data-testid={`expectation-${index}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="flex items-center gap-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Mail className="w-5 h-5" />
                <span>Or email directly: </span>
                <a 
                  href="mailto:hello@bridgeflow.agency" 
                  className="text-foreground hover:text-primary transition-colors"
                  data-testid="link-email-direct"
                >
                  hello@bridgeflow.agency
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 sm:p-8 bg-card border-card-border">
                <h2 className="text-xl font-semibold mb-6">Request a Consultation</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field} 
                                data-testid="input-name"
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
                                placeholder="you@company.com" 
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Company name" 
                                {...field}
                                value={field.value || ""}
                                data-testid="input-company"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="businessSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Size *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-business-size">
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {businessSizeOptions.map((option) => (
                                  <SelectItem 
                                    key={option.value} 
                                    value={option.value}
                                    data-testid={`option-${option.value}`}
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
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="operationalPain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Operational Challenges *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What manual processes, workflow bottlenecks, or tool integration issues are you facing?"
                              className="min-h-[100px] resize-none"
                              {...field}
                              data-testid="textarea-pain"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Automation Goals *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What outcomes are you hoping to achieve? Time savings, reduced errors, faster response times?"
                              className="min-h-[100px] resize-none"
                              {...field}
                              data-testid="textarea-goals"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Context</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Anything else you'd like us to know?"
                              className="min-h-[80px] resize-none"
                              {...field}
                              value={field.value || ""}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full shadow-lg shadow-primary/20"
                        disabled={mutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {mutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </motion.div>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting, you agree to a brief discovery conversation. 
                      No spam, no pressure.
                    </p>
                  </form>
                </Form>
              </Card>
            </motion.div>
          </div>
        </div>
      </GradientBackground>
    </div>
  );
}
