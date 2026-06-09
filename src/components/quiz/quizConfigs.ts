import { LucideIcon, BarChart3, Database, Users, AlertTriangle, Clock, Target, Code2, FileSpreadsheet, Smartphone, Zap, Briefcase, Palette, Presentation, Eye, Wrench, Code } from "lucide-react";

export interface QuizOption {
  value: string;
  label: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  icon: LucideIcon;
  question: string;
  multiSelect: boolean;
  options: QuizOption[];
}

export interface QuizConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentColor: "primary" | "accent";
  successMessage: string;
  questions: QuizQuestion[];
}

export const quizConfigs: Record<string, QuizConfig> = {
  "data-journey": {
    id: "jornada_dados",
    title: "Diagnóstico de Dados",
    subtitle: "Descubra o nível de maturidade da sua empresa",
    icon: BarChart3,
    accentColor: "primary",
    successMessage: "Recebemos seu diagnóstico. Nossa equipe vai analisar suas respostas e entrar em contato em até 24h com insights personalizados.",
    questions: [
      {
        id: 1,
        icon: Database,
        question: "Como está a organização dos seus dados hoje?",
        multiSelect: true,
        options: [
          { value: "caos", label: "Caos total", description: "Dados espalhados em diversas planilhas e sistemas" },
          { value: "parcial", label: "Parcialmente organizado", description: "Alguns dados centralizados, mas ainda há gaps" },
          { value: "organizado", label: "Bem organizado", description: "Dados centralizados, mas falta análise avançada" },
          { value: "maduro", label: "Maduro", description: "Dados organizados com analytics funcionando" },
        ],
      },
      {
        id: 2,
        icon: AlertTriangle,
        question: "Quais são as maiores dores relacionadas a dados?",
        multiSelect: true,
        options: [
          { value: "conflito", label: "Números conflitantes", description: "Cada área apresenta dados diferentes" },
          { value: "tempo", label: "Demora nas respostas", description: "Leva dias para responder perguntas simples" },
          { value: "confianca", label: "Falta de confiança", description: "Ninguém confia nos números apresentados" },
          { value: "decisao", label: "Decisões no escuro", description: "Falta visibilidade para decidir" },
        ],
      },
      {
        id: 3,
        icon: Clock,
        question: "Quanto tempo sua equipe gasta consolidando dados manualmente?",
        multiSelect: false,
        options: [
          { value: "muito", label: "Mais de 20h/semana", description: "Grande parte do tempo é coleta manual" },
          { value: "moderado", label: "10-20h/semana", description: "Tempo significativo em consolidação" },
          { value: "pouco", label: "5-10h/semana", description: "Algum tempo, mas gerenciável" },
          { value: "minimo", label: "Menos de 5h/semana", description: "Processos já estão automatizados" },
        ],
      },
      {
        id: 4,
        icon: Users,
        question: "Quantas pessoas tomam decisões baseadas em dados na sua empresa?",
        multiSelect: false,
        options: [
          { value: "poucos", label: "1-5 pessoas", description: "Apenas liderança usa dados" },
          { value: "alguns", label: "6-20 pessoas", description: "Gestores e alguns analistas" },
          { value: "varios", label: "21-50 pessoas", description: "Boa parte da operação" },
          { value: "todos", label: "50+ pessoas", description: "Cultura data-driven" },
        ],
      },
      {
        id: 5,
        icon: Target,
        question: "Quais seus principais objetivos com dados nos próximos 12 meses?",
        multiSelect: true,
        options: [
          { value: "organizar", label: "Organizar a casa", description: "Centralizar e limpar os dados" },
          { value: "dashboards", label: "Ter dashboards", description: "Visualizar KPIs em tempo real" },
          { value: "preditivo", label: "Análises preditivas", description: "Antecipar tendências e problemas" },
          { value: "cultura", label: "Cultura data-driven", description: "Todos decidindo com dados" },
        ],
      },
    ],
  },
  "software-factory": {
    id: "plataformas_inteligencia",
    title: "Diagnóstico de Inteligência",
    subtitle: "Descubra como substituir planilhas por inteligência",
    icon: Code2,
    accentColor: "accent",
    successMessage: "Recebemos seu diagnóstico. Nossa equipe vai analisar suas respostas e entrar em contato em até 24h com uma proposta de plataforma sob medida.",
    questions: [
      {
        id: 1,
        icon: FileSpreadsheet,
        question: "O que hoje é gerenciado em planilhas na sua operação?",
        multiSelect: true,
        options: [
          { value: "vendas", label: "Vendas e metas", description: "Acompanhamento de resultados comerciais" },
          { value: "estoque", label: "Estoque e logística", description: "Controle de inventário e entregas" },
          { value: "indicadores", label: "KPIs e indicadores", description: "Consolidação manual de métricas" },
          { value: "processos", label: "Processos operacionais", description: "Checklists, aprovações, workflows" },
        ],
      },
      {
        id: 2,
        icon: Users,
        question: "Quem precisa acessar essas informações?",
        multiSelect: true,
        options: [
          { value: "campo", label: "Equipe em campo", description: "Vendedores, promotores, técnicos" },
          { value: "gestores", label: "Gestores e coordenadores", description: "Precisam de visão consolidada" },
          { value: "diretoria", label: "Diretoria", description: "Precisam de insights estratégicos" },
          { value: "operacao", label: "Operação interna", description: "Backoffice, administrativo" },
        ],
      },
      {
        id: 3,
        icon: Smartphone,
        question: "Como sua equipe acessa os dados hoje?",
        multiSelect: true,
        options: [
          { value: "desktop", label: "Só no computador", description: "Precisam estar no escritório" },
          { value: "whatsapp", label: "Via WhatsApp", description: "Enviam e pedem informações por mensagem" },
          { value: "email", label: "Por e-mail", description: "Relatórios enviados periodicamente" },
          { value: "nenhum", label: "Não têm acesso", description: "Esperam alguém consolidar" },
        ],
      },
      {
        id: 4,
        icon: Zap,
        question: "Quais as maiores dores com a situação atual?",
        multiSelect: true,
        options: [
          { value: "desatualizado", label: "Dados desatualizados", description: "Informações chegam tarde demais" },
          { value: "manual", label: "Muito trabalho manual", description: "Tempo perdido consolidando dados" },
          { value: "visibilidade", label: "Falta de visibilidade", description: "Não sabem o que está acontecendo em tempo real" },
          { value: "decisao", label: "Decisões lentas", description: "Demora para reagir a problemas" },
        ],
      },
      {
        id: 5,
        icon: Code2,
        question: "O que você imagina como solução ideal?",
        multiSelect: true,
        options: [
          { value: "app", label: "Aplicativo mobile", description: "Acesso rápido para quem está em campo" },
          { value: "dashboard", label: "Painel de inteligência", description: "Visualização em tempo real para gestores" },
          { value: "automacao", label: "Automação de processos", description: "Menos trabalho manual, mais velocidade" },
          { value: "insights", label: "Insights e alertas", description: "Recomendações inteligentes para decisão" },
        ],
      },
    ],
  },
  "squad": {
    id: "squad_as_service",
    title: "Monte seu Squad",
    subtitle: "Descubra o time ideal para seu projeto",
    icon: Users,
    accentColor: "primary",
    successMessage: "Recebemos suas informações. Nossa equipe vai analisar o perfil do projeto e entrar em contato em até 24h com uma proposta de squad sob medida.",
    questions: [
      {
        id: 1,
        icon: Target,
        question: "Qual o objetivo principal do projeto?",
        multiSelect: false,
        options: [
          { value: "produto-novo", label: "Criar produto do zero", description: "MVP ou plataforma nova" },
          { value: "evolucao", label: "Evoluir produto existente", description: "Novas features e melhorias" },
          { value: "manutencao", label: "Manutenção e suporte", description: "Correções e estabilidade" },
          { value: "migracao", label: "Migração tecnológica", description: "Modernizar stack ou infraestrutura" },
        ],
      },
      {
        id: 2,
        icon: Code,
        question: "Quais tecnologias são necessárias?",
        multiSelect: true,
        options: [
          { value: "frontend", label: "Frontend Web", description: "React, Vue, Angular, etc." },
          { value: "backend", label: "Backend / APIs", description: "Node, Python, .NET, Java" },
          { value: "mobile", label: "Mobile", description: "React Native, Flutter, nativo" },
          { value: "dados", label: "Dados / BI", description: "Data engineering, dashboards, IA" },
        ],
      },
      {
        id: 3,
        icon: Users,
        question: "Qual o tamanho de squad ideal?",
        multiSelect: false,
        options: [
          { value: "pequeno", label: "2-3 pessoas", description: "Projetos focados e ágeis" },
          { value: "medio", label: "4-6 pessoas", description: "Entregas consistentes" },
          { value: "grande", label: "7-10 pessoas", description: "Múltiplas frentes paralelas" },
          { value: "nao-sei", label: "Não tenho certeza", description: "Preciso de orientação" },
        ],
      },
      {
        id: 4,
        icon: Clock,
        question: "Qual a duração estimada do projeto?",
        multiSelect: false,
        options: [
          { value: "curto", label: "1-3 meses", description: "Sprint intensivo" },
          { value: "medio", label: "3-6 meses", description: "Projeto estruturado" },
          { value: "longo", label: "6-12 meses", description: "Iniciativa de longo prazo" },
          { value: "continuo", label: "Contínuo", description: "Parceria permanente" },
        ],
      },
      {
        id: 5,
        icon: Briefcase,
        question: "Qual o maior desafio atual?",
        multiSelect: true,
        options: [
          { value: "time", label: "Falta de time interno", description: "Não temos desenvolvedores suficientes" },
          { value: "expertise", label: "Expertise técnica", description: "Precisamos de especialistas" },
          { value: "velocidade", label: "Velocidade de entrega", description: "Precisamos acelerar o roadmap" },
          { value: "qualidade", label: "Qualidade do código", description: "Débito técnico e instabilidade" },
        ],
      },
    ],
  },
  "ux": {
    id: "design_dados",
    title: "Diagnóstico de Design",
    subtitle: "Descubra como melhorar seus dashboards e apresentações",
    icon: Palette,
    accentColor: "primary",
    successMessage: "Recebemos seu diagnóstico. Nossa equipe vai analisar suas necessidades e entrar em contato em até 24h com uma proposta de design sob medida.",
    questions: [
      {
        id: 1,
        icon: BarChart3,
        question: "Quais dashboards precisam de melhoria?",
        multiSelect: true,
        options: [
          { value: "vendas", label: "Vendas e comercial", description: "Acompanhamento de metas e performance" },
          { value: "operacional", label: "Operacional", description: "Produção, logística, estoque" },
          { value: "financeiro", label: "Financeiro", description: "DRE, fluxo de caixa, custos" },
          { value: "executivo", label: "Executivo / Board", description: "Visão consolidada para diretoria" },
        ],
      },
      {
        id: 2,
        icon: Eye,
        question: "Qual o maior problema com os dashboards atuais?",
        multiSelect: true,
        options: [
          { value: "ninguem-usa", label: "Ninguém usa", description: "Foram criados mas ficaram abandonados" },
          { value: "confusos", label: "Muito confusos", description: "Difícil encontrar a informação certa" },
          { value: "lentos", label: "Lentos e pesados", description: "Demora para carregar, trava" },
          { value: "desatualizados", label: "Dados desatualizados", description: "Informações não refletem a realidade" },
        ],
      },
      {
        id: 3,
        icon: Wrench,
        question: "Quais ferramentas de BI vocês utilizam?",
        multiSelect: true,
        options: [
          { value: "powerbi", label: "Power BI", description: "Microsoft Power BI" },
          { value: "tableau", label: "Tableau", description: "Salesforce Tableau" },
          { value: "looker", label: "Looker / Data Studio", description: "Google Looker" },
          { value: "excel", label: "Excel / Planilhas", description: "Ainda no Excel ou Google Sheets" },
        ],
      },
      {
        id: 4,
        icon: Presentation,
        question: "Que tipo de apresentações executivas vocês precisam?",
        multiSelect: true,
        options: [
          { value: "board", label: "Reuniões de board", description: "Apresentações para conselho/diretoria" },
          { value: "investidores", label: "Para investidores", description: "Pitch decks e relatórios" },
          { value: "resultados", label: "Fechamento mensal", description: "Resultados e análises periódicas" },
          { value: "estrategia", label: "Planejamento estratégico", description: "Visão de futuro e roadmaps" },
        ],
      },
      {
        id: 5,
        icon: Palette,
        question: "O que vocês esperam como resultado?",
        multiSelect: true,
        options: [
          { value: "engajamento", label: "Mais engajamento", description: "Pessoas realmente usando os dashboards" },
          { value: "clareza", label: "Mais clareza", description: "Informação certa na hora certa" },
          { value: "padrao", label: "Identidade visual", description: "Padrão profissional e consistente" },
          { value: "decisao", label: "Decisões mais rápidas", description: "Reduzir tempo de análise" },
        ],
      },
    ],
  },
};
