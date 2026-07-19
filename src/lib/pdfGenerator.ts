import { jsPDF } from "jspdf";

export function generateResumePDF() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const primaryColor = "#020617"; // Slate 950
  const secondaryColor = "#2563EB"; // Blue 600
  const textDark = "#1E293B"; // Slate 800
  const textMuted = "#64748B"; // Slate 500

  // Margins & Dimensions
  const pageWidth = doc.internal.pageSize.getWidth(); // ~210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // ~297mm
  const marginX = 15;
  let currentY = 15;

  // Assistant Draw Helper: Horizontal line
  const drawLine = (y: number, color = "#E2E8F0") => {
    doc.setDrawColor(color);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, pageWidth - marginX, y);
  };

  // Header Section
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryColor);
  doc.text("ADIKA KARTHIK", marginX, currentY);
  
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor);
  doc.text("ELECTRICAL & ELECTRONICS ENGINEERING | EMBEDDED SYSTEMS & SOFTWARE", marginX, currentY + 5);
  
  currentY += 12;

  // Contact Info Row
  doc.setFontSize(8.5);
  doc.setTextColor(textDark);
  const contactText = "Email: adika63916@gmail.com   |   Phone: +91 9121769735   |   Location: Andhra Pradesh, India   |   GitHub: github.com/adika-karthik";
  doc.text(contactText, marginX, currentY);
  
  currentY += 4;
  drawLine(currentY, "#2563EB");
  currentY += 7;

  // Two Column Layout
  // Left Column Width = 110mm, Right Column Width = 65mm, Gap = 5mm
  const colLeftX = marginX;
  const colRightX = marginX + 115;
  const colLeftWidth = 110;
  const colRightWidth = 65;

  let leftY = currentY;
  let rightY = currentY;

  // --- LEFT COLUMN ---
  // 1. Professional Summary
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(secondaryColor);
  doc.text("PROFESSIONAL SUMMARY", colLeftX, leftY);
  leftY += 4;
  
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(textDark);
  const summaryText = "Electrical and Electronics Engineering student with a strong interest in software development, embedded systems, artificial intelligence, IoT, and automation. Experienced in developing academic and personal projects across electrical engineering and software domains, with a focus on continuous learning and practical implementation. Commited to building sustainable and impactful engineering solutions.";
  const summarySplit = doc.splitTextToSize(summaryText, colLeftWidth);
  doc.text(summarySplit, colLeftX, leftY);
  leftY += summarySplit.length * 3.8 + 5;

  // 2. Experience / Project Developer
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(secondaryColor);
  doc.text("EXPERIENCE", colLeftX, leftY);
  leftY += 4;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(primaryColor);
  doc.text("Project Developer", colLeftX, leftY);
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textMuted);
  doc.text("Academic & Personal Projects | 2026 – Present", colLeftX, leftY + 3.5);
  leftY += 7.5;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(textDark);
  const bullets = [
    "Designed and developed automated smart systems combining electrical grids, IoT modules, and software scripts.",
    "Built dynamic prototypes using Arduino, ESP32, Raspberry Pi, various analog sensors, and relays.",
    "Integrated Firebase Realtime Database for bi-directional state synchronization in home automation setups.",
    "Programmed complex algorithms in C, C++, Python, and JavaScript for local telemetry monitoring.",
    "Collaborated on technical schematic designs, virtual simulations on Wokwi, and systems debugging."
  ];

  bullets.forEach(bullet => {
    const bulletSplit = doc.splitTextToSize("• " + bullet, colLeftWidth);
    doc.text(bulletSplit, colLeftX, leftY);
    leftY += bulletSplit.length * 3.8 + 1;
  });
  leftY += 4;

  // 3. Featured Projects
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(secondaryColor);
  doc.text("SELECTED PROJECTS", colLeftX, leftY);
  leftY += 4;

  const projects = [
    {
      title: "AI-Based Smart Irrigation System",
      tech: "ESP32, Soil Moisture Sensor, IoT, Weather API",
      desc: "Developed an intelligent irrigation network that monitors moisture thresholds and coordinates watering schedules to optimize vital water resource usage."
    },
    {
      title: "AI-Based Smart Traffic Signal System",
      tech: "ESP32, IR Sensors, RFID, OLED Display, Embedded C",
      desc: "Created a traffic control simulator adjusting timers dynamically based on lane density, complete with emergency RFID priority override."
    },
    {
      title: "Autonomous Surveillance Robot",
      tech: "Raspberry Pi, Camera Module, ESP32, ROS 2, Python",
      desc: "Engineered an autonomous navigation robot incorporating OpenCV-based computer vision tracking and ROS 2 mapping libraries."
    },
    {
      title: "Smart Solar EV Charging Station",
      tech: "Solar Energy, IoT, Embedded Microcontrollers",
      desc: "Conceptualized microgrid EV charging systems with load-balancing parameters and integrated battery performance tracking."
    }
  ];

  projects.forEach(p => {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(primaryColor);
    doc.text(p.title, colLeftX, leftY);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(secondaryColor);
    doc.text(`[Tech: ${p.tech}]`, colLeftX + doc.getTextWidth(p.title) + 2, leftY);
    leftY += 3.8;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(textDark);
    const pDescSplit = doc.splitTextToSize(p.desc, colLeftWidth);
    doc.text(pDescSplit, colLeftX, leftY);
    leftY += pDescSplit.length * 3.8 + 2.5;
  });


  // --- RIGHT COLUMN ---
  // 1. Education
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(secondaryColor);
  doc.text("EDUCATION", colRightX, rightY);
  rightY += 4;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(primaryColor);
  doc.text("B.Tech in EEE", colRightX, rightY);
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textDark);
  doc.text("Class of 2024 – 2028", colRightX, rightY + 3.5);
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted);
  doc.text("Andhra Pradesh, India", colRightX, rightY + 7);
  rightY += 11;

  // 2. Technical Skills
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(secondaryColor);
  doc.text("TECHNICAL SKILLS", colRightX, rightY);
  rightY += 4;

  const skillCategories = [
    { name: "Languages", list: "C, C++, Python, Java, JavaScript, TS, HTML, CSS" },
    { name: "Hardware/Embedded", list: "ESP32, Arduino, Raspberry Pi, Relays, Microcontrollers" },
    { name: "Electrical Systems", list: "Power Electronics, Machines, Control Systems, Microgrids" },
    { name: "Simulation/Tools", list: "MATLAB, Simulink, Wokwi, AutoCAD, Git, GitHub" },
    { name: "Databases/IoT", list: "Firebase, Sensor Integration, ROS 2" }
  ];

  skillCategories.forEach(cat => {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor);
    doc.text(cat.name, colRightX, rightY);
    rightY += 3.2;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(textDark);
    const splitSkills = doc.splitTextToSize(cat.list, colRightWidth);
    doc.text(splitSkills, colRightX, rightY);
    rightY += splitSkills.length * 3.5 + 2.5;
  });

  // 3. Languages
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(secondaryColor);
  doc.text("LANGUAGES", colRightX, rightY);
  rightY += 4;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(textDark);
  doc.text("Telugu (Native)\nEnglish (Professional)\nHindi (Conversational)\nKannada (Conversational)", colRightX, rightY);
  rightY += 17;

  // 4. Personal Interests
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(secondaryColor);
  doc.text("INTERESTS", colRightX, rightY);
  rightY += 4;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textDark);
  const interestsList = "• Research & Tech Innovation\n• Robotics & ROS Systems\n• Smart Agrotech\n• Renewable Solar EV Systems\n• Engineering Design";
  doc.text(interestsList, colRightX, rightY);

  // Bottom Border/Footer
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted);
  const printY = Math.max(leftY, rightY) + 12;
  drawLine(printY, "#CBD5E1");
  doc.text("Generated via Adika Karthik's Premium Portfolio Website Assistant.", marginX, printY + 4.5);

  // Save/Download Action
  doc.save("Adika_Karthik_Resume.pdf");
}
