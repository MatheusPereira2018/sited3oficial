import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, User, Building2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface LeadCaptureStepProps {
  onSubmit: (contactInfo: ContactInfo) => void;
  onBack: () => void;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export const LeadCaptureStep = ({ onSubmit, onBack }: LeadCaptureStepProps) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, e-mail e WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      });
      return;
    }

    // Validar telefone
    const cleanPhone = contactInfo.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, insira um telefone com DDD e número completo.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(contactInfo);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-8 px-4">
        <div className="container mx-auto">
          <div className="text-white text-center">
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Quase lá! 🎯
            </h1>
            <p className="text-white/80">
              Para ver seu resultado personalizado, preencha seus dados abaixo
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              Seus dados serão usados apenas para enviar o diagnóstico e, se desejar, agendar uma consultoria.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Nome completo *
              </label>
              <Input
                placeholder="Seu nome"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                Empresa
              </label>
              <Input
                placeholder="Nome da empresa"
                value={contactInfo.company}
                onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                E-mail corporativo *
              </label>
              <Input
                type="email"
                placeholder="seu@empresa.com"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Telefone *
              </label>
              <Input
                placeholder="(11) 99999-9999"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="h-12"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Voltar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-primary to-accent gap-2"
            >
              Ver meu resultado
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            🔒 Seus dados estão seguros e não serão compartilhados.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
