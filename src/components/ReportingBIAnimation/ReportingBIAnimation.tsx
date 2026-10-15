import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BarChart3 } from 'lucide-react';
import '../DigitalEcosystemAnimation/ecosystem.css';

type Props = { autoplay?: boolean; loop?: boolean; reducedMotion?: boolean };

// Minimal, Clean Data Table Graphic (NO ICONS, ZERO CLUTTER)
const CleanTable = ({ className }: { className: string }) => (
  <g className={className} opacity="0">
    <rect
      x="-45"
      y="-22"
      width="90"
      height="44"
      rx="7"
      fill="rgba(20, 11, 18, 0.92)"
      stroke="rgba(236, 30, 99, 0.32)"
      strokeWidth="1.2"
    />
    {/* Table Header: subtle accent pill & single status dot */}
    <rect x="-35" y="-14" width="34" height="5" rx="2.5" fill="#ff5b93" opacity="0.85" />
    <circle cx="33" cy="-11.5" r="2.5" fill="#37d9a0" />

    {/* Table Rows: 2 clean, spacious horizontal stripes */}
    <path d="M -35 -1 H 16" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="2" strokeLinecap="round" />
    <path d="M -35 8 H 6" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="2" strokeLinecap="round" />
  </g>
);

// Clean Dual Line Charts Graphic (NO NOISY GRID, NO SCATTERED DOTS)
const CleanDualLineCharts = ({
  className,
  width = 200,
  height = 90,
}: {
  className: string;
  width?: number;
  height?: number;
}) => {
  const hw = width / 2;
  const hh = height / 2;
  return (
    <g className={className}>
      {/* Soft Reference Base & Faint Guide */}
      <line x1={-hw} y1={hh} x2={hw} y2={hh} stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
      <line x1={-hw} y1={0} x2={hw} y2={0} stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" strokeWidth="1" />
      <line x1={-hw} y1={-hh * 0.5} x2={hw} y2={-hh * 0.5} stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="4 4" strokeWidth="1" />

      {/* Primary Trend Line: Pink Glow */}
      <path
        className="chart-line-pink"
        d={`M ${-hw} ${hh * 0.65} C ${-hw * 0.6} ${hh * 0.2}, ${-hw * 0.35} ${hh * 0.45}, ${-hw * 0.1} ${-hh * 0.1} C ${hw * 0.15} ${-hh * 0.6}, ${hw * 0.45} ${-hh * 0.25}, ${hw * 0.75} ${-hh * 0.65} L ${hw} ${-hh * 0.8}`}
        fill="none"
        stroke="#ff5b93"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Secondary Trend Line: Purple */}
      <path
        className="chart-line-purple"
        d={`M ${-hw} ${hh * 0.8} C ${-hw * 0.65} ${hh * 0.6}, ${-hw * 0.35} ${hh * 0.7}, ${-hw * 0.05} ${hh * 0.35} C ${hw * 0.2} ${hh * 0.1}, ${hw * 0.55} ${hh * 0.35}, ${hw * 0.8} ${-hh * 0.1} L ${hw} ${-hh * 0.3}`}
        fill="none"
        stroke="#9a6bff"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.85"
      />
    </g>
  );
};

// Clean Donut Chart Graphic (NO CLUTTER, NO INNER DASHES)
const CleanDonutChart = ({
  className,
  radius = 42,
  strokeWidth = 11,
}: {
  className: string;
  radius?: number;
  strokeWidth?: number;
}) => {
  const c = 2 * Math.PI * radius;
  return (
    <g className={className}>
      {/* Background Track */}
      <circle cx="0" cy="0" r={radius} fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth={strokeWidth} />
      {/* Segment 1: Deep FlowNex Pink (50%) */}
      <circle
        className="donut-seg-1"
        cx="0"
        cy="0"
        r={radius}
        fill="none"
        stroke="#ec1e63"
        strokeWidth={strokeWidth}
        strokeDasharray={`${c * 0.5} ${c * 0.5}`}
        strokeDashoffset="0"
        transform="rotate(-90)"
      />
      {/* Segment 2: Bright Rose (30%) */}
      <circle
        className="donut-seg-2"
        cx="0"
        cy="0"
        r={radius}
        fill="none"
        stroke="#ff5b93"
        strokeWidth={strokeWidth}
        strokeDasharray={`${c * 0.3} ${c * 0.7}`}
        strokeDashoffset={-c * 0.5}
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
        strokeDashoffset={-c * 0.8}
        transform="rotate(-90)"
      />
      {/* Center Hole: clean and dark */}
      <circle cx="0" cy="0" r={radius - strokeWidth / 2 - 3} fill="#140b12" />
      <circle cx="0" cy="0" r={2.5} fill="#ff5b93" opacity="0.8" />
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

      // Reset utility
      const setInitialStates = (targetTime?: number) => {
        const at = targetTime !== undefined ? targetTime : 0;
        tl.set(q('.bi-scene-1, .bi-scene-2, .bi-scene-3'), { opacity: 0 }, at);
        tl.set(q('.bi-s1-card, .bi-s2-screen, .bi-s3-dash-card'), {
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          opacity: 0,
          filter: 'none',
        }, at);
        tl.set(q('.chart-line-pink, .chart-line-purple'), {
          strokeDasharray: 450,
          strokeDashoffset: 450,
        }, at);
        tl.set(q('.donut-seg-1, .donut-seg-2, .donut-seg-3'), {
          opacity: 0,
          scale: 0.85,
          transformOrigin: 'center',
        }, at);
        tl.set(q('.bi-s2-tunnel, .bi-s2-tunnel-ring'), { opacity: 0 }, at);
        tl.set(q('.bi-s2-tunnel-rail'), { strokeDasharray: 350, strokeDashoffset: 350 }, at);
        tl.set(q('.bi-s2-table-1, .bi-s2-table-2, .bi-s2-table-3'), {
          opacity: 0,
          scale: 0.9,
          filter: 'none',
        }, at);
        tl.set(q('.bi-s2-dash-group'), { opacity: 0, scale: 0.88, transformOrigin: 'center' }, at);
        tl.set(q('.bi-s3-table-1, .bi-s3-table-2, .bi-s3-table-3'), {
          opacity: 0,
          scale: 0.9,
          filter: 'none',
        }, at);
        tl.set(q('.bi-s3-string'), { strokeDasharray: 350, strokeDashoffset: 350, opacity: 0 }, at);
        tl.set(q('.bi-s3-glow-left, .bi-s3-glow-right'), {
          strokeDasharray: '32 300',
          strokeDashoffset: 0,
          opacity: 0,
        }, at);
        tl.set(q('.bi-core'), { opacity: 0, scale: 0.5 }, at);
        tl.set(q('.bi-core-wave'), { attr: { r: 0 }, opacity: 0 }, at);
      };

      setInitialStates();

      if (isReduced) {
        tl.set(q('.bi-scene-3'), { opacity: 1 });
        tl.set(q('.bi-s3-dash-card'), { strokeDashoffset: 0, opacity: 0.5 });
        tl.set(q('.bi-s3-table-1, .bi-s3-table-2, .bi-s3-table-3'), { opacity: 1, scale: 1 });
        tl.set(q('.bi-s3-string'), { strokeDashoffset: 0, opacity: 0.35 });
        tl.set(q('.bi-core'), { opacity: 1, scale: 1 });
        tl.set(q('.chart-line-pink, .chart-line-purple'), { strokeDashoffset: 0 });
        tl.set(q('.donut-seg-1, .donut-seg-2, .donut-seg-3'), { opacity: 1, scale: 1 });
      } else {
        // =====================================================================
        // SCENE 01: CLEAN DASHBOARD & DONUT CHART SIDE BY SIDE (NO ICONS)
        // =====================================================================
        tl.to(q('.bi-scene-1'), { opacity: 1, duration: 0.4 }, 0);
        tl.to(
          q('.bi-s1-card'),
          { strokeDashoffset: 0, opacity: 0.5, duration: 1.0, ease: 'power2.inOut' },
          0.1
        );

        // Draw Line Charts smoothly
        tl.to(
          q('.bi-s1-charts .chart-line-pink'),
          { strokeDashoffset: 0, duration: 1.25, ease: 'power2.inOut' },
          0.5
        );
        tl.to(
          q('.bi-s1-charts .chart-line-purple'),
          { strokeDashoffset: 0, duration: 1.25, ease: 'power2.inOut' },
          0.65
        );

        // Form Donut Chart Segments cleanly
        tl.to(
          q('.bi-s1-donut .donut-seg-1, .bi-s1-donut .donut-seg-2, .bi-s1-donut .donut-seg-3'),
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.3)' },
          0.75
        );

        // Subtle elegant glow on pink line
        tl.to(
          q('.bi-s1-charts .chart-line-pink'),
          { filter: 'drop-shadow(0 0 6px rgba(255,91,147,0.6))', duration: 0.8, yoyo: true, repeat: 1 },
          2.3
        );

        // Scene 1 Exit: clean fade out
        tl.to(
          q('.bi-s1-card, .bi-s1-charts, .bi-s1-donut'),
          { opacity: 0, scale: 0.94, duration: 0.5, ease: 'power2.in' },
          4.5
        );
        tl.to(q('.bi-scene-1'), { opacity: 0, duration: 0.35 }, 4.9);

        // =====================================================================
        // SCENE 02: 3 TABLES PASS THROUGH TUNNEL -> DASHBOARD (NO ICONS)
        // =====================================================================
        const t2 = 5.1;
        tl.to(q('.bi-scene-2'), { opacity: 1, duration: 0.4 }, t2);
        tl.to(
          q('.bi-s2-screen'),
          { strokeDashoffset: 0, opacity: 0.45, duration: 0.9, ease: 'power2.inOut' },
          t2 + 0.1
        );

        // Reveal Clean Cyber Tunnel
        tl.to(q('.bi-s2-tunnel'), { opacity: 1, duration: 0.35 }, t2 + 0.25);
        tl.to(
          q('.bi-s2-tunnel-rail'),
          { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' },
          t2 + 0.3
        );
        tl.to(
          q('.bi-s2-tunnel-ring'),
          { opacity: 0.5, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          t2 + 0.4
        );

        // 3 Tables enter on the left
        tl.set(q('.bi-s2-table-1'), { x: -175, y: -56, opacity: 1, scale: 1 }, t2 + 0.3);
        tl.set(q('.bi-s2-table-2'), { x: -175, y: 0, opacity: 1, scale: 1 }, t2 + 0.45);
        tl.set(q('.bi-s2-table-3'), { x: -175, y: 56, opacity: 1, scale: 1 }, t2 + 0.6);

        // Glide smoothly through the tunnel
        tl.to(
          q('.bi-s2-table-1'),
          { x: 10, y: -6, scale: 0.75, duration: 1.2, ease: 'power2.inOut' },
          t2 + 1.0
        );
        tl.to(
          q('.bi-s2-table-2'),
          { x: 10, y: 0, scale: 0.75, duration: 1.2, ease: 'power2.inOut' },
          t2 + 1.15
        );
        tl.to(
          q('.bi-s2-table-3'),
          { x: 10, y: 6, scale: 0.75, duration: 1.2, ease: 'power2.inOut' },
          t2 + 1.3
        );

        // Dissolve tables at tunnel exit
        tl.to(
          q('.bi-s2-table-1, .bi-s2-table-2, .bi-s2-table-3'),
          { opacity: 0, scale: 0.5, duration: 0.35, stagger: 0.06, ease: 'power2.in' },
          t2 + 2.35
        );

        // Tunnel pulse
        tl.to(
          q('.bi-s2-tunnel-ring'),
          { stroke: '#37d9a0', opacity: 0.9, duration: 0.25, yoyo: true, repeat: 1 },
          t2 + 2.45
        );

        // Emerges into Dashboard: 2 Line Charts and Donut Chart (NO ICONS)
        tl.to(
          q('.bi-s2-dash-group'),
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.25)' },
          t2 + 2.7
        );
        tl.to(
          q('.bi-s2-dash-group .chart-line-pink'),
          { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' },
          t2 + 2.8
        );
        tl.to(
          q('.bi-s2-dash-group .chart-line-purple'),
          { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' },
          t2 + 2.95
        );
        tl.to(
          q('.bi-s2-dash-group .donut-seg-1, .bi-s2-dash-group .donut-seg-2, .bi-s2-dash-group .donut-seg-3'),
          { opacity: 1, scale: 1, duration: 0.75, stagger: 0.08, ease: 'back.out(1.25)' },
          t2 + 3.05
        );

        // Scene 2 Exit
        tl.to(
          q('.bi-s2-screen, .bi-s2-tunnel, .bi-s2-dash-group'),
          { opacity: 0, scale: 0.94, duration: 0.5, ease: 'power2.in' },
          11.2
        );
        tl.to(q('.bi-scene-2'), { opacity: 0, duration: 0.35 }, 11.6);

        // =====================================================================
        // SCENE 03: CLEAN COMMAND CENTER (TABLES -> GLITCH BLOCK -> DASHBOARD)
        // =====================================================================
        const t3 = 11.8;
        tl.to(q('.bi-scene-3'), { opacity: 1, duration: 0.4 }, t3);

        // Reveal Left Tables with generous spacing
        tl.set(q('.bi-s3-table-1'), { x: -185, y: -58, opacity: 1, scale: 1 }, t3 + 0.1);
        tl.set(q('.bi-s3-table-2'), { x: -185, y: 0, opacity: 1, scale: 1 }, t3 + 0.22);
        tl.set(q('.bi-s3-table-3'), { x: -185, y: 58, opacity: 1, scale: 1 }, t3 + 0.34);

        // Reveal FlowNex Glitch Block in Middle
        tl.to(
          q('.bi-core'),
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.3)' },
          t3 + 0.3
        );

        // Reveal Right Dashboard Shell
        tl.to(
          q('.bi-s3-dash-card'),
          { strokeDashoffset: 0, opacity: 0.45, duration: 0.8, ease: 'power2.inOut' },
          t3 + 0.35
        );

        // Reveal Thin Elegant Connection Strings
        tl.to(
          q('.bi-s3-string'),
          { strokeDashoffset: 0, opacity: 0.3, duration: 0.7, stagger: 0.06, ease: 'power2.out' },
          t3 + 0.45
        );

        // Glow of Pink Lights passes through Strings from Tables to FlowNex Block
        tl.set(q('.bi-s3-glow-left'), { strokeDashoffset: 0, opacity: 1 }, t3 + 1.1);
        tl.to(
          q('.bi-s3-glow-left'),
          { strokeDashoffset: -240, duration: 1.3, stagger: 0.08, ease: 'power1.inOut' },
          t3 + 1.1
        );

        // Subtle soft highlight on tables
        tl.to(
          q('.bi-s3-table-1, .bi-s3-table-2, .bi-s3-table-3'),
          { filter: 'drop-shadow(0 0 8px rgba(255,91,147,0.5))', duration: 0.35, yoyo: true, repeat: 1 },
          t3 + 1.2
        );

        // Energy reaches FlowNex Block: Clean Circular Shockwave Burst & Scale Pulse
        tl.set(q('.bi-core-wave'), { attr: { r: 0 }, opacity: 0.9 }, t3 + 2.4);
        tl.to(
          q('.bi-core-wave'),
          { attr: { r: 70 }, opacity: 0, duration: 0.75, ease: 'power2.out' },
          t3 + 2.4
        );
        tl.to(
          q('.bi-core'),
          { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' },
          t3 + 2.4
        );

        // Glow of Pink Lights travels from FlowNex Block to Dashboard
        tl.set(q('.bi-s3-glow-right'), { strokeDashoffset: 0, opacity: 1 }, t3 + 2.65);
        tl.to(
          q('.bi-s3-glow-right'),
          { strokeDashoffset: -240, duration: 1.25, stagger: 0.07, ease: 'power1.inOut' },
          t3 + 2.65
        );

        // Glow reaches Dashboard: Charts illuminate with clarity!
        tl.to(
          q('.bi-s3-dash-card'),
          { stroke: '#ff5b93', opacity: 0.7, duration: 0.35 },
          t3 + 3.8
        );
        tl.to(
          q('.bi-s3-charts .chart-line-pink'),
          { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' },
          t3 + 3.85
        );
        tl.to(
          q('.bi-s3-charts .chart-line-purple'),
          { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' },
          t3 + 4.0
        );
        tl.to(
          q('.bi-s3-donut .donut-seg-1, .bi-s3-donut .donut-seg-2, .bi-s3-donut .donut-seg-3'),
          { opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.25)' },
          t3 + 4.05
        );

        // Final hold and clean loop reset
        const reset = 20.0;
        tl.to(q('.bi-scene-3, .bi-core'), { opacity: 0, duration: 0.45 }, reset - 0.45);
        setInitialStates(reset);
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
          <linearGradient id="cleanTunnelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec1e63" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#ff5b93" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ec1e63" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* ================================================================= */}
        {/* SCENE 01: DASHBOARD & DONUT CHART SIDE BY SIDE (CLEAN, NO ICONS)  */}
        {/* ================================================================= */}
        <g className="bi-scene-1">
          {/* Dashboard Card (Left) */}
          <rect
            className="bi-s1-card"
            x="-235"
            y="-80"
            width="250"
            height="160"
            rx="16"
            fill="rgba(20, 11, 18, 0.88)"
            stroke="rgba(236, 30, 99, 0.35)"
            strokeWidth="1.2"
          />
          {/* Minimal Accent Header Line */}
          <path d="M -215 -58 H -165" stroke="#ff5b93" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="-215" y1="-50" x2="-5" y2="-50" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

          {/* 2 Line Charts */}
          <g className="bi-s1-charts" transform="translate(-110 16)">
            <CleanDualLineCharts className="bi-s1-line-charts-svg" width={200} height={80} />
          </g>

          {/* Donut Chart Card (Right) */}
          <rect
            className="bi-s1-card"
            x="40"
            y="-80"
            width="195"
            height="160"
            rx="16"
            fill="rgba(20, 11, 18, 0.88)"
            stroke="rgba(236, 30, 99, 0.35)"
            strokeWidth="1.2"
          />
          {/* Minimal Accent Header Line */}
          <path d="M 60 -58 H 105" stroke="#ff5b93" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="60" y1="-50" x2="215" y2="-50" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

          {/* Donut Chart */}
          <g className="bi-s1-donut" transform="translate(138 12)">
            <CleanDonutChart className="bi-s1-donut-svg" radius={40} strokeWidth={11} />
          </g>
        </g>

        {/* ================================================================= */}
        {/* SCENE 02: 3 TABLES PASS THROUGH TUNNEL -> DASHBOARD (CLEAN)       */}
        {/* ================================================================= */}
        <g className="bi-scene-2">
          {/* Terminal Screen Frame */}
          <rect
            className="bi-s2-screen"
            x="-260"
            y="-110"
            width="520"
            height="220"
            rx="16"
            fill="rgba(20, 11, 18, 0.9)"
            stroke="rgba(236, 30, 99, 0.35)"
            strokeWidth="1.2"
          />
          {/* Subtle Window Header */}
          <line x1="-240" y1="-85" x2="240" y2="-85" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          <circle cx="-240" cy="-95" r="2.5" fill="#ff5b93" opacity="0.8" />
          <path d="M -225 -95 H -170" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.8" strokeLinecap="round" />

          {/* Cyber Tunnel */}
          <g className="bi-s2-tunnel">
            <path
              d="M -85 -65 C -40 -65, -15 -28, 10 -28 C 35 -28, 60 -65, 95 -65 L 95 65 C 60 65, 35 28, 10 28 C -15 28, -40 65, -85 65 Z"
              fill="url(#cleanTunnelGrad)"
            />
            {/* Guide Rails */}
            <path
              className="bi-s2-tunnel-rail"
              d="M -95 -65 C -45 -65, -15 -28, 10 -28 C 35 -28, 65 -65, 105 -65"
              fill="none"
              stroke="#ff5b93"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              className="bi-s2-tunnel-rail"
              d="M -95 65 C -45 65, -15 28, 10 28 C 35 28, 65 65, 105 65"
              fill="none"
              stroke="#ff5b93"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* 3 Clean Portal Rings */}
            <ellipse className="bi-s2-tunnel-ring" cx="-70" cy="0" rx="14" ry="54" fill="none" stroke="rgba(236, 30, 99, 0.4)" strokeWidth="1.2" />
            <ellipse className="bi-s2-tunnel-ring" cx="10" cy="0" rx="10" ry="28" fill="none" stroke="#37d9a0" strokeWidth="1.5" />
            <ellipse className="bi-s2-tunnel-ring" cx="80" cy="0" rx="14" ry="54" fill="none" stroke="rgba(236, 30, 99, 0.4)" strokeWidth="1.2" />
          </g>

          {/* 3 Clean Tables */}
          <CleanTable className="bi-s2-table-1" />
          <CleanTable className="bi-s2-table-2" />
          <CleanTable className="bi-s2-table-3" />

          {/* Resulting Dashboard on Screen (2 Line Charts + Donut Chart) */}
          <g className="bi-s2-dash-group" transform="translate(0 6)">
            {/* Left Half: 2 Line Charts */}
            <g transform="translate(-105 6)">
              <CleanDualLineCharts className="bi-s2-line-charts-svg" width={200} height={85} />
            </g>
            {/* Subtle Divider */}
            <line x1="30" y1="-50" x2="30" y2="50" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
            {/* Right Half: Donut Chart */}
            <g transform="translate(140 0)">
              <CleanDonutChart className="bi-s2-donut-svg" radius={36} strokeWidth={10} />
            </g>
          </g>
        </g>

        {/* ================================================================= */}
        {/* SCENE 03: CLEAN COMMAND CENTER (TABLES -> GLITCH BLOCK -> DASH)   */}
        {/* ================================================================= */}
        <g className="bi-scene-3">
          {/* Subtle Connection Strings */}
          <g fill="none" stroke="rgba(236, 30, 99, 0.2)" strokeWidth="1.2">
            {/* Left Strings: Tables -> Center */}
            <path className="bi-s3-string" d="M -140 -58 C -85 -58, -60 -18, -42 -4" />
            <path className="bi-s3-string" d="M -140 0 C -95 0, -70 0, -42 0" />
            <path className="bi-s3-string" d="M -140 58 C -85 58, -60 18, -42 4" />

            {/* Right Strings: Center -> Dashboard */}
            <path className="bi-s3-string" d="M 42 -4 C 60 -18, 75 -40, 85 -40" />
            <path className="bi-s3-string" d="M 42 0 C 60 0, 75 0, 85 0" />
            <path className="bi-s3-string" d="M 42 4 C 60 18, 75 40, 85 40" />
          </g>

          {/* Glow of Pink Lights (Tables -> FlowNex Block) */}
          <g fill="none" stroke="#ff5b93" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="32 300">
            <path className="bi-s3-glow-left" d="M -140 -58 C -85 -58, -60 -18, -42 -4" />
            <path className="bi-s3-glow-left" d="M -140 0 C -95 0, -70 0, -42 0" />
            <path className="bi-s3-glow-left" d="M -140 58 C -85 58, -60 18, -42 4" />
          </g>

          {/* Glow of Pink Lights (FlowNex Block -> Dashboard) */}
          <g fill="none" stroke="#ff5b93" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="32 300">
            <path className="bi-s3-glow-right" d="M 42 -4 C 60 -18, 75 -40, 85 -40" />
            <path className="bi-s3-glow-right" d="M 42 0 C 60 0, 75 0, 85 0" />
            <path className="bi-s3-glow-right" d="M 42 4 C 60 18, 75 40, 85 40" />
          </g>

          {/* Multiple Tables on Left */}
          <CleanTable className="bi-s3-table-1" />
          <CleanTable className="bi-s3-table-2" />
          <CleanTable className="bi-s3-table-3" />

          {/* Right Side: Command Center Dashboard with 2 Line Charts and Donut Chart */}
          <g className="bi-s3-dash" transform="translate(185 0)">
            <rect
              className="bi-s3-dash-card"
              x="-98"
              y="-82"
              width="196"
              height="164"
              rx="16"
              fill="rgba(20, 11, 18, 0.88)"
              stroke="rgba(236, 30, 99, 0.35)"
              strokeWidth="1.2"
            />
            {/* Clean Header Bar */}
            <path d="M -80 -62 H -35" stroke="#ff5b93" strokeWidth="2" strokeLinecap="round" />
            <line x1="-80" y1="-54" x2="80" y2="-54" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

            {/* 2 Line Charts (Upper Section) */}
            <g className="bi-s3-charts" transform="translate(0 -16)">
              <CleanDualLineCharts className="bi-s3-line-charts-svg" width={155} height={55} />
            </g>

            {/* Donut Chart (Lower Section) */}
            <g className="bi-s3-donut" transform="translate(0 42)">
              <CleanDonutChart className="bi-s3-donut-svg" radius={24} strokeWidth={7} />
            </g>
          </g>

          {/* Clean Core Shockwave Wave */}
          <circle className="bi-core-wave" cx="0" cy="0" r="0" stroke="#ff5b93" strokeWidth="2" fill="none" />
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
