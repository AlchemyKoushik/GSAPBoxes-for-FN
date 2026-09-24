import React from 'react';

export const ConnectionLines: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10" style={{ transform: 'translateZ(-5px)' }}>
      <svg className="w-full h-full" viewBox="0 0 380 380">
        <defs>
          <linearGradient id="pink-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E85D75" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E85D75" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Base Lines */}
        <g stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none">
          {/* Top (Files) */}
          <path d="M190,190 L190,50" className="connection-line line-files" />
          
          {/* Left (Team) */}
          <path d="M190,190 L50,190" className="connection-line line-team" />
          
          {/* Right (Access) */}
          <path d="M190,190 L330,190" className="connection-line line-access" />
          
          {/* Bottom (Workspace) */}
          <path d="M190,190 L190,330" className="connection-line line-workspace" />
        </g>

        {/* Pulse Lines */}
        <g stroke="#E85D75" strokeWidth="2" fill="none" filter="url(#glow)">
          <path d="M190,190 L190,50" className="pulse-path pulse-files opacity-0" />
          <path d="M190,190 L50,190" className="pulse-path pulse-team opacity-0" />
          <path d="M190,190 L330,190" className="pulse-path pulse-access opacity-0" />
          <path d="M190,190 L190,330" className="pulse-path pulse-workspace opacity-0" />
        </g>
      </svg>
    </div>
  );
};
