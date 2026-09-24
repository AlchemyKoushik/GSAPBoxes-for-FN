import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Boxes, Zap, Check, FolderOpen, FileText, ShieldCheck, Mail, Users, Settings } from 'lucide-react';
import '../DigitalEcosystemAnimation/ecosystem.css';

type Props = { autoplay?: boolean; };

const MicroCard = ({ id, icon: Icon }: { id: string, icon: any }) => (
  <div id={id} className="wf-card absolute top-0 left-0 w-12 h-12 bg-[#1b1019]/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform -translate-x-1/2 -translate-y-1/2 overflow-visible">
    <Icon size={20} className="icon-svg text-[#ff5b93]" strokeWidth={1.5} />
    <div className="card-check absolute -bottom-1 -right-1 w-4 h-4 bg-[#37d9a0] rounded-full flex items-center justify-center opacity-0 scale-50 border border-[#1b1019] shadow-[0_0_10px_rgba(55,217,160,0.5)]">
      <Check size={10} strokeWidth={4} className="text-[#1b1019]" />
    </div>
  </div>
);

export const WorkflowAutomationAnimation = ({ autoplay = true }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: !autoplay, repeat: -1 });

      // INITIAL RESET
      tl.set('.pipe-line', { strokeDasharray: '620', strokeDashoffset: 0 });
      tl.set('.tree-path, .inf-path', { strokeDasharray: '1500', strokeDashoffset: 1500 });
      tl.set('.tree-pulses', { opacity: 0 });
      tl.set('.tap-wave', { attr: { r: 0 }, opacity: 0 });
      tl.set('.inf-dots', { opacity: 0, strokeDasharray: '4 40', strokeDashoffset: 0 });
      
      tl.set('#n0', { x: -160, y: 0, opacity: 1, scale: 1 });
      tl.set('#n1', { x: 0, y: 0, opacity: 1, scale: 1 });
      tl.set('#n2', { x: 160, y: 0, opacity: 1, scale: 1 });
      
      tl.set('#n0 .n0-pipe, #n1 .n1-pipe', { opacity: 1, scale: 1 });
      tl.set('#n0 .n0-tap, #n0 .n0-tree, #n1 .n1-tree', { opacity: 0, scale: 0.5 });
      
      tl.set('.wf-core', { scale: 0, opacity: 0 });

      // ==========================================
      // SCENE 01: PIPELINE (0.0s to 8.5s)
      // ==========================================
      const T_TRANSITION = 8.5;
      const tasks = ['#t3', '#t4', '#t5', '#t6', '#t7'];
      
      tasks.forEach((id, index) => {
         let t = index * 0.9;
         while (t < T_TRANSITION) {
            let dur = Math.min(4.5, T_TRANSITION - t);
            let endX = -350 + dur * (700 / 4.5);
            
            // Set starting values
            tl.set(id, { x: -350, y: 0, opacity: 1, scale: 1, borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }, t);
            tl.set(`${id} .icon-svg`, { color: '#ff5b93' }, t);
            tl.set(`${id} .card-check`, { opacity: 0, scale: 0.5 }, t);

            // Move
            tl.to(id, { x: endX, duration: dur, ease: 'none' }, t);

            // N0
            if (t + 1.22 < T_TRANSITION) {
               tl.to(id, { borderColor: 'rgba(55,217,160,0.3)', duration: 0.2 }, t + 1.22);
               tl.to(`${id} .icon-svg`, { color: '#88e4c0', duration: 0.2 }, t + 1.22);
               tl.to('#n0 .n0-pulse', { opacity: 1, scale: 1.5, duration: 0.2, yoyo: true, repeat: 1 }, t + 1.22);
            }
            // N1
            if (t + 2.25 < T_TRANSITION) {
               tl.to(id, { borderColor: 'rgba(55,217,160,0.6)', duration: 0.2 }, t + 2.25);
               tl.to(`${id} .icon-svg`, { color: '#5ce4b0', duration: 0.2 }, t + 2.25);
               tl.to('#n1 .n1-pulse', { opacity: 1, scale: 1.5, duration: 0.2, yoyo: true, repeat: 1 }, t + 2.25);
            }
            // N2
            if (t + 3.28 < T_TRANSITION) {
               tl.to(id, { borderColor: 'rgba(55,217,160,1)', boxShadow: '0 0 15px rgba(55,217,160,0.4)', duration: 0.2 }, t + 3.28);
               tl.to(`${id} .icon-svg`, { color: '#37d9a0', duration: 0.2 }, t + 3.28);
               tl.to(`${id} .card-check`, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out' }, t + 3.28);
               tl.to('#n2 .n2-pulse', { opacity: 1, scale: 1.5, duration: 0.2, yoyo: true, repeat: 1 }, t + 3.28);
            }

            t += 4.5;
         }
      });

      // ==========================================
      // TRANSITION 1 (8.5s to 10.0s)
      // ==========================================
      const t1 = 8.5;
      tl.to('.pipe-line', { strokeDashoffset: 620, duration: 1.0, ease: 'power3.inOut' }, t1);
      tl.to('#n1, #n2', { opacity: 0, scale: 0.5, duration: 0.8, ease: 'power2.inOut' }, t1);
      
      tl.to('#n0', { x: 0, y: 0, duration: 1.5, ease: 'power3.inOut' }, t1);
      tl.to('#n0 .n0-pipe', { opacity: 0, duration: 0.5 }, t1);
      tl.to('#n0 .n0-tap', { opacity: 1, scale: 1, duration: 0.5 }, t1 + 0.5);

      // Cards to Circle
      tl.to('#t3', { x: 0, y: -100, duration: 1.5, ease: 'power3.inOut' }, t1);
      tl.to('#t4', { x: 95, y: -31, duration: 1.5, ease: 'power3.inOut' }, t1);
      tl.to('#t5', { x: 59, y: 81, duration: 1.5, ease: 'power3.inOut' }, t1);
      tl.to('#t6', { x: -59, y: 81, duration: 1.5, ease: 'power3.inOut' }, t1);
      tl.to('#t7', { x: -95, y: -31, duration: 1.5, ease: 'power3.inOut' }, t1);
      
      // Revert ALL to inactive state for One Tap
      tl.to('.wf-card', { borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', duration: 1.0 }, t1);
      tl.to('.icon-svg', { color: '#e2d3d9', duration: 1.0 }, t1);
      tl.to('.card-check', { opacity: 0, scale: 0.5, duration: 0.5 }, t1);

      // ==========================================
      // SCENE 02: ONE TAP (10.5s to 13.0s)
      // ==========================================
      const t2 = 10.5;
      tl.set('.tap-wave', { attr: { r: 0 }, opacity: 1 }, t2);
      tl.to('.tap-wave', { attr: { r: 250 }, opacity: 0, duration: 1.0, ease: 'power2.out' }, t2);
      
      tl.to('.icon-svg', { color: '#37d9a0', duration: 0.2, stagger: 0.1 }, t2 + 0.2);
      tl.to('.card-check', { opacity: 1, scale: 1, duration: 0.2, stagger: 0.1, ease: 'back.out' }, t2 + 0.2);
      tl.to('.wf-card', { borderColor: 'rgba(55,217,160,0.6)', boxShadow: '0 0 20px rgba(55,217,160,0.2)', duration: 0.3, stagger: 0.1 }, t2 + 0.2);

      // ==========================================
      // TRANSITION 2 (13.0s to 14.5s)
      // ==========================================
      const t3 = 13.0;
      tl.to('#n0', { x: -200, duration: 1.5, ease: 'power3.inOut' }, t3);
      tl.to('#n0 .n0-tap', { opacity: 0, scale: 0.5, duration: 0.5 }, t3);
      tl.to('#n0 .n0-tree', { opacity: 1, scale: 1, duration: 0.5 }, t3 + 0.5);

      tl.to('#n1', { x: -50, y: 0, scale: 1, opacity: 1, duration: 1.5, ease: 'power3.inOut' }, t3);
      tl.to('#n1 .n1-pipe', { opacity: 0, duration: 0.1 }, t3);
      tl.to('#n1 .n1-tree', { opacity: 1, scale: 1, duration: 0.5 }, t3 + 0.5);

      tl.to('#t3', { x: 150, y: -120, duration: 1.5, ease: 'power3.inOut' }, t3);
      tl.to('#t4', { x: 150, y: -60, duration: 1.5, ease: 'power3.inOut' }, t3);
      tl.to('#t5', { x: 150, y: 0, duration: 1.5, ease: 'power3.inOut' }, t3);
      tl.to('#t6', { x: 150, y: 60, duration: 1.5, ease: 'power3.inOut' }, t3);
      tl.to('#t7', { x: 150, y: 120, duration: 1.5, ease: 'power3.inOut' }, t3);

      tl.to('.tree-path', { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, t3 + 0.5);

      // Reset to inactive state for Tree Canvas
      tl.to('.icon-svg', { color: '#e2d3d9', duration: 0.5 }, t3);
      tl.to('.card-check', { opacity: 0, duration: 0.1 }, t3);
      tl.to('.wf-card', { borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', duration: 0.5 }, t3);

      // ==========================================
      // SCENE 03: FLOW CANVAS (15.0s to 18.0s)
      // ==========================================
      const t4 = 15.0;
      tl.to('.tree-pulses', { opacity: 1, duration: 0.1 }, t4);
      
      tl.set('.pulse-0', { strokeDashoffset: 0 }, t4);
      tl.to('.pulse-0', { strokeDashoffset: -200, duration: 0.5, ease: 'none' }, t4);
      
      tl.to('#n1 .n1-tree', { filter: 'brightness(1.5) drop-shadow(0 0 10px rgba(236,30,99,0.5))', duration: 0.2, yoyo: true, repeat: 1 }, t4 + 0.5);
      
      tl.set('.pulse-1, .pulse-2, .pulse-3, .pulse-4, .pulse-5', { strokeDashoffset: 0 }, t4 + 0.6);
      tl.to('.pulse-1, .pulse-2, .pulse-3, .pulse-4, .pulse-5', { strokeDashoffset: -220, duration: 0.6, ease: 'none' }, t4 + 0.6);
      
      tl.to('.icon-svg', { color: '#37d9a0', duration: 0.2, stagger: 0.05 }, t4 + 1.2);
      tl.to('.wf-card', { borderColor: 'rgba(55,217,160,0.5)', boxShadow: '0 0 20px rgba(55,217,160,0.2)', duration: 0.2, stagger: 0.05 }, t4 + 1.2);
      tl.to('.card-check', { opacity: 1, scale: 1, duration: 0.2, stagger: 0.05, ease: 'back.out' }, t4 + 1.2);

      // ==========================================
      // TRANSITION 3 (18.0s to 19.5s)
      // ==========================================
      const t5 = 18.0;
      tl.to('.tree-path', { strokeDashoffset: 1500, duration: 1.0, ease: 'power3.inOut' }, t5);
      tl.to('.tree-pulses', { opacity: 0, duration: 0.2 }, t5);
      
      tl.to('#n0, #n1, #t3, #t4, #t5, #t6, #t7', { x: 0, y: 0, scale: 0, opacity: 0, duration: 1.5, ease: 'power3.inOut' }, t5);
      
      tl.to('.inf-path', { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, t5 + 0.5);
      
      tl.set('.wf-core', { scale: 0, opacity: 0 }, t5 + 0.5);
      tl.to('.wf-core', { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.inOut' }, t5 + 0.5);

      // ==========================================
      // SCENE 04: INFINITY ENGINE (19.5s to 23.0s)
      // ==========================================
      const t6 = 19.5;
      tl.set('.inf-dots', { strokeDashoffset: 0, opacity: 1 }, t6);
      tl.to('.inf-dots', { strokeDashoffset: -1200, duration: 3.5, ease: 'none' }, t6);

      tl.to('.logo-boxes', { x: -2, y: 2, skewX: 5, filter: 'hue-rotate(90deg)', opacity: 0.8, duration: 0.05 }, t6 + 1.5);
      tl.to('.logo-boxes', { x: 2, y: -2, skewX: -5, filter: 'blur(1px)', opacity: 0.9, duration: 0.05 }, t6 + 1.55);
      tl.to('.logo-boxes', { x: 0, y: 0, skewX: 0, filter: 'none', opacity: 1, duration: 0.05 }, t6 + 1.6);
      
      tl.to('.logo-fn', { opacity: 1, filter: 'invert(1)', duration: 0.05 }, t6 + 1.55);
      tl.to('.logo-fn', { opacity: 0, filter: 'none', duration: 0.05 }, t6 + 1.6);

      // ==========================================
      // TRANSITION 4 (23.0s to 24.5s)
      // ==========================================
      const t7 = 23.0;
      tl.to('.inf-path', { strokeDashoffset: 1500, duration: 1.0, ease: 'power3.inOut' }, t7);
      tl.to('.inf-dots', { opacity: 0, duration: 0.5 }, t7);
      tl.to('.wf-core', { scale: 0, opacity: 0, duration: 1.0, ease: 'power2.inOut' }, t7);
      
      tl.to('.pipe-line', { strokeDashoffset: 0, duration: 1.5, ease: 'power3.inOut' }, t7 + 0.5);
      
      tl.to('#n0', { x: -160, y: 0, scale: 1, opacity: 1, duration: 1.5, ease: 'power3.inOut' }, t7 + 0.5);
      tl.to('#n0 .n0-tree', { opacity: 0, duration: 0.1 }, t7 + 0.5);
      tl.to('#n0 .n0-pipe', { opacity: 1, duration: 0.1 }, t7 + 0.5);
      
      tl.to('#n1', { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.5, ease: 'power3.inOut' }, t7 + 0.5);
      tl.to('#n1 .n1-tree', { opacity: 0, duration: 0.1 }, t7 + 0.5);
      tl.to('#n1 .n1-pipe', { opacity: 1, duration: 0.1 }, t7 + 0.5);
      
      tl.to('#n2', { x: 160, y: 0, scale: 1, opacity: 1, duration: 1.5, ease: 'power3.inOut' }, t7 + 0.5);

    }, containerRef);
    return () => ctx.revert();
  }, [autoplay]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl" style={{ background: 'radial-gradient(120% 120% at 50% 50%, #150b13, #0b0509 60%, #070307 100%)' }}>
      
      {/* SVG LAYER FOR PATHS */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[300px] overflow-visible pointer-events-none" viewBox="-310 -150 620 300">
        <path className="pipe-line" d="M -310 0 L 310 0" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" strokeDasharray="620" />
        
        {/* Tree Branch Base Paths */}
        <g className="tree-paths">
          <path className="tree-path" d="M -200 0 L -50 0 M -50 0 C 20 0, 50 -120, 150 -120 M -50 0 C 20 0, 50 -60, 150 -60 M -50 0 L 150 0 M -50 0 C 20 0, 50 60, 150 60 M -50 0 C 20 0, 50 120, 150 120" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" strokeDasharray="1500" strokeDashoffset="1500" />
        </g>

        {/* Tree Travelling Pulses */}
        <g className="tree-pulses opacity-0">
          <path className="pulse-0" d="M -200 0 L -50 0" stroke="#ec1e63" strokeWidth="2" fill="none" strokeDasharray="15 300" strokeDashoffset="0" />
          <path className="pulse-1" d="M -50 0 C 20 0, 50 -120, 150 -120" stroke="#ec1e63" strokeWidth="2" fill="none" strokeDasharray="15 300" strokeDashoffset="0" />
          <path className="pulse-2" d="M -50 0 C 20 0, 50 -60, 150 -60" stroke="#ec1e63" strokeWidth="2" fill="none" strokeDasharray="15 300" strokeDashoffset="0" />
          <path className="pulse-3" d="M -50 0 L 150 0" stroke="#ec1e63" strokeWidth="2" fill="none" strokeDasharray="15 300" strokeDashoffset="0" />
          <path className="pulse-4" d="M -50 0 C 20 0, 50 60, 150 60" stroke="#ec1e63" strokeWidth="2" fill="none" strokeDasharray="15 300" strokeDashoffset="0" />
          <path className="pulse-5" d="M -50 0 C 20 0, 50 120, 150 120" stroke="#ec1e63" strokeWidth="2" fill="none" strokeDasharray="15 300" strokeDashoffset="0" />
        </g>

        {/* Infinity Paths */}
        <path className="inf-path" d="M 0 0 C 100 -100, 200 -100, 200 0 C 200 100, 100 100, 0 0 C -100 -100, -200 -100, -200 0 C -200 100, -100 100, 0 0" stroke="rgba(236,30,99,0.15)" strokeWidth="1.5" fill="none" strokeDasharray="1500" strokeDashoffset="1500" />
        <path className="inf-dots" d="M 0 0 C 100 -100, 200 -100, 200 0 C 200 100, 100 100, 0 0 C -100 -100, -200 -100, -200 0 C -200 100, -100 100, 0 0" stroke="#ec1e63" strokeWidth="2" fill="none" strokeDasharray="4 40" opacity="0" />
        
        {/* One Tap Shockwave */}
        <circle className="tap-wave" cx="0" cy="0" r="0" stroke="#ec1e63" strokeWidth="1.5" fill="none" opacity="0" />
      </svg>
      
      {/* DOM NODES LAYER */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        
        {/* STATION N0 */}
        <div id="n0" className="absolute top-0 left-0 flex items-center justify-center w-24 h-24 transform -translate-x-1/2 -translate-y-1/2">
          {/* N0: PIPELINE */}
          <div className="n0-pipe absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border border-white/20 bg-[#160d15] flex items-center justify-center relative shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3a2b34]" />
              <div className="n0-pulse absolute inset-0 rounded-full border border-[#37d9a0] opacity-0" />
            </div>
          </div>
          {/* N0: ONE TAP */}
          <div className="n0-tap absolute inset-0 flex items-center justify-center opacity-0 scale-50">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#ec1e63]/20 to-[#ec1e63]/5 border border-[#ec1e63]/40 flex items-center justify-center shadow-[0_0_30px_rgba(236,30,99,0.3)] backdrop-blur-md">
               <Zap size={24} className="text-[#ec1e63]" strokeWidth={1.5} />
            </div>
          </div>
          {/* N0: TREE */}
          <div className="n0-tree absolute inset-0 flex items-center justify-center opacity-0 scale-50">
             <div className="w-10 h-10 flex items-center justify-center bg-[#110a10]/90 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
                <Zap size={18} className="text-[#e2d3d9]" />
             </div>
          </div>
        </div>

        {/* STATION N1 */}
        <div id="n1" className="absolute top-0 left-0 flex items-center justify-center w-24 h-24 transform -translate-x-1/2 -translate-y-1/2">
          {/* N1: PIPELINE */}
          <div className="n1-pipe absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border border-white/20 bg-[#160d15] flex items-center justify-center relative shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3a2b34]" />
              <div className="n1-pulse absolute inset-0 rounded-full border border-[#37d9a0] opacity-0" />
            </div>
          </div>
          {/* N1: TREE */}
          <div className="n1-tree absolute inset-0 flex items-center justify-center opacity-0 scale-50">
             <div className="w-10 h-10 flex items-center justify-center bg-[#160d15]/90 backdrop-blur-xl border border-[#ec1e63]/40 rounded-full shadow-[0_0_15px_rgba(236,30,99,0.2)]">
                <Settings size={18} className="text-[#ec1e63]" strokeWidth={1.5} />
             </div>
          </div>
        </div>

        {/* STATION N2 */}
        <div id="n2" className="absolute top-0 left-0 flex items-center justify-center w-24 h-24 transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border border-white/20 bg-[#160d15] flex items-center justify-center relative shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3a2b34]" />
              <div className="n2-pulse absolute inset-0 rounded-full border border-[#37d9a0] opacity-0" />
            </div>
          </div>
        </div>

        {/* TASKS / ACTIONS */}
        <MicroCard id="t3" icon={FolderOpen} />
        <MicroCard id="t4" icon={FileText} />
        <MicroCard id="t5" icon={ShieldCheck} />
        <MicroCard id="t6" icon={Mail} />
        <MicroCard id="t7" icon={Users} />

        {/* INFINITY CORE */}
        <div className="wf-core absolute top-0 left-0 w-32 h-32 flex items-center justify-center z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-2 rounded-[2rem] bg-gradient-to-br from-[#ff4d86] to-[#b3134c] shadow-[0_10px_40px_rgba(236,30,99,0.4)] flex items-center justify-center overflow-hidden">
             <div className="absolute w-14 h-14 border-2 border-white/60 rounded-full"></div>
             <Boxes size={28} className="logo-boxes absolute text-white" strokeWidth={1.5} />
             <svg className="logo-fn absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28">
               <path d="M511.92 245.05C511.92 252.34 511.92 259.63 511.92 266.92C510.09 270.05 510.58 275.64 509.92 279.28C508.99 284.45 507.42 289.74 505.82 294.75C499.49 314.56 487.17 332.59 471.82 346.73C422.68 391.99 348.47 387.38 301.89 341.25C296.18 335.59 290.54 329.86 284.83 324.2C282.53 321.91 278.83 319.34 277.63 316.32C290.53 303.41 303.42 290.5 316.32 277.59C319.68 278.93 322.6 283.19 325.16 285.74C330.86 291.41 336.5 297.15 342.22 302.8C358.88 319.23 384.25 326.49 406.98 319.73C432.64 312.1 451.42 290.06 454.79 263.45C459.26 228.09 431.39 192.55 395.51 190.08C366.85 188.1 351.63 199.56 332.63 218.79C323.73 227.8 314.76 236.75 305.76 245.66C283.44 267.75 261.44 290.18 239.11 312.27C223.41 327.79 208.64 345.48 190.27 357.89C173.64 369.12 154.33 375.59 134.43 377.9C124.24 379.09 113.68 378.08 103.57 376.99C93.19 375.88 83.06 372.15 73.52 368.17C59.5 362.32 47.11 353.38 36.13 342.85C21.69 329.01 10.73 310.51 5.13 291.52C3.43 285.75 2.36 279.88 1.17 273.99C0.69 271.63 1.28 269.15 0.08 266.99C0.08 259.65 0.08 252.31 0.08 244.97C1.84 241.74 1.45 236.34 2.06 232.67C2.92 227.48 4.61 222.24 6.14 217.22C12.2 197.36 24.96 179.35 40.16 165.25C88.54 120.36 162.89 124.62 209.21 169.78C215.28 175.7 221.24 181.73 227.21 187.76C229.48 190.06 233.23 192.65 234.37 195.68C221.48 208.57 208.58 221.45 195.68 234.34C192.34 233.07 189.41 228.74 186.86 226.24C180.82 220.29 174.97 214.13 168.87 208.24C152.09 192.06 127.46 186.2 105 192.23C97.89 194.14 91.25 197.67 85.13 201.77C42.8 230.17 50.03 295.34 95.57 316.12C102.32 319.2 110.08 321.71 117.62 321.96C128.5 322.33 139.26 321.18 149.23 316.81C162.17 311.15 171.35 301.13 181.22 291.32C189.27 283.33 197.27 275.29 205.28 267.26C229.74 242.76 254.42 218.49 278.73 193.85C293.94 178.43 308.85 161.24 327.78 150.34C361.93 130.69 404.86 128.14 440.79 144.82C453.87 150.89 465.57 159.01 475.92 169.13C489.37 182.27 500.27 199.38 505.84 217.23C507.41 222.25 509.04 227.51 509.93 232.69C510.56 236.31 510.1 241.94 511.92 245.05Z" fill="#FFFFFF" fillRule="evenodd" stroke="#FFFFFF" strokeWidth="0.25" strokeLinejoin="round"/>
             </svg>
          </div>
        </div>

      </div>
    </div>
  );
};
