import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Import client logos
import logoEixoSP from "@/assets/clients/eixo-sp.png";
import logoEntrevias from "@/assets/clients/entrevias.png";
import logoNutrivet from "@/assets/clients/nutrivet.png";
import logoCheckApp from "@/assets/clients/checkapp.png";
import logoRelieve from "@/assets/clients/relieve.png";
import logoIT4D from "@/assets/clients/it4d.png";
import logoStartTel from "@/assets/clients/starttel.png";
import logoEcoterra from "@/assets/clients/ecoterra.png";
import logoImpactaTech from "@/assets/clients/impactatech.jpg";
import logoHiddenSushi from "@/assets/clients/hidden-sushi.png";
import logoCamil from "@/assets/clients/camil.png";
import logoUniao from "@/assets/clients/uniao.png";
import logoCoqueiro from "@/assets/clients/coqueiro.png";
import logoSantaAmalia from "@/assets/clients/santa-amalia.png";
import logoNamorado from "@/assets/clients/namorado.png";
import logoPescador from "@/assets/clients/pescador.png";
import logoMabel from "@/assets/clients/mabel.png";

const logos = [
  { src: logoCamil, alt: "Camil" },
  { src: logoUniao, alt: "União" },
  { src: logoCoqueiro, alt: "Coqueiro" },
  { src: logoSantaAmalia, alt: "Santa Amália" },
  { src: logoNamorado, alt: "Namorado" },
  { src: logoPescador, alt: "Pescador" },
  { src: logoMabel, alt: "Mabel" },
  { src: logoEixoSP, alt: "Eixo SP" },
  { src: logoEntrevias, alt: "Entrevias" },
  { src: logoNutrivet, alt: "Nutrivet" },
  { src: logoCheckApp, alt: "CheckApp" },
  { src: logoRelieve, alt: "Relieve Tecnologia" },
  { src: logoIT4D, alt: "IT4D" },
  { src: logoStartTel, alt: "StartTel" },
  { src: logoEcoterra, alt: "Ecoterra" },
  { src: logoImpactaTech, alt: "Impacta Tech" },
  { src: logoHiddenSushi, alt: "Hidden Sushi" },
];


const LogoItem = ({ 
  logo, 
  index 
}: { 
  logo: typeof logos[0];
  index: number;
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [grayscale, setGrayscale] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateLogoStyle = () => {
      if (!logoRef.current) return;

      // No mobile, manter logos com cor (sem grayscale)
      if (isMobile) {
        setGrayscale(0);
        setOpacity(1);
        return;
      }

      const rect = logoRef.current.getBoundingClientRect();
      const logoCenterX = rect.left + rect.width / 2;
      const viewportCenterX = window.innerWidth / 2;
      const distanceFromCenter = Math.abs(logoCenterX - viewportCenterX);
      const maxDistance = window.innerWidth / 2;

      // Calcular grayscale e opacity baseado na distância do centro
      // Quanto mais próximo do centro, menos grayscale (mais cor)
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
      const newGrayscale = Math.min(100, normalizedDistance * 100);
      const newOpacity = 0.35 + (1 - normalizedDistance) * 0.65;

      setGrayscale(newGrayscale);
      setOpacity(newOpacity);
    };

    updateLogoStyle();
    let animationFrame: number;
    
    const animate = () => {
      updateLogoStyle();
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isMobile]);

  return (
    <div ref={logoRef} className="flex-shrink-0 relative z-20 flex items-center justify-center">
      <img
        src={logo.src}
        alt={logo.alt}
        className="logo-carousel h-10 sm:h-12 md:h-14 w-auto object-contain max-w-[120px] sm:max-w-[140px] md:max-w-[160px]"
        style={{
          filter: `grayscale(${grayscale}%)`,
          opacity: opacity,
          transition: 'filter 0.6s ease, opacity 0.6s ease',
        }}
      />
    </div>
  );
};

export const LogosBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);
  // Criar múltiplas cópias para garantir loop infinito perfeito
  const duplicatedLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 bg-background overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <motion.div 
          ref={containerRef} 
          className="relative logos-container w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Gradient fade overlays nas laterais */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
          
          {/* Continuous scrolling container */}
          <motion.div
            ref={scrollContainerRef}
            className="flex items-center gap-12 sm:gap-16 md:gap-24 relative z-0"
            style={{ 
              willChange: 'transform',
              width: 'max-content'
            }}
            animate={{
              x: ["0%", "-33.333%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: isMobile ? 20 : 12,
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <LogoItem 
                key={`${logo.alt}-${index}`} 
                logo={logo}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
