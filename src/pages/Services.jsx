import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import allServicesData, { getServiceById } from "../data/ServicesData";
import { 
  ArrowRight,
} from 'lucide-react';

// --- HELPER COMPONENTS ---

const SectionCard = ({ item }) => (
  <div className="group relative p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)] h-full">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 group-hover:text-white group-hover:bg-cyan-600 group-hover:border-cyan-500 transition-colors shrink-0">
        <item.icon size={24} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
          {item.title}
        </h4>
        <p className="text-sm text-slate-400 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ item }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-900/20 border border-slate-800/50 backdrop-blur-sm">
    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
      <item.icon size={24} />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
  </div>
);

const ScrollNav = ({ sections, activeSection, scrollToSection }) => (
  <div className="hidden lg:block sticky top-32 space-y-4">
    <div className="relative pl-6 border-l-2 border-slate-800 space-y-12">
      <div 
        className="absolute left-[-2px] w-[2px] bg-cyan-500 transition-all duration-500 ease-in-out"
        style={{
          height: '50px', 
          top: Math.max(0, sections.findIndex(s => s.id === activeSection) * 100) + 'px' 
        }}
      />
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group flex flex-col items-start text-left transition-all duration-300 ${isActive ? 'scale-105' : 'opacity-50 hover:opacity-100'}`}
          >
            <div className={`
              w-16 h-12 rounded-xl flex items-center justify-center mb-3 border transition-all duration-300
              ${isActive 
                ? 'bg-[#0a0f1d] border-cyan-500 text-cyan-400 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]' 
                : 'bg-slate-900 border-slate-700 text-slate-500'}
            `}>
              <section.icon size={24} />
            </div>
            <span className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
              {section.id}
            </span>
          </button>
        );
      })}
    </div>
    <div className="mt-8 ml-6 px-4 py-2 rounded-full border border-slate-700 text-xs text-slate-500 bg-[#0a0f1d] inline-block">
      ● Service Modules
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

const Services = ({ serviceId = 'enterprise-it' }) => {
  const [activeSection, setActiveSection] = React.useState(null);
  const containerRef = useRef(null);

  // Get the specific service data
  const currentService = useMemo(() => {
    return getServiceById(serviceId) || allServicesData[0];
  }, [serviceId]);

  // Set initial active section
  useEffect(() => {
    if (currentService?.sections?.length > 0) {
      setActiveSection(currentService.sections[0].id);
    }
  }, [currentService]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !currentService?.sections) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + 300; 
      currentService.sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
           setActiveSection(section.id);
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentService]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const container = containerRef.current;
    if (element && container) {
      container.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
    }
  };

  if (!currentService) {
    return <div>Service not found</div>;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed left-0 top-0 w-full h-full bg-[#020617] min-h-screen text-white font-sans selection:bg-cyan-500/30 overflow-y-scroll scroll-smooth"
    >
      <div className="fixed top-0 w-full z-50">
          <Navbar />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={currentService.hero.backgroundImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#020617]/90 to-[#020617]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-5xl px-6 text-center mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Managed Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 drop-shadow-2xl leading-[1.1]">
            {currentService.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {currentService.hero.description}
          </p>
        </div>
      </section>

      {/* --- MAIN SERVICES NAV & CONTENT --- */}
      <section className="relative max-w-7xl mx-auto px-6 pb-20 pt-20 sm:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-3">
              <ScrollNav sections={currentService.sections} activeSection={activeSection} scrollToSection={scrollToSection} />
          </div>

          <div className="lg:col-span-9 space-y-32 pt-10">
            {currentService.sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-32">
                <div className="mb-10 pl-4 border-l-4 border-cyan-500">
                  <h2 className="text-3xl font-bold text-white mb-2">{section.title}</h2>
                  <p className="text-slate-400">Enterprise-grade capabilities tailored for scale.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.cards.map((card, idx) => (
                    <SectionCard key={idx} item={card} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 1: WHY CHOOSE US (Features Grid) --- */}
      <section className="relative py-24 bg-[#050b1f] border-t border-slate-800/50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose 1TecHub?</h2>
               <p className="text-slate-400 max-w-2xl mx-auto">
                 We bring a proactive, insight-led approach to managed services, ensuring your technology is an asset, not an obstacle.
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {currentService.features.map((feature, idx) => (
                  <FeatureCard key={idx} item={feature} />
               ))}
            </div>
         </div>
      </section>

      {/* --- NEW SECTION 2: CTA BANNER --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden border border-cyan-500/30">
           {/* Background Gradient */}
           <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/80"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
           
           <div className="relative z-10 px-6 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {currentService.cta.title}
              </h2>
              <p className="text-lg text-cyan-50 max-w-3xl mx-auto mb-10 leading-relaxed">
                {currentService.cta.text}
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg transition-all hover:bg-cyan-50 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                 {currentService.cta.buttonText}
                 <ArrowRight size={20} />
              </button>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
