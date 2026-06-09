import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Database, BarChart3, Palette, Brain, Layers, Compass } from "lucide-react";
import { Link } from "react-router-dom";

// Componente separado para cada card de case
const CaseCard = ({ caseItem, index, activeCategory }: { caseItem: any; index: number; activeCategory: string }) => {
  const caseRef = useRef(null);
  const caseInView = useInView(caseRef, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={caseRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={caseInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Link 
        to={
          caseItem.id === "ia-rh" ? "/case/ia-rh" :
          caseItem.id === "oraculo" ? "/case/oraculo" :
          caseItem.id === "naturin-vendas" ? "/case/naturin-vendas" :
          caseItem.id === "chackapp" ? "/case/chackapp" :
          caseItem.id === "copa-mundo" ? "/case/copa-mundo" :
          `/cases#${caseItem.id}`
        }
        className="group block h-full pointer-events-auto"
      >
        <div className="relative h-full rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_60px_hsl(var(--primary)/0.15)] pointer-events-auto">
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden">
            <img 
              src={caseItem.image} 
              alt={caseItem.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a4d7a] via-[#0d5a8f] to-[#0a4d7a] flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-white text-sm text-center mb-6 leading-relaxed">
                {caseItem.description}
              </p>
              <span className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/30 hover:scale-[1.02] transition-all duration-300 pointer-events-auto">
                Ver case completo
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
              {caseItem.subtitle}
            </span>
            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {caseItem.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const caseCategories = [
  {
    id: "jornada-dados",
    name: "Jornada de Dados",
    icon: Database,
    cases: [
      {
        id: "oraculo",
        title: "Oráculo Analytics",
        subtitle: "Shopping Center Analytics",
        description: "Análise de fluxo de veículos e comportamento do consumidor em tempo real para tomada de decisão estratégica.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      },
      {
        id: "naturin-vendas",
        title: "Naturin Vendas",
        subtitle: "Gestão Comercial Inteligente",
        description: "Dashboard de KPIs comerciais em tempo real. Transformamos relatórios mensais em insights diários.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      },
    ],
  },
  {
    id: "analytics",
    name: "Plataformas de Analytics",
    icon: BarChart3,
    cases: [
      {
        id: "chackapp",
        title: "ChackApp",
        subtitle: "Operação em Campo",
        description: "Coleta de dados em campo via app mobile, integração em tempo real com BI corporativo.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      },
    ],
  },
  {
    id: "design-dados",
    name: "Design de Dados",
    icon: Palette,
    cases: [
      {
        id: "copa-mundo",
        title: "Dash Copa do Mundo",
        subtitle: "Storytelling Visual",
        description: "Visualização interativa da história das Copas desde 1930. 3º lugar no Power BI Experience.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
      },
    ],
  },
  {
    id: "ia",
    name: "Inteligência Artificial",
    icon: Brain,
    cases: [
      {
        id: "ia-rh",
        title: "IA aplicada ao RH",
        subtitle: "Automação de Recrutamento",
        description: "Triagem automatizada de currículos e análise preditiva de fit cultural com Machine Learning.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      },
    ],
  },
];

export const CasesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(caseCategories[0]?.id || "");

  const currentCategory = caseCategories.find(c => c.id === activeCategory);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId && caseCategories.some(c => c.id === categoryId)) {
      setActiveCategory(categoryId);
    }
  };

  return (
    <section id="cases" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Cases de <span className="gradient-text">sucesso</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja na prática como transformamos dados em resultados reais para nossos clientes
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mb-14"
        >
          {caseCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.nativeEvent?.stopImmediatePropagation();
                  handleCategoryChange(category.id);
                  return false;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCategoryChange(category.id);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 pointer-events-auto cursor-pointer select-none w-full sm:w-auto ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                }`}
                style={{ userSelect: 'none' }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-center">{category.name}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Cases Grid */}
        {currentCategory && currentCategory.cases && currentCategory.cases.length > 0 ? (
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentCategory.cases.map((caseItem, index) => (
              <CaseCard 
                key={`${activeCategory}-${caseItem.id}`}
                caseItem={caseItem}
                index={index}
                activeCategory={activeCategory}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12 text-muted-foreground"
          >
            <p>Nenhum case encontrado para esta categoria.</p>
          </motion.div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link 
            to="/cases"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-[1.02] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)] transition-all duration-300 group pointer-events-auto"
          >
            Ver todos os cases
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};