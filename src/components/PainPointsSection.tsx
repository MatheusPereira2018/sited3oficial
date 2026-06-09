import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileSpreadsheet, Clock, ShieldQuestion, UserX, TrendingDown, Unplug } from "lucide-react";

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: "Planilhas que viram verdade",
    description: "Cada área tem sua planilha, sua lógica, seus ajustes. Na hora de consolidar, ninguém confia no resultado.",
  },
  {
    icon: ShieldQuestion,
    title: "Números que não batem",
    description: "Vendas diz uma coisa, Financeiro diz outra, Operação tem um terceiro número. Qual é o certo?",
  },
  {
    icon: Clock,
    title: "Semanas para uma resposta simples",
    description: "Perguntas que deveriam levar minutos exigem dias de consolidação manual. Quando a resposta chega, a decisão já passou.",
  },
  {
    icon: UserX,
    title: "Dependência de quem sabe",
    description: "O conhecimento está na cabeça de poucas pessoas. Se saem, a operação para.",
  },
  {
    icon: TrendingDown,
    title: "Decisões no instinto",
    description: "Sem dados confiáveis, a liderança decide pelo feeling. Às vezes funciona. Às vezes custa caro.",
  },
  {
    icon: Unplug,
    title: "Sistemas que não conversam",
    description: "ERP, CRM, planilhas, e-mails. Informação espalhada que ninguém consegue conectar.",
  },
];

export const PainPointsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="desafios" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-destructive/5 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            O problema não é falta de dados.{" "}
            <span className="text-muted-foreground">É falta de clareza.</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-4">
            Sua empresa gera dados todos os dias. Mas se cada pergunta gera uma resposta 
            diferente, você não tem informação — tem ruído.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((pain, index) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card p-6 rounded-2xl h-full border-destructive/10 hover:border-destructive/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                  <pain.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">
                  {pain.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pain.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-xl text-foreground font-medium">
            Se você vive isso,{" "}
            <span className="gradient-text font-semibold">não é culpa sua. É falta de estrutura.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
