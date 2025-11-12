import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/pages/randomizer.module.css";
import Header from "../components/header";
import { generateRandomCharacter } from "../models/randomizer.js";
export default function Randomizer() {
  const router = useRouter();
  const [character, setCharacter] = useState(null);
  const handleRandomize = () => {
    setCharacter(generateRandomCharacter());
  };
  useEffect(() => {
    handleRandomize();
  }, []);
  const handleStartGame = () => {
    localStorage.setItem("character", JSON.stringify(character));
    router.push("/game");
  };
  return (
    <div className={styles.body}>
      <Header />
      {character && (
        <div className={styles.characterInfo}>
          <h1>{character.firstName} {character.lastName}</h1>
          <p>País: {character.country}</p>
          <p>Gênero: {character.gender}</p>
          <p>Cor de pele: {character.skinTone}</p>
        </div>
      )}
      <h1 className={styles.h1}>Gerar novo personagem?</h1>
      <div className={styles.buttonsContainer}>
        <button onClick={handleRandomize}>Sim</button>
        <button onClick={() => handleStartGame()}>Não, vamos jogar</button>
      </div>
    </div>
  );
}
