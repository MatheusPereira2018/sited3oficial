import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Brain, 
  Users, 
  Clock, 
  CheckCircle2, 
  Target, 
  Zap, 
  FileText, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft,
  TrendingUp,
  UserCheck,
  Sparkles,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoD3Dark from "@/assets/logo-d3-dark.png";
import logoD3White from "@/assets/logo-d3-white.png";

// Hero Section with Parallax
const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const floatingCard1Y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const floatingCard2Y = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="min-h-[85vh] flex items-center relative overflow-hidden pt-24 pb-16">
      {/* Background Effects with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" 
      />
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-20 right-10 w-[600px] h-[600px] bg-accent/15 rounded-full blur-3xl animate-pulse-glow" 
      />
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl" 
      />
      
      {/* Floating Elements with Parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ y: floatingCard1Y, opacity }}
        className="absolute top-1/4 right-[15%] hidden lg:block"
      >
        <div className="glass-card p-4 rounded-2xl border-accent/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Análise automática</p>
              <p className="font-display font-bold text-lg gradient-text">IA em ação</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{ y: floatingCard2Y, opacity }}
        className="absolute bottom-1/3 right-[10%] hidden lg:block"
      >
        <div className="glass-card p-3 rounded-xl border-primary/30">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Decisão humana garantida</span>
          </div>
        </div>
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ y: textY }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Case de Sucesso
          </span>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            IA no RH:{" "}
            <span className="gradient-text">de operacional a estratégico</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Como transformamos o processo de recrutamento de uma empresa em crescimento, 
            automatizando a triagem e liberando o RH para o que importa.
          </p>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
            asChild
          >
            <a href="#contato-case">
              Quero aplicar IA no meu negócio
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Before & After Visual Comparison with Parallax
const TransformationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const beforeX = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const afterX = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const beforeRotate = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);
  const afterRotate = useTransform(scrollYProgress, [0, 0.5], [5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

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
            A Transformação
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            style={{ x: beforeX, rotateZ: beforeRotate, scale }}
            className="relative"
          >
            <div className="absolute -top-3 left-6 px-4 py-1 bg-destructive text-destructive-foreground text-sm font-medium rounded-full z-10">
              Antes
            </div>
            <div className="glass-card p-8 rounded-2xl border-destructive/30 h-full">
              <div className="space-y-6">
                {/* Visual representation of chaos */}
                <div className="flex items-center justify-center gap-2 py-8">
                  <div className="relative">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ rotate: 0, opacity: 0 }}
                        animate={isInView ? { rotate: (i - 2) * 8, opacity: 1 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="absolute top-0 left-0 w-16 h-20 bg-muted rounded-lg border border-border flex items-center justify-center"
                        style={{ 
                          transform: `translateX(${i * 8}px) translateY(${i * 3}px)`,
                          zIndex: 5 - i
                        }}
                      >
                        <FileText className="w-6 h-6 text-muted-foreground" />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    className="ml-32"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      repeatDelay: 1
                    }}
                  >
                    <AlertTriangle className="w-12 h-12 text-destructive" />
                  </motion.div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5 text-destructive shrink-0" />
                    <span>Horas em triagem manual</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Target className="w-5 h-5 text-destructive shrink-0" />
                    <span>Critérios inconsistentes</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-destructive shrink-0" />
                    <span>Equipe sobrecarregada</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            style={{ x: afterX, rotateZ: afterRotate, scale }}
            className="relative"
          >
            <div className="absolute -top-3 left-6 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full z-10">
              Depois
            </div>
            <div className="glass-card p-8 rounded-2xl border-primary/30 h-full">
              <div className="space-y-6">
                {/* Visual representation of order */}
                <div className="flex items-center justify-center gap-6 py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.8, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30"
                  >
                    <Brain className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 1, type: "spring" }}
                    className="flex flex-col gap-2"
                  >
                    {[1, 2, 3].map((i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1 + i * 0.15 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Candidato #{i}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0" />
                    <span>Triagem em segundos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary shrink-0" />
                    <span>Critérios padronizados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary shrink-0" />
                    <span>RH focado em estratégia</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Visual Flow Diagram with Parallax
const FlowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const steps = [
    { icon: FileText, label: "Currículo", sublabel: "recebido" },
    { icon: Brain, label: "IA analisa", sublabel: "automaticamente" },
    { icon: BarChart3, label: "Classifica", sublabel: "por aderência" },
    { icon: UserCheck, label: "RH decide", sublabel: "com base em dados" },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" 
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Como funciona
          </h2>
          <p className="text-muted-foreground text-lg">
            Um fluxo simples que combina IA com decisão humana
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="relative py-12">
            {/* Animated Connection Line - Desktop */}
            <div className="absolute top-[80px] md:top-[92px] left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-muted hidden md:block rounded-full overflow-hidden z-0">
              <motion.div 
                style={{ width: lineWidth }}
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
              />
            </div>
            
            {/* Connection Line - Mobile */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-primary via-accent to-primary md:hidden rounded-full" />

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
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      y: {
                        repeat: Infinity,
                        duration: 2,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }
                    }}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30 mb-4"
                  >
                    <step.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </motion.div>
                  <motion.div 
                    className="text-center bg-background px-4 py-2 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.2 }}
                  >
                    <p className="font-display font-bold text-lg">{step.label}</p>
                    <p className="text-muted-foreground text-sm">{step.sublabel}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Point */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 1.2, type: "spring" }}
          className="text-center mt-8"
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/30"
            whileHover={{ scale: 1.05 }}
          >
            <UserCheck className="w-5 h-5 text-accent" />
            <span className="font-medium">A decisão final é sempre humana</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Results with visual metrics and Parallax
const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const results = [
    { icon: Clock, value: "90%", label: "menos tempo em triagem", yOffset: y1 },
    { icon: TrendingUp, value: "3x", label: "mais candidatos processados", yOffset: y2 },
    { icon: Target, value: "100%", label: "critérios padronizados", yOffset: y3 },
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
              style={{ y: result.yOffset }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.15, type: "spring" }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-card p-8 rounded-2xl text-center hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                <result.icon className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.p 
                className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 200 }}
              >
                {result.value}
              </motion.p>
              <p className="text-muted-foreground">{result.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto mt-12 text-center"
        >
          <motion.p 
            className="text-xl md:text-2xl font-display text-foreground italic"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          >
            "O RH agora foca em entrevistas e decisões estratégicas, não em triagem manual."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section with Parallax
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const decorY1 = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section id="contato-case" ref={ref} className="py-20 relative overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" 
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-10 md:p-16 rounded-3xl border-primary/30 text-center relative overflow-hidden">
            {/* Background decoration with parallax */}
            <motion.div 
              style={{ y: decorY1 }}
              className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" 
            />
            <motion.div 
              style={{ y: decorY2 }}
              className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" 
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6"
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
                Quer aplicar IA{" "}
                <span className="gradient-text">no seu negócio?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Transforme processos manuais em fluxos inteligentes. 
                Vamos conversar sobre o seu cenário.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
              </motion.div>
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
const CaseIARH = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CaseHeader />
      <main>
        <HeroSection />
        <TransformationSection />
        <FlowSection />
        <ResultsSection />
        <CTASection />
      </main>
      <CaseFooter />
    </div>
  );
};

export default CaseIARH;
