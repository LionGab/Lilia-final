# Guia de Deploy no Netlify - Variáveis de Ambiente

## 🚀 Configuração Rápida

### Passo 1: Acessar o Netlify Dashboard

1. Acesse: https://app.netlify.com
2. Faça login na sua conta
3. Selecione o site do projeto

### Passo 2: Configurar Variáveis de Ambiente

1. **Navegue até:**

   ```
   Site settings → Environment variables → Add a variable
   ```

2. **Adicione cada variável uma por uma:**

   #### Variável 1: Supabase URL

   ```
   Key: VITE_SUPABASE_URL
   Value: https://bbcwitnbnosyfpfjtzkr.supabase.co
   Scopes: All scopes (ou Production, Branch deploys, Deploy previews conforme necessário)
   ```

   #### Variável 2: Supabase Anon Key

   ```
   Key: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiY3dpdG5ibm9zeWZwZmp0emtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODI3NjgsImV4cCI6MjA3NTg1ODc2OH0.a9g_JqrWWnLli_PV0sPikz8KPAWiKY81mQ1hJAbNtCo
   Scopes: All scopes
   ```

   #### Variável 3: Gemini API Key (OBRIGATÓRIA)

   ```
   Key: VITE_GEMINI_API_KEY
   Value: AIzaSyBqvUzQii-4acuFTK2SLfcY5hxthKc8TQU
   Scopes: All scopes
   ```

3. **Salve cada variável** clicando em "Save"

### Passo 3: Reimplantar o Site

Após adicionar todas as variáveis:

1. **Opção A - Deploy Manual:**
   - Site overview → Deploys → Trigger deploy → Deploy site

2. **Opção B - Deploy via Git:**
   - Faça um novo commit e push para o branch conectado
   - O Netlify fará deploy automático

### Passo 4: Verificar se Funcionou

1. Acesse os logs do deploy:
   - Site overview → Deploys → Clique no deploy mais recente → View build log

2. Procure por mensagens de sucesso no build

3. Teste o site em produção para confirmar que as APIs estão funcionando

## 📋 Checklist

- [ ] Todas as 3 variáveis foram adicionadas no Netlify Dashboard
- [ ] Variáveis estão configuradas para o escopo correto (All scopes ou específico)
- [ ] Site foi reimplantado após adicionar as variáveis
- [ ] Deploy foi bem-sucedido (verificar logs)
- [ ] Site em produção está funcionando corretamente

## ⚠️ Segurança

- ✅ **NUNCA** adicione variáveis de ambiente no arquivo `netlify.toml` (é versionado)
- ✅ **SEMPRE** use o Netlify Dashboard para variáveis sensíveis
- ✅ Verifique se o arquivo `.gitignore` está protegendo `.env.local`
- ✅ Use diferentes chaves para desenvolvimento e produção quando possível

## 🔧 Troubleshooting

**Problema: Variáveis não estão disponíveis no site**

- Verifique se o deploy foi feito APÓS adicionar as variáveis
- Confirme que as variáveis estão no escopo correto (All scopes)
- Verifique os logs do deploy para erros

**Problema: Build falhou**

- Verifique se todas as variáveis obrigatórias estão configuradas
- Confirme que os valores estão corretos (sem espaços extras)
- Verifique os logs do build para detalhes do erro

## 📚 Recursos

- [Netlify Environment Variables Docs](https://docs.netlify.com/environment-variables/overview/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
