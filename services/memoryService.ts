/**
 * Serviço de Memória - Integração Supabase + localStorage
 * 
 * Estratégia híbrida:
 * - Tenta salvar no Supabase primeiro (memória persistente)
 * - Se falhar, usa localStorage como fallback
 * - Sempre sincroniza quando possível
 */

import { getCurrentUser } from './authService';
import { logger } from './logger';
import {
  createConversation,
  getConversations,
  updateConversationTitle,
  addMessage,
  getMessages,
} from './supabase/database';
import { getUserByEmail } from './supabase/database';
import type { Message as SupabaseMessage } from './supabase/types';
import type { Message } from '../types';
import { Sender } from '../types';
import type { AgentId } from '../config/agents';

/**
 * Converte Message (tipo interno) para formato Supabase
 */
const messageToSupabase = (message: Message, conversationId: string): {
  conversation_id: string;
  sender: 'user' | 'ai';
  text: string;
  metadata: Record<string, unknown>;
} => {
  return {
    conversation_id: conversationId,
    sender: message.sender === Sender.User ? 'user' : 'ai',
    text: message.text || '',
    metadata: {
      imageUrl: message.imageUrl,
      imageMimeType: message.imageMimeType,
      audioUrl: message.audioUrl,
      timestamp: message.timestamp,
    },
  };
};

/**
 * Converte Message do Supabase para tipo interno
 */
const messageFromSupabase = (msg: SupabaseMessage): Message => {
  const metadata = (msg.metadata as Record<string, unknown>) || {};
  return {
    id: msg.id,
    text: msg.text || undefined,
    sender: msg.sender === 'user' ? Sender.User : Sender.AI,
    timestamp: new Date(msg.created_at).getTime(),
    imageUrl: metadata.imageUrl as string | undefined,
    imageMimeType: metadata.imageMimeType as string | undefined,
    audioUrl: metadata.audioUrl as string | undefined,
  };
};

/**
 * Obtém ou cria usuário no Supabase
 */
const getOrCreateUser = async (email: string): Promise<string | null> => {
  try {
    let user = await getUserByEmail(email);
    
    if (!user) {
      // Criar usuário se não existir
      // Nota: Isso requer que a tabela users tenha uma policy que permita INSERT
      // Por enquanto, retornamos null e usamos fallback
      logger.warn('Usuário não encontrado no Supabase, usando fallback', { email });
      return null;
    }
    
    return user.id;
  } catch (error) {
    logger.error('Erro ao buscar/criar usuário', { email, error });
    return null;
  }
};

/**
 * Cria uma nova conversa (tenta Supabase, fallback para localStorage)
 */
export const createMemoryConversation = async (
  agentId: AgentId,
  title?: string
): Promise<{ id: string; isSupabase: boolean }> => {
  const user = getCurrentUser();
  if (!user) {
    // Fallback: criar thread local
    const threadId = `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return { id: threadId, isSupabase: false };
  }

  try {
    const userId = await getOrCreateUser(user.email);
    if (!userId) {
      // Fallback para localStorage
      const threadId = `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      return { id: threadId, isSupabase: false };
    }

    const conversation = await createConversation({
      user_id: userId,
      agent_id: agentId,
      title: title || 'Nova Conversa',
    });

    logger.info('Conversa criada no Supabase', { conversationId: conversation.id, agentId });
    return { id: conversation.id, isSupabase: true };
  } catch (error) {
    logger.warn('Falha ao criar conversa no Supabase, usando fallback', { error });
    // Fallback para localStorage
    const threadId = `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return { id: threadId, isSupabase: false };
  }
};

/**
 * Salva mensagem (tenta Supabase, fallback para localStorage)
 */
export const saveMemoryMessage = async (
  conversationId: string,
  message: Message,
  isSupabase: boolean
): Promise<void> => {
  if (isSupabase) {
    try {
      await addMessage(messageToSupabase(message, conversationId));
      logger.debug('Mensagem salva no Supabase', { conversationId });
      return;
    } catch (error) {
      logger.warn('Falha ao salvar mensagem no Supabase, usando fallback', { error });
      // Continuar para fallback
    }
  }

  // Fallback: localStorage
  const storageKey = `erl_lia_thread_${conversationId}_${getCurrentUser()?.email || 'v1'}`;
  const existing = localStorage.getItem(storageKey);
  const messages: Message[] = existing ? JSON.parse(existing) : [];
  messages.push(message);
  localStorage.setItem(storageKey, JSON.stringify(messages));
};

/**
 * Carrega mensagens (tenta Supabase, fallback para localStorage)
 */
export const loadMemoryMessages = async (
  conversationId: string,
  isSupabase: boolean
): Promise<Message[]> => {
  if (isSupabase) {
    try {
      const supabaseMessages = await getMessages(conversationId);
      const messages = supabaseMessages.map(messageFromSupabase);
      logger.debug('Mensagens carregadas do Supabase', { conversationId, count: messages.length });
      return messages;
    } catch (error) {
      logger.warn('Falha ao carregar mensagens do Supabase, usando fallback', { error });
      // Continuar para fallback
    }
  }

  // Fallback: localStorage
  const storageKey = `erl_lia_thread_${conversationId}_${getCurrentUser()?.email || 'v1'}`;
  const saved = localStorage.getItem(storageKey);
  if (!saved) return [];
  
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

/**
 * Lista conversas do usuário (tenta Supabase, fallback para localStorage)
 */
export const listMemoryConversations = async (): Promise<Array<{
  id: string;
  title: string;
  agentId: string;
  lastMessage?: string;
  lastMessageTime: number;
  isSupabase: boolean;
}>> => {
  const user = getCurrentUser();
  if (!user) return [];

  try {
    const userId = await getOrCreateUser(user.email);
    if (userId) {
      const conversations = await getConversations(userId);
      return conversations.map(conv => ({
        id: conv.id,
        title: conv.title,
        agentId: conv.agent_id,
        lastMessageTime: new Date(conv.updated_at).getTime(),
        isSupabase: true,
      }));
    }
  } catch (error) {
    logger.warn('Falha ao listar conversas do Supabase, usando fallback', { error });
  }

  // Fallback: localStorage
  const storageKey = `erl_lia_threads_${user.email}`;
  const saved = localStorage.getItem(storageKey);
  if (!saved) return [];
  
  try {
    const threads = JSON.parse(saved);
    return threads.map((t: { id: string; title: string; lastMessageTime: number }) => ({
      id: t.id,
      title: t.title,
      agentId: 'lia-erl', // Default, não temos essa info no localStorage antigo
      lastMessage: '',
      lastMessageTime: t.lastMessageTime,
      isSupabase: false,
    }));
  } catch {
    return [];
  }
};

/**
 * Atualiza título da conversa
 */
export const updateMemoryConversationTitle = async (
  conversationId: string,
  title: string,
  isSupabase: boolean
): Promise<void> => {
  if (isSupabase) {
    try {
      await updateConversationTitle(conversationId, title);
      return;
    } catch (error) {
      logger.warn('Falha ao atualizar título no Supabase', { error });
    }
  }

  // Fallback: atualizar localStorage
  const user = getCurrentUser();
  if (user) {
    const storageKey = `erl_lia_threads_${user.email}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const threads = JSON.parse(saved);
        const updated = threads.map((t: { id: string }) => 
          t.id === conversationId ? { ...t, title } : t
        );
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // Ignorar erro
      }
    }
  }
};

