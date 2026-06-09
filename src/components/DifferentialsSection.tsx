import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Layers, Lightbulb, TrendingUp, Users, Shield } from "lucide-react";

const differentials = [
  {
    icon: Compass,
    title: "Abordagem Estratégica",
    description: "Cada projeto começa com a compreensão profunda dos objetivos de negócio. Dados só geram valor quando conectados à estratégia.",
  },
  {
    icon: Layers,
    title: "Profundidade Técnica",
    description: "Domínio completo do ecossistema de dados: engenharia, analytics, visualização e inteligência artificial aplicada.",
  },
  {
    icon: Lightbulb,
    title: "Entendimento de Negócio",
    description: "Traduzimos complexidade técnica em linguagem de negócio. Soluções que gestores entendem e times adotam.",
  },
  {
    icon: TrendingUp,
    title: "Entregas Orientadas a Valor",
    description: "Foco em resultados mensuráveis desde o primeiro ciclo. ROI claro e impacto real nas decisões.",
  },
  {
    icon: Users,
    title: "Time Sênior Dedicado",
    description: "Profissionais com mais de 8 anos de experiência em projetos complexos. Senioridade em cada etapa da jornada.",
  },
  {
    icon: Shield,
    title: "Governança e Qualidade",
    description: "Segurança, documentação e boas práticas integradas ao processo. Soluções construídas para escalar.",
  },
];

const TimelineItem = ({ item, index, isEven, isLast }: { item: typeof differentials[0]; index: number; isEven: boolean; isLast: boolean }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "200px" });
  
  // Delay sequencial: cada item aparece após o anterior (reduzido para aparecer mais rápido)
  const iconDelay = index * 0.15;
  const cardDelay = iconDelay + 0.1;
  const pulseDelay = iconDelay + 0.3;

  return (
    <div className="relative flex flex-col md:flex-row md:items-start items-center mb-16 last:mb-0">
      {/* Left Card - Even indexes */}
      {isEven && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 30 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.4, delay: cardDelay, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 pr-0 md:pr-8 text-center md:text-right max-w-lg w-full md:w-auto md:ml-auto order-3 md:order-1"
        >
          <div className="glass-card p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] group pointer-events-auto">
            <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {item.description}
            </p>
          </div>
        </motion.div>
      )}

      {/* Central Timeline Line & Dot */}
      <div className="relative flex-shrink-0 flex flex-col items-center order-2 md:order-2 w-full md:w-auto">
        {/* Timeline Line - Continuous vertical line */}
        {!isLast && (
          <div className="absolute top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 hidden md:block" />
        )}
        
        {/* Timeline Dot */}
        <div className="relative z-10">
          <motion.div
            ref={itemRef}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: iconDelay, type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background shadow-lg flex items-center justify-center"
          >
            <item.icon className="w-8 h-8 text-white" />
          </motion.div>
          {/* Pulse effect - só começa após o ícone aparecer - otimizado */}
          {isInView && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.5, 0, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: pulseDelay }}
              style={{ willChange: 'transform, opacity' }}
            />
          )}
        </div>
      </div>

      {/* Right Card - Odd indexes */}
      {!isEven && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: 30 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.4, delay: cardDelay, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 pl-0 md:pl-8 text-center md:text-left max-w-lg w-full md:w-auto order-3 md:order-3"
        >
          <div className="glass-card p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] group pointer-events-auto">
            <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {item.description}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const DifferentialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="diferenciais" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Excelência em cada <span className="gradient-text">etapa</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Combinamos visão estratégica, expertise técnica e foco em resultados 
            para transformar dados em vantagem competitiva real
          </p>
        </motion.div>

        {/* Vertical Timeline - Cards alternam: esquerda (par), direita (ímpar) */}
        <div className="relative max-w-5xl mx-auto">
          {differentials.map((item, index) => (
            <TimelineItem 
              key={item.title} 
              item={item} 
              index={index}
              isEven={index % 2 === 0}
              isLast={index === differentials.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
