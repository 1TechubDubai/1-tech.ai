import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { allServicesData } from "../data/ServicesData"; 
import { ArrowRight, X, Menu } from 'lucide-react';

// --- HELPER COMPONENTS ---

const SectionCard = ({ item, index = 0 }) => (
  <div 
    style={{
      animation: `slideUp 0.6s ease-out forwards`,
      animationDelay: `${index * 0.1}s`,
      opacity: 0
    }}
    className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md border border-cyan-500/30 transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(0,184,219,0.3)] h-full">
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-cyan-500/0 group-hover:to-cyan-500/10 transition-all duration-300 pointer-events-none" />
    
    <div className="flex items-start gap-4 relative z-10">
      <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border border-cyan-500/40 text-cyan-400 group-hover:text-white group-hover:bg-cyan-600/30 group-hover:border-cyan-500/80 transition-all duration-300 shrink-0 group-hover:scale-110">
        <item.icon size={24} />
      </div>
      <div>
        <h4 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
          {item.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
          {item.desc}
        </p>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ item, index = 0 }) => (
  <div 
    style={{
      animation: `slideUp 0.6s ease-out forwards`,
      animationDelay: `${index * 0.1}s`,
      opacity: 0
    }}
    className="group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md border border-cyan-500/30 h-full transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(0,184,219,0.3)]">
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-cyan-500/0 group-hover:to-cyan-500/10 transition-all duration-300 pointer-events-none" />
    
    <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 border border-cyan-500/40 group-hover:scale-110 transition-transform duration-300">
      <item.icon size={28} />
    </div>
    <h3 className="relative z-10 text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
    <p className="relative z-10 text-xs sm:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
  </div>
);

// --- FIXED SCROLLNAV COMPONENT ---
const ScrollNav = ({ sections, activeSection, scrollToSection, isMobileVisible }) => {
  const navRefs = useRef([]);
  // Fixed: Use useState for style, not useRef
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, top: '0px', height: '0px' });

  useEffect(() => {
    const activeIndex = sections.findIndex((s) => s.id === activeSection);
    // Safety check in case activeIndex is -1
    if (activeIndex === -1) {
        setIndicatorStyle({ opacity: 0, top: '0px', height: '0px' });
        return;
    }
    
    const currentButton = navRefs.current[activeIndex];

    if (currentButton) {
      setIndicatorStyle({
        height: `${currentButton.offsetHeight}px`,
        top: `${currentButton.offsetTop}px`,
        opacity: 1
      });
    }
  }, [activeSection, sections]);

  return (
    <div className={`hidden lg:block sticky top-32 space-y-4 transition-opacity duration-300 ${isMobileVisible ? 'opacity-100' : 'opacity-100'}`}>
      <div className="relative pl-4 sm:pl-6 border-l-2 border-slate-800 space-y-6">
        
        {/* Animated Active Line Indicator */}
        <div
          className="absolute left-[-2px] w-[2px] bg-gradient-to-b from-cyan-500 to-cyan-400 transition-all duration-500 ease-in-out shadow-[0_0_10px_rgba(0,184,219,0.5)]"
          style={indicatorStyle}
        />

        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              ref={el => navRefs.current[index] = el}
              onClick={() => scrollToSection(section.id)}
              className={`group flex flex-col items-start text-left transition-all duration-300 w-full py-2 ${isActive ? 'scale-105' : 'opacity-60 hover:opacity-100'}`}
            >
              <div
                className={`
                  w-12 h-12 sm:w-16 sm:h-12 rounded-xl flex items-center justify-center mb-2 border transition-all duration-300
                  ${isActive
                    ? 'bg-[#0a0f1d] border-cyan-500 text-cyan-400 shadow-[0_0_20px_-5px_rgba(0,184,219,0.6)]'
                    : 'bg-slate-900 border-slate-700 text-slate-500 group-hover:border-cyan-500/30'}
                `}
              >
                <section.icon size={20} />
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wider truncate ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}
              >
                {section.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const MobileNav = ({ sections, activeSection, scrollToSection, isOpen, onClose }) => {
  const handleClick = (id) => {
    onClose();
    setTimeout(() => {
      scrollToSection(id);
    }, 350); 
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      <div className={`
        fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-[#020617] to-[#0a0f1d] border-r border-slate-800 z-50 lg:hidden
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 transition-colors"
        >
          <X size={20} className="text-slate-400" />
        </button>

        <div className="pt-20 px-6 space-y-2">
          <div className="mb-6 pl-1 border-l-2 border-cyan-500">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase pl-2">Service Sections</span>
          </div>
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className={`
                  w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 text-left group
                  ${isActive 
                    ? 'bg-cyan-950/40 border border-cyan-500/30 text-cyan-400' 
                    : 'hover:bg-slate-800/50 text-slate-400 hover:text-white border border-transparent'}
                `}
              >
                <div className={`
                  p-2 rounded-lg transition-colors
                  ${isActive ? 'bg-cyan-500/20' : 'bg-slate-800 group-hover:bg-slate-700'}
                `}>
                  <section.icon size={18} />
                </div>
                <span className="text-sm font-semibold">{section.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

// --- MAIN PAGE COMPONENT ---

const Services = () => {
  const { slug } = useParams();
  
  const [activeSection, setActiveSection] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const navigate = useNavigate()

  const currentService = useMemo(() => {
    if (!slug) return allServicesData[0];
    return allServicesData.find(s => s.slug === slug || s.id === slug) || null;
  }, [slug]);

  useEffect(() => {
    if (currentService?.sections?.length > 0) {
      setActiveSection(currentService.sections[0].id);
    }
  }, [currentService]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !currentService?.sections) return;

    const handleScroll = () => {
      setIsScrolling(true);
      setIsMobileNavVisible(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        setIsMobileNavVisible(false);
      }, 2000);

      // Offset of 300px helps trigger the active state a bit before the section hits the very top
      const scrollPosition = container.scrollTop + 15; 
      
      currentService.sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
             // Check if we are past the element
             if (element.offsetTop <= scrollPosition) {
                 setActiveSection(section.id);
             }
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentService]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const container = containerRef.current;
    
    if (element && container) {
      // 100px offset for the fixed navbar
      const offsetTop = element.offsetTop - 120; 

      container.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      setActiveSection(id);
    }
  };

  if (!currentService) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
        <Navbar />
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-slate-400 mb-8">We couldn't find the service you're looking for.</p>
        <a href="/" className="px-6 py-3 bg-cyan-600 rounded-full hover:bg-cyan-500 transition">Return Home</a>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed left-0 top-0 w-full h-full bg-[#020617] min-h-screen text-white font-sans selection:bg-cyan-500/30 overflow-y-scroll scroll-smooth"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
        <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
  ` }} />
      
      {/* --- DYNAMIC AMBIENT BACKGROUND GLOWS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left Cyan Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/10 blur-[120px] mix-blend-screen" />
        {/* Bottom Right Deep Blue Glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-800/10 blur-[150px] mix-blend-screen" />
        {/* Middle Soft Glow */}
        <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-900/10 blur-[150px] mix-blend-screen" />
        {/* Optional Noise Texture for Depth */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="fixed top-0 w-full z-50">
          <Navbar />
      </div>

      <button 
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        className={`
          fixed bottom-8 left-8 lg:hidden z-40 p-3 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white transition-all duration-300
          hover:scale-110 hover:shadow-[0_0_20px_rgba(0,184,219,0.5)]
          ${isMobileNavVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
        `}
      >
        {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <MobileNav 
        sections={currentService.sections} 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 h-[70vh] sm:h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={currentService.hero.backgroundImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#020617]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl px-4 sm:px-6 text-center mt-16 sm:mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 mb-6 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
               {currentService.title}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 sm:mb-8 drop-shadow-2xl leading-[1.1] animate-slide-up">
            {currentService.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            {currentService.hero.description}
          </p>
        </div>
      </section>

      {/* --- MAIN SERVICES NAV & CONTENT --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left Navigation */}
          <div className="lg:col-span-3">
              <ScrollNav 
                sections={currentService.sections} 
                activeSection={activeSection} 
                scrollToSection={scrollToSection}
                isMobileVisible={isMobileNavVisible}
              />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-9 space-y-20 sm:space-y-24 md:space-y-32 pt-6 sm:pt-10">
            {currentService.sections.map((section, sectionIdx) => (
              <div key={section.id} id={section.id} className="scroll-mt-32 relative z-10">
                <div className="mb-8 sm:mb-10 pl-4 border-l-4 border-cyan-500 animate-slide-up">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{section.title}</h2>
                  <p className="text-sm sm:text-base text-cyan-100/60">Enterprise-grade capabilities tailored for scale.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {section.cards.map((card, cardIdx) => (
                    <SectionCard key={cardIdx} item={card} index={cardIdx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      {currentService.features && (
        <section className="relative z-10 py-12 sm:py-20 md:py-24 bg-gradient-to-b from-[#050b1f]/80 to-transparent border-t border-slate-800/50 backdrop-blur-sm">
           <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16 animate-slide-up">
                 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 lining-nums">Why Choose 1TecHub?</h2>
                 <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                   We bring a proactive, insight-led approach to managed services, ensuring your technology is an asset, not an obstacle.
                 </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                 {currentService.features.map((feature, idx) => (
                    <FeatureCard key={idx} item={feature} index={idx} />
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* --- CTA BANNER --- */}
      {currentService.cta && (
        <section className="relative z-10 py-12 md:py-20 overflow-hidden">
          {/* BIG background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div style={{
              width: 'min(70vw, 900px)', height: 'min(70vw, 900px)',
              maxWidth: '900px', maxHeight: '900px',
              background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, rgba(99,102,241,0.06) 30%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translateY(-10%)'
            }} />
          </div>

          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
            <div
              className="relative p-8 sm:p-10 md:p-14 rounded-3xl md:rounded-[2.5rem] overflow-hidden animate-slide-up shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{
                background: 'linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(8,14,31,0.98) 100%)',
                border: '1px solid rgba(34,211,238,0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}>
              
              {/* Top glow inside the card */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[400px] h-[200px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top, rgba(34,211,238,0.2) 0%, transparent 70%)' }} 
              />
              
              {/* Corner accents */}
              <div className="absolute top-6 left-6 w-12 h-12 md:w-16 md:h-16 rounded-tl-2xl pointer-events-none border-t-2 border-l-2 border-cyan-400/40" />
              <div className="absolute bottom-6 right-6 w-12 h-12 md:w-16 md:h-16 rounded-br-2xl pointer-events-none border-b-2 border-r-2 border-indigo-500/40" />

              <p 
                style={{ fontFamily: "'Space Mono', monospace" }} 
                className="text-xs md:text-sm tracking-[0.3em] text-cyan-400 uppercase mb-4"
              >
                Ready to Begin
              </p>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                {currentService.cta.title}
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                {currentService.cta.text}
              </p>          
              
              <div className="w-[85%] sm:w-auto mx-auto mb-2 flex justify-center">
                <button 
                  onClick={() => navigate('/contact', { state: { selectedService: currentService.title } })}
                  className="w-full sm:w-auto text-center px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg text-white bg-transparent border-cyan-400 border hover:bg-cyan-950/60 hover:border-cyan-300 flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    boxShadow: '0 10px 30px rgba(34,211,238,0.12)',
                    background: 'radial-gradient(ellipse at top, rgba(34,211,238,0.15) 0%, transparent 80%)'
                  }}
                >
                  <span className="whitespace-nowrap">{currentService.cta.buttonText}</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              
            </div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
      `}</style>

      {/* Footer needs to sit above the ambient background as well */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Services;
