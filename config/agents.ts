import { LIA_SYSTEM_PROMPT } from '../constants';
import { COPYWRITER_SYSTEM_PROMPT } from '../constants/copywriterPrompt';
import {
  ARQUITETO_CAMPANHA_PROMPT,
  ARQUITETO_OFERTA_11_ESTRELAS_PROMPT,
  ARQUITETO_PRODUTO_PROMPT,
} from '../constants/agentPrompts';

export type AgentId =
  | 'lia-erl'
  | 'copywriter'
  | 'arquiteto-produto'
  | 'arquiteto-campanha'
  | 'arquiteto-oferta';

export type AgentCategory = 'erl' | 'copywriter' | 'analise' | 'outros';
export type AgentColor = 'orange' | 'blue' | 'purple' | 'green';

export interface AgentCapabilities {
  /** Se deve aplicar o estilo do onboarding (ex: direto/amigável) */
  supportsUserStyle: boolean;
  /** Se deve aplicar as observações do onboarding */
  supportsUserNotes: boolean;
  /** Declarativo (não aplicado como regra dura ainda) */
  supportsImages: boolean;
  /** Declarativo (não aplicado como regra dura ainda) */
  supportsAudio: boolean;
}

export interface AgentUiConfig {
  icon: string;
  color: AgentColor;
  tags: string[];
}

export interface AgentConfig {
  id: AgentId;
  name: string;
  title: string;
  description: string;
  category: AgentCategory;
  enabled: boolean;
  systemPrompt: string;
  capabilities: AgentCapabilities;
  ui: AgentUiConfig;
}

export const AGENT_REGISTRY: Record<AgentId, AgentConfig> = {
  'lia-erl': {
    id: 'lia-erl',
    name: 'Lyla.IA',
    title: 'Mentora de Negócios - Método ERL',
    description: 'Ajuda a estruturar produtos, funis URL e planos de conteúdo de 7 dias',
    category: 'erl',
    enabled: true,
    systemPrompt: LIA_SYSTEM_PROMPT,
    capabilities: {
      supportsUserStyle: true,
      supportsUserNotes: true,
      supportsImages: true,
      supportsAudio: true,
    },
    ui: {
      icon: '🎯',
      color: 'purple',
      tags: ['Método ERL', 'Produtos', 'Funil'],
    },
  },
  copywriter: {
    id: 'copywriter',
    name: 'Copywriter Profissional',
    title: 'Especialista em Copywriting e Estratégia',
    description:
      'Análise completa de copywriting com 10 passos: público-alvo, promessa, funil, roteiros virais, textos de venda',
    category: 'copywriter',
    enabled: true,
    systemPrompt: COPYWRITER_SYSTEM_PROMPT,
    capabilities: {
      supportsUserStyle: false,
      supportsUserNotes: false,
      supportsImages: true,
      supportsAudio: true,
    },
    ui: {
      icon: '✍️',
      color: 'orange',
      tags: ['Copywriting', 'Vendas', 'Roteiros'],
    },
  },
  'arquiteto-produto': {
    id: 'arquiteto-produto',
    name: 'Arquiteto de Produtos',
    title: 'Criação de Produtos Bestseller',
    description: 'Estrutura produtos digitais de alta conversão com metodologia comprovada',
    category: 'outros',
    enabled: true,
    systemPrompt: ARQUITETO_PRODUTO_PROMPT,
    capabilities: {
      supportsUserStyle: false,
      supportsUserNotes: false,
      supportsImages: true,
      supportsAudio: true,
    },
    ui: {
      icon: '📦',
      color: 'orange',
      tags: ['Arquitetos Iniciais', 'Produtos'],
    },
  },
  'arquiteto-campanha': {
    id: 'arquiteto-campanha',
    name: 'Arquiteto de Campanha',
    title: 'Ideias Centrais de Campanha',
    description: 'Cria as ideias centrais da campanha que irão chamar a atenção do mercado',
    category: 'outros',
    enabled: true,
    systemPrompt: ARQUITETO_CAMPANHA_PROMPT,
    capabilities: {
      supportsUserStyle: false,
      supportsUserNotes: false,
      supportsImages: true,
      supportsAudio: true,
    },
    ui: {
      icon: '💡',
      color: 'orange',
      tags: ['Arquitetos Iniciais', 'Campanhas'],
    },
  },
  'arquiteto-oferta': {
    id: 'arquiteto-oferta',
    name: 'Arquiteto de Oferta 11 Estrelas',
    title: 'Ofertas Irresistíveis',
    description: 'Cria ofertas irresistíveis para a sua campanha com mecanismos únicos',
    category: 'outros',
    enabled: true,
    systemPrompt: ARQUITETO_OFERTA_11_ESTRELAS_PROMPT,
    capabilities: {
      supportsUserStyle: false,
      supportsUserNotes: false,
      supportsImages: true,
      supportsAudio: true,
    },
    ui: {
      icon: '⭐',
      color: 'blue',
      tags: ['Arquitetos Iniciais', 'Ofertas'],
    },
  },
};

export type AgentCategoryId = 'todos' | 'erl' | 'copywriter' | 'arquitetos';
export interface AgentCategoryConfig {
  id: AgentCategoryId;
  label: string;
  icon: string;
}

export const AGENT_CATEGORIES: AgentCategoryConfig[] = [
  { id: 'todos', label: 'Todos os Agentes', icon: '📋' },
  { id: 'erl', label: 'Método ERL', icon: '🎯' },
  { id: 'copywriter', label: 'Copywriting', icon: '✍️' },
  { id: 'arquitetos', label: 'Arquitetos Iniciais', icon: '🏗️' },
];

export const getAgentConfig = (id: string | undefined): AgentConfig => {
  if (!id) return AGENT_REGISTRY['lia-erl'];
  const key = id as AgentId;
  return AGENT_REGISTRY[key] ?? AGENT_REGISTRY['lia-erl'];
};

export const listEnabledAgents = (): AgentConfig[] => {
  return Object.values(AGENT_REGISTRY).filter((a) => a.enabled);
};


