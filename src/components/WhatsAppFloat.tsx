import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { submitFormToN8N, validateContactInfo } from "@/lib/formSubmission";

const WHATSAPP_NUMBER = "5516997522363";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais sobre os serviços da D3 Data.";

export const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form when closing
      setFormData({ name: "", email: "", phone: "", company: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar dados de contato
      const validation = validateContactInfo(formData);
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
        origem: 'whatsapp_float',
        timestamp: new Date().toISOString()
      };

      // Enviar para N8N
      const result = await submitFormToN8N(formData, additionalInfo);

      if (result.success) {
        toast({
          title: "Dados enviados!",
          description: "Redirecionando para o WhatsApp...",
        });

        // Fechar modal e redirecionar para WhatsApp
        setIsOpen(false);
        
        // Pequeno delay para o toast aparecer
        setTimeout(() => {
          const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
          window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        }, 500);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              Falar no WhatsApp
            </DialogTitle>
            <DialogDescription>
              Preencha seus dados para continuarmos a conversa no WhatsApp
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nome completo *
              </label>
              <Input
                required
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-background/50 border-border focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                E-mail *
              </label>
              <Input
                type="email"
                required
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-background/50 border-border focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Telefone *
              </label>
              <Input
                type="tel"
                required
                placeholder="(16) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-background/50 border-border focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Empresa
              </label>
              <Input
                placeholder="Nome da empresa (opcional)"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="bg-background/50 border-border focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  Continuar no WhatsApp
                  <Send className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7" fill="currentColor" />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </motion.button>
    </>
  );
};
