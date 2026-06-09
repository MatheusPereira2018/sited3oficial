import { Linkedin, Instagram } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import logoD3Dark from "@/assets/logo-d3-dark.png";
import azureAiFundamentals from "@/assets/certifications/azure-ai-fundamentals.png";
import dataAnalystAssociate from "@/assets/certifications/data-analyst-associate.png";
import powerBiAnalyst from "@/assets/certifications/power-bi-analyst.jpg";
import microsoftAssociate from "@/assets/certifications/microsoft-associate.png";

const certifications = [
  { src: azureAiFundamentals, alt: "Microsoft Azure AI Fundamentals" },
  { src: dataAnalystAssociate, alt: "Microsoft Data Analyst Associate" },
  { src: powerBiAnalyst, alt: "Microsoft Power BI Data Analyst" },
  { src: microsoftAssociate, alt: "Microsoft Certified Associate" },
];

const footerLinks = {
  empresa: [
    { label: "Nossa Abordagem", href: "#solucao" },
    { label: "Formas de Atuação", href: "#modelo" },
    { label: "Clientes", href: "#clientes" },
    { label: "Contato", href: "#contato" },
  ],
  solucoes: [
    { label: "Consultoria Estratégica", href: "#modelo" },
    { label: "Alocação de Especialistas", href: "#modelo" },
    { label: "Diagnóstico de Maturidade", href: "#solucao" },
    { label: "Governança de Dados", href: "#solucao" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/d3data", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/d3dataconsultoria", label: "Instagram" },
];

export const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [currentLogo, setCurrentLogo] = useState(logoD3Dark);

  useEffect(() => {
    // Atualiza a logo quando o tema mudar - mesma lógica do Header
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
    <footer className="border-t border-border/50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center mb-4">
              <img 
                src={currentLogo} 
                alt="D3 Data" 
                className="h-12 w-auto"
              />
            </a>
            <p className="text-muted-foreground max-w-sm mb-6">
              Inteligência de dados que transforma a forma como sua empresa decide e cresce. 
              Parceiros estratégicos para operações complexas.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Soluções</h4>
            <ul className="space-y-3">
              {footerLinks.solucoes.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-border/50 pt-8 pb-6">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Time certificado Microsoft
            </span>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {certifications.map((cert) => (
                <img
                  key={cert.alt}
                  src={cert.src}
                  alt={cert.alt}
                  title={cert.alt}
                  className="h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 D3 Data. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-sm">
            Ribeirão Preto, SP · contato@d3data.com.br
          </p>
        </div>
      </div>
    </footer>
  );
};
