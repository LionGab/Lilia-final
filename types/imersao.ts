/**
 * Tipos para estruturação de Imersão MED
 */

export interface SessaoImersao {
  horario: string;
  topico: string;
  duracao: string;
  objetivo: string;
  conteudoPrincipal: string[];
  exercicioPratico?: string;
  tipo: 'teoria' | 'pratica' | 'exercicio' | 'bonus' | 'intervalo';
}

export interface CronogramaImersao {
  dia1: {
    data?: string;
    horarioInicio: string;
    horarioFim: string;
    sessoes: SessaoImersao[];
  };
  dia2: {
    data?: string;
    horarioInicio: string;
    horarioFim: string;
    sessoes: SessaoImersao[];
  };
  bonus?: {
    encontroDia20?: {
      estrutura: string;
      objetivos: string[];
    };
    aulasBonus?: Array<{
      titulo: string;
      descricao: string;
      quando: string;
    }>;
  };
}

export interface PassoExecucao {
  numero: number;
  titulo: string;
  descricao: string;
  acoes: string[];
  tempoEstimado?: string;
  entregavel?: string;
}

export interface MapaExecucao {
  caminho: 'A' | 'B';
  titulo: string;
  descricao: string;
  passos: PassoExecucao[];
}

export interface PilarTeorico {
  nome: string;
  explicacao: string;
  caseReal?: string;
  importancia: string;
}

export interface EntregaPratica {
  nome: string;
  tipo: 'template' | 'roteiro' | 'documento' | 'exercicio' | 'checklist';
  descricao: string;
  comoUsar: string[];
  quandoUsar: string;
}

export interface ExercicioImersao {
  nome: string;
  objetivo: string;
  passoAPasso: string[];
  tempoEstimado: string;
  entregavel?: string;
  quandoFazer: 'dia1' | 'dia2' | 'pos-imersao';
}

export interface EstruturaImersaoCompleta {
  cronograma: CronogramaImersao;
  mapasExecucao: {
    caminhoA: MapaExecucao;
    caminhoB: MapaExecucao;
  };
  pilaresTeoricos: PilarTeorico[];
  entregasPraticas: EntregaPratica[];
  exercicios: ExercicioImersao[];
  sumarioExecutivo: {
    visaoGeral: string;
    resultadosEsperados: string[];
    proximosPassos: string[];
  };
}
