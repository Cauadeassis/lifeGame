import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getRandomItem } from "./utilities";
import { Gender } from "../data/character/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BullyingCardData {
  id: string;
  text: {
    male: string;
    female: string;
  };
}

interface OptionSelectItem {
  label: string;
  value: string;
}

export interface BullyingCard {
  id: string;
  type: "twoOptions" | "multipleOptions";
  aggressorGender: "male" | "female";
  text: string;
  options: {
    firstOption: {
      text: string;
    };
    secondOption: {
      mode: "select";
      text: string;
      options: OptionSelectItem[];
    };
  };
}

class CardService {
  private dataPath: string;
  private genders!: Gender[];
  private bullyingCards!: BullyingCardData[];

  constructor() {
    this.dataPath = path.join(__dirname, "..", "data");
    this.genders = this._loadGenders();
    this.bullyingCards = this._loadBullyingCards();
  }

  private _loadGenders(): Gender[] {
    try {
      const filePath = path.join(this.dataPath, "character", "genders.json");
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      console.error("Erro ao carregar gêneros:", error);
      return [];
    }
  }

  private _loadBullyingCards(): BullyingCardData[] {
    try {
      const filePath = path.join(this.dataPath, "school", "bullyingCards.json");
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      console.error("Erro ao carregar bullying cards:", error);
      return [];
    }
  }

  public createBullyingCard(id: string): BullyingCard | null {
    const cardData = this.bullyingCards.find((card) => card.id === id);

    if (!cardData) {
      console.error(`Card com ID "${id}" não encontrado`);
      return null;
    }

    const aggressorGender: "male" | "female" = getRandomItem(this.genders).id;

    const attackOptions: Record<"male" | "female", OptionSelectItem[]> = {
      male: [
        { label: "Chute na virilha", value: "groinKick" },
        { label: "Soco no queixo", value: "chinPunch" },
      ],
      female: [
        { label: "Puxar o cabelo", value: "hairPull" },
        { label: "Empurrar para longe", value: "push" },
      ],
    };

    return {
      id: cardData.id,
      type: "twoOptions",
      aggressorGender,
      text: cardData.text[aggressorGender],
      options: {
        firstOption: {
          text: "Não fazer nada",
        },
        secondOption: {
          mode: "select",
          text: aggressorGender === "male" ? "Bater nele" : "Bater nela",
          options: attackOptions[aggressorGender],
        },
      },
    };
  }
}

export default CardService;
