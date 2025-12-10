import React from 'react';
import { Message, Sender } from '../types';

interface MessageBubbleProps {
  message: Message;
}

// Function to format currency values found in text (e.g. R$ 1000 -> R$ 1.000,00)
const formatCurrencyValues = (text: string) => {
  // Regex looks for "R$" followed by optional whitespace and a number (with optional decimals)
  return text.replace(/R\$\s*(\d+(?:[.,]\d{1,2})?)(?!\d)/gi, (match, value) => {
    // Replace comma with dot for parsing if necessary
    const normalizedValue = value.replace(',', '.');
    const number = parseFloat(normalizedValue);
    
    if (isNaN(number)) return match;

    // Format to Brazilian Portuguese currency
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  });
};

// Simple formatter to handle bold text (**text**), line breaks, and apply currency formatting
const formatText = (text: string) => {
  // First apply currency formatting to the raw text
  const textWithCurrency = formatCurrencyValues(text);
  
  // Then split for bold and newlines
  const parts = textWithCurrency.split(/(\*\*.*?\*\*|\n)/g);
  
  return parts.map((part, index) => {
    if (part === '\n') {
      return <br key={index} />;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAI = message.sender === Sender.AI;

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm text-sm sm:text-base leading-relaxed ${
          isAI
            ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'
            : 'bg-brand-600 dark:bg-brand-500 text-white rounded-tr-none'
        }`}
      >
        {message.text && (
          <div className="whitespace-pre-wrap break-words mb-2">
            {formatText(message.text)}
          </div>
        )}
        {message.imageUrl && (
          <div className={`mt-2 ${message.text ? 'pt-2 border-t border-solid border-slate-200 dark:border-slate-700' : ''}`}>
             <img src={message.imageUrl} alt="Conteúdo gerado" className="rounded-lg max-w-full h-auto object-contain" />
          </div>
        )}
        <div className={`text-[10px] mt-2 opacity-60 ${isAI ? 'text-slate-400 dark:text-slate-500' : 'text-brand-100'}`}>
           {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;