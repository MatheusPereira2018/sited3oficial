import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Users, Mic, Video, ExternalLink, ArrowRight, Brain, BookOpen, TrendingUp, Smile, Star, Send } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { submitFormToN8N, validateContactInfo } from "@/lib/formSubmission";
import logoD3Dark from "@/assets/logo-d3-dark.png";
import logoD3White from "@/assets/logo-d3-white.png";

const palestras = [
  {
    id: "data-driven-decisions",
    title: "Decisões Orientadas por Dados",
    subtitle: "Estratégias para Empresas",
    shortDescription: "Como transformar dados em vantagens competitivas através de dashboards e análises preditivas.",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    duration: "1h 30min",
    speaker: "Matheus Pereira",
    topics: ["Business Intelligence", "Power BI", "Análise Preditiva"],
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    details: {
      description: "Palestra completa sobre como as empresas podem usar dados para tomar decisões estratégicas mais assertivas. Aborda desde a coleta até a visualização de dados.",
      topics: [
        { label: "Coleta de Dados", icon: Users },
        { label: "Business Intelligence", icon: Mic },
        { label: "Análise Preditiva", icon: Video },
      ],
    },
  },
  {
    id: "power-bi-advanced",
    title: "Power BI Avançado",
    subtitle: "Técnicas e Boas Práticas",
    shortDescription: "Domine recursos avançados do Power BI para criar dashboards profissionais e performáticos.",
    icon: Video,
    color: "from-emerald-500 to-teal-500",
    duration: "2h 00min",
    speaker: "Matheus Ribeiro",
    topics: ["Power BI", "DAX", "Performance"],
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    details: {
      description: "Palestra técnica aprofundada sobre recursos avançados do Power BI, incluindo DAX, modelagem de dados e otimização de performance.",
      topics: [
        { label: "Linguagem DAX", icon: Mic },
        { label: "Modelagem de Dados", icon: Users },
        { label: "Performance", icon: Clock },
      ],
    },
  },
  {
    id: "ai-data-analytics",
    title: "IA na Análise de Dados",
    subtitle: "O Futuro da Inteligência Artificial",
    shortDescription: "Como a inteligência artificial está revolucionando a análise de dados e tomada de decisões.",
    icon: Mic,
    color: "from-purple-500 to-pink-500",
    duration: "1h 45min",
    speaker: "Matheus Pereira",
    topics: ["Machine Learning", "IA", "Automação"],
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    details: {
      description: "Exploração dos avanços em inteligência artificial aplicados à análise de dados, incluindo machine learning e automação de processos.",
      topics: [
        { label: "Machine Learning", icon: Video },
        { label: "IA Generativa", icon: Users },
        { label: "Automação", icon: Clock },
      ],
    },
  },
];

const principaisTemas = [
  {
    id: "importancia-dados-logistica",
    title: "A Importância Dos Dados Na Logística",
    description: "Qual a contribuição dos dados e quais tendências estão reservados para o setor de Logística e Supply Chain?",
    image: "/Imagens/palestra-d3-expo.png",
  },
  {
    id: "onde-estou",
    title: "Onde Estou? Reflexão & Tecnologia",
    description: "Uma palestra sobre vida e tecnologia com diversas reflexões alinhadas à necessidades de consumo de dados e tomadas de decisões rápidas e estratégicas.",
    image: "/Imagens/palestra-d3-onde-estou.png",
  },
  {
    id: "rh-tech",
    title: "Recursos Humanos É TECH",
    description: "A importância dos dados e tecnologias atreladas ao processo de inovação e formas de gerir pessoas",
    image: "/Imagens/palestra-d3-3.jpg",
  },
  {
    id: "gestao-negocios",
    title: "Gestão De Negócios",
    description: "Busca de melhor resultado fazendo mais com menos, avaliando produtividade com alta performance",
    image: "/Imagens/palestra-d3-2.jpg",
  },
];

const beneficios = [
  {
    id: "reflexao",
    title: "Reflexão",
    description: "A reflexão é poderosa, pois permite que tome decisões de modo consciente, entenda melhor as lições deixadas pelas experiências, determine o que pode melhorar e, claro, celebre o saldo positivo e reconheça os seus pontos fortes.",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "conhecimento",
    title: "Conhecimento",
    description: "O conhecimento é capaz de transformar vidas e, se utilizado devidamente, contribui significativamente para a construção de um mundo melhor.",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "desempenho",
    title: "Desempenho",
    description: "Avaliar o desempenho da equipe é uma atividade ampla, estratégica, capaz de impactar os resultados. É por meio do acompanhamento do trabalho, do desenvolvimento de competências e da identificação das dificuldades que a equipe cresce e, com ela, a empresa.",
    icon: TrendingUp,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "motivacao",
    title: "Motivação",
    description: "Entre os seus benefícios, estão a melhora na auto estima, a otimização de tempo, já que ela aumenta o foco nas atividades e, com isso, a produtividade, o crescimento pessoal, a melhora nos relacionamentos em equipe e, como dito, melhores resultados para a empresa.",
    icon: Smile,
    color: "from-purple-500 to-pink-500",
  },
];

const depoimentos = [
  {
    id: "jarbas",
    quote: "Agradecemos pela excelente palestra, todos nós gostamos muito da forma de apresentação e conhecer mais das histórias sua e da sua família, Dignificante! Parabéns ao time.",
    name: "Jarbas Mattos",
    role: "DIRETOR UNIP",
    image: "/Imagens/depoimento-d3-1-jarbas.jpg",
    rating: 5,
  },
  {
    id: "rafael",
    quote: "Muito bom, conseguiram mesclar leveza e muito conhecimento! Ponto a ser exaltado é a fácil comunicação dos palestrantes com os alunos e interações extrovertidas! Que seja a primeira de muitas.",
    name: "Rafael De Souza",
    role: "PROFESSOR SENAC",
    image: "/Imagens/depoimento-d3-2-rafael.jpg",
    rating: 5,
  },
];

const feedbacks = [
  { id: 1, image: "/Imagens/feedbacks/feedback-1.png" },
  { id: 2, image: "/Imagens/feedbacks/feedback-2.png" },
  { id: 3, image: "/Imagens/feedbacks/feedback-3.png" },
  { id: 4, image: "/Imagens/feedbacks/feedback-4.png" },
  { id: 5, image: "/Imagens/feedbacks/feedback-5.png" },
  { id: 6, image: "/Imagens/feedbacks/feedback-6.png" },
  { id: 7, image: "/Imagens/feedbacks/feedback-7.png" },
  { id: 8, image: "/Imagens/feedbacks/feedback-8.png" },
];

const Palestras = () => {
  const heroRef = useRef(null);
  const sobreNosRef = useRef(null);
  const principaisTemasRef = useRef(null);
  const beneficiosRef = useRef(null);
  const depoimentosRef = useRef(null);
  const feedbacksRef = useRef(null);
  const palestrasRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const sobreNosInView = useInView(sobreNosRef, { once: true, margin: "-50px" });
  const principaisTemasInView = useInView(principaisTemasRef, { once: true, margin: "-50px" });
  const beneficiosInView = useInView(beneficiosRef, { once: true, margin: "-50px" });
  const depoimentosInView = useInView(depoimentosRef, { once: true, margin: "-50px" });
  const feedbacksInView = useInView(feedbacksRef, { once: true, margin: "-50px" });
  const palestrasInView = useInView(palestrasRef, { once: true, margin: "-50px" });
  const [isDark, setIsDark] = useState(false);
  const [selectedPalestra, setSelectedPalestra] = useState<typeof palestras[0] | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCount = () => {
      const slides = api.scrollSnapList().length;
      setCount(slides);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateCount();
    api.on("select", updateCount);
    api.on("reInit", updateCount);

    return () => {
      api.off("select", updateCount);
      api.off("reInit", updateCount);
    };
  }, [api]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPalestra) return;
    
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      // Preparar dados de contato
      const contactInfo = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        company: formData.get('company') as string,
      };

      // Validar dados de contato
      const validation = validateContactInfo(contactInfo);
      if (!validation.isValid) {
        toast({
          title: "Dados inválidos",
          description: validation.errors.join(", "),
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Preparar dados adicionais
      const additionalInfo = {
        origem: 'interesse_palestra',
        palestraId: selectedPalestra.id,
        palestraTitle: selectedPalestra.title,
        timestamp: new Date().toISOString()
      };

      // Enviar para N8N
      const result = await submitFormToN8N(contactInfo, additionalInfo);

      if (result.success) {
        toast({
          title: "Mensagem enviada!",
          description: "Entraremos em contato o mais breve possível.",
        });
        (e.target as HTMLFormElement).reset();
        setSelectedPalestra(null);
      } else {
        toast({
          title: "Erro ao enviar",
          description: result.message || "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro no envio:', error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

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

      <main className="pt-24 pb-16">
        {/* Hero Banner Section */}
        <section ref={heroRef} className="relative overflow-hidden mb-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content - Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
                  Qual sua
                  <br />
                  visão sobre
                  <br />
                  os Dados e
                  <br />
                  Cultura Data
                  <br />
                  <span className="gradient-text">Driven?</span>
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">
                  Palestras para levar sua equipe,
                  <br />
                  convidados e alunos para um nível
                  <br />
                  superior de conhecimento!
                </p>
                <a href="#contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl px-8 py-6 hover:scale-[1.02] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)] flex items-center justify-center gap-3 group"
                  >
                    Fale Conosco
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </a>
              </motion.div>

              {/* Right Content - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="order-1 lg:order-2"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted">
                  <img
                    src="/Imagens/palestra-d3-1.jpg"
                    alt="Equipe D3 Data em palestra sobre Dados e Cultura Data Driven - Grupo de pessoas no palco com apresentação da D3 data na tela"
                    className="w-full h-auto object-cover min-h-[400px] lg:min-h-[500px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sobre Nós Section */}
        <section ref={sobreNosRef} className="mb-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Right Content - Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={sobreNosInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-2 lg:order-2"
              >
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                  Sobre nós
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Nós da d3Data além de atender empresas de diversos <strong className="text-foreground">segmentos</strong> disseminamos conteúdos de alto nível em universidades e escolas pelo <strong className="text-foreground">Brasil</strong>.
                  </p>
                  <p>
                    Nosso papel é <strong className="text-foreground">incentivar</strong> a reflexão da <strong className="text-foreground">importância dos dados</strong> e tradução das informações para tomada de decisão, além de trazer tendências e <strong className="text-foreground">cases inovadores</strong> para conhecimento e incentivo de <strong className="text-foreground">cocriação ao público</strong>.
                  </p>
                </div>
              </motion.div>

              {/* Left Content - Images Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={sobreNosInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="order-1 lg:order-1"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Image 3 */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg bg-muted aspect-[4/3]">
                    <img
                      src="/Imagens/palestra-d3-3.jpg"
                      alt="Palestra D3 Data - Palestrante no palco"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Image 4 */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg bg-muted aspect-[4/3]">
                    <img
                      src="/Imagens/palestra-d3-4.jpg"
                      alt="Palestra D3 Data - Auditório lotado"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Image 5 */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg bg-muted aspect-[4/3]">
                    <img
                      src="/Imagens/palestra-d3-5.jpg"
                      alt="Palestra D3 Data - Palestrante apresentando"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Image 6 */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg bg-muted aspect-[4/3]">
                    <img
                      src="/Imagens/palestra-d3-6.jpg"
                      alt="Palestra D3 Data - Apresentação em andamento"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={sobreNosInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted aspect-video max-w-4xl mx-auto">
                <iframe
                  title="Vídeo da Palestra D3 Data"
                  src="https://www.youtube.com/embed/9hYCjnvpyic"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Principais Temas Section */}
        <section ref={principaisTemasRef} className="mb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={principaisTemasInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Principais Temas
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Palestras para levar sua equipe, convidados e alunos para um nível superior de conhecimento!
              </p>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {principaisTemas.map((tema, index) => (
                <motion.div
                  key={tema.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={principaisTemasInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className={`bg-background rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${tema.id === 'onde-estou' ? 'cursor-pointer' : ''}`}
                    onClick={tema.id === 'onde-estou' ? () => setShowVideoModal(true) : undefined}
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-video bg-muted overflow-hidden">
                      <img
                        src={tema.image}
                        alt={tema.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-muted"><svg class="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>';
                          }
                        }}
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-3 text-foreground">
                        {tema.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed flex-1">
                        {tema.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios Section */}
        <section ref={beneficiosRef} className="mb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={beneficiosInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Uma palestra pode oferecer mais do que você imagina...
              </h2>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {beneficios.map((beneficio, index) => (
                <motion.div
                  key={beneficio.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={beneficiosInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${beneficio.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <beneficio.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-4 text-foreground">
                    {beneficio.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {beneficio.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section ref={depoimentosRef} className="mb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={depoimentosInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                O que os nossos clientes dizem
              </h2>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {depoimentos.map((depoimento, index) => (
                <motion.div
                  key={depoimento.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={depoimentosInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Quote */}
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                    "{depoimento.quote}"
                  </p>
                  
                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4">
                    {/* Profile Picture */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                      <img
                        src={depoimento.image}
                        alt={depoimento.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-muted"><svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>';
                          }
                        }}
                      />
                    </div>
                    
                    {/* Name and Role */}
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-1">
                        {depoimento.name}
                      </h3>
                      <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">
                        {depoimento.role}
                      </p>
                      
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(depoimento.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedbacks Carousel Section */}
        <section ref={feedbacksRef} className="mb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={feedbacksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Feedbacks dos nossos clientes
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={feedbacksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-6xl mx-auto"
            >
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {feedbacks.map((feedback) => (
                    <CarouselItem key={feedback.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="relative rounded-xl overflow-hidden bg-background border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img
                          src={feedback.image}
                          alt={`Feedback ${feedback.id}`}
                          className="w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:-left-12 bg-background/80 backdrop-blur-sm border-2 hover:bg-background" />
                <CarouselNext className="right-2 md:-right-12 bg-background/80 backdrop-blur-sm border-2 hover:bg-background" />
              </Carousel>

              {/* Dots Navigation */}
              {count > 0 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  {Array.from({ length: count }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        current === index + 1
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <div ref={palestrasRef} className="container mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={palestrasInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
              <Mic className="w-4 h-4" />
              Palestras e Webinars
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Compartilhando{" "}
              <span className="gradient-text">conhecimento</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Assista às nossas palestras sobre dados, BI e tecnologia.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {palestras.map((palestra, index) => (
              <motion.div
                key={palestra.id}
                initial={{ opacity: 0, y: 30 }}
                animate={palestrasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  onClick={() => setSelectedPalestra(palestra)}
                  className="glass-card rounded-2xl p-6 cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] h-full flex flex-col"
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${palestra.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <palestra.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {palestra.subtitle}
                    </span>
                    <h3 className="font-display text-xl font-bold mt-1 mb-2 group-hover:text-primary transition-colors">
                      {palestra.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {palestra.shortDescription}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {palestra.duration}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {palestra.speaker}
                      </div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                    {palestra.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4" />
                    Assistir palestra
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal de Vídeo - Onde Estou */}
      <div className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm transition-opacity duration-300 ${
        showVideoModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`fixed inset-0 flex items-center justify-center p-4 transition-transform duration-300 ${
          showVideoModal ? 'scale-100' : 'scale-95'
        }`}>
          {showVideoModal && (
            <div className="bg-background rounded-2xl border border-border shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-background shrink-0">
                <div>
                  <h3 className="font-display font-bold text-xl">Onde Estou? Reflexão & Tecnologia</h3>
                  <p className="text-sm text-muted-foreground mt-1">Uma palestra sobre vida e tecnologia</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowVideoModal(false)}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </div>

              {/* Video Section */}
              <div className="flex-1 min-h-0 p-6">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted">
                  <iframe
                    title="Onde Estou? Reflexão & Tecnologia"
                    src="https://www.youtube.com/embed/fP2bVUZj1gw"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dialog com Formulário de Contato */}
      <Dialog open={!!selectedPalestra} onOpenChange={(open) => !open && setSelectedPalestra(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Tenho interesse em trazer esta palestra para minha empresa
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {selectedPalestra && (
                <>
                  Preencha seus dados abaixo e entraremos em contato para agendar a palestra{" "}
                  <strong className="text-foreground">"{selectedPalestra.title}"</strong> na sua empresa.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPalestra && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome completo *
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Seu nome completo"
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-mail corporativo *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="seu@empresa.com"
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefone *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Empresa *
                </label>
                <Input
                  id="company"
                  name="company"
                  required
                  placeholder="Nome da empresa"
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl px-6 py-3 hover:scale-[1.02] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar solicitação
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-center text-muted-foreground text-xs">
                Respondemos em até 24 horas úteis.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Palestras;