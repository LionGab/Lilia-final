import React from 'react';
import { cn, AGENT_COLORS, type AgentColor } from '../../theme/tokens';

// ============================================
// TIPOS
// ============================================
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'agent';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Variante visual */
  variant?: BadgeVariant;
  /** Cor do agente (quando variant='agent') */
  agentColor?: AgentColor;
  /** Tamanho */
  size?: BadgeSize;
  /** Ícone à esquerda */
  icon?: React.ReactNode;
  /** Tornar arredondado (pill) */
  rounded?: boolean;
  /** Conteúdo */
  children: React.ReactNode;
}

// ============================================
// ESTILOS
// ============================================
const VARIANT_STYLES: Record<Exclude<BadgeVariant, 'agent'>, string> = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
};

const SIZE_STYLES: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

// ============================================
// COMPONENTE BADGE
// ============================================
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  agentColor = 'slate',
  size = 'md',
  icon,
  rounded = false,
  children,
  className,
  ...props
}) => {
  const variantClass =
    variant === 'agent'
      ? AGENT_COLORS[agentColor]?.badge || AGENT_COLORS.slate.badge
      : VARIANT_STYLES[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'font-medium',
        rounded ? 'rounded-full' : 'rounded-md',
        SIZE_STYLES[size],
        variantClass,
        className
      )}
      {...props}
    >
      {icon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;
