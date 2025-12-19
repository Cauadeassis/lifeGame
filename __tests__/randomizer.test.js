import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { generateRandomStatus } from "../models/randomizer.js";
import { generateRandomCharacter } from "../models/randomizer.js";
import { incomes } from "../data/incomes.js";
import { skinTones } from "../data/skinTones.js";
import calculateDifficulty from "../models/difficulty.js";
import Randomizer from "../pages/randomizer/randomizer.jsx";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));
describe("generating random status", () => {
    test("Should return 4 attributes", () => {
        for (let i = 0; i < 10; i++) {
            const stats = generateRandomStatus();
            expect(stats.length).toBe(4);
        }
    });
    test("Should be > 0 and < 100", () => {
        for (let i = 0; i < 10; i++) {
            const stats = generateRandomStatus();
            stats.forEach((value) => {
                expect(value).toBeLessThanOrEqual(100);
                expect(value).toBeGreaterThanOrEqual(0);
            });
        }
    });
    test("Sum of all attributes should be exactly 240", () => {
        for (let i = 0; i < 10; i++) {
            const stats = generateRandomStatus();
            const sum = stats.reduce((accumulator, stat) => accumulator + stat, 0);
            expect(sum).toBe(240);
        }
    });
});
describe("Generating random character", () => {
    beforeEach(() => {
        pushMock.mockClear();
    });
    test("Should render character and difficulty sections", () => {
        render(<Randomizer />);
        expect(screen.getByText(/País:/i)).toBeInTheDocument();
        expect(screen.getByText(/Gerar novo personagem/i)).toBeInTheDocument();
    });
    test("Income should match allowed gender income list", () => {
        const character = generateRandomCharacter();
        const isIncomeValid = incomes[character.gender.id].some(
            (item) => item.id === character.income.id,
        );
        expect(isIncomeValid).toBe(true);
    });

    test("Skin tone should match allowed gender skin tone list", () => {
        const character = generateRandomCharacter();
        const isSkinToneValid = skinTones[character.gender.id].some(
            (item) => item.id === character.skinTone.id,
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
                const result = calculateDifficulty({ id: incomeId }, { id: skinId });
                expect(result).toBe(expected);
            });
        });
    });
});
describe("Buttons test battery", () => {
    beforeEach(() => {
        pushMock.mockClear();
    });
    test("should navigate to /game when clicking the button", () => {
        render(<Randomizer />);
        const startGameButton = screen.getByText("Não, vamos jogar");
        fireEvent.click(startGameButton);
        expect(pushMock).toHaveBeenCalledTimes(1);
        expect(pushMock).toHaveBeenCalledWith("/game");
        expect(JSON.parse(localStorage.getItem("character"))).toBeTruthy();
    });
});
