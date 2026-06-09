import { jsPDF } from "jspdf";
import { dimensions, MaturityLevel } from "./maturityQuizConfig";
import { ContactInfo } from "./LeadCaptureStep";

interface DimensionScores {
  governance: number;
  culture: number;
  infrastructure: number;
  analytics: number;
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

// Colors
const PRIMARY_COLOR: [number, number, number] = [79, 70, 229]; // Indigo
const ACCENT_COLOR: [number, number, number] = [6, 182, 212]; // Cyan
const DARK_COLOR: [number, number, number] = [26, 26, 46];
const GRAY_COLOR: [number, number, number] = [100, 100, 120];
const LIGHT_BG: [number, number, number] = [248, 250, 252];

export const generateMaturityPDF = (
  totalScore: number,
  level: MaturityLevel,
  dimensionScores: DimensionScores,
  contactInfo: ContactInfo
): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = margin;

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Helper functions
  const addText = (text: string, x: number, y: number, options: {
    size?: number;
    color?: [number, number, number];
    style?: 'normal' | 'bold';
    maxWidth?: number;
  } = {}) => {
    const { size = 12, color = DARK_COLOR, style = 'normal', maxWidth } = options;
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.setFont('helvetica', style);
    if (maxWidth) {
      doc.text(text, x, y, { maxWidth });
    } else {
      doc.text(text, x, y);
    }
  };

  const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number, fill: [number, number, number]) => {
    doc.setFillColor(...fill);
    doc.roundedRect(x, y, w, h, r, r, 'F');
  };

  const drawProgressBar = (x: number, y: number, width: number, height: number, percentage: number) => {
    // Background
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(x, y, width, height, height / 2, height / 2, 'F');
    
    // Fill with gradient effect (using primary color)
    const fillWidth = (width * percentage) / 100;
    if (fillWidth > 0) {
      doc.setFillColor(...PRIMARY_COLOR);
      doc.roundedRect(x, y, fillWidth, height, height / 2, height / 2, 'F');
    }
  };

  // === HEADER ===
  // Logo area
  addText('D3', margin, yPos + 8, { size: 24, color: PRIMARY_COLOR, style: 'bold' });
  doc.setTextColor(...ACCENT_COLOR);
  doc.text('Data', margin + 22, yPos + 8);
  
  addText(currentDate, pageWidth - margin, yPos + 8, { size: 10, color: GRAY_COLOR });
  doc.text(currentDate, pageWidth - margin - doc.getTextWidth(currentDate), yPos + 8);
  
  yPos += 15;
  
  // Header line
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 15;

  // === TITLE ===
  addText('Diagnóstico de Maturidade de Dados', pageWidth / 2, yPos, { 
    size: 22, 
    color: DARK_COLOR, 
    style: 'bold' 
  });
  doc.text('Diagnóstico de Maturidade de Dados', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 8;
  addText('Análise personalizada baseada nas suas respostas', pageWidth / 2, yPos, { 
    size: 11, 
    color: GRAY_COLOR 
  });
  doc.text('Análise personalizada baseada nas suas respostas', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;

  // === COMPANY BANNER ===
  const bannerHeight = 25;
  
  // Create gradient effect with two rectangles
  doc.setFillColor(...PRIMARY_COLOR);
  doc.roundedRect(margin, yPos, contentWidth / 2, bannerHeight, 3, 3, 'F');
  doc.setFillColor(...ACCENT_COLOR);
  doc.roundedRect(margin + contentWidth / 2, yPos, contentWidth / 2, bannerHeight, 3, 3, 'F');
  // Overlap to blend
  doc.setFillColor(40, 120, 220);
  doc.rect(margin + contentWidth / 2 - 10, yPos, 20, bannerHeight, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('DIAGNÓSTICO REALIZADO PARA', margin + 10, yPos + 10);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const companyName = contactInfo.company || contactInfo.name;
  doc.text(companyName.substring(0, 40), margin + 10, yPos + 19);
  
  yPos += bannerHeight + 15;

  // === SCORE SECTION ===
  const scoreBoxWidth = (contentWidth - 10) / 2;
  const scoreBoxHeight = 50;
  
  // Score box
  drawRoundedRect(margin, yPos, scoreBoxWidth, scoreBoxHeight, 3, LIGHT_BG);
  
  addText(String(totalScore), margin + scoreBoxWidth / 2, yPos + 30, { 
    size: 36, 
    color: PRIMARY_COLOR, 
    style: 'bold' 
  });
  doc.text(String(totalScore), margin + scoreBoxWidth / 2, yPos + 30, { align: 'center' });
  
  addText('pontos de 100', margin + scoreBoxWidth / 2, yPos + 42, { 
    size: 10, 
    color: GRAY_COLOR 
  });
  doc.text('pontos de 100', margin + scoreBoxWidth / 2, yPos + 42, { align: 'center' });

  // Level box
  drawRoundedRect(margin + scoreBoxWidth + 10, yPos, scoreBoxWidth, scoreBoxHeight, 3, LIGHT_BG);
  
  const levelText = `Nível ${level.level}: ${level.name}`;
  addText(levelText, margin + scoreBoxWidth + 10 + 10, yPos + 18, { 
    size: 12, 
    color: PRIMARY_COLOR, 
    style: 'bold' 
  });
  
  // Level description (wrapped)
  doc.setFontSize(9);
  doc.setTextColor(...GRAY_COLOR);
  doc.setFont('helvetica', 'normal');
  const levelDesc = doc.splitTextToSize(level.description, scoreBoxWidth - 20);
  doc.text(levelDesc, margin + scoreBoxWidth + 10 + 10, yPos + 30);
  
  yPos += scoreBoxHeight + 15;

  // === DIMENSIONS SECTION ===
  addText('Análise por Dimensão', margin, yPos, { size: 14, color: DARK_COLOR, style: 'bold' });
  yPos += 10;

  const dimensionsList = dimensions.map(dim => {
    const score = dimensionScores[dim.id as keyof DimensionScores];
    const recommendation = getDimensionRecommendation(dim.id, score);
    return { name: dim.name, score, recommendation };
  });

  dimensionsList.forEach((dim) => {
    const boxHeight = 32;
    drawRoundedRect(margin, yPos, contentWidth, boxHeight, 3, LIGHT_BG);
    
    // Dimension name and score
    addText(dim.name, margin + 8, yPos + 10, { size: 11, style: 'bold' });
    addText(`${dim.score}%`, pageWidth - margin - 8, yPos + 10, { 
      size: 12, 
      color: PRIMARY_COLOR, 
      style: 'bold' 
    });
    doc.text(`${dim.score}%`, pageWidth - margin - 8, yPos + 10, { align: 'right' });
    
    // Progress bar
    drawProgressBar(margin + 8, yPos + 14, contentWidth - 50, 4, dim.score);
    
    // Recommendation (truncated)
    const truncatedRec = dim.recommendation.length > 90 
      ? dim.recommendation.substring(0, 87) + '...' 
      : dim.recommendation;
    addText(truncatedRec, margin + 8, yPos + 26, { size: 8, color: GRAY_COLOR, maxWidth: contentWidth - 16 });
    
    yPos += boxHeight + 5;
  });

  yPos += 10;

  // === NEXT STEPS BOX ===
  const nextStepsHeight = 40;
  drawRoundedRect(margin, yPos, contentWidth, nextStepsHeight, 3, DARK_COLOR);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('🚀 Próximos Passos', margin + 10, yPos + 12);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const nextStepsText = 'Este diagnóstico oferece uma visão inicial. Para uma análise mais profunda e um plano de ação personalizado, recomendamos agendar uma consultoria presencial com nossa equipe.';
  const nextStepsLines = doc.splitTextToSize(nextStepsText, contentWidth - 20);
  doc.text(nextStepsLines, margin + 10, yPos + 22);

  yPos += nextStepsHeight + 10;

  // === DISCLAIMER ===
  const disclaimerHeight = 25;
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(margin, yPos, contentWidth, disclaimerHeight, 3, 3, 'F');
  
  doc.setTextColor(146, 64, 14);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Importante:', margin + 8, yPos + 10);
  
  doc.setFont('helvetica', 'normal');
  const disclaimerText = 'Este diagnóstico é uma análise preliminar baseada em autoavaliação. Para resultados mais precisos, é necessário um diagnóstico presencial.';
  const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth - 60);
  doc.text(disclaimerLines, margin + 35, yPos + 10);

  yPos += disclaimerHeight + 15;

  // === FOOTER ===
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 10;
  
  addText('D3', pageWidth / 2 - 12, yPos, { size: 14, color: PRIMARY_COLOR, style: 'bold' });
  doc.setTextColor(...ACCENT_COLOR);
  doc.text('Data', pageWidth / 2 + 3, yPos);
  
  yPos += 6;
  addText('Transformando dados em decisões estratégicas', pageWidth / 2, yPos, { 
    size: 9, 
    color: GRAY_COLOR 
  });
  doc.text('Transformando dados em decisões estratégicas', pageWidth / 2, yPos, { align: 'center' });

  // Generate filename
  const fileName = `diagnostico-maturidade-${(contactInfo.company || contactInfo.name).toLowerCase().replace(/\s+/g, '-').substring(0, 30)}.pdf`;
  
  // Download
  doc.save(fileName);
};
