export interface BusinessTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  data: {
    profissao: string;
    habilidadePrincipal: string;
    ofertaAtual: string;
    publicoAlvo: string;
    problemaPrincipal: string;
    diferencial: string;
  };
}

export const BUSINESS_TEMPLATES: BusinessTemplate[] = [
  {
    id: 'chatgpt',
    name: 'Um negócio igual o ChatGPT',
    description: 'Plataforma de IA conversacional com assinatura mensal',
    icon: '🤖',
    data: {
      profissao: 'Empreendedor de IA',
      habilidadePrincipal: 'Desenvolvimento de IA e Chatbots',
      ofertaAtual: 'Assinatura de plataforma de IA conversacional',
      publicoAlvo: 'Empresas e profissionais que precisam de assistência por IA',
      problemaPrincipal: 'Falta de acesso fácil e acessível a inteligência artificial avançada',
      diferencial: 'Interface simples, respostas instantâneas, múltiplos modelos de IA'
    }
  },
  {
    id: 'consultor-digital',
    name: 'Consultor Digital',
    description: 'Consultoria em estratégias digitais e marketing',
    icon: '💼',
    data: {
      profissao: 'Consultor Digital',
      habilidadePrincipal: 'Estratégia Digital e Marketing',
      ofertaAtual: 'Consultoria em estratégias digitais',
      publicoAlvo: 'Pequenas e médias empresas que querem crescer online',
      problemaPrincipal: 'Falta de conhecimento em marketing digital e estratégias online',
      diferencial: 'Metodologia comprovada, resultados rápidos, acompanhamento personalizado'
    }
  },
  {
    id: 'coach-online',
    name: 'Coach Online',
    description: 'Coaching em grupo com programa estruturado',
    icon: '🎯',
    data: {
      profissao: 'Coach',
      habilidadePrincipal: 'Desenvolvimento Pessoal e Profissional',
      ofertaAtual: 'Programa de coaching em grupo',
      publicoAlvo: 'Profissionais que querem acelerar resultados',
      problemaPrincipal: 'Falta de direcionamento e accountability para alcançar metas',
      diferencial: 'Metodologia exclusiva, comunidade ativa, resultados em 90 dias'
    }
  },
  {
    id: 'curso-online',
    name: 'Criador de Cursos',
    description: 'Cursos online gravados com comunidade',
    icon: '📚',
    data: {
      profissao: 'Criador de Conteúdo Educacional',
      habilidadePrincipal: 'Criação de Conteúdo e Ensino',
      ofertaAtual: 'Curso online completo com acesso vitalício',
      publicoAlvo: 'Pessoas que querem aprender uma habilidade específica',
      problemaPrincipal: 'Falta de conhecimento estruturado e acessível',
      diferencial: 'Conteúdo prático, atualizações constantes, comunidade exclusiva'
    }
  },
  {
    id: 'personalizado',
    name: 'Personalizado',
    description: 'Crie seu próprio negócio do zero',
    icon: '✨',
    data: {
      profissao: '',
      habilidadePrincipal: '',
      ofertaAtual: '',
      publicoAlvo: '',
      problemaPrincipal: '',
      diferencial: ''
    }
  }
];

export const RESPONSE_STYLES = [
  {
    id: 'direto',
    name: 'Direto e Objetivo',
    description: 'Respostas curtas, diretas ao ponto, sem enrolação',
    icon: '⚡'
  },
  {
    id: 'amigavel',
    name: 'Amigável e Próximo',
    description: 'Tom conversacional, caloroso, como um amigo experiente',
    icon: '🤝'
  },
  {
    id: 'profissional',
    name: 'Profissional e Técnico',
    description: 'Linguagem formal, termos técnicos, foco em precisão',
    icon: '💼'
  },
  {
    id: 'motivacional',
    name: 'Motivacional e Inspirador',
    description: 'Tom energético, encorajador, foco em potencial e resultados',
    icon: '🚀'
  },
  {
    id: 'educativo',
    name: 'Educativo e Didático',
    description: 'Explicações detalhadas, exemplos práticos, passo a passo',
    icon: '📖'
  }
];

