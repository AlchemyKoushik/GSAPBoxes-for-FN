import { useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { gsap } from 'gsap';
import {
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Compass,
  Filter,
  Globe2,
  Map as MapIcon,
  MapPin,
  Navigation,
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
      tl.set(q('.core-map'), { scale: 1, opacity: 1 });
      tl.set(q('.core-catcher, .core-tracker, .core-won'), { scale: 0.5, opacity: 0 });
      tl.set(q('.sales-map-boundary'), { strokeDasharray: 1200, strokeDashoffset: 1200, opacity: 0 });
      tl.set(q('.sales-map-routes path'), { strokeDasharray: 360, strokeDashoffset: 360, opacity: 0 });
      tl.set(q('.sales-map-pulses path'), { opacity: 0, strokeDasharray: '18 220', strokeDashoffset: 0 });
      tl.set(q('.sales-funnel-rails, .sales-funnel-fill'), { opacity: 0 });
      tl.set(q('.sales-funnel-rail'), { strokeDasharray: 270, strokeDashoffset: 270 });
      tl.set(q('.sales-funnel-wave'), { attr: { r: 0 }, opacity: 0 });
      tl.set(q('.sales-tracker-ring'), { attr: { r: 0 }, opacity: 0 });
      tl.set(q('.sales-tracker-crosshair'), { opacity: 0 });
      tl.set(q('.sales-tracker-sweep'), { opacity: 0, rotation: 0 });
      tl.set(q('.sales-tracker-ping'), { attr: { r: 0 }, opacity: 0 });
      tl.set(q('.sales-won-burst'), { attr: { r: 0 }, opacity: 0 });
      tl.set(cards, { opacity: 0, scale: 0 });

      if (isReduced) {
        tl.set(q('.sales-core'), { scale: 1, opacity: 1 });
        tl.set(q('.core-map'), { opacity: 0 });
        tl.set(q('.core-won'), { scale: 1, opacity: 1 });
        tl.set(cards, { x: 0, y: 0, opacity: 0 });
      } else {
        // 01 — Territory Sales Map: the cards fan out across one shared map system.
        const mapPositions = [
          { id: '#sale-1', x: -160, y: -44, at: 0.35 },
          { id: '#sale-2', x: -72, y: 64, at: 0.62 },
          { id: '#sale-3', x: 0, y: -25, at: 0.88 },
          { id: '#sale-4', x: 84, y: -64, at: 1.14 },
          { id: '#sale-5', x: 164, y: 40, at: 1.4 },
        ];

        tl.to(q('.sales-core'), { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.3)' }, 0);
        tl.to(q('.sales-map-boundary'), { strokeDashoffset: 0, opacity: 0.42, duration: 1.35, ease: 'power2.inOut' }, 0.2);
        mapPositions.forEach(({ id, x, y, at }) => {
          tl.to(q(id), { x, y, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.5)' }, at);
        });
        tl.to(q('.sales-map-routes path'), { strokeDashoffset: 0, opacity: 0.42, duration: 1.1, stagger: 0.12, ease: 'power2.inOut' }, 1.35);
        tl.to(q('.sales-map-pulses path'), { opacity: 0.9, duration: 0.2 }, 1.8);
        tl.to(q('.sales-map-pulses path'), { strokeDashoffset: -210, duration: 2.1, ease: 'none', repeat: 1 }, 1.8);
        tl.to(q('.sales-card'), { borderColor: 'rgba(236,30,99,0.42)', boxShadow: '0 0 20px rgba(236,30,99,0.2)', duration: 0.7 }, 2.25);

        // 02 — Lead Catcher: same cards, same glass treatment, guided through a central filter.
        const tLead = 5.2;
        tl.to(q('.sales-map-boundary, .sales-map-routes path, .sales-map-pulses path'), { opacity: 0, duration: 0.5 }, tLead);
        tl.to(q('.core-map'), { opacity: 0, scale: 0.5, duration: 0.45 }, tLead);
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
        tl.to(q('#sale-1'), { x: -110, y: -45, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('#sale-2'), { x: -30, y: -85, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('#sale-3'), { x: 74, y: -74, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('#sale-4'), { x: 110, y: 30, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('#sale-5'), { x: -20, y: 82, duration: 1.05, ease: 'power3.inOut' }, tTrack);
        tl.to(q('.sales-check'), { opacity: 0, scale: 0.5, duration: 0.3 }, tTrack + 0.25);
        tl.to(q('.sales-icon'), { color: '#e2d3d9', duration: 0.45 }, tTrack + 0.25);
        tl.to(q('#sale-2 .sales-icon'), { color: '#ffd24a', duration: 0.25 }, tTrack + 0.9);
        tl.to(q('#sale-4 .sales-icon'), { color: '#ff5a6a', duration: 0.25 }, tTrack + 0.9);
        tl.to(q('.sales-tracker-sweep'), { opacity: 0.9, rotation: 360, duration: 3.7, ease: 'none', transformOrigin: '0 0' }, tTrack + 1.1);
        tl.set(q('.sales-tracker-ping'), { attr: { r: 0, cx: -30, cy: -85 }, opacity: 1 }, tTrack + 2.15);
        tl.to(q('.sales-tracker-ping'), { attr: { r: 40 }, opacity: 0, duration: 0.5 }, tTrack + 2.15);
        tl.to(q('#sale-2 .sales-icon'), { color: '#37d9a0', duration: 0.2 }, tTrack + 2.25);
        tl.to(q('#sale-2 .sales-check'), { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out' }, tTrack + 2.25);
        tl.set(q('.sales-tracker-ping'), { attr: { r: 0, cx: 110, cy: 30 }, opacity: 1 }, tTrack + 3.45);
        tl.to(q('.sales-tracker-ping'), { attr: { r: 48 }, opacity: 0, duration: 0.55 }, tTrack + 3.45);
        tl.to(q('#sale-4 .sales-icon'), { color: '#37d9a0', duration: 0.2 }, tTrack + 3.55);
        tl.to(q('#sale-4 .sales-check'), { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out' }, tTrack + 3.55);

        // 04 — Enquiry Won: every thread resolves into one clear success state.
        const tWon = 17.1;
        tl.to(q('.sales-tracker-sweep, .sales-tracker-ring-1, .sales-tracker-ring-2, .sales-tracker-ring-3, .sales-tracker-crosshair'), { opacity: 0, duration: 0.55 }, tWon);
        tl.to(q('.core-tracker'), { opacity: 0, scale: 0.5, duration: 0.35 }, tWon);
        tl.to(q('.core-won'), { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' }, tWon + 0.3);
        tl.to(cards, { x: 0, y: 0, duration: 1.1, stagger: 0.08, ease: 'power3.inOut' }, tWon);
        tl.to(cards, { opacity: 0, scale: 0.55, duration: 0.45, stagger: 0.06, ease: 'power2.in' }, tWon + 0.95);
        tl.set(q('.sales-won-burst'), { attr: { r: 0 }, opacity: 1 }, tWon + 1.15);
        tl.to(q('.sales-won-burst'), { attr: { r: 105 }, opacity: 0, duration: 1.1, ease: 'power2.out' }, tWon + 1.15);
        tl.to(q('.core-won'), { filter: 'drop-shadow(0 0 18px rgba(55,217,160,0.65))', duration: 0.3, yoyo: true, repeat: 1 }, tWon + 1.25);

        // Reset before looping so the transitions stay clean.
        const reset = 20.25;
        tl.set(q('.sales-core'), { scale: 0, opacity: 0, filter: 'none' }, reset);
        tl.set(q('.core-map'), { opacity: 1, scale: 1 }, reset);
        tl.set(q('.core-catcher, .core-tracker, .core-won'), { opacity: 0, scale: 0.5 }, reset);
        tl.set(q('.sales-map-boundary'), { strokeDashoffset: 1200, opacity: 0 }, reset);
        tl.set(q('.sales-map-routes path'), { strokeDashoffset: 360, opacity: 0 }, reset);
        tl.set(q('.sales-map-pulses path'), { opacity: 0, strokeDashoffset: 0 }, reset);
        tl.set(q('.sales-funnel-rails, .sales-funnel-fill, .sales-tracker-ring, .sales-tracker-crosshair, .sales-tracker-sweep'), { opacity: 0 }, reset);
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
        <path className="sales-map-boundary" d="M -210 -50 C -180 -120, -50 -130, 40 -110 C 130 -90, 230 -80, 220 10 C 210 100, 140 120, 30 110 C -80 100, -190 90, -210 -50 Z" fill="rgba(236,30,99,0.03)" stroke="rgba(236,30,99,0.35)" strokeWidth="1.5" />
        <g className="sales-map-routes"><path d="M -160 -45 L 0 -25" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /><path d="M -70 65 L 0 -25" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /><path d="M 0 -25 L 85 -65" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /><path d="M 0 -25 L 165 40" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /></g>
        <g className="sales-map-pulses"><path d="M -160 -45 L 0 -25" stroke="#ec1e63" strokeWidth="2" fill="none" /><path d="M -70 65 L 0 -25" stroke="#ec1e63" strokeWidth="2" fill="none" /><path d="M 0 -25 L 85 -65" stroke="#ec1e63" strokeWidth="2" fill="none" /><path d="M 0 -25 L 165 40" stroke="#ec1e63" strokeWidth="2" fill="none" /></g>

        <g className="sales-funnel-rails"><path className="sales-funnel-rail" d="M -190 -85 L -25 20" stroke="rgba(236,30,99,0.7)" strokeWidth="2" strokeLinecap="round" fill="none" /><path className="sales-funnel-rail" d="M 190 -85 L 25 20" stroke="rgba(236,30,99,0.7)" strokeWidth="2" strokeLinecap="round" fill="none" /></g>
        <path className="sales-funnel-fill" d="M -190 -85 L -25 20 L 25 20 L 190 -85 Z" fill="rgba(236,30,99,0.06)" />
        <circle className="sales-funnel-wave" cx="0" cy="30" r="0" stroke="#37d9a0" strokeWidth="2" fill="none" />

        <g className="sales-tracker-rings"><circle className="sales-tracker-ring sales-tracker-ring-1" cx="0" cy="0" r="0" stroke="rgba(236,30,99,0.3)" strokeWidth="1.2" fill="none" /><circle className="sales-tracker-ring sales-tracker-ring-2" cx="0" cy="0" r="0" stroke="rgba(236,30,99,0.25)" strokeWidth="1.2" fill="none" /><circle className="sales-tracker-ring sales-tracker-ring-3" cx="0" cy="0" r="0" stroke="rgba(236,30,99,0.35)" strokeWidth="1.4" fill="none" strokeDasharray="6 3" /></g>
        <g className="sales-tracker-crosshair"><line x1="-140" y1="0" x2="140" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1" /><line x1="0" y1="-140" x2="0" y2="140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" /></g>
        <g className="sales-tracker-sweep"><path d="M 0 0 L 140 0 A 140 140 0 0 0 120 -70 Z" fill="rgba(236,30,99,0.16)" /><line x1="0" y1="0" x2="140" y2="0" stroke="#ff5b93" strokeWidth="2" strokeLinecap="round" /></g>
        <circle className="sales-tracker-ping" cx="0" cy="0" r="0" stroke="#37d9a0" strokeWidth="2" fill="none" />
        <circle className="sales-won-burst" cx="0" cy="0" r="0" stroke="#37d9a0" strokeWidth="2" fill="none" />
      </svg>

      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        <div className="sales-core absolute top-0 left-0 w-32 h-32 flex items-center justify-center z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
          <div className="core-map absolute inset-0 flex items-center justify-center"><div className="w-10 h-10 flex items-center justify-center bg-[#160d15]/90 backdrop-blur-xl border border-[#ec1e63]/40 rounded-full shadow-[0_0_20px_rgba(236,30,99,0.25)]"><MapIcon size={18} className="text-[#ff5b93]" strokeWidth={1.5} /></div></div>
          <div className="core-catcher absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#ec1e63]/20 to-[#ec1e63]/5 border border-[#ec1e63]/40 flex items-center justify-center shadow-[0_0_30px_rgba(236,30,99,0.3)] backdrop-blur-md"><Filter size={24} className="text-[#ec1e63]" strokeWidth={1.5} /></div></div>
          <div className="core-tracker absolute inset-0 flex items-center justify-center"><div className="w-12 h-12 flex items-center justify-center bg-[#160d15]/90 backdrop-blur-xl border border-[#ec1e63]/45 rounded-full shadow-[0_0_22px_rgba(236,30,99,0.25)]"><CalendarDays size={20} className="text-[#ff5b93]" strokeWidth={1.5} /></div></div>
          <div className="core-won absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#37d9a0]/20 to-[#37d9a0]/5 border border-[#37d9a0]/65 flex items-center justify-center shadow-[0_0_30px_rgba(55,217,160,0.35)] backdrop-blur-md"><CheckCircle2 size={27} className="text-[#37d9a0]" strokeWidth={1.5} /></div></div>
        </div>

        <MicroCard id="sale-1" icon={MapPin} />
        <MicroCard id="sale-2" icon={Building2} />
        <MicroCard id="sale-3" icon={Compass} />
        <MicroCard id="sale-4" icon={Globe2} />
        <MicroCard id="sale-5" icon={Navigation} />
      </div>
    </div>
  );
};
