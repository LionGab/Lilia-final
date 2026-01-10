/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Gemini AI (Google AI) - OBRIGATÓRIA
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_API_KEY?: string; // Fallback
  
  // Supabase - Opcional
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  
  // OpenAI - Opcional
  readonly VITE_OPENAI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
