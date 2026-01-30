import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendEmail } from "./email";

import { rateLimit } from "express-rate-limit";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message: { message: "Too many requests from this IP, please try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const result = insertNewsletterSchema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({
          message: validationError.toString()
        });
      }

      await storage.createNewsletterSubscriber(result.data);

      // Wire to n8n/GoHighLevel as requested
      // This hits the engine which tagging/automating the subscriber in GHL
      try {
        await fetch("https://n8n.n8ngalaxy.com/webhook/real-estate-demo-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: result.data.email,
            tag: "Newsletter",
            type: "newsletter_subscription",
            source: "website_footer"
          }),
        });
      } catch (e) {
        console.error("Failed to forward newsletter to GHL/n8n:", e);
        // We continue since we saved it to local storage
      }

      return res.status(201).json({
        message: "Subscribed successfully"
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      // Handle unique constraint error
      if (error instanceof Error && error.message.includes("unique")) {
        return res.status(409).json({
          message: "Email already subscribed"
        });
      }
      return res.status(500).json({
        message: "Failed to subscribe"
      });
    }
  });

  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({
          message: validationError.toString()
        });
      }

      const contact = await storage.createContactSubmission(result.data);

      // Send email notification
      const emailHtml = `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Interest:</strong> ${contact.interest}</p>
        <p><strong>Budget:</strong> ${contact.budgetRange}</p>
        <p><strong>Contact Method:</strong> ${contact.contactMethod}</p>
        <p><strong>Best Time:</strong> ${contact.bestTime}</p>
      `;

      await sendEmail(
        "hello@bridgeflow.agency",
        `New Lead: ${contact.firstName} ${contact.lastName}`,
        emailHtml
      );

      return res.status(201).json({
        message: "Contact submission received",
        id: contact.id
      });
    } catch (error) {
      console.error("Contact submission error:", error);
      return res.status(500).json({
        message: "Failed to submit contact form"
      });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.json(submissions);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({
        message: "Failed to fetch contact submissions"
      });
    }
  });

  return httpServer;
}
