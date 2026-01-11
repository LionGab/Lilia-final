/**
 * Design Tokens - LyLia Design System
 *
 * REGRA: Nunca usar cores hardcoded nos componentes.
 * SEMPRE importar de tokens.ts
 */

// ============================================
// CORES DOS AGENTES
// ============================================
export const AGENT_COLORS = {
  purple: {
    avatar: 'bg-purple-100 dark:bg-purple-900/30',
    avatarText: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    accent: 'text-purple-600 dark:text-purple-400',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  },
  orange: {
    avatar: 'bg-orange-100 dark:bg-orange-900/30',
    avatarText: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    bg: 'bg-orange-50 dark:bg-orange-950/20',
    accent: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  },
  blue: {
    avatar: 'bg-blue-100 dark:bg-blue-900/30',
    avatarText: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    accent: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  },
  green: {
    avatar: 'bg-green-100 dark:bg-green-900/30',
    avatarText: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    bg: 'bg-green-50 dark:bg-green-950/20',
    accent: 'text-green-600 dark:text-green-400',
    badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  },
  slate: {
    avatar: 'bg-slate-100 dark:bg-slate-700',
    avatarText: 'text-slate-600 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700',
    bg: 'bg-slate-50 dark:bg-slate-900/50',
    accent: 'text-slate-600 dark:text-slate-400',
    badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
} as const;

export type AgentColor = keyof typeof AGENT_COLORS;

// ============================================
// CORES SEMÂNTICAS
// ============================================
export const SEMANTIC_COLORS = {
  // Backgrounds
  background: {
    primary: 'bg-white dark:bg-slate-900',
    secondary: 'bg-slate-50 dark:bg-slate-800',
    tertiary: 'bg-slate-100 dark:bg-slate-700',
    inverse: 'bg-slate-900 dark:bg-white',
  },

  // Texto
  text: {
    primary: 'text-slate-900 dark:text-white',
    secondary: 'text-slate-600 dark:text-slate-300',
    tertiary: 'text-slate-400 dark:text-slate-500',
    inverse: 'text-white dark:text-slate-900',
    brand: 'text-brand-600 dark:text-brand-400',
  },

  // Bordas
  border: {
    light: 'border-slate-200 dark:border-slate-700',
    medium: 'border-slate-300 dark:border-slate-600',
    focus: 'border-brand-500 dark:border-brand-400',
  },

  // Estados
  state: {
    success: 'text-green-600 dark:text-green-400',
    successBg: 'bg-green-50 dark:bg-green-950/30',
    error: 'text-red-600 dark:text-red-400',
    errorBg: 'bg-red-50 dark:bg-red-950/30',
    warning: 'text-amber-600 dark:text-amber-400',
    warningBg: 'bg-amber-50 dark:bg-amber-950/30',
    info: 'text-blue-600 dark:text-blue-400',
    infoBg: 'bg-blue-50 dark:bg-blue-950/30',
  },
} as const;

// ============================================
// ESPAÇAMENTO (8pt Grid)
// ============================================
export const SPACING = {
  xs: '4px',   // 0.5 * 8
  sm: '8px',   // 1 * 8
  md: '16px',  // 2 * 8
  lg: '24px',  // 3 * 8
  xl: '32px',  // 4 * 8
  '2xl': '48px', // 6 * 8
  '3xl': '64px', // 8 * 8
} as const;

// Tailwind classes
export const SPACING_CLASSES = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  '2xl': 'p-12',
} as const;

// ============================================
// BORDER RADIUS
// ============================================
export const RADIUS = {
  sm: 'rounded-md',      // 6px
  md: 'rounded-lg',      // 8px
  lg: 'rounded-xl',      // 12px
  xl: 'rounded-2xl',     // 16px
  full: 'rounded-full',  // pill
} as const;

// ============================================
// SOMBRAS
// ============================================
export const SHADOW = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  none: 'shadow-none',
} as const;

// ============================================
// TRANSIÇÕES
// ============================================
export const TRANSITION = {
  fast: 'transition-all duration-150 ease-out',
  normal: 'transition-all duration-250 ease-out',
  slow: 'transition-all duration-400 ease-out',
} as const;

// ============================================
// TAMANHOS DE BOTÃO
// ============================================
export const BUTTON_SIZE = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2.5 text-base min-h-[44px]',
  lg: 'px-6 py-3 text-lg min-h-[52px]',
} as const;

// ============================================
// TAMANHOS DE INPUT
// ============================================
export const INPUT_SIZE = {
  sm: 'px-3 py-2 text-sm min-h-[36px]',
  md: 'px-4 py-3 text-base min-h-[44px]',
  lg: 'px-4 py-4 text-lg min-h-[52px]',
} as const;

// ============================================
// AVATARES
// ============================================
export const AVATAR_SIZE = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
} as const;

// ============================================
// TIPOGRAFIA
// ============================================
export const TYPOGRAPHY = {
  h1: 'text-2xl sm:text-3xl font-bold leading-tight',
  h2: 'text-xl sm:text-2xl font-bold leading-tight',
  h3: 'text-lg sm:text-xl font-semibold leading-snug',
  h4: 'text-base sm:text-lg font-semibold leading-snug',
  body: 'text-base leading-relaxed',
  bodySmall: 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal',
  label: 'text-sm font-medium',
} as const;

// ============================================
// COMPONENTES COMPOSTOS
// ============================================
export const CARD = {
  base: `${SEMANTIC_COLORS.background.primary} ${RADIUS.xl} ${SHADOW.md} ${SEMANTIC_COLORS.border.light} border`,
  interactive: `${SEMANTIC_COLORS.background.primary} ${RADIUS.xl} ${SHADOW.md} ${SEMANTIC_COLORS.border.light} border ${TRANSITION.fast} hover:shadow-lg active:scale-[0.98] cursor-pointer`,
} as const;

export const MESSAGE_BUBBLE = {
  ai: `${SEMANTIC_COLORS.background.primary} ${SEMANTIC_COLORS.text.primary} ${RADIUS.xl} rounded-tl-none ${SHADOW.sm}`,
  user: 'bg-brand-600 text-white rounded-2xl rounded-tr-none shadow-sm',
} as const;

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Retorna as classes de cor para um agente
 */
export function getAgentColors(color: AgentColor = 'slate') {
  return AGENT_COLORS[color] || AGENT_COLORS.slate;
}

/**
 * Combina classes condicionalmente (similar ao clsx/cn)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
