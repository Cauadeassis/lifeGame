export default function calculateDifficulty(income, skinTone) {
  let baseDifficulty = 2;
  if (income?.id === "poor") baseDifficulty = 4;
  else if (income?.id === "rich") baseDifficulty = 2;
  else if (income?.id === "middle") baseDifficulty = 3;
  if (skinTone?.id === "black") baseDifficulty += 1;
  else if (skinTone?.id === "white") baseDifficulty -= 1;
  if (baseDifficulty < 1) baseDifficulty = 1;
  if (baseDifficulty > 5) baseDifficulty = 5;
  return baseDifficulty;
}
