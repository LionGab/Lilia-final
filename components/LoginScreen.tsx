import React, { useState, useEffect } from 'react';
import { login } from '../services/authService';
import { initTheme } from '../services/themeService';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { Avatar } from './ui/Avatar';
import { cn, TYPOGRAPHY } from '../theme/tokens';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initTheme();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Por favor, insira seu email.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = login(trimmedEmail);

      if (success) {
        onLoginSuccess();
      } else {
        setError('Este email não está autorizado. Entre em contato com o administrador.');
      }

      setIsLoading(false);
    }, 300);
  };

  return (
    <main
      className="min-h-screen w-full bg-black flex items-center justify-center p-4 sm:p-6"
      role="main"
      aria-labelledby="login-title"
    >
      <Card
        variant="default"
        padding="lg"
        className="w-full max-w-md bg-slate-900 border-slate-800"
      >
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Avatar
              src="/images/logo-main.jpg"
              alt="LYLY-IA Logo"
              fallback="L"
              size="xl"
              agentColor="purple"
              className="ring-4 ring-brand-500/30"
            />
          </div>
          <h1
            id="login-title"
            className={cn(TYPOGRAPHY.h1, 'text-white mb-2')}
          >
            LYLY-IA
          </h1>
          <p className={cn(TYPOGRAPHY.bodySmall, 'text-slate-400')}>
            Método ERL - Acesso Restrito
          </p>
        </header>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="seu@email.com"
            disabled={isLoading}
            error={error || undefined}
            autoFocus
            autoComplete="email"
            variant="default"
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            containerClassName="[&_label]:text-slate-300"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            loadingText="Verificando..."
            aria-label={isLoading ? 'Verificando credenciais' : 'Entrar na plataforma'}
          >
            Entrar
          </Button>
        </form>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <p className={cn(TYPOGRAPHY.caption, 'text-slate-500')}>
            Apenas usuários autorizados podem acessar esta plataforma.
          </p>
        </footer>
      </Card>
    </main>
  );
};

export default LoginScreen;
