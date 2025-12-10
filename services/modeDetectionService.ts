export type UserIntent = 'copywriter' | 'erl' | 'geral';

/**
 * Detecta a intenção do usuário baseado na mensagem
 */
export const detectUserIntent = (message: string): UserIntent => {
  const normalizedMessage = message.toLowerCase().trim();

  // Palavras-chave para modo copywriter
  const copywriterKeywords = [
    'copy',
    'copywriter',
    'copywriting',
    'roteiro',
    'roteiros',
    'vídeo viral',
    'video viral',
    'texto de venda',
    'texto de vendas',
    'landing page',
    'página de venda',
    'vsl',
    'anúncio',
    'anúncios',
    'funil',
    'funis',
    'conteúdo viral',
    'conteudo viral',
    'reels',
    'shorts',
    'tiktok',
    'ugc',
    'headline',
    'cta',
    'storytelling',
    'promessa',
    'mecanismo',
    'aida',
    'storybrand',
    'big idea',
    'criar conteúdo',
    'criar conteudo',
    'estrategia de conteudo',
    'estratégia de conteúdo',
    'público-alvo',
    'publico alvo',
    'análise de público',
    'analise de publico',
  ];

  // Verificar se a mensagem contém palavras-chave de copywriter
  const hasCopywriterIntent = copywriterKeywords.some(keyword => 
    normalizedMessage.includes(keyword)
  );

  if (hasCopywriterIntent) {
    return 'copywriter';
  }

  // Palavras-chave para modo ERL (já existente)
  const erlKeywords = [
    'produto',
    'oferta',
    'método erl',
    'metodo erl',
    'entrada relacionamento lucro',
    'funil url',
    'plano de conteúdo',
    'plano de conteudo',
  ];

  const hasErlIntent = erlKeywords.some(keyword => 
    normalizedMessage.includes(keyword)
  );

  if (hasErlIntent) {
    return 'erl';
  }

  // Padrão geral
  return 'geral';
};

/**
 * Verifica se o usuário quer ativar modo copywriter explicitamente
 */
export const isExplicitCopywriterRequest = (message: string): boolean => {
  const normalizedMessage = message.toLowerCase().trim();
  
  const explicitCommands = [
    '/copywriter',
    '/copy',
    'modo copywriter',
    'ativar copywriter',
    'quero copywriter',
    'preciso de copywriter',
  ];

  return explicitCommands.some(cmd => normalizedMessage.includes(cmd));
};

