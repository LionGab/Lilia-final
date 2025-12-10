import React, { useState, useRef, useEffect } from 'react';
import { Message, Sender } from '../types';
import { sendContentToGemini } from '../services/geminiService';
import { processCopywriterRequest } from '../services/copywriterService';
import { detectUserIntent, isExplicitCopywriterRequest } from '../services/modeDetectionService';
import { analyzeConversation } from '../services/analysisService';
import { getCurrentUser } from '../services/authService';
import { checkAndMigrate } from '../services/migrationService';
import { initTheme } from '../services/themeService';
import { OnboardingData } from '../types/onboarding';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatHeader from './ChatHeader';
import CopywriterModeToggle from './CopywriterModeToggle';
import CopywriterResponse from './CopywriterResponse';
import AnalysisPanel from './AnalysisPanel';
import ExportButton from './ExportButton';
import { CopywriterResponse as CopywriterResponseType } from '../types/copywriter';

// Utility function to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface ChatInterfaceProps {
  agentId?: string | null;
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ agentId, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [copywriterMode, setCopywriterMode] = useState(false);
  const [copywriterResponse, setCopywriterResponse] = useState<CopywriterResponseType | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | undefined>(undefined);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user-specific storage key
  const getStorageKey = (): string => {
    const user = getCurrentUser();
    return user ? `erl_lia_chat_history_${user.email}` : 'erl_lia_chat_history_v1';
  };

  // Load history from localStorage on mount
  useEffect(() => {
    initTheme(); // Initialize theme
    checkAndMigrate(); // Migrate old data if needed
    
    // Load onboarding data
    const user = getCurrentUser();
    if (user) {
      const savedOnboarding = localStorage.getItem(`erl_lia_onboarding_${user.email}`);
      if (savedOnboarding) {
        try {
          const parsed = JSON.parse(savedOnboarding);
          setOnboardingData(parsed);
        } catch (error) {
          console.error("Failed to parse onboarding data:", error);
        }
      }
    }
    
    const storageKey = getStorageKey();
    const savedHistory = localStorage.getItem(storageKey);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setMessages(parsedHistory);
      } catch (error) {
        console.error("Failed to parse chat history:", error);
        initializeWelcomeMessage();
      }
    } else {
      initializeWelcomeMessage();
    }
    setIsInitialized(true);
  }, []);

  const initializeWelcomeMessage = () => {
    setMessages([
      {
        id: 'welcome',
        text: "Oi! Eu sou a LIA, sua mentora de negócios digitais com o Método ERL. \n\nVou te ajudar a estruturar seu produto, seu funil e seu conteúdo. Para começarmos, me conta: qual é a sua profissão ou habilidade principal hoje?",
        sender: Sender.AI,
        timestamp: Date.now(),
      },
    ]);
  };

  // Save history to localStorage whenever messages change
  useEffect(() => {
    if (isInitialized) {
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(messages));
      
      // Update analysis when messages change
      if (messages.length > 0) {
        // Analysis will be shown if user requests it
      }
    }
  }, [messages, isInitialized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isInitialized, imagePreviewUrl]); // Added imagePreviewUrl to trigger scroll

  const handleSendMessage = async () => {
    const trimmedInputText = inputText.trim();
    if ((!trimmedInputText && !selectedImage) || isLoading) return;

    // Detect intent
    const intent = detectUserIntent(trimmedInputText);
    const explicitCopywriter = isExplicitCopywriterRequest(trimmedInputText);
    const shouldUseCopywriter = copywriterMode || explicitCopywriter || intent === 'copywriter';

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedInputText || undefined,
      sender: Sender.User,
      timestamp: Date.now(),
      imageUrl: imagePreviewUrl || undefined,
      imageMimeType: selectedImage?.type || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Clear image preview and input after sending
    setSelectedImage(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
    }

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Handle copywriter mode
      if (shouldUseCopywriter && trimmedInputText) {
        const copywriterResult = await processCopywriterRequest(trimmedInputText, onboardingData);
        setCopywriterResponse(copywriterResult);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Análise completa de copywriting gerada! Veja os detalhes abaixo.`,
          sender: Sender.AI,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Normal ERL mode
        let base64Image: string | undefined;
        let imageMimeType: string | undefined;

        if (selectedImage) {
          base64Image = await fileToBase64(selectedImage);
          imageMimeType = selectedImage.type;
        }

        const response = await sendContentToGemini(messages, trimmedInputText, base64Image, imageMimeType, onboardingData);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text || undefined,
          sender: Sender.AI,
          timestamp: Date.now(),
          imageUrl: response.imageUrl || undefined,
          imageMimeType: response.mimeType || undefined,
        };

        setMessages((prev) => [...prev, aiMessage]);
        setCopywriterResponse(null); // Clear copywriter response in normal mode
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Poxa, tive um probleminha para pensar ou processar a imagem agora. Tente novamente em alguns instantes.",
        sender: Sender.AI,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      // Focus textarea for prompt input
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input
    }
  };

  if (!isInitialized) return null;

  const analysis = messages.length > 0 ? analyzeConversation(messages) : null;

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-900 relative max-w-4xl mx-auto transition-colors">
      <ChatHeader onBack={onBack} />

      {/* Toolbar Clean */}
      <div className="flex-none bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-3 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CopywriterModeToggle isActive={copywriterMode} onToggle={setCopywriterMode} />
            {messages.length > 0 && (
              <>
                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    showAnalysis 
                      ? 'bg-brand-600 dark:bg-brand-500 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Análise {analysis && `(${analysis.progresso.porcentagem}%)`}
                </button>
                <ExportButton messages={messages} />
              </>
            )}
          </div>
          {copywriterMode && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Modo Copywriter ativo
            </p>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth bg-white dark:bg-slate-900 transition-colors">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        
        {showAnalysis && analysis && (
          <div className="mt-4 animate-fade-in">
            <AnalysisPanel analysis={analysis} />
          </div>
        )}
        
        {/* Copywriter Response - Full Width */}
        {copywriterResponse && (
          <div className="mt-4 animate-fade-in">
            <CopywriterResponse response={copywriterResponse} />
          </div>
        )}
        
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="flex-none bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 sticky bottom-0 z-10 transition-colors">
        {imagePreviewUrl && (
            <div className="relative mb-3 p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
                <img src={imagePreviewUrl} alt="Prévia da imagem" className="max-h-40 w-auto rounded-md mx-auto object-contain" />
                <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-600 text-white rounded-full p-1 text-xs leading-none flex items-center justify-center w-6 h-6 shadow-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors z-20"
                    aria-label="Remover imagem"
                >
                    &times;
                </button>
            </div>
        )}
        <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-1.5 focus-within:ring-2 focus-within:ring-brand-100 dark:focus-within:ring-brand-900 focus-within:border-brand-300 dark:focus-within:border-brand-500 transition-all shadow-sm">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Hide the default file input
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-none w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 mb-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 shadow-sm"
            aria-label="Anexar imagem"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5h.008v.008h-.008zm12.75-6.75l-6.148-6.148a1.125 1.125 0 00-1.584 0L6.25 12.251m12.75-6.75a6 6 0 010 6-6 6 0 01-6 6H3.75a3.75 3.75 0 01-3.75-3.75V11.25a3.75 3.75 0 013.75-3.75h1.5" />
            </svg>
          </button>
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInputResize}
            onKeyDown={handleKeyDown}
            placeholder={selectedImage ? "Descreva as edições na imagem (ex: 'adicione um filtro retrô', 'remova a pessoa')..." : "Responda para a LIA..."}
            className="w-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 resize-none max-h-32 py-3 px-4 text-sm sm:text-base"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={(!inputText.trim() && !selectedImage) || isLoading}
            className={`flex-none w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 mb-0.5 ${
              (!inputText.trim() && !selectedImage) || isLoading
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                : 'bg-brand-600 dark:bg-brand-500 text-white hover:bg-brand-700 dark:hover:bg-brand-600 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'
            }`}
            aria-label="Enviar mensagem"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 ml-0.5"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
        <div className="text-center mt-2">
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
                A IA pode cometer erros. Verifique informações importantes.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;