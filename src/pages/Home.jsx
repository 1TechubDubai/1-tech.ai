import Intro from "../Buttons/Intro";
import Navbar from "../components/Navbar";
import IntroStar from "../assets/starIntro.svg";
import IntroArrow from "../assets/arrowIntro.svg";
import Stat from "../components/Stat";
import Ribbon from "../assets/Ribbon.svg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
import React, {useEffect } from 'react';
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
  CheckCircle2
} from 'lucide-react';

import speed from "../assets/speed.svg";
import partnership from "../assets/partnership.svg";
import results from "../assets/results.svg";

import tick from "../assets/tick.svg";
import seamless from "../assets/seamlessInt.svg";
import analytics from "../assets/analytics.svg";

import quotes from "../assets/quotes.svg";
import MessageForm from "../components/MessageForm";

// Intro Section

const IntroSection = () => {
  const canvasRef = useRef(null);

  // --- CANVAS ANIMATION LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Configuration
    const particleCount = window.innerWidth < 768 ? 50 : 100; // Increased count
    const connectionDistance = 180; // Increased distance for more webs
    const mouseDistance = 250;
    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8; // Faster movement
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2.5 + 1.5; // Larger particles
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
        ctx.fillStyle = '#00B8DB';
        ctx.shadowBlur = 10; // Glow effect
        ctx.shadowColor = '#00B8DB';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
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
            // Brighter lines
            ctx.strokeStyle = `rgba(0, 184, 219, ${1 - distance / connectionDistance})`; 
            ctx.lineWidth = 0.8; // Thicker lines
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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="lg:pt-20 sm:mt-0 min-h-screen relative flex flex-col items-center justify-center px-4 sm:px-6 py-20 overflow-hidden bg-[#020617]">
      
      {/* --- BACKGROUND CONTAINER with MASK --- */}
      {/* This mask-image makes the edges transparent */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
           maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
           WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)'
        }}
      >
        {/* Canvas Background (Now inside the mask) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

        {/* Glow Effects (Inside mask to fade edges too) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] md:w-[600px] h-[350px] sm:h-[500px] md:h-[600px] bg-cyan-500/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-600/20 blur-[100px] rounded-full" style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-cyan-400/20 blur-[100px] rounded-full" style={{ animation: 'float 10s ease-in-out infinite reverse' }} />

        {/* Tech Lines */}
        <div className="absolute top-32 right-20 w-40 h-40 opacity-50" style={{ background: 'linear-gradient(135deg, transparent 48%, #00B8DB 49%, #00B8DB 51%, transparent 52%)', animation: 'slideIn 4s ease-out forwards', animationDelay: '0.3s' }} />
        <div className="absolute bottom-32 left-20 w-40 h-40 opacity-50" style={{ background: 'linear-gradient(45deg, transparent 48%, #00B8DB 49%, #00B8DB 51%, transparent 52%)', animation: 'slideIn 4s ease-out forwards reverse', animationDelay: '0.5s' }} />
      </div>

      {/* --- CONTENT SECTION (Above the mask) --- */}
      <div className="text-center max-w-5xl relative z-10 mt-10">
        <h1 className="tracking-tight leading-[1.1]">
          <span 
            className="block text-4xl sm:text-5xl md:text-7xl text-white opacity-0"
            style={{ animation: 'slideUp 0.8s ease-out forwards' }}
          >
            Technology
          </span>

          <span 
            className="
              block text-5xl sm:text-6xl md:text-8xl pb-2
              bg-gradient-to-r from-[#00B8DB] via-blue-400 to-[#00B8DB]
              bg-[length:200%_auto]
              bg-clip-text text-transparent
              opacity-0
            "
            style={{ 
              animation: 'slideUp 0.8s ease-out 0.2s forwards, gradientFlow 3s linear infinite' 
            }}
          >
            Simplified.
          </span>
        </h1>

        <p className="mt-6 text-xs sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-1 sm:px-2 opacity-0"
           style={{ animation: 'fadeIn 0.8s ease-out 0.6s forwards' }}>
          Orchestrating intelligence for the autonomous age. We transform
          complex business challenges into streamlined digital solutions —
          from cloud infrastructure to AI-powered automation.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 relative z-10 px-2 sm:px-4 opacity-0"
           style={{ animation: 'fadeIn 0.8s ease-out 0.8s forwards' }}>
        <Intro text="Start Your Journey" onClick={() => console.log("Start")} />
        <Intro text="Explore Services" onClick={() => console.log("Explore")} />
      </div>

      <div className="mt-12 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 text-center relative z-10 opacity-0"
           style={{ animation: 'fadeIn 1s ease-out 1s forwards' }}>
        <Stat value="3x" label="Avg. ROI Delivered" desc="Return on investment within the first 12 months" />
        <Stat value="40%" label="OpEx Reduction" desc="Average decrease in operational costs" />
        <Stat value="2x" label="Faster Time-to-Market" desc="Accelerated product delivery using AI" />
        <Stat value="95%" label="Client Retention" desc="Long-term partnerships driven by consistent value" />
      </div>

      <style>{`
        @keyframes gradientFlow { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
        @keyframes slideIn { from { transform: translateX(-50px) translateY(-50px) rotate(-45deg); opacity: 0; } to { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0.3; } }
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
    title: "Software Engineering",
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
    <section className="relative w-full py-24 bg-transparent overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">Core Capabilities</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">AI Solutions</span>
          </h2>
          
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade technologies engineered to transform operations, 
            drive automation, and unlock new value streams.
          </p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((item, index) => (
            <CapabilityCard key={index} {...item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};
const CapabilityCard = ({ title, description, accent, slug, icon: Icon, index }) => {
  return (
    <Link 
      to={`/services/${slug}`}
      className="group relative block h-full"
    >
      <div 
        className="
          relative h-full
          p-8 rounded-3xl
          bg-[#0a0f1d] border border-slate-800
          transition-all duration-500 ease-out
          group-hover:-translate-y-2
          group-hover:border-transparent
          group-hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
          overflow-hidden
        "
      >
        {/* Hover Gradient Border Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom right, ${accent}33, transparent, transparent)`
          }}
        />
        
        {/* Glow Spot on Hover */}
        <div 
          className="absolute -right-10 -top-10 w-32 h-32 blur-[60px] rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{ backgroundColor: accent }}
        />

        {/* --- CARD CONTENT --- */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Icon Box */}
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            style={{ 
              backgroundColor: `${accent}15`, 
              color: accent,
              border: `1px solid ${accent}30`
            }}
          >
            <Icon size={28} strokeWidth={1.5} />
          </div>

          <h3 className="text-xl text-left font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-colors">
            {title}
          </h3>

          <p className="text-sm text-left text-slate-400 leading-relaxed mb-8 flex-grow">
            {description}
          </p>

          {/* Learn More Link */}
          <div className="flex items-center text-sm font-bold tracking-wide uppercase" style={{ color: accent }}>
            Learn More
            <svg 
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

        </div>
      </div>
    </Link>
  );
};

// Advantage Section

const Advantages = [
    {
        image: speed,
        title: 'Speed to Market',
        description: 'Launch AI solutions 3x faster with our proven frameworks and pre-built components. Reduce time from concept to production deployment.'
    },
    {
        image: partnership,
        title: 'Expert Partnership',
        description: 'Access a dedicated team of AI specialists, data scientists, and engineers who become an extension of your organization.'
    },
    {
        image: results,
        title: 'Proven Results',
        description: 'Join 300+ enterprises achieving measurable ROI. Average efficiency gains of 40% within the first 6 months.'
    }
]
const AdvantageCard = ({image, title, description, index = 0}) => {
    return (
        <div 
          style={{
            animation: `slideUp 0.6s ease-out forwards`,
            animationDelay: `${index * 0.15}s`,
            opacity: 0
          }}
          className="group relative h-full"
        >
            <div className="
                relative h-full
                flex flex-col items-center text-center
                p-8 sm:p-10
                rounded-3xl
                bg-[#0a0f1d] border border-slate-800
                transition-all duration-500 ease-out
                hover:-translate-y-2
                hover:border-blue-500/30
                hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)]
                overflow-hidden
            ">
                
                {/* Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon Container */}
                <div className="
                    relative z-10 
                    w-20 h-20 sm:w-24 sm:h-24 
                    flex items-center justify-center 
                    mb-4 
                    transition-transform duration-500 
                    group-hover:scale-110 group-hover:rotate-3
                    group-hover:border-blue-500/30
                ">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full sm:w-full sm:h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                </div>

                <h3 className="relative z-10 text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {title}
                </h3>
                
                <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {description}
                </p>

                {/* Bottom Accent Line */}
                <div className="relative z-10 h-1 w-12 bg-slate-700 rounded-full group-hover:w-24 group-hover:bg-blue-500 transition-all duration-500" />
            </div>
        </div>
    )
}
const AdvantageSection = () => {
    return(
        <section className="relative w-full py-10 px-40 bg-transparent overflow-hidden">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">Why Choose Us</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">1TechHub?</span>
                    </h2>
                    
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        We deliver exceptional value through our unique approach to AI, 
                        blending speed, expertise, and measurable outcomes.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Advantages.map((advantage, index) => (
                        <AdvantageCard key={index} {...advantage} index={index} />
                    ))}
                </div>
        </section>
    )
}
const FeatureCardsSection = () => {
  return (
    <section className="relative w-full py-24 bg-transparent overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10 items-stretch justify-center">
        
        {/* --- CARD 1: Seamless Integration --- */}
        <div className="
          group relative
          flex flex-col
          p-10 rounded-3xl
          bg-[#0a0f1d] border border-slate-800
          transition-all duration-500 ease-out
          hover:-translate-y-2
          hover:border-cyan-500/50
          hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)]
          max-w-xl w-full mx-auto
          overflow-hidden
        ">
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                Seamless Integration
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Deploy AI agents that integrate effortlessly with your existing
                infrastructure. No complex migrations, no downtime—just powerful AI
                capabilities added to your current workflows.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Connect to 50+ enterprise platforms",
                  "Zero-code integration options",
                  "API-first architecture",
                  "Real-time synchronization"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {/* Image Area */}
              <div className="mt-10 relative">
                 <img
                  src={seamless}
                  alt="Integration Dashboard"
                  className="w-full h-auto object-contain rounded-lg opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Button Container - Pushes to bottom */}
              <div className="mt-auto pt-6">
                <Link
                  to="/services"
                  className="
                    inline-flex items-center justify-center
                    px-8 py-3
                    rounded-full text-sm font-bold tracking-wide
                    bg-cyan-500 text-black
                    transition-all duration-300
                    hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:-translate-y-0.5
                    active:translate-y-0
                  "
                >
                  View Integrations →
                </Link>
              </div>


            </div>
        </div>

        {/* --- CARD 2: Real-Time Insights --- */}
        <div className="
          group relative
          flex flex-col
          p-10 rounded-3xl
          bg-[#0a0f1d] border border-slate-800
          transition-all duration-500 ease-out
          hover:-translate-y-2
          hover:border-blue-500/50
          hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.2)]
          max-w-xl w-full mx-auto
          overflow-hidden
        ">
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                Real-Time Insights
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Monitor all your AI processes with enterprise-grade analytics and
                insights. Track data flow and agent performance in real time with
                a clean, readable interface.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Live performance monitoring",
                  "Custom KPI tracking",
                  "Automated reporting",
                  "Predictive analytics"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 relative">
                 <img
                  src={analytics}
                  alt="Analytics Dashboard"
                  className="w-full h-auto object-contain rounded-lg opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              {/* Button Container - Pushes to bottom */}
              <div className="mt-auto pt-6">
                <Link
                  to="/services"
                  className="
                    inline-flex items-center justify-center
                    px-8 py-3
                    rounded-full text-sm font-bold tracking-wide
                    bg-blue-600 text-white
                    transition-all duration-300
                    hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-0.5
                    active:translate-y-0
                  "
                >
                  Explore Analytics →
                </Link>
              </div>

              {/* Image Area */}

            </div>
        </div>

      </div>
    </section>
  );
};

const Home = () => {

  return (
    <div
      className="
        bg-[#020617]
        fixed top-0 left-0 w-full h-full
        overflow-y-scroll overflow-x-hidden
        font-[Arial]
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

      <Navbar />

      {/* Intro Section */}
      <IntroSection />
    
      <ImpactShowcase />

      <CapabilitiesSection />

      <AdvantageSection />
      
      <FeatureCardsSection />

      <section className="relative w-full py-12 bg-transparent overflow-hidden border-t border-slate-800/50">
        <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-white">
            Trusted by Industry Leaders
          </h1>
          <p className="text-center text-gray-400 mt-4 text-sm md:text-base">
            See what our clients say about transforming their businesses with AI
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {/* Testimonial 1 */}
          <div className="group relative p-8 rounded-2xl bg-black/50 backdrop-blur-md border border-[#00B8DB]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00B8DB] hover:shadow-[0_0_30px_rgba(0,184,219,0.35)]">
            <img src={quotes} className="w-10 h-10 opacity-70 mb-4 group-hover:opacity-100 transition-opacity" alt="quote" />
            <p className="text-center italic text-gray-300 text-sm leading-relaxed mb-6">
              "1TechHub transformed our workflow completely. We've seen a 40% boost in productivity. The AI agents understand our needs and deliver results that exceed expectations."
            </p>
            <div className="text-center">
              <span className="text-sm font-semibold text-white block">Sarah L.</span>
              <span className="text-xs text-gray-400">CTO of FinTech Solutions</span>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="group relative p-8 rounded-2xl bg-black/50 backdrop-blur-md border border-[#00B8DB]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00B8DB] hover:shadow-[0_0_30px_rgba(0,184,219,0.35)]">
            <img src={quotes} className="w-10 h-10 opacity-70 mb-4 group-hover:opacity-100 transition-opacity" alt="quote" />
            <p className="text-center italic text-gray-300 text-sm leading-relaxed mb-6">
              "The level of automation and insight we achieved was unparalleled. ROI came faster than we anticipated. The team's expertise made our digital transformation seamless."
            </p>
            <div className="text-center">
              <span className="text-sm font-semibold text-white block">Michael T.</span>
              <span className="text-xs text-gray-400">VP of Operations at Global Retail</span>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="group relative p-8 rounded-2xl bg-black/50 backdrop-blur-md border border-[#00B8DB]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00B8DB] hover:shadow-[0_0_30px_rgba(0,184,219,0.35)]">
            <img src={quotes} className="w-10 h-10 opacity-70 mb-4 group-hover:opacity-100 transition-opacity" alt="quote" />
            <p className="text-center italic text-gray-300 text-sm leading-relaxed mb-6">
              "We're truly ahead. AI solutions saved us countless hours. The real-time analytics have given us a competitive edge we never thought possible before partnering with 1TechHub."
            </p>
            <div className="text-center">
              <span className="text-sm font-semibold text-white block">Linda S.</span>
              <span className="text-xs text-gray-400">Head of Digital at HealthCorp</span>
            </div>
          </div>
        </div>
      </section>

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