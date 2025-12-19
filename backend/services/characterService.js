import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadJSON, getRandomItem } from "./utilities.js";
import { calculateDifficulty } from "./difficulty.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class CharacterService {
  constructor() {
    this.dataPath = path.join(__dirname, "..", "data");
    this.loadData();
  }

  loadData() {
    try {
      this.genders = loadJSON(this.dataPath, "character", "genders.json");
      this.skinTones = loadJSON(this.dataPath, "character", "skinTones.json");
      this.incomes = loadJSON(this.dataPath, "character", "incomes.json");
      this.namesByCountry = loadJSON(
        this.dataPath,
        "character",
        "namesByCountry.json",
      );
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  generateRandomStatus() {
    const allStatus = [0, 0, 0, 0];
    let sumOfAll = 0;

    for (let singleStat = 0; singleStat < 3; singleStat++) {
      const remainingStatus = 4 - singleStat;
      const maxLimit = Math.min(100, 240 - sumOfAll);
      const minLimit = Math.max(
        0,
        240 - sumOfAll - (remainingStatus - 1) * 100,
      );

      const valor =
        Math.floor(Math.random() * (maxLimit - minLimit + 1)) + minLimit;
      allStatus[singleStat] = valor;
      sumOfAll += valor;
    }
    allStatus[3] = 240 - sumOfAll;
    for (let i = allStatus.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allStatus[i], allStatus[j]] = [allStatus[j], allStatus[i]];
    }
    return allStatus;
  }

  generateRandomCharacter() {
    const countries = Object.keys(this.namesByCountry);
    const gender = getRandomItem(this.genders);
    const country = getRandomItem(countries);
    const firstName = getRandomItem(this.namesByCountry[country][gender.id]);
    const lastName = getRandomItem(this.namesByCountry[country].last);
    const demonym = this.namesByCountry[country].demonym[gender.id];
    const skinTone = getRandomItem(this.skinTones[gender.id]);
    const income = getRandomItem(this.incomes[gender.id]);
    const status = this.generateRandomStatus();
    const difficulty = calculateDifficulty(income, skinTone);
    return {
      firstName,
      lastName,
      demonym,
      country,
      gender,
      skinTone,
      income,
      difficulty,
      status: {
        health: status[0],
        mentalHealth: status[1],
        intellect: status[2],
        beauty: status[3],
      },
    };
  }
}
export default CharacterService;
