# System Prompt para NotebookLM - Funil ERL

Use o conteúdo abaixo como system prompt no NotebookLM para treinar a IA sobre o Funil ERL.

## Conteúdo do Prompt

```markdown
# Funil ERL - Guia Completo para NotebookLM

## O QUE É O FUNIL ERL

O Funil ERL é uma plataforma de inteligência artificial especializada no Método ERL (Entrada, Relacionamento, Lucro) para criação de produtos digitais e estratégias de vendas. A IA assistente se chama LIA (Lilia Intelligence Assistant).

## FUNCIONALIDADES PRINCIPAIS

### 1. Método ERL (Modo Padrão)

A LIA ajuda usuários a criar:

- **Produto Principal**: Definição de ofertas digitais ou de serviço
- **Funil URL**: Estrutura de vendas em 3 etapas (Entrada → Relacionamento → Lucro)
- **Plano de Conteúdo**: Estratégia de conteúdo de 7 dias para vender o produto

### 2. Modo Copywriter

Análise completa de copywriting profissional com 10 passos:

- Análise do público-alvo e nível de consciência
- Estrutura de copy ideal (AIDA, StoryBrand, etc.)
- Promessa única e mecanismo diferenciado
- Funil de conteúdo estratégico
- Roteiros de vídeos virais
- Textos de vendas completos
- Títulos e CTAs testáveis

### 3. Sistema de Agentes

Interface tipo "fazedoria" com diferentes agentes especializados:

- Cada agente tem uma especialidade (ERL, Copywriter, etc.)
- Sidebar com navegação e histórico
- Grid de seleção de agentes por categoria

### 4. Onboarding Inteligente

- Templates de negócios pré-configurados (ex: "Um negócio igual o ChatGPT")
- Personalização de estilo de resposta da IA
- Coleta de informações do negócio do usuário
- Observações personalizadas sobre como o usuário quer ser respondido

## COMO USAR O APLICATIVO

### Passo 1: Login

- Sistema de autenticação por email (whitelist de até 10 usuários)
- Login simples via email

### Passo 2: Onboarding (Primeira Vez)

1. Selecionar template de negócio ou criar personalizado
2. Escolher estilo de resposta preferido:
   - Direto e Objetivo
   - Amigável e Próximo
   - Profissional e Técnico
   - Motivacional e Inspirador
   - Educativo e Didático
3. Adicionar observações sobre como quer ser respondido (opcional)

### Passo 3: Selecionar Agente

- Na tela principal, escolher um agente da grade
- Cada agente tem especialidade diferente

### Passo 4: Conversar com a LIA

- Enviar mensagens sobre seu negócio
- A LIA usa o contexto do onboarding para personalizar respostas
- Modo Copywriter pode ser ativado via botão ou palavras-chave

### Passo 5: Usar Funcionalidades

- **Análise**: Ver progresso da conversa e blocos completados
- **Exportar**: Baixar conversa em Markdown, JSON ou PDF
- **Histórico**: Acessar conversas anteriores na sidebar

## RECURSOS TÉCNICOS

### Tecnologias

- React + TypeScript
- Vite como build tool
- Tailwind CSS (via CDN)
- Google Gemini API 2.0 (gemini-2.0-flash-exp)
- LocalStorage para persistência

### Estrutura de Dados

- Histórico de chat salvo por usuário
- Dados de onboarding por usuário
- Sistema de migração de dados antigos

### Personalização

- Tema claro/escuro (dark mode)
- Estilo de resposta personalizado
- Contexto de negócio aplicado automaticamente

## FLUXO DE TRABALHO TÍPICO

1. **Usuário faz login** → Vê tela de agentes
2. **Se primeira vez** → Passa por onboarding
3. **Seleciona agente** → Abre chat com a LIA
4. **Conversa sobre negócio** → LIA usa contexto do onboarding
5. **Recebe sugestões** → Produto, funil, conteúdo
6. **Pode ativar Copywriter** → Análise completa de copy
7. **Exporta resultados** → Salva conversa e análises

## DICAS DE USO

- Seja específico sobre seu negócio na primeira conversa
- Use o modo Copywriter para análises profundas
- O onboarding é importante para personalização
- Histórico é salvo automaticamente
- Pode anexar imagens para análise

## LIMITAÇÕES

- Máximo de 10 usuários (whitelist de emails)
- Requer chave da API Gemini configurada
- Dados salvos apenas localmente (localStorage)
- Não há sincronização entre dispositivos

## SUPORTE

- Verificar chave da API no arquivo .env.local
- Emails permitidos em constants/auth.ts
- Logs de erro no console do navegador
```

## Como Usar no NotebookLM

1. Abra o NotebookLM (https://notebooklm.google.com)
2. Crie um novo notebook
3. Cole o conteúdo acima como "Source" ou "System Prompt"
4. O NotebookLM agora entenderá completamente o Funil ERL e poderá ajudar usuários a usar o aplicativo

## O que o NotebookLM Poderá Fazer

Após treinar com este prompt, o NotebookLM poderá:

- Explicar como usar cada funcionalidade do Funil ERL
- Guiar usuários passo a passo
- Responder perguntas sobre o aplicativo
- Sugerir melhores práticas
- Resolver dúvidas técnicas
