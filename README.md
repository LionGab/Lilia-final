<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Funil ERL

Assistente de IA especialista no Método ERL (Entrada, Relacionamento, Lucro) para criação de produtos digitais e estratégias de vendas, com modo Copywriter profissional integrado.

## Funcionalidades

- **Método ERL**: Criação de produtos, funis URL e planos de conteúdo
- **Modo Copywriter**: Análise completa de copywriting com 10 passos profissionais
- **Autenticação**: Sistema simples de login por lista de emails (até 10 usuários)
- **Análise de Conversa**: Insights e progresso em tempo real
- **Exportação**: Exporte conversas em Markdown, JSON ou PDF
- **Histórico Inteligente**: Busca e organização de conversas anteriores

## Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Chave da API Gemini

Crie um arquivo `.env.local` na raiz do projeto:

```
GEMINI_API_KEY=sua_chave_aqui
```

**Nota:** Estamos usando a **API Gemini 2.0** com os modelos mais recentes:

- `gemini-2.0-flash-exp` - Modelo padrão (1M tokens de contexto)
- `gemini-2.0-flash-thinking-exp` - Para tarefas complexas como copywriting

### 3. Configurar Emails Permitidos

Edite o arquivo `constants/auth.ts` e adicione os emails autorizados (máximo 10):

```typescript
export const ALLOWED_EMAILS: string[] = [
  "usuario1@exemplo.com",
  "usuario2@exemplo.com",
  // Adicione até 10 emails
];
```

### 4. Executar o Projeto

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## Uso

### Modo ERL (Padrão)

A LIA ajuda você a:

1. Definir seu produto principal
2. Criar um funil URL (Entrada → Relacionamento → Lucro)
3. Desenvolver um plano de conteúdo de 7 dias

### Modo Copywriter

Ative o modo copywriter para análise completa de:

- Público-alvo e nível de consciência
- Estrutura de copy ideal (AIDA, StoryBrand, etc.)
- Promessa única e mecanismo diferenciado
- Funil de conteúdo estratégico
- Roteiros de vídeos virais
- Textos de vendas completos
- Títulos e CTAs testáveis

**Como usar:**

- Clique no botão "✍️ Copywriter" na barra de ferramentas
- Ou envie uma mensagem com palavras-chave como "copy", "roteiro", "vídeo viral"
- Envie sua ideia/produto/nicho e receba análise completa

## Estrutura do Projeto

```
├── components/          # Componentes React
│   ├── ChatInterface.tsx
│   ├── LoginScreen.tsx
│   ├── CopywriterResponse.tsx
│   └── ...
├── services/            # Serviços e lógica de negócio
│   ├── geminiService.ts
│   ├── copywriterService.ts
│   ├── authService.ts
│   └── ...
├── constants/           # Constantes e configurações
│   ├── constants.ts
│   ├── copywriterPrompt.ts
│   └── ...
└── types/              # Definições TypeScript
    ├── types.ts
    ├── copywriter.ts
    └── ...
```

## Troubleshooting

### Erro de Autenticação

- Verifique se o email está na lista `ALLOWED_EMAILS` em `constants/auth.ts`

### Erro de API Gemini

- Verifique se a chave `GEMINI_API_KEY` está configurada no `.env.local`
- Confirme que a chave é válida e tem créditos disponíveis

### Histórico não carrega

- O histórico é salvo por usuário no localStorage
- Verifique se está logado com o mesmo email

## Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```
