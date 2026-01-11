import React from 'react';
import { cn, RADIUS, SHADOW, TRANSITION } from '../../theme/tokens';

// ============================================
// TIPOS
// ============================================
export type CardVariant = 'default' | 'outlined' | 'elevated' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variante visual */
  variant?: CardVariant;
  /** Padding interno */
  padding?: CardPadding;
  /** Fazer o card clicável */
  asButton?: boolean;
  /** Header do card */
  header?: React.ReactNode;
  /** Footer do card */
  footer?: React.ReactNode;
  /** Conteúdo principal */
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Título do header */
  title?: string;
  /** Subtítulo */
  subtitle?: string;
  /** Ação no canto direito */
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alinhamento do conteúdo */
  align?: 'left' | 'center' | 'right' | 'between';
  children: React.ReactNode;
}

// ============================================
// ESTILOS
// ============================================
const VARIANT_STYLES: Record<CardVariant, string> = {
  default: cn(
    'bg-white dark:bg-slate-800',
    'border border-slate-200 dark:border-slate-700'
  ),
  outlined: cn(
    'bg-transparent',
    'border-2 border-slate-300 dark:border-slate-600'
  ),
  elevated: cn(
    'bg-white dark:bg-slate-800',
    'border border-transparent',
    SHADOW.lg
  ),
  interactive: cn(
    'bg-white dark:bg-slate-800',
    'border border-slate-200 dark:border-slate-700',
    SHADOW.sm,
    'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600',
    'active:scale-[0.99]',
    'cursor-pointer'
  ),
};

const PADDING_STYLES: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-6',
};

const FOOTER_ALIGN: Record<'left' | 'center' | 'right' | 'between', string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
};

// ============================================
// CARD HEADER
// ============================================
export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}) => {
  if (children) {
    return (
      <div
        className={cn(
          'px-4 py-3 sm:px-5 sm:py-4',
          'border-b border-slate-200 dark:border-slate-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'px-4 py-3 sm:px-5 sm:py-4',
        'border-b border-slate-200 dark:border-slate-700',
        'flex items-center justify-between gap-4',
        className
      )}
      {...props}
    >
      <div>
        {title && (
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';

// ============================================
// CARD FOOTER
// ============================================
export const CardFooter: React.FC<CardFooterProps> = ({
  align = 'right',
  children,
  className,
  ...props
}) => (
  <div
    className={cn(
      'px-4 py-3 sm:px-5 sm:py-4',
      'border-t border-slate-200 dark:border-slate-700',
      'flex items-center gap-3',
      FOOTER_ALIGN[align],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

CardFooter.displayName = 'CardFooter';

// ============================================
// CARD CONTENT
// ============================================
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('p-4 sm:p-5', className)} {...props}>
    {children}
  </div>
);

CardContent.displayName = 'CardContent';

// ============================================
// COMPONENTE CARD
// ============================================
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      asButton = false,
      header,
      footer,
      children,
      className,
      onClick,
      role,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const isInteractive = variant === 'interactive' || asButton || onClick;

    return (
      <div
        ref={ref}
        role={isInteractive ? (role || 'button') : role}
        tabIndex={isInteractive ? (tabIndex ?? 0) : tabIndex}
        onClick={onClick}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
                }
              }
            : undefined
        }
        className={cn(
          // Base
          RADIUS.xl,
          TRANSITION.fast,
          'overflow-hidden',
          // Variante
          VARIANT_STYLES[variant],
          // Focus para interativos
          isInteractive && 'outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
          className
        )}
        {...props}
      >
        {/* Header */}
        {header}

        {/* Content */}
        <div className={PADDING_STYLES[padding]}>{children}</div>

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
