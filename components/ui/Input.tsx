import React, { useId } from 'react';
import { cn, INPUT_SIZE, RADIUS, TRANSITION } from '../../theme/tokens';

// ============================================
// TIPOS
// ============================================
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label do input */
  label?: string;
  /** Texto de ajuda */
  helperText?: string;
  /** Mensagem de erro */
  error?: string;
  /** Tamanho do input */
  size?: InputSize;
  /** Variante visual */
  variant?: InputVariant;
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode;
  /** Ícone à direita */
  rightIcon?: React.ReactNode;
  /** Ocupar largura total */
  fullWidth?: boolean;
  /** Container className */
  containerClassName?: string;
}

// ============================================
// ESTILOS POR VARIANTE
// ============================================
const VARIANT_STYLES: Record<InputVariant, string> = {
  default: cn(
    'bg-white dark:bg-slate-800',
    'border border-slate-300 dark:border-slate-600',
    'focus:border-brand-500 dark:focus:border-brand-400',
    'focus:ring-2 focus:ring-brand-500/20 dark:focus:ring-brand-400/20'
  ),
  filled: cn(
    'bg-slate-100 dark:bg-slate-700',
    'border border-transparent',
    'focus:bg-white dark:focus:bg-slate-800',
    'focus:border-brand-500 dark:focus:border-brand-400',
    'focus:ring-2 focus:ring-brand-500/20 dark:focus:ring-brand-400/20'
  ),
  outlined: cn(
    'bg-transparent',
    'border-2 border-slate-300 dark:border-slate-600',
    'focus:border-brand-500 dark:focus:border-brand-400',
    'focus:ring-0'
  ),
};

const ERROR_STYLES = cn(
  'border-red-500 dark:border-red-400',
  'focus:border-red-500 dark:focus:border-red-400',
  'focus:ring-red-500/20 dark:focus:ring-red-400/20'
);

// ============================================
// COMPONENTE INPUT
// ============================================
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      variant = 'default',
      leftIcon,
      rightIcon,
      fullWidth = true,
      containerClassName,
      className,
      disabled,
      id: providedId,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const hasError = Boolean(error);
    const describedBy = cn(
      ariaDescribedBy,
      helperText && helperId,
      hasError && errorId
    ).trim() || undefined;

    return (
      <div className={cn(fullWidth && 'w-full', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block mb-2',
              'text-sm font-medium',
              disabled
                ? 'text-slate-400 dark:text-slate-500'
                : 'text-slate-700 dark:text-slate-300'
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2',
                'text-slate-400 dark:text-slate-500',
                'pointer-events-none'
              )}
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={cn(
              // Base
              'w-full',
              RADIUS.lg,
              TRANSITION.fast,
              'text-slate-900 dark:text-white',
              'placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'outline-none',
              // Tamanho
              INPUT_SIZE[size],
              // Variante
              VARIANT_STYLES[variant],
              // Error
              hasError && ERROR_STYLES,
              // Ícones
              leftIcon ? 'pl-10' : undefined,
              rightIcon ? 'pr-10' : undefined,
              // Disabled
              disabled && 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800',
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2',
                hasError
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-slate-400 dark:text-slate-500',
                'pointer-events-none'
              )}
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper text */}
        {helperText && !hasError && (
          <p
            id={helperId}
            className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}

        {/* Error message */}
        {hasError && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
