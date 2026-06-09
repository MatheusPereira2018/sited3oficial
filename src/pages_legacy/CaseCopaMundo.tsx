import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Trophy, 
  Clock, 
  AlertTriangle, 
  Target, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft,
  Palette,
  Sparkles,
  CheckCircle2,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoD3Dark from "@/assets/logo-d3-dark.png";
import logoD3White from "@/assets/logo-d3-white.png";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="min-h-[85vh] flex items-center relative overflow-hidden pt-24 pb-16">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-background to-orange-500/5" 
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ y: textY }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Case de Sucesso • 3º lugar Power BI Experience
          </span>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Dash Copa do Mundo:{" "}
            <span className="gradient-text">storytelling visual que conquista</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Visualização interativa da história das Copas desde 1930. 
            Um projeto que combina design de dados com narrativa visual impactante.
          </p>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
            asChild
          >
            <a href="#contato-case">
              Quero criar visualizações impactantes
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: AlertTriangle,
      title: "Dados históricos fragmentados",
      description: "Informações sobre as Copas do Mundo espalhadas em diferentes fontes, sem uma narrativa visual unificada."
    },
    {
      icon: Palette,
      title: "Falta de storytelling visual",
      description: "Dados ricos sem uma apresentação que conte uma história envolvente e memorável."
    },
    {
      icon: Target,
      title: "Visualizações técnicas demais",
      description: "Dashboards focados apenas em dados, sem considerar a experiência do usuário e a narrativa."
    },
    {
      icon: Globe,
      title: "Dificuldade de engajamento",
      description: "Visualizações que não conseguiam engajar e transmitir a emoção dos dados históricos."
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
            O <span className="text-red-500">desafio</span> que encontramos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Criar uma visualização que não apenas mostrasse dados, mas contasse a história emocionante das Copas do Mundo.
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

const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  const steps = [
    { icon: Globe, label: "Coleta", sublabel: "de dados históricos" },
    { icon: Palette, label: "Design", sublabel: "visual narrativo" },
    { icon: BarChart3, label: "Visualização", sublabel: "interativa" },
    { icon: Trophy, label: "Storytelling", sublabel: "emocionante" },
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
            Criamos uma experiência visual imersiva que combina dados históricos com design narrativo impactante.
          </p>
        </motion.div>

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
                  <Palette className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Design Narrativo</h4>
                <p className="text-sm text-muted-foreground">Criação de uma narrativa visual que guia o usuário através da história das Copas desde 1930.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Visualizações Interativas</h4>
                <p className="text-sm text-muted-foreground">Gráficos e mapas interativos que permitem exploração detalhada dos dados históricos.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Experiência Imersiva</h4>
                <p className="text-sm text-muted-foreground">Interface que combina dados com elementos visuais que transmitem a emoção do futebol.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const results = [
    { icon: Trophy, value: "3º lugar", label: "Power BI Experience" },
    { icon: Sparkles, value: "100%", label: "engajamento visual" },
    { icon: Globe, value: "90+ anos", label: "de história visualizada" },
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
                <Palette className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
                Quer criar visualizações{" "}
                <span className="gradient-text">impactantes?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Transforme seus dados em narrativas visuais memoráveis. Vamos conversar sobre seu projeto.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 px-10"
                asChild
              >
                <Link to="/#contato">
                  Falar com a D3 Data
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

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
            <Link to="/#contato">Fale Conosco</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

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

const CaseCopaMundo = () => {
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

export default CaseCopaMundo;

