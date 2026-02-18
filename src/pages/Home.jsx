import Intro from "../Buttons/Intro";
import Navbar from "../components/Navbar";
import Stat from "../components/Stat";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe2, 
  Cpu, 
  ShieldCheck, 
  Layers,
  Bot, 
  BrainCircuit, 
  Database, 
  Activity, 
  MessageSquareText, 
  Code2, 
  Mic,
  CheckCircle2,
  ArrowRight,
  Zap, 
  Users, 
  TrendingUp,
  Quote,
  Rocket, ChevronRight, Sparkles, ArrowDown
} from 'lucide-react';

import {useLocation} from 'react-router-dom';
import MessageForm from "../components/MessageForm";

// Intro Section

const IntroSection = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  // --- CANVAS ANIMATION LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particleCount = window.innerWidth < 768 ? 35 : 70; 
    const connectionDistance = 180;
    const mouseDistance = 250;
    let mouse = { x: null, y: null };

    const handleMouseMove = (e) => { mouse.x = e.x; mouse.y = e.y; };
    const handleMouseOut = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7; // Slightly faster
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 2.5 + 1.5; // Slightly larger
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseDistance) {
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = (dx / distance) * force * this.size;
            const directionY = (dy / distance) * force * this.size;
            this.x -= directionX * 0.8;
            this.y -= directionY * 0.8;
          }
        }
      }
      draw() {
        // CHANGED: White core with strong cyan glow for "pop"
        ctx.fillStyle = '#FFFFFF'; 
        ctx.shadowBlur = 25; // Increased glow intensity
        ctx.shadowColor = '#00B8DB';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            // CHANGED: Brighter line color
            ctx.strokeStyle = `rgba(100, 220, 255, ${1 - distance / connectionDistance})`; 
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // Changed: Fixed height (h-screen) instead of min-h-screen to prevent scrolling
    // Changed: Added pt-[18vh] to account for top navbar (~20%)
    <div className="relative h-screen flex flex-col items-center justify-start pt-[15vh] sm:pt-[18vh] overflow-hidden bg-[#020617] text-white">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* CHANGED: Removed opacity-60 to make canvas full brightness */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        {/* Subtle vignette edges */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020617_100%)] pointer-events-none opacity-80" />
      </div>

      {/* --- THE "REACTOR" ENTITY --- */}
      {/* CHANGED: Increased overall opacity from 40 to 80, made rings brighter */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-80">
        <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] border border-cyan-400/40 rounded-full animate-[spin_20s_linear_infinite] shadow-[0_0_30px_rgba(6,182,212,0.2)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] border-2 border-dashed border-cyan-300/60 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        {/* CHANGED: Brighter, larger core glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-cyan-400/50 blur-[70px] rounded-full animate-pulse" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center h-full">
        
        {/* Text Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="flex flex-col items-center justify-center font-bold tracking-tight leading-none">
            {/* Reduced text sizes to fit above fold */}
            <span className="text-6xl sm:text-5xl md:text-7xl text-white mb-2">
              Technology
            </span>
            
            <span className="
              text-6xl sm:text-6xl md:text-7xl 
              bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 
              bg-[length:200%_auto] bg-clip-text text-transparent 
              animate-gradient
              typing-cursor
              pb-1
            ">
              Simplified.
            </span>
          </h1>

          {/* Compact margins */}
          <p 
            className="mt-16 sm:mt-6 text-md sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]"
          >
            Orchestrating intelligence for the autonomous age. We transform
            complex business challenges into streamlined digital solutions.
          </p>
        </div>

        {/* Buttons - tighter margin */}
        <div 
          className="
            /* --- SPACING & ANIMATION --- */
            mt-12 sm:mt-8 
            mx-auto 
            opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]
            
            /* --- LAYOUT --- */
            flex 
            flex-col sm:flex-row 
            items-center justify-center 
            gap-3 sm:gap-4 
            
            /* --- SIZING --- */
            w-[80%] sm:w-full max-w-lg
          "
        >
          <Intro 
            text="Start Your Journey" 
            variant={1} 
            left={<Rocket className="w-5 h-5" />}        /* Launch Icon */
            right={<ChevronRight className="w-5 h-5" />} /* Forward Icon */
            className="w-full sm:w-auto"
            onClick={() => {navigate('/contact')}} 
          />
          
          <Intro 
            text="Explore Services" 
            
            left={<Sparkles className="w-5 h-5" />}      /* Magic/AI Icon */
            right={<ArrowDown className="w-5 h-5" />}    /* Scroll Down Icon */
            className="w-full sm:w-auto"
            onClick={() => {
              const element = document.getElementById('capabilities');
              element?.scrollIntoView({ behavior: 'smooth' });
            }} 
          />
        </div>

        {/* Stats Section - Pushed to bottom of available space, but with padding to be safe */}
        <div 
          className="mt-auto mb-10 sm:mb-16 w-full opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]"
        >
          {/* Reduced padding inside the glass box */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-xl py-4 px-4 sm:px-8 shadow-2xl max-w-5xl mx-auto">
            <Stat value="3x" label="Avg. ROI" desc="ROI within 12 months" />
            <Stat value="40%" label="OpEx Cut" desc="Decrease in costs" />
            <Stat value="2x" label="Speed" desc="Faster delivery via AI" />
            <Stat value="95%" label="Retention" desc="Long-term value" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient { 
          0% { background-position: 0% center; } 
          100% { background-position: 200% center; } 
        }
        .animate-gradient {
          animation: gradient 4s linear infinite;
        }
        
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }

        .typing-cursor {
          position: relative;
          display: inline-block;
        }
        .typing-cursor::after {
          content: '';
          position: absolute;
          right: -4px;
          top: 10%;
          height: 80%;
          width: 2px;
          background-color: #22d3ee;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 
          0%, 100% { opacity: 1; } 
          50% { opacity: 0; } 
        }
      `}</style>
    </div>
  );
};

// Companies Slider Component

const slides = [
  {
    id: 1,
    text: "Expanding Businesses Across GCC & Africa",
    icon: Globe2,
    color: "from-cyan-400 to-blue-600",
    shadow: "cyan"
  },
  {
    id: 2,
    text: "AI That Drives Real Business Impact",
    icon: Cpu,
    color: "from-purple-400 to-pink-600",
    shadow: "purple"
  },
  {
    id: 3,
    text: "Cloud, Cybersecurity, and Infrastructure Excellence",
    icon: ShieldCheck,
    color: "from-emerald-400 to-green-600",
    shadow: "emerald"
  },
  {
    id: 4,
    text: "End-to-End ERP Expertise, Delivered Globally",
    icon: Layers,
    color: "from-orange-400 to-red-600",
    shadow: "orange"
  }
];
const ImpactShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate logic
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full py-20 overflow-hidden bg-transparent">

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="w-full md:w-2/3 relative h-40 md:h-32 flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-full"
              >
                <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white">
                  {currentSlide.text.split(" ").map((word, i) => (
                    <span key={i} className="inline-block mr-2">
                      {/* Highlight specific words based on the slide color theme */}
                      {['AI', 'GCC', 'Africa', 'Cloud', 'Cybersecurity', 'ERP', 'Globally'].includes(word.replace(/[^a-zA-Z]/g, '')) ? (
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentSlide.color}`}>
                          {word}
                        </span>
                      ) : (
                        word
                      )}
                    </span>
                  ))}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: ANIMATED ICON */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Glow Behind */}
                <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.color} blur-[60px] opacity-40 rounded-full`}></div>
                
                {/* Icon Container */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-[#0a0f1d] border border-slate-700 rounded-3xl flex items-center justify-center shadow-2xl">
                  <currentSlide.icon 
                    size={48} 
                    className={`text-transparent stroke-[1.5] bg-clip-text bg-gradient-to-br ${currentSlide.color}`} 
                    style={{ stroke: 'url(#gradient)' }} // Just a fallback for visual style
                  />
                  {/* Internal Icon SVG Gradient workaround */}
                  <svg width="0" height="0">
                    <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop stopColor="white" offset="0%" />
                      <stop stopColor="gray" offset="100%" />
                    </linearGradient>
                  </svg>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* BOTTOM: PROGRESS BARS */}
        <div className="mt-16 grid grid-cols-4 gap-4">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleDotClick(index)}
              className="group relative h-1 bg-slate-500 rounded-full overflow-hidden transition-all duration-300 hover:h-2 focus:outline-none"
            >
              {/* Active Progress Fill */}
              {index === currentIndex && (
                <motion.div
                  layoutId="progress"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className={`absolute top-0 left-0 h-full w-full bg-gradient-to-r ${slide.color}`}
                />
              )}
              
              {/* Completed Slides (Static Fill) */}
              {index < currentIndex && (
                <div className={`absolute top-0 left-0 h-full w-full bg-slate-300`}></div>
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

// Capabilities Section

const capabilities = [
  {
    title: "Autonomous AI Agents",
    slug: "autonomous-ai-agents",
    description: "Deploy self-learning agents that execute complex workflows, adapt to interactions, and operate 24/7 without supervision.",
    accent: "#06b6d4", // Cyan
    icon: Bot
  },
  {
    title: "Custom AI Solutions",
    slug: "custom-ai-solutions",
    description: "Tailor-made artificial intelligence strategies and architectures designed to solve your specific enterprise challenges.",
    accent: "#8b5cf6", // Violet
    icon: BrainCircuit
  },
  {
    title: "LLM Integration",
    slug: "llm-integration",
    description: "Seamlessly embed GPT-4, Claude, and open-source models into your stack with enterprise-grade security and context.",
    accent: "#ec4899", // Pink
    icon: Cpu
  },
  {
    title: "Big Data Analytics",
    slug: "data-science-analytics-big-data",
    description: "Transform raw petabyte-scale data into actionable strategic insights with real-time processing pipelines.",
    accent: "#3b82f6", // Blue
    icon: Database
  },
  {
    title: "Advanced ML",
    slug: "advanced-machine-learning",
    description: "Predictive modeling and pattern recognition systems that evolve with your data to forecast future trends.",
    accent: "#10b981", // Emerald
    icon: Activity
  },
  {
    title: "Natural Language",
    slug: "natural-language-processing",
    description: "Unlock the value of unstructured text with semantic analysis, sentiment tracking, and automated summarization.",
    accent: "#f59e0b", // Amber
    icon: MessageSquareText
  },
  {
    title: "Software Development",
    slug: "software-development",
    description: "End-to-end full-stack development of scalable, AI-native applications built for the modern cloud era.",
    accent: "#6366f1", // Indigo
    icon: Code2
  },
  {
    title: "Conversational Voice",
    slug: "conversational-voice-ai",
    description: "Next-gen voice agents with human-like latency and emotion for superior customer support experiences.",
    accent: "#f43f5e", // Rose
    icon: Mic
  }
];

const CapabilitiesSection = () => {
  return (
    <section id="capabilities" className="relative w-full py-16 md:py-24 bg-[#020617] overflow-hidden">
      
      {/* Background Ambience (Optional) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-300 uppercase">Core Capabilities</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Comprehensive <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">AI Solutions</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Enterprise-grade technologies engineered to transform operations, 
            drive automation, and unlock new value streams.
          </p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {capabilities.map((item, index) => (
            <CapabilityCard key={index} {...item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

const CapabilityCard = ({ title, description, accent, slug, icon: Icon }) => {
  return (
    <Link
      to={`/services/${slug}`}
      className="group relative block h-full w-full outline-none"
    >
      <div 
        className="
          relative h-full
          p-6 md:p-8 rounded-3xl
          bg-[#0a0f1d] border border-slate-800
          transition-all duration-300 ease-out
          
          /* Hover State (Desktop) */
          hover:-translate-y-2
          hover:border-transparent
          hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
          
          /* Active State (Mobile Press) */
          active:scale-[0.98]
          active:bg-[#0d1425]
          
          overflow-hidden
        "
      >
        {/* Hover Gradient Border Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom right, ${accent}20, transparent, transparent)`
          }}
        />
        
        {/* Glow Spot on Hover */}
        <div 
          className="absolute -right-10 -top-10 w-32 h-32 blur-[60px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: accent }}
        />

        {/* --- CARD CONTENT --- */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Icon Box */}
          <div 
            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-5 md:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            style={{ 
              backgroundColor: `${accent}15`, 
              color: accent,
              border: `1px solid ${accent}30`
            }}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
          </div>

          <h3 className="text-lg md:text-xl text-left font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">
            {title}
          </h3>

          <p className="text-sm text-left text-slate-400 leading-relaxed mb-6 md:mb-8 flex-grow">
            {description}
          </p>

          {/* Learn More Link */}
          <div className="flex items-center text-xs md:text-sm font-bold tracking-wide uppercase mt-auto" style={{ color: accent }}>
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </div>

        </div>
      </div>
    </Link>
  );
};

// // Advantage Section
// const Advantages = [
//   {
//     icon: Zap,
//     title: 'Speed to Market',
//     description: 'Launch AI solutions 3x faster with our proven frameworks and pre-built components. Reduce time from concept to production deployment.'
//   },
//   {
//     icon: Users,
//     title: 'Expert Partnership',
//     description: 'Access a dedicated team of AI specialists, data scientists, and engineers who become an extension of your organization.'
//   },
//   {
//     icon: TrendingUp,
//     title: 'Proven Results',
//     description: 'Join 300+ enterprises achieving measurable ROI. Average efficiency gains of 40% within the first 6 months.'
//   }
// ];

// // --- COMPONENT: ADVANTAGE CARD ---
// const AdvantageCard = ({ icon: Icon, title, description, index = 0 }) => {
//   return (
//     <div 
//       className="group relative h-full w-full opacity-0 animate-slideUp"
//       style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
//     >
//       <div className="
//         relative h-full
//         flex flex-col items-center text-center
//         p-6 sm:p-8 md:p-10
//         rounded-3xl
//         bg-[#0a0f1d] border border-slate-800
//         transition-all duration-500 ease-out
//         hover:-translate-y-2
//         hover:border-blue-500/30
//         hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)]
//         overflow-hidden
//       ">
//         {/* Gradient Hover Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//         {/* Icon Container */}
//         <div className="
//           relative z-10 
//           w-16 h-16 sm:w-20 sm:h-20 
//           rounded-2xl
//           bg-blue-500/10
//           border border-blue-500/20
//           flex items-center justify-center 
//           mb-6 
//           transition-transform duration-500 
//           group-hover:scale-110 group-hover:rotate-3
//           group-hover:bg-blue-500/20
//           group-hover:border-blue-500/30
//         ">
//           <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 group-hover:text-blue-300 transition-colors" strokeWidth={1.5} />
//         </div>

//         <h3 className="relative z-10 text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors duration-300">
//           {title}
//         </h3>
        
//         <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
//           {description}
//         </p>

//         {/* Bottom Accent Line */}
//         <div className="relative z-10 h-1 w-12 bg-slate-700 rounded-full group-hover:w-24 group-hover:bg-blue-500 transition-all duration-500" />
//       </div>
//     </div>
//   );
// };

// // --- SECTION: ADVANTAGES ---
// const AdvantageSection = () => {
//   return (
//     <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      
//       {/* Header */}
//       <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 space-y-4">
//         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
//           <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
//           <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-300 uppercase">Why Choose Us</span>
//         </div>
        
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
//           Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">1TecHub?</span>
//         </h2>
        
//         <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-2">
//           We deliver exceptional value through our unique approach to AI, 
//           blending speed, expertise, and measurable outcomes.
//         </p>
//       </div>

//       {/* Cards Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//         {Advantages.map((advantage, index) => (
//           <AdvantageCard key={index} {...advantage} index={index} />
//         ))}
//       </div>
//     </section>
//   );
// };

// // --- SECTION: THE DUAL ENGINE (Infrastructure & Intelligence) ---
// const FeatureCardsSection = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="relative w-full pb-12 pt-1bg-transparent overflow-hidden">
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch justify-center">
        
//         {/* --- CARD 1: INFRASTRUCTURE & MODERNIZATION --- */}
//         <div className="
//           group relative flex flex-col
//           p-6 sm:p-8 md:p-10 rounded-[2.5rem]
//           bg-[#0a0f1d] border border-slate-800
//           transition-all duration-500 ease-out
//           hover:-translate-y-2 hover:border-cyan-500/50
//           hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)]
//           w-full lg:w-1/2 mx-auto
//           overflow-hidden
//         ">
//           {/* <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" /> */}

//           <div className="relative z-10 flex flex-col h-full">
//             <div className="mb-6 flex items-center gap-3">
//               <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
//                 <Layers size={24} />
//               </div>
//               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Pillar 01</span>
//             </div>

//             <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
//               Infrastructure Evolution
//             </h2>

//             <p className="text-slate-400 text-sm leading-relaxed mb-8">
//               From legacy modernization to cloud-native scaling. We engineer the robust digital foundations 
//               required to support the next generation of enterprise AI and autonomous workflows.
//             </p>

//             <ul className="space-y-3 mb-8">
//               {[
//                 "Next-Gen App Modernization",
//                 "Scalable API & Custom Integrations",
//                 "Cyber Security & Resilience",
//                 "Hybrid Cloud & Data Warehousing"
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
//                   <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             {/* Visual Context */}
//             [Image of a modern enterprise cloud infrastructure architecture diagram]
//             <div className="mt-auto pt-10">
//               <button 
//                 onClick={() => navigate("/services")} 
//                 className="group/btn relative inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-black tracking-[0.15em] bg-white text-black transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
//               >
//                 EXPLORE ECOSYSTEM <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- CARD 2: AUTONOMOUS INTELLIGENCE --- */}
//         <div className="
//           group relative flex flex-col
//           p-6 sm:p-8 md:p-10 rounded-[2.5rem]
//           bg-[#0a0f1d] border border-slate-800
//           transition-all duration-500 ease-out
//           hover:-translate-y-2 hover:border-purple-500/50
//           hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.2)]
//           w-full lg:w-1/2 mx-auto
//           overflow-hidden
//         ">
//           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//           <div className="relative z-10 flex flex-col h-full">
//             <div className="mb-6 flex items-center gap-3">
//               <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
//                 <Zap size={24} />
//               </div>
//               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Pillar 02</span>
//             </div>

//             <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
//               Intelligent Automation
//             </h2>

//             <p className="text-slate-400 text-sm leading-relaxed mb-8">
//               Beyond simple analytics. We deploy Gen-AI agents and predictive models that actively 
//               solve problems, automate decision-making, and unlock non-linear business growth.
//             </p>

//             <ul className="space-y-3 mb-8">
//               {[
//                 "Generative AI & RAG Engines",
//                 "Autonomous AI Agent Workforces",
//                 "Predictive ML & Big Data Analytics",
//                 "Voice & Conversational Intelligence"
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
//                   <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             {/* Visual Context */}
//             [Image of an autonomous AI agent workflow process diagram]
//             <div className="mt-auto pt-10">
//               <button 
//                 onClick={() => navigate("/services")} 
//                 className="group/btn relative inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-black tracking-[0.15em] bg-white text-black transition-all hover:bg-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
//               >
//                 DISCOVER SOLUTIONS <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

const CombinedWhyChooseUs = () => {
  const navigate = useNavigate();

  // Advantage Data for the Top Row
  const advantages = [
    {
      icon: Zap,
      title: 'Speed to Market',
      description: 'Launch AI solutions 3x faster with our proven frameworks and pre-built components. Reduce time from concept to production deployment.'
    },
    {
      icon: Users,
      title: 'Expert Partnership',
      description: 'Access a dedicated team of AI specialists, data scientists, and engineers who become an extension of your organization.'
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Join 300+ enterprises achieving measurable ROI. Average efficiency gains of 40% within the first 6 months.'
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-300 uppercase">Strategic Edge</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">1TecHub?</span>
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-2">
          We deliver exceptional value through our unique approach to technology, 
          blending speed, expertise, and measurable outcomes.
        </p>
      </div>

      {/* --- UPPER GRID: ADVANTAGE CARDS (Row 1) --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
        {advantages.map((advantage, index) => (
          <div 
            key={index}
            className="group relative h-full w-full opacity-0 animate-slideUp"
            style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
          >
            <div className="relative h-full flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#0a0f1d] border border-slate-800 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <advantage.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="relative z-10 text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{advantage.title}</h3>
              <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-6">{advantage.description}</p>
              <div className="relative z-10 h-1 w-12 bg-slate-700 rounded-full group-hover:w-24 group-hover:bg-blue-500 transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* --- LOWER GRID: DUAL ENGINE PILLARS (Row 2) --- */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch justify-center">

        {/* CARD 1: INFRASTRUCTURE */}
        <div className="group relative flex flex-col p-8 sm:p-10 rounded-[2.5rem] bg-[#0a0f1d] border border-slate-800 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)] w-full lg:w-1/2 overflow-hidden">
          
          {/* 1. ANIMATED GRID BACKGROUND (Visible on hover) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* 2. FLOATING AMBIENT GLOW */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700" />

          {/* 3. TECH CORNER ACCENTS */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-8 right-8 w-full h-[1px] bg-cyan-500/0 group-hover:bg-cyan-500/40 transition-all duration-700" />
            <div className="absolute top-8 right-8 h-full w-[1px] bg-cyan-500/0 group-hover:bg-cyan-500/40 transition-all duration-700" />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform duration-500">
                <Layers size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Pillar 01</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Infrastructure Evolution</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">From legacy modernization to cloud-native scaling. We engineer robust digital foundations required for next-generation enterprise performance.</p>
            
            <ul className="space-y-3 mb-10">
              {["Next-Gen App Modernization", "Scalable API & Custom Integrations", "Cyber Security & Resilience", "Hybrid Cloud & Data Warehousing"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300 group/item">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                  {item}
                </li>
              ))}
            </ul>

            {/* DECORATIVE DATA STREAM (CSS Animation) */}
            <div className="mt-auto flex gap-1 mb-8">
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i} 
                        className="h-1 w-full bg-slate-800 rounded-full overflow-hidden"
                    >
                        <div 
                            className="h-full bg-cyan-500 animate-data-stream" 
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-8">
              <button onClick={() => navigate("/services/software-development")} className="group/btn relative inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-black tracking-[0.15em] bg-white text-black transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                EXPLORE ECOSYSTEM <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* CARD 2: INTELLIGENCE */}
        <div className="group relative flex flex-col p-8 sm:p-10 rounded-[2.5rem] bg-[#0a0f1d] border border-slate-800 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.2)] w-full lg:w-1/2 overflow-hidden">
          
          {/* 1. RADIAL BEAM EFFECT (Visible on hover) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.06), transparent 40%)`
            }}
          />

          {/* 2. FLOATING AMBIENT GLOW */}
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-all duration-700" />

          {/* 3. INTELLIGENCE "NODES" BACKGROUND */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-1 h-1 bg-purple-500 rounded-full animate-ping opacity-0 group-hover:opacity-40" />
            <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-ping delay-500 opacity-0 group-hover:opacity-40" />
            <div className="absolute bottom-20 right-10 w-1 h-1 bg-purple-500 rounded-full animate-ping delay-1000 opacity-0 group-hover:opacity-40" />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform duration-500">
                <Zap size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Pillar 02</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Intelligent Automation</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">Moving beyond simple analytics. We deploy Gen-AI agents and predictive models that actively automate decision-making and unlock non-linear growth.</p>
            
            <ul className="space-y-3 mb-10">
              {["Generative AI & RAG Engines", "Autonomous AI Agent Workforces", "Predictive ML & Analytics", "Voice & Conversational Intelligence"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300 group/item">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                  {item}
                </li>
              ))}
            </ul>

            {/* PULSING BRAIN-WAVE VISUAL (CSS Only) */}
            <div className="mt-auto h-12 flex items-center justify-center gap-1 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-1 bg-purple-500/50 rounded-full animate-wave" 
                        style={{ 
                            height: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.1}s` 
                        }}
                    />
                ))}
            </div>

            <div className="mt-auto pt-8">
              <button onClick={() => navigate("/services/autonomous-ai-agents")} className="group/btn relative inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-black tracking-[0.15em] bg-white text-black transition-all hover:bg-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                DISCOVER SOLUTIONS <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes data-stream {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes wave {
            0%, 100% { height: 20%; }
            50% { height: 100%; }
          }
          .animate-data-stream {
            animation: data-stream 2s infinite linear;
          }
          .animate-wave {
            animation: wave 1.5s infinite ease-in-out;
          }
        `}</style>

      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

// Testimonials Section

const testimonials = [
  {
    quote: "1TecHub transformed our workflow completely. We've seen a 40% boost in productivity. The AI agents understand our needs and deliver results that exceed expectations.",
    author: "Sarah Jenkins",
    role: "CTO, FinTech Solutions",
    initials: "SJ",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    quote: "The level of automation and insight we achieved was unparalleled. ROI came faster than we anticipated. The team's expertise made our digital transformation seamless.",
    author: "Michael Torres",
    role: "VP Operations, Global Retail",
    initials: "MT",
    gradient: "from-blue-400 to-violet-500"
  },
  {
    quote: "We're truly ahead. AI solutions saved us countless hours. The real-time analytics have given us a competitive edge we never thought possible before partnering with 1TecHub.",
    author: "Linda Stevens",
    role: "Head of Digital, HealthCorp",
    initials: "LS",
    gradient: "from-violet-400 to-fuchsia-500"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      {/* Top Divider Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50" />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-300 uppercase">Success Stories</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Industry Leaders</span>
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            See how forward-thinking enterprises are redefining their industries 
            with our autonomous AI solutions.
          </p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} {...item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, author, role, initials, gradient, index }) => {
  return (
    <div 
      className="group relative h-full animate-fadeIn"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="
        relative h-full flex flex-col
        p-6 sm:p-8 rounded-2xl
        bg-[#0a0f1d]/80 backdrop-blur-sm 
        border border-slate-800/60
        transition-all duration-300 ease-out
        
        hover:-translate-y-1 
        hover:border-cyan-500/30
        hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.15)]
      ">
        
        {/* Large Background Quote Icon */}
        <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <Quote size={64} className="text-slate-400 fill-slate-400" />
        </div>

        {/* Quote Content */}
        <div className="relative z-10 flex-grow">
          <Quote size={24} className="text-cyan-500 mb-4 opacity-80" />
          
          <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed mb-8">
            "{quote}"
          </p>
        </div>

        {/* Author Footer */}
        <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-slate-800/50 group-hover:border-slate-700/50 transition-colors">
          
          {/* Avatar Placeholder */}
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center 
            text-sm font-bold text-white shadow-lg
            bg-gradient-to-br ${gradient}
          `}>
            {initials}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
              {author}
            </span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              {role}
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};


const Home = () => {

  const location = useLocation();

  useEffect(() => {
    // Check if we arrived here with the scroll flag
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // We add a slight delay to ensure the page has fully rendered 
        // especially if you have images loading or animations
        const timeout = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Clear the state so it doesn't scroll again on refresh
          window.history.replaceState({}, document.title);
        }, 100); 
        
        return () => clearTimeout(timeout);
      }
    }
  }, [location]);

  return (
    <div
      className="
        bg-[#020617]
        fixed top-0 left-0 w-full h-full
        overflow-y-scroll overflow-x-hidden
      "
    >
      {/* UNIFIED GRADIENT BACKGROUND SYSTEM - Spans all sections */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Large flowing cyan blob - moves from top-left to bottom-right */}
        <div 
          className="absolute w-[800px] h-[800px] bg-cyan-500/15 rounded-full blur-[150px]"
          style={{
            left: '-20%',
            top: '-10%',
            animation: 'flowGradient1 20s ease-in-out infinite'
          }}
        />
        
        {/* Large flowing blue blob - moves from bottom-right to top-left */}
        <div 
          className="absolute w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[150px]"
          style={{
            right: '-10%',
            bottom: '-20%',
            animation: 'flowGradient2 24s ease-in-out infinite'
          }}
        />
        
        {/* Secondary cyan accent - continuous presence */}
        <div 
          className="absolute w-[600px] h-[600px] bg-cyan-400/12 rounded-full blur-[120px]"
          style={{
            left: '30%',
            top: '50%',
            animation: 'flowGradient3 28s ease-in-out infinite'
          }}
        />

        {/* Radial Gradient Mask - Center strength, easing off at edges */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.25) 0%, rgba(96, 165, 250, 0.15) 30%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />
      </div>
      <Navbar />
      <style>{`
        @keyframes flowGradient1 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(100px, 150px); }
          50% { transform: translate(150px, 300px); }
          75% { transform: translate(50px, 150px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes flowGradient2 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-100px, -150px); }
          50% { transform: translate(-150px, -300px); }
          75% { transform: translate(-50px, -150px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes flowGradient3 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(100px, -100px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>

      

      {/* Intro Section */}
      <IntroSection />
    
      <ImpactShowcase />

      <CapabilitiesSection />

      <CombinedWhyChooseUs />

      <TestimonialsSection />

      <section className="relative w-full py-5 bg-transparent overflow-hidden border-t border-slate-800/50">
        <div className="w-full md:w-3/4 lg:w-1/2 py-12 md:py-24 px-4 md:px-6 flex flex-col justify-center items-center mx-auto relative z-10">
          <MessageForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;