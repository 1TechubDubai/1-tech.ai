import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are the official, professional AI assistant for 1TECHHUB. Your job is to help visitors understand our enterprise AI and technology solutions.

Company Context & Tone:
- We provide industrial-scale, secure, and highly strategic AI and software solutions.
- Keep responses clear, professional, concise, and business-focused. 
- You do NOT provide coding help, personal advice, or answer general knowledge/political questions. If asked, politely decline and say you can only assist with 1TECHHUB services.
- If you don't know the answer, say "I don't have that information right now, but our team would be happy to discuss it with you." Do not invent services.
- Keep it short yet informative, and always steer the conversation toward how our solutions can drive ROI and efficiency for their specific business needs.

Core Services & Details:

1. Custom Enterprise AI Solutions: We provide end-to-end AI strategy, from ROI feasibility to full implementation. We build automated, ML-driven decision systems and enforce strict AI governance (bias detection, GDPR compliance, ethical audit logs).
2. Autonomous AI Agents: We build intelligent workforce systems that reason, plan, and execute 24/7. This includes multi-agent orchestration, self-healing agentic workflows, and secure human-in-the-loop interfaces for expert oversight.
3. LLM Integration & Orchestration: We integrate top models (GPT-4, Claude, Llama) with secure API wrappers. We specialize in RAG (Retrieval-Augmented Generation) with vector databases, advanced prompt engineering, and custom model fine-tuning (PEFT/LoRA) deployed on private VPCs.
4. Advanced Machine Learning: We build predictive analytics (demand forecasting, churn prediction) and pattern recognition systems (fraud detection, signal classification). We utilize full-scale MLOps for automated CI/CD pipelines and drift detection.
5. Data Science & Big Data: We architect petabyte-scale infrastructure (Snowflake, Spark, BigQuery) and real-time event streaming (Kafka). We translate raw data into custom BI dashboards and actionable strategic insights.
6. Natural Language Processing (NLP): We extract value from unstructured text using emotional sentiment analysis, context-aware multilingual translation (100+ languages), abstractive document summarization, and intent-aware semantic search.
7. Conversational Voice AI: We deliver ultra-low latency Speech-To-Text (STT) and emotionally resonant Text-To-Speech (TTS) with voice cloning. We build intelligent, multi-turn voice assistants and real-time multilingual translation systems.
8. Software Development: End-to-end product engineering using modern stacks (React, Next.js, Node.js, Go). We build highly scalable, multi-tenant SaaS platforms and AI-integrated native mobile/web applications with robust CI/CD pipelines.

Always guide the user toward how these technologies can drive measurable ROI and operational efficiency for their specific business needs.`;

const GeminiChatBot = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  // A tiny custom parser for **bold** text and lists
  const formatMarkdown = (text) => {
    if (!text) return null;
    
    // Split text by newlines to handle paragraphs and lists
    return text.split('\n').map((line, index) => {
      // Handle bold text (replace **text** with <strong>text</strong>)
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      // If it's a bullet point
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanLine = line.trim().substring(2);
        
        // Return a list item, processing bold text inside it
        return (
          <li key={index} className="ml-4 list-disc mb-1">
            <span dangerouslySetInnerHTML={{ __html: cleanLine.replace(boldRegex, '<strong>$1</strong>') }} />
          </li>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-2 last:mb-0">
          <span dangerouslySetInnerHTML={{ __html: line.replace(boldRegex, '<strong>$1</strong>') }} />
        </p>
      );
    });
  };

  const triggerSend = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: 'user', text: messageText.trim() };
    
    let newHistory = [...messages, userMessage].slice(-5);
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      let apiHistory = [...newHistory];
      if (apiHistory.length > 0 && apiHistory[0].role === 'model') {
        apiHistory = apiHistory.slice(1);
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });
      const formattedContents = apiHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite", // Changed to standard flash to ensure stability
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        }
      });

      const botMessage = { role: 'model', text: response.text };
      setMessages((prev) => [...prev, botMessage].slice(-5));
      
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage].slice(-5));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    triggerSend(input);
  };

  const handleSuggestion = (text) => {
    triggerSend(text);
  };

  return (
    <>
      {/* Launcher Button */}
      <button
        onClick={toggleChat}
        title="Chat with us"
        className={`fixed bottom-7 right-7 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7] border-none cursor-pointer flex items-center justify-center shadow-[0_4px_24px_rgba(0,229,255,0.35)] hover:scale-105 hover:shadow-[0_6px_32px_rgba(0,229,255,0.5)] transition-all z-[9999] ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px]">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-[100px] right-7 w-[380px] max-w-[calc(100vw-40px)] h-[560px] max-h-[calc(100vh-130px)] bg-[#0f1117] border border-[#1f2333] rounded-[16px] shadow-[0_8px_40px_rgba(0,229,255,0.08),0_0_0_1px_rgba(0,229,255,0.05)] flex flex-col overflow-hidden z-[9998] transition-all duration-250 font-sans ${isOpen ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto' : 'translate-y-4 scale-95 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#171a24] border-b border-[#1f2333] flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7] flex items-center justify-center text-base shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <div className="font-bold text-[14px] tracking-[0.03em] text-[#e8eaf0] font-['Syne',sans-serif]">
              1TECHHUB Assistant
            </div>
            <div className="text-[11px] text-[#00e5ff] flex items-center gap-1 mt-[1px]">
              <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse"></span>
              Online
            </div>
          </div>
          <button onClick={toggleChat} className="text-[#6b7280] hover:text-[#e8eaf0] hover:bg-[#1f2333] p-1.5 rounded-md transition-colors flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3 bg-[#07080d]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#1f2333 transparent' }}
        >
          {/* Welcome Message & Suggestions */}
          {messages.length === 0 && (
            <div className="flex gap-2 max-w-[88%] self-start animate-[fadeUp_0.25s_ease]">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7]">🤖</div>
              <div>
                <div className="bg-[#171a24] border border-[#1f2333] rounded-xl p-3.5 text-[13px] text-[#6b7280] leading-[1.6]">
                  <strong className="text-[#e8eaf0] font-['Syne',sans-serif] block mb-1 text-[14px]">Welcome to 1TECHHUB! 👋</strong>
                  I'm here to help you learn about our AI & technology solutions. What can I assist you with today?
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <button onClick={() => handleSuggestion('What services do you offer?')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11.5px] px-2.5 py-1 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors">Our services</button>
                  <button onClick={() => handleSuggestion('How does AI consulting work?')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11.5px] px-2.5 py-1 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors">AI consulting</button>
                  <button onClick={() => handleSuggestion('Tell me about chatbot development')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11.5px] px-2.5 py-1 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors">Chatbot dev</button>
                </div>
              </div>
            </div>
          )}

          {/* Chat History */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-2 max-w-[88%] animate-[fadeUp_0.25s_ease] ${
                msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${
                msg.role === 'user' 
                  ? 'bg-[#1a1f35] border border-[#1f2333] text-right' 
                  : 'bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7] text-left'
              }`}>
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className={`px-3.5 py-2.5 rounded-xl text-[13.5px] leading-[1.6] break-words ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-[#0e2a3a] to-[#1a1f35] border border-[#00e5ff]/20 rounded-tr-sm text-[#c5f5ff] text-right'
                  : 'bg-[#0f1117] border border-[#1f2333] rounded-tl-sm text-[#e8eaf0] text-left'
              }`}>
                {/* Replaced ReactMarkdown with our custom formatting function */}
                <div>
                  {formatMarkdown(msg.text)}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-2 max-w-[88%] self-start animate-[fadeUp_0.25s_ease]">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7]">🤖</div>
              <div className="px-4 py-3 bg-[#0f1117] border border-[#1f2333] rounded-xl rounded-tl-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#6b7280] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-[#171a24] border-t border-[#1f2333] flex flex-col shrink-0">
          <form onSubmit={handleFormSubmit} className="p-3.5 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about our services…"
              disabled={isLoading}
              className="flex-1 bg-[#07080d] border border-[#1f2333] rounded-lg text-[#e8eaf0] text-[13.5px] px-3.5 py-2.5 focus:outline-none focus:border-[#00e5ff]/40 transition-colors placeholder-[#6b7280] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-[38px] h-[38px] rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7] flex items-center justify-center shrink-0 transition-all hover:scale-105 hover:opacity-90 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed text-[#07080d]"
              title="Send"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
          <div className="text-center text-[10px] text-[#6b7280] pb-2">
            Powered by <a href="https://one-tech-ai.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-[#00e5ff] hover:underline decoration-[#00e5ff]/50">1TECHHUB</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default GeminiChatBot;