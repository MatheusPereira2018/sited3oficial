import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, Brain, Sparkles, X, ExternalLink, Smartphone, Database, FileSpreadsheet, Plug, Cloud, TrendingUp, Zap, Trophy, Globe, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import logoD3Dark from "@/assets/logo-d3-dark.png";
import logoD3White from "@/assets/logo-d3-white.png";
import ROIQuiz from "@/components/quiz/ROIQuiz";

const demos = [
  {
    id: "oraculo",
    title: "Oráculo",
    subtitle: "Shopping Center Analytics",
    shortDescription: "Análise de fluxo de veículos e comportamento do consumidor em tempo real.",
    icon: BarChart3,
    color: "from-blue-500 to-cyan-500",
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNDc5ZDVlZGYtODAwZC00MGRjLTkyMGItZmY2OWNjMWE5MTkyIiwidCI6IjViOWU2Yzk4LTQ1OTEtNDVjZC1hNzVlLTZkMmRhYjJiNDU4ZiJ9",
    details: {
      description: "Um dos nossos projetos favoritos pela riqueza de dados. Transformamos informações brutas de estacionamento em insights estratégicos para a administração do shopping.",
      dataSources: [
        { icon: Database, label: "Banco de dados" },
        { icon: FileSpreadsheet, label: "Planilhas" },
        { icon: Plug, label: "API" },
      ],
    },
  },
  {
    id: "chackapp",
    title: "ChackApp",
    subtitle: "Operação em Campo",
    shortDescription: "Dados coletados em campo via app mobile, integrados em tempo real ao BI.",
    icon: Smartphone,
    color: "from-emerald-500 to-teal-500",
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiMGZmZDNhYjAtMjFiZS00YmYzLWFhYjEtYTMzOTlmZThmZWJhIiwidCI6IjViOWU2Yzk4LTQ1OTEtNDVjZC1hNzVlLTZkMmRhYjJiNDU4ZiJ9",
    details: {
      description: "Dashboard alimentado por APIs e Google Sheets. Operação realizada via app mobile, com dados coletados em campo consumidos automaticamente pelo BI. Atualização de hora em hora.",
      dataSources: [
        { icon: Plug, label: "API" },
        { icon: FileSpreadsheet, label: "Google Sheets" },
        { icon: Smartphone, label: "App Mobile" },
      ],
    },
  },
  {
    id: "naturin-vendas",
    title: "Naturin Vendas",
    subtitle: "Gestão Comercial",
    shortDescription: "KPIs comerciais em tempo real. Adeus relatórios CSV e PowerPoints mensais.",
    icon: TrendingUp,
    color: "from-orange-500 to-amber-500",
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiYzBkYjE3NDYtODFlZi00ZGFiLTgzNTYtNDIwOTlkZjc2NDIwIiwidCI6IjViOWU2Yzk4LTQ1OTEtNDVjZC1hNzVlLTZkMmRhYjJiNDU4ZiJ9",
    details: {
      description: "Automatizamos o processo de extração que antes envolvia CSV, fórmulas em planilhas paralelas e PowerPoints mensais. Agora os KPIs são consumidos em tempo real, permitindo ações rápidas como bonificação ao time comercial.",
      dataSources: [
        { icon: Database, label: "ERP/Sistema" },
        { icon: Zap, label: "Tempo real" },
      ],
    },
  },
  {
    id: "copa-mundo",
    title: "Dash Copa",
    subtitle: "Storytelling & UX",
    shortDescription: "História das Copas do Mundo desde 1930. 3º lugar no desafio Power BI Experience.",
    icon: Trophy,
    color: "from-yellow-500 to-green-500",
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiZGQ1ZTZiMzUtODc2Mi00ZGUzLTkzNzYtZDA4YmUwNWY0ZTMxIiwidCI6IjViOWU2Yzk4LTQ1OTEtNDVjZC1hNzVlLTZkMmRhYjJiNDU4ZiJ9",
    details: {
      description: "Dashboard desenvolvido para o desafio Power BI Experience, contando a história das Copas desde 1930 com técnicas de storytelling e UX. Design clean e divertido que conquistou o 3º lugar entre 100 projetos.",
      dataSources: [
        { icon: Globe, label: "Dados históricos" },
        { icon: Trophy, label: "3º Lugar" },
      ],
    },
  },
  {
    id: "assistente-ia",
    title: "Assistente IA",
    subtitle: "IA Generativa",
    shortDescription: "Converse com o assistente e veja a inteligência artificial em ação.",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    embedUrl: "https://ai.studio/apps/drive/1HnQBaGDoCD62PBfy99wb0hoiDny1gqQ5?fullscreenApplet=true",
    details: {
      description: "Aplicação de IA generativa integrada com modelos de linguagem avançados.",
      dataSources: [
        { icon: Cloud, label: "Google AI" },
        { icon: Brain, label: "LLM" },
      ],
    },
  },
];

const Cases = () => {
  const ref = useRef(null);
  const ctaRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });
  const [isDark, setIsDark] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<typeof demos[0] | null>(null);
  const [showROIQuiz, setShowROIQuiz] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <img 
              src={isDark ? logoD3White : logoD3Dark} 
              alt="D3 Data" 
              className="h-10 w-auto"
            />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="pt-24 pb-16" ref={ref}>
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Cases e Projetos
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Veja na prática o que{" "}
              <span className="gradient-text">entregamos</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Clique em um projeto para explorar o dashboard completo.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  onClick={() => setSelectedDemo(demo)}
                  className="glass-card rounded-2xl p-6 cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] h-full flex flex-col"
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${demo.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <demo.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {demo.subtitle}
                    </span>
                    <h3 className="font-display text-xl font-bold mt-1 mb-2 group-hover:text-primary transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {demo.shortDescription}
                    </p>
                  </div>

                  {/* Data Sources */}
                  {demo.details?.dataSources && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                      {demo.details.dataSources.slice(0, 3).map((ds) => (
                        <span 
                          key={ds.label}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                        >
                          <ds.icon className="w-3 h-3" />
                          {ds.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4" />
                    Abrir dashboard
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ROI CTA Section */}
          <motion.section
            ref={ctaRef}
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 relative overflow-hidden"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 p-8 md:p-12">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    Quanto você está{" "}
                    <span className="text-red-500">perdendo</span>
                    {" "}sem dados?
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-xl">
                    Responda 3 perguntas e descubra uma estimativa do impacto financeiro 
                    da falta de organização de dados na sua empresa.
                  </p>
                </div>
                
                <div className="shrink-0">
                  <Button 
                    size="lg" 
                    onClick={() => setShowROIQuiz(true)}
                    className="btn-success-animated group text-base px-8 py-6 rounded-xl bg-success hover:bg-success/90 text-success-foreground"
                  >
                    Fazer o quiz
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* ROI Quiz Modal */}
      <Dialog open={showROIQuiz} onOpenChange={setShowROIQuiz}>
        <DialogContent className="max-w-lg p-6 md:p-8">
          <DialogTitle className="sr-only">Calculadora de ROI</DialogTitle>
          <DialogDescription className="sr-only">Calcule o retorno sobre investimento em dados para sua empresa</DialogDescription>
          <ROIQuiz onClose={() => setShowROIQuiz(false)} />
        </DialogContent>
      </Dialog>

      {/* Full Screen Modal */}
      <Dialog open={!!selectedDemo} onOpenChange={() => setSelectedDemo(null)}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 gap-0 overflow-hidden flex flex-col">
          <DialogTitle className="sr-only">{selectedDemo?.title || "Demonstração"}</DialogTitle>
          <DialogDescription className="sr-only">{selectedDemo?.subtitle || "Visualização detalhada do case"}</DialogDescription>
          {selectedDemo && (
            <>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-background shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedDemo.color} flex items-center justify-center`}>
                    <selectedDemo.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">{selectedDemo.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDemo.subtitle}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedDemo(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Description & Data Sources */}
              {selectedDemo.details && (
                <div className="p-4 bg-muted/30 border-b border-border shrink-0 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <p className="text-sm text-muted-foreground max-w-2xl flex-1">
                    {selectedDemo.details.description}
                  </p>
                  {selectedDemo.details.dataSources && (
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {selectedDemo.details.dataSources.map((ds) => (
                        <span 
                          key={ds.label}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-medium text-foreground"
                        >
                          <ds.icon className="w-3.5 h-3.5 text-primary" />
                          {ds.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Embed */}
              <div className="flex-1 min-h-0">
                <iframe
                  title={selectedDemo.title}
                  src={selectedDemo.embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cases;
