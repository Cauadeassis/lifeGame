import { Character, Stats } from "../backend/data/character/types";
import { Event } from "../backend/data/events/types";

import EventService from "../backend/services/eventService";
const eventService = new EventService();

const GAME_STATE_KEY = "gameState";

export interface GameState {
  stats: Stats;
  age: number;
  currentEvent: Event | null;
  father: Character | null;
  mother: Character | null;
  classmate?: Character | null;
  child: Character | null;
}

export interface GameData extends GameState {
  player: Character;
}

interface LoadGameProps {
  savedPlayer: Character;
  gameState: GameState;
}

type NPCType = "father" | "mother" | "classmate" | "child";

interface GenerateNPCProps {
  player: Character;
  NPC: NPCType;
}

export const saveGame = (gameState: GameState): boolean => {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    return true;
  } catch (error) {
    console.error("Erro ao salvar jogo:", error);
    return false;
  }
};

export const saveCharacter = (character: Character) => {
  try {
    localStorage.setItem("character", JSON.stringify(character));
  } catch (error) {
    console.error("Erro ao salvar personagem:", error);
    return false;
  }
};

export const loadGame = ({
  savedPlayer,
  gameState,
}: LoadGameProps): GameData => {
  return {
    player: savedPlayer,
    stats: gameState.stats,
    age: gameState.age,
    currentEvent: gameState.currentEvent,
    father: gameState.father ?? null,
    mother: gameState.mother ?? null,
    child: gameState.child ?? null,
  };
};
export const createGame = async (savedPlayer: Character): Promise<GameData> => {
  const [father, mother] = await Promise.all([
    generateNPC({ player: savedPlayer, NPC: "father" }),
    generateNPC({ player: savedPlayer, NPC: "mother" }),
  ]);
  const age = 0;
  const currentEvent = eventService.getRandomEvent({ age });
  return {
    player: savedPlayer,
    stats: savedPlayer.stats,
    age,
    currentEvent,
    father,
    mother,
    child: null,
  };
};

export const generateNPC = async ({
  player,
  NPC,
}: GenerateNPCProps): Promise<Character | null> => {
  try {
    const response = await fetch("/api/NPCGenerator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player, NPC }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao gerar ${NPC}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao gerar ${NPC}:`, error);
    return null;
  }
};
