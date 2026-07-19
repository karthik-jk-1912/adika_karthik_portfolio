import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Zap } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState("Initializing quantum state...");

  useEffect(() => {
    const statuses = [
      "Initializing core modules...",
      "Connecting analog inputs...",
      "Calibrating microcontroller clocks...",
      "Booting IoT telemetry servers...",
      "Syncing neural networks...",
      "Rendering premium portfolio UI...",
      "System fully operational."
    ];

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        
        // Update status text dynamically based on percent
        const statusIdx = Math.min(
          Math.floor((prev / 100) * statuses.length),
          statuses.length - 1
        );
        setStatusText(statuses[statusIdx]);
        
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div id="loading-screen" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] text-[#F8FAFC]">
      {/* Abstract particle matrix background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />
      
      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Animated branding logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
        >
          <Cpu className="w-10 h-10 text-white animate-pulse" />
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 items-center justify-center">
              <Zap className="w-2.5 h-2.5 text-white" />
            </span>
          </div>
        </motion.div>

        {/* Name reveals */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-slate-100 via-blue-200 to-sky-200 bg-clip-text text-transparent"
        >
          ADIKA KARTHIK
        </motion.h1>
        
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-xs mt-2 uppercase tracking-[0.25em] text-sky-400"
        >
          EEE Student & IoT Innovator
        </motion.p>

        {/* Microcontroller console display simulation */}
        <div className="w-64 md:w-80 mt-12 mb-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left font-mono text-[10px] md:text-xs text-sky-300 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
          <div className="flex justify-between text-slate-500 mb-2">
            <span>CORE_LOADER_v2.06</span>
            <span className="text-emerald-400">ONLINE</span>
          </div>
          <div className="h-8 flex items-center text-slate-300">
            <span className="text-blue-400 mr-1.5">&gt;</span> {statusText}
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 h-1.5 bg-slate-950 rounded-full overflow-hidden p-[1px] border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-400 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="w-8 text-right font-bold text-slate-400 text-xs">{percent}%</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-[9px] text-slate-600 tracking-wider uppercase mt-4"
        >
          Designed for Awwwards-Level Precision
        </motion.div>
      </div>
    </div>
  );
}
