import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import LoginScreen from './components/LoginScreen';
import AgentsScreen from './components/AgentsScreen';
import OnboardingScreen from './components/OnboardingScreen';
import TutorialsPanel from './components/TutorialsPanel';
import BusinessIdeasPanel from './components/BusinessIdeasPanel';
import PersonalizationPanel from './components/PersonalizationPanel';
import { isAuthenticated, getCurrentUser } from './services/authService';
import { initTheme } from './services/themeService';
import { OnboardingData } from './types/onboarding';

type ViewMode = 'agents' | 'chat' | 'tutorials' | 'ideas' | 'personalization';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<ViewMode>('agents');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  useEffect(() => {
    // Inicializar tema
    initTheme();
    
    // Verificar autenticação ao carregar
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setAuthenticated(authStatus);
      
      if (authStatus) {
        // Verificar se já tem onboarding completo
        const user = getCurrentUser();
        if (user) {
          const onboardingData = localStorage.getItem(`erl_lia_onboarding_${user.email}`);
          setShowOnboarding(!onboardingData);
        }
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
    // Verificar se precisa de onboarding
    const user = getCurrentUser();
    if (user) {
      const onboardingData = localStorage.getItem(`erl_lia_onboarding_${user.email}`);
      setShowOnboarding(!onboardingData);
    }
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setShowOnboarding(false);
    // Dados já foram salvos no OnboardingScreen
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    setCurrentView('chat');
  };

  const handleBackToAgents = () => {
    setCurrentView('agents');
    setSelectedAgent(null);
  };

  const handleViewHistory = (sessionId: string) => {
    // Implementar visualização de histórico
    console.log('View history:', sessionId);
  };

  const handleViewTutorials = () => {
    setCurrentView('tutorials');
  };

  const handleViewIdeas = () => {
    setCurrentView('ideas');
  };

  const handleViewPersonalization = () => {
    setCurrentView('personalization');
  };

  // Mostrar loading enquanto verifica autenticação
  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center transition-colors">
        <div className="text-slate-500 dark:text-slate-400">Carregando...</div>
      </div>
    );
  }

  // Renderizar LoginScreen ou interface baseado no estado de autenticação
  if (!authenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Mostrar onboarding se necessário
  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} onSkip={handleOnboardingSkip} />;
  }

  // Renderizar diferentes views
  if (currentView === 'tutorials') {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
        <div className="h-screen">
          <TutorialsPanel onBack={handleBackToAgents} />
        </div>
      </div>
    );
  }

  if (currentView === 'ideas') {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
        <div className="h-screen">
          <BusinessIdeasPanel onBack={handleBackToAgents} />
        </div>
      </div>
    );
  }

  if (currentView === 'personalization') {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
        <div className="h-screen">
          <PersonalizationPanel onBack={handleBackToAgents} />
        </div>
      </div>
    );
  }

  if (currentView === 'agents') {
    return (
      <AgentsScreen 
        onSelectAgent={handleSelectAgent} 
        onViewHistory={handleViewHistory}
        onViewTutorials={handleViewTutorials}
        onViewIdeas={handleViewIdeas}
        onViewPersonalization={handleViewPersonalization}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-950 transition-colors">
      <ChatInterface 
        agentId={selectedAgent} 
        onBack={handleBackToAgents}
      />
    </div>
  );
};

export default App;
