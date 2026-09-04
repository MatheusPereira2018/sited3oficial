import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

import { MaturityQuizDialog } from "@/components/maturity-quiz/MaturityQuizDialog";

export const HeroSection = () => {
  const [showDiagnostico, setShowDiagnostico] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-tracking glow
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.6 });
  const bgPos = useTransform([smoothX, smoothY], ([x, y]) => `${x}% ${y}%`);
  const glowBg = useTransform(
    bgPos,
    (pos) =>
      `radial-gradient(ellipse 55% 55% at ${pos}, hsl(var(--primary) / 0.35) 0%, transparent 60%)`
  );
  // Parallax for hero image
  const imgX = useTransform(smoothX, [0, 100], [-15, 15]);
  const imgY = useTransform(smoothY, [0, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-16"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Mouse-tracking glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-screen dark:mix-blend-screen"
        style={{ background: glowBg }}
      />

      
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
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="eyebrow-label mb-5 block"
            >
              Consultoria · Dados · IA
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold leading-[1.02] tracking-[-0.04em] mb-6"
            >
              Transforme dados em{" "}
              <motion.span 
                className="text-primary"
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
                Falar com a D3
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => setShowDiagnostico(true)}
                className="btn-success-animated group/btn relative inline-flex items-center justify-center gap-3 rounded-xl bg-success hover:bg-success/90 px-6 py-3 text-success-foreground font-semibold w-full sm:w-auto pointer-events-auto"
              >
                <span>Fazer diagnóstico gratuito</span>
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
            {/* Dashboard Image */}
            <motion.div
              className="relative z-10 w-full flex justify-center lg:justify-start"
              style={{ x: imgX, y: imgY }}
            >
              <img 
                src="/Imagens/Herosection.png" 
                alt="Dashboard de análise de dados" 
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,113,231,0.3)] max-w-[550px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1000px]"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Diagnóstico de Maturidade */}
      <MaturityQuizDialog open={showDiagnostico} onOpenChange={setShowDiagnostico} />
    </section>
    </>
  );
};
