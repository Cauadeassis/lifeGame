import "@testing-library/jest-dom";
import { generateRandomStats } from "../backend/services/utilities";
const attempts = 20;

describe("Generating random stats", () => {
  test("should always return exactly 4 attributes", () => {
    const results = Array.from({ length: attempts }, () =>
      generateRandomStats(),
    );

    results.forEach((stats) => {
      expect(stats).toHaveLength(4);
    });
  });

  test("should generate all attributes between 0 and 100", () => {
    const results = Array.from({ length: attempts }, () =>
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
    const results = Array.from({ length: attempts }, () =>
      generateRandomStats(),
    );

    results.forEach((stats) => {
      const sum = stats.reduce((accumulator, stat) => accumulator + stat, 0);
      expect(sum).toBe(240);
    });
  });
});

