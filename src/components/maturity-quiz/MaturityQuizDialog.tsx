import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, BarChart3, User, Building2, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { maturityQuestions, dimensions } from "./maturityQuizConfig";
import { MaturityResultPage } from "./MaturityResultPage";
import { ContactInfo } from "./LeadCaptureStep";

interface MaturityQuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MaturityQuizDialog = ({ open, onOpenChange }: MaturityQuizDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const { toast } = useToast();

  const totalSteps = maturityQuestions.length;
  const currentQuestion = maturityQuestions[currentStep];
  const currentDimension = dimensions.find(d => d.id === currentQuestion?.dimension);

  const handleSelectOption = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const isSelected = (value: string) => {
    return answers[currentQuestion?.id] === value;
  };

  const hasAnswer = () => {
    return !!answers[currentQuestion?.id];
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowLeadCapture(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLeadBack = () => {
    setShowLeadCapture(false);
  };

  const handleLeadSubmit = () => {
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

    setShowLeadCapture(false);
    setShowResult(true);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowLeadCapture(false);
    setShowResult(false);
    setContactInfo({ name: "", email: "", phone: "", company: "" });
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      handleRestart();
    }, 300);
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  if (showResult) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0">
          <DialogTitle className="sr-only">Resultado do Diagnóstico de Maturidade</DialogTitle>
          <DialogDescription className="sr-only">Veja seu nível de maturidade em dados e recomendações personalizadas</DialogDescription>
          <MaturityResultPage 
            answers={answers} 
            contactInfo={contactInfo}
            onRestart={handleRestart} 
          />
        </DialogContent>
      </Dialog>
    );
  }

  if (showLeadCapture) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden border-primary/20 bg-background">
          <DialogTitle className="sr-only">Captura de Dados de Contato</DialogTitle>
          <DialogDescription className="sr-only">Forneça seus dados para receber o diagnóstico completo</DialogDescription>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-center">
            <h2 className="font-display text-xl font-bold text-white mb-1">
              Quase lá! 🎯
            </h2>
            <p className="text-white/80 text-sm">
              Para ver seu resultado, preencha seus dados
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <p className="text-muted-foreground text-sm text-center mb-6">
              Seus dados serão usados apenas para enviar o diagnóstico.
            </p>

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
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  WhatsApp *
                </label>
                <Input
                  placeholder="(11) 99999-9999"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={handleLeadBack} className="flex-1">
                Voltar
              </Button>
              <Button
                onClick={handleLeadSubmit}
                className="flex-1 bg-success hover:bg-success/90 text-success-foreground gap-2"
              >
                Ver resultado
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              🔒 Seus dados estão seguros.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[650px] p-0 gap-0 overflow-hidden border-primary/20 bg-background">
        <DialogTitle className="sr-only">Diagnóstico de Maturidade de Dados</DialogTitle>
        <DialogDescription className="sr-only">Responda às perguntas para avaliar o nível de maturidade da sua empresa em dados</DialogDescription>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div className="text-white">
              <h2 className="font-display text-lg font-bold">Diagnóstico de Maturidade</h2>
              <p className="text-white/80 text-sm">Descubra o nível de maturidade da sua empresa</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-white/80 text-xs">
            <span>Pergunta {currentStep + 1} de {totalSteps}</span>
            <span>{currentDimension?.name}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dimension Badge */}
              {currentDimension && (
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
                  style={{ 
                    backgroundColor: `${currentDimension.color}15`,
                    color: currentDimension.color 
                  }}
                >
                  <currentDimension.icon className="w-3.5 h-3.5" />
                  {currentDimension.name}
                </div>
              )}

              {/* Question */}
              <div className="flex items-start gap-3 mb-6">
                <div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${currentDimension?.color}15` }}
                >
                  <currentQuestion.icon 
                    className="w-5 h-5" 
                    style={{ color: currentDimension?.color }} 
                  />
                </div>
                <h3 className="font-display text-lg font-bold leading-snug pt-1">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid gap-2">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelectOption(option.value)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      isSelected(option.value)
                        ? "border-primary bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                        : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-sm">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected(option.value)
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {isSelected(option.value) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-primary-foreground"
                          />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 flex justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>

          <Button
            onClick={handleNext}
            disabled={!hasAnswer()}
            className="bg-success hover:bg-success/90 text-success-foreground gap-2"
          >
            {currentStep === totalSteps - 1 ? "Continuar" : "Próxima"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
