const Intro = ({ text, onClick, left, right, className = "", variant = 0 }) => {
  return (
    <button
      onClick={onClick}
      className={`
        /* ... keep your existing classes here ... */
        group relative z-10 flex items-center justify-center
        overflow-hidden whitespace-nowrap
        px-6 py-2 sm:px-8 sm:py-2.5 rounded-lg
        border-2 border-cyan-500 font-semibold tracking-wide
        transition-all duration-300 ease-out
        hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:-translate-y-0.5
        active:scale-[0.98] active:translate-y-0
        ${variant === 1 
          ? "bg-cyan-500 text-slate-900 hover:bg-transparent hover:text-cyan-400" 
          : "bg-transparent text-cyan-400 hover:bg-cyan-500 hover:text-slate-900"
        }
        ${className}
      `}
    >
      {/* LEFT ICON (Updated to support SVGs) */}
      {left && (
        <span className="relative z-10 mr-2.5 transition-transform duration-300 group-hover:-translate-x-1 flex items-center">
           {/* If it's a string, render img, otherwise render the component directly */}
           {typeof left === 'string' ? <img src={left} alt="" className="w-5 h-5 object-contain" /> : left}
        </span>
      )}

      {/* TEXT */}
      <span className="relative z-10 text-sm sm:text-base">
        {text}
      </span>

      {/* RIGHT ICON (Updated to support SVGs) */}
      {right && (
        <span className="relative z-10 ml-2.5 transition-transform duration-300 group-hover:translate-x-1 flex items-center">
           {typeof right === 'string' ? <img src={right} alt="" className="w-5 h-5 object-contain" /> : right}
        </span>
      )}
    </button>
  );
};

export default Intro;