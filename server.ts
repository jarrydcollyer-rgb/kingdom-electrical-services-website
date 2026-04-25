import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, phone, email, projectType, message } = req.body;

    // Check if we have credentials
    const hasCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

    if (!hasCredentials) {
      console.log("No email credentials found. Submission details:", req.body);
      return res.status(200).json({ 
        success: true, 
        message: "Submission received (Demo Mode: No email sent because credentials are missing)." 
      });
    }

    // Configure Nodemailer (Example using Gmail - you'll likely need an App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "JarrydCollyer@kingdomelectricalservices.com",
      subject: `New Inquiry: ${projectType} from ${name}`,
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Project Type: ${projectType}
        
        Message:
        ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
