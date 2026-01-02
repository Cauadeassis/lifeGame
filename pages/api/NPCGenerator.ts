import CharacterService from "../../backend/services/characterService.js";
import { Character } from "../../backend/data/character/types.js";
import type { NextApiRequest, NextApiResponse } from "next";

interface ErrorResponse {
  error: string;
  message?: string;
}

interface handlerParameters {
  request: NextApiRequest;
  response: NextApiResponse<Character | ErrorResponse>;
}

type NPCType = "father" | "mother" | "classmate" | "child";

export default function handler({
  request,
  response,
}: handlerParameters): void {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { character, NPCType } = request.body as {
      character: Character;
      NPCType: NPCType;
    };

    if (!character || !NPCType) {
      return response.status(400).json({
        error: "Character and NPCType are requestuired",
      });
    }

    const characterService = new CharacterService();
    let NPC: Character;

    switch (NPCType) {
      case "father":
        NPC = characterService.generateFather(character);
        break;
      case "mother":
        NPC = characterService.generateMother(character);
        break;
      case "classmate":
        NPC = characterService.generateClassmate(character);
        break;
      case "child":
        NPC = characterService.generateChild(character);
        break;
      default:
        return response
          .status(400)
          .json({ error: `Invalid relationType: ${NPCType}` });
    }
    console.log(NPC);
    console.log(JSON.stringify(NPC));
    return response.status(200).json(NPC);
  } catch (error: unknown) {
    console.error("Erro ao gerar parente:", error);

    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    return response.status(500).json({
      error: "Erro ao gerar parente",
      message,
    });
  }
}
