import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: "8+", label: "Anos resolvendo este problema", number: 8 },
  { value: "50+", label: "Operações organizadas", number: 50 },
  { value: "30+", label: "Empresas com clareza", number: 30 },
  { value: "95%", label: "Continuam conosco", number: 95 },
];

const Counter = ({ value, suffix, isInView }: { value: string; suffix: string; isInView: boolean }) => {
  const targetNumber = parseInt(value.replace(/\D/g, ''));
  const [count, setCount] = useState(0);
  const duration = 2000; // 2 segundos
  const steps = 60;
  const stepValue = targetNumber / steps;
  const stepDuration = duration / steps;

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const newValue = Math.min(Math.floor(stepValue * currentStep), targetNumber);
      setCount(newValue);

      if (currentStep >= steps || newValue >= targetNumber) {
        setCount(targetNumber);
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isInView, targetNumber, stepValue, stepDuration, steps]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clientes" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Empresas que decidiram{" "}
            <span className="gradient-text">sair do escuro</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Atuamos com empresas de médio e grande porte que entenderam: 
            o problema não é falta de dados, é falta de organização.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const suffix = stat.value.includes('%') ? '%' : stat.value.includes('+') ? '+' : '';
            const itemRef = useRef(null);
            const itemInView = useInView(itemRef, { once: true, margin: "-50px" });
            
            return (
              <motion.div
                key={stat.label}
                ref={itemRef}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={itemInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                {/* Gradient Light Background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/15 to-primary/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500 blur-xl" />
                
                {/* Glass Card */}
                <div className="relative backdrop-blur-xl bg-card/80 dark:bg-card/90 border border-border/50 dark:border-border/60 rounded-3xl p-6 text-center hover:border-primary/50 dark:hover:border-primary/50 hover:bg-card/90 dark:hover:bg-card/95 transition-all duration-500 shadow-lg shadow-primary/5 dark:shadow-primary/10 group-hover:shadow-xl group-hover:shadow-primary/10 dark:group-hover:shadow-primary/20 pointer-events-auto h-full flex flex-col justify-center">
                  {/* Additional glow on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/10 group-hover:via-accent/5 group-hover:to-primary/10 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <p className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                      <Counter value={stat.value} suffix={suffix} isInView={itemInView} />
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
