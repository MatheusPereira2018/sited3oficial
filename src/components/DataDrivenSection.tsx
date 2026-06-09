import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Shield, TrendingUp, Users } from "lucide-react";

const benefits = [
  { icon: Clock, text: "Decisões em minutos, não em semanas" },
  { icon: Shield, text: "Confiança nos números apresentados" },
  { icon: TrendingUp, text: "Oportunidades identificadas a tempo" },
  { icon: Users, text: "Equipe autônoma, não dependente" },
];

export const DataDrivenSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cultura" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-glow" />
              <div className="absolute inset-8 rounded-full border border-primary/30 animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-16 rounded-full border border-primary/40 animate-pulse-glow" style={{ animationDelay: "1s" }} />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center glow-effect">
                    <span className="font-display font-bold text-4xl gradient-text">D3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Decisão com Dados</p>
                </div>
              </div>

              {/* Floating data points */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-primary"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Dados organizados.<br />
              <span className="gradient-text">Decisões melhores.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Quando todos olham para os mesmos números, a discussão muda. 
              Ao invés de debater quem está certo, a liderança foca no que fazer. 
              Isso muda o ritmo da empresa.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};