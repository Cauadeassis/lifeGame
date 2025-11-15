import React, { useEffect, useState } from "react";
import styles from "../styles/pages/game.module.css";
import Header from "../components/header";
import { generateRandomStatus } from "../models/randomizer";

export default function Game() {
  const [character, setCharacter] = useState(null);
  const [randomHealth, randomIntellect, randomBeauty, randomMentalHealth] =
    generateRandomStatus();
  const stats = {
    Saúde: randomHealth,
    Beleza: randomBeauty,
    Intelecto: randomIntellect,
    "Saúde Mental": randomMentalHealth,
  };

  const statKeys = Object.keys(stats);
  useEffect(() => {
    const savedCharacter = localStorage.getItem("character");
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    }
  }, []);

  if (!character) {
    return (
      <div className={styles.body}>
        <Header />
        <p>Carregando personagem...</p>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.characterDisplay}>
        <h1>
          {character.firstName} {character.lastName}
        </h1>
        <p>País: {character.country}</p>
        <p>Gênero: {character.gender}</p>
        <p>Cor de pele: {character.skinTone}</p>
        <p>Renda: {character.income}</p>
      </div>
      <div className={styles.actions}>
        <button>Começar jogo</button>
      </div>
      <section className={styles.statsContainer}>
        {statKeys.map((key) => (
          <div className={styles.singleStat} key={key}>
            {key[0].toUpperCase() + key.slice(1)}:{" "}
            <span className={styles.singleStatSpan}>{stats[key]}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
