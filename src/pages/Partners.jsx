import { 
  Truck, 
  Globe, 
  MessageSquare, 
  Shield, 
  ArrowRight, 
  MapPin, 
  BarChart3, 
  Box, 
  Activity,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { 
  // Original Icons
  Lock, Video, Cloud, Search, Filter, Layers,
  // Navigation & UI
  Home, Settings, Menu, Bell, ChevronRight, ChevronLeft, MoreVertical, ExternalLink, RefreshCw, PlusCircle,
  // User & Security
  User, UserPlus, UserCheck, UserX, Fingerprint, Key, Eye, EyeOff, ShieldAlert,
  // Actions & Business
  Briefcase, CreditCard, DollarSign, PieChart, TrendingUp, Zap, HardDrive, Cpu, 
  // Status & Feedback
  CheckCircle2, AlertTriangle, Info, HelpCircle, Trash, Edit, Save, Send
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Omnivio from '../assets/omnivio.svg';
import RC from '../assets/rc.svg';
import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, documentId} from 'firebase/firestore';
import { db } from '../firebaseConfig';

// --- DATA: SUITE GRID (Top Section) ---
const suiteItems = [
  {
    id: 1,
    title: "Logistics Automation",
    tag: "LAST-MILE",
    desc: "AI-powered delivery tracking and route optimization.",
    icon: Truck,
    color: "cyan",
    delay: 0.1
  },
  {
    id: 2,
    title: "Supply Chain",
    tag: "CONTROL TOWER",
    desc: "End-to-end visibility and predictive analytics.",
    icon: Globe,
    color: "purple",
    delay: 0.2
  },
  {
    id: 3,
    title: "Collaboration",
    tag: "PRODUCTIVITY",
    desc: "Secure team communication and file sharing.",
    icon: MessageSquare,
    color: "emerald", // Using emerald for green
    delay: 0.3
  },
  {
    id: 4,
    title: "Enterprise Suite",
    tag: "SECURE",
    desc: "Comprehensive business management platform.",
    icon: Shield,
    color: "blue",
    delay: 0.4
  }
];

// --- DATA: PARTNERS LIST (Bottom Section) ---
const partnersStatic = [
  {
    id: "01",
    name: "ROADCAST",
    sub: "Last-Mile Prediction",
    desc: "Real-time logistics automation with AI-powered route optimization, fleet tracking, and delivery prediction.",
    features: [
      { label: "Live GPS Tracking", icon: MapPin },
      { label: "Route Optimization", icon: Activity },
      { label: "Delivery ETAs", icon: Truck },
      { label: "Fleet Analytics", icon: BarChart3 }
    ],
    theme: "cyan",
    image: RC, // Tech map placeholder
    link: 'https://roadcast.in/'
  },
  {
    id: "02",
    name: "OMNIVIO",
    sub: "Supply Chain Control Tower",
    desc: "End-to-end supply chain visibility with predictive analytics, inventory management, and demand forecasting.",
    features: [
      { label: "Inventory Control", icon: Box },
      { label: "Demand Forecasting", icon: BarChart3 },
      { label: "Supplier Network", icon: Globe },
      { label: "Risk Management", icon: Shield }
    ],
    theme: "purple",
    image: Omnivio, // Network nodes placeholder
    link: 'https://omnivio.io/'
  },
  // {
  //   id: "03",
  //   name: "ICEWARP",
  //   sub: "Secure Collaboration",
  //   desc: "Unified communication platform integrating email, team chat, and storage for secure enterprise collaboration.",
  //   features: [
  //     { label: "Encrypted Email", icon: Lock },
  //     { label: "Team Chat", icon: MessageSquare },
  //     { label: "Video Calls", icon: Video },
  //     { label: "Cloud Storage", icon: Cloud }
  //   ],
  //   theme: "emerald",
  //   image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" // Cyber security placeholder
  // }
];

const iconMap = {
  // --- Original Set ---
  'MapPin' : MapPin, 'Activity' : Activity, 'Truck' : Truck, 'BarChart3' : BarChart3, 'Box' : Box, 'Globe' : Globe, 'Shield' : Shield, 'Lock' : Lock, 'MessageSquare' : MessageSquare, 'Video' : Video, 'Cloud' : Cloud, 'Search' : Search, 'Filter' : Filter, 'Layers' : Layers,

  // --- Navigation & Core UI ---
  'Home' : Home,             // Dashboard home
  'Settings' : Settings,         // Configuration
  'Menu' : Menu,             // Sidebar toggle
  'Bell' : Bell,             // Notifications
  'ChevronRight' : ChevronRight,     // List indicators
  'ChevronLeft' : ChevronLeft,      // Back buttons
  'MoreVertical' : MoreVertical,     // Action menus
  'ExternalLink' : ExternalLink,     // Partner website links
  'RefreshCw' : RefreshCw,        // Sync/Reload data
  'PlusCircle' : PlusCircle,       // Alternative Add button

  // --- User & Identity Management (IAM) ---
  'User' : User,             // Profile
  'UserPlus' : UserPlus,         // Registration requests
  'UserCheck' : UserCheck,        // Approved users
  'UserX' : UserX,            // Rejected users
  'Fingerprint' : Fingerprint,      // Biometric/Security
  'Key' : Key,              // Access control
  'Eye' : Eye,              // View details
  'EyeOff' : EyeOff,           // Hide details
  'ShieldAlert' : ShieldAlert,      // High-priority alerts

  // --- Business & Performance ---
  'Briefcase' : Briefcase,        // Partners/Corporate
  'CreditCard' : CreditCard,       // Billing/Subscriptions
  'DollarSign' : DollarSign,       // Revenue
  'PieChart' : PieChart,         // Analytics
  'TrendingUp' : TrendingUp,       // Growth metrics
  'Zap' : Zap,              // Automation/Features
  'HardDrive' : HardDrive,        // Storage/Database
  'Cpu' : Cpu,              // Processing/AI

  // --- Status & CRUD Actions ---
  'CheckCircle2' : CheckCircle2,     // Success states
  'AlertTriangle' : AlertTriangle,    // Warnings
  'Info' : Info,             // Information tooltips
  'HelpCircle' : HelpCircle,       // Support/FAQ
  'Trash' : Trash,            // Delete actions
  'Edit' : Edit,             // Modify existing entries
  'Save' : Save,             // Commit changes
  'Send' : Send              // Message/Reply actions
};

const SuiteSection = ({ item, index = 0 }) => {
  // Enhanced color map using Tailwind-compatible HSL or Hex for complex shadows
  const colorMap = {
    cyan: "group-hover:shadow-cyan-500/20 border-cyan-500/50 text-cyan-400 bg-cyan-500/10",
    purple: "group-hover:shadow-purple-500/20 border-purple-500/50 text-purple-400 bg-purple-500/10",
    emerald: "group-hover:shadow-emerald-500/20 border-emerald-500/50 text-emerald-400 bg-emerald-500/10",
    blue: "group-hover:shadow-blue-500/20 border-blue-500/50 text-blue-400 bg-blue-500/10"
  };

  const glowMap = {
    cyan: "from-cyan-500/20",
    purple: "from-purple-500/20",
    emerald: "from-emerald-500/20",
    blue: "from-blue-500/20"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      {/* Animated Glow Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${glowMap[item.color]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl -z-10`} />

      <div className={`h-full relative p-8 rounded-[2rem] border bg-[#0a0f1d]/80 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 ${colorMap[item.color].split(' ').find(c => c.startsWith('border-'))} hover:border-opacity-100 border-opacity-20 shadow-2xl group-hover:shadow-2xl`}>
        
        {/* Decorative corner accent */}
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${glowMap[item.color]} to-transparent opacity-10 group-hover:opacity-30 rounded-tr-[2rem] transition-opacity`} />

        <div className="relative z-10">
          {/* Icon Box */}
          <div 
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${colorMap[item.color]}`}
          >
            <item.icon size={32} strokeWidth={1.5} />
          </div>

          {/* Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span 
              className={`px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border ${colorMap[item.color]}`}
            >
              {item.tag}
            </span>
            <div className={`h-[1px] flex-grow bg-gradient-to-r from-slate-800 to-transparent opacity-50`} />
          </div>

          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
            {item.title}
          </h3>
          
          <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
            {item.desc}
          </p>

          {/* Visual Footer Arrow */}
          <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors duration-300">
            <div className="w-0 group-hover:w-24 h-[1px] bg-white transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Partners = () => {
  const [partners, setPartners] = useState([]);
  // 1. Fetch from Firebase
  useEffect(() => {
    // Use documentId() to sort by the actual Firestore Document ID
    const q = query(collection(db, "partners"), orderBy(documentId(), "asc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Check snapshot.empty rather than just snapshot
      if (!snapshot.empty) {
        const firebaseData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Firestore Partners Data:", firebaseData);
        setPartners(firebaseData);
      } else {
        console.log("No data found in Firestore, using static fallback.");
        setPartners(partnersStatic);
      }
    }, (error) => {
      // Always add an error listener to see if permission is denied
      console.error("Firestore Subscription Error:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-[#020617] min-h-screen text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden overflow-y-scroll"
    style={{ fontFamily: "'Syne', sans-serif" }}>
        <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
  ` }} />
      
      {/* 1. Navbar (Fixed) */}
      <div className="fixed top-0 w-full z-50">
         <Navbar />
      </div>

      <div className="relative pt-20 sm:pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        
        {/* --- HERO SECTION --- */}
        <section className="text-center space-y-6 relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>

          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase mb-6">
              Explore Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                Advanced Suite
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Streamline operations. Enhance collaboration. Drive growth through intelligent automation.
            </p>
          </div>
        </section>

        {/* --- SUITE GRID (Top 4 Cards) --- */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {suiteItems.map((item, index) => (
              <SuiteSection key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* --- PARTNERS LIST (Detailed Cards) --- */}
        <section className="space-y-12">
          {partners.map((partner, index) => {
            const themeColors = {
              cyan: '#06b6d4',
              purple: '#a855f7',
              emerald: '#10b981'
            };
            const themeColor = partner.theme;

            return (
            <div
              key={partner.id}
              className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[#0a0f1d] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-1 group transition-all duration-500"
              style={{
                transition: 'all 0.5s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = themeColor;
                e.currentTarget.style.boxShadow = `0 0 20px ${themeColor}30`;
                const glow = e.currentTarget.querySelector('[data-glow]');
                if (glow) glow.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.boxShadow = 'none';
                const glow = e.currentTarget.querySelector('[data-glow]');
                if (glow) glow.style.opacity = '0.3';
              }}
            >
              {/* Glow Effect */}
              <div 
                data-glow
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 transition-opacity duration-500"
                style={{
                  backgroundColor: `${themeColor}`,
                  opacity: 0.3
                }}
              ></div>

              {/* Text Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className={`text-4xl font-bold opacity-50 font-mono`}
                    style={{ color: themeColor }}
                  >
                    {index + 1}.
                  </span>
                  <h2 className={`text-3xl font-bold tracking-wide uppercase`} style={{ color: themeColor }}>
                    {partner.name}
                  </h2>
                </div>
                
                <h3 className="text-lg text-slate-300 font-medium mb-6 pl-4 border-l-2 border-slate-700 text-left">
                  {partner.sub}
                </h3>

                <p className="text-slate-400 mb-8 leading-relaxed text-left">
                  {partner.desc}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {partner.features.map((feat, i) => {
                    const Icon = iconMap[feat.icon] || Box; // Fallback to Box if icon not found
                    return(
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-slate-700 transition-colors">
                      <Icon size={16} style={{ color: themeColor }} />
                      <span className="text-xs font-medium text-slate-300">{feat.label}</span>
                    </div>)
                  })}
                </div>

                {/* CTA Button */}
                <div className='w-full flex justify-start'>
                  <button 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 relative group/btn"
                    style={{
                      backgroundColor: themeColor,
                      boxShadow: `0 0 15px ${themeColor}40`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 25px ${themeColor}80`;
                      e.currentTarget.style.backgroundColor = themeColor;
                      e.currentTarget.style.filter = 'brightness(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 15px ${themeColor}40`;
                      e.currentTarget.style.backgroundColor = themeColor;
                      e.currentTarget.style.filter = 'brightness(1)';
                    }}
                    onClick={()=>{window.open(partner.link, '_blank').focus();}}
                  >
                    Visit Platform
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Visual/Image Side */}
              <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden rounded-[1.5rem] lg:rounded-r-[1.5rem] lg:rounded-l-none m-1 lg:m-0 border border-slate-800/50 group-hover:border-slate-700 transition-colors">
                <div className="absolute inset-0 bg-slate-900/20 z-10"></div>
                
                {/* Tech Overlay Lines */}
                <div 
                  className="absolute inset-0 z-20 m-4 rounded-xl pointer-events-none"
                  style={{
                    borderColor: `${themeColor}30`,
                    borderWidth: '0.5px'
                  }}
                >
                  <div className="absolute top-0 right-0 w-20 h-[1px]" style={{ backgroundColor: `${themeColor}80` }}></div>
                  <div className="absolute bottom-0 left-0 w-20 h-[1px]" style={{ backgroundColor: `${themeColor}80` }}></div>
                  <div className="absolute top-0 right-0 h-10 w-[1px]" style={{ backgroundColor: `${themeColor}80` }}></div>
                </div>

                {/* Main Image */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black p-4">
                  
                  {/* 1. The White Background Overlay (Covers entire parent) */}
                  <div className="absolute inset-0 bg-black z-0" />

                  {/* 2. The Image (Centered on top of the white background) */}
                  {partner.image ? (
                        <img 
                          src={partner.image} 
                          alt={partner.name} 
                          className="relative z-10 object-contain max-w-full max-h-full transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                        />
                      ) : (
                        /* --- TEXT FALLBACK THEME --- */
                        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 select-none">
                          <h2 
                            className="text-4xl md:text-5xl font-black italic tracking-tighter transition-all duration-700 group-hover:scale-110"
                            style={{ 
                              color: 'transparent',
                              WebkitTextStroke: `1px ${themeColor}80`,
                              textShadow: `0 0 20px ${themeColor}40`
                            }}
                          >
                            {partner.name}
                          </h2>
                          <div 
                            className="mt-4 w-12 h-1 rounded-full opacity-20 group-hover:w-24 group-hover:opacity-100 transition-all duration-700"
                            style={{ backgroundColor: themeColor }}
                          />
                        </div>
                      )}

                </div>

                {/* Stats Overlay (Decorative) */}
                {/* <div className="absolute top-6 right-6 z-30 flex gap-2">
                  <div className="px-2 py-1 bg-black/60 backdrop-blur-md border border-slate-700 rounded text-[10px] text-cyan-400 font-mono">
                    PWR: 98%
                  </div>
                  <div className="px-2 py-1 bg-black/60 backdrop-blur-md border border-slate-700 rounded text-[10px] text-purple-400 font-mono">
                    LAT: 12ms
                  </div>
                </div> */}
              </div>

            </div>
          );
          })}
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Partners;