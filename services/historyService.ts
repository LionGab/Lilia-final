import { Message } from '../types';
import { Decision } from '../types/analysis';

/**
 * Gera resumo da conversa
 */
export const getConversationSummary = (messages: Message[]): string => {
  if (messages.length === 0) {
    return 'Nenhuma conversa ainda.';
  }
  
  const userMessages = messages.filter(m => m.sender === 'user');
  const aiMessages = messages.filter(m => m.sender === 'ai');
  
  const firstUserMessage = userMessages[0]?.text || 'Sem mensagens do usuário';
  const lastAiMessage = aiMessages[aiMessages.length - 1]?.text || 'Sem resposta da IA';
  
  return `Conversa iniciada: ${firstUserMessage.substring(0, 100)}...\nÚltima resposta: ${lastAiMessage.substring(0, 100)}...`;
};

/**
 * Busca no histórico
 */
export const searchHistory = (query: string, messages: Message[]): Message[] => {
  const normalizedQuery = query.toLowerCase();
  
  return messages.filter(msg => {
    if (msg.text) {
      return msg.text.toLowerCase().includes(normalizedQuery);
    }
    return false;
  });
};

/**
 * Extrai decisões importantes
 */
export const getKeyDecisions = (messages: Message[]): Decision[] => {
  const decisions: Decision[] = [];
  const allText = messages.map(m => m.text || '').join(' ').toLowerCase();
  
  // Detectar decisões sobre produtos
  if (allText.includes('produto') && (allText.includes('escolh') || allText.includes('defin'))) {
    decisions.push({
      tipo: 'produto',
      descricao: 'Produto principal definido',
      timestamp: Date.now(),
      impacto: 'alto',
    });
  }
  
  // Detectar decisões sobre funil
  if (allText.includes('funil') && allText.includes('criado')) {
    decisions.push({
      tipo: 'funil',
      descricao: 'Funil URL criado',
      timestamp: Date.now(),
      impacto: 'alto',
    });
  }
  
  // Detectar decisões sobre conteúdo
  if (allText.includes('plano de conteúdo') || allText.includes('7 dias')) {
    decisions.push({
      tipo: 'conteudo',
      descricao: 'Plano de conteúdo criado',
      timestamp: Date.now(),
      impacto: 'medio',
    });
  }
  
  // Detectar decisões sobre preço
  if (allText.includes('preço') || allText.includes('r$')) {
    const precoMatch = allText.match(/r\$\s*([\d.,]+)/);
    decisions.push({
      tipo: 'preco',
      descricao: precoMatch ? `Preço definido: R$ ${precoMatch[1]}` : 'Preço discutido',
      timestamp: Date.now(),
      impacto: 'medio',
    });
  }
  
  return decisions;
};

/**
 * Agrupa conversas por sessão/data
 */
export interface ConversationSession {
  id: string;
  date: string;
  summary: string;
  messageCount: number;
  messages: Message[];
}

export const groupConversationsBySession = (messages: Message[]): ConversationSession[] => {
  if (messages.length === 0) {
    return [];
  }
  
  // Agrupar por data (simplificado - em produção seria mais sofisticado)
  const sessions: ConversationSession[] = [];
  const sessionMap = new Map<string, Message[]>();
  
  messages.forEach(msg => {
    const date = new Date(msg.timestamp).toLocaleDateString('pt-BR');
    if (!sessionMap.has(date)) {
      sessionMap.set(date, []);
    }
    sessionMap.get(date)!.push(msg);
  });
  
  sessionMap.forEach((msgs, date) => {
    sessions.push({
      id: `session-${date}`,
      date,
      summary: getConversationSummary(msgs),
      messageCount: msgs.length,
      messages: msgs,
    });
  });
  
  return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

