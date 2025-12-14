import React from "react";
import styles from "./gameDifficulty.module.css";
export default function GameDifficulty({ difficulty }) {
  const getDifficultyText = (level) => {
    const difficultyMap = {
      1: "Modo Tutorial",
      2: "Fácil",
      3: "Médio",
      4: "Difícil",
      5: "Hardcore"
    };
    return difficultyMap[level] || "Médio";
  };
  return (
    <section className={styles.difficultyContainer}>
      <label className={styles.label}>Dificuldade do Jogo</label>
      <input
        type="range"
        min="1"
        max="5"
        value={difficulty || 3}
        disabled
        className={styles.rangeInput}
      />
      <div className={styles.gamemodeText}>
        {getDifficultyText(difficulty)}
      </div>
    </section>
  );
}
