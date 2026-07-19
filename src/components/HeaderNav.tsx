import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Download, Cpu, MessageSquare } from "lucide-react";
import { generateResumePDF } from "../lib/pdfGenerator";

interface HeaderNavProps {
  onToggleAiChat: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Interests", href: "#interests" },
  { label: "Contact", href: "#contact" }
];

export default function HeaderNav({ onToggleAiChat, isDarkMode, onToggleTheme }: HeaderNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled threshold
      setScrolled(window.scrollY > 20);

      // 2. Scroll progress ratio
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400 transition-all duration-75 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-6xl transition-all duration-300 rounded-2xl border ${
          scrolled
            ? "bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo / Personal Branding */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <span className="font-display font-bold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 text-sm md:text-base">
              ADIKA<span className="text-blue-500">.K</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-100/50 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Control Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-white text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300 transition-colors cursor-pointer"
              title="Toggle theme mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* AI Assistant Chat Button */}
            <button
              onClick={onToggleAiChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 font-medium text-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 animate-pulse" /> Ask AI
            </button>

            {/* Resume compiler download */}
            <button
              onClick={generateResumePDF}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.45)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5" /> Resume
            </button>
          </div>

          {/* Mobile Right Bar (Controls & Hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-white text-slate-400 dark:text-slate-400 light:text-slate-600 cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600 cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-white rounded-b-2xl"
            >
              <div className="p-4 space-y-2 flex flex-col">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 hover:bg-slate-900/60 dark:hover:bg-slate-900/60 light:hover:bg-slate-100 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile Extra Buttons */}
                <div className="pt-4 border-t border-slate-900 dark:border-slate-900 light:border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onToggleAiChat();
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-semibold cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" /> Chat with AI Portfolio Agent
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      generateResumePDF();
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    <Download className="w-4 h-4 animate-bounce" /> Compile Resume PDF
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
