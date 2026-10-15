import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BarChart3 } from 'lucide-react';
import '../DigitalEcosystemAnimation/ecosystem.css';

type Props = { autoplay?: boolean; loop?: boolean; reducedMotion?: boolean };

// Sleek Cyber Data Table Graphic (NO ICONS)
const TableShape = ({ id, className }: { id?: string; className: string }) => (
  <g id={id} className={className} opacity="0">
    <rect
      x="-48"
      y="-24"
      width="96"
      height="48"
      rx="8"
      fill="rgba(23, 13, 21, 0.94)"
      stroke="rgba(236, 30, 99, 0.38)"
      strokeWidth="1.2"
    />
    {/* Table Header Row */}
    <rect x="-42" y="-18" width="84" height="10" rx="3" fill="rgba(236, 30, 99, 0.16)" />
    <path d="M -36 -13 H -10" stroke="#ff5b93" strokeWidth="2" strokeLinecap="round" />
    <path d="M 0 -13 H 18" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="34" cy="-13" r="2.8" fill="#37d9a0" />

    {/* Table Data Rows */}
    <path d="M -36 -2 H -5" stroke="rgba(255, 255, 255, 0.28)" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M 6 -2 H 24" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="34" cy="-2" r="2" fill="rgba(255, 255, 255, 0.35)" />

    <path d="M -36 7 H -12" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M 2 7 H 28" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="34" cy="7" r="2" fill="rgba(236, 30, 99, 0.6)" />

    <path d="M -36 16 H 4" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M 14 16 H 26" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.2" strokeLinecap="round" />
  </g>
);

// 2 Line Charts Graphic (NO ICONS)
const DualLineCharts = ({
  className,
  width = 240,
  height = 110,
}: {
  className: string;
  width?: number;
  height?: number;
}) => {
  const hw = width / 2;
  const hh = height / 2;
  return (
    <g className={className}>
      {/* Background Grid Lines */}
      <g stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1">
        <line x1={-hw} y1={-hh * 0.5} x2={hw} y2={-hh * 0.5} strokeDasharray="3 4" />
        <line x1={-hw} y1={0} x2={hw} y2={0} strokeDasharray="3 4" />
        <line x1={-hw} y1={hh * 0.5} x2={hw} y2={hh * 0.5} strokeDasharray="3 4" />
        <line x1={-hw * 0.5} y1={-hh} x2={-hw * 0.5} y2={hh} strokeDasharray="3 4" />
        <line x1={0} y1={-hh} x2={0} y2={hh} strokeDasharray="3 4" />
        <line x1={hw * 0.5} y1={-hh} x2={hw * 0.5} y2={hh} strokeDasharray="3 4" />
      </g>

      {/* Axis Base */}
      <line x1={-hw} y1={hh} x2={hw} y2={hh} stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1.2" />

      {/* Line Chart 1: Primary Trending Pink */}
      <path
        className="chart-line-pink"
        d={`M ${-hw} ${hh * 0.7} C ${-hw * 0.65} ${hh * 0.3}, ${-hw * 0.45} ${hh * 0.5}, ${-hw * 0.2} ${-hh * 0.15} C ${0} ${-hh * 0.65}, ${hw * 0.25} ${-hh * 0.15}, ${hw * 0.5} ${-hh * 0.45} C ${hw * 0.75} ${-hh * 0.75}, ${hw * 0.9} ${-hh * 0.6}, ${hw} ${-hh * 0.85}`}
        fill="none"
        stroke="#ff5b93"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Line Chart 2: Complementary Purple */}
      <path
        className="chart-line-purple"
        d={`M ${-hw} ${hh * 0.85} C ${-hw * 0.7} ${hh * 0.7}, ${-hw * 0.4} ${hh * 0.75}, ${-hw * 0.15} ${hh * 0.4} C ${hw * 0.1} ${hh * 0.05}, ${hw * 0.35} ${hh * 0.45}, ${hw * 0.6} ${hh * 0.1} C ${hw * 0.8} ${-hh * 0.2}, ${hw * 0.92} ${-hh * 0.05}, ${hw} ${-hh * 0.35}`}
        fill="none"
        stroke="#9a6bff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Peak Data Accent Points */}
      <circle cx={-hw * 0.2} cy={-hh * 0.15} r="3" fill="#ff5b93" className="chart-dot" />
      <circle cx={0} cy={-hh * 0.65} r="3.5" fill="#37d9a0" className="chart-dot" />
      <circle cx={hw * 0.5} cy={-hh * 0.45} r="3" fill="#ff5b93" className="chart-dot" />
      <circle cx={hw} cy={-hh * 0.85} r="3.5" fill="#ffd24a" className="chart-dot" />
    </g>
  );
};

// Sleek Donut Chart Graphic (NO ICONS)
const DonutChart = ({
  className,
  radius = 44,
  strokeWidth = 13,
}: {
  className: string;
  radius?: number;
  strokeWidth?: number;
}) => {
  const c = 2 * Math.PI * radius; // approx circumference
  return (
    <g className={className}>
      {/* Background Track */}
      <circle cx="0" cy="0" r={radius} fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth={strokeWidth} />
      {/* Segment 1: Deep Pink (40%) */}
      <circle
        className="donut-seg-1"
        cx="0"
        cy="0"
        r={radius}
        fill="none"
        stroke="#ec1e63"
        strokeWidth={strokeWidth}
        strokeDasharray={`${c * 0.38} ${c * 0.62}`}
        strokeDashoffset="0"
        transform="rotate(-90)"
      />
      {/* Segment 2: Bright Rose (26%) */}
      <circle
        className="donut-seg-2"
        cx="0"
        cy="0"
        r={radius}
        fill="none"
        stroke="#ff5b93"
        strokeWidth={strokeWidth}
        strokeDasharray={`${c * 0.26} ${c * 0.74}`}
        strokeDashoffset={-c * 0.38}
        transform="rotate(-90)"
      />
      {/* Segment 3: Vibrant Purple (20%) */}
      <circle
        className="donut-seg-3"
        cx="0"
        cy="0"
        r={radius}
        fill="none"
        stroke="#9a6bff"
        strokeWidth={strokeWidth}
        strokeDasharray={`${c * 0.2} ${c * 0.8}`}
        strokeDashoffset={-c * 0.64}
        transform="rotate(-90)"
      />
      {/* Segment 4: Mint Highlight (14%) */}
      <circle
        className="donut-seg-4"
        cx="0"
        cy="0"
        r={radius}
        fill="none"
        stroke="#37d9a0"
        strokeWidth={strokeWidth}
        strokeDasharray={`${c * 0.14} ${c * 0.86}`}
        strokeDashoffset={-c * 0.84}
        transform="rotate(-90)"
      />
      {/* Inner Cutout Hole */}
      <circle cx="0" cy="0" r={radius - strokeWidth / 2 - 4} fill="#140b12" />
      {/* Central Cyber Ring */}
      <circle cx="0" cy="0" r={radius - strokeWidth / 2 - 10} fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="0" cy="0" r="3" fill="#ff5b93" />
    </g>
  );
};

export const ReportingBIAnimation = ({
  autoplay = true,
  loop = true,
  reducedMotion = false,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const isReduced = reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);
      const tl = gsap.timeline({
        paused: !autoplay,
        repeat: loop && !isReduced ? -1 : 0,
      });

      // === INITIAL STATES ===
      tl.set(q('.bi-scene-1, .bi-scene-2, .bi-scene-3'), { opacity: 0 });
      tl.set(q('.bi-s1-shell, .bi-s2-screen, .bi-s3-dash-shell'), {
        strokeDasharray: 1200,
        strokeDashoffset: 1200,
        opacity: 0,
      });
      tl.set(q('.chart-line-pink, .chart-line-purple'), {
        strokeDasharray: 500,
        strokeDashoffset: 500,
      });
      tl.set(q('.chart-dot'), { scale: 0, opacity: 0, transformOrigin: 'center' });
      tl.set(q('.donut-seg-1, .donut-seg-2, .donut-seg-3, .donut-seg-4'), {
        opacity: 0,
        scale: 0.8,
        transformOrigin: 'center',
      });
      tl.set(q('.bi-s2-tunnel, .bi-s2-tunnel-rib'), { opacity: 0 });
      tl.set(q('.bi-s2-tunnel-rail'), { strokeDasharray: 400, strokeDashoffset: 400 });
      tl.set(q('.bi-s2-table-1, .bi-s2-table-2, .bi-s2-table-3'), {
        opacity: 0,
        scale: 0.9,
      });
      tl.set(q('.bi-s2-dash-group'), { opacity: 0, scale: 0.85, transformOrigin: 'center' });
      tl.set(q('.bi-s3-table-1, .bi-s3-table-2, .bi-s3-table-3'), {
        opacity: 0,
        scale: 0.85,
      });
      tl.set(q('.bi-s3-string'), { strokeDasharray: 400, strokeDashoffset: 400, opacity: 0 });
      tl.set(q('.bi-s3-glow-left, .bi-s3-glow-right'), {
        strokeDasharray: '28 320',
        strokeDashoffset: 0,
        opacity: 0,
      });
      tl.set(q('.bi-core'), { opacity: 0, scale: 0.5 });
      tl.set(q('.bi-core-wave'), { attr: { r: 0 }, opacity: 0 });

      if (isReduced) {
        // Reduced motion: show clean static Command Center
        tl.set(q('.bi-scene-3'), { opacity: 1 });
        tl.set(q('.bi-s3-dash-shell'), { strokeDashoffset: 0, opacity: 0.5 });
        tl.set(q('.bi-s3-table-1, .bi-s3-table-2, .bi-s3-table-3'), { opacity: 1, scale: 1 });
        tl.set(q('.bi-s3-string'), { strokeDashoffset: 0, opacity: 0.35 });
        tl.set(q('.bi-core'), { opacity: 1, scale: 1 });
        tl.set(q('.chart-line-pink, .chart-line-purple'), { strokeDashoffset: 0 });
        tl.set(q('.donut-seg-1, .donut-seg-2, .donut-seg-3, .donut-seg-4'), { opacity: 1, scale: 1 });
      } else {
        // =====================================================================
        // SCENE 01: DASHBOARD & DONUT CHART SIDE BY SIDE (NO ICONS) [0s - 5.5s]
        // =====================================================================
        tl.to(q('.bi-scene-1'), { opacity: 1, duration: 0.5 }, 0);
        tl.to(
          q('.bi-s1-shell'),
          { strokeDashoffset: 0, opacity: 0.55, duration: 1.1, ease: 'power2.inOut' },
          0.15
        );

        // Draw 2 Line Charts in Dashboard
        tl.to(
          q('.bi-s1-charts .chart-line-pink'),
          { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' },
          0.6
        );
        tl.to(
          q('.bi-s1-charts .chart-line-purple'),
          { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' },
          0.75
        );
        tl.to(
          q('.bi-s1-charts .chart-dot'),
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' },
          1.4
        );

        // Animate Donut Chart Segments
        tl.to(
          q('.bi-s1-donut .donut-seg-1, .bi-s1-donut .donut-seg-2, .bi-s1-donut .donut-seg-3, .bi-s1-donut .donut-seg-4'),
          { opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'back.out(1.4)' },
          0.85
        );

        // Subtle living pulse
        tl.to(
          q('.bi-s1-charts .chart-line-pink'),
          { filter: 'drop-shadow(0 0 8px rgba(255,91,147,0.7))', duration: 0.8, yoyo: true, repeat: 1 },
          2.6
        );

        // Scene 1 Exit
        tl.to(
          q('.bi-s1-shell, .bi-s1-charts, .bi-s1-donut'),
          { opacity: 0, scale: 0.92, duration: 0.6, ease: 'power2.in' },
          4.7
        );
        tl.to(q('.bi-scene-1'), { opacity: 0, duration: 0.4 }, 5.2);

        // =====================================================================
        // SCENE 02: 3 TABLES PASS THROUGH TUNNEL -> DASHBOARD (NO ICONS) [5.4s - 12.2s]
        // =====================================================================
        const t2 = 5.4;
        tl.to(q('.bi-scene-2'), { opacity: 1, duration: 0.4 }, t2);
        tl.to(
          q('.bi-s2-screen'),
          { strokeDashoffset: 0, opacity: 0.48, duration: 1.0, ease: 'power2.inOut' },
          t2 + 0.1
        );

        // Reveal Cyber Tunnel
        tl.to(q('.bi-s2-tunnel'), { opacity: 1, duration: 0.4 }, t2 + 0.3);
        tl.to(
          q('.bi-s2-tunnel-rail'),
          { strokeDashoffset: 0, duration: 0.85, stagger: 0.1, ease: 'power2.out' },
          t2 + 0.35
        );
        tl.to(
          q('.bi-s2-tunnel-rib'),
          { opacity: 0.6, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
          t2 + 0.45
        );

        // Reveal 3 Tables on Left of Screen
        tl.set(q('.bi-s2-table-1'), { x: -185, y: -64, opacity: 1, scale: 1 }, t2 + 0.35);
        tl.set(q('.bi-s2-table-2'), { x: -185, y: 0, opacity: 1, scale: 1 }, t2 + 0.5);
        tl.set(q('.bi-s2-table-3'), { x: -185, y: 64, opacity: 1, scale: 1 }, t2 + 0.65);

        // Tables Pass Through the Tunnel
        tl.to(
          q('.bi-s2-table-1'),
          { x: 10, y: -8, scale: 0.72, duration: 1.25, ease: 'power2.inOut' },
          t2 + 1.05
        );
        tl.to(
          q('.bi-s2-table-2'),
          { x: 10, y: 0, scale: 0.72, duration: 1.25, ease: 'power2.inOut' },
          t2 + 1.2
        );
        tl.to(
          q('.bi-s2-table-3'),
          { x: 10, y: 8, scale: 0.72, duration: 1.25, ease: 'power2.inOut' },
          t2 + 1.35
        );

        // Transformation: Tables dissolve as they pass through tunnel throat
        tl.to(
          q('.bi-s2-table-1, .bi-s2-table-2, .bi-s2-table-3'),
          { opacity: 0, scale: 0.45, duration: 0.4, stagger: 0.08, ease: 'power2.in' },
          t2 + 2.5
        );

        // Tunnel pulse flash at transformation
        tl.to(
          q('.bi-s2-tunnel-rib'),
          { stroke: '#37d9a0', opacity: 1, duration: 0.25, yoyo: true, repeat: 1 },
          t2 + 2.6
        );

        // Morph / Resolve into Dashboard with 2 Line Charts + Donut Chart (NO ICONS)
        tl.to(
          q('.bi-s2-dash-group'),
          { opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.3)' },
          t2 + 2.85
        );
        tl.to(
          q('.bi-s2-dash-group .chart-line-pink'),
          { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' },
          t2 + 2.95
        );
        tl.to(
          q('.bi-s2-dash-group .chart-line-purple'),
          { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' },
          t2 + 3.1
        );
        tl.to(
          q('.bi-s2-dash-group .chart-dot'),
          { scale: 1, opacity: 1, duration: 0.35, stagger: 0.07, ease: 'back.out(2)' },
          t2 + 3.65
        );
        tl.to(
          q('.bi-s2-dash-group .donut-seg-1, .bi-s2-dash-group .donut-seg-2, .bi-s2-dash-group .donut-seg-3, .bi-s2-dash-group .donut-seg-4'),
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: 'back.out(1.3)' },
          t2 + 3.2
        );

        // Scene 2 Exit
        tl.to(
          q('.bi-s2-screen, .bi-s2-tunnel, .bi-s2-dash-group'),
          { opacity: 0, scale: 0.9, duration: 0.6, ease: 'power2.in' },
          11.6
        );
        tl.to(q('.bi-scene-2'), { opacity: 0, duration: 0.4 }, 12.0);

        // =====================================================================
        // SCENE 03: COMMAND CENTER (TABLES -> FLOWNEX CORE -> DASHBOARD) [12.2s - 21.5s]
        // =====================================================================
        const t3 = 12.2;
        tl.to(q('.bi-scene-3'), { opacity: 1, duration: 0.45 }, t3);

        // Reveal Left Tables
        tl.set(q('.bi-s3-table-1'), { x: -190, y: -64, opacity: 1, scale: 1 }, t3 + 0.15);
        tl.set(q('.bi-s3-table-2'), { x: -190, y: 0, opacity: 1, scale: 1 }, t3 + 0.3);
        tl.set(q('.bi-s3-table-3'), { x: -190, y: 64, opacity: 1, scale: 1 }, t3 + 0.45);

        // Reveal FlowNex Glitch Block in Middle
        tl.to(
          q('.bi-core'),
          { opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.35)' },
          t3 + 0.4
        );

        // Reveal Right Dashboard Shell
        tl.to(
          q('.bi-s3-dash-shell'),
          { strokeDashoffset: 0, opacity: 0.5, duration: 0.9, ease: 'power2.inOut' },
          t3 + 0.35
        );

        // Reveal Connection Strings
        tl.to(
          q('.bi-s3-string'),
          { strokeDashoffset: 0, opacity: 0.32, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
          t3 + 0.5
        );

        // Glow of Pink Lights passes through Left Strings from Tables to FlowNex Block
        tl.set(q('.bi-s3-glow-left'), { strokeDashoffset: 0, opacity: 1 }, t3 + 1.2);
        tl.to(
          q('.bi-s3-glow-left'),
          { strokeDashoffset: -260, duration: 1.4, stagger: 0.1, ease: 'power1.inOut' },
          t3 + 1.2
        );

        // Tables pulse as data is sent
        tl.to(
          q('.bi-s3-table-1, .bi-s3-table-2, .bi-s3-table-3'),
          { filter: 'drop-shadow(0 0 12px rgba(255,91,147,0.7))', duration: 0.4, yoyo: true, repeat: 1 },
          t3 + 1.3
        );

        // Energy reaches FlowNex Block: Core Shockwave Burst & Scale Pulse
        tl.set(q('.bi-core-wave'), { attr: { r: 0 }, opacity: 1 }, t3 + 2.6);
        tl.to(
          q('.bi-core-wave'),
          { attr: { r: 80 }, opacity: 0, duration: 0.85, ease: 'power2.out' },
          t3 + 2.6
        );
        tl.to(
          q('.bi-core'),
          { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' },
          t3 + 2.6
        );

        // Glow of Pink Lights travels from FlowNex Block to Dashboard
        tl.set(q('.bi-s3-glow-right'), { strokeDashoffset: 0, opacity: 1 }, t3 + 2.85);
        tl.to(
          q('.bi-s3-glow-right'),
          { strokeDashoffset: -260, duration: 1.35, stagger: 0.09, ease: 'power1.inOut' },
          t3 + 2.85
        );

        // Glow reaches Dashboard: Charts Ignite!
        tl.to(
          q('.bi-s3-dash-shell'),
          { filter: 'drop-shadow(0 0 16px rgba(255,91,147,0.5))', stroke: '#ff5b93', duration: 0.4 },
          t3 + 4.1
        );
        tl.to(
          q('.bi-s3-charts .chart-line-pink'),
          { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' },
          t3 + 4.15
        );
        tl.to(
          q('.bi-s3-charts .chart-line-purple'),
          { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' },
          t3 + 4.3
        );
        tl.to(
          q('.bi-s3-charts .chart-dot'),
          { scale: 1, opacity: 1, duration: 0.3, stagger: 0.06, ease: 'back.out(2)' },
          t3 + 4.8
        );
        tl.to(
          q('.bi-s3-donut .donut-seg-1, .bi-s3-donut .donut-seg-2, .bi-s3-donut .donut-seg-3, .bi-s3-donut .donut-seg-4'),
          { opacity: 1, scale: 1, duration: 0.75, stagger: 0.08, ease: 'back.out(1.3)' },
          t3 + 4.35
        );

        // Final hold & smooth reset before loop
        const reset = 21.0;
        tl.to(q('.bi-scene-3, .bi-core'), { opacity: 0, duration: 0.5 }, reset - 0.5);

        tl.set(q('.bi-scene-1, .bi-scene-2, .bi-scene-3'), { opacity: 0 }, reset);
        tl.set(q('.bi-s1-shell, .bi-s2-screen, .bi-s3-dash-shell'), { strokeDashoffset: 1200, opacity: 0, filter: 'none', stroke: 'rgba(236,30,99,0.36)' }, reset);
        tl.set(q('.chart-line-pink, .chart-line-purple'), { strokeDashoffset: 500 }, reset);
        tl.set(q('.chart-dot'), { scale: 0, opacity: 0 }, reset);
        tl.set(q('.donut-seg-1, .donut-seg-2, .donut-seg-3, .donut-seg-4'), { opacity: 0, scale: 0.8 }, reset);
        tl.set(q('.bi-s2-tunnel, .bi-s2-tunnel-rib'), { opacity: 0 }, reset);
        tl.set(q('.bi-s2-tunnel-rail'), { strokeDashoffset: 400 }, reset);
        tl.set(q('.bi-s2-table-1, .bi-s2-table-2, .bi-s2-table-3'), { opacity: 0, scale: 0.9 }, reset);
        tl.set(q('.bi-s2-dash-group'), { opacity: 0, scale: 0.85 }, reset);
        tl.set(q('.bi-s3-table-1, .bi-s3-table-2, .bi-s3-table-3'), { opacity: 0, scale: 0.85, filter: 'none' }, reset);
        tl.set(q('.bi-s3-string'), { strokeDashoffset: 400, opacity: 0 }, reset);
        tl.set(q('.bi-s3-glow-left, .bi-s3-glow-right'), { strokeDashoffset: 0, opacity: 0 }, reset);
        tl.set(q('.bi-core'), { opacity: 0, scale: 0.5 }, reset);
        tl.set(q('.bi-core-wave'), { attr: { r: 0 }, opacity: 0 }, reset);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [autoplay, loop, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl"
      style={{
        background:
          'radial-gradient(120% 120% at 50% 50%, #150b13, #0b0509 60%, #070307 100%)',
      }}
    >
      <div className="ambient-blob" />

      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[300px] overflow-visible pointer-events-none"
        viewBox="-310 -150 620 300"
      >
        <defs>
          <linearGradient id="biGlowBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec1e63" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff5b93" stopOpacity="1" />
            <stop offset="100%" stopColor="#9a6bff" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="tunnelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec1e63" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#ff5b93" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9a6bff" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* ================================================================= */}
        {/* SCENE 01: DASHBOARD & DONUT CHART SIDE BY SIDE (NO ICONS)         */}
        {/* ================================================================= */}
        <g className="bi-scene-1">
          {/* Dashboard Shell (Left Side) */}
          <rect
            className="bi-s1-shell"
            x="-250"
            y="-90"
            width="280"
            height="180"
            rx="16"
            fill="rgba(21, 12, 19, 0.9)"
            stroke="rgba(236, 30, 99, 0.38)"
            strokeWidth="1.4"
          />
          {/* Dashboard Header Bar */}
          <g fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1">
            <line x1="-230" y1="-62" x2="10" y2="-62" />
            <path d="M -230 -72 H -160" stroke="#ff5b93" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M -145 -72 H -95" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* 2 Line Charts inside Dashboard */}
          <g className="bi-s1-charts" transform="translate(-110 12)">
            <DualLineCharts className="bi-s1-line-charts-svg" width={220} height={95} />
          </g>

          {/* Donut Chart Shell (Right Side) */}
          <rect
            className="bi-s1-shell"
            x="50"
            y="-90"
            width="200"
            height="180"
            rx="16"
            fill="rgba(21, 12, 19, 0.9)"
            stroke="rgba(236, 30, 99, 0.38)"
            strokeWidth="1.4"
          />
          {/* Donut Header Bar */}
          <g fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1">
            <line x1="70" y1="-62" x2="230" y2="-62" />
            <path d="M 70 -72 H 140" stroke="#ff5b93" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Donut Chart */}
          <g className="bi-s1-donut" transform="translate(150 12)">
            <DonutChart className="bi-s1-donut-svg" radius={42} strokeWidth={12} />
          </g>
        </g>

        {/* ================================================================= */}
        {/* SCENE 02: 3 TABLES PASS THROUGH TUNNEL -> DASHBOARD (NO ICONS)    */}
        {/* ================================================================= */}
        <g className="bi-scene-2">
          {/* Main Terminal Screen Frame */}
          <rect
            className="bi-s2-screen"
            x="-275"
            y="-120"
            width="550"
            height="240"
            rx="18"
            fill="rgba(21, 12, 19, 0.92)"
            stroke="rgba(236, 30, 99, 0.4)"
            strokeWidth="1.4"
          />
          {/* Screen Header */}
          <g fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1">
            <line x1="-255" y1="-92" x2="255" y2="-92" />
            <circle cx="-250" cy="-103" r="3" fill="#ff5b93" />
            <circle cx="-240" cy="-103" r="3" fill="#ffd24a" />
            <circle cx="-230" cy="-103" r="3" fill="#37d9a0" />
            <path d="M -180 -103 H -100" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* High-Tech Cyber Tunnel */}
          <g className="bi-s2-tunnel">
            {/* Tunnel Ambient Glow Path */}
            <path
              d="M -90 -75 C -45 -75, -15 -35, 10 -35 C 35 -35, 65 -75, 110 -75 L 110 75 C 65 75, 35 35, 10 35 C -15 35, -45 75, -90 75 Z"
              fill="url(#tunnelGrad)"
            />
            {/* Guide Rails */}
            <path
              className="bi-s2-tunnel-rail"
              d="M -100 -75 C -50 -75, -20 -35, 10 -35 C 40 -35, 70 -75, 120 -75"
              fill="none"
              stroke="#ff5b93"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              className="bi-s2-tunnel-rail"
              d="M -100 75 C -50 75, -20 35, 10 35 C 40 35, 70 75, 120 75"
              fill="none"
              stroke="#ff5b93"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Concentric Tunnel Portals */}
            <ellipse className="bi-s2-tunnel-rib" cx="-85" cy="0" rx="16" ry="68" fill="none" stroke="rgba(236, 30, 99, 0.45)" strokeWidth="1.4" />
            <ellipse className="bi-s2-tunnel-rib" cx="-40" cy="0" rx="14" ry="48" fill="none" stroke="rgba(236, 30, 99, 0.55)" strokeWidth="1.4" />
            <ellipse className="bi-s2-tunnel-rib" cx="10" cy="0" rx="12" ry="34" fill="none" stroke="#37d9a0" strokeWidth="1.6" />
            <ellipse className="bi-s2-tunnel-rib" cx="60" cy="0" rx="14" ry="48" fill="none" stroke="rgba(236, 30, 99, 0.55)" strokeWidth="1.4" />
            <ellipse className="bi-s2-tunnel-rib" cx="105" cy="0" rx="16" ry="68" fill="none" stroke="rgba(236, 30, 99, 0.45)" strokeWidth="1.4" />
          </g>

          {/* 3 Tables Travelling Through Tunnel */}
          <TableShape id="s2-tab-1" className="bi-table bi-s2-table-1" />
          <TableShape id="s2-tab-2" className="bi-table bi-s2-table-2" />
          <TableShape id="s2-tab-3" className="bi-table bi-s2-table-3" />

          {/* Resulting Dashboard: 2 Line Charts and a Donut Chart (NO ICONS) */}
          <g className="bi-s2-dash-group" transform="translate(0 6)">
            {/* Dashboard Inner Shell */}
            <rect
              x="-245"
              y="-75"
              width="490"
              height="150"
              rx="12"
              fill="rgba(19, 10, 17, 0.85)"
              stroke="rgba(236, 30, 99, 0.35)"
              strokeWidth="1.2"
            />
            {/* Left Portion: 2 Line Charts */}
            <g transform="translate(-105 5)">
              <DualLineCharts className="bi-s2-line-charts-svg" width={220} height={90} />
            </g>
            {/* Divider */}
            <line x1="30" y1="-60" x2="30" y2="60" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
            {/* Right Portion: Donut Chart */}
            <g transform="translate(145 0)">
              <DonutChart className="bi-s2-donut-svg" radius={38} strokeWidth={11} />
            </g>
          </g>
        </g>

        {/* ================================================================= */}
        {/* SCENE 03: COMMAND CENTER (TABLES -> FLOWNEX CORE -> DASHBOARD)    */}
        {/* ================================================================= */}
        <g className="bi-scene-3">
          {/* Connection Strings Base Lines */}
          <g fill="none" stroke="rgba(236, 30, 99, 0.25)" strokeWidth="1.4">
            {/* Left Strings: Tables -> Center */}
            <path className="bi-s3-string" d="M -142 -64 C -85 -64, -60 -20, -42 -5" />
            <path className="bi-s3-string" d="M -142 0 C -95 0, -70 0, -42 0" />
            <path className="bi-s3-string" d="M -142 64 C -85 64, -60 20, -42 5" />

            {/* Right Strings: Center -> Dashboard */}
            <path className="bi-s3-string" d="M 42 -5 C 60 -20, 75 -45, 85 -45" />
            <path className="bi-s3-string" d="M 42 0 C 60 0, 75 0, 85 0" />
            <path className="bi-s3-string" d="M 42 5 C 60 20, 75 45, 85 45" />
          </g>

          {/* Glow of Pink Lights Overlay Paths (Tables -> FlowNex Block) */}
          <g fill="none" stroke="#ff5b93" strokeWidth="2.8" strokeLinecap="round" strokeDasharray="28 320">
            <path className="bi-s3-glow-left" d="M -142 -64 C -85 -64, -60 -20, -42 -5" />
            <path className="bi-s3-glow-left" d="M -142 0 C -95 0, -70 0, -42 0" />
            <path className="bi-s3-glow-left" d="M -142 64 C -85 64, -60 20, -42 5" />
          </g>

          {/* Glow of Pink Lights Overlay Paths (FlowNex Block -> Dashboard) */}
          <g fill="none" stroke="#ff5b93" strokeWidth="2.8" strokeLinecap="round" strokeDasharray="28 320">
            <path className="bi-s3-glow-right" d="M 42 -5 C 60 -20, 75 -45, 85 -45" />
            <path className="bi-s3-glow-right" d="M 42 0 C 60 0, 75 0, 85 0" />
            <path className="bi-s3-glow-right" d="M 42 5 C 60 20, 75 45, 85 45" />
          </g>

          {/* Multiple Tables on Left Side */}
          <TableShape className="bi-table bi-s3-table-1" />
          <TableShape className="bi-table bi-s3-table-2" />
          <TableShape className="bi-table bi-s3-table-3" />

          {/* Right Side: Command Center Dashboard with 2 Line Charts and Donut Chart */}
          <g className="bi-s3-dash" transform="translate(182 0)">
            <rect
              className="bi-s3-dash-shell"
              x="-97"
              y="-85"
              width="194"
              height="170"
              rx="16"
              fill="rgba(21, 12, 19, 0.9)"
              stroke="rgba(236, 30, 99, 0.36)"
              strokeWidth="1.4"
            />
            {/* Dashboard Header Bar */}
            <g fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1">
              <line x1="-80" y1="-60" x2="80" y2="-60" />
              <path d="M -80 -70 H -30" stroke="#ff5b93" strokeWidth="2.2" strokeLinecap="round" />
            </g>

            {/* 2 Line Charts (Top Half) */}
            <g className="bi-s3-charts" transform="translate(0 -16)">
              <DualLineCharts className="bi-s3-line-charts-svg" width={160} height={60} />
            </g>

            {/* Donut Chart (Bottom Half) */}
            <g className="bi-s3-donut" transform="translate(0 45)">
              <DonutChart className="bi-s3-donut-svg" radius={26} strokeWidth={8} />
            </g>
          </g>

          {/* Core Energy Shockwave Wave */}
          <circle className="bi-core-wave" cx="0" cy="0" r="0" stroke="#ff5b93" strokeWidth="2.5" fill="none" />
        </g>
      </svg>

      {/* =================================================================== */}
      {/* CENTRAL FLOWNEX GLITCH BLOCK (EXACT MATCH TO CARDS 2 & 3)           */}
      {/* =================================================================== */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        <div className="bi-core absolute top-0 left-0 w-32 h-32 flex items-center justify-center z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-2 rounded-[2rem] bg-gradient-to-br from-[#ff4d86] to-[#b3134c] shadow-[0_10px_40px_rgba(236,30,99,0.4)] flex items-center justify-center overflow-hidden">
            <div className="absolute w-14 h-14 border-2 border-white/60 rounded-full" />
            <BarChart3 size={28} className="logo-boxes absolute text-white" strokeWidth={1.5} />
            <svg
              className="logo-fn absolute"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="28"
              height="28"
            >
              <path
                d="M511.92 245.05C511.92 252.34 511.92 259.63 511.92 266.92C510.09 270.05 510.58 275.64 509.92 279.28C508.99 284.45 507.42 289.74 505.82 294.75C499.49 314.56 487.17 332.59 471.82 346.73C422.68 391.99 348.47 387.38 301.89 341.25C296.18 335.59 290.54 329.86 284.83 324.2C282.53 321.91 278.83 319.34 277.63 316.32C290.53 303.41 303.42 290.5 316.32 277.59C319.68 278.93 322.6 283.19 325.16 285.74C330.86 291.41 336.5 297.15 342.22 302.8C358.88 319.23 384.25 326.49 406.98 319.73C432.64 312.1 451.42 290.06 454.79 263.45C459.26 228.09 431.39 192.55 395.51 190.08C366.85 188.1 351.63 199.56 332.63 218.79C323.73 227.8 314.76 236.75 305.76 245.66C283.44 267.75 261.44 290.18 239.11 312.27C223.41 327.79 208.64 345.48 190.27 357.89C173.64 369.12 154.33 375.59 134.43 377.9C124.24 379.09 113.68 378.08 103.57 376.99C93.19 375.88 83.06 372.15 73.52 368.17C59.5 362.32 47.11 353.38 36.13 342.85C21.69 329.01 10.73 310.51 5.13 291.52C3.43 285.75 2.36 279.88 1.17 273.99C0.69 271.63 1.28 269.15 0.08 266.99C0.08 259.65 0.08 252.31 0.08 244.97C1.84 241.74 1.45 236.34 2.06 232.67C2.92 227.48 4.61 222.24 6.14 217.22C12.2 197.36 24.96 179.35 40.16 165.25C88.54 120.36 162.89 124.62 209.21 169.78C215.28 175.7 221.24 181.73 227.21 187.76C229.48 190.06 233.23 192.65 234.37 195.68C221.48 208.57 208.58 221.45 195.68 234.34C192.34 233.07 189.41 228.74 186.86 226.24C180.82 220.29 174.97 214.13 168.87 208.24C152.09 192.06 127.46 186.2 105 192.23C97.89 194.14 91.25 197.67 85.13 201.77C42.8 230.17 50.03 295.34 95.57 316.12C102.32 319.2 110.08 321.71 117.62 321.96C128.5 322.33 139.26 321.18 149.23 316.81C162.17 311.15 171.35 301.13 181.22 291.32C189.27 283.33 197.27 275.29 205.28 267.26C229.74 242.76 254.42 218.49 278.73 193.85C293.94 178.43 308.85 161.24 327.78 150.34C361.93 130.69 404.86 128.14 440.79 144.82C453.87 150.89 465.57 159.01 475.92 169.13C489.37 182.27 500.27 199.38 505.84 217.23C507.41 222.25 509.04 227.51 509.93 232.69C510.56 236.31 510.1 241.94 511.92 245.05Z"
                fill="#FFFFFF"
                fillRule="evenodd"
                stroke="#FFFFFF"
                strokeWidth="0.25"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
