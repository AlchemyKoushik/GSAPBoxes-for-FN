import { useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { gsap } from 'gsap';
import {
  Boxes,
  CalendarDays,
  Check,
  CheckCircle2,
  Filter,
  UserRound,
  UsersRound,
} from 'lucide-react';
import '../DigitalEcosystemAnimation/ecosystem.css';

type Props = { autoplay?: boolean; loop?: boolean; reducedMotion?: boolean };

type MicroCardProps = {
  id: string;
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

const MicroCard = ({ id, icon: Icon }: MicroCardProps) => (
  <div id={id} className="sales-card absolute top-0 left-0 w-12 h-12 bg-[#1b1019]/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform -translate-x-1/2 -translate-y-1/2 overflow-visible">
    <Icon size={20} className="sales-icon text-[#ff5b93]" strokeWidth={1.5} />
    <div className="sales-check absolute -bottom-1 -right-1 w-4 h-4 bg-[#37d9a0] rounded-full flex items-center justify-center opacity-0 scale-50 border border-[#1b1019] shadow-[0_0_10px_rgba(55,217,160,0.5)]">
      <Check size={10} strokeWidth={4} className="text-[#1b1019]" />
    </div>
  </div>
);

export const SmarterSalesAnimation = ({ autoplay = true, loop = true, reducedMotion = false }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const isReduced = reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);
      const tl = gsap.timeline({ paused: !autoplay, repeat: loop && !isReduced ? -1 : 0 });
      const cards = q('.sales-card');

      tl.set(q('.sales-icon'), { color: '#ff5b93' });
      tl.set(q('.sales-check'), { opacity: 0, scale: 0.5 });
      tl.set(q('.sales-card'), { borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' });
      tl.set(q('.sales-core'), { scale: 0, opacity: 0 });
      tl.set(q('.core-catcher, .core-tracker, .core-won, .core-flownex'), { scale: 0.5, opacity: 0 });
      tl.set(q('.sales-map-boundary path'), { strokeDasharray: 1200, strokeDashoffset: 1200, opacity: 0 });
      tl.set(q('.sales-map-routes path'), { strokeDasharray: 360, strokeDashoffset: 360, opacity: 0 });
      tl.set(q('.sales-map-pulses path'), { opacity: 0, strokeDasharray: '18 220', strokeDashoffset: 0 });
      tl.set(q('.sales-funnel-rails, .sales-funnel-fill'), { opacity: 0 });
      tl.set(q('.sales-funnel-rail'), { strokeDasharray: 270, strokeDashoffset: 270 });
      tl.set(q('.sales-funnel-wave'), { attr: { r: 0 }, opacity: 0 });
      tl.set(q('.sales-tracker-ring'), { attr: { r: 0 }, opacity: 0 });
      tl.set(q('.sales-tracker-crosshair'), { opacity: 0 });
      tl.set(q('.sales-tracker-lines'), { opacity: 0, strokeDasharray: 180, strokeDashoffset: 180 });
      tl.set(q('.sales-tracker-sweep'), { opacity: 0, rotation: 0, svgOrigin: '0 0' });
      tl.set(q('.sales-tracker-ping'), { attr: { r: 0 }, opacity: 0 });
      tl.set(q('.sales-won-burst'), { attr: { r: 0 }, opacity: 0 });
      tl.set(cards, { opacity: 0, scale: 0 });

      if (isReduced) {
        tl.set(q('.sales-core'), { scale: 1, opacity: 1 });
        tl.set(q('.core-won'), { scale: 0.5, opacity: 0 });
        tl.set(q('.core-flownex'), { scale: 1, opacity: 1 });
        tl.set(cards, { x: 0, y: 0, opacity: 0 });
      } else {
        // 01 — Territory Sales Map: the cards fan out across one shared map system.
        const mapPositions = [
          { id: '#sale-1', x: -170, y: 10, at: 1.85 },
          { id: '#sale-2', x: -50, y: -50, at: 2.08 },
          { id: '#sale-3', x: 45, y: -38, at: 2.31 },
          { id: '#sale-4', x: 155, y: -8, at: 2.54 },
          { id: '#sale-5', x: 160, y: 80, at: 2.77 },
        ];

        tl.to(q('.sales-map-boundary path'), { strokeDashoffset: 0, opacity: 0.42, duration: 1.35, stagger: 0.08, ease: 'power2.inOut' }, 0.2);
        tl.to(q('.sales-map-routes path'), { strokeDashoffset: 0, opacity: 0.42, duration: 1.1, stagger: 0.12, ease: 'power2.inOut' }, 1.45);
        mapPositions.forEach(({ id, x, y, at }) => {
          tl.to(q(id), { x, y, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.5)' }, at);
        });
        tl.to(q('.sales-map-pulses path'), { opacity: 0.9, duration: 0.2 }, 2.75);
        tl.to(q('.sales-map-pulses path'), { strokeDashoffset: -210, duration: 2.1, ease: 'none', repeat: 1 }, 2.75);
        tl.to(q('.sales-card'), { borderColor: 'rgba(236,30,99,0.42)', boxShadow: '0 0 20px rgba(236,30,99,0.2)', duration: 0.7 }, 3.25);

        // 02 — Lead Catcher: same cards, same glass treatment, guided through a central filter.
        const tLead = 5.2;
        tl.to(q('.sales-map-boundary path, .sales-map-routes path, .sales-map-pulses path'), { opacity: 0, duration: 0.5 }, tLead);
        tl.to(q('.sales-core'), { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }, tLead);
        tl.to(q('.core-catcher'), { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.3)' }, tLead + 0.35);
        tl.to(q('.sales-funnel-rails, .sales-funnel-fill'), { opacity: 1, duration: 0.45 }, tLead + 0.2);
        tl.to(q('.sales-funnel-rail'), { strokeDashoffset: 0, duration: 0.9, stagger: 0.1, ease: 'power2.out' }, tLead + 0.2);
        tl.to(q('#sale-1, #sale-2, #sale-3, #sale-4, #sale-5'), { x: 0, y: -106, duration: 1.15, stagger: 0.08, ease: 'power3.inOut' }, tLead);

        const leadDrops = [
          { id: '#sale-3', x: 0, end: 0, at: tLead + 1.4 },
          { id: '#sale-2', x: -38, end: -70, at: tLead + 2.0 },
          { id: '#sale-4', x: 38, end: 70, at: tLead + 2.6 },
          { id: '#sale-1', x: -78, end: -130, at: tLead + 3.2 },
          { id: '#sale-5', x: 78, end: 130, at: tLead + 3.8 },
        ];
        leadDrops.forEach(({ id, x, end, at }) => {
          tl.to(q(id), { x, y: -30, duration: 0.38, ease: 'power1.in' }, at);
          tl.to(q(id), { x: 0, y: 27, duration: 0.35, ease: 'power2.in' }, at + 0.38);
          tl.set(q('.sales-funnel-wave'), { attr: { r: 0, cx: 0, cy: 30 }, opacity: 1 }, at + 0.73);
          tl.to(q('.sales-funnel-wave'), { attr: { r: 48 }, opacity: 0, duration: 0.45, ease: 'power2.out' }, at + 0.73);
          tl.to(q(`${id} .sales-icon`), { color: '#37d9a0', duration: 0.16 }, at + 0.73);
          tl.to(q(id), { borderColor: 'rgba(55,217,160,0.75)', boxShadow: '0 0 20px rgba(55,217,160,0.35)', duration: 0.2 }, at + 0.73);
          tl.to(q(`${id} .sales-check`), { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(2)' }, at + 0.73);
          tl.to(q(id), { x: end, y: 84, duration: 0.46, ease: 'power2.out' }, at + 0.86);
        });

        // 03 — Follow-up Tracker: the central tracker scans and resolves icon cards.
        const tTrack = 11.4;
        tl.to(q('.sales-funnel-rails, .sales-funnel-fill'), { opacity: 0, duration: 0.55 }, tTrack);
        tl.to(q('.core-catcher'), { opacity: 0, scale: 0.5, duration: 0.35 }, tTrack);
        tl.to(q('.core-tracker'), { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }, tTrack + 0.35);
        tl.to(q('.sales-tracker-ring-1'), { attr: { r: 52 }, opacity: 0.28, duration: 0.75, ease: 'power2.out' }, tTrack + 0.2);
        tl.to(q('.sales-tracker-ring-2'), { attr: { r: 95 }, opacity: 0.22, duration: 0.9, ease: 'power2.out' }, tTrack + 0.3);
        tl.to(q('.sales-tracker-ring-3'), { attr: { r: 138 }, opacity: 0.3, duration: 1, ease: 'power2.out' }, tTrack + 0.4);
        tl.to(q('.sales-tracker-crosshair'), { opacity: 0.3, duration: 0.55 }, tTrack + 0.4);
        tl.to(q('.sales-tracker-lines'), { strokeDashoffset: 0, opacity: 0.32, duration: 0.8, ease: 'power2.out' }, tTrack + 0.35);
        tl.to(q('#sale-1'), { x: -110, y: -45, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('#sale-2'), { x: -30, y: -85, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('#sale-3'), { x: 74, y: -74, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('#sale-4'), { x: 110, y: 30, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('#sale-5'), { x: -20, y: 82, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('.sales-check'), { opacity: 0, scale: 0.5, duration: 0.3 }, tTrack + 0.25);
        tl.to(q('.sales-icon'), { color: '#e2d3d9', duration: 0.45 }, tTrack + 0.25);
        tl.to(q('#sale-2 .sales-icon'), { color: '#ffd24a', duration: 0.25 }, tTrack + 0.9);
        tl.to(q('#sale-4 .sales-icon'), { color: '#ff5a6a', duration: 0.25 }, tTrack + 0.9);
        tl.to(q('.sales-tracker-sweep'), { opacity: 0.9, rotation: 360, duration: 3.7, ease: 'none', svgOrigin: '0 0' }, tTrack + 1.1);
        tl.set(q('.sales-tracker-ping'), { attr: { r: 0, cx: -30, cy: -85 }, opacity: 1 }, tTrack + 2.15);
        tl.to(q('.sales-tracker-ping'), { attr: { r: 40 }, opacity: 0, duration: 0.5 }, tTrack + 2.15);
        tl.to(q('#sale-2 .sales-icon'), { color: '#37d9a0', duration: 0.2 }, tTrack + 2.25);
        tl.to(q('#sale-2 .sales-check'), { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out' }, tTrack + 2.25);
        tl.set(q('.sales-tracker-ping'), { attr: { r: 0, cx: 110, cy: 30 }, opacity: 1 }, tTrack + 3.45);
        tl.to(q('.sales-tracker-ping'), { attr: { r: 48 }, opacity: 0, duration: 0.55 }, tTrack + 3.45);
        tl.to(q('#sale-4 .sales-icon'), { color: '#37d9a0', duration: 0.2 }, tTrack + 3.55);
        tl.to(q('#sale-4 .sales-check'), { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out' }, tTrack + 3.55);

        // 04 — Enquiry Won: every thread resolves into one clear success state.
        const tWon = 16.55;
        tl.to(q('.sales-tracker-sweep, .sales-tracker-ring-1, .sales-tracker-ring-2, .sales-tracker-ring-3, .sales-tracker-crosshair, .sales-tracker-lines'), { opacity: 0, duration: 0.45 }, tWon);
        tl.to(q('.sales-icon'), { color: '#ff5b93', duration: 0.3 }, tWon);
        tl.to(q('.sales-card'), { borderColor: 'rgba(236,30,99,0.48)', boxShadow: '0 0 20px rgba(236,30,99,0.24)', duration: 0.3 }, tWon);
        tl.to(q('.sales-check'), { opacity: 0, scale: 0.5, duration: 0.25 }, tWon);
        tl.to(q('.core-tracker'), { opacity: 0, scale: 0.5, duration: 0.35 }, tWon);
        tl.to(q('.core-won'), { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' }, tWon + 0.3);
        tl.to(cards, { x: 0, y: 0, duration: 1.1, stagger: 0.08, ease: 'power3.inOut' }, tWon);
        tl.to(cards, { opacity: 0, scale: 0.55, duration: 0.45, stagger: 0.06, ease: 'power2.in' }, tWon + 0.95);
        tl.set(q('.sales-won-burst'), { attr: { r: 0 }, opacity: 1 }, tWon + 1.15);
        tl.to(q('.sales-won-burst'), { attr: { r: 105 }, opacity: 0, duration: 1.1, ease: 'power2.out' }, tWon + 1.15);
        tl.to(q('.core-won'), { filter: 'drop-shadow(0 0 18px rgba(55,217,160,0.65))', duration: 0.3, yoyo: true, repeat: 1 }, tWon + 1.25);
        tl.to(q('.core-won'), { opacity: 0, scale: 0.5, duration: 0.42, ease: 'power2.in' }, tWon + 1.65);
        tl.to(q('.core-flownex'), { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, tWon + 1.8);

        // Reset before looping so the transitions stay clean.
        const reset = 23.5;
        tl.set(q('.sales-core'), { scale: 0, opacity: 0, filter: 'none' }, reset);
        tl.set(q('.core-catcher, .core-tracker, .core-won, .core-flownex'), { opacity: 0, scale: 0.5 }, reset);
        tl.set(q('.sales-map-boundary path'), { strokeDashoffset: 1200, opacity: 0 }, reset);
        tl.set(q('.sales-map-routes path'), { strokeDashoffset: 360, opacity: 0 }, reset);
        tl.set(q('.sales-map-pulses path'), { opacity: 0, strokeDashoffset: 0 }, reset);
        tl.set(q('.sales-funnel-rails, .sales-funnel-fill, .sales-tracker-ring, .sales-tracker-crosshair, .sales-tracker-lines, .sales-tracker-sweep'), { opacity: 0 }, reset);
        tl.set(q('.sales-tracker-lines'), { strokeDashoffset: 180 }, reset);
        tl.set(q('.sales-funnel-rail'), { strokeDashoffset: 270 }, reset);
        tl.set(q('.sales-funnel-wave, .sales-tracker-ping, .sales-won-burst'), { opacity: 0 }, reset);
        tl.set(cards, { x: 0, y: 0, opacity: 0, scale: 0, borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }, reset);
        tl.set(q('.sales-icon'), { color: '#ff5b93' }, reset);
        tl.set(q('.sales-check'), { opacity: 0, scale: 0.5 }, reset);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [autoplay, loop, reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl" style={{ background: 'radial-gradient(120% 120% at 50% 50%, #150b13, #0b0509 60%, #070307 100%)' }}>
      <div className="ambient-blob" />
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[300px] overflow-visible pointer-events-none" viewBox="-310 -150 620 300">
        <g className="sales-map-boundary" fill="rgba(236,30,99,0.035)" stroke="rgba(236,30,99,0.35)" strokeWidth="1.3" strokeLinejoin="round">
          <path d="M -226 -53 C -212 -78 -181 -91 -155 -77 C -137 -68 -132 -48 -146 -30 C -157 -16 -170 -5 -173 13 C -177 34 -162 54 -174 77 C -184 98 -204 88 -211 69 C -217 50 -203 36 -208 18 C -214 -4 -232 -28 -226 -53 Z" />
          <path d="M -106 -61 C -82 -82 -50 -81 -24 -68 C 4 -73 35 -70 62 -59 C 92 -65 130 -56 159 -40 C 186 -27 207 -6 218 16 C 222 29 204 34 184 30 C 164 26 153 42 132 42 C 112 41 97 29 78 31 C 57 34 48 48 30 44 C 8 39 -1 25 -12 10 C -30 -6 -49 -16 -70 -20 C -88 -24 -112 -40 -106 -61 Z" />
          <path d="M -6 14 C 14 3 34 10 45 29 C 54 48 44 66 35 86 C 27 104 14 115 0 105 C -12 95 -11 75 -20 59 C -30 40 -29 23 -6 14 Z" />
          <path d="M 137 67 C 159 55 188 58 202 74 C 214 88 205 105 189 111 C 167 120 141 108 132 93 C 125 82 126 73 137 67 Z" />
          <path d="M -153 -101 C -137 -112 -113 -108 -101 -96 C -104 -84 -119 -79 -135 -82 C -148 -85 -158 -94 -153 -101 Z" />
        </g>
        <g className="sales-map-routes"><path d="M -170 10 L -50 -50" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /><path d="M -50 -50 L 45 -38" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /><path d="M 45 -38 L 155 -8" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /><path d="M 45 -38 L 160 80" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /></g>
        <g className="sales-map-pulses"><path d="M -170 10 L -50 -50" stroke="#ec1e63" strokeWidth="2" fill="none" /><path d="M -50 -50 L 45 -38" stroke="#ec1e63" strokeWidth="2" fill="none" /><path d="M 45 -38 L 155 -8" stroke="#ec1e63" strokeWidth="2" fill="none" /><path d="M 45 -38 L 160 80" stroke="#ec1e63" strokeWidth="2" fill="none" /></g>

        <g className="sales-funnel-rails"><path className="sales-funnel-rail" d="M -190 -85 L -25 20" stroke="rgba(236,30,99,0.7)" strokeWidth="2" strokeLinecap="round" fill="none" /><path className="sales-funnel-rail" d="M 190 -85 L 25 20" stroke="rgba(236,30,99,0.7)" strokeWidth="2" strokeLinecap="round" fill="none" /></g>
        <path className="sales-funnel-fill" d="M -190 -85 L -25 20 L 25 20 L 190 -85 Z" fill="rgba(236,30,99,0.06)" />
        <circle className="sales-funnel-wave" cx="0" cy="30" r="0" stroke="#37d9a0" strokeWidth="2" fill="none" />

        <g className="sales-tracker-rings"><circle className="sales-tracker-ring sales-tracker-ring-1" cx="0" cy="0" r="0" stroke="rgba(236,30,99,0.3)" strokeWidth="1.2" fill="none" /><circle className="sales-tracker-ring sales-tracker-ring-2" cx="0" cy="0" r="0" stroke="rgba(236,30,99,0.25)" strokeWidth="1.2" fill="none" /><circle className="sales-tracker-ring sales-tracker-ring-3" cx="0" cy="0" r="0" stroke="rgba(236,30,99,0.35)" strokeWidth="1.4" fill="none" strokeDasharray="6 3" /></g>
        <g className="sales-tracker-crosshair"><line x1="-140" y1="0" x2="140" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1" /><line x1="0" y1="-140" x2="0" y2="140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" /></g>
        <g className="sales-tracker-lines" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1"><path d="M 0 0 L -110 -45" /><path d="M 0 0 L -30 -85" /><path d="M 0 0 L 74 -74" /><path d="M 0 0 L 110 30" /><path d="M 0 0 L -20 82" /></g>
        <g className="sales-tracker-sweep"><path d="M 0 0 L 140 0 A 140 140 0 0 0 120 -70 Z" fill="rgba(236,30,99,0.16)" /><line x1="0" y1="0" x2="140" y2="0" stroke="#ff5b93" strokeWidth="2" strokeLinecap="round" /></g>
        <circle className="sales-tracker-ping" cx="0" cy="0" r="0" stroke="#37d9a0" strokeWidth="2" fill="none" />
        <circle className="sales-won-burst" cx="0" cy="0" r="0" stroke="#ff5b93" strokeWidth="2" fill="none" />
      </svg>

      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        <div className="sales-core absolute top-0 left-0 w-32 h-32 flex items-center justify-center z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
          <div className="core-catcher absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#ec1e63]/20 to-[#ec1e63]/5 border border-[#ec1e63]/40 flex items-center justify-center shadow-[0_0_30px_rgba(236,30,99,0.3)] backdrop-blur-md"><Filter size={24} className="text-[#ec1e63]" strokeWidth={1.5} /></div></div>
          <div className="core-tracker absolute inset-0 flex items-center justify-center"><div className="w-12 h-12 flex items-center justify-center bg-[#160d15]/90 backdrop-blur-xl border border-[#ec1e63]/45 rounded-full shadow-[0_0_22px_rgba(236,30,99,0.25)]"><CalendarDays size={20} className="text-[#ff5b93]" strokeWidth={1.5} /></div></div>
          <div className="core-won absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff4d86]/25 to-[#b3134c]/10 border border-[#ff5b93]/70 flex items-center justify-center shadow-[0_0_30px_rgba(236,30,99,0.38)] backdrop-blur-md"><CheckCircle2 size={27} className="text-[#ff8fb5]" strokeWidth={1.5} /></div></div>
          <div className="core-flownex absolute inset-0 flex items-center justify-center pointer-events-none"><div className="relative w-32 h-32 rounded-[2rem] bg-gradient-to-br from-[#ff4d86] to-[#b3134c] shadow-[0_10px_40px_rgba(236,30,99,0.4)] flex items-center justify-center overflow-hidden"><div className="absolute w-14 h-14 border-2 border-white/60 rounded-full" /><Boxes size={28} className="logo-boxes absolute text-white" strokeWidth={1.5} /><UsersRound size={28} className="logo-fn absolute text-white" strokeWidth={1.5} /></div></div>
        </div>

        <MicroCard id="sale-1" icon={UserRound} />
        <MicroCard id="sale-2" icon={UserRound} />
        <MicroCard id="sale-3" icon={UserRound} />
        <MicroCard id="sale-4" icon={UserRound} />
        <MicroCard id="sale-5" icon={UserRound} />
      </div>
    </div>
  );
};
