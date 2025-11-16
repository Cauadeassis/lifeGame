import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/pages/randomizer.module.css";
import Header from "../components/header";
import Head from "next/head";
import { generateRandomCharacter } from "../models/randomizer.js";
import GameDifficulty from "../components/gameDifficulty";
import calculateDifficulty from "../models/difficulty.js";
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
    router.push("/game");
  };
  return (
    <>
      <Head>
        <title>Randomização</title>
      </Head>
      <div className={styles.body}>
        <Header />
        {character && (
          <>
            <div className={styles.characterInfo}>
              <h1>
                {character.firstName} {character.lastName}
              </h1>
              <p>País: {character.country}</p>
              <p>Gênero: {character.gender.label}</p>
              <p>Cor de pele: {character.skinTone.label}</p>
              <p>Renda: {character.income.label}</p>
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
    </>
  );
}
