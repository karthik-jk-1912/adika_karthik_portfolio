export interface Project {
  id: string;
  title: string;
  category: "embedded" | "software" | "electrical" | "ai";
  technologies: string[];
  description: string;
  keyFeatures: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageSeed: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100 percentage
  category: "Programming" | "Hardware/Embedded" | "Automation/IoT" | "Simulation/Tools" | "General";
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string[];
  technologies?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
