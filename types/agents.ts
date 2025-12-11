export interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  category: 'erl' | 'copywriter' | 'analise' | 'outros';
  color: 'orange' | 'blue' | 'purple' | 'green';
  enabled: boolean;
}

export const AGENTS: Agent[] = [
  {
    id: 'lia-erl',
    name: 'Lyla.IA',
    title: 'Mentora de Negócios - Método ERL',
    description: 'Ajuda a estruturar produtos, funis URL e planos de conteúdo de 7 dias',
    icon: '🎯',
    tags: ['Método ERL', 'Produtos', 'Funil'],
    category: 'erl',
    color: 'purple',
    enabled: true,
  },
  {
    id: 'copywriter',
    name: 'Copywriter Profissional',
    title: 'Especialista em Copywriting e Estratégia',
    description: 'Análise completa de copywriting com 10 passos: público-alvo, promessa, funil, roteiros virais, textos de venda',
    icon: '✍️',
    tags: ['Copywriting', 'Vendas', 'Roteiros'],
    category: 'copywriter',
    color: 'orange',
    enabled: true,
  },
  {
    id: 'arquiteto-produto',
    name: 'Arquiteto de Produtos',
    title: 'Criação de Produtos Bestseller',
    description: 'Estrutura produtos digitais de alta conversão com metodologia comprovada',
    icon: '📦',
    tags: ['Arquitetos Iniciais', 'Produtos'],
    category: 'outros',
    color: 'orange',
    enabled: true,
  },
  {
    id: 'arquiteto-campanha',
    name: 'Arquiteto de Campanha',
    title: 'Ideias Centrais de Campanha',
    description: 'Cria as ideias centrais da campanha que irão chamar a atenção do mercado',
    icon: '💡',
    tags: ['Arquitetos Iniciais', 'Campanhas'],
    category: 'outros',
    color: 'orange',
    enabled: true,
  },
  {
    id: 'arquiteto-oferta',
    name: 'Arquiteto de Oferta 11 Estrelas',
    title: 'Ofertas Irresistíveis',
    description: 'Cria ofertas irresistíveis para a sua campanha com mecanismos únicos',
    icon: '⭐',
    tags: ['Arquitetos Iniciais', 'Ofertas'],
    category: 'outros',
    color: 'blue',
    enabled: true,
  },
];

export const CATEGORIES = [
  { id: 'todos', label: 'Todos os Agentes', icon: '📋' },
  { id: 'erl', label: 'Método ERL', icon: '🎯' },
  { id: 'copywriter', label: 'Copywriting', icon: '✍️' },
  { id: 'arquitetos', label: 'Arquitetos Iniciais', icon: '🏗️' },
];

