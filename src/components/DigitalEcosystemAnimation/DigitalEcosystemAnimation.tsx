import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Boxes, FolderOpen, Users, ShieldCheck, LayoutTemplate, Mail, FileText, MessageSquare, Calendar } from 'lucide-react';
import './ecosystem.css';

type Props = {
  autoplay?: boolean;
  loop?: boolean;
  reducedMotion?: boolean;
};

// Bezier utility
const bez = (ax: number, ay: number, cx: number, cy: number, bx: number, by: number, u: number) => {
  const v = 1 - u;
  return [
    v * v * ax + 2 * v * u * cx + u * u * bx,
    v * v * ay + 2 * v * u * cy + u * u * by
  ];
};


export const DigitalEcosystemAnimation = ({ autoplay = true, loop = true, reducedMotion = false }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // We will track the timeline progress in this ref to drive the canvas render
  const progressRef = useRef({ time: 0, connectedPhase: 0, rotation: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    // Handle High DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const resize = () => {
      if (!containerRef.current) return;
      const b = containerRef.current.getBoundingClientRect();
      W = b.width;
      H = b.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(containerRef.current);
    resize();

    // GSAP Timeline to drive `progressRef`
    const isReduced = reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const tl = gsap.timeline({
      paused: !autoplay,
      repeat: loop && !isReduced ? -1 : 0,
    });
    tlRef.current = tl;

    if (isReduced) {
      progressRef.current.time = 9.0;
      progressRef.current.connectedPhase = 1;
    } else {
      tl.to(progressRef.current, {
        time: 14,
        duration: 14,
        ease: 'none',
      }, 0);
      
      tl.to(progressRef.current, {
        connectedPhase: 1,
        duration: 2.5,
        ease: 'power2.inOut'
      }, 2.0);
      
      // Rotate slowly while connected. 
      // Because `fly` interpolates back to 0 at the end of the timeline, 
      // the icons perfectly return to their scattered `startX` positions regardless of the final rotation!
      tl.to(progressRef.current, {
        rotation: Math.PI * 0.6,
        duration: 9.0,
        ease: 'power2.inOut'
      }, 2.5);

      tl.to(progressRef.current, {
        connectedPhase: 0,
        duration: 2.5,
        ease: 'power2.inOut'
      }, 11.0);
    }

    let reqId: number;
    let tsec = 0;

    const render = () => {
      tsec += 0.016; // Approx time for continuous floating
      const time = progressRef.current.time;
      const charge = progressRef.current.connectedPhase;
      const currentRotation = progressRef.current.rotation;

      ctx.clearRect(0, 0, W, H);
      
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.35; 

      const nodes: any[] = [
        { ang: -Math.PI / 2, sx: -0.2, sy: -0.35, label: 'FILES' },
        { ang: -Math.PI / 4, sx: 0.35, sy: -0.25, label: 'DOCS' },
        { ang: 0, sx: 0.45, sy: 0.15, label: 'ACCESS' },
        { ang: Math.PI / 4, sx: 0.25, sy: 0.4, label: 'MAIL' },
        { ang: Math.PI / 2, sx: -0.15, sy: 0.45, label: 'TOOLS' },
        { ang: 3 * Math.PI / 4, sx: -0.4, sy: 0.25, label: 'CALENDAR' },
        { ang: Math.PI, sx: -0.45, sy: -0.1, label: 'TEAM' },
        { ang: -3 * Math.PI / 4, sx: -0.25, sy: -0.4, label: 'CHAT' }
      ];

      // Calculate node positions (with flying and floating)
      nodes.forEach((n, i) => {
        let fly = 0;
        
        const inStart = 0.5 + i * 0.1;
        const inEnd = inStart + 1.5;
        
        const outStart = 11.5 + (7 - i) * 0.1;
        const outEnd = outStart + 1.5;
        
        const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        if (time < inStart) {
          fly = 0;
        } else if (time >= inStart && time < inEnd) {
          fly = easeInOut((time - inStart) / (inEnd - inStart));
        } else if (time >= inEnd && time < outStart) {
          fly = 1;
        } else if (time >= outStart && time < outEnd) {
          fly = 1 - easeInOut((time - outStart) / (outEnd - outStart));
        } else {
          fly = 0;
        }
        
        // Add the global clockwise rotation to the base angle
        const finalAng = n.ang + currentRotation;
        
        const rx = cx + Math.cos(finalAng) * R;
        const ry = cy + Math.sin(finalAng) * R;
        
        const startX = cx + n.sx * W;
        const startY = cy + n.sy * H;
        
        const base_x = startX + (rx - startX) * fly;
        const base_y = startY + (ry - startY) * fly;

        // Float only if disconnected, stabilize when connected
        const bobAmount = (1 - charge) * 8;
        const bob = Math.sin(tsec * 1.5 + i * 2) * bobAmount;
        
        n.x = base_x;
        n.y = base_y + bob;
        
        // Bezier control points (curved lines)
        n.mx = (n.x + cx) / 2 + (n.y - cy) * 0.15;
        n.my = (n.y + cy) / 2 - (n.x - cx) * 0.15;
        n.fly = fly;
      });

      // Draw Streams (Curves)
      ctx.lineWidth = 1.5;
      nodes.forEach(n => {
        const lineAlpha = charge * n.fly;
        if (lineAlpha <= 0.01) return;
        const g = ctx.createLinearGradient(n.x, n.y, cx, cy);
        g.addColorStop(0, `rgba(232,93,117,${0.15 * lineAlpha})`);
        g.addColorStop(1, `rgba(255,91,147,${0.4 * lineAlpha})`);
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.quadraticCurveTo(n.mx, n.my, cx, cy);
        ctx.stroke();
      });

      // Draw Particles
      // Draw Data Pulses
      ctx.lineWidth = 2.5;
      ctx.globalCompositeOperation = 'lighter';
      const PN = 6; // Particles per line
      nodes.forEach((n, i) => {
        const lineAlpha = charge * n.fly;
        if (lineAlpha <= 0.01) return;
        for (let k = 0; k < PN; k++) {
          // Continuous flow driven by tsec
          const u = ((tsec * 0.3 + k / PN + i * 0.1) % 1);
          const pos = bez(n.x, n.y, n.mx, n.my, cx, cy, u);
          const ep = Math.sin(u * Math.PI); // Fade at start and end
          
          ctx.fillStyle = `rgba(255,120,175,${lineAlpha * ep})`;
          ctx.beginPath();
          ctx.arc(pos[0], pos[1], 3 * (0.5 + ep), 0, 6.28);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.quadraticCurveTo(n.mx, n.my, cx, cy);

        // Bright pulses
        const pg = ctx.createLinearGradient(n.x, n.y, cx, cy);
        pg.addColorStop(0, `rgba(232,93,117,${0.2 * lineAlpha})`);
        pg.addColorStop(1, `rgba(255,120,175,${0.8 * lineAlpha})`);
        ctx.strokeStyle = pg;

        // Animate the dash offset based on time + stagger per node
        ctx.setLineDash([4, 40]);
        // negative offset makes it flow towards the center
        ctx.lineDashOffset = -(tsec * 30 + i * 15);
        ctx.lineCap = 'round';
        ctx.stroke();
      });
      ctx.globalCompositeOperation = 'source-over';
      ctx.setLineDash([]);
      ctx.lineCap = 'butt';

      // Draw Hub Glow
      const hubPulse = 1 + 0.05 * Math.sin(tsec * 3);
      const hubSize = Math.min(W, H) * 0.12 * hubPulse;
      const glowR = hubSize * 2.5;
      
      const radGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      radGlow.addColorStop(0, `rgba(232,93,117,${0.3 * charge})`);
      radGlow.addColorStop(1, `rgba(232,93,117,0)`);
      
      ctx.fillStyle = radGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, 6.28);
      ctx.fill();

      // Draw Orbiting Satellites
      if (charge > 0) {
        for (let k = 0; k < 6; k++) {
          const sa = tsec * 0.4 + k * (Math.PI / 3);
          const srx = cx + Math.cos(sa) * hubSize * 1.8;
          const sry = cy + Math.sin(sa) * hubSize * 1.8;
          ctx.fillStyle = `rgba(255,120,175,${charge * 0.8})`;
          ctx.beginPath();
          ctx.arc(srx, sry, 2, 0, 6.28);
          ctx.fill();
        }
      }

      // Update HTML DOM node positions using CSS transforms
      const nodeEls = document.querySelectorAll('.dom-node');
      nodeEls.forEach((el, i) => {
        if(nodes[i]) {
          (el as HTMLElement).style.transform = `translate(${nodes[i].x}px, ${nodes[i].y}px) translate(-50%, -50%)`;
          (el as HTMLElement).style.opacity = (0.2 + 0.8 * nodes[i].fly).toString();
          // Fade in nodes slightly when connected
          const cardInner = el.querySelector('.glass-node') as HTMLElement;
          if (cardInner) {
             cardInner.style.boxShadow = `0 0 ${15 * charge}px rgba(232,93,117,${0.2 * charge})`;
             cardInner.style.borderColor = `rgba(255,255,255,${0.1 + 0.1 * charge})`;
          }
        }
      });

      // Update Core
      const coreEl = document.querySelector('.dom-core') as HTMLElement;
      if (coreEl) {
        coreEl.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${1 + 0.05 * charge * Math.sin(tsec * 2)})`;
      }

      reqId = requestAnimationFrame(render);
    };

    reqId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(reqId);
      ro.disconnect();
    };
  }, [autoplay, loop, reducedMotion]);

  const IconArr = [FolderOpen, FileText, ShieldCheck, Mail, LayoutTemplate, Calendar, Users, MessageSquare];

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl" style={{ background: 'radial-gradient(120% 120% at 50% 50%, #150b13, #0b0509 60%, #070307 100%)' }}>
      <div className="ambient-blob"></div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* HTML OVERLAYS */}
      
      {IconArr.map((Icon, idx) => (
        <div key={idx} className="dom-node absolute top-0 left-0 w-16 h-16 flex items-center justify-center">
          <div className="glass-node w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-[#1b1019]/80 backdrop-blur-md transition-all duration-300">
            <Icon size={20} className="text-[#ff5b93]" strokeWidth={1.5} />
          </div>
        </div>
      ))}

      {/* CORE (Center) */}
      <div className="dom-core absolute top-0 left-0 w-32 h-32 flex items-center justify-center z-10">
        {/* Hub Body with Gradient */}
        <div className="absolute inset-2 rounded-[2rem] bg-gradient-to-br from-[#ff4d86] to-[#b3134c] shadow-[0_10px_30px_rgba(236,30,99,0.3)] flex items-center justify-center overflow-hidden">
           {/* Inner ring */}
           <div className="absolute w-14 h-14 border-2 border-white/60 rounded-full"></div>
           
           {/* The Original Boxes Logo */}
           <Boxes size={28} className="logo-boxes absolute text-white" strokeWidth={1.5} />
           
           {/* The User SVG Logo */}
           <svg className="logo-fn absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28">
             <path d="M511.92 245.05C511.92 252.34 511.92 259.63 511.92 266.92C510.09 270.05 510.58 275.64 509.92 279.28C508.99 284.45 507.42 289.74 505.82 294.75C499.49 314.56 487.17 332.59 471.82 346.73C422.68 391.99 348.47 387.38 301.89 341.25C296.18 335.59 290.54 329.86 284.83 324.2C282.53 321.91 278.83 319.34 277.63 316.32C290.53 303.41 303.42 290.5 316.32 277.59C319.68 278.93 322.6 283.19 325.16 285.74C330.86 291.41 336.5 297.15 342.22 302.8C358.88 319.23 384.25 326.49 406.98 319.73C432.64 312.1 451.42 290.06 454.79 263.45C459.26 228.09 431.39 192.55 395.51 190.08C366.85 188.1 351.63 199.56 332.63 218.79C323.73 227.8 314.76 236.75 305.76 245.66C283.44 267.75 261.44 290.18 239.11 312.27C223.41 327.79 208.64 345.48 190.27 357.89C173.64 369.12 154.33 375.59 134.43 377.9C124.24 379.09 113.68 378.08 103.57 376.99C93.19 375.88 83.06 372.15 73.52 368.17C59.5 362.32 47.11 353.38 36.13 342.85C21.69 329.01 10.73 310.51 5.13 291.52C3.43 285.75 2.36 279.88 1.17 273.99C0.69 271.63 1.28 269.15 0.08 266.99C0.08 259.65 0.08 252.31 0.08 244.97C1.84 241.74 1.45 236.34 2.06 232.67C2.92 227.48 4.61 222.24 6.14 217.22C12.2 197.36 24.96 179.35 40.16 165.25C88.54 120.36 162.89 124.62 209.21 169.78C215.28 175.7 221.24 181.73 227.21 187.76C229.48 190.06 233.23 192.65 234.37 195.68C221.48 208.57 208.58 221.45 195.68 234.34C192.34 233.07 189.41 228.74 186.86 226.24C180.82 220.29 174.97 214.13 168.87 208.24C152.09 192.06 127.46 186.2 105 192.23C97.89 194.14 91.25 197.67 85.13 201.77C42.8 230.17 50.03 295.34 95.57 316.12C102.32 319.2 110.08 321.71 117.62 321.96C128.5 322.33 139.26 321.18 149.23 316.81C162.17 311.15 171.35 301.13 181.22 291.32C189.27 283.33 197.27 275.29 205.28 267.26C229.74 242.76 254.42 218.49 278.73 193.85C293.94 178.43 308.85 161.24 327.78 150.34C361.93 130.69 404.86 128.14 440.79 144.82C453.87 150.89 465.57 159.01 475.92 169.13C489.37 182.27 500.27 199.38 505.84 217.23C507.41 222.25 509.04 227.51 509.93 232.69C510.56 236.31 510.1 241.94 511.92 245.05Z" fill="#FFFFFF" fillRule="evenodd" stroke="#FFFFFF" strokeWidth="0.25" strokeLinejoin="round"/>
           </svg>
        </div>
      </div>
    </div>
  );
};
