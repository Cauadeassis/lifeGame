import { NextRequest, NextResponse } from "next/server";
import {PlayerGenerator} from "../../../backend/services/characterService";

interface ErrorResponse {
  error: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  console.log("Generating random player...");
  try {
    const playerGenerator = new PlayerGenerator();
    const player = playerGenerator.generateRandomPlayer();
    console.log("Random player generated!");
    return NextResponse.json(player, { status: 200 });
  } catch (error: unknown) {
    console.error("Error while generating player: ", error);
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    return NextResponse.json(
      {
        error: "Error while generating player",
        message,
      } satisfies ErrorResponse,
      { status: 500 },
    );
  }
}
