import React from 'react';
import { cn, BUTTON_SIZE, RADIUS, TRANSITION } from '../../theme/tokens';

// ============================================
// TIPOS
// ============================================
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual do botão */
  variant?: ButtonVariant;
  /** Tamanho do botão */
  size?: ButtonSize;
  /** Estado de carregamento */
  isLoading?: boolean;
  /** Texto exibido durante loading */
  loadingText?: string;
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode;
  /** Ícone à direita */
  rightIcon?: React.ReactNode;
  /** Ocupar largura total */
  fullWidth?: boolean;
  /** Texto visível na tela */
  children: React.ReactNode;
}

// ============================================
// ESTILOS POR VARIANTE
// ============================================
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-brand-600 text-white',
    'hover:bg-brand-700 active:bg-brand-800',
    'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
    'dark:bg-brand-500 dark:hover:bg-brand-600 dark:active:bg-brand-700',
    'disabled:bg-slate-400 disabled:dark:bg-slate-600'
  ),
  secondary: cn(
    'bg-slate-100 text-slate-800 border border-slate-200',
    'hover:bg-slate-200 active:bg-slate-300',
    'focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
    'dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600',
    'dark:hover:bg-slate-600 dark:active:bg-slate-500',
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:dark:bg-slate-800 disabled:dark:text-slate-500'
  ),
  ghost: cn(
    'bg-transparent text-slate-600',
    'hover:bg-slate-100 active:bg-slate-200',
    'focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
    'dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700',
    'disabled:text-slate-400 disabled:dark:text-slate-600'
  ),
  danger: cn(
    'bg-red-600 text-white',
    'hover:bg-red-700 active:bg-red-800',
    'focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',
    'dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700',
    'disabled:bg-red-300 disabled:dark:bg-red-900'
  ),
  success: cn(
    'bg-green-600 text-white',
    'hover:bg-green-700 active:bg-green-800',
    'focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
    'dark:bg-green-500 dark:hover:bg-green-600 dark:active:bg-green-700',
    'disabled:bg-green-300 disabled:dark:bg-green-900'
  ),
};

// ============================================
// COMPONENTE SPINNER
// ============================================
const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('animate-spin', className)}
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
);

// ============================================
// COMPONENTE BUTTON
// ============================================
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        className={cn(
          // Base
          'inline-flex items-center justify-center gap-2',
          'font-medium',
          RADIUS.lg,
          TRANSITION.fast,
          'touch-manipulation select-none',
          'active:scale-[0.98]',
          'disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100',
          // Tamanho
          BUTTON_SIZE[size],
          // Variante
          VARIANT_STYLES[variant],
          // Largura total
          fullWidth && 'w-full',
          // Focus visible (WCAG)
          'outline-none focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900',
          className
        )}
        {...props}
      >
        {/* Loading state */}
        {isLoading && (
          <Spinner className="w-4 h-4" />
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Content */}
        <span className={cn(isLoading && !loadingText && 'opacity-0')}>
          {isLoading && loadingText ? loadingText : children}
        </span>

        {/* Right icon */}
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
