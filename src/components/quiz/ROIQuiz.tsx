import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Clock, AlertTriangle, TrendingUp, ArrowRight, ArrowLeft, Loader2, CheckCircle, Phone, Info, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { submitFormToN8N, validateContactInfo } from "@/lib/formSubmission";

interface ROIQuestion {
  id: number;
  question: string;
  description: string;
  icon: React.ElementType;
  options: { value: number; label: string; impact: string }[];
}

const questions: ROIQuestion[] = [
  {
    id: 1,
    question: "Quantas pessoas trabalham diretamente com dados na sua empresa?",
    description: "Analistas, coordenadores, gestores que usam planilhas ou relatórios",
    icon: Users,
    options: [
      { value: 1, label: "1 a 2 pessoas", impact: "Equipe enxuta" },
      { value: 3, label: "3 a 5 pessoas", impact: "Equipe média" },
      { value: 8, label: "6 a 10 pessoas", impact: "Equipe grande" },
      { value: 15, label: "Mais de 10 pessoas", impact: "Operação robusta" },
    ],
  },
  {
    id: 2,
    question: "Quantas horas por semana cada pessoa gasta consolidando dados manualmente?",
    description: "Pense em coleta, limpeza e organização de planilhas",
    icon: Clock,
    options: [
      { value: 5, label: "Menos de 5h", impact: "Perda mínima" },
      { value: 15, label: "5 a 15h", impact: "Moderado" },
      { value: 30, label: "15 a 30h", impact: "Significativo" },
      { value: 50, label: "Mais de 30h", impact: "Crítico" },
    ],
  },
  {
    id: 3,
    question: "Com que frequência decisões são tomadas com dados desatualizados?",
    description: "Decisões baseadas em relatórios de semanas atrás",
    icon: AlertTriangle,
    options: [
      { value: 10, label: "Raramente", impact: "Risco baixo" },
      { value: 30, label: "Às vezes", impact: "Risco moderado" },
      { value: 60, label: "Frequentemente", impact: "Risco alto" },
      { value: 100, label: "Sempre", impact: "Risco crítico" },
    ],
  },
  {
    id: 4,
    question: "Qual o impacto quando diferentes áreas apresentam números conflitantes?",
    description: "Vendas diz X, financeiro diz Y, operações diz Z",
    icon: TrendingUp,
    options: [
      { value: 5, label: "Quase nunca acontece", impact: "Mínimo" },
      { value: 20, label: "Gera retrabalho", impact: "Horas perdidas" },
      { value: 50, label: "Atrasa decisões", impact: "Oportunidades perdidas" },
      { value: 100, label: "Gera crises", impact: "Impacto em resultados" },
    ],
  },
];

interface ROIQuizProps {
  onClose?: () => void;
}

const ROIQuiz = ({ onClose }: ROIQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [leadData, setLeadData] = useState({ name: "", phone: "", email: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const totalSteps = questions.length + 1; // questions + lead capture
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setCurrentStep(questions.length), 300);
    }
  };

  const calculateROI = () => {
    // Custo médio hora de analista: R$ 50
    const hourlyRate = 50;
    const hoursPerMonth = 4; // semanas
    
    // Resposta 1: número de pessoas na equipe (1, 3, 8, 15)
    const teamSize = answers[0] || 1;
    
    // Resposta 2: horas manuais por pessoa (5, 15, 30, 50)
    const manualHours = answers[1] || 0;
    const manualCost = manualHours * hoursPerMonth * hourlyRate * teamSize;
    
    // Resposta 3: frequência de decisões erradas (10, 30, 60, 100) - % de impacto
    const decisionRisk = answers[2] || 0;
    const decisionCost = decisionRisk * 80 * (teamSize / 2); // escala com equipe
    
    // Resposta 4: conflito de dados (5, 20, 50, 100) - retrabalho
    const conflictImpact = answers[3] || 0;
    const conflictCost = conflictImpact * 60 * (teamSize / 2); // escala com equipe
    
    const monthlyLoss = manualCost + decisionCost + conflictCost;
    
    return {
      monthlyLoss,
      yearlyLoss: monthlyLoss * 12,
      breakdown: {
        manual: manualCost,
        decisions: decisionCost,
        conflicts: conflictCost,
      },
      manualHours,
      teamSize,
    };
  };

  const handleSubmit = async () => {
    if (!leadData.name.trim() || !leadData.phone.trim() || !leadData.email.trim()) return;

    // Validar dados de contato usando função centralizada
    const contactInfo = {
      name: leadData.name.trim(),
      email: leadData.email.trim(),
      phone: leadData.phone.trim(),
      company: leadData.company.trim(),
    };

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

    const roi = calculateROI();

    try {
      const additionalInfo = {
        origem: "quiz_roi_cases",
        respostas: JSON.stringify(answers),
        perda_mensal_estimada: roi.monthlyLoss,
        perda_anual_estimada: roi.yearlyLoss,
        timestamp: new Date().toISOString(),
      };

      const result = await submitFormToN8N(contactInfo, additionalInfo);

      if (!result.success) {
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
    setSubmitted(true);
    setTimeout(() => setShowResult(true), 500);
  };

  const roi = calculateROI();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <DialogTitle className="sr-only">Calculadora de ROI de Dados</DialogTitle>
      <DialogDescription className="sr-only">Calcule o retorno sobre investimento em dados respondendo algumas perguntas sobre seu negócio</DialogDescription>
      <div className="w-full max-w-xl mx-auto">
        {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {currentStep < questions.length
            ? `Pergunta ${currentStep + 1} de ${questions.length}`
            : showResult
            ? "Seu resultado"
            : "Última etapa"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* Questions */}
        {currentStep < questions.length && (
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const question = questions[currentStep];
              const Icon = question.icon;
              return (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1">
                        {question.question}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {question.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full p-4 rounded-xl border text-left transition-all duration-200 hover:border-primary hover:bg-primary/5 ${
                          answers[currentStep] === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                            {option.impact}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {currentStep > 0 && (
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="mt-4"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* Lead Capture */}
        {currentStep === questions.length && !showResult && (
          <motion.div
            key="lead-capture"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">
                Seu resultado está pronto!
              </h3>
              <p className="text-muted-foreground">
                Informe seus dados para ver quanto você pode estar perdendo
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nome</label>
                <Input
                  placeholder="Seu nome completo"
                  value={leadData.name}
                  onChange={(e) =>
                    setLeadData({ ...leadData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </label>
                <Input
                  placeholder="(11) 99999-9999"
                  value={leadData.phone}
                  onChange={(e) =>
                    setLeadData({ ...leadData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">E-mail</label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={leadData.email}
                  onChange={(e) =>
                    setLeadData({ ...leadData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Empresa</label>
                <Input
                  placeholder="Nome da empresa"
                  value={leadData.company}
                  onChange={(e) =>
                    setLeadData({ ...leadData, company: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(questions.length - 1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !leadData.name.trim() ||
                  !leadData.phone.trim() ||
                  !leadData.email.trim()
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    Ver meu resultado
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Result */}
        {showResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <div className="text-center">
              <h3 className="font-display text-xl font-bold mb-1">
                Diagnóstico de perdas
              </h3>
              <p className="text-sm text-muted-foreground">
                Baseado nas suas respostas, identificamos 3 fontes de perda:
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Trabalho manual</p>
                    <p className="text-xs text-muted-foreground">
                      {roi.manualHours}h/semana × {roi.teamSize} pessoa{roi.teamSize > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-orange-500">
                  {formatCurrency(roi.breakdown.manual)}/mês
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Decisões atrasadas</p>
                    <p className="text-xs text-muted-foreground">
                      Dados desatualizados custam caro
                    </p>
                  </div>
                </div>
                <span className="font-bold text-red-500">
                  {formatCurrency(roi.breakdown.decisions)}/mês
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Números conflitantes</p>
                    <p className="text-xs text-muted-foreground">
                      Retrabalho e perda de confiança
                    </p>
                  </div>
                </div>
                <span className="font-bold text-yellow-600">
                  {formatCurrency(roi.breakdown.conflicts)}/mês
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm text-muted-foreground">Impacto estimado</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-xs">
                          <p className="font-medium mb-1">Base do cálculo ({roi.teamSize} pessoa{roi.teamSize > 1 ? 's' : ''}):</p>
                          <ul className="space-y-0.5 text-muted-foreground">
                            <li>• Custo/hora por analista: R$ 50</li>
                            <li>• Trabalho manual: horas × 4 semanas × R$ 50 × equipe</li>
                            <li>• Decisões/conflitos: índices de impacto × fator de equipe</li>
                          </ul>
                          <p className="mt-1.5 text-muted-foreground italic">
                            Valores ilustrativos para reflexão estratégica.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="font-display text-2xl font-bold text-red-500">
                    {formatCurrency(roi.monthlyLoss)}/mês
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Por ano</p>
                  <p className="font-display text-lg font-bold">
                    {formatCurrency(roi.yearlyLoss)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm">
                  <span className="font-medium">Boa notícia:</span> empresas que automatizam 
                  a gestão de dados reduzem essas perdas em até 80%.
                </p>
              </div>
            </div>

            <div className="text-center space-y-3 pt-2">
              <p className="text-sm text-muted-foreground">
                Nossa equipe vai entrar em contato com um plano personalizado.
              </p>
              {onClose && (
                <Button variant="outline" onClick={onClose}>
                  Fechar
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
};

export default ROIQuiz;
