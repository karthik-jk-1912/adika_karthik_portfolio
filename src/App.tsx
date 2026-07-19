import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HeaderNav from "./components/HeaderNav";
import AiAssistant from "./components/AiAssistant";
import ResumePreview from "./components/ResumePreview";
import {
  Hero,
  About,
  Skills,
  Experience,
  FeaturedProjects,
  Interests,
  Contact,
  FAQ
} from "./components/Sections";
import { Cpu, Zap, Mail, Phone, MapPin, Github, ArrowUp, Download } from "lucide-react";
import { generateResumePDF } from "./lib/pdfGenerator";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Default to dark mode by default as requested
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  // Apply dark/light classes to root document
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Back to top scrolling helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] dark:bg-[#020617] light:bg-[#f8fafc] text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors duration-300 relative flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Dynamic Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,41,59,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Persistent floating Header/Nav */}
      <HeaderNav
        onToggleAiChat={() => setIsAiChatOpen(!isAiChatOpen)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Sections Body */}
      <main className="flex-1">
        
        {/* 1. Hero Landing */}
        <Hero onOpenAiChat={() => setIsAiChatOpen(true)} />

        {/* 2. About Bento Grid */}
        <About />

        {/* 3. Skill Matrices */}
        <Skills />

        {/* 4. Timeline Milestones */}
        <Experience />

        {/* 5. Schematic Projects Grid */}
        <FeaturedProjects />

        {/* 6. Resume Preview & Custom Native PDF Exporter */}
        <section id="resume-section" className="py-24 bg-slate-950/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-500">PRINT SPECIFICATIONS</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2">Resume Preview</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-3">Preview and compile a highly structured, vector-based PDF resume instantly.</p>
            </div>
            <ResumePreview />
          </div>
        </section>

        {/* 7. Research & Interests Index */}
        <Interests />

        {/* 8. FAQ Corner */}
        <FAQ />

        {/* 9. Contact Dispatch Panel */}
        <Contact />

      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-950 dark:bg-slate-950 light:bg-slate-900 text-slate-300 border-t border-slate-900 py-12 relative overflow-hidden">
        {/* Tiny grid pattern on footer */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 text-left">
          {/* Logo & Info column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <span className="font-display font-bold tracking-tight text-white text-base">
                ADIKA KARTHIK
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Electrical & Electronics Engineering student exploring microprocessors, custom sensors, smart automations, and modern web application designs.
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              Chittoor, Andhra Pradesh, India
            </div>
          </div>

          {/* Quick links column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">Links</span>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#hero" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a></li>
                <li><a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
              </ul>
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">Connect</span>
              <ul className="space-y-1.5 text-xs">
                <li><a href="https://github.com/adika-karthik" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1"><Github className="w-3.5 h-3.5" /> GitHub</a></li>
                <li><a href="mailto:adika63916@gmail.com" className="hover:text-blue-400 transition-colors flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</a></li>
                <li><button onClick={generateResumePDF} className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"><Download className="w-3.5 h-3.5" /> Download</button></li>
              </ul>
            </div>
          </div>

          {/* Action column */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3.5">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              <ArrowUp className="w-4 h-4 animate-bounce" /> Back to Top
            </button>
            <span className="text-[10px] text-slate-600 font-mono">
              Designed with Awwwards Aesthetics.
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Adika Karthik. All Rights Reserved.</p>
          <p className="font-mono text-[10px] flex items-center gap-1">
            Build status: <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> PRODUCTION READY
          </p>
        </div>
      </footer>

      {/* Floating Gemini AI Assistant console */}
      <AiAssistant
        isOpen={isAiChatOpen}
        setIsOpen={setIsAiChatOpen}
      />

    </div>
  );
}
