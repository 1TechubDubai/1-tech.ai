import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight, Check, Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser'; // Ensure you install: npm install @emailjs/browser

// --- INTERNAL TOAST COMPONENT ---
const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000); // Auto close after 5s
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className={`
      fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]
      flex items-start gap-3 p-4 pr-10 rounded-xl border backdrop-blur-md shadow-2xl
      transform transition-all duration-500 animate-slide-in-up
      ${isSuccess 
        ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-100 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]' 
        : 'bg-red-950/80 border-red-500/50 text-red-100 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]'}
    `}>
      {isSuccess ? <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />}
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold">{isSuccess ? 'Message Sent!' : 'Error'}</h4>
        <p className="text-xs opacity-90 leading-relaxed">{message}</p>
      </div>
      <button onClick={onClose} className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- MAIN FORM COMPONENT ---
const MessageForm = ({ showTitle = true, className = "" }) => {
  const formRef = useRef(); // Ref for EmailJS
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: '' }

  const services = [
    { id: 'intelligent-systems', title: 'Intelligent Systems', sub: 'Autonomous workforce systems' },
    { id: 'gen-ai', title: 'Generative AI', sub: 'RAG & content engines' },
    { id: 'ml', title: 'Machine Learning', sub: 'Predictive analytics models' },
    { id: 'computer-vision', title: 'Computer Vision', sub: 'Image & video recognition' },
    { id: 'nlp', title: 'NLP Solutions', sub: 'Text analysis & processing' },
    { id: 'data-eng', title: 'Data Engineering', sub: 'Big data & warehousing' },
    { id: 'strategy', title: 'Strategic Consulting', sub: 'AI transformation roadmap' },
    { id: 'voice-ai', title: 'Voice AI', sub: 'Conversational intelligence' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceTitle) => {
    setFormData(prev => ({ ...prev, service: serviceTitle }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.fullName || !formData.email || !formData.message) {
      setToast({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setStatus('loading');

    // --- EMAIL SENDING LOGIC ---
    try {
      /* REPLACE THESE STRINGS WITH YOUR ACTUAL EMAILJS KEYS 
         Get them from https://dashboard.emailjs.com/
      */
      const SERVICE_ID = 'YOUR_SERVICE_ID'; 
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; 
      const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; 

      // NOTE: Remove this simulated timeout when using real EmailJS
      // await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      
      // SIMULATION (For demo purposes so you see the UI work immediately)
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      setStatus('success');
      setToast({ type: 'success', message: 'We have received your inquiry. Our team will contact you shortly.' });
      
      // Reset Form
      setFormData({ fullName: '', email: '', phone: '', company: '', service: '', message: '' });

    } catch (error) {
      console.error('Email Error:', error);
      setStatus('error');
      setToast({ type: 'error', message: 'Failed to send message. Please try again later or email us directly.' });
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className={`w-full font-sans relative ${className}`}>
      
      {/* Toast Notification Container */}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      {/* Background Glow Effect behind the form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Card Container */}
      <div className="relative w-full bg-[#0a0f1d]/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-visible">
        
        {/* Header */}
        {showTitle && (
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-slate-900/50 border border-slate-700/50">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">Contact Us</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Ready to lead the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI revolution?</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              Let's discuss how we can transform your business with intelligent automation.
            </p>
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full bg-[#0d1425] border border-slate-800/60 text-slate-100 px-4 py-3.5 rounded-xl 
                           focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Email *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full bg-[#0d1425] border border-slate-800/60 text-slate-100 px-4 py-3.5 rounded-xl 
                           focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
          </div>

          {/* Row 2: Phone & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full bg-[#0d1425] border border-slate-800/60 text-slate-100 px-4 py-3.5 rounded-xl 
                           focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Company</label>
              <input
                type="text"
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full bg-[#0d1425] border border-slate-800/60 text-slate-100 px-4 py-3.5 rounded-xl 
                           focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
          </div>

          {/* Row 3: Custom Services Select */}
          <div className="space-y-1.5 relative" ref={dropdownRef}>
            <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">AI Solution Needed</label>
            <button
              type="button"
              disabled={status === 'loading'}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full bg-[#0d1425] border text-left px-4 py-3.5 rounded-xl flex items-center justify-between 
                         focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                         ${isDropdownOpen ? 'border-cyan-500/50 ring-1 ring-cyan-500/50' : 'border-slate-800/60'}`}
            >
              <span className={`text-sm ${formData.service ? "text-slate-100 font-medium" : "text-slate-600"}`}>
                {formData.service || "Select a service..."}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div 
              className={`
                absolute left-0 right-0 top-[calc(100%+8px)] z-50 
                bg-[#0d1425] border border-slate-700/50 rounded-xl shadow-2xl shadow-black/50 
                overflow-hidden transition-all duration-200 origin-top
                ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
              `}
            >
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceSelect(service.title)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-0 flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm text-slate-100 font-medium group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {service.sub}
                      </div>
                    </div>
                    {formData.service === service.title && (
                      <Check className="w-4 h-4 text-cyan-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Message *</label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell us about your AI needs..."
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full bg-[#0d1425] border border-slate-800/60 text-slate-100 px-4 py-3 rounded-xl 
                         focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all placeholder:text-slate-600 resize-none text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl 
                         shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.7)] hover:-translate-y-0.5
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
                         transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base relative overflow-hidden"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0d1425;
          border-radius: 0 0 12px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MessageForm;