export interface ConversationAnalysis {
  produtosSugeridos: string[];
  funisCriados: number;
  blocosCompletados: {
    diagnostico: boolean;
    produto: boolean;
    funil: boolean;
    conteudo: boolean;
  };
  proximosPassos: string[];
  insights: Insights;
  progresso: ProgressTracker;
}

export interface ProgressTracker {
  porcentagem: number;
  etapaAtual: string;
  tempoEstimado: number; // em minutos
}

export interface Insights {
  pontosFortes: string[];
  oportunidades: string[];
  alertas: string[];
  recomendacoes: string[];
}

export interface Decision {
  tipo: 'produto' | 'funil' | 'conteudo' | 'preco' | 'outro';
  descricao: string;
  timestamp: number;
  impacto: 'alto' | 'medio' | 'baixo';
}

