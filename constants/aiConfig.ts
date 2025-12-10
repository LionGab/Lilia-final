// Configurações de IA
export const AI_CONFIG = {
  // Modelos disponíveis - API 2.0
  models: {
    default: 'gemini-2.0-flash-exp', // Modelo mais recente com 1M tokens de contexto
    pro: 'gemini-2.0-flash-thinking-exp', // Modelo com thinking
    image: 'gemini-2.0-flash-exp', // Suporta imagens
    fallback: 'gemini-1.5-flash', // Fallback para versão anterior
  },
  
  // Timeouts
  timeout: 60000, // 60 segundos
  retryTimeout: 5000, // 5 segundos entre retries
  
  // Retry configuration
  maxRetries: 3,
  retryDelay: 1000, // 1 segundo inicial
  
  // Cache configuration
  cacheEnabled: true,
  cacheTTL: 3600000, // 1 hora em milissegundos
  
  // Thinking budget para modelos Pro
  thinkingBudget: 32768,
  
  // Configurações de streaming (quando disponível)
  streamingEnabled: false,
};

