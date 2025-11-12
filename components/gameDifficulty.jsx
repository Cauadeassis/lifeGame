import React, { useEffect } from "react";
import styles from "../styles/components/gameDifficulty.module.css";

export default function GameDifficulty({ income, skinTone, difficulty, setDifficulty }) {
  const calculateDifficulty = (income, skin) => {
    let baseDifficulty = 3;
    if (income === "poor") baseDifficulty += 1;
    else if (income === "rich") baseDifficulty -= 1;
    if (skin === "black") baseDifficulty += 1;
    else if (skin === "white") baseDifficulty -= 1;
    if (baseDifficulty < 1) baseDifficulty = 1;
    if (baseDifficulty > 5) baseDifficulty = 5;
    return baseDifficulty;
  };
  useEffect(() => {
    const newDifficulty = calculateDifficulty(income, skinTone);
    setDifficulty(newDifficulty);
  }, [income, skinTone]);
  return (
    <section className={styles.difficultyContainer}>
      <label className={styles.label}>Dificuldade do Jogo</label>
      <input
        type="range"
        min="1"
        max="5"
        value={difficulty}
        disabled
        step="0"
        className={styles.rangeInput}
      />
      <div className={styles.gamemodeText}>
        {difficulty === 1 && "Modo Tutorial"}
        {difficulty === 2 && "Fácil"}
        {difficulty === 3 && "Médio"}
        {difficulty === 4 && "Difícil"}
        {difficulty === 5 && "Hardcore"}
      </div>
    </section>
  );
}