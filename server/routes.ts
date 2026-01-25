import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: validationError.toString() 
        });
      }

      const contact = await storage.createContactSubmission(result.data);
      
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
