import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ROIQuiz from "@/components/quiz/ROIQuiz";
import { HeroAnimation } from "@/components/HeroAnimation";

export const HeroSection = () => {
  const [showROIQuiz, setShowROIQuiz] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Subtle Grid Pattern - Otimizado para evitar re-renderizações */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          willChange: 'auto'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left order-1 lg:order-1 lg:flex-shrink-0 lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0 lg:pr-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] mb-6"
            >
              Transforme dados em{" "}
              <motion.span 
                className="gradient-text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                decisões estratégicas
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg md:text-xl mb-10 leading-relaxed text-muted-foreground"
            >
              Ajudamos empresas a estruturar seus dados, criar dashboards confiáveis 
              e evoluir sua maturidade analítica com metodologia e resultados mensuráveis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 sm:flex-row sm:gap-4 mb-10 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="bg-gradient-to-r from-primary to-accent text-white font-semibold group rounded-xl px-6 py-3 hover:scale-[1.02] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)] flex items-center justify-center gap-3 w-full sm:w-auto pointer-events-auto"
              >
                Falar com especialista
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => setShowROIQuiz(true)}
                className="btn-success-animated group/btn relative inline-flex items-center justify-center gap-3 rounded-xl bg-success hover:bg-success/90 px-6 py-3 text-success-foreground font-semibold w-full sm:w-auto pointer-events-auto"
              >
                <span>Fazer diagnóstico</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground justify-center lg:justify-start"
            >
              {[
                "8+ anos especializados em dados",
                "50+ empresas transformadas",
                "95% de retenção de clientes",
              ].map((item, index) => (
                <motion.span
                  key={item}
                  className="text-sm font-medium flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                >
                  <motion.span 
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.3, type: "spring" }}
                  />
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Dashboard Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-2 flex-1 hidden md:flex lg:justify-start"
          >
            <div className="relative z-10 w-full">
              <HeroAnimation />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ROI Quiz Modal */}
      <Dialog open={showROIQuiz} onOpenChange={setShowROIQuiz}>
        <DialogContent className="max-w-lg p-6 md:p-8">
          <ROIQuiz onClose={() => setShowROIQuiz(false)} />
        </DialogContent>
      </Dialog>
    </section>
    </>
  );
};
