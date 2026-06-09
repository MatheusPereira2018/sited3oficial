import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Compass, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnóstico",
    subtitle: "Entender o cenário",
    description: "Mapeamos onde estão os gargalos: planilhas paralelas, sistemas desconectados, processos manuais. Sem julgamento, só clareza.",
    color: "primary",
  },
  {
    icon: Compass,
    number: "02",
    title: "Estruturação",
    subtitle: "Organizar o caminho",
    description: "Definimos como os dados devem fluir para que a informação chegue certa, no lugar certo, na hora certa.",
    color: "accent",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Implementação",
    subtitle: "Colocar em prática",
    description: "Organizamos os dados com entregas contínuas. A cada etapa, você já vê resultado — não precisa esperar meses.",
    color: "primary",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Autonomia",
    subtitle: "Transferir conhecimento",
    description: "Preparamos sua equipe para rodar a operação. Nosso objetivo é você não precisar mais de nós.",
    color: "accent",
  },
];

export const WorkflowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="metodologia" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-4">
            Como trabalhamos
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Do problema à{" "}
            <span className="gradient-text">solução</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Um processo direto, sem enrolação. Cada etapa entrega valor. 
            Você acompanha, valida e decide os próximos passos.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20 -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className={`glass-card p-6 rounded-2xl h-full hover:border-${step.color}/50 transition-all duration-300 group text-center lg:text-left`}>
                  {/* Number Badge */}
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full ${step.color === 'accent' ? 'bg-accent/10 border-accent/30 group-hover:bg-accent/20 group-hover:border-accent/50' : 'bg-primary/10 border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50'} border-2 flex items-center justify-center transition-all`}>
                      <step.icon className={`w-7 h-7 ${step.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                    </div>
                    <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${step.color === 'accent' ? 'bg-accent' : 'bg-primary'} text-primary-foreground text-xs font-bold flex items-center justify-center`}>
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-1 gradient-text">
                    {step.title}
                  </h3>
                  <p className={`${step.color === 'accent' ? 'text-accent' : 'text-primary'} text-sm font-medium mb-3`}>
                    {step.subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};