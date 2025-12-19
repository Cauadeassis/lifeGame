import fs from "fs";
import path from "path";
import { getRandomItem } from "./utilities.js";

class CardService {
  constructor() {
    this.dataPath = path.join(__dirname, "..", "data");
    this.genders = this._loadGenders();
  }
  _loadGenders() {
    try {
      const filePath = path.join(this.dataPath, "genders.json");
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error("Erro: genders.json não encontrado");
      } else {
        console.error("Erro ao decodificar JSON:", error);
      }
      return [];
    }
  }

  createBullyingCard(id, maleText, femaleText) {
    return {
      id,
      type: "twoOptions",
      aggressorGender: getRandomItem(this.genders),
      male: {
        text: maleText,
      },
      female: {
        text: femaleText,
      },
      options: {
        firstOption: {
          text: "Não fazer nada",
        },
        secondOption: {
          mode: "select",
          text: {
            male: "Bater nele",
            female: "Bater nela",
          },
          options: {
            male: [
              { label: "Chute na virilha", value: "groinKick" },
              { label: "Soco no queixo", value: "chinPunch" },
            ],
            female: [
              { label: "Puxar o cabelo", value: "hairPull" },
              { label: "Empurrar para longe", value: "push" },
            ],
          },
        },
      },
    };
  }
}

export default CardService;
