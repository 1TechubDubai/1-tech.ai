import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowLeft 
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
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          className="
            relative
            flex items-center justify-between
            bg-[#0a0f1d]/80 backdrop-blur-md
            border border-slate-800/60
            shadow-2xl shadow-black/50
            rounded-full
            px-6 py-3
            transition-all duration-300
            hover:border-cyan-500/30
            max-w-5xl w-full
          "
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-semibold text-white text-lg tracking-tight z-50">
            {/* <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <span className="text-black font-bold">1</span>
            </div>
            <span className="hidden sm:inline">1TecHub</span> */}
            <img src={logo}></img>
          </Link>

          {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/about" label="About" />

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
                  ${serviceOpen ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"}
                `}
              >
                Services
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
                              to={`/services/${slug}`}
                              onClick={() => setServiceOpen(false)}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-all duration-200"
                            >
                              <div className="mt-1 text-slate-500 group-hover:text-cyan-400 transition-colors">
                                {Icon && <Icon size={18} />}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                                  {service.title}
                                </div>
                                <div className="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-1 group-hover:text-slate-400">
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

            <NavLink to="/partners" label="Partners" />
            <NavLink to="/contact" label="Contact" />
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="https://calendly.com/"
              className="
                hidden sm:flex
                px-5 py-2 rounded-full text-sm font-semibold
                bg-cyan-500 text-black
                transition-all duration-300
                hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]
                hover:-translate-y-0.5
              "
            >
              Book Strategy
            </Link>

            {/* Hamburger Button */}
            <button 
              className="md:hidden text-white p-1 z-50 relative"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileView('main'); // Reset view on toggle
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* --- MOBILE FULL SCREEN OVERLAY --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#020617] md:hidden flex flex-col pt-24 pb-8 px-6 animate-fade-in overflow-y-auto">
          
          {/* VIEW 1: MAIN MENU */}
          {mobileView === 'main' ? (
            <div className="flex flex-col h-full animate-slide-up">
              <div className="space-y-6 flex-1">
                <Link to="/" className="text-3xl font-bold text-white block">Home</Link>
                <Link to="/about" className="text-3xl font-bold text-white block">About</Link>
                
                {/* Services Trigger */}
                <button 
                  onClick={() => setMobileView('services')}
                  // Added 'w-full' here:
                  className="w-full flex items-center justify-center gap-2 text-3xl font-bold text-white group pl-3"
                >
                  Services
                  <ChevronRight className="text-slate-500 group-hover:text-cyan-400 transition-colors pt-2" size={28} />
                </button>

                <Link to="/partners" className="text-3xl font-bold text-white block">Partner Platforms</Link>
                <Link to="/contact" className="text-3xl font-bold text-white block">Contact</Link>
              </div>

              {/* Bottom CTA */}
              <div className="mt-auto space-y-8">
                <Link to="/book" className="block w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-center font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  Book Strategy
                </Link>
                
                {/* Socials / Footer info */}
                <div className="flex justify-center gap-6 text-slate-500">
                   {/* Add Social Icons here if needed */}
                   <span>LinkedIn</span>
                   <span>Instagram</span>
                </div>
                <div className="text-center text-xs text-slate-600">
                  © 2026 1TecHub. All rights reserved.
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 2: SERVICES SUB-MENU */
            <div className="flex flex-col h-full animate-slide-up">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={() => setMobileView('main')}
                  className="flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back
                </button>
                <h2 className="text-xl font-bold text-white">Services</h2>
                <div className="w-8"></div> {/* Spacer for centering */}
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-2 gap-4 overflow-y-auto pb-8">
                {allServicesData.map((service) => {
                   const Icon = service.sections?.[0]?.icon;
                   return (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="
                        flex flex-col items-center justify-center text-center p-4 rounded-2xl
                        bg-[#0a0f1d] border border-slate-800
                        hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]
                        transition-all duration-300 aspect-square
                      "
                    >
                      <div className="w-10 h-10 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-400 mb-3">
                        {Icon && <Icon size={20} />}
                      </div>
                      <span className="text-xs font-bold text-slate-200 leading-tight">
                        {service.title}
                      </span>
                    </Link>
                   )
                })}
              </div>

              {/* Bottom CTA (Repeated for consistency) */}
              <div className="mt-auto pt-4">
                 <Link to="/book" className="block w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-center font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]">
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

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-sm font-medium text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all"
  >
    {label}
  </Link>
);

export default Navbar;