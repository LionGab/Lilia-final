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
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
          title="Sair"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;