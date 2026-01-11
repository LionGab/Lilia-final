import React, { useState } from 'react';
import { cn, AVATAR_SIZE, AGENT_COLORS, type AgentColor } from '../../theme/tokens';

// ============================================
// TIPOS
// ============================================
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL da imagem */
  src?: string;
  /** Alt text da imagem */
  alt?: string;
  /** Iniciais para fallback (1-2 caracteres) */
  fallback?: string;
  /** Tamanho do avatar */
  size?: AvatarSize;
  /** Cor do agente para o background */
  agentColor?: AgentColor;
  /** Mostrar borda */
  bordered?: boolean;
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy' | 'away';
}

// ============================================
// STATUS COLORS
// ============================================
const STATUS_COLORS = {
  online: 'bg-green-500',
  offline: 'bg-slate-400',
  busy: 'bg-red-500',
  away: 'bg-amber-500',
};

// ============================================
// COMPONENTE AVATAR
// ============================================
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback = '?',
  size = 'md',
  agentColor = 'slate',
  bordered = false,
  status,
  className,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const showFallback = !src || imageError;
  const colors = AGENT_COLORS[agentColor];

  // Iniciais: pegar as primeiras letras de cada palavra (máx 2)
  const getInitials = (text: string): string => {
    return text
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() || '')
      .join('');
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        'rounded-full overflow-hidden',
        'flex-shrink-0',
        AVATAR_SIZE[size],
        bordered && 'ring-2 ring-white dark:ring-slate-900',
        className
      )}
      {...props}
    >
      {/* Background e conteúdo */}
      {showFallback ? (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center',
            'font-semibold',
            colors.avatar,
            colors.avatarText
          )}
          aria-label={alt}
        >
          {getInitials(fallback)}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}

      {/* Status indicator */}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0',
            'rounded-full border-2 border-white dark:border-slate-900',
            STATUS_COLORS[status],
            // Tamanho do indicador proporcional ao avatar
            size === 'xs' && 'w-1.5 h-1.5',
            size === 'sm' && 'w-2 h-2',
            size === 'md' && 'w-2.5 h-2.5',
            size === 'lg' && 'w-3 h-3',
            size === 'xl' && 'w-4 h-4'
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';

// ============================================
// AVATAR GROUP
// ============================================
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatares a exibir */
  children: React.ReactNode;
  /** Máximo de avatares visíveis */
  max?: number;
  /** Tamanho dos avatares */
  size?: AvatarSize;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 4,
  size = 'md',
  className,
  ...props
}) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div
      className={cn('flex -space-x-2', className)}
      {...props}
    >
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="relative" style={{ zIndex: visibleAvatars.length - index }}>
          {React.isValidElement(avatar)
            ? React.cloneElement(avatar as React.ReactElement<AvatarProps>, {
                size,
                bordered: true,
              })
            : avatar}
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            'relative inline-flex items-center justify-center',
            'rounded-full',
            'bg-slate-200 dark:bg-slate-700',
            'text-slate-600 dark:text-slate-300',
            'font-medium',
            'ring-2 ring-white dark:ring-slate-900',
            AVATAR_SIZE[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';

export default Avatar;
