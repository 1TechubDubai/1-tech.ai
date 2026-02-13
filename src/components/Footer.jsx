import React from 'react';
import logo from "../assets/logo.svg";
import { Linkedin, Instagram, Mail, Phone, Cpu, Twitter } from 'lucide-react';
import { BrandWhatsapp } from 'tabler-icons-react';

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 right-0 bg-[#0a0f1d] pt-1 border-t border-slate-800 relative font-sans mt-12">
      {/* Subtle Cyan Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-75"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 justify-between">
          
          {/* Left Section: Brand & About */}
          <div className="space-y-6 max-w-sm">
            {/* Logo area */}
            <div className="flex items-center gap-2 text-white">
              <img src={logo} alt="1TecHub Logo" className="w-1/2 h-1/2" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-slate-100 font-semibold tracking-wide text-left">
                Intelligent AI. Exponential Growth.
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed text-left">
                1TecHub leads the AI revolution, merging autonomous intelligence with innovation to help enterprises automate, scale, and excel.
              </p>
            </div>
          </div>

          {/* Right Section: Connect & Contact */}
          <div className="flex flex-col md:items-end space-y-6">
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">
              Connect With Us
            </h4>
            
            {/* Social Icons */}
            <div className="flex gap-5 text-slate-400">
              <a href="https://www.linkedin.com/company/1techub/" className="hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300 p-2 bg-slate-800/50 rounded-lg hover:bg-slate-800">
                <Linkedin size={20} />
              </a>
              {/* <a href="#" className="hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300 p-2 bg-slate-800/50 rounded-lg hover:bg-slate-800">
                <Instagram size={20} />
              </a> */}
              <a href="https://wa.me/971585369749" className="hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300 p-2 bg-slate-800/50 rounded-lg hover:bg-slate-800">
                <BrandWhatsapp size={20} />
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col md:items-end space-y-3 pt-2">
              <a href="tel:+971529998266" className="group flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm md:text-base font-medium">
                <Phone size={16} className="text-slate-500 group-hover:text-cyan-500 transition-colors" />
                +971 52 9998266
              </a>
              <a href="mailto:contactus@1techub.ai" className="group flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm md:text-base font-medium">
                <Mail size={16} className="text-slate-500 group-hover:text-cyan-500 transition-colors" />
                contactus@1techub.ai
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-slate-800/80 my-8"></div>

        {/* Bottom Section: Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2025 1TecHub Company. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;