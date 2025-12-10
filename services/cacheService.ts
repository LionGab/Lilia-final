import { AI_CONFIG } from '../constants/aiConfig';

interface CacheEntry {
  response: string;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * Gera hash simples da mensagem para usar como chave de cache
 */
const hashMessage = (message: string): string => {
  // Hash simples - em produção usar algo mais robusto
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

/**
 * Verifica se há resposta em cache
 */
export const getCachedResponse = (message: string): string | null => {
  if (!AI_CONFIG.cacheEnabled) {
    return null;
  }

  const key = hashMessage(message.toLowerCase().trim());
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  // Verificar se o cache expirou
  const now = Date.now();
  if (now - entry.timestamp > AI_CONFIG.cacheTTL) {
    cache.delete(key);
    return null;
  }

  return entry.response;
};

/**
 * Salva resposta no cache
 */
export const setCachedResponse = (message: string, response: string): void => {
  if (!AI_CONFIG.cacheEnabled) {
    return;
  }

  const key = hashMessage(message.toLowerCase().trim());
  cache.set(key, {
    response,
    timestamp: Date.now(),
  });

  // Limpar cache antigo periodicamente
  cleanupCache();
};

/**
 * Limpa entradas expiradas do cache
 */
const cleanupCache = (): void => {
  const now = Date.now();
  const keysToDelete: string[] = [];

  cache.forEach((entry, key) => {
    if (now - entry.timestamp > AI_CONFIG.cacheTTL) {
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach(key => cache.delete(key));
};

/**
 * Limpa todo o cache
 */
export const clearCache = (): void => {
  cache.clear();
};

/**
 * Obtém estatísticas do cache
 */
export const getCacheStats = (): { size: number; entries: number } => {
  return {
    size: cache.size,
    entries: cache.size,
  };
};

