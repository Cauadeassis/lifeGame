import CharacterService from "../../backend/services/characterService.js";

export default function handler(request, response) {
  console.log("Função iniciada");
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }
  try {
    const characterService = new CharacterService();
    const character = characterService.generateRandomCharacter();
    return response.status(200).json(character);
  } catch (error) {
    console.error("Erro ao gerar personagem:", error);
    return response.status(500).json({
      error: "Erro ao gerar personagem",
      message: error.message
    });
  }
}
