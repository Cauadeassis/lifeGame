import fs from "fs";
import path from "path";

export function getRandomDamage(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
export function loadJSON(basePath, ...segments) {
  const filePath = path.join(basePath, ...segments);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
