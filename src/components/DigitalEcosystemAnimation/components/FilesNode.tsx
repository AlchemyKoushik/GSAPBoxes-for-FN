import { FolderOpen, FileText, Image, FileBox } from 'lucide-react';

export const FilesNode = () => {
  const fileIcons = [FileText, Image, FileBox];

  return (
    <div className="node-container node-files relative w-24 h-24 flex items-center justify-center float-element">
      <div className="absolute -top-6 text-[10px] text-white/70 tracking-widest uppercase font-medium drop-shadow-md">Files</div>
      
      {/* Central Folder Icon */}
      <div className="relative w-16 h-16 glass-node rounded-2xl border border-white/20 flex flex-col items-center justify-center bg-flownex-panel z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <FolderOpen size={24} className="text-white/80" strokeWidth={1.5} />
      </div>

      {/* Floating File Icons that stack into the folder */}
      <div className="absolute inset-0 z-0">
        {fileIcons.map((Icon, i) => (
          <div 
            key={i}
            className="file-card absolute w-10 h-10 glass-node rounded-lg border border-white/10 flex items-center justify-center bg-flownex-panel/80 shadow-md backdrop-blur-sm"
            style={{ 
              top: '50%',
              left: '50%',
              marginLeft: '-20px',
              marginTop: '-20px',
              zIndex: 3 - i
            }}
          >
            <Icon size={16} className="text-flownex-pink/80" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
};
