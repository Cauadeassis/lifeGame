import Genders from "./genders.json"
import Incomes from "./incomes"

export interface Stats {
  health: number;
  mentalHealth: number;
  intellect: number;
  beauty: number;
}

export type Income = Record<GenderId, IncomeData[]>

export interface SkinToneData {
  id: "black" | "middleTone" | "white";
  label: string;
  color?: string;
}
export type SkinTone = Record<GenderId, SkinToneData[]>
export type IncomeData = (typeof Incomes)[number];
export type Gender = (typeof Genders)[number];
export type GenderId = Gender["id"];
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

export interface Character extends Identity, CharacterActivities {
  countryCode: string;
  countryData: CountryData;
  skinTone: SkinTone;
  income: Income;
  stats: Stats;
  age: number;
}

export interface Identity {
  firstName: string;
  lastName: string;
  demonym: string;
  gender: Gender;
}

export interface CharacterActivities {
  academic?: string;
  career?: string;
  freelance?: string;
}

export type Relevance = "medium" | "high" | "critical";
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
