import { User } from '../types/auth';
import { ALLOWED_EMAILS } from '../constants/auth';

const AUTH_STORAGE_KEY = 'erl_auth_user';

/**
 * Verifica se um email está na lista de emails permitidos
 */
export const isEmailAllowed = (email: string): boolean => {
  const normalizedEmail = email.toLowerCase().trim();
  return ALLOWED_EMAILS.some(allowed => allowed.toLowerCase().trim() === normalizedEmail);
};

/**
 * Realiza login do usuário
 */
export const login = (email: string): boolean => {
  const normalizedEmail = email.toLowerCase().trim();
  
  if (!isEmailAllowed(normalizedEmail)) {
    return false;
  }

  const user: User = {
    email: normalizedEmail,
    loginTimestamp: Date.now(),
  };

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados de autenticação:', error);
    return false;
  }
};

/**
 * Realiza logout do usuário
 */
export const logout = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

/**
 * Obtém o usuário atual autenticado
 */
export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!userData) {
      return null;
    }

    const user: User = JSON.parse(userData);
    
    // Verificar se o email ainda está na lista permitida
    if (!isEmailAllowed(user.email)) {
      logout();
      return null;
    }

    return user;
  } catch (error) {
    console.error('Erro ao ler dados de autenticação:', error);
    logout();
    return null;
  }
};

/**
 * Verifica se há um usuário autenticado
 */
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

