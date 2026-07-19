import { Project, Skill, TimelineItem } from "./types";

export const projectsData: Project[] = [
  {
    id: "smart-irrigation",
    title: "AI-Based Smart Irrigation System",
    category: "embedded",
    technologies: ["ESP32", "Soil Moisture Sensor", "IoT", "OLED Display", "Weather API"],
    description: "An intelligent, data-driven irrigation solution designed to monitor soil conditions in real time and automate water scheduling, maximizing agricultural water efficiency.",
    keyFeatures: [
      "Real-time soil moisture and environmental parameter logging.",
      "Automated watering system triggered by customized sensor thresholds.",
      "Weather API integration to predict rainfall and prevent redundant watering cycles.",
      "Dynamic OLED dashboard displaying live sensor data and system status."
    ],
    githubUrl: "https://github.com/adika-karthik",
    imageSeed: "irrigation-field"
  },
  {
    id: "traffic-signal",
    title: "AI-Based Smart Traffic Signal System",
    category: "ai",
    technologies: ["ESP32", "IR Sensors", "RFID", "OLED Display", "Embedded C"],
    description: "A dynamic, closed-loop urban traffic management prototype that optimizes light intervals based on real-time vehicle density and manages emergency vehicle routing.",
    keyFeatures: [
      "Dynamic traffic light timer adjustments using IR sensor density mapping.",
      "Emergency vehicle override priority enabled by integrated RFID scanners.",
      "Intelligent scheduling logic implemented in optimized Embedded C.",
      "Live traffic statistics shown on local display units."
    ],
    githubUrl: "https://github.com/adika-karthik",
    imageSeed: "city-traffic"
  },
  {
    id: "surveillance-robot",
    title: "Autonomous Surveillance Robot",
    category: "embedded",
    technologies: ["Raspberry Pi", "Camera Module", "ESP32", "ROS 2", "Python"],
    description: "A robust mobile robotics platform equipped for autonomous navigation, hazard scanning, and continuous security surveillance using onboard computer vision.",
    keyFeatures: [
      "Computer vision models for human/object detection and real-time tracking.",
      "Integrated ROS 2 navigation stacks for slam mapping and trajectory plotting.",
      "Web interface for remote teleoperation and live video feed streaming.",
      "Dual-controller setup (Raspberry Pi for processing + ESP32 for motor control)."
    ],
    githubUrl: "https://github.com/adika-karthik",
    imageSeed: "robotic-chassis"
  },
  {
    id: "solar-ev-charging",
    title: "Smart Solar EV Charging Station",
    category: "electrical",
    technologies: ["Solar Energy", "IoT", "Embedded Systems", "Microcontrollers"],
    description: "A microgrid-powered electric vehicle charging concept featuring intelligent load balancing, solar power tracking, and sustainable battery energy storage.",
    keyFeatures: [
      "Solar photovoltaic grid pairing with intelligent battery management.",
      "Dynamic load distribution tracking and localized charging prioritization.",
      "Integrated IoT analytics for daily energy yield and consumption patterns.",
      "Smart parking occupancy detection using ultrasonic sensors."
    ],
    githubUrl: "https://github.com/adika-karthik",
    imageSeed: "solar-charger"
  },
  {
    id: "home-automation",
    title: "IoT-Based Home Automation System",
    category: "embedded",
    technologies: ["ESP32", "IoT", "Firebase", "Mobile Application", "HTML/CSS/JS"],
    description: "A fully unified smart home ecosystem facilitating secure remote control, sensor telemetry, and automated schedules for electrical appliances.",
    keyFeatures: [
      "Bi-directional sync of appliance state via Firebase Realtime Database.",
      "Custom responsive mobile and web dashboard interfaces.",
      "Smart schedules and rule-based triggers linking sensors to relays.",
      "Hardware failsafes and local manual override capabilities."
    ],
    githubUrl: "https://github.com/adika-karthik",
    imageSeed: "smart-home"
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    category: "software",
    technologies: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    description: "This world-class, responsive portfolio. Built to mirror modern Awwwards designs with a luxury aesthetic, fluid motion layouts, interactive PDF resume compiler, and integrated AI assistant.",
    keyFeatures: [
      "Full dark-theme by default with a fluid luxury glassmorphism layout.",
      "Interactive AI Agent proxying Gemini API to query Adika's resume.",
      "On-the-fly customized client-side PDF compiler (jsPDF).",
      "Interactive circuit canvas particle systems and typing animation engines."
    ],
    githubUrl: "https://github.com/adika-karthik",
    imageSeed: "abstract-portfolio"
  }
];

export const skillsData: Skill[] = [
  // Programming Languages
  { name: "C", level: 90, category: "Programming" },
  { name: "C++", level: 85, category: "Programming" },
  { name: "Python", level: 88, category: "Programming" },
  { name: "Java", level: 75, category: "Programming" },
  { name: "HTML / CSS / JavaScript", level: 92, category: "Programming" },
  { name: "TypeScript", level: 80, category: "Programming" },

  // Embedded & Hardware
  { name: "Arduino Core", level: 95, category: "Hardware/Embedded" },
  { name: "ESP32 Ecosystem", level: 92, category: "Hardware/Embedded" },
  { name: "Raspberry Pi & SBCs", level: 88, category: "Hardware/Embedded" },
  { name: "Microcontrollers (AVR, ARM)", level: 85, category: "Hardware/Embedded" },
  { name: "Electrical Machines", level: 82, category: "Hardware/Embedded" },
  { name: "Power Electronics", level: 80, category: "Hardware/Embedded" },
  { name: "Control Systems", level: 85, category: "Hardware/Embedded" },
  { name: "Power Systems", level: 78, category: "Hardware/Embedded" },

  // Systems & Automation
  { name: "Sensor Integration", level: 94, category: "Automation/IoT" },
  { name: "Smart Automation Systems", level: 90, category: "Automation/IoT" },
  { name: "IoT System Architecture", level: 92, category: "Automation/IoT" },
  { name: "ROS 2 (Robot Operating System)", level: 75, category: "Automation/IoT" },

  // Simulation & Tools
  { name: "MATLAB", level: 88, category: "Simulation/Tools" },
  { name: "Simulink", level: 85, category: "Simulation/Tools" },
  { name: "Wokwi Simulator", level: 90, category: "Simulation/Tools" },
  { name: "AutoCAD (Basic)", level: 72, category: "Simulation/Tools" },
  { name: "Git & GitHub", level: 86, category: "Simulation/Tools" }
];

export const experienceData: TimelineItem[] = [
  {
    id: "exp-1",
    year: "2026 – Present",
    title: "Project Developer",
    subtitle: "Academic & Personal Projects",
    description: [
      "Designed and developed academic and personal engineering projects combining Electrical Engineering, IoT, Embedded Systems, and Software Development.",
      "Built automated smart prototypes using Arduino, ESP32, Raspberry Pi, various sensors, and relays.",
      "Applied full-stack programming concepts in C, C++, Python, HTML, CSS, and Firebase to deliver real-time monitoring solutions.",
      "Collaborated with peers and mentors on project conceptualization, simulation testing, schematic designs, and hardware documentation.",
      "Conducted extensive academic research on emerging fields like Artificial Intelligence, Smart Agriculture, and Electric Vehicle management."
    ],
    technologies: ["ESP32", "Raspberry Pi", "Arduino", "Python", "C++", "Firebase", "Wokwi"]
  }
];

export const educationData: TimelineItem[] = [
  {
    id: "edu-1",
    year: "2024 – 2028 (Undergrad)",
    title: "Bachelor of Technology",
    subtitle: "Electrical & Electronics Engineering (EEE)",
    description: [
      "Focusing on control systems, power systems, power electronics, embedded computing, smart-grid technologies, and automation systems.",
      "Maintaining deep passion for bridging electrical engineering hardware with high-performance software and AI systems.",
      "Active researcher and project leader in smart microgrids, automated solar charging stations, and IoT-enabled systems."
    ]
  }
];

export const interestsData = [
  {
    id: "int-1",
    title: "Research & Innovation",
    icon: "search",
    description: "Deeply interested in investigating novel, sustainable applications for smart grids and IoT hardware.",
    gradient: "from-blue-600/20 to-indigo-600/20"
  },
  {
    id: "int-2",
    title: "Robotics & Automation",
    icon: "bot",
    description: "Developing autonomous physical agents utilizing microcontrollers, computer vision, and ROS 2.",
    gradient: "from-sky-600/20 to-blue-600/20"
  },
  {
    id: "int-3",
    title: "Smart Agriculture",
    icon: "sprout",
    description: "Pioneering precision farming innovations such as smart sensors and automated water controllers.",
    gradient: "from-emerald-600/20 to-teal-600/20"
  },
  {
    id: "int-4",
    title: "Solar & EV Microgrids",
    icon: "zap",
    description: "Studying renewable solar energy harvesting grids, battery management systems, and smart EV stations.",
    gradient: "from-amber-600/20 to-orange-600/20"
  },
  {
    id: "int-5",
    title: "Entrepreneurship",
    icon: "briefcase",
    description: "Applying critical engineering design principles to create scalable, marketable start-up solutions.",
    gradient: "from-purple-600/20 to-pink-600/20"
  }
];

export const achievementsData = [
  {
    title: "IoT Tech Innovator Award",
    issuer: "Engineering Innovation Club",
    date: "2026",
    description: "Recognized for developing the high-efficiency Smart Irrigation ESP32 system."
  },
  {
    title: "Certified Embedded Systems Specialist",
    issuer: "Autonomous Robotics Association",
    date: "2025",
    description: "Completed comprehensive practical certification covering ROS 2 and micro-controllers."
  },
  {
    title: "Smart India Hackathon Finalist",
    issuer: "Ministry of Education",
    date: "2025",
    description: "Pioneered a smart traffic routing solution that dynamically saves transit time for critical emergency services."
  }
];

export const certsData = [
  "Advanced MATLAB & Simulink (MathWorks Authorized)",
  "IoT Systems and Smart Cities Design (Academic)",
  "Full-Stack Web Development & TypeScript Integration",
  "ROS 2 Robotics Foundations & Computer Vision (OpenCV)"
];

export const faqsData = [
  {
    q: "What is Adika's academic background?",
    a: "Adika Karthik is currently an Electrical & Electronics Engineering (EEE) student (class of 2024-2028), specializing in combining electrical hardware, embedded microcontrollers, and modern software development (React, Python, C++)."
  },
  {
    q: "What are Adika's primary areas of technical expertise?",
    a: "His primary areas are Embedded Systems (Arduino, ESP32, Raspberry Pi), IoT System Development, AI/Computer Vision integration in Robotics (ROS 2), Power Electronics, and Full-Stack Web Development (TypeScript, React, Node.js)."
  },
  {
    q: "Is Adika available for internships or professional networking?",
    a: "Yes, absolutely! He is looking for internships, research roles, and collaborative projects. You can contact him directly at adika63916@gmail.com or ask his custom AI Assistant here on the website to facilitate a connection."
  },
  {
    q: "Can I download his full resume?",
    a: "Yes, you can preview his resume in the Resume Preview section and download a beautifully compiled professional PDF version instantly using the buttons in the navigation bar, hero, and resume section."
  }
];
