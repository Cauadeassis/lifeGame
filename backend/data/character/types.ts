export interface Stats {
  health: number;
  mentalHealth: number;
  intellect: number;
  beauty: number;
}

export interface Income {
  id: "poor" | "middle" | "rich";
  label: string;
}

export interface SkinTone {
  id: "black" | "middleTone" | "white";
  label: string;
  color?: string;
}

export interface Gender {
  id: GenderId;
  label: "masculino" | "feminino";
  pronoun: "ele" | "ela";
  possessive: "meu" | "minha";
  article: "um" | "uma";
  identity: "homem" | "mulher";
}

interface NamesData {
  male: string[];
  female: string[];
  last: string[];
}

export interface NamesByLanguage {
  [language: string]: NamesData;
}

export type Demonym = {
  male: string;
  female: string;
};

export interface CountryData {
  name: string;
  language: string;
  preposition: string;
  demonym: Demonym;
  cities: string[];
  landmarks: string[];
}

export interface Countries {
  [countryCode: string]: CountryData;
}

export interface Character {
  firstName: string;
  lastName: string;
  demonym: string;
  countryCode: string;
  countryData: CountryData;
  gender: Gender;
  skinTone: SkinTone;
  income: Income;
  stats: Stats;
}
export type Relevance = "medium" | "high" | "critical";
export type GenderId = "male" | "female";
export type Quantity = "singular" | "plural";
export interface BodyPart {
  id: string;
  name: string;
  grammaticalGender: GenderId;
  quantity: Quantity;
  relevance: Relevance;
  canBeLost: boolean;
  beauty: number;
}
