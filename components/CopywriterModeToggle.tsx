import React from 'react';

interface CopywriterModeToggleProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

const CopywriterModeToggle: React.FC<CopywriterModeToggleProps> = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(!isActive)}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        isActive
          ? 'bg-brand-600 dark:bg-brand-500 text-white'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
      }`}
      title={isActive ? 'Modo Copywriter ativo' : 'Ativar modo Copywriter'}
    >
      {isActive ? '✍️ Copywriter' : '✍️ Copywriter'}
    </button>
  );
};

export default CopywriterModeToggle;

