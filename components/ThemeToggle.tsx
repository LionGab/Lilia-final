import React, { useState, useEffect } from 'react';
import { getTheme, setTheme, toggleTheme, initTheme } from '../services/themeService';

const ThemeToggle: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Inicializar tema
    initTheme();
    setCurrentTheme(getTheme());

    // Observar mudanças no tema
    const observer = new MutationObserver(() => {
      setCurrentTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      title={currentTheme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
    >
      {currentTheme === 'light' ? (
        <span className="text-lg">🌙</span>
      ) : (
        <span className="text-lg">☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;

