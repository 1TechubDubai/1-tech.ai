import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarCheck, Trash2 } from 'lucide-react'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Core services defined outside so they can be easily referenced
const CORE_SERVICES = [
  "Intelligent Systems", "Generative AI", "Machine Learning", 
  "Computer Vision", "NLP Solutions", "Data Engineering", 
  "Strategic Consulting", "Voice AI", "Partner Integration"
];

// Updated to accept the dynamic list of ALL available services (core + partner)
const getSystemPrompt = (partnerData, availableServicesList) => `You are the official, professional AI assistant for 1TECHUB. Your job is to help visitors understand our enterprise AI and technology solutions.

Company Context & Tone:
- We provide industrial-scale, secure, and highly strategic AI and software solutions.
- Keep responses clear, professional, concise, and business-focused. 
- You do NOT provide coding help, personal advice, or answer general knowledge questions.

Core Services & Details:
1. Custom Enterprise AI Solutions: AI strategy, ML decision systems, strict AI governance.
2. Autonomous AI Agents: Multi-agent orchestration, self-healing workflows.
3. LLM Integration: RAG, prompt engineering, custom fine-tuning (PEFT/LoRA).
4. Advanced Machine Learning: Predictive analytics, MLOps, drift detection.
5. Data Science & Big Data: Petabyte-scale infra, Kafka streaming, BI dashboards.
6. Natural Language Processing: Sentiment analysis, multilingual translation, semantic search.
7. Conversational Voice AI: STT, TTS, voice cloning, intelligent IVR.
8. Software Development: End-to-end product engineering (React, Node, Go), SaaS platforms.

SPECIALIZED AI & IOT SOLUTIONS DATA:
Here is a list of specific, specialized solutions we currently offer:
${partnerData}

RULES FOR SPECIALIZED SOLUTIONS:
- Use this data to explain specific use-cases or answer queries about our capabilities (e.g., IoT, fleet tracking, route optimization).
- CRITICAL: Focus ONLY on the features, name, and descriptions. NEVER mention third-party organizations, partner names, links, or URLs. Present them strictly as integrated 1TECHUB capabilities.

CRITICAL INSTRUCTION - JSON OUTPUT ONLY:
You must ALWAYS respond with a valid JSON object. Do NOT wrap it in markdown blockticks.

Your JSON must match this structure exactly:
{
  "text": "Your conversational response to the user here.",
  "shouldRedirectToContact": true or false,
  "shouldShowCalendar": true or false,
  "selectedServices": ["Service 1", "Service 2"],
  "prefilledMessage": "string"
}

RULES FOR ACTIONS & REDIRECTION:
- If the user explicitly asks to schedule a call, book a meeting, talk to someone, or get on a call, set "shouldShowCalendar" to true.
- If the user asks for pricing, wants to start a project, asks for a quote, or needs custom development, set "shouldRedirectToContact" to true. (Note: Both can be true if they ask for both).
- If "shouldRedirectToContact" is true, select 1 to 4 relevant services from this exact list to populate the "selectedServices" array: [${availableServicesList}].
- If "shouldRedirectToContact" is true, write a brief "prefilledMessage" written from the USER'S perspective summarizing what they want to build (e.g., "Hi, I am looking to build a custom RAG solution for my HR data...").
- If false, leave selectedServices as an empty array [] and prefilledMessage as an empty string "".`;

const GeminiChatBot = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  // States for storing our solutions data
  const [solutionsData, setSolutionsData] = useState("Loading specialized solutions...");
  const [parsedSolutions, setParsedSolutions] = useState([]); 
  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- NEW ROUTE TRACKING TOOLTIP LOGIC ---
  useEffect(() => {
    // Show the tooltip immediately when the route changes
    setShowTooltip(true);
    
    // Hide it after 8 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000); 
    
    // Clean up the timer if the user leaves the page before 8 seconds are up
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // --- FIRESTORE DATA FETCHING & SANITIZATION ---
  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const q = query(
          collection(db, "service_listings"), 
          where("status", "==", "active"),
        );
        
        const querySnapshot = await getDocs(q);
        
        let firebaseData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        firebaseData.sort((a, b) => {
          const timeA = a.createdAt?.toMillis() || 0;
          const timeB = b.createdAt?.toMillis() || 0;
          return timeA - timeB; 
        });

        // SANITIZE DATA
        const sanitizedData = firebaseData.map(item => ({
          solutionName: item.name || "",
          category: item.sub || "",
          description: item.desc || "",
          keyFeatures: item.features ? item.features.map(f => f.label) : []
        }));

        setParsedSolutions(sanitizedData); 
        setSolutionsData(JSON.stringify(sanitizedData, null, 2)); 
      } catch (error) {
        console.error("Firestore Fetch Error:", error);
        setSolutionsData("No additional solutions loaded at this time.");
      }
    };

    fetchNodes();
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (showTooltip) setShowTooltip(false);
  };

  const clearHistory = () => {
    setMessages([]);
  };

  const formatMarkdown = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanLine = line.trim().substring(2);
        return (
          <li key={index} className="ml-4 list-disc mb-1">
            <span dangerouslySetInnerHTML={{ __html: cleanLine.replace(boldRegex, '<strong>$1</strong>') }} />
          </li>
        );
      }
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
    
    // FIX: Removed .slice(-5) so it keeps the entire history
    let newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      let apiHistory = [...newHistory];
      // This is required by Gemini API so it doesn't crash if the array starts with a model message
      if (apiHistory.length > 0 && apiHistory[0].role === 'model') {
        apiHistory = apiHistory.slice(1);
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });
      const formattedContents = apiHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      // Combine core services + fetched partner services for the AI to choose from
      const partnerServiceNames = parsedSolutions.map(s => s.solutionName);
      const allAvailableServices = [...CORE_SERVICES, ...partnerServiceNames]
        .map(name => `"${name}"`)
        .join(', ');

      // Inject both the data and the combined list into the prompt
      const currentSystemPrompt = getSystemPrompt(solutionsData, allAvailableServices);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: formattedContents,
        config: {
          systemInstruction: currentSystemPrompt,
          responseMimeType: "application/json", 
        }
      });

      const rawText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const responseData = JSON.parse(rawText);

      const botMessage = { 
        role: 'model', 
        text: responseData.text,
        contactRouting: responseData.shouldRedirectToContact ? {
          services: responseData.selectedServices || [],
          message: responseData.prefilledMessage || ""
        } : null,
        calendarRouting: responseData.shouldShowCalendar ? true : false
      };

      // FIX: Ensure this also doesn't have a slice limit
      setMessages((prev) => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    triggerSend(input);
  };

  return (
    <>
      {/* Tooltip Popup */}
      <div className={`fixed bottom-[96px] right-7 z-[9999] bg-[#171a24] border border-[#1f2333] shadow-[0_4px_24px_rgba(0,229,255,0.15)] text-[#e8eaf0] text-[12px] font-medium py-2 px-4 rounded-xl transition-all duration-700 ease-in-out font-['DM_Sans',sans-serif] ${showTooltip && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        Need AI assistance? Chat with us! 👋
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#171a24] border-b border-r border-[#1f2333] transform rotate-45"></div>
      </div>

      {/* Launcher Button */}
      <button onClick={toggleChat} title="Chat with us" className={`fixed bottom-7 right-7 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7] border-none cursor-pointer flex items-center justify-center shadow-[0_4px_24px_rgba(0,229,255,0.35)] hover:scale-105 hover:shadow-[0_6px_32px_rgba(0,229,255,0.5)] transition-all z-[9999] ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px]">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-[100px] right-7 w-[380px] max-w-[calc(100vw-40px)] h-[560px] max-h-[calc(100vh-130px)] bg-[#0f1117] border border-[#1f2333] rounded-[16px] shadow-[0_8px_40px_rgba(0,229,255,0.08),0_0_0_1px_rgba(0,229,255,0.05)] flex flex-col overflow-hidden z-[9998] transition-all duration-250 lining-nums font-sans ${isOpen ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto' : 'translate-y-4 scale-95 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#171a24] border-b border-[#1f2333] flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7] flex items-center justify-center text-base shrink-0">🤖</div>
          <div className="flex-1">
            <div className="font-bold text-[14px] tracking-[0.03em] text-[#e8eaf0] text-left font-['Syne',sans-serif]">1TECHUB Assistant</div>
            <div className="text-[11px] text-[#00e5ff] flex items-center gap-1 mt-[1px]">
              <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse"></span> Online
            </div>
          </div>
          
          {/* Clear History Button */}
          {messages.length > 0 && (
            <button 
              onClick={clearHistory} 
              title="Clear Chat" 
              className="text-[#6b7280] hover:text-[#ff4d4d] hover:bg-[#1f2333] p-1.5 rounded-md transition-colors flex items-center justify-center mr-1"
            >
              <Trash2 size={16} />
            </button>
          )}

          {/* Close Button */}
          <button onClick={toggleChat} className="text-[#6b7280] hover:text-[#e8eaf0] hover:bg-[#1f2333] p-1.5 rounded-md transition-colors flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3 bg-[#07080d]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1f2333 transparent' }}>
          
          {messages.length === 0 && (
            <div className="flex gap-2 max-w-[100%] self-start animate-[fadeUp_0.25s_ease]">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7]">🤖</div>
              <div>
                <div className="bg-[#171a24] border border-[#1f2333] rounded-xl p-3.5 text-[13px] text-[#6b7280] leading-[1.6]">
                  <strong className="text-[#e8eaf0] font-['Syne',sans-serif] block mb-1 text-[14px]">Welcome to 1TECHUB! 👋</strong>
                  I'm here to guide you through our enterprise AI and technology solutions. Select a topic below or type your question!
                </div>
              </div>
            </div>
          )}

          {/* Chat History */}
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-2 max-w-[88%] animate-[fadeUp_0.25s_ease] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${msg.role === 'user' ? 'bg-[#1a1f35] border border-[#1f2333]' : 'bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7]'}`}>
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-3.5 py-2.5 rounded-xl text-[13.5px] leading-[1.6] break-words ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-[#0e2a3a] to-[#1a1f35] border border-[#00e5ff]/20 rounded-tr-sm text-[#c5f5ff] text-right'
                    : 'bg-[#0f1117] border border-[#1f2333] rounded-tl-sm text-[#e8eaf0] text-left'
                }`}>
                  <div>{formatMarkdown(msg.text)}</div>
                </div>

                {/* --- SMART CALENDAR ROUTING BUTTON --- */}
                {msg.calendarRouting && (
                  <div className="mt-2 w-full max-w-[240px]">
                    <div className="bg-[#171a24] border border-[#00e5ff]/30 rounded-xl p-3 shadow-[0_4px_12px_rgba(0,229,255,0.05)] flex flex-col gap-2">
                      <p className="text-[11px] text-[#e8eaf0] text-center font-medium">Ready to dive deeper?</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open("https://calendly.com/harish-krishnan1976", "_blank", "noopener,noreferrer");
                        }}
                        className="flex items-center justify-center gap-2 py-1.5 px-3 bg-[#00e5ff] text-[#07080d] rounded-lg text-[12px] font-bold hover:bg-[#00cce6] hover:scale-[1.02] transition-all w-full"
                      >
                        <span>Book a Meeting</span>
                        <CalendarCheck className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* --- SMART CONTACT ROUTING BUTTON --- */}
                {msg.contactRouting && (
                  <div className="mt-2 w-full max-w-[240px]">
                    <div className="bg-[#171a24] border border-[#00e5ff]/30 rounded-xl p-3 shadow-[0_4px_12px_rgba(0,229,255,0.05)]">
                      <p className="text-[11px] text-[#e8eaf0] mb-2 text-center font-medium">Ready to discuss your project?</p>
                      <button 
                        onClick={() => {
                          toggleChat()
                          navigate("/contact", { 
                          state: { 
                            prefilledMessage: msg.contactRouting.message,
                            selectedServices: msg.contactRouting.services
                          }
                        })}}
                        className="block w-full py-1.5 px-3 border border-[#00e5ff] text-[#00e5ff] text-center rounded-lg text-[12px] font-bold hover:bg-[#00e5ff]/10 hover:scale-[1.02] transition-all"
                      >
                        Contact Our Experts
                      </button>
                    </div>
                  </div>
                )}
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

        {/* --- PERSISTENT QUICK ACTIONS BAR --- */}
        <div className="bg-[#0f1117] border-t border-[#1f2333] px-3.5 py-2 flex gap-2 overflow-x-auto hide-scrollbar items-center shrink-0 w-full">
          
          {/* Dynamic Dropdown from Firebase */}
          {parsedSolutions.length > 0 && (
            <select 
              onChange={(e) => {
                if(e.target.value) {
                  triggerSend(`Can you tell me more about the ${e.target.value} solution?`);
                  e.target.value = ""; // Reset dropdown after selection
                }
              }}
              className="bg-[#171a24] border border-[#1f2333] rounded-full text-[#00e5ff] text-[11.5px] px-2.5 py-1.5 focus:outline-none shrink-0 cursor-pointer appearance-none outline-none"
              title="Explore specific AI Solutions"
            >
              <option value="">▼ Solutions</option>
              {parsedSolutions.map((sol, idx) => (
                <option key={idx} value={sol.solutionName}>{sol.solutionName}</option>
              ))}
            </select>
          )}

          {/* Static Quick Action Chips */}
          <button onClick={() => triggerSend('Tell me about your Generative AI and NLP solutions.')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11.5px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">Gen AI & NLP</button>
          <button onClick={() => triggerSend('I need help with Data Engineering and Predictive Machine Learning.')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11.5px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">Data & ML</button>
          <button onClick={() => triggerSend('How do your Autonomous Intelligent Systems work?')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11.5px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">AI Agents</button>
          <button onClick={() => triggerSend('I want to start a custom AI project. How do we begin?')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11.5px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">Start a Project</button>
          <button onClick={() => triggerSend('I would like to schedule a call with your team.')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11.5px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">Book a Meeting</button>
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
            Powered by <a href="https://one-tech-ai.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-[#00e5ff] hover:underline decoration-[#00e5ff]/50">1TECHUB</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Hide scrollbar for the quick actions bar but keep functionality */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default GeminiChatBot;
