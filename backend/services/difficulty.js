export function calculateDifficulty(income, skinTone) {
  let difficulty = 3;
  if (income?.id === "poor") difficulty = 4;
  else if (income?.id === "middle") difficulty = 3;
  else if (income?.id === "rich") difficulty = 2;
  if (skinTone?.id === "black") difficulty += 1;
  else if (skinTone?.id === "white") difficulty -= 1;
  return difficulty;
}
