import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarCheck, Trash2, ArrowDown, Mic, MicOff, Volume2, VolumeX, Loader2, ChevronDown, Search, Paperclip, X, Maximize2, Minimize2, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Core services defined outside so they can be easily referenced
const CORE_SERVICES = [
  "Intelligent Systems", "Generative AI", "Machine Learning", 
  "Computer Vision", "NLP Solutions", "Data Engineering", 
  "Strategic Consulting", "Voice AI", "Partner Integration"
];

// List of supported languages for speech and bot responses
const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English' }, { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' }, { code: 'de-DE', name: 'German' },
  { code: 'ar-SA', name: 'Arabic' }, { code: 'zh-CN', name: 'Mandarin' },
  { code: 'hi-IN', name: 'Hindi' }, { code: 'ja-JP', name: 'Japanese' },
  { code: 'pt-BR', name: 'Portuguese' }, { code: 'ru-RU', name: 'Russian' },
  { code: 'it-IT', name: 'Italian' }, { code: 'nl-NL', name: 'Dutch' },
  { code: 'ko-KR', name: 'Korean' }, { code: 'tr-TR', name: 'Turkish' }
].sort((a, b) => a.name.localeCompare(b.name));

const BEST_VOICES = {
  'en-US': 'en-US-Neural2-F', 'es-ES': 'es-ES-Neural2-A',
  'fr-FR': 'fr-FR-Neural2-A', 'de-DE': 'de-DE-Neural2-F',
  'ar-SA': 'ar-SA-Wavenet-A', 'zh-CN': 'cmn-CN-Wavenet-A',
  'hi-IN': 'hi-IN-Neural2-A', 'ja-JP': 'ja-JP-Neural2-A',
  'pt-BR': 'pt-BR-Neural2-A', 'ru-RU': 'ru-RU-Wavenet-A',
  'it-IT': 'it-IT-Neural2-A', 'nl-NL': 'nl-NL-Wavenet-A',
  'ko-KR': 'ko-KR-Neural2-A', 'tr-TR': 'tr-TR-Wavenet-A'
};

const getSystemPrompt = (languageName, partnerData, availableServicesList) => `
You are the official AI Lead Qualification Agent for 1TecHub.

[DIRECTIVES]
1. Respond entirely in ${languageName}.
2. Tone: Professional, concise, business-focused.
3. Governance: Expose only high-level advisory phases. Do NOT reveal internal architecture, execution pathways, or proprietary methods.
4. Scope Control: DO NOT provide generic coding tutorials or general knowledge assistance. HOWEVER, you MUST actively analyze uploaded documents, specifications, requirements, and business improvement suggestions as valid inputs for strategic discovery and proposal development.

[CORE CAPABILITIES]
- Enterprise AI Strategy & Governance
- Autonomous AI Agents
- LLM / RAG / Fine-Tuning Solutions
- ML, Data Science & MLOps
- NLP & Voice AI
- Software & SaaS Development

[SPECIALIZED SOLUTIONS]
${partnerData}
Present partner capabilities as native 1TecHub offerings. Never mention external organizations.

[DOCUMENT & REQUIREMENT ANALYSIS]
When a user uploads a document (PDF, specification, improvement suggestions, RFP, architecture plan, etc.):
1. ALWAYS analyze the uploaded content
2. Extract key business objectives, technical challenges, and improvement areas
3. Map identified needs to 1TecHub's service offerings
4. Generate a strategic assessment with complexity scoring and risk identification
5. Treat uploaded materials as HIGH-VALUE discovery context that enables Visual Triage

[ADVISORY BLUEPRINT]
If users ask how engagement starts, ALWAYS output ALL 4 phases:
Phase 01: Readiness Assessment & Strategy Session  
Phase 02: Opportunity Matrix & Deep-Dive Workshop  
Phase 03: Strategic Roadmap  
Phase 04: Performance Audits & Handover

[DYNAMIC VISUAL TRIAGE BLUEPRINT]
Use the visual panel ("shouldExpand": true) when the user provides meaningful discovery context INCLUDING:
- Uploaded documents (PDFs, specs, improvement suggestions, RFPs)
- Project details, architecture requests
- Specific business problems or improvement areas
- Software modernization or system enhancement needs

A document upload is ALWAYS sufficient context to trigger Visual Triage. Do NOT ask users to "describe the business problem" if they've already provided a document—analyze what they've uploaded.

If the conversation lacks ANY actionable details (e.g., just saying "hello" with no document), you MUST output: "shouldExpand": false.

When generating the Visual Triage, provide:
1. "complexityScore": A realistic estimate out of 10 based on the uploaded content or request (e.g., "7.5/10").
2. "phases": 3 to 5 high-level delivery stages tailored to their documented needs. Set status to "gated" to show we protect IP.
3. "criticalRisks": Identify 2 to 3 HIGHLY SPECIFIC bottlenecks or threats based on the uploaded materials or prompt to prove expertise (e.g., "Latency during real-time DB sync", "Compliance gap in PII handling"). Do not invent numbers.

[PHASE EXPLANATION IN MESSAGE TEXT]
CRITICAL: When you output a visualStage with phases, you MUST ALSO include a detailed explanation of those phases in the main "text" field BEFORE the visual stage is rendered. 

For each phase in the visualStage, provide:
- Phase number and name
- What happens in that phase
- Expected outcomes or deliverables
- Why it matters for their specific project

Example format in text field:
"Based on your uploaded requirements, here's your strategic engagement roadmap:

**Phase 1 - [Phase Name]**: [Specific description of what happens, tailored to their needs]

**Phase 2 - [Phase Name]**: [Description of deliverables and next steps]

...and so on for each phase.

Full visual blueprint with complexity scoring and risk factors shown in the panel on the right."

DO NOT leave phases only in the visual section—include comprehensive explanations in the main message text.

[OUTPUT RULES]
Always output STRICT JSON.
Always set "shouldRedirectToContact": true and "shouldShowCalendar": false.
selectedServices MUST use exact matches from: [${availableServicesList}]

{
  "text": "Main conversational response.",
  "shouldRedirectToContact": true,
  "shouldShowCalendar": false,
  "selectedServices": ["Service 1"],
  "prefilledMessage": "1st-person project summary.",
  "suggestedFollowUps": ["Q1?", "Q2?", "Q3?"],
  "visualStage": {
    "shouldExpand": true,
    "type": "blueprint",
    "title": "Project Triage Blueprint",
    "description": "Initial complexity and risk assessment.",
    "complexityScore": "8.5",
    "phases": [
      {"step": 1, "name": "Legacy Data Audit", "status": "gated"},
      {"step": 2, "name": "Architecture Scoping", "status": "gated"}
    ],
    "criticalRisks": [
      {"risk": "Data migration latency bottlenecks", "impact": "High"},
      {"risk": "Role-based access control compliance", "impact": "Critical"}
    ]
  }
}
`;

const GeminiChatBot = ({apiKey, ttsApiKey}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // New Phase 1 UI state
  const [currentVisual, setCurrentVisual] = useState(null); // New Phase 1 UI state
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState(null); // New Phase 1 file state
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  
  // --- LANGUAGE STATES ---
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES.find(l => l.code === 'en-US'));
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  
  // --- STATES FOR VOICE FEATURES ---
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState(null); 
  const recognitionRef = useRef(null);
  
  const [solutionsData, setSolutionsData] = useState("Loading specialized solutions...");
  const [parsedSolutions, setParsedSolutions] = useState([]); 
  
  // Refs
  const fileInputRef = useRef(null); // New ref for file uploads
  const langDropdownRef = useRef(null);
  const messagesEndRef = useRef(null);
  const lastMessageRef = useRef(null); 
  const chatContainerRef = useRef(null); 
  const currentAudioRef = useRef(null); 
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stopAudio = () => {
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause(); 
        currentAudioRef.current.currentTime = 0; 
      } catch(e) {
        console.error("Error stopping audio", e);
      }
      currentAudioRef.current = null;
    }
  };

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInput(currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      setSpeakingId(null);
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      setIsLangDropdownOpen(false);
    }
  }, [isOpen, isListening]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setInput(''); 
      if (recognitionRef.current) {
        recognitionRef.current.lang = selectedLanguage.code;
        recognitionRef.current?.start();
        setIsListening(true);
      }
    }
  };

  // --- FILE UPLOAD LOGIC ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const fetchAudioInBackground = async (messageId, text, ttsApiKey) => {
      if (!text || typeof text !== 'string') {
        console.warn("fetchAudioInBackground: 'text' is undefined or empty. Skipping TTS.");
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, audioLoading: false, audioError: true } : msg
        ));
        return; 
      }

      try {
        const cleanText = text.replace(/[*_~`#]/g, '');
        const targetVoiceName = BEST_VOICES[selectedLanguage.code];
        const targetLangCode = selectedLanguage.code === 'zh-CN' ? 'cmn-CN' : selectedLanguage.code;

        const fetchTTS = async (voiceConfig) => {
          return await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${ttsApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: { text: cleanText },
              voice: voiceConfig,
              audioConfig: { audioEncoding: 'MP3' }
            })
          });
        };

        let voiceConfig = targetVoiceName 
          ? { languageCode: targetLangCode, name: targetVoiceName }
          : { languageCode: selectedLanguage.code, ssmlGender: 'FEMALE' };

        let response = await fetchTTS(voiceConfig);

        if (!response.ok) {
          console.warn(`Premium voice failed or unavailable for ${selectedLanguage.code}. Falling back to standard female voice.`);
          voiceConfig = { languageCode: selectedLanguage.code, ssmlGender: 'FEMALE' };
          response = await fetchTTS(voiceConfig);
        }

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Google Cloud TTS Error Details:', errorData);
          throw new Error('TTS Fetch failed after fallback');
        }

        const data = await response.json();
        const audioSrc = `data:audio/mp3;base64,${data.audioContent}`;
        const audioElement = new Audio(audioSrc);

        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, audioElement: audioElement, audioLoading: false } : msg
        ));

      } catch (error) {
        console.error("Background TTS Error:", error);
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, audioLoading: false, audioError: true } : msg
        ));
      }
    };

  const handleSpeak = (msg) => {
    if (speakingId === msg.id) {
      stopAudio();
      setSpeakingId(null);
      return;
    }
    
    stopAudio();
    setSpeakingId(msg.id); 

    if (msg.audioElement) {
      currentAudioRef.current = msg.audioElement;
      
      msg.audioElement.onended = () => {
        setSpeakingId(null);
        currentAudioRef.current = null;
      };

      msg.audioElement.play().catch(e => {
        console.error("Audio playback error:", e);
        setSpeakingId(null);
      });
    }
  };

  useEffect(() => {
    if (isLoading || (messages.length > 0 && messages[messages.length - 1].role === 'user')) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } 
    else if (messages.length > 0 && messages[messages.length - 1].role === 'model') {
      const container = chatContainerRef.current;
      const messageElement = lastMessageRef.current;
      
      if (container && messageElement) {
        container.scrollTo({
          top: messageElement.offsetTop - 10, 
          behavior: 'smooth'
        });
      }
    }
  }, [messages.length, isLoading]);

  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

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
    stopAudio();
    setSpeakingId(null);
    setIsExpanded(false); // Reset Phase 1 visual state
    setCurrentVisual(null);
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShowScrollBottom(!isNearBottom);
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
        <p key={index} className="mb-2 last:mb-0 min-h-[1em]">
          <span dangerouslySetInnerHTML={{ __html: line.replace(boldRegex, '<strong>$1</strong>') }} />
        </p>
      );
    });
  };

  const triggerSend = async (messageText) => {
    const fullMessage = attachedFile 
        ? `[Uploaded Document: ${attachedFile.name}]\n\n${messageText}` 
        : messageText;

    if (!fullMessage.trim() || isLoading) return;
    
    if (isListening) toggleListen();
    stopAudio();
    setSpeakingId(null);
    if (typeof setShowServicesMenu === 'function') setShowServicesMenu(false); 
    setIsLangDropdownOpen(false);

    const userMessageId = Date.now().toString();
    const userMessage = { id: userMessageId, role: 'user', text: fullMessage.trim() };
    
    let newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    removeAttachment(); 
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });

      let apiHistory = [...newHistory];
      if (apiHistory.length > 0 && apiHistory[0].role === 'model') {
        apiHistory = apiHistory.slice(1);
      }

      const formattedContents = apiHistory.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text || "" }]
      }));

      const partnerServiceNames = parsedSolutions ? parsedSolutions.map(s => s.solutionName) : [];
      const allAvailableServices = [...CORE_SERVICES, ...partnerServiceNames]
        .map(name => `"${name}"`)
        .join(', ');

      const currentSystemPrompt = getSystemPrompt(selectedLanguage.name, solutionsData, allAvailableServices);

      // Model waterfall logic for redundancy
      // Prioritize pro models when file is attached for better analysis
      const fallbackModels = attachedFile
        ? [
            'gemini-2.5-pro',
            'gemini-3.0-pro',
            'gemini-2.5-flash',
            'gemini-3.1-flash-lite'
          ]
        : [
            'gemini-3.1-flash-lite',
            'gemini-2.5-flash',
            'gemini-2.5-pro',
            'gemini-3.0-pro'
          ];

      let response = null;
      let apiSuccess = false;
      let lastError = null;

      for (const modelName of fallbackModels) {
        try {
          console.log(`[Gemini API] Attempting generation with model: ${modelName}`);
          
          response = await ai.models.generateContent({
            model: modelName,
            contents: formattedContents,
            config: {
              systemInstruction: currentSystemPrompt,
              responseMimeType: "application/json",
            }
          });

          apiSuccess = true;
          console.log(`[Gemini API] Success using: ${modelName}`);
          break; 
        } catch (err) {
          console.warn(`[Gemini API] Model ${modelName} failed. Falling back... Error:`, err.message);
          lastError = err;
        }
      }

      if (!apiSuccess || !response) {
        throw new Error(`All fallback models failed. Last error: ${lastError?.message}`);
      }

      const responseText = response.text;
      const payload = JSON.parse(responseText);

      let finalBotText = payload.text || "";

      // Robust fallback parsing in case the LLM deviates from strict JSON schema
      for (const key in payload) {
        const isNotRoutingKey = !['text', 'response', 'message', 'suggestedFollowUps', 'selectedServices', 'prefilledMessage', 'shouldShowCalendar', 'shouldRedirectToContact', 'visualStage'].includes(key);
        
        if (isNotRoutingKey && typeof payload[key] === 'object' && payload[key] !== null) {
          if (Array.isArray(payload[key])) {
            const formattedBullets = payload[key].map(item => {
              if (typeof item === 'string') return `* ${item}`;
              if (typeof item === 'object' && item !== null) return `* ${Object.values(item).filter(v => typeof v === 'string').join(': ')}`;
              return '';
            }).filter(Boolean).join('\n');
            
            if (formattedBullets) finalBotText += (finalBotText ? '\n\n' : '') + formattedBullets;
          } else {
            const formattedObject = Object.entries(payload[key]).map(([k, v]) => {
              if (typeof v === 'string') {
                const cleanTitle = k.replace(/_/g, ' '); 
                return `* **${cleanTitle}**: ${v}`;
              }
              return '';
            }).filter(Boolean).join('\n');

            if (formattedObject) finalBotText += (finalBotText ? '\n\n' : '') + formattedObject;
          }
        }
      }

      if (!finalBotText) {
        throw new Error("Missing text content in AI response");
      }

      const botMessageId = (Date.now() + 1).toString();

      // Properly mapping the contactRouting object based on new prompt schema
      const botMessage = { 
        id: botMessageId,
        role: 'model', 
        text: finalBotText, 
        audioElement: null,      
        audioLoading: true,     
        audioError: false,
        contactRouting: {
          shouldRedirect: payload.shouldRedirectToContact === true,
          services: payload.selectedServices || [],
          message: payload.prefilledMessage || ""
        },
        calendarRouting: false,
        suggestedFollowUps: payload.suggestedFollowUps || [] 
      };

      // Handle Visual Stage Triggers with Mobile Awareness
      if (payload.visualStage && payload.visualStage.shouldExpand && payload.visualStage.type !== 'none') {
        setCurrentVisual(payload.visualStage);
        
        // Auto-expand ONLY on desktop/tablets (Tailwind 'md' breakpoint is 768px).
        // On mobile, the pulsing Activity icon will appear in the header for them to click.
        if (window.innerWidth >= 768) {
          setIsExpanded(true);
        } else {
          setIsExpanded(false); 
        }
      }

      setMessages((prev) => [...prev, botMessage]);
      fetchAudioInBackground(botMessageId, finalBotText, ttsApiKey);
      
    } catch (error) {
      console.error("Direct Gemini API Fetch Error:", error);
      const errorMessage = { 
        id: Date.now().toString(), 
        role: 'model', 
        text: 'Sorry, I encountered an error generating a response. Our servers are currently optimizing your request. Please try again.', 
        audioLoading: false 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    triggerSend(input);
  };
  // --- ENHANCED VISUAL STAGE RENDERER WITH CHARTS ---
  const [visualTab, setVisualTab] = useState('overview'); // Track active tab
  
  const renderChart = (chartData) => {
    if (!chartData || chartData.type === 'none') return null;
    
    const points = chartData.dataPoints || [];
    if (points.length === 0) return null;

    const maxY = Math.max(...points.map(p => p.y || 0), 100);
    const minY = 0;
    const range = maxY - minY;
    const width = 600;
    const height = 280;
    const padding = 40;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    const stepX = graphWidth / (points.length - 1 || 1);

    if (chartData.type === 'line') {
      const pathData = points
        .map((point, idx) => {
          const x = padding + idx * stepX;
          const y = height - padding - ((point.y - minY) / range) * graphHeight;
          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' ');

      return (
        <svg width={width} height={height} className="mx-auto my-4">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`grid-${i}`} x1={padding} y1={padding + (i * graphHeight / 4)} x2={width - padding} y2={padding + (i * graphHeight / 4)} stroke="#1f2333" strokeDasharray="2,2" />
          ))}
          {/* Axes */}
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#4b5563" strokeWidth="2"/>
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#4b5563" strokeWidth="2"/>
          {/* Data line */}
          <path d={pathData} fill="none" stroke="#00e5ff" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/>
          {/* Data points */}
          {points.map((point, idx) => {
            const x = padding + idx * stepX;
            const y = height - padding - ((point.y - minY) / range) * graphHeight;
            return <circle key={`point-${idx}`} cx={x} cy={y} r="4" fill="#00e5ff" stroke="#0f1117" strokeWidth="2"/>;
          })}
          {/* Y-axis label */}
          <text x="10" y={padding - 10} fontSize="12" fill="#6b7280" textAnchor="start">{chartData.yAxisLabel || 'Value'}</text>
        </svg>
      );
    }

    if (chartData.type === 'bar') {
      const barWidth = graphWidth / points.length * 0.7;
      const barSpacing = graphWidth / points.length;
      return (
        <svg width={width} height={height} className="mx-auto my-4">
          {/* Grid */}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`grid-${i}`} x1={padding} y1={padding + (i * graphHeight / 4)} x2={width - padding} y2={padding + (i * graphHeight / 4)} stroke="#1f2333" strokeDasharray="2,2" />
          ))}
          {/* Axes */}
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#4b5563" strokeWidth="2"/>
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#4b5563" strokeWidth="2"/>
          {/* Bars */}
          {points.map((point, idx) => {
            const x = padding + idx * barSpacing + (barSpacing - barWidth) / 2;
            const barHeight = ((point.y - minY) / range) * graphHeight;
            const y = height - padding - barHeight;
            return <rect key={`bar-${idx}`} x={x} y={y} width={barWidth} height={barHeight} fill="#00e5ff" opacity="0.8" rx="2"/>;
          })}
          {/* X-axis labels */}
          {chartData.labels?.map((label, idx) => {
            const x = padding + idx * barSpacing + barSpacing / 2;
            return <text key={`label-${idx}`} x={x} y={height - padding + 20} fontSize="11" fill="#6b7280" textAnchor="middle">{label}</text>;
          })}
        </svg>
      );
    }

    return null;
  };

const renderVisualStage = () => {
    if (!currentVisual || !currentVisual.shouldExpand) return null;

    // Extract complexity number for visual calculations
    const complexityNum = parseFloat(currentVisual.complexityScore) || 5;
    const complexityPercent = (complexityNum / 10) * 100;
    const complexityLevel = complexityNum > 7.5 ? 'CRITICAL' : complexityNum > 5 ? 'HIGH' : 'MODERATE';
    const complexityColor = complexityNum > 7.5 ? '#ff4d4f' : complexityNum > 5 ? '#ff9c6e' : '#ffc53d';
    
    // Count services needed based on risks
    const servicesCount = currentVisual.phases?.length || 3;

    return (
      <div className="flex-1 flex flex-col bg-[#0a0c10] overflow-hidden relative">
        {/* Enhanced Header with Visual Metrics */}
        <div className="px-5 sm:px-6 py-5 sm:py-6 border-b border-[#1f2333] bg-gradient-to-r from-[#0f1117]/80 to-[#171a24]/40 backdrop-blur-md z-10 shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Title Section */}
            <div className="flex gap-4 items-start">
              <div>
                <h3 className="text-[#e8eaf0] font-['Syne'] font-bold text-[15px] sm:text-[16px] tracking-wide flex items-center gap-2.5">
                  <Activity className="text-[#00e5ff]" size={20} />
                  {currentVisual.title || "Project Triage Blueprint"}
                </h3>
                {currentVisual.description ? (
                  <p className="text-[11px] sm:text-[12px] text-[#8a91a6] mt-2">{currentVisual.description}</p>
                ) : (
                  <p className="text-[11px] sm:text-[12px] text-[#8a91a6] mt-2">Proprietary architecture logic withheld for security.</p>
                )}
              </div>
            </div>

            {/* Visual Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Complexity Score Card */}
              <div className="bg-[#171a24] border border-[#1f2333] rounded-lg p-3 hover:border-[#00e5ff]/30 transition-all">
                <div className="text-[10px] text-[#8a91a6] font-bold uppercase tracking-wider mb-2">Complexity</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex-1">
                    <div className="h-2 bg-[#0a0c10] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${complexityPercent}%`, backgroundColor: complexityColor }}
                      />
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#e8eaf0] min-w-[2.5rem]">{currentVisual.complexityScore}</span>
                </div>
                <div className="text-[10px] text-[#00e5ff] font-bold mt-1.5">{complexityLevel}</div>
              </div>

              {/* Phases Card */}
              <div className="bg-[#171a24] border border-[#1f2333] rounded-lg p-3 hover:border-[#00e5ff]/30 transition-all">
                <div className="text-[10px] text-[#8a91a6] font-bold uppercase tracking-wider mb-2">Phases</div>
                <div className="text-[18px] font-black text-[#00e5ff]">{servicesCount}</div>
                <div className="text-[10px] text-[#6b7280] mt-1">Delivery stages</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Blueprint Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#171a24]/20 via-[#0a0c10] to-[#0a0c10] custom-scrollbar flex flex-col gap-8">
          
          {/* Critical Risk Signals */}
          {currentVisual.criticalRisks && currentVisual.criticalRisks.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] text-[#8a91a6] uppercase tracking-widest font-bold flex items-center gap-2">
                  <AlertTriangle size={13} className="text-amber-500" />
                  Key Areas Identified
                </h4>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-1 rounded">{currentVisual.criticalRisks.length} Factors</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {currentVisual.criticalRisks.map((riskObj, idx) => {
                  const impactColor = riskObj.impact === 'Critical' ? '#ff4d4f' : riskObj.impact === 'High' ? '#ff9c6e' : '#ffc53d';
                  const impactBg = riskObj.impact === 'Critical' ? 'bg-red-950/15 border-red-500/30' : riskObj.impact === 'High' ? 'bg-orange-950/15 border-orange-500/30' : 'bg-yellow-950/15 border-yellow-500/30';
                  const dotColor = riskObj.impact === 'Critical' ? 'bg-red-500' : riskObj.impact === 'High' ? 'bg-orange-500' : 'bg-yellow-500';
                  
                  return (
                    <div key={idx} className={`${impactBg} border rounded-lg p-3 sm:p-4 flex items-start gap-3 transition-all hover:scale-[1.02] cursor-pointer`}>
                      <div className={`w-2 h-2 rounded-full ${dotColor} mt-1.5 shrink-0 animate-pulse`} />
                      <div className="flex-1">
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase inline-block mb-2" style={{ backgroundColor: `${impactColor}20`, color: impactColor }}>
                          {riskObj.impact} Factor
                        </span>
                        <p className="text-[12px] sm:text-[13px] text-[#e8eaf0] font-medium leading-relaxed">{riskObj.risk}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-[#171a24]/50 border border-dashed border-[#1f2333] rounded-lg p-3 text-[11px] text-[#8a91a6] text-center">
                These factors benefit from strategic guidance to ensure optimal outcomes
              </div>
            </div>
          )}

          {/* Gated Delivery Phases */}
          {currentVisual.phases && currentVisual.phases.length > 0 && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] text-[#8a91a6] uppercase tracking-widest font-bold flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#00e5ff]" />
                  Estimated Delivery Pathway
                </h4>
                <span className="text-[10px] bg-[#00e5ff]/20 text-[#00e5ff] font-bold px-2 py-1 rounded">{currentVisual.phases.length} Phases</span>
              </div>
              
              {/* Phase Cards Grid */}
              <div className="space-y-3">
                {currentVisual.phases.map((phase, idx) => (
                  <div 
                    key={idx} 
                    className="relative group"
                    style={{ animation: `fadeUp 0.4s ease forwards ${idx * 0.1}s`, opacity: 0 }}
                  >
                    {/* Connection Line */}
                    {idx < currentVisual.phases.length - 1 && (
                      <div className="absolute left-[19px] top-[48px] w-0.5 h-6 bg-gradient-to-b from-[#00e5ff]/50 to-[#00e5ff]/10"></div>
                    )}
                    
                    {/* Phase Card */}
                    <div className="flex items-start gap-3.5">
                      {/* Step Number Circle */}
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#00e5ff] bg-[#0a0c10] text-[#00e5ff] font-bold text-[12px] relative z-10 group-hover:bg-[#00e5ff] group-hover:text-[#0a0c10] transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                        {phase.step || idx + 1}
                      </div>
                      
                      {/* Phase Details Card */}
                      <div className="flex-1 pt-1 group-hover:translate-x-1 transition-transform">
                        <div className="bg-gradient-to-r from-[#171a24] to-[#0f1117] border border-[#1f2333] rounded-lg p-4 group-hover:border-[#00e5ff]/40 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h5 className="text-[13px] sm:text-[14px] font-bold text-[#e8eaf0] group-hover:text-[#00e5ff] transition-colors">{phase.name}</h5>
                              <p className="text-[11px] text-[#6b7280] mt-1">Phase {phase.step || idx + 1} — Strategic milestone</p>
                            </div>
                            {/* Lock Icon */}
                            <div className="bg-[#0f1117] p-2 rounded border border-[#1f2333] text-[#6b7280] group-hover:border-[#00e5ff]/20 group-hover:text-[#00e5ff] transition-all" title="Technical specifics withheld">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-3 flex items-center gap-2">
                            <div className="h-1.5 flex-1 bg-[#0a0c10] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#00e5ff] to-[#7b5ea7] rounded-full transition-all duration-700"
                                style={{ width: `${((idx + 1) / currentVisual.phases.length) * 100}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-[#6b7280] font-bold">{Math.round(((idx + 1) / currentVisual.phases.length) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Completion Summary */}
              <div className="bg-[#171a24]/50 border border-dashed border-[#1f2333] rounded-lg p-3 text-center">
                <p className="text-[11px] text-[#8a91a6]">
                  Full engagement cycle: <span className="text-[#00e5ff] font-bold">{currentVisual.phases.length} phases</span> with gated IP protection
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA driving urgency */}
        <div className="px-5 sm:px-6 py-5 border-t border-[#1f2333] bg-gradient-to-r from-[#0f1117] via-[#171a24]/40 to-[#0f1117] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-[11px] text-[#6b7280] font-medium">
              ✓ Analysis complete — Ready for engagement
            </p>
            <p className="text-[10px] text-[#6b7280] mt-1">
              Next: Schedule your strategy session
            </p>
          </div>
          <button 
            onClick={() => {
              // Generate automated message from blueprint data
              const blueprintSummary = currentVisual 
                ? `I'm interested in implementing the ${currentVisual.title || 'Project Triage Blueprint'} we just reviewed. 

Key Details:
- Complexity Score: ${currentVisual.complexityScore || 'N/A'}
- Delivery Phases: ${currentVisual.phases?.length || 0} phases outlined
- Critical Risks Identified: ${currentVisual.criticalRisks?.length || 0} key considerations

${currentVisual.criticalRisks?.length > 0 ? `Risks to Address:\n${currentVisual.criticalRisks.map(r => `• ${r.risk} (${r.impact})`).join('\n')}\n` : ''}
I'd like to schedule a consultation to discuss the detailed engagement roadmap and next steps.`
                : "I'd like to discuss our AI project requirements and get started with your team.";

              const blueprintServices = currentVisual?.phases
                ?.map(phase => phase.name)
                .slice(0, 3) || [];

              setIsExpanded(false);
              toggleChat();
              navigate("/contact", { 
                state: { 
                  prefilledMessage: blueprintSummary,
                  selectedServices: blueprintServices
                }
              });
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#00e5ff] to-[#7b5ea7] border border-[#00e5ff]/40 text-[#07080d] rounded-lg text-[12px] font-bold hover:from-[#00e5ff] hover:to-[#8c6eb8] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Lock in Blueprint & Discuss
          </button>
        </div>

      </div>
    );
  };
  
return (
    <>
      {/* Tooltip Popup */}
      <div className={`fixed bottom-[96px] right-4 sm:right-7 z-[9999] bg-[#171a24] border border-[#1f2333] shadow-[0_4px_24px_rgba(0,229,255,0.15)] text-[#e8eaf0] text-[12px] font-medium py-2 px-4 rounded-xl transition-all duration-700 ease-in-out font-['DM_Sans',sans-serif] ${showTooltip && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        Need AI assistance? Chat with us! 👋
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#171a24] border-b border-r border-[#1f2333] transform rotate-45"></div>
      </div>

      {/* Launcher Button */}
      <button onClick={toggleChat} title="Chat with us" className={`fixed bottom-7 right-4 sm:right-7 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7] border-none cursor-pointer flex items-center justify-center shadow-[0_4px_24px_rgba(0,229,255,0.35)] hover:scale-105 hover:shadow-[0_6px_32px_rgba(0,229,255,0.5)] transition-all z-[9999] ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[26px] h-[26px]">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {/* Chat Window (Dynamic Width Expansion & Mobile Responsiveness) */}
      <div className={`fixed bottom-[100px] right-4 sm:right-7 w-[calc(100vw-32px)] sm:w-[380px] h-[620px] max-h-[calc(100vh-130px)] bg-[#0f1117] border border-[#1f2333] rounded-[16px] shadow-[0_8px_40px_rgba(0,0,0,0.5)] flex overflow-hidden z-[9998] lining-nums font-sans origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto' : 'translate-y-12 scale-[0.85] opacity-0 pointer-events-none'} ${isExpanded ? 'md:w-[1000px] flex-row' : 'flex-col'}`}>
        
        {/* LEFT STAGE: Visual Triage (Absolute overlay on mobile, flex-1 on desktop) */}
        {isExpanded && (
            <div className="absolute inset-0 z-[100] md:relative md:z-auto md:flex-1 flex flex-col border-r border-[#1f2333] bg-[#0a0c10] animate-in fade-in zoom-in-95 md:zoom-in-100 duration-300">
                <div className="absolute top-4 right-4 sm:right-6 z-20 flex gap-2">
                    {/* <button className="hidden sm:flex bg-[#171a24]/80 backdrop-blur border border-[#1f2333] px-3 py-1.5 rounded-md text-[11px] text-[#00e5ff] items-center gap-2 hover:bg-[#1f2333] transition-colors shadow-sm">
                        <CheckCircle2 size={14}/> Explain Insights
                    </button> */}
                    <button 
                      onClick={() => setIsExpanded(false)} 
                      className="bg-[#171a24]/80 backdrop-blur border border-[#1f2333] p-1.5 rounded-md text-[#6b7280] hover:text-[#e8eaf0] hover:bg-[#1f2333] transition-colors shadow-sm" 
                      title="Close Visual Stage"
                    >
                        <X size={16} className="sm:hidden" />
                        <Minimize2 size={16} className="hidden sm:block" />
                    </button>
                </div>
                {renderVisualStage()}
            </div>
        )}

        {/* RIGHT STAGE: Chat Interface */}
        <div className={`flex flex-col h-full bg-[#0f1117] transition-all duration-300 w-full ${isExpanded ? 'md:w-[380px] md:shrink-0' : ''}`}>
            {/* Header */}
            <div className={`px-4 sm:px-5 py-4 bg-[#171a24] border-b border-[#1f2333] flex items-center gap-3 shrink-0`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7] flex items-center justify-center text-base shrink-0">🤖</div>
              <div className="flex-1">
                <div className="font-bold text-[14px] tracking-[0.03em] text-[#e8eaf0] text-left font-['Syne',sans-serif]">1TECHUB Assistant</div>
                <div className="text-[11px] text-[#00e5ff] flex items-center gap-1 mt-[1px]">
                  <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse"></span> Online
                </div>
              </div>
              
              {/* LANGUAGE SELECTOR DROPDOWN */}
              <div className="relative" ref={langDropdownRef}>
                <button 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} 
                  className="text-[11px] font-bold text-[#6b7280] flex items-center gap-1 bg-[#171a24] border border-[#1f2333] hover:bg-[#1f2333] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 px-2 py-1.5 rounded-lg transition-colors mr-1 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                  title="Select Language"
                >
                  {selectedLanguage.name} <ChevronDown size={12} className={`transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`}/>
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-44 bg-[#0f1117] border border-[#1f2333] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 flex flex-col overflow-hidden">
                    <div className="p-2 border-b border-[#1f2333] bg-[#171a24] flex items-center gap-2">
                      <Search size={14} className="text-[#6b7280]" />
                      <input 
                        type="text" 
                        placeholder="Search language..." 
                        value={langSearch}
                        onChange={(e) => setLangSearch(e.target.value)}
                        className="text-[11px] font-medium bg-transparent focus:outline-none w-full text-[#e8eaf0] placeholder-[#6b7280]"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
                      {SUPPORTED_LANGUAGES.filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase())).map(lang => (
                        <button 
                          key={lang.code}
                          onClick={() => { 
                            setSelectedLanguage(lang); 
                            setIsLangDropdownOpen(false); 
                            setLangSearch('');
                          }}
                          className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-lg transition-colors ${selectedLanguage.code === lang.code ? 'bg-gradient-to-r from-[#00e5ff] to-[#00b3cc] text-[#07080d]' : 'text-[#e8eaf0] hover:bg-[#1f2333] hover:text-[#00e5ff]'}`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {messages.length > 0 && (
                <button 
                  onClick={clearHistory} 
                  title="Clear Chat" 
                  className="text-[#6b7280] hover:text-[#ff4d4d] hover:bg-[#1f2333] p-1.5 rounded-md transition-colors flex items-center justify-center mr-1"
                >
                  <Trash2 size={16} />
                </button>
              )}

              {/* Expand Toggle (Premium Styling) */}
              {!isExpanded && currentVisual && (
                  <button 
                    onClick={() => setIsExpanded(true)} 
                    className="text-[#00e5ff] bg-[#00e5ff]/10 border border-[#00e5ff]/20 hover:bg-[#00e5ff]/20 p-1.5 rounded-md transition-colors flex items-center justify-center mr-1 animate-pulse" 
                    title="Open Visual Stage"
                  >
                      <Activity size={16} />
                  </button>
              )}

              <button onClick={toggleChat} className="text-[#6b7280] hover:text-[#e8eaf0] hover:bg-[#1f2333] p-1.5 rounded-md transition-colors flex items-center justify-center">
                <X size={18} />
              </button>
            </div>

            {/* Scroll To Bottom Button */}
            {showScrollBottom && (
              <div className="absolute bottom-[230px] right-0 w-full md:w-[380px] flex justify-center z-40 pointer-events-none transition-all duration-300">
                <button
                  onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="pointer-events-auto bg-[#171a24]/95 backdrop-blur-sm border border-[#1f2333] text-[#00e5ff] p-2 rounded-full shadow-[0_4px_12px_rgba(0,229,255,0.15)] hover:bg-[#1f2333] hover:scale-105 hover:border-[#00e5ff]/50 transition-all duration-300 animate-in fade-in zoom-in-95"
                  title="Scroll to bottom"
                >
                  <ArrowDown size={16} />
                </button>
              </div>
            )}

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              onScroll={handleScroll}
              className={`relative flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3 bg-[#07080d]`} 
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#1f2333 transparent' }}
            >
              
              {messages.length === 0 && (
                <div className="flex gap-2 max-w-[100%] self-start animate-[fadeUp_0.25s_ease]">
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7]">🤖</div>
                  <div>
                    <div className="bg-[#171a24] border border-[#1f2333] rounded-xl p-3.5 text-[13px] text-[#6b7280] leading-[1.6]">
                      <strong className="text-[#e8eaf0] font-['Syne',sans-serif] block mb-1 text-[14px]">Welcome to 1TECHUB! 👋</strong>
                      I'm here to guide you through our enterprise AI and technology solutions. Upload your project brief, select a topic, or type your question!
                    </div>
                  </div>
                </div>
              )}

              {/* Chat History */}
              {messages.map((msg, index) => (
                <div 
                  key={msg.id || index} 
                  ref={index === messages.length - 1 ? lastMessageRef : null} 
                  className={`flex gap-2 max-w-[88%] animate-[fadeUp_0.25s_ease] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                >
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${msg.role === 'user' ? 'bg-[#1a1f35] border border-[#1f2333]' : 'bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7]'}`}>
                    {msg.role === 'user' ? '👤' : '🤖'}
                  </div>
                  
                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-3.5 py-2.5 rounded-xl text-[13.5px] leading-[1.6] break-words relative ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-[#0e2a3a] to-[#1a1f35] border border-[#00e5ff]/20 rounded-tr-sm text-[#c5f5ff] text-right'
                        : 'bg-[#0f1117] border border-[#1f2333] rounded-tl-sm text-[#e8eaf0] text-left'
                    }`}>
                      
                      {/* TTS Button */}
                      {msg.role === 'model' && msg.id && (
                        <div className="mb-3 flex justify-end">
                          {msg.audioLoading ? (
                            <div className="flex items-center gap-2 text-[11px] font-medium px-3 py-1 rounded-full border border-[#00e5ff]/20 bg-[#00e5ff]/5 text-[#00e5ff] shadow-sm">
                              <Loader2 size={14} className="animate-spin text-[#00e5ff]" /> 
                              <span>Preparing Audio...</span>
                            </div>
                          ) : msg.audioError ? (
                            <div className="flex items-center gap-2 text-[11px] font-medium px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 shadow-sm">
                              <VolumeX size={14} />
                              <span>Audio Unavailable</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleSpeak(msg)}
                              className={`flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all duration-300 shadow-sm ${
                                speakingId === msg.id 
                                  ? 'bg-[#00e5ff]/15 border-[#00e5ff]/40 text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)] scale-[1.02]' 
                                  : 'bg-[#171a24] border-[#2a2f45] text-[#a1a1aa] hover:bg-[#1f2333] hover:text-[#00e5ff] hover:border-[#00e5ff]/30'
                              }`}
                              title={speakingId === msg.id ? "Stop speaking" : "Read aloud"}
                            >
                              {speakingId === msg.id ? <VolumeX size={14} /> : <Volume2 size={14} />}
                              <span className="tracking-wide">{speakingId === msg.id ? 'STOP' : 'LISTEN'}</span>
                            </button>
                          )}
                        </div>
                      )}

                      <div>{formatMarkdown(msg.text)}</div>
                    </div>

                    {/* Follow-up Suggestions */}
                    {msg.role === 'model' && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && index === messages.length - 1 && !isLoading && (
                      <div className="mt-2.5 flex flex-col gap-1.5 w-full">
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestedFollowUps.map((suggestion, idx) => (
                            <button 
                              key={idx}
                              onClick={() => triggerSend(suggestion)}
                              className="text-left text-[11px] leading-tight px-3 py-1.5 rounded-lg border border-[#00e5ff]/20 text-[#00e5ff] bg-[#00e5ff]/5 hover:bg-[#00e5ff]/15 hover:border-[#00e5ff]/40 transition-all"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Routing Card */}
                    {msg.contactRouting && msg.contactRouting.shouldRedirect && (
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
                              })
                            }}
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

            {/* QUICK ACTIONS BAR */}
            <div className={`bg-[#0f1117] border-t border-[#1f2333] px-3 pt-3 pb-4 flex flex-wrap gap-2 justify-center items-start shrink-0 w-full max-h-[150px] overflow-y-auto hide-scrollbar`}>
              
              <button onClick={() => triggerSend('I want to start a custom AI project. How do we begin?')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">Discuss AI Advisory</button>
              
              {parsedSolutions.length > 0 && (
                <select 
                  onChange={(e) => {
                    if(e.target.value) {
                      triggerSend(`Can you tell me more about the ${e.target.value} solution?`);
                      e.target.value = ""; 
                    }
                  }}
                  className="bg-[#171a24] border border-[#1f2333] rounded-full text-[#00e5ff] text-[11px] px-2.5 py-1.5 max-w-[130px] truncate focus:outline-none shrink-0 cursor-pointer appearance-none outline-none"
                  title="Explore specific AI Solutions"
                >
                  <option value="">▼ AI Solutions</option>
                  {parsedSolutions.map((sol, idx) => (
                    <option key={idx} value={sol.solutionName}>{sol.solutionName}</option>
                  ))}
                </select>
              )}
              
              <button onClick={() => triggerSend('Tell me about your Generative AI and NLP solutions.')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">Gen AI & NLP</button>
              <button onClick={() => triggerSend('I need help with Data Engineering and Predictive Machine Learning.')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">Data & ML</button>
              <button onClick={() => triggerSend('How do your Autonomous Intelligent Systems work?')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">AI Agents</button>
              <button onClick={() => triggerSend('I would like to schedule a call with your team.')} className="bg-transparent border border-[#1f2333] rounded-full text-[#00e5ff] text-[11px] px-2.5 py-1.5 hover:bg-[#00e5ff]/5 hover:border-[#00e5ff]/40 transition-colors shrink-0 whitespace-nowrap">Schedule a Consultation</button>
            </div>

            {/* INPUT FORM AREA */}
            <div className={`bg-[#171a24] border-t border-[#1f2333] flex flex-col shrink-0`}>
              
              {/* Attachment Preview UI */}
              {attachedFile && (
                <div className="px-3.5 pt-2 flex items-center gap-2">
                    <div className="bg-[#1f2333] border border-[#2a2f45] rounded-md px-2 py-1 flex items-center gap-2 text-[11px] text-[#e8eaf0]">
                        <Paperclip size={12} className="text-[#00e5ff]" />
                        <span className="truncate max-w-[150px]">{attachedFile.name}</span>
                        <button onClick={removeAttachment} className="hover:text-red-400 ml-1"><X size={12}/></button>
                    </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="p-3 sm:p-3.5 flex gap-2 items-center">
                <div className="flex-1 relative flex items-center bg-[#07080d] border border-[#1f2333] rounded-lg">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Upload specs or ask anything..."}
                    disabled={isLoading}
                    className={`w-full bg-transparent text-[#e8eaf0] text-[13.5px] pl-3.5 pr-20 py-2.5 focus:outline-none rounded-lg transition-colors placeholder-[#6b7280] disabled:opacity-50 ${isListening ? 'shadow-[inset_0_0_10px_rgba(248,113,113,0.1)]' : ''}`}
                  />
                  
                  {/* File Upload Hidden Input */}
                  <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload}
                      className="hidden" 
                      accept=".pdf,.txt,.doc,.docx,.csv" 
                  />

                  <div className="absolute right-1 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-1.5 text-slate-400 hover:text-[#00e5ff] hover:bg-[#1f2333] rounded-md transition-colors"
                        title="Attach Requirements"
                      >
                        <Paperclip size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={toggleListen}
                        className={`p-1.5 rounded-md transition-colors ${
                          isListening 
                            ? 'text-red-400 bg-red-400/10 animate-pulse' 
                            : 'text-slate-400 hover:text-[#00e5ff] hover:bg-[#1f2333]'
                        }`}
                        title={isListening ? "Stop listening" : "Voice input"}
                      >
                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                      </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || (!input.trim() && !attachedFile)}
                  className="w-[38px] h-[38px] rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7b5ea7] flex items-center justify-center shrink-0 transition-all hover:scale-105 hover:opacity-90 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed text-[#07080d]"
                  title="Send"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
              <div className="text-center text-[10px] text-[#6b7280] pb-2">
                Powered by <a href="https://1techub.com/" target="_blank" rel="noopener noreferrer" className="text-[#00e5ff] hover:underline decoration-[#00e5ff]/50">1TECHUB</a>
              </div>
            </div>
        </div>
      </div>





      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(0, 229, 255, 0.2); }
          50% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.4); }
        }

        /* Hide scrollbar for the quick actions bar but keep functionality */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4b5563; }

        /* Phase card enhancements */
        .phase-card {
          animation: slideInLeft 0.4s ease forwards;
        }

        /* Metric card hover effects */
        .metric-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .metric-card:hover {
          border-color: rgba(0, 229, 255, 0.4);
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.1);
        }

        /* Progress bar animation */
        @keyframes fillWidth {
          from { width: 0%; }
        }

        .progress-animated {
          animation: fillWidth 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default GeminiChatBot;