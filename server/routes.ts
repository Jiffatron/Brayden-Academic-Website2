import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for handling contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      
      // In a real scenario, we would save this to a database or send an email
      // For now, just return a success response
      return res.status(200).json({ message: 'Message received successfully' });
    } catch (error) {
      console.error('Error handling contact form submission:', error);
      return res.status(500).json({ message: 'Server error, please try again later' });
    }
  });

  // Resume download API endpoint
  app.get('/api/resume', (req, res) => {
    // In a real implementation this would send the actual PDF file
    // For now, we'll just simulate a response
    res.status(200).json({ message: 'Resume download endpoint' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
