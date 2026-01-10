export interface AvatarData {
  name: string;
  age: string;
  gender: string;
  profession: string;
  income: string;
  location: string;
  mainPains: string[];
  desires: string[];
  fears: string[];
  objections: string[];
  whereTheyAre: string; // onde esse avatar está (redes sociais, etc)
  dailyRoutine: string;
  buyingBehavior: string;
}

export interface OfferData {
  productName: string;
  productType: string;
  price: string;
  mainBenefit: string;
  uniqueMechanism: string;
  guarantee: string;
  bonuses: string[];
  urgency: string;
  scarcity: string;
}

export interface PromiseData {
  mainPromise: string;
  transformation: string;
  timeframe: string;
  proof: string;
  targetResult: string;
}

export interface ProductData {
  name: string;
  format: string; // curso, mentoria, ebook, serviço, produto físico
  modules: string[];
  deliverables: string[];
  support: string;
  duration: string;
  accessType: string;
}

export interface ScriptData {
  vslScript: string;
  emailSequence: string[];
  adCopy: string;
  landingPageCopy: string;
  socialProof: string;
}

export interface OfferCreatorResult {
  avatar: AvatarData;
  offer: OfferData;
  promise: PromiseData;
  product: ProductData;
  scripts: ScriptData;
  generatedAt: number;
}

export type OfferCreatorStep = 'avatar' | 'offer' | 'promise' | 'product' | 'scripts' | 'result';

export interface RefinementRequest {
  section: 'avatar' | 'offer' | 'promise' | 'product' | 'scripts';
  currentContent: string;
  refinementInstruction: string;
}
