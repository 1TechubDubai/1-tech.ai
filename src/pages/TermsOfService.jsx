import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, Scale, ShieldAlert, Cpu, Share2, AlertTriangle, XCircle, Globe, Mail, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  const sections = [
    {
      id: "usage",
      icon: <Scale className="text-cyan-400" />,
      title: "1. Use of the Website",
      content: (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            You agree to use this Website only for lawful purposes. Prohibited activities include:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-400 text-sm">
            <li className="flex items-center gap-2"><XCircle size={14} className="text-red-500" /> Fraudulent or illegal activities</li>
            <li className="flex items-center gap-2"><XCircle size={14} className="text-red-500" /> Unauthorized system access</li>
            <li className="flex items-center gap-2"><XCircle size={14} className="text-red-500" /> Distributing malicious code</li>
            <li className="flex items-center gap-2"><XCircle size={14} className="text-red-500" /> Interfering with functionality</li>
          </ul>
        </div>
      )
    },
    {
      id: "ip",
      icon: <Cpu className="text-blue-400" />,
      title: "2. Intellectual Property",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          All content on 1techub.ai, including Text, Graphics, Logos, and Software, is the property of 1TecHub. You may not reproduce or republish content without prior written permission.
        </p>
      )
    },
    {
      id: "links",
      icon: <Share2 className="text-indigo-400" />,
      title: "4. Third-Party Links",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          We are not responsible for the content, privacy policies, or practices of any third-party websites linked on our site. Accessing these links is at your own risk.
        </p>
      )
    },
    {
      id: "disclaimer",
      icon: <AlertTriangle className="text-amber-400" />,
      title: "5. Disclaimer of Warranties",
      content: (
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-400 text-sm italic">
          "The Website is provided 'as is' and 'as available.' We make no warranties regarding accuracy, reliability, or suitability for any purpose."
        </div>
      )
    },
    {
      id: "liability",
      icon: <ShieldAlert className="text-red-400" />,
      title: "6. Limitation of Liability",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          To the fullest extent permitted by law, 1TecHub shall not be liable for any damages arising from the use or inability to use the Website, including data errors or interruptions.
        </p>
      )
    },
    {
      id: "law",
      icon: <Globe className="text-cyan-400" />,
      title: "9. Governing Law",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          These Terms shall be governed and interpreted in accordance with the laws of <span className="text-white font-medium">United Arab Emirates / Dubai</span>, without regard to conflict of law principles.
        </p>
      )
    }
  ];

  return (
    <div className="fixed top-0 left-0 overflow-y-scroll h-full w-full bg-[#020617] text-slate-300 selection:bg-cyan-500/30">
      <Navbar />

      {/* Header Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-950/30 border border-blue-500/20 mb-6"
          >
            <Gavel size={14} className="text-blue-400" />
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Legal Framework</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-mono text-sm"
          >
            Last Updated: 23/01/2026
          </motion.p>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-6 pb-32 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Navigation Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <nav className="space-y-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Terms Navigation</p>
              {sections.map((section) => (
                <a 
                  key={section.id} 
                  href={`#${section.id}`}
                  className="block text-sm text-slate-400 hover:text-blue-400 transition-colors border-l border-slate-800 pl-4 py-1 hover:border-blue-500"
                >
                  {section.title.split('. ')[1]}
                </a>
              ))}
            </nav>
          </aside>

          {/* Policy Text Area */}
          <div className="lg:col-span-9 space-y-12">
            <section className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
              <p className="text-lg leading-relaxed text-slate-300">
                Welcome to 1TecHub. By accessing or using <span className="text-white">https://1techub.ai</span>, you agree to be bound by these Terms of Service. If you do not agree with any part of these Terms, please do not use our Website.
              </p>
            </section>

            {sections.map((section) => (
              <motion.section 
                key={section.id} 
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-32"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{section.title}</h2>
                </div>
                <div className="pl-2 lg:pl-16">
                  {section.content}
                </div>
              </motion.section>
            ))}

            {/* Acceptance Section */}
            <section className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 to-slate-950 border border-blue-500/20 relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 text-blue-500/5 pointer-events-none">
                <CheckCircle2 size={300} />
               </div>
               <h2 className="text-3xl font-bold text-white mb-6 relative z-10">11. Contact Us</h2>
               <p className="text-slate-400 mb-8 relative z-10">Questions regarding these terms? Reach out to our legal and support team.</p>
               <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                  <a href="mailto:contactus@1techub.ai" className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    <Mail size={20} /> contactus@1techub.ai
                  </a>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Globe size={20} /> 1techub.ai
                  </div>
               </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;