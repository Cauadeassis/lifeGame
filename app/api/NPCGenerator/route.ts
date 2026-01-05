import { NextRequest, NextResponse } from "next/server";
import CharacterService from "../../../backend/services/characterService";
import { Character } from "../../../backend/data/character/types";

interface ErrorResponse {
  error: string;
  message?: string;
}

type NPCType = "father" | "mother" | "classmate" | "child";

interface GenerateNPCRequest {
  character: Character;
  NPCType: NPCType;
}

export async function POST(request: NextRequest) {
  console.log("Generating NPC...");
  try {
    const body = await request.json() as GenerateNPCRequest;
    const { character, NPCType } = body;
    if (!character || !NPCType) {
      return NextResponse.json(
        { error: "Character and NPCType are required" } satisfies ErrorResponse,
        { status: 400 }
      );
    }
    const characterService = new CharacterService();
    const npcGenerators = {
      father: (character: Character) => characterService.generateFather(character),
      mother: (character: Character) => characterService.generateMother(character),
      classmate: (character: Character) => characterService.generateClassmate(character),
      child: (character: Character) => characterService.generateChild(character),
    } as const;
    const generator = npcGenerators[NPCType];
    if (!generator) {
      return NextResponse.json(
        { error: `Invalid NPCType: ${NPCType}` } satisfies ErrorResponse,
        { status: 400 }
      );
    }
    const NPC = generator(character);
    console.log("NPC generated:");
    return NextResponse.json(NPC, { status: 200 });
  } catch (error: unknown) {
    console.error("Error while generating NPC:", error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json(
      {
        error: "Error generating NPC",
        message,
      } satisfies ErrorResponse,
      { status: 500 }
    );
  }
}
