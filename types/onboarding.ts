export interface OnboardingData {
  // Informações básicas
  profissao?: string;
  habilidadePrincipal?: string;
  ofertaAtual?: string;
  precoAtual?: number;
  
  // Preferências
  tempoDisponivel?: string;
  plataformaPrincipal?: string;
  formatoPreferido?: '1:1' | 'grupo' | 'gravado' | 'híbrido';
  
  // Metas
  metaFaturamento?: number;
  prazoMeta?: string;
  
  // Contexto do negócio (opcional)
  publicoAlvo?: string;
  problemaPrincipal?: string;
  diferencial?: string;
  
  // Personalização
  templateId?: string; // ID do template escolhido
  estiloResposta?: string; // Estilo de resposta preferido
  observacoes?: string; // Observações adicionais sobre como quer ser respondido
}

