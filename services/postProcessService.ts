/**
 * Formata resposta aplicando formatação Markdown básica
 */
export const formatResponse = (text: string): string => {
  if (!text) return '';

  let formatted = text;

  // Converter quebras de linha duplas em parágrafos
  formatted = formatted.replace(/\n\n+/g, '\n\n');

  // Garantir que listas estão formatadas corretamente
  formatted = formatted.replace(/^[-•*]\s+/gm, '- ');

  // Melhorar formatação de títulos (se não estiverem em Markdown)
  formatted = formatted.replace(/^([A-Z][^\n]{0,50})$/gm, (match) => {
    // Se parece com título mas não tem #, adicionar
    if (match.length < 50 && !match.startsWith('#')) {
      return `## ${match}`;
    }
    return match;
  });

  return formatted.trim();
};

/**
 * Extrai estruturas do texto (listas, tabelas, documentos)
 */
export interface ExtractedStructures {
  lists: string[][];
  headings: string[];
  codeBlocks: string[];
}

export const extractStructures = (text: string): ExtractedStructures => {
  const lists: string[][] = [];
  const headings: string[] = [];
  const codeBlocks: string[] = [];

  const lines = text.split('\n');
  let currentList: string[] = [];

  lines.forEach((line, index) => {
    // Detectar headings
    if (line.match(/^#{1,6}\s+/)) {
      headings.push(line.replace(/^#+\s+/, ''));
    }

    // Detectar listas
    if (line.match(/^[-•*]\s+/)) {
      currentList.push(line.replace(/^[-•*]\s+/, '').trim());
    } else if (currentList.length > 0) {
      lists.push([...currentList]);
      currentList = [];
    }

    // Detectar code blocks (simplificado)
    if (line.includes('```')) {
      const codeStart = text.indexOf('```', index);
      const codeEnd = text.indexOf('```', codeStart + 3);
      if (codeEnd > codeStart) {
        codeBlocks.push(text.substring(codeStart + 3, codeEnd));
      }
    }
  });

  if (currentList.length > 0) {
    lists.push(currentList);
  }

  return { lists, headings, codeBlocks };
};

/**
 * Valida completude da resposta
 */
export const validateResponseCompleteness = (text: string): {
  isComplete: boolean;
  missingElements: string[];
} => {
  const missingElements: string[] = [];

  // Verificar se tem conteúdo mínimo
  if (text.length < 50) {
    missingElements.push('Resposta muito curta');
  }

  // Verificar se tem estrutura (parágrafos ou listas)
  const hasStructure = text.includes('\n\n') || text.includes('- ') || text.includes('•');
  if (!hasStructure) {
    missingElements.push('Falta estrutura (parágrafos ou listas)');
  }

  // Verificar se termina adequadamente
  const endsProperly = text.trim().endsWith('.') || text.trim().endsWith('!') || text.trim().endsWith('?');
  if (!endsProperly && text.length > 100) {
    missingElements.push('Resposta pode estar incompleta');
  }

  return {
    isComplete: missingElements.length === 0,
    missingElements,
  };
};

/**
 * Aplica todas as transformações de pós-processamento
 */
export const postProcessResponse = (text: string): {
  formatted: string;
  structures: ExtractedStructures;
  validation: ReturnType<typeof validateResponseCompleteness>;
} => {
  const formatted = formatResponse(text);
  const structures = extractStructures(formatted);
  const validation = validateResponseCompleteness(formatted);

  return {
    formatted,
    structures,
    validation,
  };
};

