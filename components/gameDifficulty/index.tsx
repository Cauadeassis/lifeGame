import React, { useMemo } from "react";
import styles from "./styles.module.css";
import { Income, SkinTone } from "../../backend/data/character/types";

interface GameDifficultyProps {
  income: Income;
  skinTone: SkinTone;
}

const GameDifficulty: React.FC<GameDifficultyProps> = ({
  income,
  skinTone,
}) => {
  const difficulty = useMemo(() => {
    let difficulty = 3;

    if (income.id === "poor") difficulty = 4;
    else if (income.id === "middle") difficulty = 3;
    else if (income.id === "rich") difficulty = 2;

    if (skinTone.id === "black") difficulty += 1;
    else if (skinTone.id === "white") difficulty -= 1;

    return difficulty;
  }, [income.id, skinTone.id]);

  const difficultyMap: Record<number, string> = {
    1: "Modo Tutorial",
    2: "Fácil",
    3: "Médio",
    4: "Difícil",
    5: "Hardcore",
  };

  const getDifficultyText = (level: number): string => {
    return difficultyMap[level] || "Médio";
  };

  return (
    <section className={styles.gameDifficulty}>
      <label htmlFor="difficulty">Dificuldade do Jogo</label>
      <input
        id="difficulty"
        type="range"
        min="1"
        max="5"
        value={difficulty}
        disabled
        aria-label={`Dificuldade: ${getDifficultyText(difficulty)}`}
      />
      <div aria-live="polite">{getDifficultyText(difficulty)}</div>
    </section>
  );
};

export default GameDifficulty;
