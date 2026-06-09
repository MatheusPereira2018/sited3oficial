import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";

/**
 * Minimal 3-act hero animation — Stripe/Linear restraint.
 *  Act 0 — "Antes": wireframe genérico de dashboard corporativo
 *  Act 1 — "Método": chips do processo + linha de DAX como detalhe
 *  Act 2 — "Depois": painel moderno limpo se montando
 */

const ACTS = [3.0, 3.8, 5.2];

export const HeroAnimation = () => {
  const [act, setAct] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (let i = 0; i < ACTS.length; i++) {
        if (cancelled) return;
        setAct(i);
        await new Promise((r) => setTimeout(r, ACTS[i] * 1000));
      }
      if (!cancelled) setCycle((c) => c + 1);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [cycle]);

  return (
    <div className="relative w-full aspect-[4/3] max-w-[680px] mx-auto lg:mx-0">
      {/* Ambient glow */}
      <div
        className="absolute -inset-16 blur-3xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(9,116,214,0.35) 0%, transparent 55%)",
        }}
      />

      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(9,116,214,0.35)]"
        style={{
          background: "linear-gradient(180deg, #1A1547 0%, #16113A 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Subtle window chrome */}
        <div className="flex items-center gap-1.5 px-4 h-7 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-white/15" />
          <div className="w-2 h-2 rounded-full bg-white/15" />
          <div className="w-2 h-2 rounded-full bg-white/15" />
        </div>

        <div className="relative w-full h-[calc(100%-1.75rem)]">
          <AnimatePresence mode="wait">
            {act === 0 && <Before key={`before-${cycle}`} />}
            {act === 1 && <Method key={`method-${cycle}`} />}
            {act === 2 && <After key={`after-${cycle}`} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Caption that morphs between acts */}
      <div className="absolute -bottom-10 left-0 right-0 text-center h-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={act}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs text-muted-foreground tracking-wide"
          >
            {act === 0 && "Dashboards genéricos. Dados sem contexto."}
            {act === 1 && "Discovery, requisitos e DAX de alta performance."}
            {act === 2 && "Painéis que guiam decisão."}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ---------- Act 0: "Antes" — wireframe esquemático cinza ---------- */
const Before = () => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(6px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="absolute inset-0 p-5"
  >
    {/* Header bar */}
    <div className="flex items-center justify-between mb-4">
      <div className="h-2 w-32 rounded-sm bg-white/15" />
      <div className="h-2 w-12 rounded-sm bg-white/10" />
    </div>

    {/* 3 blocky widgets — deliberately bland */}
    <div className="grid grid-cols-3 gap-3 mb-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-14 rounded-md bg-white/[0.04] border border-white/[0.06] p-2 flex flex-col justify-between"
        >
          <div className="h-1.5 w-10 rounded-sm bg-white/15" />
          <div className="h-3 w-16 rounded-sm bg-white/25" />
        </div>
      ))}
    </div>

    {/* Big "table" — just rows of lines */}
    <div className="rounded-md bg-white/[0.03] border border-white/[0.06] p-3">
      <div className="h-1.5 w-20 rounded-sm bg-white/15 mb-2.5" />
      <div className="space-y-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-2">
            <div className="h-1.5 flex-1 rounded-sm bg-white/10" />
            <div className="h-1.5 w-12 rounded-sm bg-white/15" />
            <div className="h-1.5 w-10 rounded-sm bg-white/10" />
            <div className="h-1.5 w-8 rounded-sm bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ---------- Act 1: "Método" — chips + linha de DAX ---------- */
const chips = [
  { label: "Levantamento de requisitos", delay: 0.15 },
  { label: "Entrevistas com usuários", delay: 0.4 },
  { label: "Discovery da solução", delay: 0.65 },
  { label: "Arquitetura de dados", delay: 0.9 },
];

const Method = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, filter: "blur(8px)" }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 flex flex-col items-center justify-center px-8 gap-3"
  >
    {/* Chips stack — centered, generous spacing */}
    <div className="flex flex-col items-center gap-2.5 mb-2">
      {chips.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: c.delay,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1 h-1 rounded-full bg-[#38BDF8]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
            <span className="text-[11.5px] font-medium text-white/90 tracking-tight">
              {c.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>

    {/* DAX detail — small, monospace, almost a whisper */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="mt-2 px-4 py-2.5 rounded-lg bg-black/30 border border-white/[0.06] font-mono text-[10.5px] leading-relaxed"
    >
      <div className="text-white/30 mb-0.5">— measures.dax</div>
      <div>
        <span className="text-[#7DD3FC]">Receita YoY</span>
        <span className="text-white/50"> := </span>
        <span className="text-[#FBBF24]">DIVIDE</span>
        <span className="text-white/70">(</span>
      </div>
      <div className="pl-4 text-white/70">[Atual] - [Anterior],</div>
      <div className="pl-4 text-white/70">
        [Anterior]<span className="text-white/50">)</span>
      </div>
    </motion.div>
  </motion.div>
);

/* ---------- Act 2: "Depois" — painel moderno mínimo ---------- */
const After = () => {
  const piece = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 p-5"
    >
      {/* Title */}
      <motion.div {...piece(0)} className="flex items-end justify-between mb-4">
        <div>
          <div className="text-[10px] text-white/40 tracking-wider uppercase">
            Performance comercial
          </div>
          <div className="text-[14px] text-white font-semibold tracking-tight mt-0.5">
            Visão executiva · 2025
          </div>
        </div>
        <div className="text-[10px] text-white/40">YTD</div>
      </motion.div>

      {/* 2 KPIs — generous */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Receita", value: "R$ 24,8M", delta: "+18,4%" },
          { label: "Ticket médio", value: "R$ 4.120", delta: "+6,2%" },
        ].map((k, i) => (
          <motion.div
            {...piece(0.15 + i * 0.1)}
            key={k.label}
            className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-3"
          >
            <div className="text-[10px] text-white/40 tracking-wider uppercase">
              {k.label}
            </div>
            <div className="text-[20px] font-semibold text-white tracking-tight mt-1">
              {k.value}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
              <TrendingUp className="w-3 h-3" />
              {k.delta}
              <span className="text-white/30 ml-0.5">vs 2024</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        {...piece(0.4)}
        className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-3 h-[calc(100%-9.5rem)]"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] text-white/40 tracking-wider uppercase">
            Receita mensal vs ano anterior
          </div>
          <ArrowUpRight className="w-3 h-3 text-[#38BDF8]" />
        </div>
        <div className="h-[calc(100%-1.25rem)]">
          <AreaChart />
        </div>
      </motion.div>
    </motion.div>
  );
};

const AreaChart = () => {
  const current = [22, 28, 26, 38, 36, 50, 56, 54, 66, 72, 80, 90];
  const prev = [18, 22, 26, 30, 28, 34, 38, 42, 48, 52, 58, 62];
  const w = 100;
  const h = 100;
  const toPath = (arr: number[]) =>
    arr
      .map((v, i) => {
        const x = (i / (arr.length - 1)) * w;
        const y = h - (v / 100) * h;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  const toArea = (arr: number[]) => `${toPath(arr)} L${w},${h} L0,${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2={w}
          y2={y}
          stroke="white"
          strokeOpacity="0.04"
          strokeWidth="0.3"
        />
      ))}
      <motion.path
        d={toPath(prev)}
        fill="none"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="0.5"
        strokeDasharray="1.2 1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.55, duration: 1.1, ease: "easeOut" }}
      />
      <motion.path
        d={toArea(current)}
        fill="url(#areaGrad2)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      />
      <motion.path
        d={toPath(current)}
        fill="none"
        stroke="#38BDF8"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.65, duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
};
