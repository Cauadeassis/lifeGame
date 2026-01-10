import "@testing-library/jest-dom";
import rawIncomes from "../backend/data/character/incomes";
import rawSkinTones from "../backend/data/character/skinTones.json";
import { Income, SkinTone } from "../backend/data/character/types"
const incomes = rawIncomes as Income
const skinTones = rawSkinTones as SkinTone

import { PlayerGenerator } from "../backend/services/characterService";

const playerGenerator = new PlayerGenerator();
const attempts = 5;

describe("Generating a random player", () => {
  const characters = Array.from({ length: attempts }, () =>
    playerGenerator.generateRandomPlayer(),
  );

  test("Income should match with gender", () => {
    characters.forEach((character) => {
      const validIncomeIds = incomes[character.gender.id].map((income) => income.id);
      expect(validIncomeIds).toContain(character.income.id);
    });
  });

  test("Skin tone should match with gender", () => {
    characters.forEach((character) => {
      const validSkinToneIds = skinTones[character.gender.id].map((skinTone) => skinTone.id);
      expect(validSkinToneIds).toContain(character.skinTone.id);
    });
  });

  test("Should generate all properties", () => {
    characters.forEach((character) => {
      expect(character).toMatchObject({
        firstName: expect.any(String),
        lastName: expect.any(String),
        demonym: expect.any(String),
        countryCode: expect.any(String),
countryData: expect.any(Object),
        gender: expect.objectContaining({ id: expect.any(String) }),
        skinTone: expect.objectContaining({ id: expect.any(String) }),
        income: expect.objectContaining({ id: expect.any(String) }),
        stats: expect.objectContaining({
          health: expect.any(Number),
          mentalHealth: expect.any(Number),
          intellect: expect.any(Number),
          beauty: expect.any(Number),
        }),
        age: expect.any(Number),
      });
    });
  });
});