import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Send, CheckCircle2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { QuizConfig } from "./quizConfigs";
import { submitFormToN8N, validateContactInfo } from "@/lib/formSubmission";

// Google Sheets webhook URL - replace with your Google Apps Script URL
const GOOGLE_SHEETS_WEBHOOK = "";

interface GenericQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: QuizConfig;
}

export const GenericQuiz = ({ open, onOpenChange, config }: GenericQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const { questions, title, subtitle, icon: HeaderIcon, accentColor, successMessage, id: quizId } = config;
  const totalSteps = questions.length + 1;
  const isContactStep = currentStep === questions.length;
  const currentQuestion = questions[currentStep];

  const handleSelectOption = (value: string) => {
    const currentAnswers = answers[currentStep] || [];
    const question = questions[currentStep];
    
    if (question.multiSelect) {
      if (currentAnswers.includes(value)) {
        setAnswers({ ...answers, [currentStep]: currentAnswers.filter(v => v !== value) });
      } else {
        setAnswers({ ...answers, [currentStep]: [...currentAnswers, value] });
      }
    } else {
      setAnswers({ ...answers, [currentStep]: [value] });
    }
  };

  const isSelected = (value: string) => {
    return (answers[currentStep] || []).includes(value);
  };

  const hasAnswer = () => {
    return (answers[currentStep] || []).length > 0;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatAnswersForSheet = () => {
    const formattedAnswers: Record<string, string> = {};
    questions.forEach((q, index) => {
      const questionAnswers = answers[index] || [];
      formattedAnswers[`pergunta_${index + 1}_titulo`] = q.question;
      formattedAnswers[`pergunta_${index + 1}_respostas`] = questionAnswers.join(", ");
    });
    return formattedAnswers;
  };

  const handleSubmit = async () => {
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Validar dados de contato usando função centralizada
    const validation = validateContactInfo(contactInfo);
    if (!validation.isValid) {
      toast({
        title: "Dados inválidos",
        description: validation.errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const additionalInfo = {
        origem: quizId,
        timestamp: new Date().toISOString(),
        quiz_type: quizId,
        ...formatAnswersForSheet(),
        respostas_raw: JSON.stringify(answers),
      };

      const result = await submitFormToN8N(contactInfo, additionalInfo);

      if (result.success) {
        toast({
          title: "Diagnóstico enviado!",
          description: "Em breve entraremos em contato.",
        });
        setIsCompleted(true);
      } else {
        toast({
          title: "Erro ao enviar",
          description: result.message || "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setCurrentStep(0);
      setAnswers({});
      setContactInfo({ name: "", email: "", phone: "", company: "" });
      setIsCompleted(false);
    }, 300);
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;
  const colorClass = accentColor === "accent" ? "accent" : "primary";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden border-primary/20 bg-background">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{subtitle}</DialogDescription>
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl bg-${colorClass}/10 flex items-center justify-center`}>
              <HeaderIcon className={`w-5 h-5 text-${colorClass}`} />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">{title}</h2>
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${accentColor === "accent" ? "from-accent to-primary" : "from-primary to-accent"}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {currentStep + 1} de {totalSteps}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {isCompleted ? (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className={`w-20 h-20 rounded-full bg-${colorClass}/10 flex items-center justify-center mb-6`}>
                  <CheckCircle2 className={`w-10 h-10 text-${colorClass}`} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Obrigado!</h3>
                <p className="text-muted-foreground max-w-sm">
                  {successMessage}
                </p>
                <Button onClick={handleClose} className="mt-8">
                  Fechar
                </Button>
              </motion.div>
            ) : isContactStep ? (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Send className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">Quase lá!</h3>
                    <p className="text-muted-foreground text-sm">Preencha seus dados para receber o diagnóstico</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Nome *</label>
                    <Input
                      placeholder="Seu nome completo"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">E-mail *</label>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">WhatsApp *</label>
                    <Input
                      placeholder="(11) 99999-9999"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Empresa</label>
                    <Input
                      placeholder="Nome da empresa"
                      value={contactInfo.company}
                      onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-xl bg-${colorClass}/10 flex items-center justify-center`}>
                    <currentQuestion.icon className={`w-6 h-6 text-${colorClass}`} />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{currentQuestion.question}</h3>
                </div>
                
                {currentQuestion.multiSelect && (
                  <p className="text-sm text-muted-foreground mb-4 ml-15">
                    Selecione todas que se aplicam
                  </p>
                )}

                <div className="grid gap-3 mt-4">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelectOption(option.value)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected(option.value)
                          ? `border-${colorClass} bg-${colorClass}/10 shadow-[0_0_20px_hsl(var(--${colorClass})/0.15)]`
                          : `border-border/50 hover:border-${colorClass}/50 hover:bg-muted/50`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-${currentQuestion.multiSelect ? 'md' : 'full'} border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected(option.value)
                              ? `border-${colorClass} bg-${colorClass}`
                              : "border-muted-foreground/30"
                          }`}
                        >
                          {isSelected(option.value) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              {currentQuestion.multiSelect ? (
                                <Check className={`w-3 h-3 text-${colorClass}-foreground`} />
                              ) : (
                                <div className={`w-2 h-2 rounded-full bg-${colorClass}-foreground`} />
                              )}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!isCompleted && (
          <div className="p-6 pt-4 border-t border-border/50 flex justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </Button>

            {isContactStep ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 gap-2"
              >
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    Enviar diagnóstico
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!hasAnswer()}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 gap-2"
              >
                Próxima
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
