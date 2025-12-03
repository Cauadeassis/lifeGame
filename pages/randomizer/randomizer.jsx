import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./randomizer.module.css";
import Header from "../../components/header/header.jsx";
import Head from "next/head";
import { generateRandomCharacter } from "../../models/randomizer.js";
import GameDifficulty from "../../components/gameDifficulty/gameDifficulty.jsx";
import calculateDifficulty from "../../models/difficulty.js";
import ThemeToggle from "../../components/themeToggle/themeToggle.jsx";
export default function Randomizer() {
  const router = useRouter();
  const [character, setCharacter] = useState(null);
  const [difficulty, setDifficulty] = useState(2);
  const handleRandomize = () => {
    const newCharacter = generateRandomCharacter();
    const newDifficulty = calculateDifficulty(
      newCharacter.income,
      newCharacter.skinTone,
    );
    setCharacter(newCharacter);
    setDifficulty(newDifficulty);
  };
  useEffect(() => {
    handleRandomize();
  }, []);
  const handleStartGame = () => {
    localStorage.setItem("character", JSON.stringify(character));
    router.push("../game/game");
  };
  return (
    <>
      <Head>
        <title>Randomização</title>
      </Head>
      <div className={styles.body}>
        <ThemeToggle />
        <div className={styles.siteContent}>
          <Header />
          {character && (
            <>
              <div className={styles.characterInfo}>
                <h1>
                  {character.firstName} {character.lastName}
                </h1>
                <div className={styles.paragraphContainer}>
                  <p>País: {character.country}</p>
                  <p>Gênero: {character.gender.label}</p>
                  <p>Cor de pele: {character.skinTone.label}</p>
                  <p>Renda: {character.income.label}</p>
                </div>
              </div>
              <GameDifficulty
                income={character.income}
                skinTone={character.skinTone}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
              />
            </>
          )}
          <h1 className={styles.h1}>Gerar novo personagem?</h1>
          <div className={styles.buttonsContainer}>
            <button onClick={handleRandomize}>Sim</button>
            <button onClick={handleStartGame}>Não, vamos jogar</button>
          </div>
        </div>
      </div>
    </>
  );
}
