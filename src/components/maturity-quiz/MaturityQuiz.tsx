import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { maturityQuestions, dimensions } from "./maturityQuizConfig";
import { MaturityResultPage } from "./MaturityResultPage";
import { LeadCaptureStep, ContactInfo } from "./LeadCaptureStep";

export const MaturityQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

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
      // Finished questions, show lead capture
      setShowLeadCapture(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLeadSubmit = (info: ContactInfo) => {
    setContactInfo(info);
    setShowLeadCapture(false);
    setShowResult(true);
  };

  const handleLeadBack = () => {
    setShowLeadCapture(false);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowLeadCapture(false);
    setShowResult(false);
    setContactInfo(null);
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  if (showResult && contactInfo) {
    return (
      <MaturityResultPage 
        answers={answers} 
        contactInfo={contactInfo}
        onRestart={handleRestart} 
      />
    );
  }

  if (showLeadCapture) {
    return (
      <LeadCaptureStep 
        onSubmit={handleLeadSubmit} 
        onBack={handleLeadBack} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="font-display text-xl font-bold">Diagnóstico de Maturidade de Dados</h1>
              <p className="text-white/80 text-sm">Descubra o nível de maturidade da sua empresa em dados</p>
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
          <div className="flex justify-between mt-2 text-white/80 text-sm">
            <span>Pergunta {currentStep + 1} de {totalSteps}</span>
            <span>{currentDimension?.name}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
                style={{ 
                  backgroundColor: `${currentDimension.color}15`,
                  color: currentDimension.color 
                }}
              >
                <currentDimension.icon className="w-4 h-4" />
                {currentDimension.name}
              </div>
            )}

            {/* Question */}
            <div className="flex items-start gap-4 mb-8">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${currentDimension?.color}15` }}
              >
                <currentQuestion.icon 
                  className="w-7 h-7" 
                  style={{ color: currentDimension?.color }} 
                />
              </div>
              <h2 className="font-display text-2xl font-bold leading-tight pt-2">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectOption(option.value)}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                    isSelected(option.value)
                      ? "border-primary bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                      : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold mb-1">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected(option.value)
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {isSelected(option.value) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full bg-primary-foreground"
                        />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
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
      </div>
    </div>
  );
};
