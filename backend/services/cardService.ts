import { getRandomItem } from "./utilities";
import { Gender, GenderId } from "../data/character/types";

import rawGenders from "../data/character/genders.json" ;
import rawBullyingCards from "../data/bullyingCards.json" ;
const genders = rawGenders as Gender[];
const bullyingCards = rawBullyingCards as BullyingCardData[];

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

function createBullyingCard(id: string): BullyingCard | null {
    const cardData = bullyingCards.find((card) => card.id === id);

    if (!cardData) {
      console.error(`Card com ID "${id}" não encontrado`);
      return null;
    }

    const aggressorGender: GenderId = getRandomItem(genders).id;

    const attackOptions: Record<GenderId, OptionSelectItem[]> = {
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
