import { 
  Truck, Globe, MessageSquare, Shield, ArrowRight, 
  MapPin, BarChart3, Box, Activity, Lock, Video, Cloud, 
  Search, Filter, Layers, Home, Settings, Menu, Bell, 
  ChevronRight, ChevronLeft, MoreVertical, ExternalLink, 
  RefreshCw, PlusCircle, User, UserPlus, UserCheck, UserX, 
  Fingerprint, Key, Eye, EyeOff, ShieldAlert, Briefcase, 
  CreditCard, DollarSign, PieChart, TrendingUp, Zap, 
  HardDrive, Cpu, CheckCircle2, AlertTriangle, Info, 
  HelpCircle, Trash, Edit, Save, Send, ShieldCheck 
} from 'lucide-react';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// --- DATA: SUITE GRID (Top Section) ---
const ecosystemPillars = [
  {
    id: 1,
    title: "Modular Architecture",
    tag: "PLUG & PLAY",
    desc: "Seamlessly integrate vetted partner capabilities to build a bespoke, unified operational tech stack.",
    icon: Layers,
    color: "cyan",
    delay: 0.1
  },
  {
    id: 2,
    title: "Cognitive Synergy",
    tag: "AI-DRIVEN",
    desc: "Leverage specialized artificial intelligence and automation from diverse industry leaders.",
    icon: Cpu,
    color: "purple",
    delay: 0.2
  },
  {
    id: 3,
    title: "Enterprise Reliability",
    tag: "VETTED & SECURE",
    desc: "Every service node is rigorously tested for strict compliance, data privacy, and zero-downtime performance.",
    icon: ShieldCheck, 
    color: "emerald", 
    delay: 0.3
  },
  {
    id: 4,
    title: "Limitless Scalability",
    tag: "FUTURE-PROOF",
    desc: "Adapt to market demands instantly by activating new partner capabilities exactly when your business needs them.",
    icon: TrendingUp,
    color: "blue",
    delay: 0.4
  }
];

const iconMap = {
  'MapPin' : MapPin, 'Activity' : Activity, 'Truck' : Truck, 'BarChart3' : BarChart3, 'Box' : Box, 'Globe' : Globe, 'Shield' : Shield, 'Lock' : Lock, 'MessageSquare' : MessageSquare, 'Video' : Video, 'Cloud' : Cloud, 'Search' : Search, 'Filter' : Filter, 'Layers' : Layers,
  'Home' : Home, 'Settings' : Settings, 'Menu' : Menu, 'Bell' : Bell, 'ChevronRight' : ChevronRight, 'ChevronLeft' : ChevronLeft, 'MoreVertical' : MoreVertical, 'ExternalLink' : ExternalLink, 'RefreshCw' : RefreshCw, 'PlusCircle' : PlusCircle,
  'User' : User, 'UserPlus' : UserPlus, 'UserCheck' : UserCheck, 'UserX' : UserX, 'Fingerprint' : Fingerprint, 'Key' : Key, 'Eye' : Eye, 'EyeOff' : EyeOff, 'ShieldAlert' : ShieldAlert,
  'Briefcase' : Briefcase, 'CreditCard' : CreditCard, 'DollarSign' : DollarSign, 'PieChart' : PieChart, 'TrendingUp' : TrendingUp, 'Zap' : Zap, 'HardDrive' : HardDrive, 'Cpu' : Cpu,
  'CheckCircle2' : CheckCircle2, 'AlertTriangle' : AlertTriangle, 'Info' : Info, 'HelpCircle' : HelpCircle, 'Trash' : Trash, 'Edit' : Edit, 'Save' : Save, 'Send' : Send
};

const PillarSection = ({ item, index = 0 }) => {
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
      <div className={`absolute inset-0 bg-gradient-to-br ${glowMap[item.color]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl -z-10`} />

      <div className={`h-full relative p-8 rounded-[2rem] border bg-[#0a0f1d]/80 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 ${colorMap[item.color].split(' ').find(c => c.startsWith('border-'))} hover:border-opacity-100 border-opacity-20 shadow-2xl group-hover:shadow-2xl flex flex-col`}>
        
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${glowMap[item.color]} to-transparent opacity-10 group-hover:opacity-30 rounded-tr-[2rem] transition-opacity`} />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${colorMap[item.color]}`}>
            <item.icon size={32} strokeWidth={1.5} />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border ${colorMap[item.color]}`}>
              {item.tag}
            </span>
            <div className={`h-[1px] flex-grow bg-gradient-to-r from-slate-800 to-transparent opacity-50`} />
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
            {item.title}
          </h3>
          
          <p className="text-slate-400 text-sm lg:text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
            {item.desc}
          </p>

          <div className="mt-auto pt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors duration-300">
            <div className="w-0 group-hover:w-24 h-[1px] bg-white transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Partners = () => {
  const [nodes, setNodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchNodes = async () => {
        try {
          // 1. Fetch only ACTIVE listings (removed orderBy to bypass index requirement)
          const q = query(
            collection(db, "service_listings"), 
            where("status", "==", "active")
          );
          
          const querySnapshot = await getDocs(q);
          
          let firebaseData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // 2. Sort the data client-side (Newest first)
          firebaseData.sort((a, b) => {
            const timeA = a.createdAt?.toMillis() || 0;
            const timeB = b.createdAt?.toMillis() || 0;
            return timeB - timeA; 
          });

          console.log("Firestore Data Received:", firebaseData);
          setNodes(firebaseData);
        } catch (error) {
          console.error("Firestore Fetch Error:", error);
        }
      };

      fetchNodes();
  }, []);

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-[#020617] min-h-screen text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden overflow-y-scroll"
    style={{ fontFamily: "'Syne', sans-serif" }}>
        <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
  ` }} />
      
      {/* Navbar */}
      <div className="fixed top-0 w-full z-50">
         <Navbar />
      </div>

      <div className="relative pt-20 sm:pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        
        {/* --- HERO SECTION --- */}
        <section className="text-center space-y-6 relative">
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
          <div className="flex items-center gap-4 mb-10 pl-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">
              Mesh Architecture Core
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecosystemPillars.map((item, index) => (
              <PillarSection key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>
        
        {/* --- CAPABILITY MESH LIST (Replaced Partners List) --- */}
        <section className="space-y-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pl-2">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">
                  Live Capability Nodes
                </h2>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Integrated Partner Ecosystem
              </h3>
            </div>
            
            <p className="text-slate-400 text-sm max-w-md md:text-right">
              Discover and deploy specialized functional modules provided by our vetted network of industry leaders.
            </p>
          </div>

          {/* Node Mapping */}
          <div className="space-y-12">
            {nodes.length > 0 ? nodes.map((node, index) => {
              // Use the node's provided theme, default to cyan if missing
              const themeColor = node.theme || "#06b6d4";

              return (
              <div
                key={node.id}
                className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[#0a0f1d] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-1 group transition-all duration-500"
                style={{ transition: 'all 0.5s ease' }}
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
                  style={{ backgroundColor: `${themeColor}`, opacity: 0.3 }}
                ></div>

                {/* Text Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1 z-10">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className={`text-4xl font-bold opacity-50 font-mono`} style={{ color: themeColor }}>
                      {(index + 1).toString().padStart(2, '0')}.
                    </span>
                    <h2 className={`text-3xl font-bold tracking-wide uppercase break-words text-left`} style={{ color: themeColor }}>
                      {node.name}
                    </h2>
                  </div>
                  
                  <h3 className="text-lg text-slate-300 font-medium mb-6 pl-4 border-l-2 border-slate-700 text-left">
                    {node.sub}
                  </h3>

                  <p className="text-slate-400 mb-8 leading-relaxed text-left">
                    {node.desc}
                  </p>

                  {/* Features Grid */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {node.features?.map((feat, i) => {
                      const Icon = iconMap[feat.icon] || Box; 
                      return (
                        <div 
                          key={i} 
                          // flex-1: allows the item to grow
                          // min-w-[calc(50%-12px)]: ensures 2 columns on small screens, adjusts on tiny ones
                          // sm:min-w-[200px]: gives a stable base width for larger screens
                          className="flex flex-1 min-w-[calc(50%-12px)] sm:min-w-[200px] items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-slate-700 transition-colors"
                        >
                          {/* flex-shrink-0: keeps the icon from squishing if text is long */}
                          <Icon size={16} className="flex-shrink-0" style={{ color: themeColor }} />
                          
                          {/* Removed 'truncate' to allow text to wrap if it's long, 
                              which will trigger the 'same-height' behavior you want */}
                          <span className="text-xs font-medium text-slate-300 leading-tight">
                            {feat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button - Links omitted for platform enclosure */}
                  <div className='w-full flex justify-start'>
                    <button 
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 relative group/btn"
                      style={{ backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}40` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 25px ${themeColor}80`;
                        e.currentTarget.style.filter = 'brightness(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 15px ${themeColor}40`;
                        e.currentTarget.style.filter = 'brightness(1)';
                      }}
                      onClick={() => navigate("/contact", { 
                        state: { 
                          prefilledMessage: `I am interested in integrating the ${node.name} capability (${node.sub}) into our current infrastructure. I would like to schedule a consultation to discuss deployment, technical requirements, and potential synergies.`,
                          selectedServices: ["Partner Integration", node.name]
                        }
                      })}
                    >
                      Request Advisory
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Visual/Image Side */}
                <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden rounded-[1.5rem] lg:rounded-r-[1.5rem] lg:rounded-l-none m-1 lg:m-0 border border-slate-800/50 group-hover:border-slate-700 transition-colors order-1 lg:order-2">
                  <div className="absolute inset-0 bg-slate-900/20 z-10"></div>
                  
                  {/* Tech Overlay Lines */}
                  <div 
                    className="absolute inset-0 z-20 m-4 rounded-xl pointer-events-none"
                    style={{ borderColor: `${themeColor}30`, borderWidth: '0.5px' }}
                  >
                    <div className="absolute top-0 right-0 w-20 h-[1px]" style={{ backgroundColor: `${themeColor}80` }}></div>
                    <div className="absolute bottom-0 left-0 w-20 h-[1px]" style={{ backgroundColor: `${themeColor}80` }}></div>
                    <div className="absolute top-0 right-0 h-10 w-[1px]" style={{ backgroundColor: `${themeColor}80` }}></div>
                  </div>

                  {/* Main Image */}
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black p-4">
                    <div className="absolute inset-0 bg-black z-0" />

                    {node.image ? (
                      <img 
                        src={node.image} 
                        alt={node.name} 
                        className="relative z-10 object-contain max-w-full max-h-full transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      /* Text Fallback Theme if no image is provided */
                      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 select-none">
                        <h2 
                          className="text-4xl md:text-5xl font-black italic tracking-tighter transition-all duration-700 group-hover:scale-110"
                          style={{ 
                            color: 'transparent',
                            WebkitTextStroke: `1px ${themeColor}80`,
                            textShadow: `0 0 20px ${themeColor}40`
                          }}
                        >
                          {node.name}
                        </h2>
                        <div 
                          className="mt-4 w-12 h-1 rounded-full opacity-20 group-hover:w-24 group-hover:opacity-100 transition-all duration-700"
                          style={{ backgroundColor: themeColor }}
                        />
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
            }) : (
              <div className="py-24 text-center border border-dashed border-slate-800 rounded-[2rem]">
                 <Activity size={40} className="mx-auto text-slate-800 mb-4 opacity-50" />
                 <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No active modules deployed.</p>
              </div>
            )}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Partners;