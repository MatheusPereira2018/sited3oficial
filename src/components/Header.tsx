import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import logoD3Dark from "@/assets/logo-d3-dark.png";

const navLinks = [
  { href: "#home", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#cases", label: "Cases" },
  { href: "/palestras", label: "Palestras" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#clientes", label: "Clientes" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [currentLogo, setCurrentLogo] = useState(logoD3Dark);
  const { resolvedTheme } = useTheme();

  // Memoiza as seções para evitar recalcular
  const sections = useMemo(() => navLinks.map(link => link.href.replace('#', '')), []);

  // Throttle function para otimizar scroll
  const throttle = useCallback((func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Detect active section - otimizado
      if (scrollY < 100) {
        setActiveSection('home');
        return;
      }
      
      const scrollPosition = scrollY + 150;
      let newActiveSection = 'home';
      
      // Busca reversa otimizada
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            newActiveSection = sections[i];
            break;
          }
        }
      }
      
      setActiveSection(prev => prev !== newActiveSection ? newActiveSection : prev);
    }, 100); // Throttle de 100ms
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, throttle]);

  useEffect(() => {
    // Atualiza a logo quando o tema mudar - otimizado
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') || resolvedTheme === "dark";
      const newLogo = isDark ? "/Imagens/logo%20dark%20mode.png" : logoD3Dark;
      setCurrentLogo(prev => prev !== newLogo ? newLogo : prev);
    };
    
    checkTheme();
    
    // Observa mudanças no tema apenas se necessário
    if (resolvedTheme === undefined) {
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
      
      return () => observer.disconnect();
    }
  }, [resolvedTheme]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-2 md:py-3" : "py-3 md:py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between md:justify-start">
        {/* Logo - Left */}
        <a href="#home" className="flex items-center flex-shrink-0">
          <img 
            src={currentLogo} 
            alt="D3 Data" 
            className="h-8 sm:h-10 md:h-14 w-auto dark:brightness-0 dark:invert"
          />
        </a>

        {/* Desktop Nav - Centered */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center mx-8">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium pointer-events-auto ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side - Theme Toggle and Button */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0 ml-auto">
          <ThemeToggle />
          <a href="#contato" className="pointer-events-auto">
            <Button className="bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl px-6 py-3 hover:scale-[1.02] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)] flex items-center justify-center gap-3 group pointer-events-auto">
              Fale Conosco
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mt-4 mx-6 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`transition-colors font-medium py-2 pointer-events-auto ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              
              <a href="#contato" onClick={() => setIsMobileMenuOpen(false)} className="pointer-events-auto">
                <Button className="bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl px-6 py-3 hover:scale-[1.02] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)] flex items-center justify-center gap-3 group w-full mt-2 pointer-events-auto">
                  Fale Conosco
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
