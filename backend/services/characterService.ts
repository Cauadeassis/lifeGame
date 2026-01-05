import { fileURLToPath } from "url";
import path from "path";
import { loadJSON, getRandomItem, generateRandomStats } from "./utilities";
import {
  Character,
  Income,
  SkinTone,
  Gender,
  NamesByLanguage,
  Countries,
  CountryData,
} from "../data/character/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GetRandomNameParameters {
  language: string;
  genderId: "male" | "female";
}

interface GenerateRandomCharacterParameters {
  lastName?: string;
  genderId?: Gender["id"];
  skinTone?: SkinTone;
  income?: Income;
  countryCode?: string;
  demonym?: string;
}

export class CharacterService {
  private dataPath: string;
  private genders!: Gender[];
  private skinTones!: Record<string, SkinTone[]>;
  private incomes!: Record<string, Income[]>;
  private namesByLanguage!: NamesByLanguage;
  private countries!: Countries;

  constructor() {
    this.dataPath = path.join(__dirname, "..", "data");
    this.loadData();
  }

  private loadData(): void {
    try {
      this.genders = loadJSON(this.dataPath, "character", "genders.json");
      this.skinTones = loadJSON(this.dataPath, "character", "skinTones.json");
      this.incomes = loadJSON(this.dataPath, "character", "incomes.json");
      this.namesByLanguage = loadJSON(
        this.dataPath,
        "character",
        "namesByLanguage.json",
      );
      this.countries = loadJSON(this.dataPath, "character", "countries.json");
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      throw new Error("Failed to load character data");
    }
  }

  private getRandomCountry(): string {
    const countryCodes = Object.keys(this.countries);
    return getRandomItem(countryCodes);
  }

  private getNames(language: string) {
    const names = this.namesByLanguage[language];
    if (!names) throw new Error(`Names not found for ${language}`);
    return names;
  }

  private getRandomFirstName({ language, genderId }: GetRandomNameParameters) {
    const names = this.getNames(language);
    return getRandomItem(names[genderId]);
  }

  private getRandomLastName(language: string) {
    const names = this.getNames(language);
    return getRandomItem(names.last);
  }

  private getGender(genderId?: Gender["id"]): Gender {
    if (genderId) {
      const gender = this.genders.find((gender) => gender.id === genderId);
      if (!gender) throw new Error(`Invalid genderId: ${genderId}`);
      return gender;
    }
    return getRandomItem(this.genders);
  }
  public generateRandomCharacter(
    params: GenerateRandomCharacterParameters = {},
  ): Character {
    const gender = this.getGender(params.genderId);
    const genderId = gender.id;

    const skinTone = params.skinTone ?? getRandomItem(this.skinTones[genderId]);
    const income = params.income ?? getRandomItem(this.incomes[genderId]);

    const countryCode = params.countryCode ?? this.getRandomCountry();
    const countryData = this.countries[countryCode] as CountryData;
    if (!countryData)
      throw new Error(`"${countryCode}" is an invalid country code!`);
    const language = countryData.language;

    const firstName = this.getRandomFirstName({ language, genderId });
    const lastName = params.lastName ?? this.getRandomLastName(language);

    const demonym = params.demonym ?? countryData.demonym[genderId];
    const statsArray = generateRandomStats();

    return {
      firstName,
      lastName,
      demonym,
      countryCode,
      countryData,
      gender,
      skinTone,
      income,
      stats: {
        health: statsArray[0],
        mentalHealth: statsArray[1],
        intellect: statsArray[2],
        beauty: statsArray[3],
      },
    };
  }

  public generateFather(character: Character): Character {
    return this.generateRandomCharacter({
      genderId: "male",
      lastName: character.lastName,
      skinTone: character.skinTone,
      income: character.income,
      countryCode: character.countryCode,
      demonym: character.demonym,
    });
  }

  public generateMother(character: Character): Character {
    return this.generateRandomCharacter({
      genderId: "female",
      lastName: character.lastName,
      skinTone: character.skinTone,
      income: character.income,
      countryCode: character.countryCode,
      demonym: character.demonym,
    });
  }

  public generateClassmate(character: Character): Character {
    return this.generateRandomCharacter({
      income: character.income,
      countryCode: character.countryCode,
      demonym: character.demonym,
    });
  }
  public generateChild(character: Character): Character {
    return this.generateRandomCharacter({
      lastName: character.lastName,
      skinTone: character.skinTone,
      income: character.income,
      countryCode: character.countryCode,
      demonym: character.demonym,
    });
  }
}

export default CharacterService;
