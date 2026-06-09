import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { MaturityQuizDialog } from "./maturity-quiz/MaturityQuizDialog";

export const MaturityCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showMaturityQuiz, setShowMaturityQuiz] = useState(false);

  return (
    <>
      <section className="py-8 relative overflow-hidden" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div 
              onClick={() => setShowMaturityQuiz(true)}
              className="relative overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 p-5 cursor-pointer group hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--accent)/0.1)]"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-display text-lg md:text-xl font-semibold">
                      Descubra seu nível de maturidade em dados
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Diagnóstico gratuito em 3 minutos
                    </p>
                  </div>
                </div>
                
                <Button
                  className="bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl px-6 py-3 hover:scale-[1.02] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)] flex items-center justify-center gap-3 shrink-0 group/btn"
                >
                  Fazer diagnóstico
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
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
