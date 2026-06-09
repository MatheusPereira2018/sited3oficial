import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp, ArrowUpRight, Sparkles } from "lucide-react";

/**
 * Hero animation — Linear/Vercel/Resend style.
 * One beautiful dashboard, always present. Method shows up as floating
 * annotations around it, one at a time.
 */

const methodTags = [
  { label: "Discovery", x: "-8%", y: "12%", side: "left" as const },
  { label: "Requisitos", x: "92%", y: "22%", side: "right" as const },
  { label: "Entrevistas", x: "-6%", y: "58%", side: "left" as const },
  { label: "Arquitetura", x: "94%", y: "68%", side: "right" as const },
  { label: "DAX otimizado", x: "-4%", y: "82%", side: "left" as const },
];

export const HeroAnimation = () => {
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTagIndex((i) => (i + 1) % methodTags.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const currentTag = methodTags[tagIndex];

  return (
    <div className="relative w-full aspect-[4/3] max-w-[680px] mx-auto lg:mx-0">
      {/* Ambient glow */}
      <div
        className="absolute -inset-20 blur-3xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(9,116,214,0.4) 0%, transparent 55%), radial-gradient(circle at 75% 75%, rgba(56,189,248,0.18) 0%, transparent 50%)",
        }}
      />

      {/* Floating method tag */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTag.label}
          initial={{ opacity: 0, scale: 0.9, x: currentTag.side === "left" ? -10 : 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-20"
          style={{
            left: currentTag.x,
            top: currentTag.y,
            transform: currentTag.side === "right" ? "translateX(-100%)" : undefined,
          }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_24px_-8px_rgba(9,116,214,0.4)]">
            <Sparkles className="w-3 h-3 text-[#38BDF8]" />
            <span className="text-[11.5px] font-medium text-foreground tracking-tight whitespace-nowrap">
              {currentTag.label}
            </span>
          </div>
          <motion.div
            className="absolute top-1/2 w-1.5 h-1.5 rounded-full bg-[#38BDF8]"
            style={{
              [currentTag.side === "left" ? "right" : "left"]: -10,
              transform: "translateY(-50%)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.4, 1] }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
        </motion.div>
      </AnimatePresence>

      <Dashboard />
    </div>
  );
};

const Dashboard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(9,116,214,0.4)]"
    style={{
      background: "linear-gradient(180deg, #1A1547 0%, #16113A 100%)",
      fontFamily: "Inter, sans-serif",
    }}
  >
    <div className="flex items-center gap-1.5 px-4 h-7 border-b border-white/5">
      <div className="w-2 h-2 rounded-full bg-white/15" />
      <div className="w-2 h-2 rounded-full bg-white/15" />
      <div className="w-2 h-2 rounded-full bg-white/15" />
    </div>

    <div className="p-5 h-[calc(100%-1.75rem)]">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-end justify-between mb-4"
      >
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

      <div className="grid grid-cols-2 gap-3 mb-4">
        <KpiCard label="Receita" prefix="R$ " suffix="M" to={24.8} decimals={1} delta="+18,4%" delay={0.45} />
        <KpiCard label="Ticket médio" prefix="R$ " to={4120} decimals={0} delta="+6,2%" delay={0.6} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
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
    </div>
  </motion.div>
);

const KpiCard = ({
  label,
  prefix = "",
  suffix = "",
  to,
  decimals,
  delta,
  delay,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  to: number;
  decimals: number;
  delta: string;
  delay: number;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    const n = decimals > 0 ? v.toFixed(decimals).replace(".", ",") : Math.round(v).toLocaleString("pt-BR");
    return `${prefix}${n}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 1.6,
      delay: delay + 0.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [count, to, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-3"
    >
      <div className="text-[10px] text-white/40 tracking-wider uppercase">{label}</div>
      <motion.div className="text-[20px] font-semibold text-white tracking-tight mt-1 tabular-nums">
        {rounded}
      </motion.div>
      <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
        <TrendingUp className="w-3 h-3" />
        {delta}
        <span className="text-white/30 ml-0.5">vs 2024</span>
      </div>
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
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2={w} y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="0.3" />
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
        transition={{ delay: 0.95, duration: 1.1, ease: "easeOut" }}
      />
      <motion.path
        d={toArea(current)}
        fill="url(#areaGrad3)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
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
        transition={{ delay: 1.05, duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
};
