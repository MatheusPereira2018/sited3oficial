import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Hero animation — "Do caos à clareza".
 * Pontos dispersos convergem, se conectam, formam uma linha ascendente.
 * Atmosférico, sem UI literal. Inspirado em Verum / Linear / Vercel.
 */

// Deterministic pseudo-random scatter (no hydration mismatch)
const SEED_POINTS = [
  { x: 8, y: 72 }, { x: 14, y: 28 }, { x: 19, y: 88 }, { x: 24, y: 44 },
  { x: 31, y: 18 }, { x: 36, y: 64 }, { x: 42, y: 92 }, { x: 47, y: 36 },
  { x: 53, y: 78 }, { x: 58, y: 22 }, { x: 64, y: 58 }, { x: 70, y: 84 },
  { x: 76, y: 32 }, { x: 82, y: 68 }, { x: 88, y: 14 }, { x: 93, y: 50 },
];

// The "clarity" line — gentle ascending curve through 8 anchor points
const LINE_POINTS = [
  { x: 8, y: 72 },
  { x: 19, y: 66 },
  { x: 31, y: 58 },
  { x: 42, y: 52 },
  { x: 53, y: 42 },
  { x: 64, y: 34 },
  { x: 76, y: 24 },
  { x: 93, y: 14 },
];

const CYCLE_MS = 7000;

export const HeroAnimation = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const linePath = LINE_POINTS.map(
    (p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`
  ).join(" ");

  return (
    <div className="relative w-full aspect-[5/4] max-w-[680px] mx-auto lg:mx-0">
      {/* Ambient glow */}
      <div
        className="absolute -inset-24 blur-3xl opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(9,116,214,0.35) 0%, transparent 55%), radial-gradient(circle at 75% 70%, rgba(56,189,248,0.18) 0%, transparent 50%)",
        }}
      />

      {/* Vignette frame */}
      <div
        className="relative w-full h-full rounded-[28px] overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #1A1547 0%, #16113A 55%, #0F0B2C 100%)",
          boxShadow:
            "0 30px 80px -20px rgba(9,116,214,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Subtle grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Main scene */}
        <svg
          key={tick}
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#0974D6" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#38BDF8" stopOpacity="1" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="dotGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Phase 1: scattered chaotic dots — drift in, jitter, then fade */}
          {SEED_POINTS.map((p, i) => {
            const targetIndex = Math.min(
              LINE_POINTS.length - 1,
              Math.round((i / (SEED_POINTS.length - 1)) * (LINE_POINTS.length - 1))
            );
            const target = LINE_POINTS[targetIndex];
            const delay = 0.05 * i;
            const isAnchor = i % 2 === 0 && targetIndex < LINE_POINTS.length;

            return (
              <motion.circle
                key={i}
                r="0.7"
                fill="white"
                fillOpacity="0.55"
                initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                animate={{
                  cx: [p.x, p.x, target.x],
                  cy: [p.y, p.y, target.y],
                  opacity: [0, 0.7, isAnchor ? 1 : 0],
                  r: [0.7, 0.7, isAnchor ? 1.1 : 0.4],
                }}
                transition={{
                  duration: 4.2,
                  times: [0, 0.45, 1],
                  delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          })}

          {/* Faint chaotic connectors during phase 1 */}
          {SEED_POINTS.slice(0, -1).map((p, i) => {
            const next = SEED_POINTS[i + 1];
            return (
              <motion.line
                key={`c-${i}`}
                x1={p.x}
                y1={p.y}
                x2={next.x}
                y2={next.y}
                stroke="white"
                strokeOpacity="0.15"
                strokeWidth="0.15"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 3,
                  times: [0, 0.5, 1],
                  delay: 0.4 + i * 0.04,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Phase 2: the clarity line draws through anchor points */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#softGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1] }}
            transition={{
              duration: 2.2,
              delay: 3.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Phase 3: single bright endpoint — "the decision" */}
          <motion.circle
            cx={LINE_POINTS[LINE_POINTS.length - 1].x}
            cy={LINE_POINTS[LINE_POINTS.length - 1].y}
            r="1.6"
            fill="#7DD3FC"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [0, 1.4, 1],
            }}
            transition={{
              duration: 1.2,
              delay: 5.2,
              times: [0, 0.6, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          />
          {/* Endpoint pulse rings */}
          {[0, 1].map((i) => (
            <motion.circle
              key={`ring-${i}`}
              cx={LINE_POINTS[LINE_POINTS.length - 1].x}
              cy={LINE_POINTS[LINE_POINTS.length - 1].y}
              r="1.6"
              fill="none"
              stroke="#7DD3FC"
              strokeWidth="0.25"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.6, 0], scale: [1, 4.5, 5] }}
              transition={{
                duration: 2.4,
                delay: 5.6 + i * 0.7,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            />
          ))}
        </svg>

        {/* Caption — minimal, bottom-left */}
        <div className="absolute left-6 bottom-5 right-6 flex items-center justify-between text-[10.5px] tracking-[0.2em] uppercase">
          <span className="text-white/35">Dados dispersos</span>
          <motion.div
            className="flex-1 mx-4 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(125,211,252,0.4), rgba(255,255,255,0.1))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1, delay: 4 }}
          />
          <span className="text-[#7DD3FC]/90 font-medium">Decisão clara</span>
        </div>
      </div>
    </div>
  );
};
