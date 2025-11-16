import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { generateRandomCharacter } from "../models/randomizer.js";
import { incomes } from "../data/incomes.js";
import { skinTones } from "../data/skinTones.js";
import calculateDifficulty from "../models/difficulty.js";
import Randomizer from "../pages/randomizer.jsx";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));
describe("Randomizer component", () => {
  test("Should render character and difficulty sections", () => {
    render(<Randomizer />);
    expect(screen.getByText(/País:/i)).toBeInTheDocument();
    expect(screen.getByText(/Gerar novo personagem/i)).toBeInTheDocument();
  });
  test("Income should match allowed gender income list", () => {
    const character = generateRandomCharacter();
    const isIncomeValid = incomes[character.gender.id].some(
      (item) => item.id === character.income.id
    );
    expect(isIncomeValid).toBe(true);
  });

  test("Skin tone should match allowed gender skin tone list", () => {
    const character = generateRandomCharacter();
    const isSkinToneValid = skinTones[character.gender.id].some(
      (item) => item.id === character.skinTone.id
    );
    expect(isSkinToneValid).toBe(true);
  });

  test("Difficulty should match with table", () => {
    const difficultyTable = {
      poor: { black: 5, middleTone: 4, white: 3 },
      middle: { black: 4, middleTone: 3, white: 2 },
      rich: { black: 3, middleTone: 2, white: 1 },
    };
    const incomesList = ["poor", "middle", "rich"];
    const tonesList = ["black", "middleTone", "white"];
    incomesList.forEach((incomeId) => {
      tonesList.forEach((skinId) => {
        const expected = difficultyTable[incomeId][skinId];
        const result = calculateDifficulty(
          { id: incomeId },
          { id: skinId }
        );
        expect(result).toBe(expected);
      });
    });
  });
});
