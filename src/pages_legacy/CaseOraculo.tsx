import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Database, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Target, 
  Zap, 
  FileSpreadsheet, 
  ArrowRight, 
  ArrowLeft,
  Users,
  Car,
  ShoppingCart,
  AlertTriangle,
  Lightbulb,
  Plug
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoD3Dark from "@/assets/logo-d3-dark.png";
import logoD3White from "@/assets/logo-d3-white.png";

// Hero Section
const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="min-h-[85vh] flex items-center relative overflow-hidden pt-24 pb-16">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-background to-cyan-500/5" 
      />
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-20 right-10 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-3xl animate-pulse-glow" 
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ y: textY }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            Case de Sucesso
          </span>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Oráculo Analytics:{" "}
            <span className="gradient-text">dados que transformam shopping centers</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Transformamos informações brutas de estacionamento em insights estratégicos 
            para tomada de decisão em tempo real.
          </p>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
            asChild
          >
            <a href="#contato-case">
              Quero transformar meus dados
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: AlertTriangle,
      title: "Dados fragmentados",
      description: "Informações de estacionamento espalhadas em diferentes sistemas, sem integração."
    },
    {
      icon: Clock,
      title: "Análises manuais demoradas",
      description: "Relatórios mensais que levavam semanas para serem consolidados manualmente."
    },
    {
      icon: Target,
      title: "Decisões sem base de dados",
      description: "Administração do shopping tomava decisões estratégicas sem dados confiáveis em tempo real."
    },
    {
      icon: FileSpreadsheet,
      title: "Falta de visibilidade",
      description: "Impossível entender padrões de comportamento do consumidor e fluxo de veículos."
    }
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            O <span className="text-red-500">problema</span> que encontramos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Um shopping center com dados valiosos, mas sem capacidade de transformá-los em decisões estratégicas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-6 rounded-2xl border-destructive/30 hover:border-destructive/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                  <problem.icon className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Solution Section
const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  const steps = [
    { icon: Database, label: "Integração", sublabel: "de dados de estacionamento" },
    { icon: BarChart3, label: "Processamento", sublabel: "em tempo real" },
    { icon: TrendingUp, label: "Análise", sublabel: "de padrões e tendências" },
    { icon: Target, label: "Dashboard", sublabel: "interativo e estratégico" },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Como <span className="gradient-text">solucionamos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Desenvolvemos uma plataforma completa de analytics que transforma dados brutos em insights acionáveis.
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="relative py-12">
            <div className="absolute top-[80px] md:top-[92px] left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-muted hidden md:block rounded-full overflow-hidden z-0">
              <motion.div 
                style={{ width: lineWidth }}
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              {steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 100 }}
                  className="flex flex-col items-center relative z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30 mb-4"
                  >
                    <step.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </motion.div>
                  <div className="text-center bg-background px-4 py-2 rounded-xl">
                    <p className="font-display font-bold text-lg">{step.label}</p>
                    <p className="text-muted-foreground text-sm">{step.sublabel}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="glass-card p-8 rounded-2xl border-primary/30">
            <h3 className="font-display text-2xl font-bold mb-6 text-center">Desenvolvimento Técnico</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Integração de Dados</h4>
                <p className="text-sm text-muted-foreground">Conectamos múltiplas fontes de dados de estacionamento em uma única plataforma.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Processamento em Tempo Real</h4>
                <p className="text-sm text-muted-foreground">Dados processados e atualizados continuamente para análises instantâneas.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Visualizações Interativas</h4>
                <p className="text-sm text-muted-foreground">Dashboards intuitivos com filtros e drill-down para análises profundas.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Results Section
const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const results = [
    { icon: Clock, value: "Tempo real", label: "análises instantâneas" },
    { icon: TrendingUp, value: "100%", label: "de visibilidade dos dados" },
    { icon: Target, value: "Decisões", label: "baseadas em dados confiáveis" },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Resultados
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {results.map((result, i) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.15, type: "spring" }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-card p-8 rounded-2xl text-center hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <result.icon className="w-8 h-8 text-primary" />
              </div>
              <p className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                {result.value}
              </p>
              <p className="text-muted-foreground">{result.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato-case" ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-10 md:p-16 rounded-3xl border-primary/30 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
                Quer transformar seus dados{" "}
                <span className="gradient-text">em decisões estratégicas?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Vamos conversar sobre como podemos ajudar sua empresa a extrair valor dos seus dados.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 px-10"
                asChild
              >
                <a href="#contato">
                  Falar com a D3 Data
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Header Component
const CaseHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <img 
            src={isDark ? logoD3White : logoD3Dark} 
            alt="D3 Data" 
            className="h-12 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            asChild
          >
            <a href="#contato">Fale Conosco</a>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

// Footer
const CaseFooter = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} D3 Data. Todos os direitos reservados.
          </p>
          <Link 
            to="/" 
            className="text-primary hover:underline text-sm font-medium"
          >
            Voltar para o site principal
          </Link>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
const CaseOraculo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CaseHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ResultsSection />
        <CTASection />
      </main>
      <CaseFooter />
    </div>
  );
};

export default CaseOraculo;

