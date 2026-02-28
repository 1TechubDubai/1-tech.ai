import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust path if necessary
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top and fetch data on load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "blog_posts", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          // Format the Firebase Timestamp
          let dateStr = "PENDING";
          if (data.createdAt) {
            const d = data.createdAt.toDate();
            dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
          }

          // Calculate estimated read time (assuming ~200 words per minute)
          const wordCount = data.content ? data.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length : 0;
          const readTimeMins = Math.max(1, Math.ceil(wordCount / 200));

          setPost({ 
            id: docSnap.id, 
            ...data, 
            dateStr,
            readTime: `${readTimeMins} min read`
          });
        } else {
          console.log("No such document!");
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <div className="fixed w-full h-full top-0 left-0 overflow-y-scroll bg-[#020617] min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden"
         style={{ fontFamily: "'Syne', sans-serif" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      ` }} />

      <Navbar />

      <main className="relative pt-24 sm:pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[80vh]">
        
        {/* ── TOP NAV / BREADCRUMBS ── */}
        <div className="flex justify-between items-center mb-10 border-b border-slate-800/60 pb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Transmissions
          </button>

          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-white transition-colors"><Bookmark size={18} /></button>
            <button className="text-slate-500 hover:text-white transition-colors"><Share2 size={18} /></button>
          </div>
        </div>

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 text-cyan-500 gap-4">
            <Loader2 size={48} className="animate-spin" />
            <p className="font-mono text-xs uppercase tracking-widest">Decrypting Protocol...</p>
          </div>
        )}

        {/* ── NOT FOUND STATE ── */}
        {!loading && !post && (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500 gap-4">
            <AlertCircle size={48} className="text-red-500/80 mb-2" />
            <h2 className="text-2xl font-bold text-white">Transmission Not Found</h2>
            <p className="font-mono text-xs uppercase tracking-widest">The requested data fragment has been moved or deleted.</p>
          </div>
        )}

        {/* ── LOADED ARTICLE STATE ── */}
        {!loading && post && (
          <>
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 font-mono border border-cyan-500/30 px-3 py-1 rounded bg-cyan-500/10 uppercase">
                  {post.category}
                </span>
                <span className="text-slate-600 font-mono text-xs flex items-center gap-1">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>

              {/* Fixed "Squeezed" Heading: Changed leading-[1.1] to leading-[1.2] and added pt-2 */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.2] tracking-tight mb-6 pt-2">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 border-l-2 border-slate-800 pl-4 italic">
                {post.excerpt}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/60">
                <div className="flex items-center gap-3">
                  {post.authorAvatar ? (
                    <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full border border-slate-700 bg-black object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                      {post.authorName?.charAt(0) || "S"}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">{post.authorName || "System Admin"}</p>
                    <p className="text-[10px] text-slate-500 font-mono uppercase">System Administrator</p>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
                
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={14} className="text-cyan-500" />
                  <span className="text-xs font-mono uppercase tracking-widest">{post.dateStr}</span>
                </div>
              </div>
            </header>

            {/* ── HERO IMAGE ── */}
            {post.featuredImage && (
              <div className="w-full aspect-video md:aspect-[21/9] bg-black rounded-3xl border border-slate-800 overflow-hidden mb-16 relative group">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
                
                {/* Decorative scanner line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.5)] transform -translate-y-full group-hover:animate-[scan_3s_ease-in-out_infinite]"></div>
              </div>
            )}

            {/* ── ARTICLE BODY (TIPTAP HTML RENDER) ── */}
            <article 
              className="article-content font-sans leading-relaxed text-slate-300 text-lg sm:text-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ── FOOTER / NEXT ACTIONS ── */}
            <div className="mt-24 pt-10 border-t border-slate-800 flex justify-between items-center">
              <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">End of Transmission</p>
              <button 
                onClick={() => navigate('/blogs')} // or replace with logic to fetch the next article id
                className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest transition-colors"
              >
                Next Intel <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />

      {/* ── SCOPED EDITORIAL STYLING ── */}
      <style>{`
        /* Typography Scale & Spacing */
        .article-content p { 
          margin-bottom: 2rem; 
          color: #94a3b8; 
          line-height: 1.8;
        }
        
        .article-content h1, 
        .article-content h2, 
        .article-content h3 { 
          color: #ffffff; 
          font-weight: 800; 
          font-family: 'Syne', sans-serif;
          margin-top: 3.5rem; 
          margin-bottom: 1.5rem; 
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        
        .article-content h2 { font-size: 2.25rem; }
        .article-content h3 { font-size: 1.5rem; }
        
        /* Interactive Elements */
        .article-content a { 
          color: #22d3ee; 
          text-decoration: none; 
          border-bottom: 1px dashed #22d3ee;
          padding-bottom: 2px;
          transition: all 0.2s;
        }
        .article-content a:hover {
          color: #ffffff;
          border-bottom-style: solid;
          background-color: rgba(34, 211, 238, 0.1);
        }

        /* Bold & Italics */
        .article-content strong { color: #f8fafc; font-weight: 700; }
        .article-content em { color: #cbd5e1; font-style: italic; }

        /* Blockquotes - Cyberpunk Styled */
        .article-content blockquote {
          margin: 3rem 0;
          padding: 2rem;
          background: rgba(15, 23, 42, 0.4);
          border-left: 4px solid #06b6d4;
          border-radius: 0 1rem 1rem 0;
          font-size: 1.25rem;
          font-style: italic;
          color: #e2e8f0;
          line-height: 1.6;
          position: relative;
        }
        .article-content blockquote::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 10px;
          font-size: 4rem;
          color: rgba(6, 182, 212, 0.2);
          font-family: 'Syne', sans-serif;
        }

        /* Lists */
        .article-content ul, 
        .article-content ol { 
          margin-bottom: 2rem; 
          padding-left: 1.5rem; 
          color: #94a3b8;
        }
        .article-content ul li, 
        .article-content ol li { 
          margin-bottom: 0.75rem; 
          padding-left: 0.5rem;
        }
        .article-content ul { list-style-type: none; }
        .article-content ul li::before {
          content: '>';
          color: #06b6d4;
          font-family: 'Space Mono', monospace;
          font-weight: bold;
          display: inline-block;
          width: 1.5em;
          margin-left: -1.5em;
        }
        
        /* Image formatting inside article */
        .article-content img {
          border-radius: 1rem;
          border: 1px solid #1e293b;
          margin: 3rem 0;
          width: 100%;
          height: auto;
        }

        /* Custom Keyframe for the scanner effect */
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(800px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;