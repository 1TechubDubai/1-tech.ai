import Navbar from "../components/Navbar";
import one from "../assets/about1.svg";
import two from "../assets/about2.svg";
import three from "../assets/about3.svg";
import earth from "../assets/earth.svg";
import tick from "../assets/tick.svg";
import coreSp from "../assets/coreSp.svg";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { ArrowRight, Check, Globe, Linkedin, Mail, Twitter } from 'lucide-react';


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
    <h3 className="relative z-10 text-base sm:text-lg md:text-lg font-semibold text-white tracking-tight group-hover:text-cyan-200 transition-colors mb-2 sm:mb-3">
      {title}
    </h3>

    {/* Description */}
    <p className="relative z-10 text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
      {description}
    </p>
  </div>
);

const GlobalScale = ({ earth, points }) => {
  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-20 overflow-hidden">
      {/* Gradient Background with Fade-out */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1F]/40 via-transparent to-transparent pointer-events-none -z-10" />
      
      {/* Background Ambient Glow with animations */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 sm:w-80 md:w-96 lg:w-[500px] h-64 sm:h-80 md:h-96 lg:h-[500px] bg-blue-600/15 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10 animate-pulse-glow" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 left-1/4 w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] -z-10 animate-float-slow" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-6 sm:space-y-8 relative z-10 animate-fade-in">
          
          {/* Badge */}
          <div className="flex justify-start w-fit items-center gap-2 px-3 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-950/30 border border-blue-500/30 hover:border-blue-400/60 transition-colors duration-300">
            <Globe className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-400" />
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Global Presence
            </span>
          </div>

          <div className="text-left space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.2] sm:leading-[1.15]">
              Anchored in Dubai. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Scaling Globally.
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
              We believe innovation should have no boundaries. We support global
              growth with solutions that are scalable, secure, and engineered for
              long-term impact.
            </p>
          </div>

          {/* Points List */}
          <div className="space-y-3 sm:space-y-4">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3 group" style={{ animation: `slideUp 0.6s ease-out ${index * 0.1}s both` }}>
                <div className="mt-0.5 sm:mt-1 min-w-[18px] sm:min-w-[20px]">
                  <Check className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-500 group-hover:text-cyan-300 transition-colors flex-shrink-0" />
                </div>
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
        <div className="pt-2 sm:pt-3 md:pt-4 w-full flex justify-start">
            <Link 
                to="/book" 
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#00B8DB] rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,184,219,0.5)] hover:-translate-y-1 text-sm sm:text-base font-semibold"
            >
                <span className="relative z-10 text-black font-semibold tracking-wide">
                Learn More
                </span>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-black relative z-10 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
        </div>

        </div>

        {/* Right Visual */}
        <div className="relative group perspective-1000 animate-fade-in mt-6 sm:mt-0" style={{ animationDelay: '0.2s' }}>
          {/* Decorative Glow Behind Image */}
          <div className="absolute inset-2 sm:inset-4 bg-cyan-500/20 rounded-full blur-[40px] sm:blur-[60px] group-hover:bg-cyan-400/30 transition-colors duration-500 animate-pulse-glow" />
          
          <div className="relative transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:rotate-1">
             {earth ? (
                <img
                  src={earth}
                  alt="Global Presence"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
             ) : (
                 // Fallback if image prop is missing
                <div className="w-full aspect-square rounded-full bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 text-sm sm:text-base">
                  Earth Visual
                </div>
             )}
          </div>
        </div>

      </div>
    </section>
  );
};

const CoreSpecializations = ({ image }) => {
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
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-20 overflow-hidden ">
      {/* Gradient Background with Fade-out */}
      <div className="absolute inset-0 pointer-events-none -z-10" />
      
      {/* Background Glow Effects with animations */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 rounded-full blur-[80px] sm:blur-[100px] -z-10 animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 bg-blue-600/10 rounded-full blur-[80px] sm:blur-[100px] -z-10 animate-pulse-glow" style={{ animation: 'pulse-glow 5s ease-in-out infinite reverse' }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Content */}
        <div className="relative z-10 text-left animate-fade-in">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3 py-1 sm:py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/30 mb-4 sm:mb-6 hover:border-cyan-400/60 transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0"></span>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              Core Specializations
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white leading-[1.2] sm:leading-[1.15] mb-4 sm:mb-6">
            End-to-end capabilities <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              driving transformation.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-6 sm:mb-8 md:mb-10 max-w-lg leading-relaxed">
            We merge autonomous intelligence with robust infrastructure to help enterprises scale efficiently.
          </p>

          {/* Feature List - Split into 2 columns for better alignment */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4 mb-8 sm:mb-10">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3 group" style={{ animation: `slideUp 0.6s ease-out ${index * 0.05}s both` }}>
                <div className="mt-0.5 sm:mt-1 min-w-[18px] sm:min-w-[20px]">
                  <Check className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-500 group-hover:text-cyan-300 transition-colors flex-shrink-0" strokeWidth={3} />
                </div>
                <span className="text-slate-300 text-xs sm:text-sm font-medium leading-snug group-hover:text-white transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent overflow-hidden rounded-full transition-all hover:bg-cyan-500/10 text-sm sm:text-base">
            {/* Gradient Border Trick */}
            <div className="absolute inset-0 rounded-full border border-cyan-500/50 group-hover:border-cyan-400 transition-colors"></div>
            
            <span className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
              Explore Analytics
            </span>
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>
        </div>

        {/* Right Image Container */}
        <div className="relative lg:h-auto group animate-fade-in mt-6 sm:mt-0" style={{ animationDelay: '0.2s' }}>
          {/* Decorative Glow Behind Image */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg sm:rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse-glow"></div>
          
          <div className="relative rounded-lg sm:rounded-2xl bg-[#0a0f1d] border border-slate-800 p-1 sm:p-2 shadow-2xl overflow-hidden">
             {coreSp ? (
                <img
                  src={coreSp}
                  alt="Core Specializations"
                  className="w-full h-auto rounded-lg sm:rounded-xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
             ) : (
                <div className="w-full aspect-[4/3] bg-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-600 text-sm">
                  Image Placeholder
                </div>
             )}
          </div>
        </div>

      </div>
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

// Helper Component for Social Buttons
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
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Configuration - Adjusted for mobile
    const particleColor = 'rgba(6, 182, 212, 0.5)'; // Cyan-500
    const lineColor = 'rgba(6, 182, 212, 0.15)'; // Faint cyan
    const connectionDistance = 150;
    const moveSpeed = 0.3; // Reduced for better performance

    // Handle Resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * moveSpeed;
        this.vy = (Math.random() - 0.5) * moveSpeed;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Adaptive particle count based on device - much lower on mobile
      let particleCount;
      if (window.innerWidth < 640) {
        // Mobile: fewer particles
        particleCount = Math.floor((canvas.width * canvas.height) / 25000);
      } else if (window.innerWidth < 1024) {
        // Tablet: medium particles
        particleCount = Math.floor((canvas.width * canvas.height) / 18000);
      } else {
        // Desktop: more particles
        particleCount = Math.floor((canvas.width * canvas.height) / 12000);
      }
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and Draw Particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Draw Connections - skip some for performance on mobile
        const skipConnections = window.innerWidth < 640 ? 2 : 1;
        for (let j = index + skipConnections; j < particles.length; j += skipConnections) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - distance / connectionDistance;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const About = () => {
  const content1 = [
    {
      title: "GLOBAL TALENT ENGINE",
      description: "We source, deploy, and govern elite IT professionals from multiple regions, ensuring unmatched expertise and scalability.",
      image: one
    },
    {
      title: "PARTNER ECOSYSTEM",
      description: "We collaborate with global AI platforms and cloud hyperscalers to bring international innovation to regional markets.",
      image: two
    },
    {
      title: "GLOBAL GOVERNANCE",
      description: "Our delivery model follows strict global frameworks, ensuring every project is executed with precision and compliance",
      image: three
    }
  ]

  const points = [
    "Headquartered in UAE's AI hub", 
    "Network of 14+ AI & data partners",
    "Infrastructure delivery timelines"
  ] 

  return (
    <div className="h-full w-full fixed top-0 left-0 text-white overflow-y-scroll bg-[#020617]">
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

      <Navbar />

      {/* --- HERO SECTION WRAPPER --- */}
      <div className="relative pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-24 lg:pb-32 flex flex-col items-center text-center overflow-hidden">
        
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
            <h1 className="
                max-w-6xl mx-auto
                text-3xl sm:text-4xl md:text-5xl lg:text-7xl
                font-extrabold tracking-tight
                leading-[1.2] sm:leading-[1.15] md:leading-[1.1]
                text-white
                mb-6 sm:mb-8 md:mb-10 lg:mb-12
                animate-slide-up
            ">
                Your Partner for <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                Global AI Solutions
                </span>
            </h1>

            {/* Subtext */}
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in px-1 sm:px-2">
                <p className="text-slate-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
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

      <GlobalScale earth={earth} points={points} />
      
      <CoreSpecializations />

      <LeadershipTeam />

      <Footer />
    </div>
  );
};

export default About;
