/**
 * UI Component Library - LyLia Design System
 *
 * Componentes atômicos reutilizáveis com:
 * - Acessibilidade (WCAG 2.1 AA)
 * - Suporte a tema claro/escuro
 * - Responsividade mobile-first
 * - TypeScript completo
 */

// Componentes
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button';
export { Input, type InputProps, type InputSize, type InputVariant } from './Input';
export { Card, CardHeader, CardContent, CardFooter, type CardProps, type CardVariant, type CardPadding, type CardHeaderProps, type CardFooterProps } from './Card';
export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize } from './Badge';
export { Avatar, AvatarGroup, type AvatarProps, type AvatarSize, type AvatarGroupProps } from './Avatar';
export { Spinner, LoadingOverlay, type SpinnerProps, type SpinnerSize, type LoadingOverlayProps } from './Spinner';

// Re-export tokens para conveniência
export {
  cn,
  AGENT_COLORS,
  SEMANTIC_COLORS,
  SPACING,
  RADIUS,
  SHADOW,
  TRANSITION,
  TYPOGRAPHY,
  getAgentColors,
  type AgentColor,
} from '../../theme/tokens';
