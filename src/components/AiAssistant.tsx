import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, User, RefreshCw, Cpu, Check, AlertTriangle } from "lucide-react";
import { ChatMessage } from "../types";

const SUGGESTION_CHIPS = [
  "Tell me about Adika's EEE projects.",
  "Does he have experience with ESP32?",
  "What programming languages does he know?",
  "Is Adika open for internships?",
  "Tell me about the Autonomous Surveillance Robot."
];

interface AiAssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AiAssistant({ isOpen, setIsOpen }: AiAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am Adika's AI Portfolio Assistant, trained directly on his official resume. I can answer questions about his electrical engineering projects, software skills, experience, or coordinate how you can get in touch with him. What would you like to know today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);
    setError(null);

    try {
      // Map history to server-side expectation
      const historyPayload = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Failed to communicate with portfolio server.");
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setError("Unable to connect to Adika's AI Assistant. Please verify your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I am Adika's AI Portfolio Assistant, trained directly on his official resume. I can answer questions about his electrical engineering projects, software skills, experience, or coordinate how you can get in touch with him. What would you like to know today?",
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-45">
        <motion.button
          id="ai-assistant-fab"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-2xl hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all cursor-pointer border border-blue-400/20"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <X className="w-6 h-6" key="close-icon" />
            ) : (
              <div className="relative" key="chat-icon">
                <MessageSquare className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Widget Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-45 w-[90vw] sm:w-[400px] h-[70vh] max-h-[600px] flex flex-col rounded-2xl bg-slate-950/95 border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden glass-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                  <Cpu className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-slate-100 flex items-center gap-1.5">
                    Adika's AI Agent <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  </h3>
                  <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Gemini 3.5 Flash Active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title="Clear Conversation History"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
                      msg.role === "user"
                        ? "bg-sky-600/20 text-sky-300 border border-sky-500/20"
                        : "bg-blue-600/20 text-blue-300 border border-blue-500/20"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4.5 h-4.5" />
                    ) : (
                      <Cpu className="w-4.5 h-4.5" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                          : "bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5 px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/20 shrink-0">
                    <Cpu className="w-4.5 h-4.5 animate-spin" />
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-[11px] text-red-300 flex items-start gap-2 max-w-[90%] mx-auto">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-slate-950 border-t border-slate-900 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
                {SUGGESTION_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="inline-block px-3 py-1.5 text-[10px] rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/30 hover:bg-blue-950/20 transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-slate-950 border-t border-slate-900 flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about skills, projects, contact info..."
                className="flex-1 bg-slate-900/80 border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
