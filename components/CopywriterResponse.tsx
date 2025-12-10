import React from 'react';
import { CopywriterResponse as CopywriterResponseType } from '../types/copywriter';

interface CopywriterResponseProps {
  response: CopywriterResponseType;
}

const CopywriterResponse: React.FC<CopywriterResponseProps> = ({ response }) => {
  const exportSection = (sectionName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sectionName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
      {/* Resumo Executivo */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">📋 Resumo Executivo</h2>
        <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{response.resumoExecutivo}</p>
      </section>

      {/* Público-Alvo */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">🎯 Análise do Público-Alvo</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Desejos:</h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 ml-4">
              {response.publicoAlvo.desejos.map((desejo, i) => (
                <li key={i}>{desejo}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Dores:</h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 ml-4">
              {response.publicoAlvo.dores.map((dor, i) => (
                <li key={i}>{dor}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Nível de Consciência:</h3>
            <p className="text-slate-600 dark:text-slate-400">{response.publicoAlvo.nivelConsciencia}</p>
          </div>
        </div>
      </section>

      {/* Promessa */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">💎 Promessa Única</h2>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-brand-600 dark:text-brand-400">{response.promessa.promessa}</p>
          <p className="text-slate-600 dark:text-slate-400"><strong>Benefício Emocional:</strong> {response.promessa.beneficioEmocional}</p>
          <p className="text-slate-600 dark:text-slate-400"><strong>Diferencial:</strong> {response.promessa.diferencial}</p>
          <p className="text-slate-600 dark:text-slate-400"><strong>Mecanismo:</strong> {response.promessa.mecanismo}</p>
        </div>
      </section>

      {/* Funil de Conteúdo */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">🔄 Funil de Conteúdo</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Atração (Viral):</h3>
            <p className="text-slate-600 dark:text-slate-400">{response.funilConteudo.atracao.estrategia}</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Aquecimento:</h3>
            <p className="text-slate-600 dark:text-slate-400">{response.funilConteudo.aquecimento.estrategia}</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Conversão:</h3>
            <p className="text-slate-600 dark:text-slate-400">{response.funilConteudo.conversao.estrategia}</p>
          </div>
        </div>
      </section>

      {/* Roteiros de Vídeos */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">🎬 Roteiros de Vídeos Virais</h2>
        {response.roteirosVideos.map((roteiro, i) => (
          <div key={i} className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">{roteiro.titulo}</h3>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p><strong>Gancho (3s):</strong> {roteiro.gancho}</p>
              <p><strong>Contexto:</strong> {roteiro.contexto}</p>
              <p><strong>CTA:</strong> {roteiro.cta}</p>
            </div>
            <button
              onClick={() => exportSection(`roteiro-${i + 1}`, JSON.stringify(roteiro, null, 2))}
              className="mt-2 text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
            >
              Exportar
            </button>
          </div>
        ))}
      </section>

      {/* Textos de Vendas */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">📝 Textos de Vendas</h2>
        {response.textosVendas.map((texto, i) => (
          <div key={i} className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">{texto.tipo}</h3>
            <p className="text-lg font-semibold text-brand-600 dark:text-brand-400 mb-2">{texto.headline}</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap">{texto.textoCompleto.substring(0, 300)}...</p>
            <button
              onClick={() => exportSection(`texto-venda-${i + 1}`, texto.textoCompleto)}
              className="mt-2 text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
            >
              Ver texto completo e exportar
            </button>
          </div>
        ))}
      </section>

      {/* Títulos e CTAs Testáveis */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">🧪 Títulos e CTAs Testáveis</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Títulos:</h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 ml-4">
              {response.titulosCTAs.titulos.map((titulo, i) => (
                <li key={i}>{titulo.titulo}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">CTAs:</h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 ml-4">
              {response.titulosCTAs.ctas.map((cta, i) => (
                <li key={i}>{cta.cta}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CopywriterResponse;

