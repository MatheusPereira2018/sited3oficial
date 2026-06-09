import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { MaturityQuizDialog } from "./maturity-quiz/MaturityQuizDialog";

export const MaturityCTABanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [showMaturityQuiz, setShowMaturityQuiz] = useState(false);

  return (
    <>
      <section className="py-16 sm:py-20 relative overflow-hidden bg-white dark:bg-background" ref={ref}>
        {/* Light mode background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-background dark:via-primary/5 dark:to-background" />
        
        {/* Subtle grid pattern for light mode */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }} />
        
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div 
              onClick={() => setShowMaturityQuiz(true)}
              className="relative overflow-hidden rounded-3xl border border-primary/30 dark:border-primary/20 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 dark:from-primary/10 dark:via-accent/5 dark:to-primary/10 p-10 sm:p-14 cursor-pointer group hover:border-primary/50 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_80px_hsl(var(--primary)/0.25)] dark:hover:shadow-[0_0_80px_hsl(var(--primary)/0.2)] pointer-events-auto"
            >
              {/* Animated background glow */}
              <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/20 dark:bg-primary/15 rounded-full blur-[100px] group-hover:bg-primary/30 dark:group-hover:bg-primary/25 transition-colors duration-700" />
              <div className="absolute bottom-0 right-1/4 w-1/3 h-1/2 bg-accent/20 dark:bg-accent/15 rounded-full blur-[80px] group-hover:bg-accent/30 dark:group-hover:bg-accent/25 transition-colors duration-700" />
              
              {/* Shimmer effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              />
              
              <div className="relative flex flex-col items-center text-center gap-8">
                {/* Title */}
                <motion.h2 
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl leading-tight text-slate-900 dark:text-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  Saiba como está sua empresa em{" "}
                  <motion.span 
                    className="gradient-text"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    maturidade de dados
                  </motion.span>
                </motion.h2>
                
                {/* Subtitle */}
                <motion.p 
                  className="text-slate-600 dark:text-muted-foreground text-base sm:text-lg md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  Diagnóstico gratuito em 3 minutos • Resultado imediato com plano de ação
                </motion.p>
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="btn-success-animated bg-success hover:bg-success/90 text-success-foreground font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-3 group/btn pointer-events-auto"
                  >
                    Fazer diagnóstico gratuito
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <MaturityQuizDialog
        open={showMaturityQuiz}
        onOpenChange={setShowMaturityQuiz}
      />
    </>
  );
};
