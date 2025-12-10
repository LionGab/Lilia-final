/**
 * Análise do público-alvo
 */
export interface TargetAudience {
  desejos: string[];
  dores: string[];
  medos: string[];
  sonhos: string[];
  nivelConsciencia: 'inconsciente' | 'consciente_problema' | 'consciente_solucao' | 'consciente_produto';
  descricao: string;
}

/**
 * Estrutura de copy escolhida
 */
export interface CopyStructure {
  formula: 'AIDA' | 'StoryBrand' | 'Big Idea' | 'Hero\'s Journey' | 'PAS' | 'SLAP' | '4Ps' | 'Custom';
  justificativa: string;
}

/**
 * Promessa forte e única
 */
export interface UniquePromise {
  promessa: string;
  beneficioEmocional: string;
  diferencial: string;
  mecanismo: string;
  credibilidade: string;
}

/**
 * Funil de conteúdo
 */
export interface ContentFunnel {
  atracao: {
    tipo: string;
    estrategia: string;
    exemplos: string[];
  };
  aquecimento: {
    tipo: string;
    estrategia: string;
    exemplos: string[];
  };
  conversao: {
    tipo: string;
    estrategia: string;
    exemplos: string[];
  };
  sequencia: string[];
}

/**
 * Roteiro de vídeo viral
 */
export interface ViralVideoScript {
  titulo: string;
  gancho: string; // Primeiros 3 segundos
  contexto: string; // Contexto rápido e envolvente
  desenvolvimento: string; // Storytelling
  quebraPadrao: string; // Revelação/insight
  cta: string; // Chamada à ação
  duracaoEstimada: string;
  plataforma: string;
  tags: string[];
}

/**
 * Conteúdo UGC estratégico
 */
export interface UGCContent {
  tipo: string;
  descricao: string;
  objetivo: string;
  elementos: string[];
  exemplo: string;
}

/**
 * Texto de venda completo
 */
export interface SalesCopy {
  tipo: 'VSL' | 'Landing Page' | 'Email' | 'Anuncio' | 'Script';
  headline: string;
  subheadline: string;
  introducao: string;
  problema: string;
  solucao: string;
  beneficios: string[];
  provaSocial: string[];
  objecoes: Array<{ objeção: string; resposta: string }>;
  garantia?: string;
  cta: string;
  textoCompleto: string;
}

/**
 * Ideias complementares
 */
export interface ComplementaryIdeas {
  seriesVideos: string[];
  emails: string[];
  anuncios: string[];
  remarketing: string[];
  crossPlatform: string[];
}

/**
 * Títulos e CTAs testáveis
 */
export interface TestableTitles {
  titulos: Array<{ titulo: string; angulo: string }>;
  ctas: Array<{ cta: string; urgencia: string }>;
  headlines: Array<{ headline: string; gatilho: string }>;
}

/**
 * Resposta completa do copywriter
 */
export interface CopywriterResponse {
  // Passo 1
  publicoAlvo: TargetAudience;
  
  // Passo 2
  estruturaCopy: CopyStructure;
  
  // Passo 3
  promessa: UniquePromise;
  
  // Passo 4
  funilConteudo: ContentFunnel;
  
  // Passo 5
  roteirosVideos: ViralVideoScript[];
  
  // Passo 6
  conteudosUGC: UGCContent[];
  
  // Passo 7
  textosVendas: SalesCopy[];
  
  // Passo 8
  ideiasComplementares: ComplementaryIdeas;
  
  // Passo 9
  titulosCTAs: TestableTitles;
  
  // Passo 10
  linguagemAdaptada: {
    tom: string;
    vocabulario: string[];
    exemplos: string[];
    adaptacoesPorCanal: Record<string, string>;
  };
  
  // Resumo executivo
  resumoExecutivo: string;
}

