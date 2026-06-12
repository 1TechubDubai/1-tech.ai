import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './App.css';

// Page Imports
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx'; 
import Contact from './pages/Contact.jsx';
import Partners from './pages/Partners.jsx';
import AIAdvisoryPage from './pages/Advisory.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import BlogsMain from './pages/BlogsMain.jsx';
import BlogPage from './pages/BlogPage.jsx';

// Component Imports
import GeminiChatbot from './components/GeminiChatBot.jsx';
import SEO from './components/SEO.jsx'; // <-- 1. IMPORT YOUR SEO COMPONENT HERE

function App() {
  const [geminiKey, setGeminiKey] = useState(null);
  const [ttsKey, setTtsKey] = useState(null);
  const [error, setError] = useState(false);

  // Ensure VITE_SECRET_KEY is defined in your .env file
  const SHARED_SECRET = import.meta.env.VITE_SECRET_KEY; 

  /**
   * Decrypts hex-encoded AES-256-CBC data from the server
   */
  const decryptString = (encryptedData) => {
    try {
      const [ivHex, encryptedHex] = encryptedData.split(':'); 
      const iv = CryptoJS.enc.Hex.parse(ivHex);
      const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);
      const key = CryptoJS.enc.Utf8.parse(SHARED_SECRET);

      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encrypted },
        key,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
      );

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error("Decryption error:", e);
      return null;
    }
  };

  /**
   * Fetch encrypted keys on app mount
   */
  useEffect(() => {
    const fetchAndDecryptKeys = async () => {
      try {
        const response = await fetch('https://1techub.ai/api/v1/secure-gate');
        if (!response.ok) throw new Error("Failed to fetch keys");
        
        const { geminiData, ttsData } = await response.json();
        
        const rawGeminiKey = decryptString(geminiData);
        const rawTtsKey = decryptString(ttsData);

        if (rawGeminiKey && rawTtsKey) {
          setGeminiKey(rawGeminiKey);
          setTtsKey(rawTtsKey);
        } else {
          throw new Error("Decryption returned empty strings");
        }
      } catch (err) {
        console.error("Security Handshake Failed:", err);
        setError(true);
      }
    };

    fetchAndDecryptKeys();
  }, []);

  return (
    <BrowserRouter>
      {/* 
        2. GLOBAL BASELINE SEO
        This injects your default Title, Meta Description, and Enterprise Schema across the entire app.
        Dynamic pages (like Services and Blogs) will automatically overwrite this.
      */}
      <SEO />

      {/* 
          Chatbot only renders when keys are successfully decrypted.
          This prevents the bot from crashing with 'undefined' keys. 
      */}
      {geminiKey && ttsKey && (
        <GeminiChatbot apiKey={geminiKey} ttsApiKey={ttsKey} />
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Dynamic Services Routing using :slug */}
        <Route path="/services/:slug" element={<Services />} />

        {/* Redirect base /services to a default service page */}
        <Route path="/services" element={<Navigate to="/services/custom-ai-solutions" replace />} />
        
        <Route path='/contact' element={<Contact />} />
        <Route path='/solutions' element={<Partners />} />
        <Route path='/ai-advisory' element={<AIAdvisoryPage />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/blogs' element={<BlogsMain />} />
        <Route path='/blogs/:id' element={<BlogPage />} />
        
        {/* Catch-all route: redirect any invalid route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;