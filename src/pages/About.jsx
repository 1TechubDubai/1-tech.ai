import Navbar from "../components/Navbar";
import one from "../assets/about1.svg";
import two from "../assets/about2.svg";
import three from "../assets/about3.svg";
import earth from "../assets/earth.svg";
import coreSp from "../assets/coreSp.svg";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Globe, ArrowRight, Zap, Check, ShieldAlert, Linkedin, Mail } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const Card = ({ title, description, image, index = 0 }) => (
  <div
    style={{
      animation: `slideUp 0.6s ease-out forwards`,
      animationDelay: `${index * 0.1}s`,
      opacity: 0
    }}
    className="
      group relative
      bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md
      p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl
      border border-cyan-400/30
      transition-all duration-300 ease-out
      hover:scale-105
      hover:border-cyan-400/60
      hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]
      h-full
    "
  >
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-transparent via-transparent to-cyan-500/0 group-hover:to-cyan-500/10 transition-all duration-300 pointer-events-none" />
    
    {/* Icon / Image */}
    <div
      className="
        relative z-10
        w-10 sm:w-11 md:w-12
        h-10 sm:h-11 md:h-12
        rounded-lg sm:rounded-xl
        flex items-center justify-center
        bg-gradient-to-br from-cyan-500/30 to-cyan-500/10
        mb-4 sm:mb-5
        transition-transform duration-300
        group-hover:scale-125
        border border-cyan-500/20
      "
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-contain"
      />
    </div>

    {/* Title */}
    <h3 className="text-left relative z-10 text-base sm:text-lg md:text-lg font-semibold text-white tracking-tight group-hover:text-cyan-200 transition-colors mb-2 sm:mb-3">
      {title}
    </h3>

    {/* Description */}
    <p className="text-left relative z-10 text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
      {description}
    </p>
  </div>
);

const GlobalBridge = ({ earth }) => {
  const objectives = [
    "Closing the regional AI adoption gap",
    "Tailored solutions for Global Innovators",
    "Localization of world-class LLM models",
    "Empowering industries with global-tier tech"
  ];

  // Reusable component for the highly animated globe to keep code DRY for mobile/desktop
  const AnimatedGlobe = () => (
    <div className="relative w-full max-w-[280px] lg:max-w-none mx-auto globe-container">
      
      {/* --- 3D ORBITAL RINGS & DATA NODES --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="orbital-ring ring-1">
          <div className="orbit-node node-cyan" />
        </div>
        <div className="orbital-ring ring-2">
          <div className="orbit-node node-blue" />
        </div>
        <div className="orbital-ring ring-3" />
      </div>

      {/* --- SHOOTING STARS / COMETS --- */}
      <div className="star-container">
        <div className="shooting-star ss-1" />
        <div className="shooting-star ss-2" />
        <div className="shooting-star ss-3" />
        <div className="shooting-star ss-4" />
        <div className="shooting-star ss-5" />
      </div>

      {/* --- GLOBE ITSELF --- */}
      <div className="relative z-10 animate-float">
        {earth ? (
          <div className="relative group">
            {/* Ambient core glow behind the globe */}
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[40px] group-hover:bg-cyan-400/30 group-hover:blur-[60px] transition-all duration-700" />
            
            <img
              src={earth}
              alt="Global Adoption Bridge"
              className="relative w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(6,182,212,0.4)] opacity-90 group-hover:opacity-100 group-hover:drop-shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all duration-700 z-10"
            />
            
            {/* Surface Data Pulses (clipping to globe area) */}
            <div className="absolute inset-2 overflow-hidden rounded-full z-20">
              <div className="surface-pulse sp-1" />
              <div className="surface-pulse sp-2" />
              <div className="surface-pulse sp-3" />
            </div>
          </div>
        ) : (
          <div className="w-full aspect-square rounded-full bg-slate-900/50 border border-slate-700/50 flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.2)]">
            <Globe className="w-16 h-16 lg:w-20 lg:h-20 text-cyan-500 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#020617]">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.08),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ─── LEFT / MAIN TEXT COLUMN ─── */}
          <div className="w-full space-y-6 lg:space-y-8 order-1 text-center lg:text-left">

            {/* Status Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative inline-flex items-center justify-center px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300">
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 animate-pulse mr-2" />
                Bridging the Tech Divide
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight text-left">
                World-Class AI. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-sm">
                  Localized for Impact.
                </span>
              </h2>

              <p className="text-xs sm:text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 text-left">
                While tech leaders in developed markets race ahead with AI adoption, emerging economies struggle with access and expertise gaps.{' '}
                <span className="text-cyan-50 font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">1TecHub bridges that divide.</span>{' '}
                We democratize enterprise-grade AI, bringing sophisticated intelligence to innovators in overlooked markets—ensuring no region is left behind.
              </p>
            </div>

            {/* ── Globe visual — MOBILE ONLY ── */}
            <div className="block lg:hidden w-full py-8">
              <AnimatedGlobe />
            </div>

            {/* Mission Objectives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto lg:mx-0">
              {objectives.map((point, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 p-3 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <Check className="w-4 h-4 text-cyan-400" strokeWidth={3} />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300 font-bold leading-tight group-hover:text-white transition-colors">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="pt-2">
              <Link to="/contact"
                className="w-full sm:w-auto inline-flex px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg text-white hover:text-black bg-slate-900/50 border-cyan-400 border-2 hover:bg-cyan-400 items-center justify-center gap-2 group backdrop-blur-md transition-colors"
                style={{
                  boxShadow: '0 10px 30px rgba(34,211,238,0.2), inset 0 0 20px rgba(34,211,238,0.1)',
                }}>
                <Zap className="w-5 h-5 text-cyan-400 group-hover:text-black transition-colors" />
                <span>Get Your AI Roadmap</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* ─── RIGHT / GLOBE COLUMN — DESKTOP ONLY ─── */}
          <div className="hidden lg:flex w-full relative order-2 items-center justify-center">
            <AnimatedGlobe />
          </div>

        </div>
      </div>

      <style>{`
        /* --- GLOBE & 3D ENVIRONMENT --- */
        .globe-container {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        
        /* Floating Globe Image */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* --- 3D ORBITAL RINGS --- */
        .orbital-ring {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(6, 182, 212, 0.15);
          box-shadow: inset 0 0 20px rgba(6, 182, 212, 0.05), 0 0 15px rgba(6,182,212,0.1);
          transform-style: preserve-3d;
        }
        .ring-1 {
          width: 140%; height: 140%;
          margin-left: -70%; margin-top: -70%;
          border-top: 2px solid rgba(59, 130, 246, 0.6);
          border-right: 2px solid transparent;
          animation: spin-3d-1 20s linear infinite;
        }
        .ring-2 {
          width: 115%; height: 115%;
          margin-left: -57.5%; margin-top: -57.5%;
          border-bottom: 2px solid rgba(6, 182, 212, 0.7);
          border-left: 2px solid transparent;
          animation: spin-3d-2 15s linear infinite reverse;
        }
        .ring-3 {
          width: 90%; height: 90%;
          margin-left: -45%; margin-top: -45%;
          border: 1px dashed rgba(99, 102, 241, 0.3);
          animation: spin-flat 30s linear infinite;
        }

        /* Nodes attached to rings */
        .orbit-node {
          position: absolute;
          top: 0; left: 50%;
          width: 10px; height: 10px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .node-cyan { background: #fff; box-shadow: 0 0 20px 4px #06b6d4, 0 0 40px 8px #06b6d4; }
        .node-blue { background: #fff; box-shadow: 0 0 20px 4px #3b82f6, 0 0 40px 8px #3b82f6; }

        @keyframes spin-3d-1 {
          0% { transform: rotateX(70deg) rotateY(15deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateY(15deg) rotateZ(360deg); }
        }
        @keyframes spin-3d-2 {
          0% { transform: rotateX(55deg) rotateY(-25deg) rotateZ(0deg); }
          100% { transform: rotateX(55deg) rotateY(-25deg) rotateZ(360deg); }
        }
        @keyframes spin-flat {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(360deg); }
        }

        /* --- PROMINENT SHOOTING STARS --- */
        .star-container {
          position: absolute;
          inset: -40%;
          pointer-events: none;
          z-index: 30;
          overflow: visible;
        }
        .shooting-star {
          position: absolute;
          width: 4px; height: 4px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 15px 3px #fff, 0 0 30px 6px #06b6d4;
          opacity: 0;
        }
        .shooting-star::after {
          content: '';
          position: absolute;
          top: 50%; right: 100%;
          transform: translateY(-50%);
          width: 180px; height: 2px;
          background: linear-gradient(to left, rgba(255,255,255,1), rgba(6,182,212,0.8), transparent);
        }

        /* Angles and timings for heavy animation feel */
        .ss-1 { top: 15%; left: 0%; transform: rotate(15deg); animation: shoot 3.5s infinite 0.5s ease-in; }
        .ss-2 { top: 40%; left: -10%; transform: rotate(25deg); animation: shoot 4.2s infinite 2.2s ease-in; }
        .ss-3 { top: 70%; left: 0%; transform: rotate(-10deg); animation: shoot 5s infinite 1.5s ease-in; }
        .ss-4 { top: 25%; left: 80%; transform: rotate(160deg); animation: shoot 4s infinite 3s ease-in; }
        .ss-5 { top: 65%; left: 90%; transform: rotate(195deg); animation: shoot 4.8s infinite 0.8s ease-in; }

        @keyframes shoot {
          0% { transform: translateX(-50px) scale(0); opacity: 0; }
          10% { opacity: 1; transform: translateX(20px) scale(1); }
          70% { opacity: 1; transform: translateX(450px) scale(1.2); }
          100% { transform: translateX(600px) scale(0.2); opacity: 0; }
        }

        /* --- SURFACE DATA PULSES (Clipping inside the globe) --- */
        .surface-pulse {
          position: absolute;
          width: 6px; height: 6px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 10px #06b6d4;
          opacity: 0;
        }
        .sp-1 { top: 30%; left: 40%; animation: pulse-node 4s infinite 1s; }
        .sp-2 { top: 60%; left: 70%; animation: pulse-node 5s infinite 3s; }
        .sp-3 { top: 45%; left: 20%; animation: pulse-node 4.5s infinite 0.5s; }

        @keyframes pulse-node {
          0% { transform: scale(0.5); opacity: 0; box-shadow: 0 0 0 0 rgba(6,182,212,0.8); }
          30% { transform: scale(1); opacity: 1; box-shadow: 0 0 15px 5px rgba(6,182,212,0.4); }
          70% { transform: scale(1); opacity: 1; box-shadow: 0 0 30px 10px rgba(6,182,212,0); }
          100% { transform: scale(0.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

const CoreSpecializations = ({ image }) => {
  const navigate = useNavigate();
  const items = [
    "Enterprise IT Managed Services",
    "Strategic Technology Talent Solutions",
    "Intelligent AI, Agents & Analytics",
    "Cyber Security Services & Solutions",
    "Next-Gen Web & App Modernization",
    "API, Integrations & Customizations",
    "Enterprise Go To Market Strategies",
    "Market Expansion Services"
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#020617]">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0A0E1F] to-[#020617] pointer-events-none -z-20" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center relative z-10">

        {/* --- LEFT COLUMN: TEXT --- */}
        {/* Mobile: order-1 (top). Desktop: order-1 (left) */}
        <div className="w-full relative order-1 text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/30 mb-5 sm:mb-6 hover:border-cyan-400/50 transition-colors backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-cyan-300 uppercase">
              Core Specializations
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
            End-to-end capabilities <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              driving transformation.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 max-w-lg leading-relaxed">
            We merge autonomous intelligence with robust infrastructure to help enterprises scale efficiently and securely.
          </p>

          {/* ── Image — MOBILE ONLY (between description and list) ── */}
          <div className="block lg:hidden w-full mb-6">
            <div className="relative rounded-2xl bg-[#0a0f1d] border border-slate-800/80 p-1 shadow-2xl overflow-hidden group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse-slow" />
              {coreSp ? (
                <>
                  <img
                    src={coreSp}
                    alt="Core Specializations"
                    className="relative w-full h-auto max-h-[220px] object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/70 to-transparent" />
                </>
              ) : (
                <div className="w-full aspect-[4/3] bg-slate-900 rounded-xl flex flex-col items-center justify-center text-slate-500 border border-slate-800">
                  <Zap className="w-10 h-10 mb-3 text-slate-600" />
                  <span className="text-xs uppercase tracking-widest">Image Placeholder</span>
                </div>
              )}
            </div>
          </div>

          {/* Feature List */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8 sm:mb-10">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 group p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="mt-0.5 min-w-[18px]">
                  <Check className="w-4 h-4 text-cyan-500 group-hover:text-cyan-300 transition-colors" strokeWidth={3} />
                </div>
                <span className="text-slate-300 text-sm font-medium leading-snug group-hover:text-white transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} className="w-full">
            <button 
              onClick={() => navigate("/", { state: { scrollTo: 'capabilities' } })}
              className="w-full sm:w-auto text-center px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg text-white hover:text-black bg-transparent border-cyan-400 border-2 hover:bg-cyan-400 flex items-center justify-center gap-2"
              style={{
                boxShadow:'0 10px 30px rgba(34,211,238,0.12)',
              }}>
              <span>Discover All Solutions</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* --- RIGHT COLUMN: IMAGE — DESKTOP ONLY --- */}
        <div className="hidden lg:block w-full relative order-2 perspective-1000 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse-slow" />
          <div className="relative rounded-2xl bg-[#0a0f1d] border border-slate-800/80 p-2 shadow-2xl overflow-hidden">
            {coreSp ? (
              <img
                src={coreSp}
                alt="Core Specializations"
                className="w-full h-auto object-contain rounded-xl transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-slate-900 rounded-xl flex flex-col items-center justify-center text-slate-500 border border-slate-800">
                <Zap className="w-12 h-12 mb-3 text-slate-600" />
                <span className="text-xs uppercase tracking-widest">Image Placeholder</span>
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

const LeadershipTeam = () => {
  const team = [
    {
      name: "Sarah Al-Rahman",
      role: "Chief AI Officer & Co-Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop", // Professional placeholder
      theme: "cyan", 
      gradient: "from-cyan-400 to-blue-500",
      glow: "shadow-[0_0_50px_rgba(34,211,238,0.4)]"
    },
    {
      name: "Hiromi Chen",
      role: "Head of Strategy & Operations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      theme: "purple",
      gradient: "from-purple-400 to-pink-500",
      glow: "shadow-[0_0_50px_rgba(192,132,252,0.4)]"
    },
    {
      name: "Ahmed Khalifa",
      role: "VP Engineering & Architecture",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      theme: "emerald",
      gradient: "from-emerald-400 to-green-500",
      glow: "shadow-[0_0_50px_rgba(52,211,153,0.4)]"
    }
  ];

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      
      {/* Gradient Background with Fade-out */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1F]/40 via-transparent to-transparent pointer-events-none -z-10" />
      
      {/* Background Decor: Subtle grid or glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-10 left-1/4 w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 bg-blue-500/15 rounded-full blur-[80px] sm:blur-[100px] animate-float-slow" />
         <div className="absolute bottom-10 right-1/4 w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 bg-purple-500/15 rounded-full blur-[80px] sm:blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
         <div className="absolute top-1/3 right-1/3 w-48 sm:w-64 md:w-72 lg:w-80 h-48 sm:h-64 md:h-72 lg:h-80 bg-cyan-500/10 rounded-full blur-[60px] sm:blur-[80px] animate-float-slow" style={{ animationDelay: '2s', animationDirection: 'reverse' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 space-y-3 sm:space-y-4 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Leadership Team
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
            Meet the strategic minds and technical experts steering our global AI initiatives.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {team.map((member, index) => (
            <div key={index} className="group flex flex-col items-center text-center" style={{ animation: `slideUp 0.6s ease-out ${index * 0.1}s both` }}>
              
              {/* Image Container with Glow */}
              <div className="relative mb-6 sm:mb-8">
                {/* The Glow Effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${member.gradient} blur-lg sm:blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-glow`}></div>
                
                {/* The Image Border Ring */}
                <div className={`relative p-0.5 sm:p-1 rounded-full bg-gradient-to-tr ${member.gradient}`}>
                   <div className="bg-[#020617] p-0.5 sm:p-1 rounded-full">
                     <img 
                       src={member.image} 
                       alt={member.name}
                       className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                     />
                   </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2 sm:space-y-3 px-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                  {member.name}
                </h3>
                
                {/* Dynamic Text Color based on theme */}
                <p className={`text-xs sm:text-sm font-medium tracking-wide uppercase bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent opacity-90`}>
                  {member.role}
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                <SocialButton icon={Linkedin} gradient={member.gradient} />
                <SocialButton icon={Mail} gradient={member.gradient} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialButton = ({ icon: Icon, gradient }) => (
  <button className="relative group/btn p-2 sm:p-3 rounded-full overflow-hidden transition-all duration-300">
    {/* Button Background (Hidden by default, shown on hover) */}
    <div className={`absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-gradient-to-tr ${gradient} transition-opacity duration-300`}></div>
    
    <Icon size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover/btn:text-white transition-colors relative z-10" />
    
    {/* Subtle Border */}
    <div className="absolute inset-0 rounded-full border border-slate-700 group-hover/btn:border-transparent transition-colors"></div>
  </button>
);

// --- ANIMATION SUB-COMPONENT ---
const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Track mouse position for interactive connections
    let mouse = { x: null, y: null };

    const isMobile = window.innerWidth < 768;

    // --- UPDATED CONFIGURATION ---
    const config = {
      particleColor: '255, 255, 255', 
      lineColor: '6, 182, 212',       
      // 1. INCREASED DENSITY: More particles to make the network look fuller
      particleCount: isMobile ? 50 : 130, 
      // 2. LONGER REACH: Allows lines to stretch further, creating complex webs
      connectionDistance: isMobile ? 130 : 190, 
      // 3. SLIGHTLY FASTER: Gives it a bit more kinetic energy
      baseSpeed: isMobile ? 0.25 : 0.4, 
      // 4. BIGGER PARTICLES: Makes the glowing nodes much more visible
      sizeRange: isMobile ? { min: 1, max: 2.5 } : { min: 1.5, max: 3.5 }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.baseSpeed;
        this.vy = (Math.random() - 0.5) * config.baseSpeed;
        this.size = Math.random() * (config.sizeRange.max - config.sizeRange.min) + config.sizeRange.min;
        // 5. BRIGHTER BASE OPACITY: Nodes stand out more
        this.opacity = Math.random() * 0.6 + 0.4; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${config.particleColor}, ${this.opacity})`;
        // 6. STRONGER GLOW: Increased shadow blur for a neon effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${config.lineColor}, 1)`;
        ctx.fill();
        ctx.shadowBlur = 0; 
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        // 7. MOUSE INTERACTION: Draw lines from particles to the cursor
        if (mouse.x != null && mouse.y != null) {
          const dxMouse = p1.x - mouse.x;
          const dyMouse = p1.y - mouse.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          // Mouse has a slightly larger gravitational pull/reach
          if (distanceMouse < config.connectionDistance * 1.5) {
            ctx.beginPath();
            const mouseOpacity = 1 - distanceMouse / (config.connectionDistance * 1.5);
            ctx.strokeStyle = `rgba(${config.lineColor}, ${mouseOpacity * 0.8})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Standard particle-to-particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            const opacity = 1 - distance / config.connectionDistance;
            
            ctx.beginPath();
            // 8. THICKER, BRIGHTER LINES: Increased line width and opacity multiplier
            ctx.lineWidth = isMobile ? 0.6 : 1.0; 
            ctx.strokeStyle = `rgba(${config.lineColor}, ${opacity * 0.8})`; 
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Mouse Event Listeners
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles(); 
    });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    
    resizeCanvas();
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // Make sure pointer-events are enabled here so it can detect the mouse!
    <div className="absolute inset-0 z-0 overflow-hidden">
      
      {/* 9. INCREASED CANVAS OPACITY: Changed from opacity-60 to opacity-90 */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-90" 
      />
      
      {/* 10. SOFTER VIGNETTE: Pushed the transparent center out to 20% and made the dark edges slightly softer so they don't swallow the particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,23,0.95)_100%)] pointer-events-none" />
    </div>
  );
};

const About = () => {
  const content1 = [
    {
      title: "GLOBAL GOVERNANCE",
      description: "Our delivery model follows strict global frameworks, ensuring every project is executed with precision and compliance",
      image: three
    },    
    {
      title: "PARTNER ECOSYSTEM",
      description: "We enable global AI and cloud hyperscalers to successfully enter, localize, and scale within regional enterprise markets through proven GTM execution.",
      image: two
    },
    {
      title: "GLOBAL TALENT ENGINE",
      description: "We source, deploy, and govern elite IT professionals from multiple regions, ensuring unmatched expertise and scalability.",
      image: one
    }
  ]

  const points = [
    "Headquartered in UAE's AI hub", 
    "Network of 14+ AI & data partners",
    "Infrastructure delivery timelines"
  ] 

  return (
    <div className="h-full w-full fixed top-0 left-0 text-white overflow-y-scroll bg-[#020617]" style={{ fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Stagger animations for cards */
        .card-stagger-1 { animation: slideUp 0.6s ease-out 0s both; }
        .card-stagger-2 { animation: slideUp 0.6s ease-out 0.1s both; }
        .card-stagger-3 { animation: slideUp 0.6s ease-out 0.2s both; }

        /* Mobile optimization */
        @media (max-width: 640px) {
          body {
            font-size: 14px;
          }
        }
      `}</style>
              <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      ` }} />

      <Navbar />

      {/* --- HERO SECTION WRAPPER --- */}
      <div className="relative pt-24 sm:pt-26 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-24 lg:pb-32 flex flex-col items-center text-center overflow-hidden">
        
        {/* 1. Base Gradient Background */}
        <div 
          className="absolute inset-0 z-[-2]" 
          style={{ 
            background: 'linear-gradient(135deg, #020617 0%, #0a0f1d 40%, #0f0a1f 100%)' 
          }} 
        />

        {/* 2. Interactive Network Canvas Animation */}
        <NetworkBackground />

        {/* 3. Soft Radial Glows for Depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[400px] md:w-[500px] lg:w-[600px] h-96 sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cyan-500/10 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full z-[-1] pointer-events-none"></div>

        {/* 4. Bottom Fade Overlay (Seamless Transition) */}
        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 md:h-24 lg:h-32 bg-gradient-to-b from-transparent to-[#020617] z-[1]"></div>

        {/* --- HERO CONTENT --- */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8 w-full max-w-6xl mx-auto">
            {/* Section Badge */}
            <div className="inline-block mb-4 sm:mb-6 md:mb-8 animate-fade-in">
              <div className="
                relative
                inline-flex items-center justify-center
                px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5
                rounded-full
                bg-cyan-950/30
                border border-cyan-500/30
                text-cyan-400 text-xs sm:text-xs md:text-sm font-bold tracking-widest uppercase
                backdrop-blur-md
                hover:border-cyan-400/50 hover:bg-cyan-900/40 transition-all duration-300
              ">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                Who are we?
              </div>
            </div>

            {/* Main Heading */}

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase mb-6">
              Your Partner for  <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                Global AI Solutions
              </span>
            </h1>

            {/* Subtext */}
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in px-1 sm:px-2">
                <p className="text-slate-300 text-xs sm:text-sm md:text-base lg:text-md leading-relaxed">
                1TecHub is a premium AI consulting and Go-to-Market company. We act as
                your strategic partner in the autonomous revolution, delivering
                deep technical expertise, strong governance frameworks, and
                long-term market resilience.
                </p>

                <p className="text-slate-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                Headquartered in Dubai, we maintain a global footprint across the
                GCC, Africa, and international technology hubs, enabling us to
                support enterprises at scale.
                </p>
            </div>
        </div>
      </div>
      {/* --- END HERO SECTION --- */}

      {/* --- OFFERING SECTION --- */}
      {/* Added z-10 and relative positioning to ensure it sits above any residual canvas elements */}
      <div className='relative z-10 w-full mt-2 sm:mt-4 md:mt-6 bg-[#020617]'>
          
          {/* Accent Divider */}
          <div className="mx-auto w-16 sm:w-20 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-10 sm:mb-12 md:mb-16 opacity-70"></div>

          <div className="text-center px-4 sm:px-6 md:px-8">
              <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4'>What We Offer</h2>
              <p className='text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed'>
                Our unique value built into everything we deliver to our partners and clients
              </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-6 mt-8 sm:mt-10 md:mt-12 pb-12 sm:pb-16 md:pb-20'>
              {
                  content1.map((item, index) => (
                      <div key={index} className={`card-stagger-${index + 1}`}>
                          <Card title={item.title} description={item.description} image={item.image} index={index} />
                      </div>
                  ))
              }
          </div>
      </div>

      <GlobalBridge earth={earth} points={points} />
      
      <CoreSpecializations />

      {/* <LeadershipTeam /> */}

      <Footer />
    </div>
  );
};

export default About;
