import Navbar from "../components/Navbar";
import MessageForm from "../components/MessageForm";
import Footer from "../components/Footer"; // Assuming you have this from previous steps
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  FileText, 
  Rocket 
} from 'lucide-react';

const Contact = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 overflow-y-scroll bg-[#020617] min-h-screen text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Navbar (Fixed z-index handled inside component) */}
      <Navbar />

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="relative pt-20 sm:pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Top Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Text & Contact Details */}
          <div className="space-y-12">
            
            {/* Heading Group */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Let's Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Future Together.
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                Ready to start your autonomous revolution? Reach out to our Dubai HQ 
                to discuss your strategic goals.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-8">
              
              {/* Phone */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xs text-left font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</h4>
                  <p className="text-lg font-medium text-white">+971 56 800 1040</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 text-left">Email</h4>
                  <a href="mailto:contactus@1techub.ai" className="text-lg font-medium text-white hover:text-cyan-400 transition-colors">
                    contactus@1techub.ai
                  </a>
                </div>
              </div>

              {/* Headquarters */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 text-left">Headquarters</h4>
                  <p className="text-lg font-medium text-white leading-snug">
                    Meydan Grand Stand, 6th Floor,
                    Meydan Road, Dubai, UAE
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized Map Placeholder */}
            <div onClick={() => window.open("https://share.google/FnUDnFxS1Fl9TTk8R", "_blank")} className="relative h-48 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 group cursor-pointer">
              {/* Abstract Grid Lines for "Tech" Feel */}
              <div className="absolute inset-0 opacity-20" 
                   style={{backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
              </div>
              
              {/* Location Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping absolute"></div>
                <div className="relative w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center border-4 border-[#020617] text-white shadow-lg z-10">
                  <MapPin size={14} />
                </div>
                <div className="mt-2 bg-slate-900/90 px-3 py-1 rounded text-xs text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
                  Meydan Grand Stand
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Message Form */}
          <div className="relative">
            {/* Glow Effect behind form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl -z-10"></div>
            
            <MessageForm />
          </div>

        </div>

        {/* --- BOTTOM SECTION: PROCESS STEPS --- */}
        <div className="mt-32 border-t border-slate-800/50 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What to expect when you reach out.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#0a0f1d] border border-slate-700 flex items-center justify-center text-slate-400 mb-6 group-hover:border-cyan-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_-10px_rgba(0,0,0,0.5)]">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Initial Discovery</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                We listen to your challenges and identify immediate AI opportunities tailored to your business.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#0a0f1d] border border-slate-700 flex items-center justify-center text-slate-400 mb-6 group-hover:border-cyan-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_-10px_rgba(0,0,0,0.5)]">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Strategic Roadmap</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                We present a tailored architecture and implementation plan designed for scale.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#0a0f1d] border border-slate-700 flex items-center justify-center text-slate-400 mb-6 group-hover:border-cyan-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_-10px_rgba(0,0,0,0.5)]">
                <Rocket size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Agile Launch</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                We deploy your pilot within weeks, not months, ensuring rapid time-to-value.
              </p>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Contact;