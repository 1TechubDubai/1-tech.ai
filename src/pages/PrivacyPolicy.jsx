import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail, Globe, UserCheck, Bell, Users, Archive, ShieldAlert, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "collection",
      icon: <Eye className="text-cyan-400" />,
      title: "1. Information We Collect",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2">a. Information You Provide</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              When you contact us through forms or email, subscribe to newsletters, or use our services, you may provide your Name, Email address, Phone number, and any other details you choose to share.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">b. Automatically Collected Information</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              When you visit our website, we may automatically collect your IP address, browser type and version, pages visited, time spent, and device/operating system information to help us understand user interaction.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <MessageSquare size={14} className="text-cyan-500"/> c. Chat and Automated Interactions
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              When you interact with our automated assistants or AI-powered chat tools, we collect the contents of your conversations to provide relevant support and improve our services. Please refrain from sharing highly sensitive personal or financial information within these chat interfaces.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "usage",
      icon: <FileText className="text-blue-400" />,
      title: "2. How We Use Your Information",
      content: (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-400 text-sm">
          <li className="flex items-start gap-2"><div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" /> Operate and maintain our website</li>
          <li className="flex items-start gap-2"><div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" /> Improve content, AI accuracy, and user experience</li>
          <li className="flex items-start gap-2"><div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" /> Respond to inquiries and support</li>
          <li className="flex items-start gap-2"><div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" /> Prevent fraud and ensure security</li>
        </ul>
      )
    },
    {
      id: "cookies",
      icon: <Globe className="text-indigo-400" />,
      title: "3. Cookies and Tracking",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed lining-nums">
          1techub.ai may use cookies to remember user preferences, analyze traffic patterns, and enhance functionality. You can choose to disable cookies through your browser settings.
        </p>
      )
    },
    {
      id: "sharing",
      icon: <Users className="text-purple-400" />,
      title: "4. Data Sharing and Third Parties",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you. This includes cloud hosting providers, analytics services, and automated artificial intelligence processing tools used to power our customer support features. These third parties are bound by strict confidentiality and data protection obligations.
        </p>
      )
    },
    {
      id: "security",
      icon: <Lock className="text-cyan-400" />,
      title: "5. Data Security",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          We take reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security against unauthorized access or breaches.
        </p>
      )
    },
    {
      id: "rights",
      icon: <UserCheck className="text-blue-400" />,
      title: "6. Your Privacy Rights",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          Depending on your location (such as under GDPR or CCPA), you may have the right to access, correct, or delete your data, withdraw consent, restrict processing, or request data portability. To exercise these rights, please contact us using the details below.
        </p>
      )
    },
    {
      id: "retention",
      icon: <Archive className="text-indigo-400" />,
      title: "7. Data Retention & Transfers",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. As an international entity, your data may be transferred to, and processed in, countries outside of your jurisdiction. We ensure appropriate safeguards are in place for such cross-border transfers.
        </p>
      )
    },
    {
      id: "children",
      icon: <ShieldAlert className="text-purple-400" />,
      title: "8. Children's Privacy",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          Our services are intended for a general business audience and are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected such data, we will take steps to delete it promptly.
        </p>
      )
    },
    {
      id: "updates",
      icon: <Bell className="text-cyan-400" />,
      title: "9. Changes to This Policy",
      content: (
        <p className="text-slate-400 text-sm leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page, and the "Effective Date" will be updated accordingly.
        </p>
      )
    }
  ];

  return (
    <div className="fixed top-0 left-0 overflow-y-scroll h-full w-full bg-[#020617] text-slate-300 selection:bg-cyan-500/30">
      <Navbar />

      {/* Header Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 mb-6"
          >
            <Shield size={14} className="text-cyan-400" />
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Trust & Transparency</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-mono text-sm"
          >
            Effective Date: 23/01/2026
          </motion.p>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-6 pb-32 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20">
          
          {/* Navigation Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <nav className="space-y-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Contents</p>
              {sections.map((section) => (
                <a 
                  key={section.id} 
                  href={`#${section.id}`}
                  className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors border-l border-slate-800 pl-4 py-1 hover:border-cyan-500"
                >
                  {/* Safely splits the title to remove the number for the sidebar menu */}
                  {section.title.split('. ')[1]}
                </a>
              ))}
            </nav>
          </aside>

          {/* Policy Text Area */}
          <div className="lg:col-span-9 space-y-12">
            <section className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
              <p className="text-lg leading-relaxed text-slate-300 lining-nums">
                At 1TecHub (“we,” “our,” or “us”), your privacy is important to us. This Privacy Policy document explains what information we collect, how we use it, and your rights regarding that information.
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
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{section.title}</h2>
                </div>
                <div className="pl-2 lg:pl-16">
                  {section.content}
                </div>
              </motion.section>
            ))}

            {/* Contact Section */}
            <section className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 text-cyan-500/5 rotate-12">
                <Mail size={120} />
               </div>
               <h2 className="text-3xl font-bold text-white mb-6 relative z-10">10. Contact Us</h2>
               <p className="text-slate-400 mb-8 relative z-10">If you have questions or concerns about this Privacy Policy, our team is here to help.</p>
               <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                  <a href="mailto:contactus@1techub.com" className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors lining-nums">
                    <Mail size={20} /> contactus@1techub.com
                  </a>
                  <a href="https://1techub.ai" className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors lining-nums">
                    <Globe size={20} /> 1techub.ai
                  </a>
               </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
