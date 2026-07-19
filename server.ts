import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// ES modules support for dirname/filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const RESUME_CONTEXT = `
Name: ADIKA KARTHIK
Title: Electrical & Electronics Engineering Student | Software Developer | Embedded Systems Enthusiast | AI & IoT Innovator
Location: Chinnagerigapalli, Ramakuppam Mandal, Chittoor District, Andhra Pradesh, India
Email: adika63916@gmail.com
Phone: +91 9121769735
Gender: Male
Nationality: Indian

SUMMARY:
Electrical and Electronics Engineering student with a strong interest in software development, embedded systems, artificial intelligence, IoT, and automation. Passionate about designing innovative solutions that solve real-world problems through technology. Experienced in developing academic and personal projects across electrical engineering and software domains, with a focus on continuous learning and practical implementation. Self-motivated, creative, and adaptable, with strong problem-solving abilities and a commitment to building impactful solutions in areas such as renewable energy, smart agriculture, educational technology, entrepreneurship, and sustainable engineering. Seeking opportunities to apply technical knowledge, contribute to meaningful projects, and grow as an engineer and innovator.

SKILLS:
- Programming Languages: C, C++, Python, Java, HTML, CSS, JavaScript
- Embedded & Hardware: Arduino, ESP32, Raspberry Pi, Microcontrollers, Electrical Machines, Power Electronics, Control Systems, Basic Power Systems
- Systems & Automation: Sensor Integration, Smart Automation, IoT System Development, ROS 2 (Robot Operating System)
- Simulation & CAD Tools: MATLAB, Simulink, Wokwi, AutoCAD (Basic)
- Version Control: Git, GitHub
- Databases/Cloud: Firebase

LANGUAGES:
- Telugu (Native)
- English (Professional)
- Hindi (Conversational)
- Kannada (Conversational)

PROFESSIONAL EXPERIENCE:
Project Developer | Academic & Personal Projects (2026 – Present)
- Designed and developed academic and personal engineering projects in Electrical and Electronics Engineering, IoT, Embedded Systems, and Software Development.
- Built automation and smart system prototypes using Arduino, ESP32, Raspberry Pi, sensors, and microcontrollers.
- Applied programming concepts using C, C++, Python, HTML, CSS, JavaScript, and Firebase to develop software solutions.
- Collaborated with team members on project planning, implementation, testing, and documentation.
- Continuously researched emerging technologies, including Artificial Intelligence, Renewable Energy, Smart Agriculture, and Electric Vehicle systems.

PROJECTS:
1. AI-Based Smart Irrigation System
   - Technologies: ESP32, Soil Moisture Sensor, IoT, OLED Display, Weather API
   - Details: Developed an intelligent irrigation system that monitors soil moisture and automates watering to optimize water usage. Integrated real-time sensor monitoring with IoT-based control for efficient irrigation. Improved resource utilization through data-driven irrigation decisions.

2. AI-Based Smart Traffic Signal System
   - Technologies: ESP32, IR Sensors, RFID, OLED Display, Embedded C
   - Details: Designed a smart traffic management system capable of dynamically adjusting signal timings based on vehicle density. Implemented emergency vehicle priority using RFID-based detection. Enhanced traffic efficiency through intelligent signal automation.

3. Autonomous Surveillance Robot
   - Technologies: Raspberry Pi, Camera Module, ESP32, ROS 2, Python
   - Details: Designed and developed an autonomous robotic platform for navigation and environmental monitoring. Integrated computer vision techniques for object detection and real-time monitoring. Implemented remote monitoring and sensor-based autonomous movement.

4. Smart Solar EV Charging Station
   - Technologies: Solar Energy, IoT, Embedded Systems
   - Details: Conceptualized a smart EV charging station integrating solar power generation and intelligent energy management. Designed features including smart parking, energy monitoring, and charging optimization. Focused on renewable energy utilization and sustainable transportation.

5. IoT-Based Home Automation System
   - Technologies: ESP32, IoT, Firebase, Mobile Application
   - Details: Developed a home automation solution enabling remote control of electrical appliances. Implemented real-time monitoring and device management through IoT connectivity. Improved convenience and energy efficiency using smart automation.

6. Personal Portfolio Website
   - Technologies: React.js, Next.js, Tailwind CSS, Framer Motion
   - Details: Developed a responsive personal portfolio showcasing technical skills, projects, and achievements. Designed a modern user interface with animations, dark/light mode, and optimized performance. Deployed with SEO optimization and mobile-first design principles.

INTERESTS:
- Research & Innovation
- Entrepreneurship & Startup Development
- Smart Agriculture & Precision Farming
- Robotics & Automation

PUBLICATIONS:
- No publications yet. Currently working on innovative engineering projects and research with the goal of publishing in peer-reviewed journals and conferences.
`;

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemInstruction = `You are "Adika's AI Portfolio Assistant", an elite, professional chatbot on Adika Karthik's premium personal portfolio website.
Your job is to answer questions from recruiters, hiring managers, and visitors about Adika's background, skills, experience, projects, education, and interests.
Always refer to the following resume information to answer accurately and with utmost truthfulness. Do not make up information that is not in the resume.

${RESUME_CONTEXT}

Personality & Guidelines:
- Be highly professional, polite, warm, and helpful. Speak with the poise of an executive recruiter.
- Keep responses concise, clear, and highly scannable (use brief bullet points where appropriate).
- Avoid dry or overly robotic answers. Speak enthusiastically about Adika's potential as an Electrical & Electronics student, software developer, and innovator!
- If the user asks for Adika's contact details, provide his email (adika63916@gmail.com) and phone (+91 9121769735) clearly and professionally.
- If asked a question that is outside the scope of his resume or professional background, politely steer the conversation back to Adika's expertise and projects. E.g., "I don't have information on that, but I can tell you all about Adika's AI-Based Smart Irrigation System or his skills in embedded systems and Python!"`;

    // Map client-side message history to Gemini format if provided
    const contents = history.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "I apologize, but I was unable to generate a response. Please try asking again.";
    res.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({
      error: "Failed to communicate with AI Assistant",
      details: error.message
    });
  }
});

// Mock database path for contact submissions
const CONTACT_DB_FILE = path.join(__dirname, "contacts.json");

app.post("/api/contact", (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || "No Subject",
      message,
      timestamp: new Date().toISOString(),
    };

    let contacts = [];
    if (fs.existsSync(CONTACT_DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(CONTACT_DB_FILE, "utf-8");
        contacts = JSON.parse(fileContent);
      } catch (e) {
        contacts = [];
      }
    }

    contacts.push(newContact);
    fs.writeFileSync(CONTACT_DB_FILE, JSON.stringify(contacts, null, 2));

    res.json({ success: true, message: "Thank you! Your message has been saved successfully. Adika will get back to you soon." });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    res.status(500).json({ error: "Failed to save contact message", details: error.message });
  }
});

// Vite server middleware or static assets serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite only in development to prevent bundling/import issues in production
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production build from dist/.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
