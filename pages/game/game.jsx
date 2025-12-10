import React, { useEffect, useState } from "react";
import styles from "./game.module.css";
import Header from "../../components/header/header.jsx";
import { generateRandomStatus } from "../../models/randomizer";
import namesByCountry from "../../data/namesByCountry";
import ThemeToggle from "../../components/themeToggle/themeToggle.jsx";
const STORAGE_KEY = "character";
export default function Game() {
  const [character, setCharacter] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadGameData = () => {
      try {
        const savedCharacter = localStorage.getItem(STORAGE_KEY);
        if (savedCharacter) {
          setCharacter(JSON.parse(savedCharacter));
        }
        const [health, intellect, beauty, mentalHealth] =
          generateRandomStatus();
        setStats({
          Saúde: health,
          Beleza: beauty,
          Intelecto: intellect,
          "Saúde Mental": mentalHealth,
        });
      } catch (error) {
        console.error("Failed to load character:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadGameData();
  }, []);
  const handleStartGame = () => {
    console.log("Starting game with:", { character, stats });
  };
  if (isLoading || !character || !stats) {
    return (
      <div className={styles.body}>
        <Header />
        <p>Carregando personagem...</p>
      </div>
    );
  }
  const getDemonym = () => {
    return (
      namesByCountry[character.country]?.demonym[character.gender.id] || ""
    );
  };
  const lower = (text) => text?.toLowerCase() || "";
  return (
    <div className={styles.body}>
      <Header />
      <ThemeToggle />
      <div className={styles.characterDisplay}>
        <h1>
          {character.firstName} {character.lastName}
        </h1>
        <p>
          Olá! Sou {lower(character.skinTone.label)}, {getDemonym()} e venho de
          uma família {lower(character.income.label)}.
        </p>
      </div>
      <div className={styles.actions}>
        <button onClick={handleStartGame}>Começar jogo</button>
      </div>
      <section className={styles.statsContainer}>
        {Object.entries(stats).map(([statName, statValue]) => (
          <div className={styles.singleStat} key={statName}>
            {statName}:{" "}
            <span className={styles.singleStatSpan}>{statValue}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
