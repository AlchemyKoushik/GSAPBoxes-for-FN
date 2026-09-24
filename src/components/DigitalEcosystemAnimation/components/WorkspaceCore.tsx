import { Boxes } from 'lucide-react';

export const WorkspaceCore = () => {
  return (
    <div className="core-container relative z-10 w-32 h-32 flex items-center justify-center rounded-3xl glass-node border border-white/20 shadow-2xl overflow-visible float-element">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent"></div>
      <div className="core-inner-glow absolute inset-0 rounded-3xl bg-flownex-pink/15 opacity-0 transition-opacity duration-1000 blur-xl"></div>
      <div className="core-inner-glow absolute inset-0 rounded-3xl bg-flownex-pink/20 opacity-0 transition-opacity duration-1000"></div>
      
      {/* Decorative inner elements */}
      <div className="absolute inset-2 border border-white/10 rounded-2xl"></div>
      
      {/* Floating rings */}
      <div className="absolute w-44 h-44 border border-flownex-pink/20 rounded-full animate-[spin_10s_linear_infinite]" style={{ transform: 'translateZ(-1px)' }}></div>
      <div className="absolute w-44 h-44 border border-dashed border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{ transform: 'translateZ(-1px)' }}></div>
      <div className="absolute w-24 h-24 border border-white/15 rounded-full animate-[spin_20s_linear_infinite]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(232,93,117,0.3)] backdrop-blur-md">
          <Boxes size={28} className="text-flownex-pink" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] text-white/70 tracking-widest uppercase font-semibold">Core</span>
      </div>
    </div>
  );
};
