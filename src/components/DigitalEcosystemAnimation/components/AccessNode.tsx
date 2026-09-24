import { ShieldCheck, ShieldAlert, KeyRound, LockKeyhole } from 'lucide-react';

export const AccessNode = () => {
  const icons = [ShieldAlert, KeyRound, LockKeyhole];
  const labels = ['ADMIN', 'TEAM', 'CLIENT'];

  return (
    <div className="node-container node-access relative w-28 h-32 flex items-center justify-center float-element">
      <div className="absolute -top-4 text-[10px] text-white/70 tracking-widest uppercase font-medium drop-shadow-md z-20">Access</div>
      
      {/* Central Access Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 glass-node rounded-2xl border border-white/20 flex flex-col items-center justify-center bg-flownex-panel z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <ShieldCheck size={24} className="text-white/80" strokeWidth={1.5} />
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center z-20 pointer-events-none mt-2">
        {icons.map((Icon, i) => (
          <div 
            key={i}
            className="access-item absolute w-24 h-7 glass-node rounded-md border border-white/10 bg-flownex-dark/90 flex items-center px-2.5 shadow-lg backdrop-blur-md"
            style={{ 
              top: '50%',
              left: '50%',
              marginLeft: '-48px', // half of w-24 (96px)
              marginTop: '-14px',  // half of h-7 (28px)
            }}
          >
            <Icon size={12} className="text-flownex-pink/80 mr-2" />
            <span className="text-[8px] font-medium text-white/80 tracking-widest flex-1 pt-0.5">{labels[i]}</span>
            <div className="access-check w-1.5 h-1.5 rounded-full bg-flownex-pink opacity-0 scale-0 shadow-[0_0_5px_rgba(232,93,117,0.8)]"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
