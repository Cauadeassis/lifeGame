import React, { useEffect } from "react";
import styles from "../styles/components/gameDifficulty.module.css";
export default function GameDifficulty({ difficulty }) {
  return (
    console.log(difficulty),
    (
      <section className={styles.difficultyContainer}>
        <label className={styles.label}>Dificuldade do Jogo</label>
        <input
          type="range"
          min="1"
          max="5"
          value={difficulty}
          disabled
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
    )
  );
}
