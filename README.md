# Funil ERL - Lyla.IA

Assistente de IA especialista no Método ERL (Entrada, Relacionamento, Lucro) para criação de produtos digitais e estratégias de vendas.

## Funcionalidades

- **Método ERL**: Múltiplos agentes especializados (Lyla.IA, MED Engine, Copywriter, etc.)
- **Agentes Inteligentes**: Cada agente com expertise específica
- **Autenticação**: Sistema simples de login por email
- **Histórico**: Busca e organização de conversas

## Configuração Rápida

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Chave da API Gemini

**IMPORTANTE:** Este projeto usa a **API Gemini** (Google AI), não OpenAI.

1. **Obtenha sua chave gratuita em:** https://makersuite.google.com/app/apikey

2. **Crie um arquivo `.env.local` na raiz do projeto** (mesmo nível que `package.json`):

```bash
# .env.local
VITE_GEMINI_API_KEY=sua_chave_aqui
```

3. **Após criar o arquivo, reinicie o servidor de desenvolvimento:**

```bash
# Pare o servidor (Ctrl+C) e execute novamente:
npm run dev
```

**⚠️ Erro: "VITE_GEMINI_API_KEY não configurada"?**

Verifique se:

- ✅ O arquivo `.env.local` existe na **raiz do projeto**
- ✅ O nome do arquivo está correto (começa com ponto: `.env.local`)
- ✅ A variável está escrita exatamente como: `VITE_GEMINI_API_KEY=`
- ✅ Não há espaços antes ou depois do `=`
- ✅ O servidor foi **reiniciado** após criar/modificar o arquivo
- ✅ A chave da API está válida e ativa no Google AI Studio

### 3. Configurar Emails Permitidos

Edite o arquivo `constants/auth.ts` e adicione os emails autorizados (máximo 10):

```typescript
export const ALLOWED_EMAILS: string[] = [
  "seu@email.com",
  // Adicione até 10 emails
];
```

### 4. Executar o Projeto

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Agentes Disponíveis (Modos MED)

Todos os agentes fazem parte do **MED - Motor de Execução Digital**:

1. **LYLA Mestre** 🎯 - Estratégia Completa A•B•C (Começar do zero com plano completo em 7 dias)
2. **AVATAR** 👤 - Construção de Avatar (Vamos criar seu cliente ideal do zero)
3. **OFERTA** 💝 - Crie sua Oferta (Definir oferta baseada no avatar)
4. **PROMESSA** ✨ - Promessa para 6 Alunas (Criar promessa irresistível)
5. **Roteiros MED** 🎬 - Conteúdo ERL 2025 (Não sei o que postar)
6. **Bastidores MED** 🤝 - Parcerias & Funis (Quero trabalhar sem aparecer)
7. **Plano MED** 📅 - Plano de 30 Dias (Sei o que quero, não consigo organizar)
8. **Arquiteto de Identidade** 🦋 - Reconstrução de Identidade (Quero me livrar de rótulos limitantes)
9. **Mente Milionária** 💰 - Mentalidade Financeira (Tenho bloqueio com dinheiro)

## Estrutura Simplificada

```
├── components/          # Componentes React
├── services/            # Lógica de negócio
├── constants/           # Prompts e configurações
├── types/              # Definições TypeScript
└── config/             # Configuração de agentes
```

## Build para Produção

```bash
npm run build
npm run preview
```

## Deploy no Netlify

### 1. Configurar Variáveis de Ambiente no Netlify Dashboard

**IMPORTANTE:** As variáveis de ambiente devem ser configuradas no painel do Netlify, não no arquivo `netlify.toml` (que é versionado).

1. **Acesse o Netlify Dashboard:**
   - Faça login em https://app.netlify.com
   - Selecione seu site

2. **Navegue até Environment variables:**
   - Site settings → Environment variables → Add a variable

3. **Adicione as seguintes variáveis:**

   ```
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_anon_key_do_supabase
   VITE_GEMINI_API_KEY=sua_api_key_do_gemini
   ```

   > **Nota:** Obtenha suas chaves em:
   > - Supabase: https://supabase.com/dashboard (Settings → API)
   > - Gemini: https://aistudio.google.com/apikey

4. **Salve as variáveis** e **reimplante o site:**
   - Site overview → Deploys → Trigger deploy → Deploy site
   - Ou faça um novo commit/push para o repositório conectado

### 2. Verificar Configuração do Deploy

O arquivo `netlify.toml` já está configurado com:

- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ✅ Node version: `18`
- ✅ Headers de segurança
- ✅ Redirecionamentos para SPA

### 3. Após Configurar as Variáveis

- ✅ Faça um novo deploy para aplicar as variáveis
- ✅ As variáveis estarão disponíveis durante o build e em runtime
- ✅ Verifique os logs do deploy para confirmar que as variáveis foram carregadas

**⚠️ Importante:**

- Nunca commite credenciais reais no código
- Use sempre variáveis de ambiente no Netlify Dashboard
- O arquivo `.env.local` é apenas para desenvolvimento local
