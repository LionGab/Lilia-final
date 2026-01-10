import { GoogleGenAI } from '@google/genai';
import { AI_CONFIG } from '../constants/aiConfig';
import { 
  AvatarData, 
  OfferData, 
  PromiseData, 
  ProductData, 
  ScriptData,
  OfferCreatorResult,
  RefinementRequest
} from '../types/offerCreator';
import { logger } from './logger';

// Obter API key do ambiente
const getApiKey = (): string => {
  const apiKey =
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.VITE_API_KEY ||
    '';
  return apiKey.trim();
};

// Lazy initialization
let aiInstance: GoogleGenAI | null = null;
const getAI = (): GoogleGenAI => {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: getApiKey() });
  }
  return aiInstance;
};

const GEMINI_MODEL = AI_CONFIG.models.default;

export async function generateAvatar(userInput: string): Promise<AvatarData> {
  const prompt = `Você é um especialista em copywriting e definição de avatares para marketing digital.

Com base nas informações fornecidas pelo usuário, crie um avatar detalhado e completo.

INFORMAÇÕES DO USUÁRIO:
${userInput}

Retorne APENAS um JSON válido com a seguinte estrutura (sem markdown, sem explicações):
{
  "name": "Nome fictício representativo",
  "age": "Faixa etária",
  "gender": "Gênero predominante",
  "profession": "Profissão ou ocupação",
  "income": "Faixa de renda",
  "location": "Localização geográfica típica",
  "mainPains": ["Dor 1", "Dor 2", "Dor 3", "Dor 4", "Dor 5"],
  "desires": ["Desejo 1", "Desejo 2", "Desejo 3", "Desejo 4", "Desejo 5"],
  "fears": ["Medo 1", "Medo 2", "Medo 3"],
  "objections": ["Objeção 1", "Objeção 2", "Objeção 3", "Objeção 4"],
  "whereTheyAre": "Onde esse avatar passa tempo online",
  "dailyRoutine": "Descrição da rotina diária",
  "buyingBehavior": "Comportamento de compra típico"
}`;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    
    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON não encontrado na resposta');
    
    return JSON.parse(jsonMatch[0]) as AvatarData;
  } catch (error) {
    logger.error('Erro ao gerar avatar', error);
    throw error;
  }
}

export async function generateOffer(avatarData: AvatarData, userInput: string): Promise<OfferData> {
  const prompt = `Você é um especialista em criação de ofertas irresistíveis.

AVATAR DO CLIENTE:
${JSON.stringify(avatarData, null, 2)}

INFORMAÇÕES ADICIONAIS DO USUÁRIO:
${userInput}

Com base no avatar e nas informações, crie uma oferta poderosa.

Retorne APENAS um JSON válido com a seguinte estrutura (sem markdown, sem explicações):
{
  "productName": "Nome do produto/serviço",
  "productType": "Tipo (curso, mentoria, serviço, etc)",
  "price": "Faixa de preço sugerida",
  "mainBenefit": "Benefício principal que resolve a dor do avatar",
  "uniqueMechanism": "Mecanismo único que diferencia sua oferta",
  "guarantee": "Tipo de garantia oferecida",
  "bonuses": ["Bônus 1", "Bônus 2", "Bônus 3"],
  "urgency": "Elemento de urgência",
  "scarcity": "Elemento de escassez"
}`;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    
    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON não encontrado na resposta');
    
    return JSON.parse(jsonMatch[0]) as OfferData;
  } catch (error) {
    logger.error('Erro ao gerar oferta', error);
    throw error;
  }
}

export async function generatePromise(avatarData: AvatarData, offerData: OfferData): Promise<PromiseData> {
  const prompt = `Você é um especialista em copywriting e promessas de marketing.

AVATAR DO CLIENTE:
${JSON.stringify(avatarData, null, 2)}

OFERTA:
${JSON.stringify(offerData, null, 2)}

Crie uma promessa poderosa que conecte o avatar com a oferta.

Retorne APENAS um JSON válido com a seguinte estrutura (sem markdown, sem explicações):
{
  "mainPromise": "A promessa principal clara e específica",
  "transformation": "A transformação que o cliente vai experimentar",
  "timeframe": "Em quanto tempo verá resultados",
  "proof": "Tipo de prova que sustenta a promessa",
  "targetResult": "O resultado específico que o cliente alcançará"
}`;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    
    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON não encontrado na resposta');
    
    return JSON.parse(jsonMatch[0]) as PromiseData;
  } catch (error) {
    logger.error('Erro ao gerar promessa', error);
    throw error;
  }
}

export async function generateProduct(
  avatarData: AvatarData, 
  offerData: OfferData, 
  promiseData: PromiseData,
  userInput: string
): Promise<ProductData> {
  const prompt = `Você é um especialista em criação de produtos digitais e estruturação de ofertas.

AVATAR DO CLIENTE:
${JSON.stringify(avatarData, null, 2)}

OFERTA:
${JSON.stringify(offerData, null, 2)}

PROMESSA:
${JSON.stringify(promiseData, null, 2)}

INFORMAÇÕES ADICIONAIS:
${userInput}

Crie a estrutura do produto que entregará a promessa.

Retorne APENAS um JSON válido com a seguinte estrutura (sem markdown, sem explicações):
{
  "name": "Nome final do produto",
  "format": "Formato do produto (curso online, mentoria, ebook, etc)",
  "modules": ["Módulo 1: Descrição", "Módulo 2: Descrição", "Módulo 3: Descrição", "Módulo 4: Descrição"],
  "deliverables": ["Entregável 1", "Entregável 2", "Entregável 3"],
  "support": "Tipo de suporte oferecido",
  "duration": "Duração do acesso/programa",
  "accessType": "Tipo de acesso (vitalício, anual, etc)"
}`;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    
    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON não encontrado na resposta');
    
    return JSON.parse(jsonMatch[0]) as ProductData;
  } catch (error) {
    logger.error('Erro ao gerar produto', error);
    throw error;
  }
}

export async function generateScripts(
  avatarData: AvatarData, 
  offerData: OfferData, 
  promiseData: PromiseData,
  productData: ProductData
): Promise<ScriptData> {
  const prompt = `Você é um copywriter expert em VSL, emails e anúncios de alta conversão.

AVATAR DO CLIENTE:
${JSON.stringify(avatarData, null, 2)}

OFERTA:
${JSON.stringify(offerData, null, 2)}

PROMESSA:
${JSON.stringify(promiseData, null, 2)}

PRODUTO:
${JSON.stringify(productData, null, 2)}

Crie roteiros de vendas completos para esse produto.

Retorne APENAS um JSON válido com a seguinte estrutura (sem markdown, sem explicações):
{
  "vslScript": "Roteiro completo para VSL de 5-10 minutos com: gancho, problema, agitação, solução, prova, oferta, CTA",
  "emailSequence": [
    "Email 1: Assunto - Abertura com gancho",
    "Email 2: Assunto - Dor e agitação",
    "Email 3: Assunto - Apresentação da solução",
    "Email 4: Assunto - Prova social e depoimentos",
    "Email 5: Assunto - Oferta e urgência",
    "Email 6: Assunto - Último dia",
    "Email 7: Assunto - Última chance"
  ],
  "adCopy": "Copy completa para anúncio de Facebook/Instagram",
  "landingPageCopy": "Estrutura completa da landing page: headline, subheadline, bullet points, CTA, FAQ",
  "socialProof": "Estrutura de depoimentos e provas sociais a coletar"
}`;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    
    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON não encontrado na resposta');
    
    return JSON.parse(jsonMatch[0]) as ScriptData;
  } catch (error) {
    logger.error('Erro ao gerar roteiros', error);
    throw error;
  }
}

export async function refineContent(request: RefinementRequest): Promise<string> {
  const prompt = `Você é um especialista em copywriting e marketing digital.

SEÇÃO A REFINAR: ${request.section}

CONTEÚDO ATUAL:
${request.currentContent}

INSTRUÇÃO DE REFINAMENTO DO USUÁRIO:
${request.refinementInstruction}

Refine o conteúdo conforme solicitado, mantendo a estrutura e formato original.
Retorne APENAS o conteúdo refinado, sem explicações adicionais.`;

  try {
    const response = await getAI().models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    
    return response.text || '';
  } catch (error) {
    logger.error('Erro ao refinar conteúdo', error);
    throw error;
  }
}

export function saveOfferCreatorResult(email: string, result: OfferCreatorResult): void {
  const key = `erl_lia_offer_creator_${email}`;
  const existing = localStorage.getItem(key);
  const results = existing ? JSON.parse(existing) : [];
  results.push(result);
  localStorage.setItem(key, JSON.stringify(results));
}

export function getOfferCreatorResults(email: string): OfferCreatorResult[] {
  const key = `erl_lia_offer_creator_${email}`;
  const existing = localStorage.getItem(key);
  return existing ? JSON.parse(existing) : [];
}
