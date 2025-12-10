import React from 'react';
import { getCurrentUser, logout } from '../services/authService';
import ThemeToggle from './ThemeToggle';

interface ChatHeaderProps {
  onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onBack }) => {
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    window.location.reload(); // Recarregar para mostrar LoginScreen
  };

  return (
    <header className="flex-none bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-3 flex items-center justify-between z-10 sticky top-0">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
            title="Voltar para Agentes"
          >
            <span className="text-lg">←</span>
          </button>
        )}
        <div className="w-8 h-8 rounded-lg bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white font-semibold text-sm">
          F
        </div>
        <div>
          <h1 className="font-semibold text-slate-900 dark:text-white text-base leading-tight">Funil ERL</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Método ERL</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <span className="text-xs text-slate-500 dark:text-slate-400">{user.email}</span>
        )}
        <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">Gemini 2.0</span>
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Sair
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;