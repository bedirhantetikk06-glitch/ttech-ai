"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Sparkles, Mic, Paperclip, MoreVertical, 
  Map, Calendar, ArrowUpRight
} from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { AGENTS } from "@/lib/utils";

// Mock messages for UI development
const INITIAL_MESSAGES = [
  {
    id: "1",
    role: "assistant",
    content: "Merhaba! Tettech AI Koordinatör ajanıyım. Tüm ekibin senin hedeflerin için arka planda hazır bekliyor. Bugün hangi konuya odaklanalım?",
    agent: "orchestrator",
    timestamp: "10:00"
  }
];

export default function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeAgent, setActiveAgent] = useState<keyof typeof AGENTS>("orchestrator");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      agent: undefined,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response flow coordinating multiple agents
    setTimeout(() => {
      setActiveAgent("research");
      
      setTimeout(() => {
        setIsTyping(false);
        setActiveAgent("planning");
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sağlık ve fitness hedeflerin için araştırma ajanı güncel verileri topladı. Sana 90 günlük bir kardiyo ve güçlenme planı çıkartıyorum. Bunu Google Takvimine de eklememi ister misin?",
          agent: "planning",
          timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 2500);
    }, 1000);
  };

  const currentAgentInfo = AGENTS[activeAgent as keyof typeof AGENTS];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen">
      {/* Header */}
      <div className="h-16 border-b border-white/5 bg-surface-900/50 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 z-10">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500"
            style={{ backgroundColor: `${currentAgentInfo.color}20` }}
          >
            <span className="text-xl">{currentAgentInfo.emoji}</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2 transition-colors">
              {currentAgentInfo.name}
              {isTyping && (
                <span className="flex items-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-brand-400 animate-bounce" />
                  <span className="w-1 h-1 rounded-full bg-brand-400 animate-bounce delay-75" />
                  <span className="w-1 h-1 rounded-full bg-brand-400 animate-bounce delay-150" />
                </span>
              )}
            </div>
            <div className="text-xs text-surface-400">
              {currentAgentInfo.description}
            </div>
          </div>
        </div>
        
        <button className="p-2 text-surface-400 hover:text-white transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          const agentInfo = msg.agent ? AGENTS[msg.agent as keyof typeof AGENTS] : AGENTS.orchestrator;
          
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} max-w-4xl mx-auto w-full`}>
              {!isUser && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3 mt-1"
                  style={{ backgroundColor: `${agentInfo.color}20` }}
                >
                  <span className="text-sm">{agentInfo.emoji}</span>
                </div>
              )}
              
              <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
                {!isUser && (
                  <span className="text-xs text-surface-400 ml-1 mb-1 font-medium" style={{ color: agentInfo.color }}>
                    {agentInfo.name}
                  </span>
                )}
                
                <div className={isUser ? 'message-user' : 'message-ai'}>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </div>
                </div>
                <span className="text-[10px] text-surface-500 mt-1 mx-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          )
        })}
        
        {isTyping && (
          <div className="flex justify-start max-w-4xl mx-auto w-full">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3 mt-1"
              style={{ backgroundColor: `${currentAgentInfo.color}20` }}
            >
              <span className="text-sm">{currentAgentInfo.emoji}</span>
            </div>
            <div className="glass-card rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 border border-white/5 h-[44px]">
              <span className="typing-dot" style={{ backgroundColor: currentAgentInfo.color }} />
              <span className="typing-dot" style={{ backgroundColor: currentAgentInfo.color }} />
              <span className="typing-dot" style={{ backgroundColor: currentAgentInfo.color }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {!isTyping && messages.length < 3 && (
        <div className="px-4 pb-2 max-w-4xl mx-auto w-full flex flex-wrap gap-2">
          <button className="text-xs px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 hover:bg-brand-500/20 transition-colors flex items-center gap-1.5">
            <Map className="w-3.5 h-3.5" /> Kariyer planı oluştur
          </button>
          <button className="text-xs px-3 py-1.5 rounded-full border border-sage-500/30 bg-sage-500/10 text-sage-300 hover:bg-sage-500/20 transition-colors flex items-center gap-1.5">
             <Calendar className="w-3.5 h-3.5" /> Bu haftayı planla
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-surface-950/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-sage-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-500" />
          <form 
            onSubmit={handleSend}
            className="relative flex items-end gap-2 bg-surface-900 border border-white/10 rounded-2xl p-2 focus-within:border-brand-500/50 transition-colors"
          >
            <button 
              type="button"
              className="p-3 text-surface-400 hover:text-white transition-colors shrink-0"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <TextareaAutosize
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Tettech AI'a aklındakini yaz..."
              className="flex-1 bg-transparent border-0 focus:ring-0 text-white placeholder:text-surface-500 resize-none py-3 max-h-32 text-sm"
              maxRows={5}
            />
            
            {input.trim() ? (
              <button 
                type="submit"
                className="p-3 rounded-xl bg-brand-500 text-white hover:bg-brand-400 transition-colors shrink-0 shadow-glow-sm"
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                type="button"
                className="p-3 text-surface-400 hover:text-white transition-colors shrink-0"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>
        <div className="text-center mt-3 text-[10px] text-surface-500">
          Tettech AI sistemleri halüsinasyon görebilir, lütfen kritik kararlarda uzmanlara danışın.
        </div>
      </div>
    </div>
  );
}
