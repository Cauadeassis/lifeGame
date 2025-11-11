import React, { useEffect, useState } from "react";
import styles from "../styles/pages/game.module.css";
import Header from "../components/header";

export default function Game() {
  const [character, setCharacter] = useState(null);
  const stats = {
    altura: { value: 1.68, maxValue: 100 },
    Beleza: { value: 9, maxValue: 100 },
    peso: { value: 57, maxValue: 100 },
    piru: { value: 19, maxValue: 100 },
  };

  const statKeys = Object.keys(stats);
  useEffect(() => {
    // Recupera os dados do personagem salvos no localStorage
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
        <h1>{character.firstName} {character.lastName}</h1>
        <p>🌍 País: {character.country}</p>
        <p>⚧ Gênero: {character.gender}</p>
        <p>🖐 Cor de pele: {character.skinTone}</p>
      </div>
      <div className={styles.actions}>
        <button>Começar jogo</button>
      </div>
      <section className={styles.statsContainer}>
        {statKeys.map((key) => (
          <div className={styles.singleStat} key={key}>
            {key[0].toUpperCase() + key.slice(1)}:{" "}
            <span className={styles.singleStatSpan}>{stats[key].value}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
