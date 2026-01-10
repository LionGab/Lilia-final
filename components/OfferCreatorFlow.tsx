import React, { useState } from 'react';
import { 
  AvatarData, 
  OfferData, 
  PromiseData, 
  ProductData, 
  ScriptData,
  OfferCreatorStep,
  OfferCreatorResult
} from '../types/offerCreator';
import { 
  generateAvatar, 
  generateOffer, 
  generatePromise, 
  generateProduct, 
  generateScripts,
  refineContent,
  saveOfferCreatorResult
} from '../services/offerCreatorService';
import { getCurrentUser } from '../services/authService';

interface OfferCreatorFlowProps {
  onBack: () => void;
  onComplete?: (result: OfferCreatorResult) => void;
}

const OfferCreatorFlow: React.FC<OfferCreatorFlowProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<OfferCreatorStep>('avatar');
  const [loading, setLoading] = useState(false);
  const [avatarInput, setAvatarInput] = useState('');
  const [offerInput, setOfferInput] = useState('');
  const [productInput, setProductInput] = useState('');
  
  const [avatarData, setAvatarData] = useState<AvatarData | null>(null);
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [promiseData, setPromiseData] = useState<PromiseData | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [scriptsData, setScriptsData] = useState<ScriptData | null>(null);

  // Refinamento
  const [showRefinement, setShowRefinement] = useState(false);
  const [refinementSection, setRefinementSection] = useState<'avatar' | 'offer' | 'promise' | 'product' | 'scripts'>('avatar');
  const [refinementInstruction, setRefinementInstruction] = useState('');
  const [refining, setRefining] = useState(false);

  const user = getCurrentUser();

  const steps = [
    { id: 'avatar', label: '1. Avatar', icon: '👤' },
    { id: 'offer', label: '2. Oferta', icon: '💰' },
    { id: 'promise', label: '3. Promessa', icon: '🎯' },
    { id: 'product', label: '4. Produto', icon: '📦' },
    { id: 'scripts', label: '5. Roteiros', icon: '📝' },
  ];

  const handleGenerateAvatar = async () => {
    if (!avatarInput.trim()) {
      alert('Descreva seu público-alvo');
      return;
    }
    setLoading(true);
    try {
      const avatar = await generateAvatar(avatarInput);
      setAvatarData(avatar);
      setCurrentStep('offer');
    } catch (_error) {
      alert('Erro ao gerar avatar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateOffer = async () => {
    if (!avatarData) return;
    setLoading(true);
    try {
      const offer = await generateOffer(avatarData, offerInput);
      setOfferData(offer);
      setCurrentStep('promise');
    } catch (_error) {
      alert('Erro ao gerar oferta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePromise = async () => {
    if (!avatarData || !offerData) return;
    setLoading(true);
    try {
      const promise = await generatePromise(avatarData, offerData);
      setPromiseData(promise);
      setCurrentStep('product');
    } catch (_error) {
      alert('Erro ao gerar promessa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateProduct = async () => {
    if (!avatarData || !offerData || !promiseData) return;
    setLoading(true);
    try {
      const product = await generateProduct(avatarData, offerData, promiseData, productInput);
      setProductData(product);
      setCurrentStep('scripts');
    } catch (_error) {
      alert('Erro ao gerar produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateScripts = async () => {
    if (!avatarData || !offerData || !promiseData || !productData) return;
    setLoading(true);
    try {
      const scripts = await generateScripts(avatarData, offerData, promiseData, productData);
      setScriptsData(scripts);
      setCurrentStep('result');
      
      // Salvar resultado
      if (user && avatarData && offerData && promiseData && productData && scripts) {
        const result: OfferCreatorResult = {
          avatar: avatarData,
          offer: offerData,
          promise: promiseData,
          product: productData,
          scripts: scripts,
          generatedAt: Date.now()
        };
        saveOfferCreatorResult(user.email, result);
        onComplete?.(result);
      }
    } catch (_error) {
      alert('Erro ao gerar roteiros. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!refinementInstruction.trim()) {
      alert('Digite a instrução de refinamento');
      return;
    }
    
    setRefining(true);
    try {
      let currentContent = '';
      
      switch (refinementSection) {
        case 'avatar':
          currentContent = JSON.stringify(avatarData, null, 2);
          break;
        case 'offer':
          currentContent = JSON.stringify(offerData, null, 2);
          break;
        case 'promise':
          currentContent = JSON.stringify(promiseData, null, 2);
          break;
        case 'product':
          currentContent = JSON.stringify(productData, null, 2);
          break;
        case 'scripts':
          currentContent = JSON.stringify(scriptsData, null, 2);
          break;
      }

      const refined = await refineContent({
        section: refinementSection,
        currentContent,
        refinementInstruction
      });

      // Tentar parsear como JSON se possível
      try {
        const parsedRefined = JSON.parse(refined.match(/\{[\s\S]*\}/)?.[0] || refined);
        
        switch (refinementSection) {
          case 'avatar':
            setAvatarData(parsedRefined);
            break;
          case 'offer':
            setOfferData(parsedRefined);
            break;
          case 'promise':
            setPromiseData(parsedRefined);
            break;
          case 'product':
            setProductData(parsedRefined);
            break;
          case 'scripts':
            setScriptsData(parsedRefined);
            break;
        }
      } catch {
        alert('Refinamento aplicado, mas formato pode ter mudado. Verifique o conteúdo.');
      }

      setRefinementInstruction('');
      setShowRefinement(false);
    } catch (_error) {
      alert('Erro ao refinar. Tente novamente.');
    } finally {
      setRefining(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado!');
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8 overflow-x-auto pb-2">
      <div className="flex gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep || 
            (currentStep === 'result' && index < steps.length);
          const isCompleted = steps.findIndex(s => s.id === currentStep) > index ||
            currentStep === 'result';
          
          return (
            <div 
              key={step.id}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-brand-600 text-white' 
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              <span>{step.icon}</span>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAvatarStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          👤 Defina Seu Avatar
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Descreva seu público-alvo ideal com o máximo de detalhes possível
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Descreva seu público-alvo
        </label>
        <textarea
          value={avatarInput}
          onChange={(e) => setAvatarInput(e.target.value)}
          placeholder="Ex: Mulheres de 25-45 anos que querem emagrecer, trabalham fora, têm pouco tempo para cozinhar, já tentaram várias dietas sem sucesso..."
          className="w-full p-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg h-40 resize-none text-slate-900 dark:text-white"
        />
      </div>

      <button
        onClick={handleGenerateAvatar}
        disabled={loading || !avatarInput.trim()}
        className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        {loading ? 'Gerando Avatar...' : 'Gerar Avatar →'}
      </button>
    </div>
  );

  const renderOfferStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          💰 Crie Sua Oferta
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Vamos criar uma oferta irresistível para seu avatar
        </p>
      </div>

      {avatarData && (
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-slate-900 dark:text-white">Avatar: {avatarData.name}</h3>
            <button
              onClick={() => { setRefinementSection('avatar'); setShowRefinement(true); }}
              className="text-sm text-brand-600 hover:text-brand-700"
            >
              ✏️ Refinar
            </button>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {avatarData.profession} • {avatarData.age} • {avatarData.location}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            <strong>Dores:</strong> {avatarData.mainPains.slice(0, 3).join(', ')}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Informações adicionais sobre sua oferta (opcional)
        </label>
        <textarea
          value={offerInput}
          onChange={(e) => setOfferInput(e.target.value)}
          placeholder="Ex: Já tenho um curso de emagrecimento, quero vender por R$497, meu diferencial é o acompanhamento por WhatsApp..."
          className="w-full p-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg h-32 resize-none text-slate-900 dark:text-white"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep('avatar')}
          className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          ← Voltar
        </button>
        <button
          onClick={handleGenerateOffer}
          disabled={loading}
          className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {loading ? 'Gerando Oferta...' : 'Gerar Oferta →'}
        </button>
      </div>
    </div>
  );

  const renderPromiseStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          🎯 Promessa Principal
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Baseado no avatar e na oferta, vamos criar sua promessa
        </p>
      </div>

      {avatarData && offerData && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-slate-900 dark:text-white">👤 Avatar</h3>
              <button
                onClick={() => { setRefinementSection('avatar'); setShowRefinement(true); }}
                className="text-sm text-brand-600 hover:text-brand-700"
              >
                ✏️
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{avatarData.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              {avatarData.mainPains[0]}
            </p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-slate-900 dark:text-white">💰 Oferta</h3>
              <button
                onClick={() => { setRefinementSection('offer'); setShowRefinement(true); }}
                className="text-sm text-brand-600 hover:text-brand-700"
              >
                ✏️
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{offerData.productName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              {offerData.mainBenefit}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep('offer')}
          className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          ← Voltar
        </button>
        <button
          onClick={handleGeneratePromise}
          disabled={loading}
          className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {loading ? 'Gerando Promessa...' : 'Gerar Promessa →'}
        </button>
      </div>
    </div>
  );

  const renderProductStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          📦 Criação do Produto
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Vamos estruturar seu produto para entregar a promessa
        </p>
      </div>

      {promiseData && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-green-800 dark:text-green-300">🎯 Sua Promessa</h3>
            <button
              onClick={() => { setRefinementSection('promise'); setShowRefinement(true); }}
              className="text-sm text-brand-600 hover:text-brand-700"
            >
              ✏️ Refinar
            </button>
          </div>
          <p className="text-green-700 dark:text-green-400 font-medium">{promiseData.mainPromise}</p>
          <p className="text-sm text-green-600 dark:text-green-500 mt-2">
            Transformação: {promiseData.transformation}
          </p>
          <p className="text-sm text-green-600 dark:text-green-500">
            Prazo: {promiseData.timeframe}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Detalhes adicionais do produto (opcional)
        </label>
        <textarea
          value={productInput}
          onChange={(e) => setProductInput(e.target.value)}
          placeholder="Ex: Quero um curso com 8 módulos, acesso vitalício, grupo de suporte no Telegram..."
          className="w-full p-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg h-32 resize-none text-slate-900 dark:text-white"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep('promise')}
          className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          ← Voltar
        </button>
        <button
          onClick={handleGenerateProduct}
          disabled={loading}
          className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {loading ? 'Gerando Produto...' : 'Gerar Produto →'}
        </button>
      </div>
    </div>
  );

  const renderScriptsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          📝 Roteiros de Vendas
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Vamos criar os roteiros de vendas para seu produto
        </p>
      </div>

      {productData && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300">📦 Seu Produto</h3>
            <button
              onClick={() => { setRefinementSection('product'); setShowRefinement(true); }}
              className="text-sm text-brand-600 hover:text-brand-700"
            >
              ✏️ Refinar
            </button>
          </div>
          <p className="text-purple-700 dark:text-purple-400 font-medium">{productData.name}</p>
          <p className="text-sm text-purple-600 dark:text-purple-500 mt-1">
            {productData.format} • {productData.duration} • {productData.accessType}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-500 mt-1">
            {productData.modules.length} módulos • {productData.deliverables.length} entregáveis
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep('product')}
          className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          ← Voltar
        </button>
        <button
          onClick={handleGenerateScripts}
          disabled={loading}
          className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {loading ? 'Gerando Roteiros...' : 'Gerar Roteiros →'}
        </button>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          ✅ Oferta Completa!
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Aqui está sua oferta completa. Você pode refinar qualquer seção.
        </p>
      </div>

      {/* Avatar */}
      {avatarData && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">👤 Avatar</h3>
            <div className="flex gap-2">
              <button
                onClick={() => { setRefinementSection('avatar'); setShowRefinement(true); }}
                className="text-sm text-brand-600 hover:text-brand-700"
              >
                ✏️ Refinar
              </button>
              <button
                onClick={() => copyToClipboard(JSON.stringify(avatarData, null, 2))}
                className="text-sm text-slate-600 hover:text-slate-900 dark:hover:text-white"
              >
                📋 Copiar
              </button>
            </div>
          </div>
          <div className="grid gap-2 text-sm">
            <p><strong>Nome:</strong> {avatarData.name}</p>
            <p><strong>Perfil:</strong> {avatarData.profession}, {avatarData.age}, {avatarData.location}</p>
            <p><strong>Renda:</strong> {avatarData.income}</p>
            <p><strong>Dores:</strong> {avatarData.mainPains.join('; ')}</p>
            <p><strong>Desejos:</strong> {avatarData.desires.join('; ')}</p>
            <p><strong>Objeções:</strong> {avatarData.objections.join('; ')}</p>
          </div>
        </div>
      )}

      {/* Oferta */}
      {offerData && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">💰 Oferta</h3>
            <div className="flex gap-2">
              <button
                onClick={() => { setRefinementSection('offer'); setShowRefinement(true); }}
                className="text-sm text-brand-600 hover:text-brand-700"
              >
                ✏️ Refinar
              </button>
              <button
                onClick={() => copyToClipboard(JSON.stringify(offerData, null, 2))}
                className="text-sm text-slate-600 hover:text-slate-900 dark:hover:text-white"
              >
                📋 Copiar
              </button>
            </div>
          </div>
          <div className="grid gap-2 text-sm">
            <p><strong>Produto:</strong> {offerData.productName}</p>
            <p><strong>Tipo:</strong> {offerData.productType}</p>
            <p><strong>Preço:</strong> {offerData.price}</p>
            <p><strong>Benefício Principal:</strong> {offerData.mainBenefit}</p>
            <p><strong>Mecanismo Único:</strong> {offerData.uniqueMechanism}</p>
            <p><strong>Garantia:</strong> {offerData.guarantee}</p>
            <p><strong>Bônus:</strong> {offerData.bonuses.join('; ')}</p>
          </div>
        </div>
      )}

      {/* Promessa */}
      {promiseData && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">🎯 Promessa</h3>
            <div className="flex gap-2">
              <button
                onClick={() => { setRefinementSection('promise'); setShowRefinement(true); }}
                className="text-sm text-brand-600 hover:text-brand-700"
              >
                ✏️ Refinar
              </button>
              <button
                onClick={() => copyToClipboard(JSON.stringify(promiseData, null, 2))}
                className="text-sm text-slate-600 hover:text-slate-900 dark:hover:text-white"
              >
                📋 Copiar
              </button>
            </div>
          </div>
          <div className="grid gap-2 text-sm">
            <p><strong>Promessa Principal:</strong> {promiseData.mainPromise}</p>
            <p><strong>Transformação:</strong> {promiseData.transformation}</p>
            <p><strong>Prazo:</strong> {promiseData.timeframe}</p>
            <p><strong>Resultado:</strong> {promiseData.targetResult}</p>
          </div>
        </div>
      )}

      {/* Produto */}
      {productData && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">📦 Produto</h3>
            <div className="flex gap-2">
              <button
                onClick={() => { setRefinementSection('product'); setShowRefinement(true); }}
                className="text-sm text-brand-600 hover:text-brand-700"
              >
                ✏️ Refinar
              </button>
              <button
                onClick={() => copyToClipboard(JSON.stringify(productData, null, 2))}
                className="text-sm text-slate-600 hover:text-slate-900 dark:hover:text-white"
              >
                📋 Copiar
              </button>
            </div>
          </div>
          <div className="grid gap-2 text-sm">
            <p><strong>Nome:</strong> {productData.name}</p>
            <p><strong>Formato:</strong> {productData.format}</p>
            <p><strong>Duração:</strong> {productData.duration}</p>
            <p><strong>Acesso:</strong> {productData.accessType}</p>
            <p><strong>Módulos:</strong></p>
            <ul className="list-disc list-inside ml-2">
              {productData.modules.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
            <p><strong>Entregáveis:</strong> {productData.deliverables.join('; ')}</p>
            <p><strong>Suporte:</strong> {productData.support}</p>
          </div>
        </div>
      )}

      {/* Roteiros */}
      {scriptsData && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">📝 Roteiros</h3>
            <div className="flex gap-2">
              <button
                onClick={() => { setRefinementSection('scripts'); setShowRefinement(true); }}
                className="text-sm text-brand-600 hover:text-brand-700"
              >
                ✏️ Refinar
              </button>
              <button
                onClick={() => copyToClipboard(JSON.stringify(scriptsData, null, 2))}
                className="text-sm text-slate-600 hover:text-slate-900 dark:hover:text-white"
              >
                📋 Copiar
              </button>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold mb-1">📹 Script VSL:</p>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{scriptsData.vslScript}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">📧 Sequência de Emails:</p>
              <ul className="list-decimal list-inside text-slate-600 dark:text-slate-400">
                {scriptsData.emailSequence.map((email, i) => <li key={i}>{email}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">📱 Copy de Anúncio:</p>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{scriptsData.adCopy}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">🌐 Landing Page:</p>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{scriptsData.landingPageCopy}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onBack}
        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Concluir
      </button>
    </div>
  );

  const renderRefinementModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-lg w-full">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          ✏️ Refinar {refinementSection.charAt(0).toUpperCase() + refinementSection.slice(1)}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Digite como você gostaria de modificar esta seção:
        </p>
        <textarea
          value={refinementInstruction}
          onChange={(e) => setRefinementInstruction(e.target.value)}
          placeholder="Ex: Torne mais específico para mulheres de 30-40 anos, adicione mais urgência, mude o tom para mais casual..."
          className="w-full p-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg h-32 resize-none text-slate-900 dark:text-white mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={() => { setShowRefinement(false); setRefinementInstruction(''); }}
            className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleRefine}
            disabled={refining || !refinementInstruction.trim()}
            className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {refining ? 'Refinando...' : 'Refinar'}
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Processando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          🚀 Criador de Oferta Completa
        </h1>

        {renderStepIndicator()}

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          {currentStep === 'avatar' && renderAvatarStep()}
          {currentStep === 'offer' && renderOfferStep()}
          {currentStep === 'promise' && renderPromiseStep()}
          {currentStep === 'product' && renderProductStep()}
          {currentStep === 'scripts' && renderScriptsStep()}
          {currentStep === 'result' && renderResult()}
        </div>
      </div>

      {showRefinement && renderRefinementModal()}
    </div>
  );
};

export default OfferCreatorFlow;
