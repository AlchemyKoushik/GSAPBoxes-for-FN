import { useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import {
  CalendarDays,
  Check,
  CheckCircle2,
  UserRound,
  UsersRound,
} from 'lucide-react';
import '../DigitalEcosystemAnimation/ecosystem.css';

gsap.registerPlugin(MotionPathPlugin);

type Props = { autoplay?: boolean; loop?: boolean; reducedMotion?: boolean };

type MicroCardProps = {
  id: string;
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

const MicroCard = ({ id, icon: Icon }: MicroCardProps) => (
  <div id={id} className="sales-card absolute top-0 left-0 w-12 h-12 bg-[#1b1019]/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform -translate-x-1/2 -translate-y-1/2 overflow-visible z-20">
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
      tl.set(q('.core-tracker, .core-won, .core-flownex'), { scale: 0.5, opacity: 0 });
      tl.set(q('.sales-map-boundary path'), { strokeDasharray: 1200, strokeDashoffset: 1200, opacity: 0 });
      tl.set(q('.sales-map-routes path'), { strokeDasharray: 360, strokeDashoffset: 360, opacity: 0 });
      tl.set(q('.sales-map-pulses path'), { opacity: 0, strokeDasharray: '18 220', strokeDashoffset: 0 });
      tl.set(q('.sales-funnel-rails, .sales-funnel-fill, .sales-gate-line, .sales-gate-glow'), { opacity: 0 });
      tl.set(q('.sales-funnel-rail'), { strokeDasharray: 300, strokeDashoffset: 300 });
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
        tl.set(q('.core-tracker, .core-won'), { scale: 0.5, opacity: 0 });
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

        // 02 — Lead Catcher: clean, minimal cyber funnel guiding incoming leads through qualification.
        const tLead = 5.2;
        tl.to(q('.sales-map-boundary path, .sales-map-routes path, .sales-map-pulses path'), { opacity: 0, duration: 0.4 }, tLead);

        // Clean funnel rails & gate reveal smoothly
        tl.to(q('.sales-funnel-rails, .sales-funnel-fill, .sales-gate-line, .sales-gate-glow'), { opacity: 1, duration: 0.6 }, tLead + 0.15);
        tl.to(q('.sales-funnel-rail'), { strokeDashoffset: 0, duration: 0.85, ease: 'power2.out' }, tLead + 0.15);

        // Cards fan gracefully into the upper intake formation
        const hopperPositions = [
          { id: '#sale-1', x: -140, y: -85 },
          { id: '#sale-2', x: -70, y: -92 },
          { id: '#sale-3', x: 0, y: -96 },
          { id: '#sale-4', x: 70, y: -92 },
          { id: '#sale-5', x: 140, y: -85 },
        ];
        hopperPositions.forEach(({ id, x, y }, i) => {
          tl.to(q(id), { x, y, duration: 0.8, delay: i * 0.04, ease: 'power3.inOut' }, tLead);
        });

        // Clean qualification helper: subtle gate flash, clean ripple, verified badge
        const triggerQualification = (targetId: string, atTime: number) => {
          tl.to(q('.sales-gate-line'), { stroke: '#37d9a0', strokeWidth: 2, duration: 0.15, yoyo: true, repeat: 1 }, atTime);
          tl.set(q('.sales-funnel-wave'), { attr: { r: 0 }, opacity: 0.8 }, atTime);
          tl.to(q('.sales-funnel-wave'), { attr: { r: 42 }, opacity: 0, duration: 0.45, ease: 'power2.out' }, atTime);

          tl.to(q(`${targetId} .sales-icon`), { color: '#37d9a0', duration: 0.2 }, atTime);
          tl.to(q(targetId), { borderColor: 'rgba(55,217,160,0.85)', boxShadow: '0 0 20px rgba(55,217,160,0.4)', duration: 0.25 }, atTime);
          tl.to(q(`${targetId} .sales-check`), { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }, atTime);
        };

        // Lead 1: Center lead (#sale-3) - direct smooth descent
        const t3 = tLead + 1.15;
        tl.to(q('#sale-3'), {
          motionPath: {
            path: [{ x: 0, y: -96 }, { x: 0, y: 10 }, { x: 0, y: 80 }],
            fromCurrent: false,
            autoRotate: false,
          },
          duration: 0.9,
          ease: 'power1.inOut',
        }, t3);
        triggerQualification('#sale-3', t3 + 0.42);

        // Lead 2: Mid-left lead (#sale-2) - smooth continuous curve along inner left funnel
        const t2 = tLead + 1.8;
        tl.to(q('#sale-2'), {
          motionPath: {
            path: [
              { x: -70, y: -92 },
              { x: -35, y: -30 },
              { x: 0, y: 10 },
              { x: -35, y: 50 },
              { x: -70, y: 80 },
            ],
            curviness: 1.25,
            fromCurrent: false,
            autoRotate: false,
          },
          duration: 0.95,
          ease: 'power1.inOut',
        }, t2);
        triggerQualification('#sale-2', t2 + 0.45);

        // Lead 3: Mid-right lead (#sale-4) - smooth continuous curve along inner right funnel
        const t4 = tLead + 2.45;
        tl.to(q('#sale-4'), {
          motionPath: {
            path: [
              { x: 70, y: -92 },
              { x: 35, y: -30 },
              { x: 0, y: 10 },
              { x: 35, y: 50 },
              { x: 70, y: 80 },
            ],
            curviness: 1.25,
            fromCurrent: false,
            autoRotate: false,
          },
          duration: 0.95,
          ease: 'power1.inOut',
        }, t4);
        triggerQualification('#sale-4', t4 + 0.45);

        // Lead 4: Far-left lead (#sale-1) - smooth sweeping curve along outer left funnel
        const t1 = tLead + 3.1;
        tl.to(q('#sale-1'), {
          motionPath: {
            path: [
              { x: -140, y: -85 },
              { x: -75, y: -25 },
              { x: 0, y: 10 },
              { x: -65, y: 50 },
              { x: -130, y: 80 },
            ],
            curviness: 1.3,
            fromCurrent: false,
            autoRotate: false,
          },
          duration: 1.0,
          ease: 'power1.inOut',
        }, t1);
        triggerQualification('#sale-1', t1 + 0.48);

        // Lead 5: Far-right lead (#sale-5) - smooth sweeping curve along outer right funnel
        const t5 = tLead + 3.75;
        tl.to(q('#sale-5'), {
          motionPath: {
            path: [
              { x: 140, y: -85 },
              { x: 75, y: -25 },
              { x: 0, y: 10 },
              { x: 65, y: 50 },
              { x: 130, y: 80 },
            ],
            curviness: 1.3,
            fromCurrent: false,
            autoRotate: false,
          },
          duration: 1.0,
          ease: 'power1.inOut',
        }, t5);
        triggerQualification('#sale-5', t5 + 0.48);

        // Subtle synchronized pulse across all 5 qualified leads
        tl.to(q('.sales-card'), { borderColor: 'rgba(55,217,160,0.9)', boxShadow: '0 0 20px rgba(55,217,160,0.4)', duration: 0.25, stagger: 0.05, yoyo: true, repeat: 1 }, tLead + 4.9);

        // 03 — Follow-up Tracker: the central tracker scans and resolves icon cards.
        const tTrack = 11.4;
        tl.to(q('.sales-funnel-rails, .sales-funnel-fill, .sales-gate-line, .sales-gate-glow'), { opacity: 0, duration: 0.55 }, tTrack);
        tl.to(q('.sales-core'), { opacity: 1, scale: 1, duration: 0.45 }, tTrack);
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
        tl.set(q('.core-tracker, .core-won, .core-flownex'), { opacity: 0, scale: 0.5 }, reset);
        tl.set(q('.sales-map-boundary path'), { strokeDashoffset: 1200, opacity: 0 }, reset);
        tl.set(q('.sales-map-routes path'), { strokeDashoffset: 360, opacity: 0 }, reset);
        tl.set(q('.sales-map-pulses path'), { opacity: 0, strokeDashoffset: 0 }, reset);
        tl.set(q('.sales-funnel-rails, .sales-funnel-fill, .sales-gate-line, .sales-gate-glow, .sales-tracker-ring, .sales-tracker-crosshair, .sales-tracker-lines, .sales-tracker-sweep'), { opacity: 0 }, reset);
        tl.set(q('.sales-funnel-rail'), { strokeDashoffset: 300 }, reset);
        tl.set(q('.sales-gate-line'), { stroke: 'rgba(236,30,99,0.5)', strokeWidth: 1.5 }, reset);
        tl.set(q('.sales-tracker-lines'), { strokeDashoffset: 180 }, reset);
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
        <defs>
          <linearGradient id="cleanFunnelFill" x1="0" y1="-85" x2="0" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ec1e63" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ec1e63" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="cleanRailGrad" x1="0" y1="-85" x2="0" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff5b93" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ec1e63" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="gateGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ec1e63" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec1e63" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Territory Sales Map */}
        <g className="sales-map-boundary" fill="rgba(236,30,99,0.035)" stroke="rgba(236,30,99,0.35)" strokeWidth="1.3" strokeLinejoin="round">
          <path d="M -226 -53 C -212 -78 -181 -91 -155 -77 C -137 -68 -132 -48 -146 -30 C -157 -16 -170 -5 -173 13 C -177 34 -162 54 -174 77 C -184 98 -204 88 -211 69 C -217 50 -203 36 -208 18 C -214 -4 -232 -28 -226 -53 Z" />
          <path d="M -106 -61 C -82 -82 -50 -81 -24 -68 C 4 -73 35 -70 62 -59 C 92 -65 130 -56 159 -40 C 186 -27 207 -6 218 16 C 222 29 204 34 184 30 C 164 26 153 42 132 42 C 112 41 97 29 78 31 C 57 34 48 48 30 44 C 8 39 -1 25 -12 10 C -30 -6 -49 -16 -70 -20 C -88 -24 -112 -40 -106 -61 Z" />
          <path d="M -6 14 C 14 3 34 10 45 29 C 54 48 44 66 35 86 C 27 104 14 115 0 105 C -12 95 -11 75 -20 59 C -30 40 -29 23 -6 14 Z" />
          <path d="M 137 67 C 159 55 188 58 202 74 C 214 88 205 105 189 111 C 167 120 141 108 132 93 C 125 82 126 73 137 67 Z" />
          <path d="M -153 -101 C -137 -112 -113 -108 -101 -96 C -104 -84 -119 -79 -135 -82 C -148 -85 -158 -94 -153 -101 Z" />
        </g>
        <g className="sales-map-routes"><path d="M -170 10 L -50 -50" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /><path d="M -50 -50 L 45 -38" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /><path d="M 45 -38 L 155 -8" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /><path d="M 45 -38 L 160 80" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fill="none" /></g>
        <g className="sales-map-pulses"><path d="M -170 10 L -50 -50" stroke="#ec1e63" strokeWidth="2" fill="none" /><path d="M -50 -50 L 45 -38" stroke="#ec1e63" strokeWidth="2" fill="none" /><path d="M 45 -38 L 155 -8" stroke="#ec1e63" strokeWidth="2" fill="none" /><path d="M 45 -38 L 160 80" stroke="#ec1e63" strokeWidth="2" fill="none" /></g>

        {/* Lead Catcher: Clean Cyber Funnel */}
        <path
          className="sales-funnel-fill"
          d="M -160 -85 C -110 -65, -60 -25, -36 10 L 36 10 C 60 -25, 110 -65, 160 -85 Z"
          fill="url(#cleanFunnelFill)"
        />

        <g className="sales-funnel-rails">
          <path className="sales-funnel-rail" d="M -160 -85 C -110 -65, -60 -25, -36 10" stroke="url(#cleanRailGrad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path className="sales-funnel-rail" d="M 160 -85 C 110 -65, 60 -25, 36 10" stroke="url(#cleanRailGrad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>

        {/* Catchment Gate Light & Ripple */}
        <ellipse className="sales-gate-glow" cx="0" cy="10" rx="42" ry="16" fill="url(#gateGlow)" />
        <line className="sales-gate-line" x1="-36" y1="10" x2="36" y2="10" stroke="rgba(236,30,99,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <circle className="sales-funnel-wave" cx="0" cy="10" r="0" stroke="#37d9a0" strokeWidth="1.8" fill="none" />

        {/* Follow-up Tracker Elements */}
        <g className="sales-tracker-rings"><circle className="sales-tracker-ring sales-tracker-ring-1" cx="0" cy="0" r="0" stroke="rgba(236,30,99,0.3)" strokeWidth="1.2" fill="none" /><circle className="sales-tracker-ring sales-tracker-ring-2" cx="0" cy="0" r="0" stroke="rgba(236,30,99,0.25)" strokeWidth="1.2" fill="none" /><circle className="sales-tracker-ring sales-tracker-ring-3" cx="0" cy="0" r="0" stroke="rgba(236,30,99,0.35)" strokeWidth="1.4" fill="none" strokeDasharray="6 3" /></g>
        <g className="sales-tracker-crosshair"><line x1="-140" y1="0" x2="140" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1" /><line x1="0" y1="-140" x2="0" y2="140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" /></g>
        <g className="sales-tracker-lines" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1"><path d="M 0 0 L -110 -45" /><path d="M 0 0 L -30 -85" /><path d="M 0 0 L 74 -74" /><path d="M 0 0 L 110 30" /><path d="M 0 0 L -20 82" /></g>
        <g className="sales-tracker-sweep"><path d="M 0 0 L 140 0 A 140 140 0 0 0 120 -70 Z" fill="rgba(236,30,99,0.16)" /><line x1="0" y1="0" x2="140" y2="0" stroke="#ff5b93" strokeWidth="2" strokeLinecap="round" /></g>
        <circle className="sales-tracker-ping" cx="0" cy="0" r="0" stroke="#37d9a0" strokeWidth="2" fill="none" />
        <circle className="sales-won-burst" cx="0" cy="0" r="0" stroke="#ff5b93" strokeWidth="2" fill="none" />
      </svg>

      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        <div className="sales-core absolute top-0 left-0 w-32 h-32 flex items-center justify-center z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
          <div className="core-tracker absolute inset-0 flex items-center justify-center"><div className="w-12 h-12 flex items-center justify-center bg-[#160d15]/90 backdrop-blur-xl border border-[#ec1e63]/45 rounded-full shadow-[0_0_22px_rgba(236,30,99,0.25)]"><CalendarDays size={20} className="text-[#ff5b93]" strokeWidth={1.5} /></div></div>
          <div className="core-won absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff4d86]/25 to-[#b3134c]/10 border border-[#ff5b93]/70 flex items-center justify-center shadow-[0_0_30px_rgba(236,30,99,0.38)] backdrop-blur-md"><CheckCircle2 size={27} className="text-[#ff8fb5]" strokeWidth={1.5} /></div></div>
          <div className="core-flownex absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-2 rounded-[2rem] bg-gradient-to-br from-[#ff4d86] to-[#b3134c] shadow-[0_10px_40px_rgba(236,30,99,0.4)] flex items-center justify-center overflow-hidden">
              <div className="absolute w-14 h-14 border-2 border-white/60 rounded-full" />
              <UsersRound size={28} className="logo-boxes absolute text-white" strokeWidth={1.5} />
              <svg className="logo-fn absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28">
                <path d="M511.92 245.05C511.92 252.34 511.92 259.63 511.92 266.92C510.09 270.05 510.58 275.64 509.92 279.28C508.99 284.45 507.42 289.74 505.82 294.75C499.49 314.56 487.17 332.59 471.82 346.73C422.68 391.99 348.47 387.38 301.89 341.25C296.18 335.59 290.54 329.86 284.83 324.2C282.53 321.91 278.83 319.34 277.63 316.32C290.53 303.41 303.42 290.5 316.32 277.59C319.68 278.93 322.6 283.19 325.16 285.74C330.86 291.41 336.5 297.15 342.22 302.8C358.88 319.23 384.25 326.49 406.98 319.73C432.64 312.1 451.42 290.06 454.79 263.45C459.26 228.09 431.39 192.55 395.51 190.08C366.85 188.1 351.63 199.56 332.63 218.79C323.73 227.8 314.76 236.75 305.76 245.66C283.44 267.75 261.44 290.18 239.11 312.27C223.41 327.79 208.64 345.48 190.27 357.89C173.64 369.12 154.33 375.59 134.43 377.9C124.24 379.09 113.68 378.08 103.57 376.99C93.19 375.88 83.06 372.15 73.52 368.17C59.5 362.32 47.11 353.38 36.13 342.85C21.69 329.01 10.73 310.51 5.13 291.52C3.43 285.75 2.36 279.88 1.17 273.99C0.69 271.63 1.28 269.15 0.08 266.99C0.08 259.65 0.08 252.31 0.08 244.97C1.84 241.74 1.45 236.34 2.06 232.67C2.92 227.48 4.61 222.24 6.14 217.22C12.2 197.36 24.96 179.35 40.16 165.25C88.54 120.36 162.89 124.62 209.21 169.78C215.28 175.7 221.24 181.73 227.21 187.76C229.48 190.06 233.23 192.65 234.37 195.68C221.48 208.57 208.58 221.45 195.68 234.34C192.34 233.07 189.41 228.74 186.86 226.24C180.82 220.29 174.97 214.13 168.87 208.24C152.09 192.06 127.46 186.2 105 192.23C97.89 194.14 91.25 197.67 85.13 201.77C42.8 230.17 50.03 295.34 95.57 316.12C102.32 319.2 110.08 321.71 117.62 321.96C128.5 322.33 139.26 321.18 149.23 316.81C162.17 311.15 171.35 301.13 181.22 291.32C189.27 283.33 197.27 275.29 205.28 267.26C229.74 242.76 254.42 218.49 278.73 193.85C293.94 178.43 308.85 161.24 327.78 150.34C361.93 130.69 404.86 128.14 440.79 144.82C453.87 150.89 465.57 159.01 475.92 169.13C489.37 182.27 500.27 199.38 505.84 217.23C507.41 222.25 509.04 227.51 509.93 232.69C510.56 236.31 510.1 241.94 511.92 245.05Z" fill="#FFFFFF" fillRule="evenodd" stroke="#FFFFFF" strokeWidth="0.25" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
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
