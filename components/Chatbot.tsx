"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import AIResponse from "../core/render_ui";


interface Message {
  id: string;
  role: "human" | "ai" | "system";
  content: string | null;
  timestamp: string;
}

const QUICK_SUGGESTIONS = [
  "What is Aditya's tech stack?",
  "Tell me about his e-Governance experience",
  "What projects has he built?",
  "How can I contact Aditya?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(200)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL + '/ai/chat' || "http://localhost:3001/ai/chat";

  const initializeWelcomeMessage = () => {
    const welcome: Message = {
      id: "welcome",
      role: "ai",
      content: "Hi! I'm Aditya's AI Assistant. Ask me anything about Aditya's background, skills, work experience, or the production systems he has built!",
      timestamp: new Date().toISOString(),
    };
    setMessages([welcome]);
  };
  // Load chat history from sessionStorage on mount
  useEffect(() => {
    const savedChat = sessionStorage.getItem("portfolio_chat");
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
      } catch (err) {
        initializeWelcomeMessage();
      }
    } else {
      initializeWelcomeMessage();
    }
  }, []);

  // Save chat history to sessionStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("portfolio_chat", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);


  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input.trim();
    if (!messageText || isLoading) return;

    // Reset input if we are sending from the text field
    if (!textToSend) {
      setInput("");
    }
    setError(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "human",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    const aiMessage: Message = {
      id: `ai-${Date.now()}`,
      role: "ai",
      content: "",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        setStatus(response.status);
        throw new Error("Failed to get response from server");
      }

      const data = await response.json();

      aiMessage.content = data.reply;
      aiMessage.timestamp = data.timestamp || new Date().toISOString();

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chatbot API Error:", err);
      if (status === 429) {
        setError("Too many requests, Please try again in a minute");
        // aiMessage.content = "Jarvis is offline. Please start the backend server on port 3901.";
        // aiMessage.timestamp = data.timestamp || new Date().toISOString();
        setMessages((prev) => [...prev, aiMessage])
      }
      else if (status === 403) {
        setError('Daily quota to ask the questions is reached, Please contact Aditya using contact details')
      }
      else {
        setError("Unable to reach the assistant. Please verify the backend is running.");
      }

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "system",
        content: error,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    sessionStorage.removeItem("portfolio_chat");
    initializeWelcomeMessage();
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="font-sans">
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.6)] cursor-pointer outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 border-none flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 90 } : { y: [0, -6, 0] }}
        transition={isOpen ? { duration: 0.2 } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] sm:w-[400px] h-[550px] max-h-[calc(100vh-120px)] rounded-3xl bg-[#0f172a]/98 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col border border-white/10"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple-600/90 via-indigo-600/90 to-blue-600/90 backdrop-blur-md flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                    <Sparkles className="w-5 h-5 text-purple-200 animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm tracking-wide">Jarvis AI</h3>
                  <p className="text-[11px] text-purple-200 flex items-center gap-1">
                    Aditya's Portfolio Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  title="Clear Conversation"
                  className="p-1.5 rounded-full text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-none bg-transparent outline-none"
                  aria-label="Clear chat history"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-none bg-transparent outline-none"
                  aria-label="Close chat assistant"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {messages.map((msg) => {
                if (msg.role === "system") {
                  return (
                    <div key={msg.id} className="flex justify-center my-2">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-2 text-xs text-red-300 flex items-center gap-2 max-w-[90%]">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{msg.content}</span>
                      </div>
                    </div>
                  );
                }

                const isAI = msg.role === "ai";
                return (
                  <div key={msg.id} className={`flex ${isAI ? "justify-start" : "justify-end"} items-start gap-2`}>
                    {isAI && (
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${isAI
                        ? "bg-slate-800/60 border border-white/5 text-slate-200 rounded-tl-sm"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-sm"
                        }`}
                    >
                      {(() => {
                        if (isAI) {
                          try {
                            const trimmed = msg?.content?.trim();
                            if (trimmed && trimmed.startsWith('{') && trimmed.endsWith('}')) {
                              const parsed = JSON.parse(trimmed);
                              if (parsed && Array.isArray(parsed.blocks)) {
                                return <AIResponse blocks={parsed.blocks} />;
                              }
                            }
                          } catch (e) {
                            // Fallback to text rendering
                          }
                        }
                        return msg.content;
                      })()}
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                  </div>
                  <div className="bg-slate-800/60 border border-white/5 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm text-sm flex items-center space-x-1.5 h-10 w-16 justify-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 border-t border-white/5 bg-slate-900/20 shrink-0">
                <p className="text-[10px] text-slate-500 font-mono mb-2 uppercase tracking-wider">Suggested Questions</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SUGGESTIONS.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(suggestion)}
                      className="text-xs bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-full border border-white/10 hover:border-purple-500/30 transition-all text-left cursor-pointer outline-none active:scale-95"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <div className="p-4 border-t border-white/10 bg-slate-900/60 backdrop-blur-md flex items-center space-x-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder={isLoading ? "Jarvis is writing..." : "Ask Jarvis something..."}
                className="flex-1 bg-slate-950/50 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`p-2.5 rounded-full text-white flex items-center justify-center transition-all border-none outline-none cursor-pointer ${input.trim() && !isLoading
                  ? "bg-purple-600 hover:bg-purple-500 active:scale-95"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                aria-label="Send message"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
