import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Loader2, Send, X, CheckCircle2, AlertCircle, CheckSquare2, Square } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import emailjs from '@emailjs/browser'; // Ensure you install: npm install @emailjs/browser
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: [],
    message: ''
  });

  useEffect(() => {
    // Check if we arrived here with a service in the state
    if (location.state?.selectedService) {
      const passedService = location.state.selectedService;
      
      setFormData(prev => ({
        ...prev,
        // Wrap in array because your form now supports multiple selections
        service: [passedService] 
      }));
    }
    
    // Check if we arrived with pre-filled message and services
    if (location.state?.prefilledMessage && location.state?.selectedServices) {
      setFormData(prev => ({
        ...prev,
        message: location.state.prefilledMessage,
        service: location.state.selectedServices
      }));
    }
  }, [location.state]);

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
    setFormData(prev => {
      const currentServices = prev.service;
      // Check if service is already selected
      const isSelected = currentServices.includes(serviceTitle);
      
      const updatedServices = isSelected
        ? currentServices.filter(s => s !== serviceTitle) // Remove if already there
        : [...currentServices, serviceTitle];            // Add if new
        
      return { ...prev, service: updatedServices };
    });
    // Note: Removed setIsDropdownOpen(false) so they can pick many at once
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Basic Validation
    if (!formData.fullName || !formData.email || !formData.message) {
      setToast({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setStatus('loading');

    try {
      // --- FIREBASE STRATEGY ---
      // We create a reference to the 'messages' collection
      const messagesRef = collection(db, "messages");

      // Add the new document with a server-side timestamp for accurate sorting
      await addDoc(messagesRef, {
        name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        company: formData.company,
        service_interest: formData.service,
        message: formData.message,
        timestamp: serverTimestamp(), // Critical for the "Newest First" sort
        status: "unread" // Optional: helps you track new vs seen messages
      });

      // Success Logic
      setStatus('success');
      setToast({ 
        type: 'success', 
        message: 'Message sent successfully! Our team will contact you soon.' 
      });

      // Reset Form
      setFormData({ 
        fullName: '', 
        email: '', 
        phone: '', 
        company: '', 
        service: [], 
        message: '' 
      });

    } catch (error) {
      console.error('Firebase Submission Error:', error);
      setStatus('error');
      setToast({ 
        type: 'error', 
        message: 'Failed to send message. Please check your connection and try again.' 
      });
    } finally {
      // Reset status to idle after a delay if it wasn't a success
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
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
            
            {/* Selected Services Tags */}
            {formData.service.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.service.map((service, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2 bg-cyan-600/20 border border-cyan-500/50 rounded-full px-3 py-1.5 text-xs font-medium text-cyan-300">
                    <span>{service}</span>
                    <button
                      type="button"
                      onClick={() => handleServiceSelect(service)}
                      className="hover:text-cyan-200 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <button
              type="button"
              disabled={status === 'loading'}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full bg-[#0d1425] border text-left px-4 py-3.5 rounded-xl flex items-center justify-between 
                        focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all 
                        ${isDropdownOpen ? 'border-cyan-500/50 ring-1 ring-cyan-500/50' : 'border-slate-800/60'}`}
            >
              <span className={`text-sm truncate pr-4 ${formData.service.length > 0 ? "text-slate-100 font-medium" : "text-slate-600"}`}>
                {formData.service.length > 0 
                  ? `${formData.service.length} service${formData.service.length !== 1 ? 's' : ''} selected` 
                  : "Select services..."}
              </span>
              <div className="flex items-center gap-2">
                {formData.service.length > 0 && (
                  <span className="bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    {formData.service.length}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </div>
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
                    <div className="flex-1">
                      <div className="text-sm text-slate-100 font-medium group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {service.sub}
                      </div>
                    </div>
                    <div className="ml-3 text-cyan-500 shrink-0">
                      {formData.service.includes(service.title) ? (
                        <CheckSquare2 className="w-5 h-5" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-500" />
                      )}
                    </div>
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
              className="
                w-full 
                bg-gradient-to-r from-cyan-500 to-blue-600 
                hover:from-cyan-400 hover:to-blue-500 
                text-white font-bold py-4 rounded-xl 
                
                /* Shadows & Glow */
                shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] 
                hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.7)] 
                hover:-translate-y-0.5
                
                /* Disabled State */
                disabled:opacity-70 disabled:cursor-not-allowed 
                disabled:hover:translate-y-0 disabled:hover:shadow-none
                
                /* Transitions */
                transition-all duration-300 
                flex items-center justify-center gap-2 group 
                text-sm sm:text-base relative overflow-hidden
              "
            >
              {/* Text Label */}
              <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>

              {/* Paper Rocket Icon */}
              <Send 
                className={`
                  w-5 h-5 
                  transition-all duration-500 ease-in-out
                  ${status === 'loading' 
                    ? 'translate-x-8 -translate-y-8 opacity-0' /* FLY AWAY ANIMATION */
                    : 'group-hover:translate-x-1 group-hover:-translate-y-1' /* HOVER WIGGLE */
                  }
                `} 
              />

              {/* Optional: Subtle Spinner that fades in behind the rocket */}
              {status === 'loading' && (
                <Loader2 className="absolute right-6 w-5 h-5 animate-spin opacity-50" />
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