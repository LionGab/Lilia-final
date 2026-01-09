import React from 'react';
import { ConversationAnalysis } from '../types/analysis';

interface AnalysisPanelProps {
  analysis: ConversationAnalysis;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white">📊 Análise da Conversa</h3>
      
      {/* Progresso */}
      <div className="bg-white dark:bg-black p-3 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Progresso</span>
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{analysis.progresso.porcentagem}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-brand-600 dark:bg-brand-500 h-2 rounded-full transition-all"
            style={{ width: `${analysis.progresso.porcentagem}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{analysis.progresso.etapaAtual}</p>
      </div>
      
      {/* Blocos Completados */}
      <div className="bg-white dark:bg-black p-3 rounded-lg">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Blocos Completados</h4>
        <div className="space-y-1">
          <div className={`text-xs ${analysis.blocosCompletados.diagnostico ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}`}>
            {analysis.blocosCompletados.diagnostico ? '✓' : '○'} Diagnóstico
          </div>
          <div className={`text-xs ${analysis.blocosCompletados.produto ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}`}>
            {analysis.blocosCompletados.produto ? '✓' : '○'} Produto
          </div>
          <div className={`text-xs ${analysis.blocosCompletados.funil ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}`}>
            {analysis.blocosCompletados.funil ? '✓' : '○'} Funil URL
          </div>
          <div className={`text-xs ${analysis.blocosCompletados.conteudo ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}`}>
            {analysis.blocosCompletados.conteudo ? '✓' : '○'} Conteúdo
          </div>
        </div>
      </div>
      
      {/* Insights */}
      {analysis.insights.recomendacoes.length > 0 && (
        <div className="bg-white dark:bg-black p-3 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Próximos Passos</h4>
          <ul className="space-y-1">
            {analysis.proximosPassos.map((passo, i) => (
              <li key={i} className="text-xs text-slate-600 dark:text-slate-400">• {passo}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Alertas */}
      {analysis.insights.alertas.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
          <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-2">⚠️ Alertas</h4>
          <ul className="space-y-1">
            {analysis.insights.alertas.map((alerta, i) => (
              <li key={i} className="text-xs text-yellow-700 dark:text-yellow-400">• {alerta}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalysisPanel;

