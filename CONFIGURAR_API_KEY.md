# ⚠️ CONFIGURAR CHAVE DA API NO NETLIFY

## Erro: "Chave da API Gemini não encontrada"

Se você está vendo este erro em produção, você precisa configurar a variável de ambiente no Netlify.

## Como Configurar (Passo a Passo)

### 1. Acesse o Netlify Dashboard

- Vá para: https://app.netlify.com
- Faça login na sua conta

### 2. Selecione seu Site

- Clique no site: **nathaliavalentegit** (ou o nome do seu site)

### 3. Vá para Environment Variables

- No menu lateral, clique em **Site settings**
- Role para baixo até encontrar **Environment variables**
- Clique em **Add a variable**

### 4. Adicione a Variável

- **Key**: `GEMINI_API_KEY`
- **Value**: Cole sua chave da API Gemini aqui
- **Scopes**: Marque TODAS as opções:
  - ✅ Production
  - ✅ Deploy previews
  - ✅ Branch deploys

### 5. Salve e Faça Novo Deploy

- Clique em **Save**
- Vá para **Deploys** no menu
- Clique em **Trigger deploy** → **Deploy site**

## Verificar se Está Configurado

1. Vá em **Site settings** → **Environment variables**
2. Você deve ver `GEMINI_API_KEY` na lista
3. Se não estiver, adicione seguindo os passos acima

## Importante

⚠️ **A variável precisa ser configurada ANTES de fazer o deploy**

⚠️ **Se você já fez deploy sem a variável, precisa fazer um novo deploy após configurar**

## Link Direto

Acesse diretamente: https://app.netlify.com/sites/nathaliavalentegit/configuration/env

## Suporte

Se ainda tiver problemas:

1. Verifique se a chave está correta (sem espaços extras)
2. Certifique-se de que salvou a variável
3. Faça um novo deploy após configurar
4. Verifique os logs de build no Netlify
