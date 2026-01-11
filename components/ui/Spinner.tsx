import React from 'react';
import { cn } from '../../theme/tokens';

// ============================================
// TIPOS
// ============================================
export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tamanho do spinner */
  size?: SpinnerSize;
  /** Cor customizada */
  color?: string;
  /** Label para acessibilidade */
  label?: string;
}

// ============================================
// TAMANHOS
// ============================================
const SIZE_STYLES: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

// ============================================
// COMPONENTE SPINNER
// ============================================
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  label = 'Carregando...',
  className,
  ...props
}) => (
  <div
    role="status"
    aria-label={label}
    className={cn('inline-flex', className)}
    {...props}
  >
    <svg
      className={cn('animate-spin', SIZE_STYLES[size], color || 'text-brand-600 dark:text-brand-400')}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span className="sr-only">{label}</span>
  </div>
);

Spinner.displayName = 'Spinner';

// ============================================
// LOADING OVERLAY
// ============================================
export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Se está visível */
  isLoading?: boolean;
  /** Mensagem de loading */
  message?: string;
  /** Spinner size */
  spinnerSize?: SpinnerSize;
  /** Backdrop blur */
  blur?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading = true,
  message,
  spinnerSize = 'lg',
  blur = true,
  className,
  children,
  ...props
}) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={cn('relative', className)} {...props}>
      {children}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-3',
          'bg-white/80 dark:bg-slate-900/80',
          blur && 'backdrop-blur-sm',
          'z-50'
        )}
      >
        <Spinner size={spinnerSize} />
        {message && (
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

LoadingOverlay.displayName = 'LoadingOverlay';

export default Spinner;
