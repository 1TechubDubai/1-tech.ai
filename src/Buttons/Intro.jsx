const Intro = ({ text, onClick, left, right, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative z-10
        flex items-center justify-center
        overflow-hidden
        whitespace-nowrap
        px-4 py-2 sm:px-10 sm:py-4
        rounded-full
        
        /* --- COLOR SCHEME & GRADIENT --- */
        bg-gradient-to-r from-cyan-500 to-blue-600
        text-white font-bold tracking-wide
        
        /* --- GLOW & SHADOWS --- */
        shadow-[0_0_20px_rgba(6,182,212,0.4)]
        border border-white/10
        
        /* --- TRANSITIONS & INTERACTION --- */
        transition-all duration-300 ease-out
        hover:scale-105
        hover:-translate-y-1
        hover:shadow-[0_0_40px_rgba(6,182,212,0.7)]
        hover:brightness-110
        
        active:scale-95
        active:translate-y-0
        active:shadow-[0_0_10px_rgba(6,182,212,0.4)]
        
        ${className}
      `}
    >
      {/* SHINE EFFECT OVERLAY */}
      <div className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out z-0" />

      {/* LEFT ICON */}
      {left && (
        <img 
          src={left} 
          alt="" 
          className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 mr-3 object-contain transition-transform duration-300 group-hover:-translate-x-1" 
        />
      )}

      {/* TEXT */}
      <span className="relative z-10 text-sm sm:text-base drop-shadow-md">
        {text}
      </span>

      {/* RIGHT ICON */}
      {right && (
        <img 
          src={right} 
          alt="" 
          className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 ml-3 object-contain transition-transform duration-300 group-hover:translate-x-1" 
        />
      )}
    </button>
  );
};

export default Intro;