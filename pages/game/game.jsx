import React, { useEffect, useState } from "react";
import styles from "./game.module.css";
import Header from "../../components/header/header.jsx";
import { generateRandomStatus } from "../../models/randomizer";
import namesByCountry from "../../data/namesByCountry";
import StatBar from "./statBar/statBar.jsx";
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
          health,
          beauty,
          intellect,
          mentalHealth,
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
      <section className={styles.characterHeader}>
        <div>
          <h1>
            {character.firstName} {character.lastName}
          </h1>
          <p>1 ano</p>
        </div>
      </section>
      <section className={styles.characterDescription}>
        <h2>Sobre</h2>
        <p>
          Olá! Sou {lower(character.skinTone.label)}, {getDemonym()} e venho de
          uma família {lower(character.income.label)}.
        </p>
      </section>
      <section className={styles.statsContainer}>
        <h2>Atributos</h2>
        <StatBar label="Saúde" value={stats.health} icon="heart" />
        <StatBar label="Beleza" value={stats.beauty} icon="sparkles" />
        <StatBar label="Intelecto" value={stats.intellect} icon="brain" />
        <StatBar label="Felicidade" value={stats.mentalHealth} icon="smile" />
      </section>
      <section className={styles.eventsContainer}>
        <h2>Acontecimentos do Ano</h2>
        <ul>
          <li>
            <p>Primeira Aventura</p>
          </li>
          <li>
            <p>Primeiro dia de escola</p>
          </li>
        </ul>
      </section>
      <section className={styles.actions}>
        <button onClick={handleStartGame}>Avançar ano</button>
      </section>
    </div>
  );
}
