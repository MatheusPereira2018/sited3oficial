import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LogosBanner } from "@/components/LogosBanner";
import { MaturityCTABanner } from "@/components/MaturityCTABanner";
import { ServicesSection } from "@/components/ServicesSection";
import { CasesSection } from "@/components/CasesSection";
import { ROICTASection } from "@/components/ROICTASection";
import { DifferentialsSection } from "@/components/DifferentialsSection";
import { ClientsSection } from "@/components/ClientsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { FloatingDataElements } from "@/components/FloatingDataElements";


const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingDataElements />
      <Header />
      <main>
        <HeroSection />
        <LogosBanner />
        <MaturityCTABanner />
        <ServicesSection />
        <CasesSection />
        <ROICTASection />
        <DifferentialsSection />
        <ClientsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
