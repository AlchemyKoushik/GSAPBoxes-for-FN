import { LayoutTemplate, AppWindow, MessagesSquare, BarChart3 } from 'lucide-react';

export const WorkspaceNode = () => {
  const toolIcons = [AppWindow, MessagesSquare, BarChart3];

  return (
    <div className="node-container node-workspace relative w-24 h-24 flex items-center justify-center float-element">
      <div className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest uppercase font-medium drop-shadow-md z-20">Tools</div>
      
      {/* Central Tools Icon */}
      <div className="workspace-window absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 glass-node rounded-2xl border border-white/20 flex flex-col items-center justify-center bg-flownex-panel z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <LayoutTemplate size={24} className="text-white/80" strokeWidth={1.5} />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        {toolIcons.map((Icon, i) => (
          <div 
            key={i}
            className="workspace-ui-element absolute w-9 h-9 rounded-xl glass-node border border-flownex-pink/20 flex items-center justify-center bg-flownex-dark/90 shadow-lg backdrop-blur-md"
            style={{ 
              top: '50%',
              left: '50%',
              marginLeft: '-18px',
              marginTop: '-18px',
              zIndex: 3 - i
            }}
          >
            <Icon size={14} className="text-flownex-pink" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
};
