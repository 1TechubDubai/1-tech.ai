import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowLeft,
  CalendarCheck
} from "lucide-react";
import { allServicesData } from "../data/ServicesData"; 
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState('main'); // 'main' or 'services'
  const location = useLocation();

  // Reset menu state when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileView('main');
    setServiceOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // --- DESKTOP CONFIGURATION ---
  const navConfig = [
    {
      title: "AI & Autonomy",
      slugs: ["autonomous-ai-agents", "custom-ai-solutions", "llm-integration"]
    },
    {
      title: "Data & Perception",
      slugs: ["data-science-analytics-big-data", "advanced-machine-learning", "natural-language-processing"]
    },
    {
      title: "Engineering & Voice",
      slugs: ["software-development", "conversational-voice-ai"]
    }
  ];

  const getService = (slug) => allServicesData.find(s => s.slug === slug);

  return (
    <>
      {/* --- MAIN NAVBAR BAR --- */}
      <div className="fixed top-4 left-0 right-0 z-[60] flex justify-center px-4">
        <nav
          className="
            relative
            flex items-center justify-between
            bg-[#0a0f1d]/90 backdrop-blur-xl
            border border-slate-800/80
            shadow-2xl shadow-black/50
            rounded-full
            px-5 py-2.5 sm:px-6 sm:py-3
            max-w-5xl w-full
          "
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <img src={logo} alt="1TecHub" className="h-7 sm:h-8 w-auto" />
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" label="Home" location={location} />
            <NavLink to="/about" label="About" location={location} />

            {/* Desktop Services Dropdown */}
            <div
              className="h-full flex items-center" 
              onMouseEnter={() => setServiceOpen(true)}
              onMouseLeave={() => setServiceOpen(false)}
            >
              <button
                className={`
                  flex items-center gap-1 text-sm font-medium
                  transition-all duration-200
                  ${serviceOpen || location.pathname.startsWith('/services') ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"}
                `}
              >
                AI Solutions
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              <div
                className={`
                  absolute top-full left-0 w-full pt-6
                  transition-all duration-200 origin-top z-40
                  ${serviceOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
                `}
              >
                <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                  {navConfig.map((column, idx) => (
                    <div key={idx} className="space-y-4">
                      <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest pl-2 border-l-2 border-cyan-500/50">
                        {column.title}
                      </h3>
                      <div className="space-y-1">
                        {column.slugs.map((slug) => {
                          const service = getService(slug);
                          if (!service) return null;
                          const Icon = service.sections?.[0]?.icon; 
                          return (
                            <Link
                              key={slug}
                              to={`/services/${service.slug}`}
                              onClick={() => setServiceOpen(false)}
                              className={`group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                                location.pathname === `/services/${service.slug}`
                                  ? "bg-cyan-500/20 border border-cyan-500/30"
                                  : "hover:bg-slate-800/50"
                              }`}
                            >
                              <div className={`mt-1 transition-colors ${
                                location.pathname === `/services/${service.slug}`
                                  ? "text-cyan-400"
                                  : "text-slate-500 group-hover:text-cyan-400"
                              }`}>
                                {Icon && <Icon size={18} />}
                              </div>
                              <div>
                                <div className={`text-sm font-medium transition-colors ${
                                  location.pathname === `/services/${service.slug}`
                                    ? "text-white"
                                    : "text-slate-200 group-hover:text-white"
                                }`}>
                                  {service.title}
                                </div>
                                <div className={`text-[10px] leading-tight mt-0.5 line-clamp-1 transition-colors ${
                                  location.pathname === `/services/${service.slug}`
                                    ? "text-slate-300"
                                    : "text-slate-500 group-hover:text-slate-400"
                                }`}>
                                  {service.hero?.description?.split('.')[0] || "Advanced solutions."}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <NavLink to="/ai-advisory" label="AI Advisory" location={location} />
            <NavLink to="/partners" label="AI Partners" location={location} />
            <NavLink to="/contact" label="Contact" location={location} />
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="https://calendly.com/"
              className="
                hidden sm:flex items-center gap-2 /* Added alignment and spacing */
                px-5 py-2 rounded-full text-sm font-semibold
                bg-cyan-500 text-black
                transition-all duration-300
                hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]
                hover:-translate-y-0.5
              "
            >
              <span>Book a Meeting</span>
              <CalendarCheck className="w-4 h-4" />
            </Link>

            {/* Hamburger Button */}
            <button 
              className="md:hidden text-white p-1 z-50 focus:outline-none"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileView('main');
              }}
            >
              {mobileMenuOpen ? <X size={24} className="text-cyan-400" /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* --- MOBILE FULL SCREEN OVERLAY --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#020617] md:hidden flex flex-col pt-20 pb-6 px-5 h-[100dvh]">
          
          {/* VIEW 1: MAIN MENU */}
          {mobileView === 'main' ? (
            <div className="flex flex-col h-full justify-between animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <Link to="/" className={`text-lg font-bold block py-3 border-b border-white/5 transition-colors ${location.pathname === '/' ? 'text-cyan-400' : 'text-white'}`}>Home</Link>
                <Link to="/about" className={`text-lg font-bold block py-3 border-b border-white/5 transition-colors ${location.pathname === '/about' ? 'text-cyan-400' : 'text-white'}`}>About</Link>
                
                {/* Services Trigger */}
                <button 
                  onClick={() => setMobileView('services')}
                  className={`text-lg font-bold block py-3 ml-5 border-b border-white/5 transition-colors ${location.pathname.startsWith('/services') ? 'text-cyan-400' : 'text-white'}`}
                >
                  AI Solutions  →
                </button>

                <Link to="/partners" className={`text-lg font-bold block py-3 border-b border-white/5 transition-colors ${location.pathname === '/partners' ? 'text-cyan-400' : 'text-white'}`}>AI Partners</Link>                
                <Link to="/ai-advisory" className={`text-lg font-bold block py-3 border-b border-white/5 transition-colors ${location.pathname === '/ai-advisory' ? 'text-cyan-400' : 'text-white'}`}>AI Advisory</Link>
                <Link to="/contact" className={`text-lg font-bold block py-3 border-b border-white/5 transition-colors ${location.pathname === '/contact' ? 'text-cyan-400' : 'text-white'}`}>Contact</Link>

              </div>

              {/* Bottom CTA - Fixed at bottom */}
              <div className="w-full pt-4 flex-shrink-0">
                <Link to="/book" className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-center font-bold text-white shadow-lg shadow-cyan-900/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                  <span>Book a Meeting</span>
                  <CalendarCheck className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ) : (
            /* VIEW 2: SERVICES SUB-MENU - Redesigned for better space usage */
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-200">
              
              {/* Compact Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 flex-shrink-0">
                <button 
                  onClick={() => setMobileView('main')}
                  className="flex items-center text-slate-400 hover:text-white transition-colors py-1"
                >
                  <ArrowLeft size={18} className="mr-1" />
                  <span className="text-md font-medium">Back</span>
                </button>
                <h2 className="text-base font-bold text-white">Our Services</h2>
                <div className="w-12"></div>
              </div>

              {/* Services Grid - 2 columns for better space usage, no scrolling needed */}
              <div className="grid grid-cols-2 gap-2 flex-shrink-0">
                {allServicesData.map((service) => {
                   const Icon = service.sections?.[0]?.icon;
                   const isActive = location.pathname === `/services/${service.slug}`;
                   return (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex flex-col items-center gap-1.5 p-4 rounded-lg
                        transition-all
                        ${isActive 
                          ? 'bg-cyan-500/20 border border-cyan-500/50' 
                          : 'bg-[#0a0f1d] border border-slate-800 active:bg-slate-800'
                        }
                      `}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-cyan-500/30 text-cyan-400' 
                          : 'bg-cyan-900/30 text-cyan-400'
                      }`}>
                        {Icon && <Icon size={20} />}
                      </div>
                      <span className={`text-[12px] font-bold leading-tight text-center line-clamp-2 mt-2 transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-slate-200'
                      }`}>
                        {service.title}
                      </span>
                    </Link>
                   )
                })}
              </div>

              {/* Bottom CTA - Fixed at bottom, always visible */}
              <div className="w-full pt-4 mt-auto flex-shrink-0">
                 <Link to="/book" className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-center font-bold text-white shadow-lg active:scale-[0.98] transition-transform">
                  Book Strategy
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const NavLink = ({ to, label, location }) => {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-all ${
        isActive
          ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          : "text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;