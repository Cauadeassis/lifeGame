import { NextRequest, NextResponse } from "next/server";
import CharacterService from "../../../backend/services/characterService";

interface ErrorResponse {
  error: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  console.log("Generating random character...");
  try {
    const characterService = new CharacterService();
    const character = characterService.generateRandomCharacter();
    console.log("Random character generated!");
    return NextResponse.json(character, { status: 200 });
  } catch (error: unknown) {
    console.error("Error while generating character: ", error);
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    return NextResponse.json(
      {
        error: "Error while generating character",
        message,
      } satisfies ErrorResponse,
      { status: 500 }
    );
  }
}