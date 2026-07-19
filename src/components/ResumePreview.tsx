import { motion } from "motion/react";
import { Download, FileText, CheckCircle, Mail, Phone, MapPin, Globe } from "lucide-react";
import { generateResumePDF } from "../lib/pdfGenerator";

export default function ResumePreview() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Action Header */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
            <FileText className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-100 text-sm md:text-base">Compile Professional PDF</h3>
            <p className="text-xs text-slate-400">Generate on-the-fly, print-ready, high-resolution A4 resume.</p>
          </div>
        </div>
        <button
          onClick={generateResumePDF}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.5)] transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <Download className="w-4 h-4 animate-bounce" /> Download Resume (PDF)
        </button>
      </div>

      {/* Styled A4 Document Container */}
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200 overflow-hidden text-left p-6 sm:p-10 font-sans relative">
        {/* Subtle page fold effect for print aesthetic */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-slate-500/5 [clip-path:polygon(0_0,100%_100%,100%_0)]" />
        
        {/* Name and Header Block */}
        <div className="border-b border-slate-300 pb-6 mb-6">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">ADIKA KARTHIK</h1>
          <p className="text-blue-600 font-semibold tracking-wider text-xs sm:text-sm uppercase mt-1">
            Electrical & Electronics Engineering Student | Embedded Systems & Software
          </p>
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mt-5 text-[11px] sm:text-xs text-slate-600 font-mono">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>adika63916@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>+91 9121769735</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Andhra Pradesh, India</span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>github.com/adika-karthik</span>
            </div>
          </div>
        </div>

        {/* Split Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* LEFT & CENTER COLUMN (Main Professional Blocks) */}
          <div className="md:col-span-2 space-y-6">
            {/* Summary */}
            <section>
              <h2 className="font-display font-bold text-xs uppercase tracking-widest text-blue-600 border-b border-slate-200 pb-1 mb-3">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Electrical and Electronics Engineering student with a strong interest in software development, embedded systems, artificial intelligence, IoT, and automation. Experienced in developing academic and personal projects across electrical engineering and software domains, with a focus on continuous learning and practical implementation. Commited to building sustainable and impactful engineering solutions in renewable energy and agriculture.
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="font-display font-bold text-xs uppercase tracking-widest text-blue-600 border-b border-slate-200 pb-1 mb-3">
                Experience
              </h2>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm text-slate-900">Project Developer</h3>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-full">
                    2026 – Present
                  </span>
                </div>
                <p className="text-xs text-blue-600/80 font-medium mb-3">Academic & Personal Projects</p>
                
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-none pl-0">
                  <li className="flex gap-2">
                    <span className="text-blue-600 select-none">•</span>
                    <span>Designed and developed automated smart systems combining electrical grids, IoT modules, and software scripts.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 select-none">•</span>
                    <span>Built dynamic prototypes using Arduino, ESP32, Raspberry Pi, various analog sensors, and relays.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 select-none">•</span>
                    <span>Applied full-stack programming concepts in C, C++, Python, HTML/CSS, JavaScript, and Firebase database.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 select-none">•</span>
                    <span>Collaborated with team members on planning, virtual simulations via Wokwi, debugging, and systems testing.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Selected Projects */}
            <section>
              <h2 className="font-display font-bold text-xs uppercase tracking-widest text-blue-600 border-b border-slate-200 pb-1 mb-3">
                Featured Projects
              </h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">AI-Based Smart Irrigation System</h4>
                  <p className="text-[10px] text-blue-600 font-mono mb-1">ESP32, Soil Moisture Sensor, IoT, OLED Display, Weather API</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Developed an intelligent irrigation network that monitors moisture thresholds in real time and coordinates watering schedules to optimize vital water resource usage.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">AI-Based Smart Traffic Signal System</h4>
                  <p className="text-[10px] text-blue-600 font-mono mb-1">ESP32, IR Sensors, RFID, OLED Display, Embedded C</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Created a traffic control simulator adjusting timers dynamically based on lane density, complete with emergency vehicle RFID override mapping.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Autonomous Surveillance Robot</h4>
                  <p className="text-[10px] text-blue-600 font-mono mb-1">Raspberry Pi, Camera Module, ESP32, ROS 2, Python</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Engineered an autonomous navigation robot incorporating OpenCV-based computer vision tracking and ROS 2 mapping libraries.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (Technical specifications side-rail) */}
          <div className="space-y-6 md:border-l md:border-slate-200 md:pl-6">
            {/* Education */}
            <section>
              <h2 className="font-display font-bold text-xs uppercase tracking-widest text-blue-600 border-b border-slate-200 pb-1 mb-3">
                Education
              </h2>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-950">B.Tech in Electrical & Electronics Engineering</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 font-mono mt-1">Class of 2024 – 2028</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Andhra Pradesh, India. Focused on control systems, power electronics, embedded logic, and clean energy grids.
                </p>
              </div>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="font-display font-bold text-xs uppercase tracking-widest text-blue-600 border-b border-slate-200 pb-1 mb-3">
                Skills
              </h2>
              <div className="space-y-3 font-mono text-[10px] sm:text-xs text-slate-700">
                <div>
                  <span className="font-bold text-slate-950 block text-[11px] font-sans uppercase">Languages</span>
                  <p className="text-slate-600">C, C++, Python, Java, JavaScript, TS, HTML, CSS</p>
                </div>
                <div>
                  <span className="font-bold text-slate-950 block text-[11px] font-sans uppercase">Hardware/Embedded</span>
                  <p className="text-slate-600">ESP32, Arduino, Raspberry Pi, Relays, Microcontrollers</p>
                </div>
                <div>
                  <span className="font-bold text-slate-950 block text-[11px] font-sans uppercase">Electrical Systems</span>
                  <p className="text-slate-600">Power Electronics, Machines, Control Systems, Microgrids</p>
                </div>
                <div>
                  <span className="font-bold text-slate-950 block text-[11px] font-sans uppercase">Simulation/Tools</span>
                  <p className="text-slate-600">MATLAB, Simulink, Wokwi, AutoCAD, Git, GitHub</p>
                </div>
              </div>
            </section>

            {/* Languages */}
            <section>
              <h2 className="font-display font-bold text-xs uppercase tracking-widest text-blue-600 border-b border-slate-200 pb-1 mb-3">
                Languages
              </h2>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>Telugu (Native)</li>
                <li>English (Professional)</li>
                <li>Hindi (Conversational)</li>
                <li>Kannada (Conversational)</li>
              </ul>
            </section>

            {/* Interests */}
            <section>
              <h2 className="font-display font-bold text-xs uppercase tracking-widest text-blue-600 border-b border-slate-200 pb-1 mb-3">
                Interests
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                • Research & Tech Innovation<br />
                • Robotics & ROS Systems<br />
                • Smart Agrotech<br />
                • Solar EV Systems
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
