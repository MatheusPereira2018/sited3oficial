import { 
  LucideIcon, 
  ShieldCheck, 
  TrendingUp, 
  Server, 
  BarChart3,
  FileCheck,
  Lock,
  Users,
  Target,
  Database,
  Cloud,
  Layers,
  LineChart,
  Brain,
  Presentation
} from "lucide-react";

export interface MaturityOption {
  value: string;
  label: string;
  description: string;
  score: number; // 0-25 points per option
}

export interface MaturityQuestion {
  id: string;
  dimension: "governance" | "culture" | "infrastructure" | "analytics";
  icon: LucideIcon;
  question: string;
  options: MaturityOption[];
}

export interface MaturityDimension {
  id: "governance" | "culture" | "infrastructure" | "analytics";
  name: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

export const dimensions: MaturityDimension[] = [
  {
    id: "governance",
    name: "Governança de Dados",
    icon: ShieldCheck,
    description: "Políticas, processos, qualidade e segurança dos dados",
    color: "hsl(199 89% 48%)", // primary
  },
  {
    id: "culture",
    name: "Cultura Data-Driven",
    icon: TrendingUp,
    description: "Adoção de decisões baseadas em dados na organização",
    color: "hsl(270 60% 55%)", // accent
  },
  {
    id: "infrastructure",
    name: "Infraestrutura Tecnológica",
    icon: Server,
    description: "Ferramentas, integrações e capacidade técnica",
    color: "hsl(142 76% 36%)", // green
  },
  {
    id: "analytics",
    name: "Analytics e BI",
    icon: BarChart3,
    description: "Dashboards, relatórios e capacidade analítica",
    color: "hsl(38 92% 50%)", // orange/amber
  },
];

export const maturityQuestions: MaturityQuestion[] = [
  // GOVERNANÇA (3 perguntas)
  {
    id: "gov1",
    dimension: "governance",
    icon: FileCheck,
    question: "Como está documentada a origem e qualidade dos seus dados?",
    options: [
      { value: "none", label: "Não existe documentação", description: "Ninguém sabe de onde vêm os dados", score: 0 },
      { value: "informal", label: "Conhecimento informal", description: "Algumas pessoas sabem, mas não está registrado", score: 8 },
      { value: "partial", label: "Documentação parcial", description: "Principais fontes estão mapeadas", score: 16 },
      { value: "complete", label: "Catálogo de dados completo", description: "Data dictionary e linhagem bem definidos", score: 25 },
    ],
  },
  {
    id: "gov2",
    dimension: "governance",
    icon: Lock,
    question: "Como é tratada a segurança e privacidade dos dados?",
    options: [
      { value: "none", label: "Sem controles", description: "Qualquer pessoa acessa qualquer dado", score: 0 },
      { value: "basic", label: "Controles básicos", description: "Senhas e permissões simples", score: 8 },
      { value: "structured", label: "Políticas estruturadas", description: "LGPD mapeada, acessos controlados", score: 16 },
      { value: "advanced", label: "Governança avançada", description: "Data stewards, auditorias regulares, compliance total", score: 25 },
    ],
  },
  {
    id: "gov3",
    dimension: "governance",
    icon: ShieldCheck,
    question: "Existe um processo para garantir a qualidade dos dados?",
    options: [
      { value: "none", label: "Não existe processo", description: "Erros são descobertos tarde demais", score: 0 },
      { value: "reactive", label: "Correção reativa", description: "Corrigimos quando alguém reclama", score: 8 },
      { value: "monitored", label: "Monitoramento básico", description: "Alguns checks automáticos de qualidade", score: 16 },
      { value: "proactive", label: "Gestão proativa", description: "SLAs de qualidade, alertas e correção automática", score: 25 },
    ],
  },

  // CULTURA (3 perguntas)
  {
    id: "cult1",
    dimension: "culture",
    icon: Users,
    question: "Quantas pessoas usam dados para tomar decisões no dia a dia?",
    options: [
      { value: "few", label: "Quase ninguém", description: "Apenas 1-2 pessoas técnicas", score: 0 },
      { value: "leadership", label: "Só a liderança", description: "Diretoria e alguns gestores", score: 8 },
      { value: "managers", label: "Gestores em geral", description: "Maioria dos gestores usa dashboards", score: 16 },
      { value: "everyone", label: "Toda a organização", description: "Cultura data-driven em todos os níveis", score: 25 },
    ],
  },
  {
    id: "cult2",
    dimension: "culture",
    icon: Target,
    question: "Como as metas e KPIs são definidos e acompanhados?",
    options: [
      { value: "none", label: "Sem metas claras", description: "Objetivos vagos ou inexistentes", score: 0 },
      { value: "annual", label: "Metas anuais", description: "Definidas no início do ano, pouco acompanhadas", score: 8 },
      { value: "regular", label: "Acompanhamento regular", description: "Reuniões mensais com dados", score: 16 },
      { value: "realtime", label: "Tempo real", description: "Dashboards atualizados, decisões rápidas baseadas em dados", score: 25 },
    ],
  },
  {
    id: "cult3",
    dimension: "culture",
    icon: TrendingUp,
    question: "Quando surge uma dúvida de negócio, qual é a primeira reação?",
    options: [
      { value: "gut", label: "Intuição", description: "Decidimos com base na experiência", score: 0 },
      { value: "opinion", label: "Opinião do chefe", description: "Quem tem mais poder decide", score: 8 },
      { value: "manual", label: "Buscar dados", description: "Alguém vai atrás dos números (leva tempo)", score: 16 },
      { value: "instant", label: "Consultar dashboard", description: "Dados sempre disponíveis para consulta imediata", score: 25 },
    ],
  },

  // INFRAESTRUTURA (3 perguntas)
  {
    id: "infra1",
    dimension: "infrastructure",
    icon: Database,
    question: "Como os dados estão armazenados na empresa?",
    options: [
      { value: "scattered", label: "Espalhados", description: "Cada área tem suas planilhas e sistemas", score: 0 },
      { value: "partial", label: "Parcialmente centralizado", description: "Alguns dados integrados, outros isolados", score: 8 },
      { value: "warehouse", label: "Data warehouse", description: "Repositório central estruturado", score: 16 },
      { value: "lake", label: "Data lake + warehouse", description: "Arquitetura moderna com dados estruturados e não estruturados", score: 25 },
    ],
  },
  {
    id: "infra2",
    dimension: "infrastructure",
    icon: Cloud,
    question: "Qual o nível de automação nas integrações de dados?",
    options: [
      { value: "manual", label: "Tudo manual", description: "Exportar, copiar, colar em planilhas", score: 0 },
      { value: "semiAuto", label: "Semi-automático", description: "Alguns scripts ou rotinas agendadas", score: 8 },
      { value: "pipelines", label: "Pipelines de dados", description: "ETL/ELT automatizado para principais fontes", score: 16 },
      { value: "realtime", label: "Tempo real", description: "Streaming, CDC, dados sempre atualizados", score: 25 },
    ],
  },
  {
    id: "infra3",
    dimension: "infrastructure",
    icon: Layers,
    question: "Como são tratados dados de diferentes sistemas (ERP, CRM, etc)?",
    options: [
      { value: "isolated", label: "Cada um no seu sistema", description: "Não há integração entre sistemas", score: 0 },
      { value: "exported", label: "Exportações manuais", description: "Relatórios exportados e consolidados manualmente", score: 8 },
      { value: "integrated", label: "Integrações pontuais", description: "APIs ou conectores para alguns sistemas", score: 16 },
      { value: "unified", label: "Visão unificada", description: "Single source of truth com todos os sistemas integrados", score: 25 },
    ],
  },

  // ANALYTICS (3 perguntas)
  {
    id: "ana1",
    dimension: "analytics",
    icon: LineChart,
    question: "Qual o nível de maturidade dos seus dashboards?",
    options: [
      { value: "none", label: "Não temos dashboards", description: "Só planilhas e relatórios manuais", score: 0 },
      { value: "basic", label: "Dashboards básicos", description: "Alguns gráficos, mas pouco usados", score: 8 },
      { value: "operational", label: "Dashboards operacionais", description: "Acompanhamento diário de KPIs", score: 16 },
      { value: "strategic", label: "Analytics estratégico", description: "Dashboards interativos com drill-down e insights", score: 25 },
    ],
  },
  {
    id: "ana2",
    dimension: "analytics",
    icon: Brain,
    question: "Vocês utilizam análises preditivas ou IA?",
    options: [
      { value: "none", label: "Não utilizamos", description: "Apenas análises descritivas (o que aconteceu)", score: 0 },
      { value: "exploring", label: "Explorando", description: "Alguns experimentos ou projetos piloto", score: 8 },
      { value: "production", label: "Em produção", description: "Modelos preditivos rodando em alguns processos", score: 16 },
      { value: "embedded", label: "IA integrada", description: "Machine learning e IA em decisões críticas do negócio", score: 25 },
    ],
  },
  {
    id: "ana3",
    dimension: "analytics",
    icon: Presentation,
    question: "Como são apresentados os resultados para a diretoria?",
    options: [
      { value: "spreadsheet", label: "Planilhas por email", description: "Excel anexado em reuniões", score: 0 },
      { value: "slides", label: "Apresentações estáticas", description: "PowerPoint com prints de dados", score: 8 },
      { value: "dashboards", label: "Dashboards compartilhados", description: "Links para BI durante reuniões", score: 16 },
      { value: "storytelling", label: "Data storytelling", description: "Narrativas visuais com insights acionáveis", score: 25 },
    ],
  },
];

export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  color: string;
  minScore: number;
  maxScore: number;
}

export const maturityLevels: MaturityLevel[] = [
  {
    level: 1,
    name: "Iniciante",
    description: "Dados descentralizados, processos manuais e decisões baseadas em intuição",
    color: "hsl(0 84% 60%)", // red
    minScore: 0,
    maxScore: 25,
  },
  {
    level: 2,
    name: "Em Desenvolvimento",
    description: "Primeiros passos na organização de dados, alguns processos estruturados",
    color: "hsl(38 92% 50%)", // orange
    minScore: 26,
    maxScore: 50,
  },
  {
    level: 3,
    name: "Definido",
    description: "Processos estabelecidos, dados centralizados e cultura em formação",
    color: "hsl(48 96% 53%)", // yellow
    minScore: 51,
    maxScore: 70,
  },
  {
    level: 4,
    name: "Gerenciado",
    description: "Governança sólida, decisões data-driven e analytics operacional",
    color: "hsl(142 76% 36%)", // green
    minScore: 71,
    maxScore: 85,
  },
  {
    level: 5,
    name: "Otimizado",
    description: "Excelência em dados com IA, automação e cultura data-driven total",
    color: "hsl(199 89% 48%)", // primary blue
    minScore: 86,
    maxScore: 100,
  },
];

export const getMaturityLevel = (score: number): MaturityLevel => {
  return maturityLevels.find(level => score >= level.minScore && score <= level.maxScore) || maturityLevels[0];
};

export const calculateDimensionScore = (
  answers: Record<string, string>,
  dimension: "governance" | "culture" | "infrastructure" | "analytics"
): number => {
  const dimensionQuestions = maturityQuestions.filter(q => q.dimension === dimension);
  let totalScore = 0;
  let answeredQuestions = 0;

  dimensionQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      const option = question.options.find(o => o.value === answer);
      if (option) {
        totalScore += option.score;
        answeredQuestions++;
      }
    }
  });

  // Normalize to 0-100
  const maxPossible = dimensionQuestions.length * 25;
  return answeredQuestions > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;
};

export const calculateTotalScore = (answers: Record<string, string>): number => {
  const scores = dimensions.map(d => calculateDimensionScore(answers, d.id));
  return Math.round(scores.reduce((a, b) => a + b, 0) / dimensions.length);
};
