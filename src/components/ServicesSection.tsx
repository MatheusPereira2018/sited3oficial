import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Database, BarChart3, Users, Layers, GitBranch, Shield } from "lucide-react";
import { GenericQuiz } from "./quiz/GenericQuiz";
import { quizConfigs } from "./quiz/quizConfigs";
import type { LucideIcon } from "lucide-react";

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  hasQuiz: boolean;
}

const services: Service[] = [
  {
    id: "data-journey",
    icon: Database,
    title: "Estruturação de Dados",
    description: "Organizamos seus dados dispersos em uma arquitetura confiável. Menos tempo procurando informação, mais tempo decidindo.",
    hasQuiz: true,
  },
  {
    id: "software-factory",
    icon: BarChart3,
    title: "BI & Analytics",
    description: "Dashboards que respondem às perguntas certas. Visualizações claras para decisões rápidas e embasadas.",
    hasQuiz: true,
  },
  {
    id: "squad",
    icon: Users,
    title: "Squads Dedicados",
    description: "Especialistas integrados ao seu time. Execução contínua sem curva de aprendizado ou rotatividade.",
    hasQuiz: true,
  },
  {
    id: "integration",
    icon: GitBranch,
    title: "Integração de Sistemas",
    description: "Conectamos ERP, CRM e planilhas em um fluxo único. Dados consolidados, sem retrabalho manual.",
    hasQuiz: false,
  },
  {
    id: "governance",
    icon: Shield,
    title: "Governança de Dados",
    description: "Políticas, qualidade e segurança. Garanta que seus dados sejam confiáveis, rastreáveis e protegidos.",
    hasQuiz: false,
  },
  {
    id: "ux",
    icon: Layers,
    title: "Automação de Processos",
    description: "Elimine tarefas repetitivas. Automatize rotinas operacionais e libere seu time para o que importa.",
    hasQuiz: false,
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const handleServiceClick = (serviceId: string, hasQuiz: boolean) => {
    if (hasQuiz) {
      setActiveQuiz(serviceId);
    }
  };

  return (
    <>
      <section id="servicos" className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Soluções para{" "}
              <span className="gradient-text">maturidade em dados</span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Ajudamos empresas a sair do caos de planilhas e sistemas desconectados 
              para uma operação orientada por dados confiáveis e decisões ágeis.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0,
                    scale: 1
                  } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div 
                    onClick={() => handleServiceClick(service.id, service.hasQuiz)}
                    className={`group relative h-full rounded-3xl overflow-visible pointer-events-auto ${
                      service.hasQuiz ? "cursor-pointer" : ""
                    }`}
                  >
                    {/* Background Card Base with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fafbfc] to-[#f5f7fa] dark:from-[#1a1f2e] dark:via-[#1e2332] dark:to-[#1a1f2e] rounded-3xl transition-all duration-500 z-0" />
                    
                    {/* Blue Dark Border with Glow - Normal state */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-[#0a4d7a] dark:border-[#1e4a6e] shadow-[0_0_15px_rgba(10,77,122,0.3)] dark:shadow-[0_0_15px_rgba(30,74,110,0.4)] transition-all duration-500 group-hover:opacity-0 z-[1] pointer-events-none" />
                    
                    {/* Gradient Border - Only on hover, no animation */}
                    <div className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-primary via-accent to-primary z-[1]" />
                    
                    {/* Subtle Glow Effect on Hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500 pointer-events-none z-[1]" />
                    
                    {/* Content */}
                    <div className="relative p-8 sm:p-10 h-full flex flex-col rounded-3xl z-10 bg-gradient-to-br from-[#ffffff] via-[#fafbfc] to-[#f5f7fa] dark:from-[#1a1f2e] dark:via-[#1e2332] dark:to-[#1a1f2e] pointer-events-auto">
                      {/* Icon Container */}
                      <div className="mb-6">
                        <div className="relative inline-block">
                          {/* Icon Box */}
                          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/40 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/80 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                            <IconComponent className="w-8 h-8 text-primary relative z-10 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground text-base leading-relaxed flex-1 mb-6">
                        {service.description}
                      </p>
                      
                      {/* CTA Button - Standardized */}
                      <div className="mt-auto">
                        {service.hasQuiz ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleServiceClick(service.id, service.hasQuiz);
                            }}
                            className="btn-success-animated group/btn relative w-full rounded-xl bg-success hover:bg-success/90 px-6 py-3 text-success-foreground font-semibold flex items-center justify-center gap-3 pointer-events-auto"
                          >
                            <span>Fazer diagnóstico gratuito</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </button>
                        ) : (
                          <a 
                            href="#contato" 
                            className="group/btn relative w-full rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)] flex items-center justify-center gap-3 pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Saiba mais</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </a>
                        )}
                      </div>
                      
                    </div>
                    
                    {/* Hover Shadow with Glow */}
                    <div className="absolute inset-0 rounded-3xl shadow-none group-hover:shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.3)] transition-shadow duration-500 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {activeQuiz && quizConfigs[activeQuiz] && (
        <GenericQuiz
          open={!!activeQuiz}
          onOpenChange={(open) => !open && setActiveQuiz(null)}
          config={quizConfigs[activeQuiz]}
        />
      )}
    </>
  );
};
