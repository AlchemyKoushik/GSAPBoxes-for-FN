import { Users, UserCircle2, UserSquare2, UserCheck } from 'lucide-react';

export const TeamNode = () => {
  const avatarIcons = [UserCircle2, UserSquare2, UserCheck];

  return (
    <div className="node-container node-team relative w-24 h-24 flex items-center justify-center float-element">
      <div className="absolute -top-6 text-[10px] text-white/70 tracking-widest uppercase font-medium drop-shadow-md">Team</div>
      
      {/* Central Team Icon */}
      <div className="relative w-16 h-16 glass-node rounded-2xl border border-white/20 flex flex-col items-center justify-center bg-flownex-panel z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <Users size={24} className="text-white/80" strokeWidth={1.5} />
      </div>

      {/* Subtle lines connecting them when organized */}
      <svg className="team-connection absolute inset-0 w-full h-full opacity-0 pointer-events-none z-0" viewBox="0 0 96 96">
        <path d="M48 48 L24 24 M48 48 L72 24 M48 48 L48 78" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4,4" fill="none" />
      </svg>

      {/* Floating User Icons */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {avatarIcons.map((Icon, i) => (
          <div 
            key={i}
            className="team-avatar absolute w-9 h-9 rounded-full glass-node border border-flownex-pink/30 flex items-center justify-center bg-flownex-dark/90 shadow-lg backdrop-blur-md"
            style={{ 
              top: '50%',
              left: '50%',
              marginLeft: '-18px',
              marginTop: '-18px',
              zIndex: 3 - i
            }}
          >
            <Icon size={16} className="text-flownex-pink" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
};
