import CharacterService from "../../backend/services/characterService.js";

import type { NextApiRequest, NextApiResponse } from "next";

interface ErrorResponse {
  error: string;
  message?: string;
}

interface handlerParameters {
  request: NextApiRequest;
  response: NextApiResponse;
}
export default function handler({
  request,
  response,
}: handlerParameters): void {
  console.log("Função iniciada");

  if (request.method !== "POST") {
    return response
      .status(405)
      .json({ error: "Method not allowed" } satisfies ErrorResponse);
  }

  try {
    const characterService = new CharacterService();
    const character = characterService.generateRandomCharacter();

    return response.status(200).json(character);
  } catch (error: unknown) {
    console.error("Erro ao gerar personagem:", error);

    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    return response.status(500).json({
      error: "Erro ao gerar personagem",
      message,
    } satisfies ErrorResponse);
  }
}
