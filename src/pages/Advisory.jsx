import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Database, Cpu, Settings, Globe, ShieldCheck, ArrowRight, Target, Layers, Sparkles, ChevronRight, TrendingUp, Brain, Share2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────────
   GLOBAL AMBIENT CSS
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    body { font-family: 'Syne', sans-serif; margin: 0; }

    /* ── Animated gradient text ── */
    @keyframes grad-shift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .grad-text {
      background: linear-gradient(120deg, #22d3ee 0%, #6366f1 40%, #818cf8 60%, #22d3ee 100%);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: grad-shift 5s ease infinite;
    }

    /* ── Aurora blobs ── */
    @keyframes aurora-1 {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(80px,-60px) scale(1.15); }
      66%      { transform: translate(-60px,40px) scale(0.9); }
    }
    @keyframes aurora-2 {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(-100px,80px) scale(1.2); }
      66%      { transform: translate(70px,-50px) scale(0.85); }
    }
    @keyframes aurora-3 {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(50px,70px) scale(1.1); }
    }
    .aurora-blob-1 { animation: aurora-1 14s ease-in-out infinite; }
    .aurora-blob-2 { animation: aurora-2 18s ease-in-out infinite; }
    .aurora-blob-3 { animation: aurora-3 12s ease-in-out infinite; }

    /* ── Shooting stars ── */
    @keyframes shoot {
      0%   { transform: translateX(-120px) translateY(-120px) rotate(35deg); opacity: 0; }
      5%   { opacity: 1; }
      80%  { opacity: 0.8; }
      100% { transform: translateX(110vw) translateY(110vh) rotate(35deg); opacity: 0; }
    }
    .star { position:absolute; pointer-events:none; }
    .star::before {
      content: '';
      position: absolute;
      width: 200px; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(34,211,238,0.9), transparent);
      border-radius: 9999px;
      filter: blur(0.5px);
    }
    .s1 { top:8%;  left:-5%; animation: shoot 8s linear  0s  infinite; }
    .s2 { top:22%; left:-5%; animation: shoot 11s linear 3s  infinite; }
    .s3 { top:55%; left:-5%; animation: shoot 9s  linear 6s  infinite; }
    .s4 { top:75%; left:-5%; animation: shoot 13s linear 1.5s infinite; }
    .s5 { top:40%; left:-5%; animation: shoot 7s  linear 4.5s infinite; }

    /* ── Grid shimmer ── */
    @keyframes grid-pulse {
      0%,100% { opacity: 0.04; }
      50%      { opacity: 0.10; }
    }
    .grid-shimmer { animation: grid-pulse 6s ease-in-out infinite; }

    /* ── Particle field (CSS-only dots) ── */
    @keyframes float-up {
      0%   { transform: translateY(0)   opacity: 0; }
      10%  { opacity: 0.6; }
      90%  { opacity: 0.3; }
      100% { transform: translateY(-120vh); opacity: 0; }
    }
    .particle {
      position: absolute;
      width: 3px; height: 3px;
      border-radius: 50%;
      background: #22d3ee;
      animation: float-up linear infinite;
    }

    /* ── Glowing border pulse ── */
    @keyframes border-glow {
      0%,100% { box-shadow: 0 0 0px rgba(34,211,238,0); }
      50%      { box-shadow: 0 0 24px rgba(34,211,238,0.35), inset 0 0 16px rgba(34,211,238,0.08); }
    }
    .glow-border { animation: border-glow 4s ease-in-out infinite; }

    /* ── Scanline overlay ── */
    .scanlines::after {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        to bottom,
        transparent 0px, transparent 3px,
        rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px
      );
      pointer-events: none;
      z-index: 1;
    }

    /* ── Number counter glow ── */
    .num-glow {
      text-shadow: 0 0 40px rgba(34,211,238,0.5), 0 0 80px rgba(34,211,238,0.2);
    }

    /* ── Hover card lift ── */
    .card-lift {
      transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.4s ease;
    }
    .card-lift:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 0 24px 60px rgba(34,211,238,0.12), 0 8px 20px rgba(0,0,0,0.4);
    }

    /* ── Timeline connector ── */
    @keyframes line-fill {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }

    /* ── Hero ring pulse ── */
    @keyframes ring-out {
      0%   { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .ring { animation: ring-out 3.5s ease-out infinite; }
    .ring-2 { animation: ring-out 3.5s ease-out 1.2s infinite; }
    .ring-3 { animation: ring-out 3.5s ease-out 2.4s infinite; }

    /* Progress bar glow */
    .progress-glow {
      box-shadow: 0 0 12px rgba(34,211,238,0.8), 0 0 30px rgba(34,211,238,0.4);
    }

    /* Section fade separator */
    .section-sep {
      background: linear-gradient(90deg, transparent, rgba(34,211,238,0.3), rgba(99,102,241,0.3), transparent);
      height: 1px;
    }
  `}} />
);

/* ─────────────────────────────────────────────
   PARTICLE FIELD
───────────────────────────────────────────── */
const ParticleField = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 20}s`,
    duration: `${12 + Math.random() * 18}s`,
    size: Math.random() > 0.7 ? '4px' : '2px',
    color: Math.random() > 0.5 ? '#22d3ee' : '#6366f1',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   AURORA BACKGROUND
───────────────────────────────────────────── */
const AuroraBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Deep base */}
    <div className="absolute inset-0 bg-[#020617]" />
    
    {/* Primary aurora blobs */}
    <div className="aurora-blob-1 absolute top-[-20%] left-[-10%] w-[900px] h-[900px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(14,116,144,0.06) 50%, transparent 70%)' }} />
    <div className="aurora-blob-2 absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(67,56,202,0.05) 50%, transparent 70%)' }} />
    <div className="aurora-blob-3 absolute top-[30%] right-[20%] w-[600px] h-[600px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)' }} />
    <div className="aurora-blob-1 absolute top-[60%] left-[30%] w-[700px] h-[700px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)' }} />

    {/* Grid overlay */}
    <div
      className="grid-shimmer absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  </div>
);

/* ─────────────────────────────────────────────
   SHOOTING STARS
───────────────────────────────────────────── */
const ShootingStars = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[1,2,3,4,5].map(i => <div key={i} className={`star s${i}`} />)}
  </div>
);

const StrategySection = () => {
  // Framer Motion Variants
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const floatingVisual = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className="py-4 md:py-8 relative overflow-hidden w-full">
      
      {/* --- ENHANCED BACKGROUND ANIMATIONS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Neural Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
        
        {/* Large Glassmorphic Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-10 md:-left-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-500/10 rounded-full blur-[60px] md:blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-10 md:-right-20 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-indigo-500/10 rounded-full blur-[60px] md:blur-[120px]" 
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* LEFT COLUMN – CONTENT */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: '-100px' }} 
            variants={stagger}
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 justify-center">
              <p className="text-xs tracking-[0.4em] text-cyan-500 uppercase font-mono text-center">01 — Foundation</p>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-8 tracking-tight">
              Why Strategy <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                Comes First
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed max-w-xl">
              In the race for AI dominance, speed without direction is just expensive chaos. We provide the 
              <span className="text-white"> architecture and the roadmap</span>—turning raw generative potential into 
              <span className="text-cyan-400 font-semibold"> scalable enterprise value</span>.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { t: "Industry Mapping", d: "Tailored AI use cases for your specific sector.", icon: <Target size={20} /> },
                { t: "Data Readiness", d: "Full assessment of existing infrastructure.", icon: <Database size={20} /> },
                { t: "Risk Mitigation", d: "Compliance and ethical AI guardrails built in.", icon: <ShieldCheck size={20} /> },
                { t: "Growth Scale", d: "Architecting for long-term scalability.", icon: <TrendingUp size={20} /> },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.4)' }}
                  className="group p-4 md:p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md transition-all duration-300"
                >
                  {/* <div className="mb-4 p-3 w-fit rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    {item.icon}
                  </div> */}
                  <h4 className="text-white font-bold mb-2 text-sm md:text-base">{item.t}</h4>
                  <p className="text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {item.d}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN – ABSTRACT ANIMATED VISUAL */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 relative flex items-center justify-center min-h-[200px] md:min-h-[400px]"
          >
            {/* Animated Orbiting Spheres */}
            <motion.div 
              variants={floatingVisual}
              animate="animate"
              className="relative w-48 h-48 md:w-72 md:h-72 flex items-center justify-center"
            >
              {/* Central Core */}
              <div className="absolute w-16 h-16 md:w-32 md:h-32 bg-cyan-500/20 rounded-full blur-xl md:blur-2xl animate-pulse" />
              <div className="relative z-10 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-tr from-cyan-600 to-blue-400 rounded-2xl md:rounded-3xl rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] md:shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                <Cpu className="text-white -rotate-45" size={24} md:size={40} />
              </div>

              {/* Orbiting Nodes */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-slate-800 rounded-full"
                  style={{ padding: i * 20 }}
                >
                  <div 
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 md:w-4 md:h-4 rounded-full border border-white/20 backdrop-blur-sm
                    ${i === 0 ? 'bg-cyan-400' : i === 1 ? 'bg-blue-500' : 'bg-indigo-600'}`} 
                  />
                </motion.div>
              ))}

              {/* Connecting Lines Decor */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] opacity-10">
                <Share2 size={300} md:size={450} strokeWidth={0.5} className="text-cyan-500" />
              </div>
            </motion.div>

            {/* Glowing Tag Cloud (Floating) */}
            <div className="absolute inset-0 pointer-events-none">
              {[
                { label: "Predictive", top: "10%", left: "20%" },
                { label: "ROI Focused", bottom: "15%", right: "10%" },
                { label: "Ethical AI", top: "20%", right: "15%" },
                { label: "Scalable", bottom: "20%", left: "10%" }
              ].map((tag, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, delay: i, repeat: Infinity }}
                  className="absolute px-3 py-1 md:px-4 md:py-2 bg-slate-800/50 border border-slate-700 rounded-lg backdrop-blur-sm text-[8px] md:text-[10px] font-mono text-cyan-400 uppercase tracking-widest shadow-xl"
                  style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
                >
                  <Sparkles size={8} md:size={10} className="inline mr-1 md:mr-2" />
                  {tag.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   MOTION VARIANTS
───────────────────────────────────────────── */
const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22,1,0.36,1] } } };
const fadeLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22,1,0.36,1] } } };
const fadeRight= { hidden: { opacity: 0, x:  50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22,1,0.36,1] } } };
const stagger  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const AIAdvisoryPage = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroScale    = useTransform(scrollYProgress, [0, 0.18], [1, 0.92]);
  const heroY        = useTransform(scrollYProgress, [0, 0.18], [0, -60]);

  return (
    <div className="fixed top-0 left-0 overflow-y-scroll h-full w-full bg-[#020617] text-slate-300 overflow-x-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}>

      <GlobalStyles />
      <AuroraBackground />
      <ShootingStars />
      <ParticleField />

      <Navbar />

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 pb-4 md:pb-8 overflow-hidden scanlines">
        {/* Hero spotlight */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.12) 0%, transparent 70%)',
        }} />

        {/* Pulsing rings behind headline */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {['ring','ring ring-2','ring ring-3'].map((cls,i) => (
            <div key={i} className={`${cls} absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20`} />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 rounded-full mb-6 md:mb-10"
              style={{
                background: 'rgba(34,211,238,0.06)',
                border: '1px solid rgba(34,211,238,0.25)',
                backdropFilter: 'blur(12px)',
              }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-xs tracking-[0.25em] text-cyan-400 uppercase font-bold">
                Strategic AI Advisory
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 md:mb-8 uppercase">
              Archi
              <span className="grad-text">tecting</span><br />
              Intelligence.
            </motion.h1>

            {/* Sub */}
            <motion.p variants={fadeUp}
              className="text-sm md:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed px-4">
              We bridge the gap between technical potential and business execution—ensuring your enterprise doesn't just adopt AI,
              but <em className="text-white not-italic font-bold underline underline-offset-4 decoration-cyan-500/40">thrives</em> because of it.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center px-4">
              <Link to="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg text-black overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }} />
                <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                  Start Your Journey <ArrowRight size={18} md:size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              {/* <button
                className="px-10 py-5 rounded-2xl font-bold text-lg text-white transition-all"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  background: 'rgba(255,255,255,0.03)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.5)'; e.currentTarget.style.background = 'rgba(34,211,238,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              >
                View Framework
              </button> */}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
      </section>

      <div className="section-sep mx-auto max-w-5xl" />

      {/* ══════════════════════════════════════
          2. WHY STRATEGY COMES FIRST (Z – left text, right img)
      ══════════════════════════════════════ */}

      <StrategySection />
        

      <div className="section-sep mx-auto max-w-5xl" />

      {/* ══════════════════════════════════════
          3. THE BLUEPRINT FRAMEWORK (Z – right visual, left text alternated)
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Glow accent top-right */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-end mb-12 md:mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={stagger}>
              <motion.p variants={fadeLeft} style={{ fontFamily:"'Space Mono',monospace" }}
                className="text-xs tracking-[0.3em] text-cyan-500 uppercase mb-4">02 — Methodology</motion.p>
              <motion.h2 variants={fadeLeft} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                The Advisory <br /><em className="grad-text not-italic">Blueprint</em>
              </motion.h2>
            </motion.div>
            <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="text-slate-400 text-sm md:text-base leading-relaxed lg:self-end">
              Four precision-engineered phases that take you from AI ambiguity to enterprise-wide execution—no wasted motion, no guesswork.
            </motion.p>
          </div>

          {/* Steps grid — Z pattern: 01 left, 02 right, 03 left, 04 right */}
          <div className="space-y-6 md:space-y-8">
            {[
              { n:"01", t:"Readiness Assessment",  d:"Evaluating existing tech debt and cultural AI readiness across your leadership teams. We audit infrastructure, data pipelines, and workforce capabilities.",   icon:<Brain size={24} md:size={28} />,     align:"left" },
              { n:"02", t:"Opportunity Matrix",     d:"Using proprietary scoring to rank AI use cases by impact vs. implementation complexity—so you invest where it matters, not where it's fashionable.",       icon:<Target size={24} md:size={28} />,    align:"right" },
              { n:"03", t:"Strategic Roadmap",      d:"Defining the tech stack, governance models, vendor landscape, and 12-month execution milestones with clear ownership at every layer.",                      icon:<Layers size={24} md:size={28} />,    align:"left" },
              { n:"04", t:"Performance Audits",     d:"Continuous monitoring of AI model drift, ROI attribution, and alignment with core business KPIs—ensuring your AI stays sharp long after launch.",           icon:<BarChart3 size={24} md:size={28} />, align:"right" },
            ].map((step, i) => (
              <motion.div key={i}
                initial={{ opacity:0, x: step.align==='left' ? -60 : 60 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true, margin:'-80px' }}
                transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
                className={`flex ${step.align==='right' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="card-lift w-full max-w-2xl p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden group"
                  style={{
                    background:'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(8,14,31,0.95) 100%)',
                    border:'1px solid rgba(34,211,238,0.12)',
                    backdropFilter:'blur(16px)',
                  }}>
                  {/* Large BG number */}
                  <span className="absolute top-0 right-4 md:right-6 text-[6rem] md:text-[9rem] font-black leading-none pointer-events-none select-none transition-all duration-500 group-hover:opacity-100"
                    style={{ color:'rgba(34,211,238,0.04)', fontFamily:"'Syne',sans-serif" }}>
                    {step.n}
                  </span>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background:'linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)' }} />

                  <div className="flex items-start gap-4 md:gap-6 relative z-10">
                    <div className="flex-shrink-0 p-2 md:p-3 rounded-2xl text-cyan-400 transition-all duration-300 group-hover:scale-110"
                      style={{ background:'rgba(34,211,238,0.08)', border:'1px solid rgba(34,211,238,0.2)' }}>
                      {step.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily:"'Space Mono',monospace" }} className="text-xs text-cyan-500 tracking-widest uppercase mb-2">Phase {step.n}</p>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{step.t}</h3>
                      <p className="text-base md:text-lg text-slate-300 leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-sep mx-auto max-w-5xl" />

      {/* ══════════════════════════════════════
          4. ENTERPRISE IMPACT (center grid)
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(34,211,238,0.04) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} style={{ fontFamily:"'Space Mono',monospace" }}
              className="text-xs tracking-[0.3em] text-cyan-500 uppercase mb-4">03 — Impact Surface</motion.p>
            <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">Enterprise-Wide Impact</motion.h2>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-80px' }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon:<Settings size={28} md:size={36} />,    t:"Workflow Automation",    d:"Eliminate repetitive ops with intelligent pipeline orchestration.", accent:'#22d3ee' },
              { icon:<BarChart3 size={28} md:size={36} />,   t:"Predictive Forecasting", d:"Turn historical noise into actionable forward-looking signal.",     accent:'#6366f1' },
              { icon:<Cpu size={28} md:size={36} />,         t:"Custom LLM Training",    d:"Domain-specific models that speak your business language.",         accent:'#818cf8' },
              { icon:<Database size={28} md:size={36} />,    t:"Data Modernization",     d:"Migrate, clean, and unify your data estate for AI-readiness.",      accent:'#34d399' },
              { icon:<ShieldCheck size={28} md:size={36} />, t:"AI Governance",          d:"Bias audits, explainability frameworks, and compliance rails.",     accent:'#f472b6' },
              { icon:<Globe size={28} md:size={36} />,       t:"Global Scale",           d:"Multi-region deployment architectures built for growth.",           accent:'#38bdf8' },
            ].map((node, i) => (
              <motion.div key={i} variants={fadeUp}
                className="card-lift glow-border group p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden"
                style={{
                  background:`linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(8,14,31,0.9) 100%)`,
                  border:`1px solid rgba(255,255,255,0.05)`,
                  backdropFilter:'blur(12px)',
                }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
                  style={{ background:`linear-gradient(90deg, transparent, ${node.accent}66, transparent)` }} />
                <div className="mb-4 md:mb-6 inline-flex p-2 md:p-3 rounded-2xl transition-all duration-500 group-hover:scale-110"
                  style={{ background:`${node.accent}12`, border:`1px solid ${node.accent}25`, color:node.accent }}>
                  {node.icon}
                </div>
                <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-widest mb-2 md:mb-3">{node.t}</h4>
                <p className="text-slate-300 text-base leading-relaxed">{node.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-sep mx-auto max-w-5xl" />

      {/* ══════════════════════════════════════
          5. ENGAGEMENT MODEL (pipeline)
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} style={{ fontFamily:"'Space Mono',monospace" }}
              className="text-xs tracking-[0.3em] text-cyan-500 uppercase mb-4">04 — Engagement</motion.p>
            <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">How We Work</motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 md:gap-4 items-stretch">
            {[
              { s:"Strategy Session",   d:"Kick-off with stakeholders to define scope and success metrics." },
              { s:"Deep-Dive Workshop", d:"3-day collaborative sprint mapping your AI opportunity landscape." },
              { s:"Deliver Roadmap",    d:"Full written roadmap with phased milestones and KPI targets." },
              { s:"Handover & Scale",   d:"Embedded support during the first 90 days of execution." },
            ].map((step, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.15, duration:0.7, ease:[0.22,1,0.36,1] }}
                className="flex-1 relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6"
                style={{
                  background:'rgba(15,23,42,0.7)',
                  border:'1px solid rgba(34,211,238,0.1)',
                  backdropFilter:'blur(12px)',
                }}>
                {/* Progress bar bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once:true }}
                    transition={{ duration:1.5, delay:0.6 + i * 0.2, ease:'easeOut' }}
                    className="progress-glow h-full"
                    style={{ background:'linear-gradient(90deg, #22d3ee, #6366f1)' }}
                  />
                </div>

                <span className="text-[3rem] md:text-[4rem] font-black leading-none select-none pointer-events-none"
                  style={{ color:'rgba(34,211,238,0.05)', fontFamily:"'Syne',sans-serif", display:'block' }}>
                  0{i+1}
                </span>
                <h3 className="text-base md:text-lg font-bold text-white mb-2">{step.s}</h3>
                <p className="text-slate-300 text-base leading-relaxed">{step.d}</p>
                <div style={{ fontFamily:"'Space Mono',monospace" }}
                  className="mt-3 md:mt-4 flex items-center gap-2 text-cyan-500/60 text-xs font-bold uppercase tracking-widest">
                  Phase {i+1} <ChevronRight size={10} md:size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-sep mx-auto max-w-5xl" />

      {/* ══════════════════════════════════════
          6. FINAL CTA
      ══════════════════════════════════════ */}
      <section className="py-10 md:py-20 relative overflow-hidden">
        {/* BIG background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{
            width:'min(70vw,900px)', height:'min(70vw,900px)',
            maxWidth:'900px', maxHeight:'900px',
            background:'radial-gradient(circle, rgba(34,211,238,0.1) 0%, rgba(99,102,241,0.06) 30%, transparent 70%)',
            borderRadius:'50%',
            transform: 'translateY(-10%)'
          }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
            className="relative p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-[2.5rem] overflow-hidden"
            style={{
              background:'linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(8,14,31,0.98) 100%)',
              border:'1px solid rgba(34,211,238,0.2)',
              backdropFilter:'blur(20px)',
            }}>
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none"
              style={{ background:'radial-gradient(ellipse at top, rgba(34,211,238,0.2) 0%, transparent 70%)' }} />
            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-16 h-16 rounded-tl-2xl pointer-events-none"
              style={{ borderTop:'2px solid rgba(34,211,238,0.4)', borderLeft:'2px solid rgba(34,211,238,0.4)' }} />
            <div className="absolute bottom-6 right-6 w-16 h-16 rounded-br-2xl pointer-events-none"
              style={{ borderBottom:'2px solid rgba(99,102,241,0.4)', borderRight:'2px solid rgba(99,102,241,0.4)' }} />

            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} style={{ fontFamily:"'Space Mono',monospace" }}
              className="text-xs tracking-[0.3em] text-cyan-500 uppercase mb-4">Ready to Begin</motion.p>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight">
              The Future Is <br />
              <span className="grad-text">Wait-less.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed font-light">
              Don't let your competition define your AI strategy. Partner with 1TecHub to architect a future that belongs to you alone.
            </p>           
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              className="w-[85%] sm:w-auto mx-auto mb-8" // Centers the container and sets mobile width to 85%
            >
              <Link 
                to="/contact"
                className="w-full text-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg text-white bg-transparent border-cyan-300 border-2 hover:bg-cyan-300 flex items-center justify-center gap-2 group transition-colors"
                style={{
                  boxShadow: '0 10px 30px rgba(34,211,238,0.12)',
                  background: 'radial-gradient(ellipse at top, rgba(34,211,238,0.2) 0%, transparent 70%)'
                }}
              >
                <span className="whitespace-nowrap">Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 " />
              </Link>
            </motion.div>
            
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AIAdvisoryPage;