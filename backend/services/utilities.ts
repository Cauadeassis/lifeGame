import fs from "fs";
import path from "path";
import { GenderId, Quantity } from "../data/character/types.ts";
import { WordsDictionary } from "../data/dictionary/types.ts";

export function getRandomDamage(min = 0, max = 10): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
export function loadJSON<T>(basePath: string, ...segments: string[]): T {
  const filePath = path.join(basePath, ...segments);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export function generateRandomStats(): number[] {
  const allStats = [0, 0, 0, 0];
  let sumOfAll = 0;

  for (let singleStat = 0; singleStat < 3; singleStat++) {
    const remainingStats = 4 - singleStat;
    const maxLimit = Math.min(100, 240 - sumOfAll);
    const minLimit = Math.max(0, 240 - sumOfAll - (remainingStats - 1) * 100);

    const valor =
      Math.floor(Math.random() * (maxLimit - minLimit + 1)) + minLimit;
    allStats[singleStat] = valor;
    sumOfAll += valor;
  }
  allStats[3] = 240 - sumOfAll;

  for (let i = allStats.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allStats[i], allStats[j]] = [allStats[j], allStats[i]];
  }

  return allStats;
}

interface GetWordParameters {
  file: WordsDictionary;
  category: string;
  grammaticalGender: GenderId;
  quantity: Quantity;
}
export const getWord = ({
  file, // possessives, verbs, adjectives, articles
  category, // firstPerson, secondPerson, defined, undefined
  grammaticalGender, // male, female
  quantity, // singular, plural
}: GetWordParameters): string => {
  return file[category][grammaticalGender][quantity];
};
