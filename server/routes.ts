import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // API route for handling contact form submissions
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
          errors: {
            name: !name ? 'Name is required' : null,
            email: !email ? 'Email is required' : null,
            message: !message ? 'Message is required' : null
          }
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
          errors: { email: 'Please enter a valid email address' }
        });
      }

      // Validate message length
      if (message.length < 10) {
        return res.status(400).json({
          success: false,
          message: 'Message too short',
          errors: { message: 'Message must be at least 10 characters long' }
        });
      }

      if (message.length > 1000) {
        return res.status(400).json({
          success: false,
          message: 'Message too long',
          errors: { message: 'Message must be less than 1000 characters' }
        });
      }

      // Log the contact form submission (in production, you'd save to database)
      console.log('Contact form submission:', {
        name: name.substring(0, 50), // Truncate for logging
        email: email.substring(0, 50),
        message: message.substring(0, 100),
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress
      });

      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
        data: { submitted: true }
      });
    } catch (error) {
      console.error('Error handling contact form submission:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error, please try again later'
      });
    }
  });

  // Resume download API endpoint
  app.get('/api/resume', (req: Request, res: Response) => {
    try {
      const resumePath = path.join(__dirname, '../client/public/resume.pdf');

      // Check if file exists before attempting download
      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({
          success: false,
          message: 'Resume not found'
        });
      }

      // Set proper headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Brayden_Resume.pdf"');

      res.download(resumePath, 'Brayden_Resume.pdf', (err) => {
        if (err) {
          console.error('Error downloading resume:', err);
          if (!res.headersSent) {
            res.status(500).json({
              success: false,
              message: 'Error downloading resume'
            });
          }
        }
      });
    } catch (error) {
      console.error('Error serving resume:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  });

  // API endpoint to get basic portfolio stats (could be expanded)
  app.get('/api/stats', (req: Request, res: Response) => {
    try {
      const stats = {
        projectsCount: 4, // Based on your portfolio
        yearsExperience: new Date().getFullYear() - 2020, // Adjust as needed
        technologiesUsed: ['React', 'TypeScript', 'Python', 'Node.js', 'Express'],
        lastUpdated: new Date().toISOString()
      };

      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching portfolio statistics'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
