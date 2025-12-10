export interface BusinessIdea {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  targetAudience: string;
  revenueModel: string;
  entryPoint: string;
  tips: string[];
}

export const BUSINESS_IDEAS: BusinessIdea[] = [
  {
    id: 'ia-conversacional',
    title: 'Plataforma de IA Conversacional',
    category: 'Tecnologia',
    description: 'Crie uma plataforma similar ao ChatGPT com assinatura mensal. Foque em nichos específicos como IA para empresas, estudantes ou criadores de conteúdo.',
    icon: '🤖',
    targetAudience: 'Empresas, profissionais e estudantes que precisam de assistência por IA',
    revenueModel: 'Assinatura mensal (R$ 29-99/mês) + Plano empresarial',
    entryPoint: 'Versão gratuita com limite de mensagens + Desafio "7 dias com IA"',
    tips: [
      'Diferencie-se com modelos especializados por nicho',
      'Ofereça integrações com ferramentas populares',
      'Crie comunidade exclusiva para assinantes',
      'Foque em casos de uso específicos (ex: IA para copywriting)'
    ]
  },
  {
    id: 'curso-online-nicho',
    title: 'Curso Online em Nicho Específico',
    category: 'Educação',
    description: 'Crie um curso completo sobre um tema específico que você domina. Ex: "Marketing para Nutricionistas", "Finanças para Psicólogos".',
    icon: '📚',
    targetAudience: 'Profissionais que querem aprender uma habilidade específica',
    revenueModel: 'Venda única (R$ 497-1997) + Comunidade mensal (R$ 97/mês)',
    entryPoint: 'Mini-curso gratuito + Desafio de 5 dias + Webinar ao vivo',
    tips: [
      'Escolha um nicho que você realmente domina',
      'Crie conteúdo prático e acionável',
      'Ofereça garantia de 30 dias',
      'Construa comunidade ao redor do curso',
      'Faça atualizações regulares do conteúdo'
    ]
  },
  {
    id: 'consultoria-digital',
    title: 'Consultoria Digital Especializada',
    category: 'Serviços',
    description: 'Ofereça consultoria em estratégias digitais para um nicho específico. Ex: "Consultoria de Marketing para Clínicas", "Estratégia Digital para Escolas".',
    icon: '💼',
    targetAudience: 'Pequenas e médias empresas que querem crescer online',
    revenueModel: 'Pacotes de consultoria (R$ 2.000-10.000) + Retainer mensal',
    entryPoint: 'Consulta estratégica gratuita + Diagnóstico gratuito',
    tips: [
      'Especialize-se em um nicho específico',
      'Crie cases de sucesso documentados',
      'Ofereça resultados mensuráveis',
      'Use sistema de retainer para receita recorrente',
      'Crie produtos digitais complementares'
    ]
  },
  {
    id: 'mentoria-grupo',
    title: 'Mentoria em Grupo',
    category: 'Desenvolvimento',
    description: 'Crie um programa de mentoria em grupo com encontros semanais, comunidade e materiais exclusivos. Foque em resultados em 90 dias.',
    icon: '🎯',
    targetAudience: 'Profissionais que querem acelerar resultados com accountability',
    revenueModel: 'Programa de 3 meses (R$ 997-2997) + Continuidade mensal',
    entryPoint: 'Workshop gratuito + Desafio de 7 dias + Entrevista de seleção',
    tips: [
      'Limite o número de participantes (10-20 pessoas)',
      'Crie comunidade ativa (WhatsApp/Telegram)',
      'Faça encontros semanais ao vivo',
      'Documente a jornada dos participantes',
      'Ofereça bônus e materiais exclusivos'
    ]
  },
  {
    id: 'software-saas',
    title: 'Software como Serviço (SaaS)',
    category: 'Tecnologia',
    description: 'Desenvolva uma ferramenta SaaS para resolver um problema específico. Ex: "Gestão de Clientes para Nutricionistas", "Agenda Online para Psicólogos".',
    icon: '💻',
    targetAudience: 'Profissionais que precisam de uma ferramenta específica',
    revenueModel: 'Assinatura mensal (R$ 49-299/mês) + Plano anual com desconto',
    entryPoint: 'Versão gratuita limitada + Trial de 14 dias + Webinar de demonstração',
    tips: [
      'Resolva um problema real e específico',
      'Comece com MVP (produto mínimo viável)',
      'Colete feedback constantemente',
      'Foque em retenção, não apenas aquisição',
      'Ofereça integrações com ferramentas populares'
    ]
  },
  {
    id: 'comunidade-premium',
    title: 'Comunidade Premium',
    category: 'Comunidade',
    description: 'Crie uma comunidade exclusiva com conteúdo, networking e suporte. Ex: "Comunidade de Empreendedores Digitais", "Clube de Criadores de Conteúdo".',
    icon: '👥',
    targetAudience: 'Pessoas que querem networking e conteúdo exclusivo',
    revenueModel: 'Assinatura mensal (R$ 97-297/mês) + Plano anual',
    entryPoint: 'Grupo gratuito no Telegram + Conteúdo de valor + Evento ao vivo',
    tips: [
      'Defina claramente o propósito da comunidade',
      'Crie eventos regulares (lives, workshops)',
      'Facilite networking entre membros',
      'Ofereça conteúdo exclusivo semanal',
      'Tenha moderadores ativos'
    ]
  },
  {
    id: 'marketplace-nicho',
    title: 'Marketplace de Nicho',
    category: 'E-commerce',
    description: 'Crie uma plataforma que conecta compradores e vendedores em um nicho específico. Ex: "Marketplace de Serviços para Pets", "Plataforma de Aulas Online".',
    icon: '🛒',
    targetAudience: 'Vendedores e compradores de um nicho específico',
    revenueModel: 'Comissão por transação (10-20%) + Taxa de listagem',
    entryPoint: 'Cadastro gratuito para vendedores + Primeiras vendas sem comissão',
    tips: [
      'Escolha um nicho com alta demanda',
      'Facilite o processo de cadastro',
      'Garanta qualidade dos vendedores',
      'Ofereça suporte ao cliente',
      'Crie sistema de avaliações'
    ]
  },
  {
    id: 'newsletter-premium',
    title: 'Newsletter Premium',
    category: 'Conteúdo',
    description: 'Crie uma newsletter paga com insights exclusivos, análises e estratégias. Ex: "Newsletter de Marketing Digital", "Insights de Negócios".',
    icon: '📧',
    targetAudience: 'Profissionais que querem insights exclusivos',
    revenueModel: 'Assinatura mensal (R$ 47-147/mês) + Plano anual',
    entryPoint: 'Newsletter gratuita semanal + Conteúdo de valor + Preview do premium',
    tips: [
      'Crie conteúdo de altíssima qualidade',
      'Seja consistente (mesmo dia, mesma hora)',
      'Ofereça análises exclusivas',
      'Inclua casos de estudo reais',
      'Crie comunidade exclusiva para assinantes'
    ]
  },
  {
    id: 'app-mobile-nicho',
    title: 'App Mobile para Nicho',
    category: 'Mobile',
    description: 'Desenvolva um app mobile que resolve um problema específico. Ex: "App de Meditação para Ansiedade", "App de Gestão Financeira Pessoal".',
    icon: '📱',
    targetAudience: 'Usuários que precisam de uma solução mobile específica',
    revenueModel: 'Freemium (gratuito + premium) + Assinatura mensal (R$ 19-49)',
    entryPoint: 'App gratuito com funcionalidades básicas + Trial premium',
    tips: [
      'Foque em uma funcionalidade principal',
      'Design intuitivo e fácil de usar',
      'Colete feedback dos usuários',
      'Atualize regularmente',
      'Monetize com premium, não com anúncios'
    ]
  },
  {
    id: 'evento-online',
    title: 'Evento Online Recorrente',
    category: 'Eventos',
    description: 'Crie um evento online mensal ou trimestral com palestrantes, workshops e networking. Ex: "Summit de Marketing Digital", "Conferência de Empreendedorismo".',
    icon: '🎤',
    targetAudience: 'Profissionais que querem aprender e fazer networking',
    revenueModel: 'Ingresso (R$ 197-997) + Patrocínios + Vendas de produtos',
    entryPoint: 'Evento gratuito menor + Preview do evento pago + Early bird',
    tips: [
      'Tenha palestrantes de alto nível',
      'Crie networking estruturado',
      'Ofereça gravações para quem não pode assistir',
      'Venda produtos complementares',
      'Construa comunidade ao redor do evento'
    ]
  }
];

export const BUSINESS_TIPS = [
  {
    category: 'Validação',
    tips: [
      'Valide sua ideia antes de investir muito tempo e dinheiro',
      'Faça uma landing page e veja quantas pessoas se interessam',
      'Ofereça uma versão beta gratuita para primeiros usuários',
      'Colete feedback constantemente e itere rápido'
    ]
  },
  {
    category: 'Precificação',
    tips: [
      'Comece com preço mais baixo e aumente gradualmente',
      'Ofereça garantia para reduzir objeções',
      'Crie múltiplas opções de preço (básico, premium, enterprise)',
      'Use preços psicológicos (R$ 97 ao invés de R$ 100)'
    ]
  },
  {
    category: 'Marketing',
    tips: [
      'Foque em um canal principal primeiro (ex: Instagram)',
      'Crie conteúdo de valor antes de vender',
      'Use storytelling para conectar com seu público',
      'Colabore com outros criadores do seu nicho',
      'Invista em email marketing desde o início'
    ]
  },
  {
    category: 'Vendas',
    tips: [
      'Crie um funil simples: Entrada → Relacionamento → Lucro',
      'Ofereça algo gratuito de valor para capturar leads',
      'Aqueça seu público antes de fazer ofertas',
      'Use prova social (depoimentos, cases)',
      'Crie urgência e escassez (mas seja honesto)'
    ]
  },
  {
    category: 'Escalabilidade',
    tips: [
      'Automatize processos desde o início',
      'Crie produtos digitais que não dependem do seu tempo',
      'Construa sistemas, não apenas entregue serviços',
      'Pense em receita recorrente (assinaturas)',
      'Documente tudo para poder delegar depois'
    ]
  },
  {
    category: 'Produtividade',
    tips: [
      'Foque em uma coisa de cada vez',
      'Use a regra 80/20: 20% do esforço gera 80% dos resultados',
      'Automatize tarefas repetitivas',
      'Use ferramentas de produtividade (Trello, Notion, etc.)',
      'Tenha horários definidos para trabalhar'
    ]
  }
];

