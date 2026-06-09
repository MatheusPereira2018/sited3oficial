import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, MessageCircleQuestion, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo para ver resultados?",
    answer: "Nosso modelo de entregas contínuas garante progresso desde as primeiras semanas. Você não espera meses — cada etapa já entrega clareza.",
  },
  {
    question: "Preciso trocar meus sistemas atuais?",
    answer: "Não. Conectamos e organizamos os dados que você já tem. Zero complexidade adicional com novos sistemas.",
  },
  {
    question: "E se minha equipe não for técnica?",
    answer: "Entregamos soluções que sua equipe consegue usar e manter. Transferência de conhecimento faz parte do processo.",
  },
  {
    question: "Por que minha TI não resolve isso?",
    answer: "Organizar dados para decisão exige visão de negócio + técnica. Sua TI mantém sistemas; nós focamos exclusivamente nesse problema.",
  },
  {
    question: "Qual o investimento necessário?",
    answer: "Varia conforme o escopo. Preferimos entender seu cenário e propor algo que faça sentido. 30 minutos de conversa já clareia.",
  },
  {
    question: "Os números vão bater?",
    answer: "Garantimos uma única fonte de verdade com critérios documentados. Todos olham para o mesmo dado, com a mesma definição.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns
  const leftColumn = faqs.slice(0, 3);
  const rightColumn = faqs.slice(3);

  const renderFAQ = (faq: typeof faqs[0], index: number, columnOffset: number) => {
    const actualIndex = index + columnOffset;
    const isOpen = openIndex === actualIndex;
    
    return (
      <motion.div
        key={actualIndex}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ 
          duration: 0.5, 
          delay: actualIndex * 0.08,
          ease: [0.22, 1, 0.36, 1]
        }}
        whileHover={{ y: -2 }}
      >
        <div 
          className={`group rounded-xl border transition-all duration-300 pointer-events-auto ${
            isOpen 
              ? 'bg-primary/5 border-primary/30 shadow-lg shadow-primary/5' 
              : 'bg-card/50 border-border/50 hover:border-primary/20 hover:bg-card/80'
          }`}
        >
          <button
            onClick={() => toggle(actualIndex)}
            className="w-full flex items-center justify-between p-4 text-left gap-3 pointer-events-auto"
          >
            <span className={`font-display font-semibold text-sm transition-colors ${
              isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
            }`}>
              {faq.question}
            </span>
            <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen 
                ? 'bg-primary text-primary-foreground rotate-180' 
                : 'bg-muted text-muted-foreground group-hover:bg-primary/20'
            }`}>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </button>
          
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Left side - Title and CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-foreground">
              O que executivos{" "}
              <span className="gradient-text">querem saber</span>
            </h2>
            
            <p className="text-sm sm:text-base mb-6 text-muted-foreground">
              Respostas objetivas para quem está considerando organizar seus dados e tomar decisões com mais clareza.
            </p>

            <a 
              href="#contato" 
              className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all group pointer-events-auto"
            >
              Ainda tem dúvidas? Fale conosco
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Right side - FAQs in 2 columns */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
            <div className="space-y-3">
              {leftColumn.map((faq, index) => renderFAQ(faq, index, 0))}
            </div>
            <div className="space-y-3">
              {rightColumn.map((faq, index) => renderFAQ(faq, index, 3))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
