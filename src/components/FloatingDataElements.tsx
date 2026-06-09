import { motion } from "framer-motion";
import { BarChart3, TrendingUp, PieChart, LineChart, Activity, Database, Percent, ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const floatingElements = [
  { Icon: BarChart3, x: "8%", y: "15%", delay: 0, duration: 4, size: 28 },
  { Icon: TrendingUp, x: "92%", y: "20%", delay: 0.5, duration: 5, size: 24 },
  { Icon: PieChart, x: "5%", y: "45%", delay: 1, duration: 4.5, size: 22 },
  { Icon: LineChart, x: "95%", y: "55%", delay: 1.5, duration: 5.5, size: 26 },
  { Icon: Activity, x: "12%", y: "75%", delay: 2, duration: 4, size: 20 },
  { Icon: Database, x: "88%", y: "80%", delay: 0.8, duration: 5, size: 22 },
  { Icon: Percent, x: "3%", y: "30%", delay: 1.2, duration: 4.8, size: 18 },
  { Icon: ArrowUpRight, x: "97%", y: "40%", delay: 0.3, duration: 4.2, size: 20 },
];

const dataPoints = [
  { x: "15%", y: "25%", delay: 0, size: 6 },
  { x: "85%", y: "30%", delay: 0.4, size: 4 },
  { x: "10%", y: "60%", delay: 0.8, size: 5 },
  { x: "90%", y: "65%", delay: 1.2, size: 4 },
  { x: "20%", y: "85%", delay: 1.6, size: 6 },
  { x: "80%", y: "15%", delay: 2, size: 5 },
  { x: "25%", y: "40%", delay: 0.6, size: 3 },
  { x: "75%", y: "50%", delay: 1.4, size: 4 },
  { x: "30%", y: "70%", delay: 1.8, size: 5 },
  { x: "70%", y: "75%", delay: 2.2, size: 3 },
];

const miniCharts = [
  { x: "6%", y: "55%", delay: 0.5 },
  { x: "94%", y: "35%", delay: 1.5 },
];

export const FloatingDataElements = () => {
  const isMobile = useIsMobile();
  
  // Hide floating elements on mobile for better performance and cleaner UI
  if (isMobile) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Icons */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={`icon-${index}`}
          className="absolute"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.15, 0.35, 0.15],
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <element.Icon 
            size={element.size} 
            className="text-primary/40 dark:text-primary/30" 
            strokeWidth={1.5}
          />
        </motion.div>
      ))}

      {/* Data Points */}
      {dataPoints.map((point, index) => (
        <motion.div
          key={`point-${index}`}
          className="absolute rounded-full bg-primary/30"
          style={{ 
            left: point.x, 
            top: point.y,
            width: point.size,
            height: point.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: point.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mini Bar Charts */}
      {miniCharts.map((chart, index) => (
        <motion.div
          key={`chart-${index}`}
          className="absolute flex items-end gap-1"
          style={{ left: chart.x, top: chart.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{
            duration: 4,
            delay: chart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[12, 20, 8, 16, 24].map((height, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-primary/30 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: [0, height, height * 0.7, height] }}
              transition={{
                duration: 3,
                delay: chart.delay + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Floating Numbers */}
      <motion.div
        className="absolute text-xs font-mono text-primary/25 font-medium"
        style={{ left: "7%", top: "35%" }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          delay: 0.7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        +127%
      </motion.div>

      <motion.div
        className="absolute text-xs font-mono text-success/30 font-medium"
        style={{ left: "93%", top: "70%" }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4.5,
          delay: 1.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ↑ 45%
      </motion.div>

      <motion.div
        className="absolute text-xs font-mono text-primary/20 font-medium"
        style={{ left: "4%", top: "85%" }}
        animate={{
          opacity: [0.15, 0.35, 0.15],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 5.5,
          delay: 2.1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        R$ 2.4M
      </motion.div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.line
          x1="10%" y1="20%" x2="25%" y2="35%"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line
          x1="85%" y1="25%" x2="75%" y2="45%"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};
