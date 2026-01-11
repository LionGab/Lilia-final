import React from 'react';
import { Message, Sender } from '../types';
import { getAgentConfig, type AgentId } from '../config/agents';
import { Avatar } from './ui/Avatar';
import { cn, type AgentColor, SEMANTIC_COLORS, RADIUS, SHADOW } from '../theme/tokens';

interface MessageBubbleProps {
  message: Message;
  agentId?: string;
}

/**
 * Formata valores monetários encontrados no texto (ex: R$ 1000 -> R$ 1.000,00)
 */
const formatCurrencyValues = (text: string): string => {
  return text.replace(/R\$\s*(\d+(?:[.,]\d{1,2})?)(?!\d)/gi, (match, value) => {
    const normalizedValue = value.replace(',', '.');
    const number = parseFloat(normalizedValue);
    if (isNaN(number)) return match;
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  });
};

/**
 * Formata texto com bold (**texto**), quebras de linha e valores monetários
 */
const formatText = (text: string): React.ReactNode[] => {
  const textWithCurrency = formatCurrencyValues(text);
  const parts = textWithCurrency.split(/(\*\*.*?\*\*|\n)/g);

  return parts.map((part, index) => {
    if (part === '\n') {
      return <br key={index} />;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

/**
 * Componente de bolha de mensagem estilo GPT Mobile
 *
 * Features:
 * - Avatar do agente com cor temática
 * - Suporte a imagens, áudio e texto formatado
 * - Acessibilidade completa (ARIA)
 * - Tema claro/escuro
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({ message, agentId = 'clareza-med' }) => {
  const isAI = message.sender === Sender.AI;
  const agentConfig = getAgentConfig(agentId as AgentId);
  const agentColor = (agentConfig?.ui?.color || 'slate') as AgentColor;

  const timestamp = new Date(message.timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article
      className={cn(
        'flex w-full gap-3 px-4 py-3 animate-fade-in',
        isAI ? 'justify-start' : 'justify-end'
      )}
      aria-label={`Mensagem ${isAI ? 'da IA' : 'do usuário'} às ${timestamp}`}
    >
      {/* Avatar - apenas para mensagens da IA */}
      {isAI && (
        <Avatar
          src="/images/logo-main.jpg"
          alt={agentConfig?.name || 'Lyla.IA'}
          fallback="L"
          size="sm"
          agentColor={agentColor}
          className="mt-0.5 shrink-0"
        />
      )}

      {/* Container da mensagem */}
      <div className={cn('flex flex-col max-w-[85%]', isAI ? 'items-start' : 'items-end')}>
        {/* Bolha da mensagem */}
        <div
          className={cn(
            'px-4 py-3 text-[15px] leading-relaxed',
            RADIUS.xl,
            SHADOW.sm,
            isAI
              ? cn(
                  SEMANTIC_COLORS.background.primary,
                  SEMANTIC_COLORS.text.primary,
                  'rounded-tl-none'
                )
              : 'bg-brand-600 text-white rounded-tr-none'
          )}
        >
          {/* Imagem */}
          {message.imageUrl && (
            <div className={cn(message.text && 'mb-3')}>
              <button
                type="button"
                onClick={() => {
                  const newWindow = window.open();
                  if (newWindow) {
                    newWindow.document.write(
                      `<img src="${message.imageUrl}" style="max-width: 100%; height: auto;" alt="Imagem ampliada" />`
                    );
                  }
                }}
                className={cn(
                  'block rounded-xl overflow-hidden',
                  'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                  'outline-none'
                )}
                aria-label={isAI ? 'Imagem gerada pela IA. Clique para ampliar' : 'Imagem enviada. Clique para ampliar'}
              >
                <img
                  src={message.imageUrl}
                  alt={isAI ? 'Imagem gerada pela IA' : 'Imagem enviada pelo usuário'}
                  className="max-w-full h-auto object-contain max-h-96 hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
              </button>
            </div>
          )}

          {/* Áudio */}
          {message.audioUrl && (
            <div className={cn((message.text || message.imageUrl) && 'mt-3')}>
              <audio
                src={message.audioUrl}
                controls
                className="w-full h-10 rounded-lg"
                aria-label={isAI ? 'Áudio gerado pela IA' : 'Áudio enviado pelo usuário'}
              >
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
          )}

          {/* Texto */}
          {message.text && (
            <div className="whitespace-pre-wrap wrap-break-word">{formatText(message.text)}</div>
          )}
        </div>

        {/* Timestamp */}
        <time
          dateTime={new Date(message.timestamp).toISOString()}
          className={cn(
            'text-[10px] mt-1 px-1 opacity-60',
            SEMANTIC_COLORS.text.tertiary
          )}
        >
          {timestamp}
        </time>
      </div>

      {/* Avatar do usuário */}
      {!isAI && (
        <Avatar
          fallback="U"
          alt="Você"
          size="sm"
          agentColor="slate"
          className="mt-0.5 shrink-0"
        />
      )}
    </article>
  );
};

export default MessageBubble;
