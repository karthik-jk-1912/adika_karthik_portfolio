import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu, Zap, Sprout, Bot, Search, Briefcase, Code, Terminal,
  Database, GitBranch, Award, Layers, Calendar, MapPin, Mail,
  Phone, Send, ExternalLink, Github, ChevronRight, CheckCircle, Info,
  BookOpen, ChevronDown, Check, GraduationCap, X, RefreshCw
} from "lucide-react";
import { Project, Skill, TimelineItem } from "../types";
import { projectsData, skillsData, experienceData, educationData, interestsData, achievementsData, certsData, faqsData } from "../data";
import { generateResumePDF } from "../lib/pdfGenerator";

// Import generated portrait image from assets path
import profilePhoto from "../assets/images/adika_karthik_profile_1784472782551.jpg";

/* ==========================================
   1. HERO SECTION WITH ELECTRICAL CIRCUIT CANVAS
   ========================================== */
export function Hero({ onOpenAiChat }: { onOpenAiChat: () => void }) {
  const titles = ["Electrical & Electronics Engineer", "Embedded Systems Developer", "AI & IoT Innovator", "Software Engineer"];
  const [titleIdx, setTitleIdx] = useState(0);
  const [subTitle, setSubTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullTitle = titles[titleIdx];
    const typingSpeed = isDeleting ? 30 : 60;

    const handleType = () => {
      if (!isDeleting) {
        setSubTitle(currentFullTitle.substring(0, subTitle.length + 1));
        if (subTitle === currentFullTitle) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
          return;
        }
      } else {
        setSubTitle(currentFullTitle.substring(0, subTitle.length - 1));
        if (subTitle === "") {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % titles.length);
        }
      }
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [subTitle, isDeleting, titleIdx]);

  // Circuit Canvas Animation (Tesla/Stripe inspired)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Circuit Line Definition
    class CircuitLine {
      x: number;
      y: number;
      dx: number;
      dy: number;
      length: number;
      color: string;
      speed: number;
      path: { x: number; y: number }[];
      maxJoints: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = Math.random() * 1.5 + 0.5;
        this.length = Math.random() * 80 + 40;
        this.maxJoints = Math.floor(Math.random() * 3) + 2;
        this.path = [{ x: this.x, y: this.y }];
        this.color = Math.random() > 0.5 ? "rgba(37, 99, 235, 0.3)" : "rgba(14, 165, 233, 0.3)";

        // Set initial direction (strictly 90-degree paths)
        const dir = Math.floor(Math.random() * 4);
        this.dx = dir === 0 ? this.speed : dir === 1 ? -this.speed : 0;
        this.dy = dir === 2 ? this.speed : dir === 3 ? -this.speed : 0;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        const lastJoint = this.path[this.path.length - 1];
        const dist = Math.hypot(this.x - lastJoint.x, this.y - lastJoint.y);

        if (dist > this.length && this.path.length < this.maxJoints) {
          this.path.push({ x: this.x, y: this.y });
          // Change direction by 90 degrees
          if (this.dx !== 0) {
            this.dx = 0;
            this.dy = Math.random() > 0.5 ? this.speed : -this.speed;
          } else {
            this.dy = 0;
            this.dx = Math.random() > 0.5 ? this.speed : -this.speed;
          }
        }

        // Keep path within viewport
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.path = [{ x: this.x, y: this.y }];
          const dir = Math.floor(Math.random() * 4);
          this.dx = dir === 0 ? this.speed : dir === 1 ? -this.speed : 0;
          this.dy = dir === 2 ? this.speed : dir === 3 ? -this.speed : 0;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.path[0].x, this.path[0].y);
        for (let i = 1; i < this.path.length; i++) {
          ctx.lineTo(this.path[i].x, this.path[i].y);
        }
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw node / glowing electron at current tip
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#0ea5e9";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    const lines: CircuitLine[] = Array.from({ length: 25 }, () => new CircuitLine());

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(30, 41, 59, 0.2)";
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      lines.forEach((line) => {
        line.update();
        line.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#020617]">
      {/* Circuit background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Dynamic ambient background spotlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Text Block */}
        <div className="lg:col-span-7 flex flex-col text-left items-start">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md mb-6"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono tracking-wider text-slate-300">OPEN TO WORK & COLLABORATION</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4"
          >
            Engineering <br />
            <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Smart IoT Systems
            </span>
          </motion.h1>

          {/* Subtitle / Typing Animation */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-8 flex items-center text-slate-300 mb-6 font-mono text-sm sm:text-base md:text-lg tracking-wide border-l-2 border-blue-500 pl-3.5"
          >
            <span>{subTitle}</span>
            <span className="w-1.5 h-5 bg-blue-500 ml-1 animate-pulse" />
          </motion.div>

          {/* Brief Intro */}
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 0.7 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mb-8"
          >
            I'm Adika Karthik, an Electrical & Electronics student bridging the gap between high-power electrical architecture, microcontrollers, and modern software development to build intelligent IoT solutions.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-10 w-full"
          >
            <button
              onClick={generateResumePDF}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-[0_4px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.55)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              Download PDF Resume
            </button>
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              View Projects
            </a>
            <button
              onClick={onOpenAiChat}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 text-xs font-semibold transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 animate-spin" /> Ask My AI Bot
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 text-slate-400"
          >
            <a href="https://github.com/adika-karthik" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/adika-karthik" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><Briefcase className="w-5 h-5" /></a>
            <a href="mailto:adika63916@gmail.com" className="hover:text-blue-500 transition-colors"><Mail className="w-5 h-5" /></a>
          </motion.div>
        </div>

        {/* Profile Headshot Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-72 sm:w-80 aspect-square rounded-3xl p-3 bg-gradient-to-tr from-slate-900/80 to-slate-800/40 border border-slate-800 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] group overflow-hidden">
            
            {/* Hologram circuits effect */}
            <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,rgba(14,165,233,0.1),rgba(0,0,0,0)) group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
            
            {/* Glow frame behind image */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600/30 to-sky-500/10 blur-xl opacity-30 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

            {/* Main Portrait Headshot (the generated visual asset) */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700/80">
              <img
                src={profilePhoto}
                alt="Adika Karthik Professional Headshot"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Corner tech accents */}
              <div className="absolute top-3 left-3 flex gap-1 items-center bg-slate-950/70 border border-slate-800 px-2 py-0.5 rounded-md text-[8px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                <span>ADIKA_CORE.EXE</span>
              </div>
            </div>

            {/* Static overlay HUD dashboard */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md flex justify-between items-center text-left shadow-2xl">
              <div>
                <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">Major Domain</span>
                <span className="block text-xs font-bold text-slate-200">Embedded Systems & IoT</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-400 text-xs font-mono font-bold bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg">
                <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" /> EEE
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating statistics widgets below */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 hidden md:grid grid-cols-4 gap-6 z-10">
        {[
          { label: "ACADEMIC TERM", val: "B.Tech Undergrad", sub: "Class of 2024-2028" },
          { label: "CORE FOCUS", val: "IoT & Automation", sub: "C++ / ESP32 / ROS 2" },
          { label: "EXPERIENCE TIMELINE", val: "Project Dev", sub: "2026 – Present" },
          { label: "PORTFOLIO LEVEL", val: "Interactive AI UI", sub: "Gemini 3.5 Engine" }
        ].map((stat, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-900 backdrop-blur-md text-left shadow-md">
            <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">{stat.label}</span>
            <span className="block text-xs font-bold text-slate-200 mt-1">{stat.val}</span>
            <span className="block text-[9px] text-sky-400/80 font-mono mt-0.5">{stat.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


/* ==========================================
   2. ABOUT ME SECTION (INTERACTIVE BENTO GRID)
   ========================================== */
export function About() {
  return (
    <section id="about" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-500">WHO IS ADIKA?</span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2">Engineering Mission</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3">An exploration of my core values, career objectives, and technical calling.</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Objective (Large 7-cols) */}
          <div className="md:col-span-7 p-6 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-md backdrop-blur-sm text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-blue-400">
                <Award className="w-5 h-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">Career Objective</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">Pioneering Next-Gen Smart Solutions</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                As an aspiring Electrical & Electronics engineer, my career mission is centered on designing practical technology to solve real-world crises. I actively integrate hardware components (SBCs, microprocessors) with database state sync, web frontends, and intelligence algorithms to pioneer solutions in smart farming, micro-grid electric vehicle storage, and domestic automation.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-900 text-xs text-sky-400 font-mono">
              Seeking collaborative internships, professional networks, and innovative research.
            </div>
          </div>

          {/* Card 2: Core Mindset (5-cols) */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-md backdrop-blur-sm text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">Engineering Passion</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-100 mb-3">Hardware Meet Software</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                I believe that hardware is only as good as the software driving it. Tuning an ESP32 microcontroller with optimized C codes, linking sensor callbacks to mobile web interfaces, and routing data yields maximum impact.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap pt-4">
              {["Sustainability", "Automation", "Embedded AI", "IoT Systems"].map(mind => (
                <span key={mind} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">{mind}</span>
              ))}
            </div>
          </div>

          {/* Card 3: Personal Virtues (5-cols) */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-md backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Layers className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">Professional Qualities</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400">
              {[
                { title: "Self-Motivated Learner", desc: "Constantly investigating new tech like ROS 2 and web app stacks." },
                { title: "Creative Problem Solver", desc: "Always designing out-of-the-box hardware hacks to optimize costs." },
                { title: "Adaptable & Collaborative", desc: "Experienced leading group projects and aligning team goals." }
              ].map((virt, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-200 text-xs">{virt.title}</span>
                    <span className="text-[11px] text-slate-400">{virt.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4: Micro Grid Quick Statistics (7-cols) */}
          <div className="md:col-span-7 p-6 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-md backdrop-blur-sm text-left grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 text-sky-400">
                <Briefcase className="w-4.5 h-4.5" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider">Practical Builds</span>
              </div>
              <h4 className="font-display text-2xl font-extrabold text-white">5+ Major Prototypes</h4>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Constructed fully simulated or physical prototypes (Smart Irrigation, Automated Traffic Lights, Surveillance Robot, and Solar Charger).
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3 text-amber-500">
                <Code className="w-4.5 h-4.5" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider">Languages</span>
              </div>
              <h4 className="font-display text-2xl font-extrabold text-white">4 Dialects Spoken</h4>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Bi-lingual and versatile in Telugu, English, Hindi, and Kannada, enabling effective cross-cultural communications.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


/* ==========================================
   3. SKILLS SECTION (ORGANIZED BY CATEGORIES)
   ========================================== */
export function Skills() {
  const categories = ["ALL", "Programming", "Hardware/Embedded", "Automation/IoT", "Simulation/Tools"];
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredSkills = skillsData.filter(
    (s) => activeCategory === "ALL" || s.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 bg-slate-950/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-500">EXPERTISE INDEX</span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2">Technical Capabilities</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3">An assessment of my core engineering, embedded programming, and computational skills.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs rounded-full font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.3)]"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-850 hover:border-slate-700/80 hover:bg-slate-900 transition-all text-left flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-display font-semibold text-slate-200 text-sm group-hover:text-blue-400 transition-colors">{skill.name}</h3>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded-full uppercase">{skill.category.split('/')[0]}</span>
                  </div>
                  
                  {/* Skill level indicator */}
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex-1 h-1.5 bg-slate-950 rounded-full overflow-hidden p-[1px] border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full group-hover:from-blue-500 group-hover:to-emerald-400 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-400 group-hover:text-sky-300 transition-colors w-8 text-right">{skill.level}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


/* ==========================================
   4. EXPERIENCE & EDUCATION SECTION (TIMELINE)
   ========================================== */
export function Experience() {
  const [activeTab, setActiveTab] = useState<"exp" | "edu">("exp");

  return (
    <section id="experience" className="py-24 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-500">MILESTONE TRACKER</span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2">Education & Experience</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3">An overview of my academic credentials and engineering project developer milestones.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex gap-1">
            <button
              onClick={() => setActiveTab("exp")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "exp"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" /> Professional Experience
            </button>
            <button
              onClick={() => setActiveTab("edu")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "edu"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Academic Timeline
            </button>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-3xl mx-auto text-left">
          {/* Central timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800" />

          {activeTab === "exp" ? (
            <div className="space-y-12">
              {experienceData.map((item, idx) => (
                <div key={item.id} className="relative flex flex-col sm:flex-row gap-8 items-start">
                  
                  {/* Timeline point */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-[7px] w-4.5 h-4.5 rounded-full bg-blue-600 border-4 border-slate-950 z-10" />

                  {/* Left Block (Time) */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:pr-12 text-left sm:text-right">
                    <span className="font-mono text-xs font-bold text-sky-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                  </div>

                  {/* Right Block (Card content) */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-12">
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-850 shadow-md backdrop-blur-md">
                      <h3 className="font-display font-bold text-slate-100 text-lg">{item.title}</h3>
                      <p className="text-xs text-blue-500 font-medium mb-4">{item.subtitle}</p>
                      
                      <ul className="space-y-3.5 text-xs text-slate-400 pl-0">
                        {item.description.map((bullet, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {item.technologies && (
                        <div className="flex gap-1.5 flex-wrap mt-6">
                          {item.technologies.map(tech => (
                            <span key={tech} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {educationData.map((item, idx) => (
                <div key={item.id} className="relative flex flex-col sm:flex-row gap-8 items-start">
                  
                  {/* Timeline point */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-[7px] w-4.5 h-4.5 rounded-full bg-emerald-500 border-4 border-slate-950 z-10" />

                  {/* Left Block (Time) */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:pr-12 text-left sm:text-right">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                  </div>

                  {/* Right Block (Card content) */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-12">
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-850 shadow-md backdrop-blur-md">
                      <h3 className="font-display font-bold text-slate-100 text-lg">{item.title}</h3>
                      <p className="text-xs text-emerald-500 font-medium mb-4">{item.subtitle}</p>
                      
                      <ul className="space-y-3.5 text-xs text-slate-400 pl-0">
                        {item.description.map((bullet, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


/* ==========================================
   5. FEATURED PROJECTS SECTION (CAROUSEL / FILTER GRID)
   ========================================== */
export function FeaturedProjects() {
  const categories = ["ALL", "embedded", "software", "electrical", "ai"];
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter(
    (p) => activeCategory === "ALL" || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 bg-slate-950/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-500">SCHEMATIC CANVAS</span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2">Engineering Projects</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3">Explore interactive systems engineered blending electrical design with high-level code.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs rounded-full font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat === "embedded" ? "IoT & Embedded" : cat === "software" ? "Software" : cat === "electrical" ? "Electrical" : cat === "ai" ? "AI & Controls" : "ALL"}
            </button>
          ))}
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ 
                scale: 1.025,
                y: -6,
                boxShadow: "0 20px 30px -5px rgba(37, 99, 235, 0.2)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 22 
              }}
              className="group flex flex-col justify-between rounded-2xl bg-slate-900/40 border border-slate-850 hover:border-blue-500/30 overflow-hidden shadow-lg text-left cursor-default"
            >
              {/* Virtual Schematic blueprint background as image placeholder */}
              <div className="relative h-44 bg-[#010a21] border-b border-slate-800/60 overflow-hidden flex items-center justify-center">
                {/* Circuit Grid pattern */}
                <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(14,165,233,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.3)_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                {/* Schematic lines */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <svg className="w-full h-full opacity-20 text-sky-400" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
                    <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  </svg>
                </div>

                <div className="z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[inset_0_1px_4px_rgba(37,99,235,0.1)] group-hover:scale-105 transition-transform duration-300">
                    {proj.category === "embedded" ? (
                      <Cpu className="w-6 h-6 text-sky-400 animate-pulse" />
                    ) : proj.category === "electrical" ? (
                      <Zap className="w-6 h-6 text-amber-400" />
                    ) : proj.category === "ai" ? (
                      <Terminal className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Code className="w-6 h-6 text-indigo-400" />
                    )}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 mt-3">ENGINEERING SCHEMATIC</span>
                </div>
                
                {/* Category indicator badge */}
                <span className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-wider text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
                  {proj.category}
                </span>
              </div>

              {/* Content Block */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-slate-100 text-base mb-2 group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">
                    {proj.description}
                  </p>
                  
                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {proj.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[9px] font-mono bg-slate-950 border border-slate-905 px-2 py-0.5 rounded text-sky-300/85">
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 4 && (
                      <span className="text-[9px] font-mono text-slate-500 px-2 py-0.5">+ {proj.technologies.length - 4} more</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 w-full pt-4 border-t border-slate-900">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="flex-1 text-center py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Drawer Overlay for detailed project view */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 text-left p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Cpu className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-blue-500">{selectedProject.category} Project</span>
                  <h3 className="font-display font-bold text-slate-100 text-lg sm:text-xl">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="text-xs font-mono bg-slate-950 border border-slate-800 px-2.5 py-1 rounded text-sky-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Overview</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Key Features</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400 pl-0">
                  {selectedProject.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-800">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" /> View GitHub Repo
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


/* ==========================================
   6. PUBLICATIONS & INTERESTS SECTION
   ========================================== */
export function Interests() {
  return (
    <section id="interests" className="py-24 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-500">BEYOND SCHEMATICS</span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2">Interests & Research</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3">An index of domains I am actively exploring, researching, and targeting.</p>
        </div>

        {/* Interests bento cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {interestsData.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/40 border border-slate-900 flex flex-col justify-between text-left group hover:border-blue-500/20 transition-all shadow-sm"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.gradient} border border-slate-800 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  {item.icon === "search" && <Search className="w-5 h-5 text-sky-400" />}
                  {item.icon === "bot" && <Bot className="w-5 h-5 text-blue-400" />}
                  {item.icon === "sprout" && <Sprout className="w-5 h-5 text-emerald-400" />}
                  {item.icon === "zap" && <Zap className="w-5 h-5 text-amber-400" />}
                  {item.icon === "briefcase" && <Briefcase className="w-5 h-5 text-purple-400" />}
                </div>
                <h3 className="font-display font-bold text-slate-100 text-sm mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Publications Callout Card */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/30 border border-slate-850 backdrop-blur-md text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <BookOpen className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-sky-400">RESEARCH CALLOUT</span>
              <h3 className="font-display font-bold text-slate-100 text-base mt-1">Academic Publications status</h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed max-w-lg">
                No papers published yet. However, I am actively compiling research indices on dynamic sensor logic and smart agricultural irrigation networks, aiming to target peer-reviewed journals in late 2026.
              </p>
            </div>
          </div>
          <button
            onClick={generateResumePDF}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            Request Research Collab
          </button>
        </div>
      </div>
    </section>
  );
}


/* ==========================================
   7. CONTACT FORM SECTION WITH MAPPED VECTOR COORDS
   ========================================== */
export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setToast({ type: "success", text: data.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to deliver inquiry.");
      }
    } catch (err: any) {
      setToast({ type: "error", text: err.message || "An error occurred while transmitting your message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-500">TRANSMISSION CHANNEL</span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2">Get In Touch</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3">Drop an inquiry or coordinate professional meetings instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side (5-cols) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-sm backdrop-blur-sm space-y-6">
              <h3 className="font-display font-bold text-slate-100 text-lg">Contact Information</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Feel free to trigger messages. I am actively looking to connect with electrical engineers, software researchers, and IoT builders.
              </p>

              <div className="space-y-4 text-xs text-slate-300 font-mono">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>adika63916@gmail.com</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+91 9121769735</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Chittoor, Andhra Pradesh, India</span>
                </div>
              </div>
            </div>

            {/* Simulated Vector Google Map Frame */}
            <div className="rounded-2xl border border-slate-900 overflow-hidden bg-slate-950/80 h-56 relative shadow-md">
              {/* Custom SVG stylized map schematic */}
              <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <svg className="w-full h-full text-slate-700/40" viewBox="0 0 200 100" fill="none">
                  {/* Mock land grids */}
                  <path d="M10 20 C40 10, 80 30, 120 15 C160 5, 180 25, 190 40" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M15 45 C45 35, 75 55, 115 40 C155 30, 175 60, 185 75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                  <path d="M5 80 C35 70, 85 90, 125 75 C165 65, 195 85, 200 95" stroke="currentColor" strokeWidth="0.5" />
                  {/* Grid lines */}
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.25" />
                  <line x1="120" y1="0" x2="120" y2="100" stroke="currentColor" strokeWidth="0.25" />
                </svg>
              </div>

              {/* Pin indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="mt-2 text-[10px] font-mono font-bold bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md text-slate-300 text-center shadow-lg">
                  Ramakuppam, AP, IN
                </span>
              </div>
            </div>
          </div>

          {/* Contact form (7-cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-md backdrop-blur-sm space-y-4 text-left">
              <h3 className="font-display font-bold text-slate-100 text-lg mb-4">Send a Message</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-805 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="Adika Karthik"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-805 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="recruiter@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-805 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="Internship / Project Inquiry"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Message Content *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-805 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  placeholder="Write your details or meeting invite..."
                />
              </div>

              {toast && (
                <div className={`p-4 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                  toast.type === "success"
                    ? "bg-emerald-950/20 border-emerald-900/30 text-emerald-400"
                    : "bg-red-950/20 border-red-900/30 text-red-400"
                }`}>
                  <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>{toast.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 text-xs font-semibold cursor-pointer shadow-[0_4px_15px_rgba(37,99,235,0.25)] transition-all"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Dispatch Inquiry
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}


/* ==========================================
   8. EXTRA SECTION: ACCORDION LISTS (FAQS)
   ========================================== */
export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-950/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-500">FAQ CORNER</span>
          <h2 className="font-display text-3xl font-extrabold text-white mt-2">Common Inquiries</h2>
        </div>

        <div className="space-y-4 text-left">
          {faqsData.map((faq, idx) => {
            const isOpened = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/40 border border-slate-900 overflow-hidden shadow-sm backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpened ? null : idx)}
                  className="w-full px-5 py-4 flex justify-between items-center text-slate-100 hover:text-blue-400 transition-colors cursor-pointer text-xs sm:text-sm font-semibold"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpened ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {isOpened && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-slate-900/60"
                    >
                      <div className="px-5 py-4 text-slate-400 text-xs sm:text-sm leading-relaxed bg-slate-950/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
