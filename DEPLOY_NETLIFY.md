# Deploy no Netlify - Funil ERL

## Passo a Passo para Deploy

### 1. Preparação

1. Certifique-se de que o projeto está funcionando localmente:

   ```bash
   npm install
   npm run build
   ```

2. Verifique se o arquivo `netlify.toml` está na raiz do projeto (já criado)

### 2. Configurar Variáveis de Ambiente no Netlify

**IMPORTANTE**: Você precisa configurar a variável de ambiente `GEMINI_API_KEY` no Netlify:

1. Acesse o [Netlify Dashboard](https://app.netlify.com)
2. Vá em **Site settings** → **Environment variables**
3. Adicione:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Sua chave da API Gemini
   - **Scopes**: Production, Deploy previews, Branch deploys

### 3. Deploy via Netlify CLI (Recomendado)

#### Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

#### Login no Netlify

```bash
netlify login
```

#### Deploy

```bash
# Deploy inicial (cria site)
netlify deploy --prod

# Ou deploy de preview (teste antes)
netlify deploy
```

### 4. Deploy via Git (Recomendado para Produção)

1. **Conecte seu repositório Git:**

   - Acesse [Netlify](https://app.netlify.com)
   - Clique em **Add new site** → **Import an existing project**
   - Conecte com GitHub/GitLab/Bitbucket
   - Selecione o repositório

2. **Configure o build:**

   - Build command: `npm run build`
   - Publish directory: `dist`
   - (Já configurado no `netlify.toml`)

3. **Adicione variáveis de ambiente:**

   - Site settings → Environment variables
   - Adicione `GEMINI_API_KEY` com sua chave

4. **Deploy automático:**
   - O Netlify fará deploy automaticamente a cada push na branch principal

### 5. Deploy via Drag & Drop

1. Execute o build localmente:

   ```bash
   npm run build
   ```

2. Acesse [Netlify Drop](https://app.netlify.com/drop)

3. Arraste a pasta `dist` para a área de deploy

4. **IMPORTANTE**: Configure a variável de ambiente:
   - Site settings → Environment variables
   - Adicione `GEMINI_API_KEY`

### 6. Verificações Pós-Deploy

Após o deploy, verifique:

- ✅ Site está acessível
- ✅ Login funciona
- ✅ Chat com LIA funciona (verifique se `GEMINI_API_KEY` está configurada)
- ✅ Tema claro/escuro funciona
- ✅ Tutoriais e Indicações carregam

### 7. Troubleshooting

#### Erro: "GEMINI_API_KEY not found"

- Verifique se a variável está configurada no Netlify
- Certifique-se de que está no escopo correto (Production)

#### Erro: "Build failed"

- Verifique os logs no Netlify
- Teste o build localmente: `npm run build`

#### Erro: "404 on routes"

- Verifique se o `netlify.toml` tem o redirect configurado
- O redirect `/*` → `/index.html` é necessário para SPAs

### 8. Domínio Customizado (Opcional)

1. Site settings → Domain management
2. Add custom domain
3. Siga as instruções para configurar DNS

## Estrutura do netlify.toml

O arquivo `netlify.toml` já está configurado com:

- ✅ Build command e publish directory
- ✅ Redirects para SPA
- ✅ Headers de segurança
- ✅ Cache otimizado para assets

## Notas Importantes

⚠️ **NUNCA** commite o arquivo `.env.local` com a chave da API no Git!

✅ Use variáveis de ambiente do Netlify para chaves sensíveis

✅ O arquivo `.env.local` está no `.gitignore` por padrão

## Suporte

Se tiver problemas:

1. Verifique os logs de build no Netlify Dashboard
2. Teste localmente primeiro: `npm run build && npm run preview`
3. Verifique se todas as variáveis de ambiente estão configuradas
