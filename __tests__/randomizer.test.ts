import "@testing-library/jest-dom";
import incomes from "../backend/data/character/incomes.json" ;
import skinTones from "../backend/data/character/skinTones.json" ;
import { generateRandomStats } from "../backend/services/utilities";
import { CharacterService } from "../backend/services/characterService";

const generator = new CharacterService();
const ATTEMPTS = 20;

describe("Generating random stats", () => {
  test("should always return exactly 4 attributes", () => {
    const results = Array.from({ length: ATTEMPTS }, () =>
      generateRandomStats(),
    );

    results.forEach((stats) => {
      expect(stats).toHaveLength(4);
    });
  });

  test("should generate all attributes between 0 and 100", () => {
    const results = Array.from({ length: ATTEMPTS }, () =>
      generateRandomStats(),
    );

    results.forEach((stats) => {
      stats.forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      });
    });
  });

  test("should sum exactly 240 across all 4 attributes", () => {
    const results = Array.from({ length: ATTEMPTS }, () =>
      generateRandomStats(),
    );

    results.forEach((stats) => {
      const sum = stats.reduce((acc, stat) => acc + stat, 0);
      expect(sum).toBe(240);
    });
  });
});

describe("Generating a random character", () => {
  const characters = Array.from({ length: ATTEMPTS }, () =>
    generator.generateRandomCharacter(),
  );

  test("Income should match with gender", () => {
    characters.forEach((character) => {
      const validIncomeIds = incomes[character.gender.id].map((i) => i.id);
      expect(validIncomeIds).toContain(character.income.id);
    });
  });

  test("Skin tone should match with gender", () => {
    characters.forEach((character) => {
      const validSkinToneIds = skinTones[character.gender.id].map((s) => s.id);
      expect(validSkinToneIds).toContain(character.skinTone.id);
    });
  });

  test("Should generate all properties", () => {
    characters.forEach((character) => {
      expect(character).toMatchObject({
        firstName: expect.any(String),
        lastName: expect.any(String),
        demonym: expect.any(String),
        country: expect.any(String),
        gender: expect.objectContaining({ id: expect.any(String) }),
        skinTone: expect.objectContaining({ id: expect.any(String) }),
        income: expect.objectContaining({ id: expect.any(String) }),
        stats: expect.objectContaining({
          health: expect.any(Number),
          mentalHealth: expect.any(Number),
          intellect: expect.any(Number),
          beauty: expect.any(Number),
        }),
      });
    });
  });
});
