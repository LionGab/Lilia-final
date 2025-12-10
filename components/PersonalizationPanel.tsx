import React, { useState, useEffect } from 'react';
import { OnboardingData } from '../types/onboarding';
import { BUSINESS_TEMPLATES, RESPONSE_STYLES, BusinessTemplate } from '../constants/businessTemplates';
import { getCurrentUser } from '../services/authService';

interface PersonalizationPanelProps {
  onBack?: () => void;
}

const PersonalizationPanel: React.FC<PersonalizationPanelProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<OnboardingData>({});
  const [selectedTemplate, setSelectedTemplate] = useState<BusinessTemplate | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [observacoes, setObservacoes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    // Carregar dados salvos
    const user = getCurrentUser();
    if (user) {
      const savedData = localStorage.getItem(`erl_lia_onboarding_${user.email}`);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(parsed);
          setSelectedStyle(parsed.estiloResposta || '');
          setObservacoes(parsed.observacoes || '');
          
          if (parsed.templateId) {
            const template = BUSINESS_TEMPLATES.find(t => t.id === parsed.templateId);
            if (template) setSelectedTemplate(template);
          }
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        }
      }
    }
  }, []);

  const handleTemplateSelect = (template: BusinessTemplate) => {
    setSelectedTemplate(template);
    if (template.id !== 'personalizado') {
      setFormData({
        ...formData,
        ...template.data,
        templateId: template.id
      });
    } else {
      setFormData({
        ...formData,
        templateId: 'personalizado'
      });
    }
  };

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage(null);

    const user = getCurrentUser();
    if (!user) {
      setSaveMessage('Erro: usuário não encontrado');
      setIsSaving(false);
      return;
    }

    const finalData: OnboardingData = {
      ...formData,
      estiloResposta: selectedStyle,
      observacoes: observacoes.trim() || undefined
    };

    try {
      localStorage.setItem(`erl_lia_onboarding_${user.email}`, JSON.stringify(finalData));
      setSaveMessage('Configurações salvas com sucesso!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage('Erro ao salvar configurações');
      console.error('Erro ao salvar:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      <div className="flex-none border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="text-lg">←</span>
          </button>
        )}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Personalização</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Configure suas preferências e informações do negócio
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Template de Negócio */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Template de Negócio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BUSINESS_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedTemplate?.id === template.id
                      ? 'border-brand-600 dark:border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {template.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Negócio */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Informações do Negócio
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Profissão/Área
                </label>
                <input
                  type="text"
                  value={formData.profissao || ''}
                  onChange={(e) => updateFormData('profissao', e.target.value)}
                  placeholder="Ex: Nutricionista, Coach, Consultor..."
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Habilidade Principal
                </label>
                <input
                  type="text"
                  value={formData.habilidadePrincipal || ''}
                  onChange={(e) => updateFormData('habilidadePrincipal', e.target.value)}
                  placeholder="Ex: Marketing Digital, Coaching, Nutrição..."
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Oferta Atual (ou que quer criar)
                </label>
                <input
                  type="text"
                  value={formData.ofertaAtual || ''}
                  onChange={(e) => updateFormData('ofertaAtual', e.target.value)}
                  placeholder="Ex: Consultoria, Curso Online, Mentoria..."
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Público-Alvo
                </label>
                <input
                  type="text"
                  value={formData.publicoAlvo || ''}
                  onChange={(e) => updateFormData('publicoAlvo', e.target.value)}
                  placeholder="Ex: Pequenas empresas, Profissionais liberais..."
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Problema Principal que Resolve
                </label>
                <textarea
                  value={formData.problemaPrincipal || ''}
                  onChange={(e) => updateFormData('problemaPrincipal', e.target.value)}
                  placeholder="Ex: Falta de conhecimento em marketing digital..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Diferencial
                </label>
                <textarea
                  value={formData.diferencial || ''}
                  onChange={(e) => updateFormData('diferencial', e.target.value)}
                  placeholder="Ex: Metodologia exclusiva, Resultados em 90 dias..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Preferências e Configurações */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Preferências e Configurações
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Preço Atual (R$)
                </label>
                <input
                  type="number"
                  value={formData.precoAtual || ''}
                  onChange={(e) => updateFormData('precoAtual', e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="Ex: 497, 1997..."
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tempo Disponível
                </label>
                <select
                  value={formData.tempoDisponivel || ''}
                  onChange={(e) => updateFormData('tempoDisponivel', e.target.value || undefined)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                >
                  <option value="">Selecione...</option>
                  <option value="1-2h por dia">1-2h por dia</option>
                  <option value="3-4h por dia">3-4h por dia</option>
                  <option value="Meio período">Meio período</option>
                  <option value="Tempo integral">Tempo integral</option>
                  <option value="Fins de semana">Fins de semana</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Plataforma Principal
                </label>
                <select
                  value={formData.plataformaPrincipal || ''}
                  onChange={(e) => updateFormData('plataformaPrincipal', e.target.value || undefined)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                >
                  <option value="">Selecione...</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Email">Email</option>
                  <option value="Site próprio">Site próprio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Formato Preferido
                </label>
                <select
                  value={formData.formatoPreferido || ''}
                  onChange={(e) => updateFormData('formatoPreferido', e.target.value as OnboardingData['formatoPreferido'] || undefined)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                >
                  <option value="">Selecione...</option>
                  <option value="1:1">1:1 (Individual)</option>
                  <option value="grupo">Grupo</option>
                  <option value="gravado">Gravado</option>
                  <option value="híbrido">Híbrido</option>
                </select>
              </div>
            </div>
          </div>

          {/* Metas */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Metas do Negócio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Meta de Faturamento (R$)
                </label>
                <input
                  type="number"
                  value={formData.metaFaturamento || ''}
                  onChange={(e) => updateFormData('metaFaturamento', e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="Ex: 10000, 50000..."
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Prazo da Meta
                </label>
                <select
                  value={formData.prazoMeta || ''}
                  onChange={(e) => updateFormData('prazoMeta', e.target.value || undefined)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800"
                >
                  <option value="">Selecione...</option>
                  <option value="1 mês">1 mês</option>
                  <option value="3 meses">3 meses</option>
                  <option value="6 meses">6 meses</option>
                  <option value="1 ano">1 ano</option>
                  <option value="2 anos">2 anos</option>
                </select>
              </div>
            </div>
          </div>

          {/* Estilo de Resposta */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Como você quer que eu responda você?
            </h3>
            <div className="space-y-3">
              {RESPONSE_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedStyle === style.id
                      ? 'border-brand-600 dark:border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{style.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {style.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {style.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Observações Adicionais */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Observações Adicionais
            </h3>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex: Prefiro respostas curtas, gosto de exemplos práticos, fale como se eu fosse iniciante, sempre me dê números e métricas..."
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-slate-800 dark:text-white bg-white dark:bg-slate-800 resize-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Descreva como você quer que a LIA responda você. Essas preferências serão aplicadas em todas as conversas.
            </p>
          </div>

          {/* Botão Salvar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <div>
              {saveMessage && (
                <p className={`text-sm ${
                  saveMessage.includes('sucesso') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {saveMessage}
                </p>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-2 rounded-lg font-medium text-white transition-all ${
                isSaving
                  ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed'
                  : 'bg-brand-600 dark:bg-brand-500 hover:bg-brand-700 dark:hover:bg-brand-600 shadow-md hover:shadow-lg'
              }`}
            >
              {isSaving ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationPanel;

