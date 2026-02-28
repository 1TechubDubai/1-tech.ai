import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Adjust path if necessary
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ArrowRight, Settings, SlidersHorizontal, Clock, Loader2 } from 'lucide-react';

// Adjusted categories to match your Admin Panel dropdown options
const CATEGORIES = [
  "ALL", 
  "GENERAL", 
  "ARTIFICIAL INTELLIGENCE", 
  "GENERATIVE AI", 
  "SOFTWARE ARCHITECTURE", 
  "AUTONOMOUS SYSTEMS",
  "DATA & ANALYTICS"
];

const BlogsMain = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' | 'oldest'

  // Fetch data from Firebase
  useEffect(() => {
    // Only fetch active (published) posts
    const q = query(collection(db, "blog_posts"), where("status", "==", "active"));
    
    const unsub = onSnapshot(q, (snap) => {
      const fetchedPosts = snap.docs.map(doc => {
        const data = doc.data();
        
        // Format the Firebase Timestamp into a cyber-aesthetic date (YYYY.MM.DD)
        let dateStr = "PENDING";
        if (data.createdAt) {
          const d = data.createdAt.toDate();
          dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
        }

        return {
          id: doc.id,
          ...data,
          dateStr,
          // Fallback image if none was uploaded
          featuredImage: data.featuredImage || "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop"
        };
      });

      setPosts(fetchedPosts);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Filter and Sort Logic
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by Category (Case insensitive matching)
    if (activeCategory !== "ALL") {
      result = result.filter(post => post.category?.toUpperCase() === activeCategory);
    }

    // Filter by Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        post => 
          post.title?.toLowerCase().includes(lowerSearch) || 
          post.excerpt?.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort by Date using Firebase Timestamps
    result.sort((a, b) => {
      const timeA = a.createdAt?.toMillis() || 0;
      const timeB = b.createdAt?.toMillis() || 0;
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [posts, searchTerm, activeCategory, sortOrder]);

  // The first post becomes featured, the rest go to the grid
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.slice(1);

  return (
    <div 
      className="fixed w-full h-full top-0 left-0 overflow-y-scroll bg-[#020617] min-h-screen text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      ` }} />
      
      <Navbar />

      <div className="relative pt-24 sm:pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 lining-nums">
              1Techub <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Transmission</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Signal vs Noise. Deep dives into Artificial Intelligence, autonomous systems, and the future of enterprise.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search Protocol..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border border-cyan-500/30 rounded-lg py-2.5 pl-11 pr-4 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all text-white placeholder:text-slate-600 font-mono"
              />
            </div>
            
            {/* Sort Toggle */}
            <button 
              onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center gap-2 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors text-sm font-bold tracking-wider uppercase text-slate-400"
            >
              <Clock size={16} />
              {sortOrder}
            </button>
          </div>
        </div>

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="w-full h-64 flex flex-col items-center justify-center text-cyan-500 gap-4">
            <Loader2 size={40} className="animate-spin" />
            <p className="font-mono text-xs uppercase tracking-widest">Accessing Mainframe...</p>
          </div>
        )}

        {/* ── FEATURED ARTICLE (First Post) ── */}
        {!loading && featuredPost && (
          <div 
            onClick={() => navigate(`/blogs/${featuredPost.id}`)}
            className="mb-20 group cursor-pointer border border-slate-800/60 rounded-3xl overflow-hidden bg-slate-900/20 hover:border-cyan-500/40 transition-all duration-500 flex flex-col lg:flex-row shadow-2xl shadow-black"
          >
            {/* Image Half */}
            <div className="lg:w-1/2 h-64 lg:h-[500px] relative overflow-hidden bg-black border-r border-slate-800/60">
              <img 
                src={featuredPost.featuredImage} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase font-mono bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-cyan-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                Live Transmission
              </div>
            </div>

            {/* Content Half */}
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative">
              <div className="inline-block px-3 py-1 border border-cyan-500/50 rounded-full text-[10px] font-bold text-cyan-400 tracking-widest uppercase mb-6 w-max font-mono">
                Featured Intel
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6 group-hover:text-cyan-50 transition-colors line-clamp-3">
                {featuredPost.title}
              </h2>
              <p className="text-slate-400 text-base lg:text-lg mb-10 leading-relaxed max-w-lg line-clamp-3">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-sm font-bold text-xs tracking-widest uppercase w-max group-hover:bg-cyan-400 transition-colors">
                Read Transmission <ArrowRight size={16} />
              </div>
            </div>
          </div>
        )}

        {/* ── CATEGORY FILTER NAV ── */}
        {!loading && (
          <div className="border-b border-slate-800 mb-10 overflow-x-auto hide-scrollbar">
            <div className="flex gap-8 min-w-max pb-px">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative ${
                    activeCategory === category 
                      ? "text-cyan-400" 
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {category}
                  {/* Active Indicator Line */}
                  {activeCategory === category && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── ARTICLES GRID (Remaining Posts) ── */}
        {!loading && gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map(post => (
              <div 
                key={post.id} 
                onClick={() => navigate(`/blogs/${post.id}`)}
                className="group cursor-pointer border border-slate-800/60 rounded-2xl overflow-hidden bg-slate-900/20 hover:border-cyan-500/40 hover:bg-slate-900/40 transition-all duration-300 flex flex-col"
              >
                
                {/* Card Image */}
                <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-black border-b border-slate-800">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700 font-mono text-[9px] text-slate-300 tracking-widest">
                    {post.dateStr}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold tracking-[0.15em] text-cyan-500 font-mono uppercase">
                      //{post.category}
                    </span>
                    <Settings size={14} className="text-slate-600 group-hover:text-cyan-500 group-hover:rotate-90 transition-all duration-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-white transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Faux Bottom Border to match image aesthetic */}
                  <div className="w-full h-px bg-slate-800 group-hover:bg-cyan-500/50 transition-colors mt-auto shadow-[0_0_10px_rgba(34,211,238,0)] group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && filteredPosts.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
            <SlidersHorizontal size={40} className="text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No transmissions found.</h3>
            <p className="text-slate-500 text-sm">Adjust your filters or search protocol to locate data.</p>
            <button 
              onClick={() => {setSearchTerm(""); setActiveCategory("ALL");}}
              className="mt-6 text-cyan-400 text-xs font-bold tracking-widest uppercase hover:text-cyan-300 transition-colors"
            >
              Reset Protocol
            </button>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default BlogsMain;