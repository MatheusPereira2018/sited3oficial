import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

/**
 * 4-act hero animation telling the D3 Data story:
 *  Act 0 — Legacy corporate Power BI dashboard (ugly, table-heavy)
 *  Act 1 — Process chips float over it (Discovery, Requirements, Interviews, Architecture)
 *  Act 2 — DAX code layer with syntax highlight
 *  Act 3 — Modern dark dashboard assembles piece by piece
 *
 * Loops indefinitely. Pure CSS/SVG + Framer Motion. No external assets.
 */

const ACT_DURATIONS = [3.2, 3.8, 3.4, 5.6]; // seconds per act
const TOTAL = ACT_DURATIONS.reduce((a, b) => a + b, 0);

const processChips = [
  { label: "Levantamento de requisitos", x: "8%", y: "18%", delay: 0.1 },
  { label: "Entrevistas com usuários", x: "58%", y: "10%", delay: 0.5 },
  { label: "Discovery da solução", x: "12%", y: "62%", delay: 0.9 },
  { label: "Arquitetura de dados", x: "55%", y: "70%", delay: 1.3 },
];

const daxLines = [
  { t: "Receita YoY :=", cls: "text-[#7DD3FC]" },
  { t: "VAR _atual = [Receita]", cls: "text-[#E5E7EB]" },
  { t: "VAR _anterior =", cls: "text-[#E5E7EB]" },
  { t: "  CALCULATE([Receita],", cls: "text-[#E5E7EB]" },
  { t: "    SAMEPERIODLASTYEAR(", cls: "text-[#C4B5FD]" },
  { t: "      'Calendario'[Data]))", cls: "text-[#C4B5FD]" },
  { t: "RETURN", cls: "text-[#FBBF24]" },
  { t: "  DIVIDE(_atual - _anterior,", cls: "text-[#E5E7EB]" },
  { t: "    _anterior)", cls: "text-[#E5E7EB]" },
];

export const HeroAnimation = () => {
  const [act, setAct] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (let i = 0; i < ACT_DURATIONS.length; i++) {
        if (cancelled) return;
        setAct(i);
        await new Promise((r) => setTimeout(r, ACT_DURATIONS[i] * 1000));
      }
      if (!cancelled) setCycle((c) => c + 1);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [cycle]);

  return (
    <div className="relative w-full aspect-[4/3] max-w-[720px] mx-auto lg:mx-0">
      {/* Glow */}
      <div
        className="absolute -inset-10 rounded-[40px] blur-3xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #0974D6 0%, transparent 60%), radial-gradient(circle at 70% 70%, #16113A 0%, transparent 70%)",
        }}
      />

      {/* Frame */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        style={{
          background:
            "linear-gradient(180deg, #1a1547 0%, #16113A 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 h-8 bg-black/30 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          <div className="ml-3 text-[10px] text-white/40 font-mono tracking-tight">
            d3data.app — dashboard.pbix
          </div>
        </div>

        <div className="relative w-full h-[calc(100%-2rem)]">
          <AnimatePresence mode="wait">
            {act === 0 && <LegacyDashboard key={`legacy-${cycle}`} />}
            {act === 1 && <LegacyWithChips key={`chips-${cycle}`} />}
            {act === 2 && <DaxCode key={`dax-${cycle}`} />}
            {act === 3 && <ModernDashboard key={`modern-${cycle}`} />}
          </AnimatePresence>

          {/* Act indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
            {ACT_DURATIONS.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: act === i ? 24 : 6,
                  background:
                    act >= i ? "#0974D6" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- ACT 0: Legacy corporate dashboard ---------------- */
const LegacyDashboard = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 p-3 bg-[#F3F2F1]"
  >
    {/* Office-style header */}
    <div className="bg-[#0078D4] text-white text-[10px] px-2 py-1 font-semibold tracking-wide flex items-center justify-between">
      <span>Relatório Financeiro - 2024 Q3 (consolidado_final_v7.pbix)</span>
      <span className="text-white/70">Atualizado: 12/03</span>
    </div>
    <div className="grid grid-cols-3 gap-1.5 mt-1.5 h-[calc(100%-1.5rem)]">
      {/* Big ugly table */}
      <div className="col-span-2 bg-white border border-gray-300 p-1.5">
        <div className="text-[8px] font-bold text-gray-700 mb-1">
          DETALHAMENTO POR UNIDADE
        </div>
        <div className="grid grid-cols-6 gap-px text-[7px]">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className={`px-1 py-0.5 ${
                i < 6
                  ? "bg-[#0078D4] text-white font-bold"
                  : i % 2 === 0
                  ? "bg-gray-50 text-gray-700"
                  : "bg-white text-gray-700"
              }`}
            >
              {i < 6
                ? ["Cod", "Unid", "Rec", "Cst", "Mrg", "%"][i]
                : i % 6 === 0
                ? `00${i}`
                : `${(Math.random() * 999).toFixed(0)}`}
            </div>
          ))}
        </div>
      </div>
      {/* Default chart */}
      <div className="bg-white border border-gray-300 p-1.5 flex flex-col">
        <div className="text-[8px] font-bold text-gray-700 mb-1">
          GRÁFICO 1
        </div>
        <div className="flex-1 flex items-end gap-1 pb-2">
          {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-[#0078D4]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="text-[7px] text-gray-500 mt-1">
          Série1 | Série2 | Série3
        </div>
      </div>
    </div>
  </motion.div>
);

/* ---------------- ACT 1: Legacy + floating chips ---------------- */
const LegacyWithChips = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, filter: "blur(8px)" }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0"
  >
    <div className="absolute inset-0 opacity-40">
      <LegacyDashboard />
    </div>
    <div className="absolute inset-0 bg-[#16113A]/40 backdrop-blur-[2px]" />
    {processChips.map((chip, i) => (
      <motion.div
        key={chip.label}
        className="absolute"
        style={{ left: chip.x, top: chip.y }}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [20, 0, 0, -10],
          scale: [0.8, 1, 1, 0.95],
        }}
        transition={{
          duration: 2.6,
          delay: chip.delay,
          times: [0, 0.2, 0.75, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#0974D6]"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
            <span className="text-[11px] font-medium text-white whitespace-nowrap">
              {chip.label}
            </span>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

/* ---------------- ACT 2: DAX code ---------------- */
const DaxCode = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, filter: "blur(8px)" }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 p-4 flex flex-col font-mono"
    style={{ background: "linear-gradient(180deg, #0B0826 0%, #16113A 100%)" }}
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="text-[10px] text-white/40">measures.dax</div>
      <div className="flex-1 h-px bg-white/10" />
      <motion.div
        className="text-[10px] text-[#0974D6] flex items-center gap-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#0974D6]" />
        compilando
      </motion.div>
    </div>
    <div className="flex-1 text-[12px] leading-[1.55] space-y-0.5">
      {daxLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.18, duration: 0.35 }}
          className="flex gap-3"
        >
          <span className="text-white/20 select-none w-4 text-right">
            {i + 1}
          </span>
          <span className={line.cls}>{line.t}</span>
        </motion.div>
      ))}
      <motion.div
        className="inline-block w-2 h-4 bg-[#0974D6] ml-7 mt-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  </motion.div>
);

/* ---------------- ACT 3: Modern dashboard assembling ---------------- */
const ModernDashboard = () => {
  const piece = (delay: number) => ({
    initial: { opacity: 0, y: 12, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 p-3"
      style={{ background: "linear-gradient(180deg, #0F0B2E 0%, #16113A 100%)" }}
    >
      {/* Title row */}
      <motion.div {...piece(0)} className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[10px] text-white/40">Performance Comercial</div>
          <div className="text-[13px] text-white font-semibold tracking-tight">
            Visão Executiva · 2025
          </div>
        </div>
        <div className="flex gap-1">
          {["YTD", "QTD", "MTD"].map((t, i) => (
            <div
              key={t}
              className={`text-[9px] px-2 py-0.5 rounded-md ${
                i === 0
                  ? "bg-[#0974D6] text-white"
                  : "bg-white/5 text-white/50"
              }`}
            >
              {t}
            </div>
          ))}
        </div>
      </motion.div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {[
          { label: "Receita", value: "R$ 24,8M", delta: "+18,4%", up: true },
          { label: "Ticket Médio", value: "R$ 4.120", delta: "+6,2%", up: true },
          { label: "Churn", value: "2,1%", delta: "-0,8pp", up: false },
        ].map((k, i) => (
          <motion.div
            key={k.label}
            {...piece(0.15 + i * 0.1)}
            className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2 backdrop-blur-sm"
          >
            <div className="text-[8px] text-white/40 uppercase tracking-wider">
              {k.label}
            </div>
            <div className="text-[15px] font-semibold text-white mt-0.5 tracking-tight">
              {k.value}
            </div>
            <div
              className={`flex items-center gap-0.5 text-[9px] mt-0.5 ${
                k.up ? "text-emerald-400" : "text-emerald-400"
              }`}
            >
              {k.up ? (
                <TrendingUp className="w-2.5 h-2.5" />
              ) : (
                <TrendingDown className="w-2.5 h-2.5" />
              )}
              {k.delta} <span className="text-white/30 ml-0.5">vs 2024</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart + ranking */}
      <div className="grid grid-cols-3 gap-2 h-[calc(100%-7.5rem)]">
        <motion.div
          {...piece(0.55)}
          className="col-span-2 rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="text-[9px] text-white/50 uppercase tracking-wider">
              Receita mensal vs ano anterior
            </div>
            <ArrowUpRight className="w-3 h-3 text-[#0974D6]" />
          </div>
          <div className="flex-1 relative">
            <AreaChart />
          </div>
        </motion.div>

        <motion.div
          {...piece(0.7)}
          className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5"
        >
          <div className="text-[9px] text-white/50 uppercase tracking-wider mb-1.5">
            Top regiões
          </div>
          <div className="space-y-1.5">
            {[
              { l: "Sudeste", v: 92 },
              { l: "Sul", v: 74 },
              { l: "Nordeste", v: 58 },
              { l: "Centro-Oeste", v: 41 },
              { l: "Norte", v: 28 },
            ].map((r, i) => (
              <div key={r.l}>
                <div className="flex justify-between text-[8px] text-white/60 mb-0.5">
                  <span>{r.l}</span>
                  <span className="text-white/40">{r.v}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #0974D6 0%, #38BDF8 100%)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${r.v}%` }}
                    transition={{
                      delay: 0.95 + i * 0.08,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const AreaChart = () => {
  const current = [20, 28, 24, 38, 34, 48, 56, 52, 64, 70, 78, 88];
  const prev = [18, 22, 26, 30, 28, 34, 38, 42, 48, 52, 58, 62];
  const w = 100;
  const h = 100;
  const toPath = (arr: number[]) =>
    arr
      .map((v, i) => {
        const x = (i / (arr.length - 1)) * w;
        const y = h - (v / 100) * h;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  const toArea = (arr: number[]) =>
    `${toPath(arr)} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0974D6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0974D6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid */}
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2={w} y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="0.3" />
      ))}
      {/* prev year dashed */}
      <motion.path
        d={toPath(prev)}
        fill="none"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="0.6"
        strokeDasharray="1.5 1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.85, duration: 1.1, ease: "easeOut" }}
      />
      {/* current area */}
      <motion.path
        d={toArea(current)}
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      />
      <motion.path
        d={toPath(current)}
        fill="none"
        stroke="#38BDF8"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.95, duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
};
