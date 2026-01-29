import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & { id: string };

export const insertContactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  interest: z.enum(["lead-automation", "ai-agents", "crm-automation", "full-system", "consultation"], {
    required_error: "Please select what you're looking for",
  }),
  budgetRange: z.enum(["under-1k", "1k-3k", "3k-5k", "5k-10k", "10k-plus"], {
    required_error: "Please select your budget range",
  }),
  contactMethod: z.enum(["email", "phone", "sms", "whatsapp"], {
    required_error: "Please select your preferred contact method",
  }),
  bestTime: z.enum(["morning", "afternoon", "evening", "anytime"], {
    required_error: "Please select the best time to reach you",
  }),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = InsertContact & {
  id: string;
  createdAt: Date;
};

export const insertNewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSubscriber = InsertNewsletter & {
  id: string;
  createdAt: Date;
};
