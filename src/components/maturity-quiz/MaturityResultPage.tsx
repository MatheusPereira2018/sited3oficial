import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Rocket,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MaturityRadarChart } from "./MaturityRadarChart";
import {
  dimensions,
  getMaturityLevel,
  calculateDimensionScore,
  calculateTotalScore,
  MaturityLevel
} from "./maturityQuizConfig";
import { ContactInfo } from "./LeadCaptureStep";
import { generateMaturityPDF } from "./generatePDF";
import { submitFormToN8N } from "@/lib/formSubmission";

const GOOGLE_SHEETS_WEBHOOK = "";

interface MaturityResultPageProps {
  answers: Record<string, string>;
  contactInfo: ContactInfo;
  onRestart: () => void;
}

const getDimensionRecommendation = (dimension: string, score: number): string => {
  const recommendations: Record<string, Record<string, string>> = {
    governance: {
      low: "Priorize criar um catálogo de dados básico e definir data owners para suas principais fontes de dados.",
      medium: "Implemente processos de monitoramento de qualidade e políticas de acesso mais granulares.",
      high: "Evolua para data stewardship avançado com auditorias regulares e automação de compliance.",
    },
    culture: {
      low: "Comece com treinamentos de data literacy para lideranças e crie rituais de revisão de dados.",
      medium: "Expanda o uso de dashboards para gestores e estabeleça metas mensuráveis baseadas em dados.",
      high: "Implemente programas de data champions e democratize o acesso a self-service analytics.",
    },
    infrastructure: {
      low: "Centralize os dados principais em um repositório único e crie pipelines básicos de ETL.",
      medium: "Modernize a arquitetura com cloud e implemente integrações automatizadas para sistemas críticos.",
      high: "Evolua para arquiteturas de streaming e real-time para decisões instantâneas.",
    },
    analytics: {
      low: "Desenvolva dashboards operacionais para as áreas mais críticas do negócio.",
      medium: "Implemente analytics avançado com drill-down e explore casos de uso preditivo.",
      high: "Escale IA e ML para processos de negócio críticos e implemente data storytelling executivo.",
    },
  };

  const level = score < 40 ? "low" : score < 70 ? "medium" : "high";
  return recommendations[dimension]?.[level] || "";
};

const getServiceRecommendation = (level: MaturityLevel): { title: string; description: string; service: string }[] => {
  if (level.level <= 2) {
    return [
      {
        title: "Jornada de Dados",
        description: "Organize sua base e construa fundamentos sólidos para decisões data-driven",
        service: "jornada-dados",
      },
      {
        title: "Design de Dados",
        description: "Dashboards profissionais que sua equipe realmente vai usar",
        service: "design-dados",
      },
    ];
  }
  
  if (level.level <= 3) {
    return [
      {
        title: "Plataformas de Inteligência",
        description: "Substitua planilhas por aplicações de decisão em tempo real",
        service: "plataformas-inteligencia",
      },
      {
        title: "Squad as a Service",
        description: "Acelere sua evolução com um time especializado dedicado",
        service: "squad",
      },
    ];
  }
  
  return [
    {
      title: "IA e Analytics Avançado",
      description: "Leve sua maturidade ao próximo nível com inteligência artificial",
      service: "ia-analytics",
    },
    {
      title: "Squad as a Service",
      description: "Time especializado para projetos de inovação e modernização",
      service: "squad",
    },
  ];
};

export const MaturityResultPage = ({ answers, contactInfo, onRestart }: MaturityResultPageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalScore = calculateTotalScore(answers);
  const level = getMaturityLevel(totalScore);
  
  const dimensionScores = {
    governance: calculateDimensionScore(answers, "governance"),
    culture: calculateDimensionScore(answers, "culture"),
    infrastructure: calculateDimensionScore(answers, "infrastructure"),
    analytics: calculateDimensionScore(answers, "analytics"),
  };

  const recommendations = getServiceRecommendation(level);

  // Send data to N8N via Supabase Edge Function on mount
  useEffect(() => {
    const sendToN8N = async () => {
      const additionalInfo = {
        origem: 'quiz_maturidade_dados',
        timestamp: new Date().toISOString(),
        quiz_type: "maturidade_dados",
        score_total: totalScore,
        nivel_maturidade: level.name,
        score_governanca: dimensionScores.governance,
        score_cultura: dimensionScores.culture,
        score_infraestrutura: dimensionScores.infrastructure,
        score_analytics: dimensionScores.analytics,
        respostas_raw: JSON.stringify(answers),
      };

      await submitFormToN8N(contactInfo, additionalInfo);
    };

    sendToN8N();
  }, []);

  const handleDownloadPDF = () => {
    generateMaturityPDF(totalScore, level, dimensionScores, contactInfo);
    toast({
      title: "PDF baixado!",
      description: "Seu diagnóstico foi salvo com sucesso.",
    });
  };

  const scrollToServices = () => {
    window.location.href = "/#servicos";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-12 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-foreground"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Seu Diagnóstico de Maturidade
            </h1>
            <p className="text-primary-foreground/80">
              Análise personalizada para {contactInfo.company || contactInfo.name}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Score Circle */}
            <div className="text-center">
              <div 
                className="relative w-48 h-48 mx-auto mb-4"
                style={{ 
                  background: `conic-gradient(${level.color} ${totalScore}%, hsl(var(--muted)) ${totalScore}%)`,
                  borderRadius: "50%",
                }}
              >
                <div className="absolute inset-3 rounded-full bg-background flex flex-col items-center justify-center">
                  <span className="font-display text-5xl font-bold">{totalScore}</span>
                  <span className="text-muted-foreground text-sm">de 100</span>
                </div>
              </div>
              <div 
                className="inline-block px-4 py-2 rounded-full font-semibold"
                style={{ backgroundColor: `${level.color}20`, color: level.color }}
              >
                Nível {level.level}: {level.name}
              </div>
              <p className="text-muted-foreground mt-3 max-w-xs mx-auto text-sm">
                {level.description}
              </p>
            </div>

            {/* Radar Chart */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-2 text-center">
                Score por Dimensão
              </h3>
              <MaturityRadarChart scores={dimensionScores} />
            </div>
          </div>
        </motion.div>

        {/* Dimension Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-accent" />
            Análise por Dimensão
          </h2>
          
          <div className="grid gap-4">
            {dimensions.map((dim, index) => {
              const score = dimensionScores[dim.id as keyof typeof dimensionScores];
              const Icon = dim.icon;
              const recommendation = getDimensionRecommendation(dim.id, score);
              
              return (
                <motion.div
                  key={dim.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${dim.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: dim.color }} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{dim.name}</h3>
                        <span 
                          className="font-display font-bold text-lg"
                          style={{ color: dim.color }}
                        >
                          {score}%
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: dim.color }}
                        />
                      </div>
                      
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                        <p>{recommendation}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-primary" />
            Plano de Ação Recomendado
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.service}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass-card rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{rec.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{rec.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={scrollToServices}
                >
                  Saber mais
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download & Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-6 md:p-8 border-2 border-accent/30"
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">
              Diagnóstico Concluído!
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Baixe seu relatório completo e fale diretamente com nossos especialistas para um plano de ação detalhado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleDownloadPDF}
              >
                <Download className="w-4 h-4" />
                Baixar PDF
              </Button>
              <Button
                asChild
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2"
              >
                <a 
                  href={`https://wa.me/5516997522363?text=${encodeURIComponent(`Olá! Acabei de fazer o diagnóstico de maturidade de dados e meu score foi ${totalScore}/100 (${level.name}). Gostaria de saber mais sobre como evoluir.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Footer actions */}
        <div className="text-center mt-8">
          <Button variant="ghost" onClick={onRestart}>
            Refazer diagnóstico
          </Button>
        </div>
      </div>
    </div>
  );
};
