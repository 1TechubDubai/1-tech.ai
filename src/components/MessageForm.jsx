import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight, Check } from 'lucide-react';

const MessageForm = ({ showTitle = true, className = "" }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add your submit logic here
  };

  return (
    // Removed min-h-screen and centering. Now it fills its parent container.
    <div className={`w-full font-sans ${className}`}>
      
      {/* Card Container */}
      <div className="w-full bg-[#0a0f1d] border border-slate-800/80 rounded-[2rem] p-6 sm:p-8 shadow-[0_0_50px_-12px_rgba(14,165,233,0.15)] relative overflow-visible">
        
        {/* Optional Header (Hide this on Contact Page) */}
        {showTitle && (
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Ready to lead the AI revolution?
            </h1>
            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
              Let's discuss how we can transform your business with intelligent automation
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#0d1425] border border-slate-800 text-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0d1425] border border-slate-800 text-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
          </div>

          {/* Row 2: Phone & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#0d1425] border border-slate-800 text-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">Company</label>
              <input
                type="text"
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-[#0d1425] border border-slate-800 text-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
          </div>

          {/* Row 3: Custom Services Select */}
          <div className="space-y-1.5 relative" ref={dropdownRef}>
            <label className="text-xs font-medium text-slate-400 ml-1">AI Solution Needed</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#0d1425] border border-slate-800 text-left px-4 py-3 rounded-xl flex items-center justify-between focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            >
              <span className={`text-sm ${formData.service ? "text-slate-100 font-medium" : "text-slate-600"}`}>
                {formData.service || "Select a service..."}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-[#0d1425] border border-slate-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar">
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
            )}
          </div>

          {/* Row 4: Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 ml-1">Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your AI needs..."
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-[#0d1425] border border-slate-800 text-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 resize-none text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-white font-bold py-3.5 rounded-full shadow-[0_0_20px_-3px_rgba(14,165,233,0.6)] hover:shadow-[0_0_25px_-3px_rgba(14,165,233,0.8)] transition-all flex items-center justify-center gap-2 group text-sm"
            >
              <span>Send Message</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>

      {/* Fixed: Removed 'jsx' attribute */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0d1425;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
};

export default MessageForm;