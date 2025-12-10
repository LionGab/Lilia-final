import { getCurrentUser } from './authService';

const OLD_STORAGE_KEY = 'erl_lia_chat_history_v1';
const OLD_ONBOARDING_KEY = 'erl_lia_onboarding';

/**
 * Migra dados antigos para estrutura por usuário
 */
export const migrateOldData = (): void => {
  try {
    const user = getCurrentUser();
    if (!user) {
      return; // Sem usuário, não há o que migrar
    }

    const userId = user.email;

    // Migrar histórico de chat
    const oldHistory = localStorage.getItem(OLD_STORAGE_KEY);
    if (oldHistory) {
      const newKey = `erl_lia_chat_history_${userId}`;
      if (!localStorage.getItem(newKey)) {
        localStorage.setItem(newKey, oldHistory);
        // Não remover o antigo imediatamente para segurança
        console.log('Histórico migrado para estrutura por usuário');
      }
    }

    // Migrar dados de onboarding
    const oldOnboarding = localStorage.getItem(OLD_ONBOARDING_KEY);
    if (oldOnboarding) {
      const newKey = `erl_lia_onboarding_${userId}`;
      if (!localStorage.getItem(newKey)) {
        localStorage.setItem(newKey, oldOnboarding);
        console.log('Onboarding migrado para estrutura por usuário');
      }
    }
  } catch (error) {
    console.error('Erro ao migrar dados:', error);
  }
};

/**
 * Limpa dados antigos após migração confirmada
 */
export const cleanupOldData = (): void => {
  try {
    // Só limpar se houver usuário autenticado
    const user = getCurrentUser();
    if (user) {
      // Aguardar alguns dias antes de limpar (opcional)
      // Por enquanto, manter os dados antigos como backup
      console.log('Dados antigos mantidos como backup');
    }
  } catch (error) {
    console.error('Erro ao limpar dados antigos:', error);
  }
};

/**
 * Verifica e executa migração se necessário
 */
export const checkAndMigrate = (): void => {
  const user = getCurrentUser();
  if (user) {
    migrateOldData();
  }
};

