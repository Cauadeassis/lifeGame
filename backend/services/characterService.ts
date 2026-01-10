import { getRandomItem, generateRandomStats } from "./utilities";
import {
  Character,
  Income,
  SkinTone,
  Gender,
  GenderId,
  NamesByLanguage,
  Countries,
  CountryData,
  Stats,
} from "../data/character/types";

import rawGenders from "../data/character/genders.json";
import rawSkinTones from "../data/character/skinTones.json";
import rawIncomes from "../data/character/incomes";
import rawNamesByLanguage from "../data/character/namesByLanguage.json";
import rawCountries from "../data/character/countries.json";

import JobService from "./jobService";

interface GetRandomFirstNameProps {
  language: string;
  genderId: GenderId,
}

export class PlayerGenerator {
  protected genders: Gender[];
  protected skinTonesByGenderId: Record<string, SkinTone[]>;
  protected incomesByGenderId: Record<string, Income[]>;
  protected namesByLanguage: NamesByLanguage;
  protected countriesByCode: Countries;

  constructor() {
    this.genders = rawGenders as Gender[];
    this.skinTonesByGenderId = rawSkinTones as Record<string, SkinTone[]>;
    this.incomesByGenderId = rawIncomes as Record<string, Income[]>;
    this.namesByLanguage = rawNamesByLanguage as NamesByLanguage;
    this.countriesByCode = rawCountries as Countries;
  }

  protected getRandomCountryCode(): string {
    const availableCountryCodes = Object.keys(this.countriesByCode);
    return getRandomItem(availableCountryCodes);
  }

  protected getCountryDataByCode(countryCode: string): CountryData {
    const countryData = this.countriesByCode[countryCode] as CountryData;
    
    if (!countryData) {
      throw new Error(`"${countryCode}" is an invalid country code!`);
    }
    
    return countryData;
  }

  protected getNamesByLanguage(language: string) {
    const namesForLanguage = this.namesByLanguage[language];
    
    if (!namesForLanguage) {
      throw new Error(`Names not found for language: ${language}`);
    }
    
    return namesForLanguage;
  }

  protected getRandomFirstName(parameters: GetRandomFirstNameProps): string {
    const namesForLanguage = this.getNamesByLanguage(parameters.language);
    const firstNamesByGenderId = namesForLanguage[parameters.genderId];
    
    return getRandomItem(firstNamesByGenderId);
  }

  protected getRandomLastName(language: string): string {
    const namesForLanguage = this.getNamesByLanguage(language);
    const availableLastNames = namesForLanguage.last;
    
    return getRandomItem(availableLastNames);
  }

  protected getRandomGender(): Gender {
    return getRandomItem(this.genders);
  }

  protected getGenderById(genderId: GenderId): Gender {
    const foundGender = this.genders.find((currentGender) => {
      return currentGender.id === genderId;
    });
    
    if (!foundGender) {
      throw new Error(`Invalid genderId: ${genderId}`);
    }
    
    return foundGender;
  }

  protected getRandomSkinToneByGenderId(genderId: GenderId): SkinTone {
    const skinTonesForGenderId = this.skinTonesByGenderId[genderId];
    return getRandomItem(skinTonesForGenderId);
  }

  protected getRandomIncomeByGenderId(genderId: GenderId): Income {
    const incomesForGenderId = this.incomesByGenderId[genderId];
    return getRandomItem(incomesForGenderId);
  }

  protected generateRandomStats(): Stats {
    const randomStatsArray = generateRandomStats();
    
    return {
      health: randomStatsArray[0],
      mentalHealth: randomStatsArray[1],
      intellect: randomStatsArray[2],
      beauty: randomStatsArray[3],
    };
  }

  public generateRandomPlayer(): Character {
    const selectedGender = this.getRandomGender();
    const selectedGenderId = selectedGender.id;

    const selectedCountryCode = this.getRandomCountryCode();
    const selectedCountryData = this.getCountryDataByCode(selectedCountryCode);
    const selectedCountryLanguage = selectedCountryData.language;

    const selectedSkinTone = this.getRandomSkinToneByGenderId(selectedGenderId);
    const selectedIncome = this.getRandomIncomeByGenderId(selectedGenderId);

    const generatedFirstName = this.getRandomFirstName({
      language: selectedCountryLanguage,
      genderId: selectedGenderId,
    });
    
    const generatedLastName = this.getRandomLastName(selectedCountryLanguage);
    const generatedDemonym = selectedCountryData.demonym[selectedGenderId];
    const generatedStats = this.generateRandomStats();

    return {
      firstName: generatedFirstName,
      lastName: generatedLastName,
      demonym: generatedDemonym,
      countryCode: selectedCountryCode,
      countryData: selectedCountryData,
      gender: selectedGender,
      skinTone: selectedSkinTone,
      income: selectedIncome,
      stats: generatedStats,
      age: 0,
    };
  }
}

interface configuration {
  genderId?: GenderId;
  lastName?: string;
  skinTone?: SkinTone;
  income?: Income;
  countryCode?: string;
  demonym?: string;
  academic?: string;
  career?: string;
  freelance?: string;
}

interface ageCriteria {
  minAge: number;
  maxAge: number;
}

interface GenerateNPCProps {
  configuration?: configuration;
  ageCriteria?: ageCriteria;
}

export class NPCGenerator extends PlayerGenerator {
    
  private jobService: JobService;
  constructor() {
    super();
    this.jobService = new JobService();
  }

    public getRandomAge(minAge: number, maxAge: number): number {
    return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
}
  public generateNPC({
     configuration = {}, 
     ageCriteria = { minAge: 18, maxAge: 60 }
  }: GenerateNPCProps
  ): Character {
    const { genderId, academic, career, freelance, lastName, skinTone, income, countryCode, demonym } = configuration;
    const { minAge, maxAge } = ageCriteria;
    const age = this.getRandomAge(minAge, maxAge);
    const selectedGender = genderId 
      ? this.getGenderById(genderId)
      : this.getRandomGender();
    
    const selectedGenderId = selectedGender.id;

    const selectedCountryCode = countryCode ?? this.getRandomCountryCode();
    const selectedCountryData = this.getCountryDataByCode(selectedCountryCode);
    const selectedCountryLanguage = selectedCountryData.language;

    const selectedSkinTone = skinTone ?? this.getRandomSkinToneByGenderId(selectedGenderId);
    const selectedIncome = income ?? this.getRandomIncomeByGenderId(selectedGenderId);

    const selectedCareer = career ?? this.jobService.getRandomCareerByIncome(selectedIncome).careerID;

    const generatedFirstName = this.getRandomFirstName({
      language: selectedCountryLanguage,
      genderId: selectedGenderId,
    });
    
    const determinedLastName = lastName ?? this.getRandomLastName(selectedCountryLanguage);
    const determinedDemonym = demonym ?? selectedCountryData.demonym[selectedGenderId];
    const generatedStats = this.generateRandomStats();

    return {
      firstName: generatedFirstName,
      lastName: determinedLastName,
      demonym: determinedDemonym,
      countryCode: selectedCountryCode,
      countryData: selectedCountryData,
      career: selectedCareer,
      gender: selectedGender,
      skinTone: selectedSkinTone,
      income: selectedIncome,
      stats: generatedStats,
      age,
    };
  }
}

export default class NPCFactory {
  constructor(private npcGenerator: NPCGenerator) {}
  
  public generateRandomNPC(): Character {
    return this.npcGenerator.generateNPC({});
  }

  private familiarshipConfiguration(character: Character) {
    return {
      lastName: character.lastName,
      skinTone: character.skinTone,
      income: character.income,
      countryCode: character.countryCode,
      demonym: character.demonym,
    };
  }

  generateFather(character: Character): Character {
    return this.npcGenerator.generateNPC({
      configuration: {
        genderId: "male",
        ...this.familiarshipConfiguration(character),
      },
      ageCriteria: { minAge: 18, maxAge: 40 },
    });
  }

  generateMother(character: Character): Character {
    return this.npcGenerator.generateNPC({
      configuration: {
        genderId: "female",
        ...this.familiarshipConfiguration(character),
      },
      ageCriteria: { minAge: 18, maxAge: 40 },
    });
  }

  generateChild(character: Character): Character {
    return this.npcGenerator.generateNPC({
      configuration: {
        ...this.familiarshipConfiguration(character),
      },
      ageCriteria: { minAge: 0, maxAge: 0 },
    });
  }

  generateClassmate(character: Character): Character {
    return this.npcGenerator.generateNPC({
      configuration: {
        income: character.income,
        countryCode: character.countryCode,
        demonym: character.demonym,
      },
      ageCriteria: {
        minAge: character.age - 2,
        maxAge: character.age + 2,
      },
    });
  }
}