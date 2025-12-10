export interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: string;
  steps?: string[];
}

export const TUTORIALS: Tutorial[] = [
  {
    id: 'primeiros-passos',
    title: 'Primeiros Passos',
    description: 'Como começar a usar o Funil ERL',
    icon: '🚀',
    content: `
# Primeiros Passos no Funil ERL

## 1. Fazer Login
- Use seu email cadastrado na lista de usuários permitidos
- O sistema verifica automaticamente se você tem acesso

## 2. Completar o Onboarding
Na primeira vez que entrar, você verá uma tela de configuração:

### Passo 1: Escolher Template de Negócio
- Selecione um modelo que se pareça com seu negócio
- Ou escolha "Personalizado" para criar do zero
- Exemplos: "Um negócio igual o ChatGPT", "Consultor Digital", "Coach Online"

### Passo 2: Personalizar (se necessário)
- Se escolheu "Personalizado", preencha:
  - Profissão/Área
  - Habilidade Principal
  - Oferta Atual

### Passo 3: Escolher Estilo de Resposta
- **Direto e Objetivo**: Respostas curtas e diretas
- **Amigável e Próximo**: Tom conversacional
- **Profissional e Técnico**: Linguagem formal
- **Motivacional**: Tom energético
- **Educativo**: Explicações detalhadas

### Passo 4: Observações (Opcional)
- Digite como você quer ser respondido
- Ex: "Prefiro respostas curtas", "Sempre me dê exemplos práticos"

## 3. Selecionar um Agente
- Na tela principal, escolha um agente da grade
- Cada agente tem uma especialidade diferente
- Clique no card do agente para começar a conversar

## 4. Começar a Conversar
- Digite sua mensagem na caixa de texto
- A LIA usará o contexto do onboarding para personalizar as respostas
- Você pode anexar imagens clicando no ícone de imagem
    `,
    steps: [
      'Fazer login com email cadastrado',
      'Completar onboarding (primeira vez)',
      'Selecionar agente na tela principal',
      'Começar conversa sobre seu negócio',
      'Receber sugestões personalizadas'
    ]
  },
  {
    id: 'metodo-erl',
    title: 'Como Usar o Método ERL',
    description: 'Criar produto, funil e conteúdo em 15-20 minutos',
    icon: '📊',
    content: `
# Método ERL - Guia Completo

## O que é o Método ERL?

**E**ntrada → **R**elacionamento → **L**ucro

Um sistema simples para criar produtos digitais e funis de venda.

## Como Funciona no App

### Bloco 1: Diagnóstico Rápido
A LIA faz perguntas mínimas e essenciais:
- Qual sua profissão/área?
- O que você já oferece?
- Qual seu público-alvo?

**Dica**: Se você completou o onboarding, a LIA já tem essas informações!

### Bloco 2: Produto Principal
A LIA sugere 3 opções de produto baseadas no seu contexto:
- Produtos digitais (cursos, ebooks, templates)
- Serviços (consultoria, mentoria, coaching)
- Híbridos (programa + comunidade)

**Exemplo de resposta da LIA**:
"Baseado no seu perfil, sugiro estas 3 opções:
1. Curso Online de [tema]
2. Mentoria em Grupo
3. Consultoria 1:1"

### Bloco 3: Funil URL
A LIA cria um mapa completo do funil:

**ENTRADA** (Como atrair):
- Conteúdo gratuito
- Desafio de 7 dias
- Webinar gratuito

**RELACIONAMENTO** (Como nutrir):
- Email marketing
- Grupo no WhatsApp/Telegram
- Lives semanais

**LUCRO** (Como vender):
- Oferta principal
- Upsells e downsells
- Comunidade premium

### Bloco 4: Plano de Conteúdo
A LIA monta um plano de 7 dias:
- Dia 1: Post sobre problema
- Dia 2: Storytelling pessoal
- Dia 3: Dica prática
- E assim por diante...

## Dicas para Melhores Resultados

1. **Seja específico**: Quanto mais detalhes, melhor a sugestão
2. **Use o contexto**: A LIA lembra do onboarding
3. **Peça ajustes**: "E se fosse um curso gravado?" funciona
4. **Exporte**: Salve o plano em Markdown ou PDF
    `
  },
  {
    id: 'modo-copywriter',
    title: 'Modo Copywriter',
    description: 'Análise completa de copywriting profissional',
    icon: '✍️',
    content: `
# Modo Copywriter - Guia Completo

## O que é o Modo Copywriter?

Análise profissional de copywriting seguindo 10 passos estruturados.

## Como Ativar

### Opção 1: Botão na Interface
- Clique no botão "✍️ Copywriter" na barra de ferramentas
- O botão fica azul quando ativo

### Opção 2: Palavras-chave
Envie mensagens com:
- "copy"
- "roteiro"
- "vídeo viral"
- "texto de venda"
- "copywriting"

A LIA detecta automaticamente e ativa o modo.

## Os 10 Passos do Copywriter

### Passo 1: Análise do Público-Alvo
- Desejos, dores, medos, sonhos
- Nível de consciência (inconsciente, problema, solução, produto)

### Passo 2: Estrutura de Copy
- Fórmula escolhida (AIDA, StoryBrand, etc.)
- Justificativa da escolha

### Passo 3: Promessa Única
- Promessa clara e específica
- Benefício emocional
- Diferencial
- Mecanismo

### Passo 4: Funil de Conteúdo
- Atração (viral)
- Aquecimento
- Conversão

### Passo 5: Roteiros de Vídeos Virais
- Gancho (3 segundos)
- Contexto
- Desenvolvimento
- CTA

### Passo 6: Conteúdo UGC
- Estratégias de conteúdo gerado pelo usuário

### Passo 7: Textos de Vendas
- VSL, Landing Page, Email, Anúncio
- Texto completo pronto para usar

### Passo 8: Ideias Complementares
- Séries de vídeos
- Sequência de emails
- Anúncios
- Remarketing

### Passo 9: Títulos e CTAs Testáveis
- Múltiplas variações
- Ângulos diferentes

### Passo 10: Linguagem Adaptada
- Tom de voz
- Vocabulário
- Adaptações por canal

## Como Usar os Resultados

1. **Exporte seções**: Cada seção tem botão de exportar
2. **Copie textos**: Use diretamente nos seus materiais
3. **Teste variações**: Use os títulos e CTAs testáveis
4. **Adapte**: Ajuste para seu tom de voz

## Exemplo de Uso

**Você**: "Quero criar um curso de marketing digital"

**LIA (Modo Copywriter)**: 
Gera análise completa com:
- Público-alvo definido
- Estrutura de copy (ex: AIDA)
- Promessa única
- 3 roteiros de vídeo
- Textos de venda prontos
- 10 títulos testáveis

**Você pode**: Exportar tudo e usar imediatamente!
    `
  },
  {
    id: 'recursos-avancados',
    title: 'Recursos Avançados',
    description: 'Análise, exportação, histórico e mais',
    icon: '⚙️',
    content: `
# Recursos Avançados

## Análise de Conversa

### Como Acessar
- Clique no botão "Análise" na barra de ferramentas
- Aparece um painel com informações

### O que Mostra
- **Progresso**: Porcentagem de conclusão
- **Etapa Atual**: Onde você está no processo
- **Blocos Completados**: 
  - ✓ Diagnóstico
  - ✓ Produto
  - ✓ Funil URL
  - ✓ Conteúdo
- **Próximos Passos**: Sugestões do que fazer
- **Alertas**: Avisos importantes

## Exportação

### Formatos Disponíveis
1. **Markdown (.md)**: Para documentação
2. **JSON**: Para integração com outras ferramentas
3. **PDF (TXT)**: Para impressão ou compartilhamento

### Como Exportar
- Clique no botão "Exportar"
- Escolha o formato
- O arquivo será baixado automaticamente

### O que é Exportado
- Todas as mensagens da conversa
- Timestamps
- Formatação preservada

## Histórico

### Acessar Histórico
- Na sidebar, veja as últimas 8 conversas
- Clique em uma para abrir
- Use "Carregar mais" para ver mais

### Organização
- Agrupado por sessão
- Data e resumo visíveis
- Busca rápida

## Tema Escuro/Claro

### Como Alternar
- Clique no ícone 🌙/☀️ no header
- Preferência é salva automaticamente
- Aplica-se a toda a interface

## Anexar Imagens

### Como Fazer
- Clique no ícone de imagem na caixa de texto
- Selecione uma imagem
- Descreva o que quer fazer com ela

### Casos de Uso
- Análise de imagens
- Edição de imagens (via IA)
- Geração de conteúdo visual

## Personalização

### Estilo de Resposta
Configure no onboarding:
- Direto: Respostas curtas
- Amigável: Tom conversacional
- Profissional: Linguagem formal
- Motivacional: Tom energético
- Educativo: Explicações detalhadas

### Observações
Adicione no onboarding:
- "Prefiro respostas curtas"
- "Sempre me dê exemplos práticos"
- "Fale como se eu fosse iniciante"

A LIA seguirá essas preferências!
    `
  },
  {
    id: 'troubleshooting',
    title: 'Solução de Problemas',
    description: 'Resolva erros comuns',
    icon: '🔧',
    content: `
# Solução de Problemas

## Erro de Autenticação

### Problema
"Erro de autenticação. Verifique a chave da API."

### Solução
1. Verifique se o arquivo .env.local existe na raiz do projeto
2. Confirme que contém: GEMINI_API_KEY=sua_chave_aqui
3. Reinicie o servidor: npm run dev
4. Verifique se a chave está válida e tem créditos

## Erro 400 da API

### Problema
Requisições retornando erro 400.

### Soluções
- Verifique se a chave da API está correta
- Confirme que o modelo está disponível na sua conta
- Verifique os logs no console do navegador
- Tente novamente após alguns segundos

## Histórico Não Carrega

### Problema
Conversas anteriores não aparecem.

### Solução
- Verifique se está logado com o mesmo email
- O histórico é salvo por usuário
- Limpe o cache do navegador se necessário

## Onboarding Não Aparece

### Problema
Não vejo a tela de onboarding.

### Solução
- Delete o item no localStorage: erl_lia_onboarding_[seu_email]
- Recarregue a página
- O onboarding aparecerá novamente

## Tema Não Alterna

### Problema
Botão de tema não funciona.

### Solução
- Verifique se o JavaScript está habilitado
- Recarregue a página
- Limpe o cache do navegador

## Exportação Não Funciona

### Problema
Arquivo não é baixado.

### Solução
- Verifique as permissões de download do navegador
- Tente outro formato
- Verifique se há mensagens na conversa

## LIA Não Responde

### Problema
A IA não está respondendo.

### Solução
- Verifique sua conexão com internet
- Confirme que a chave da API está configurada
- Veja os logs no console (F12)
- Tente novamente após alguns segundos
    `
  }
];

