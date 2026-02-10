const Stat = ({ value, label, desc }) => {
  return (
    <div className="group flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:-translate-y-1">
      {/* Value - Big & Bold */}
      <span className="text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
        {value}
      </span>

      {/* Label - Clean & Uppercase */}
      <span className="text-xs sm:text-sm font-bold tracking-widest text-cyan-500 uppercase mb-2">
        {label}
      </span>

      {/* Decorative Line (Visible on Hover) */}
      <div className="w-8 h-0.5 bg-slate-700 group-hover:bg-cyan-500/50 transition-colors duration-300 mb-2"></div>

      {/* Description - Minimalist */}
      <p className="text-[10px] sm:text-xs text-slate-400 max-w-[150px] sm:max-w-[180px] leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export default Stat;