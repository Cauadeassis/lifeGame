import React, { useState, useEffect } from "react";
import styles from "../styles/pages/randomizer.module.css";
import Header from "../components/header"
export default function Randomizer() {
  const [character, setCharacter] = useState(null);

  function generateRandomCharacter() {
    const names = ["Alex", "Sofia", "Lucas", "Emma", "Yuki", "Gabriel", "Aiko", "Marie", "Ethan", "Carla"];
    const countries = ["Brasil", "Estados Unidos", "Japão", "Alemanha", "França"];
    const genders = ["Masculino", "Feminino"];
    const skinTones = ["Branco", "Moreno", "Negro"];
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

    return {
      name: getRandomItem(names),
      country: getRandomItem(countries),
      gender: getRandomItem(genders),
      skinTone: getRandomItem(skinTones),
    };
  }

  const handleRandomize = () => {
    setCharacter(generateRandomCharacter());
  };
  useEffect(() => {
    handleRandomize();
  }, []);

  return (
    <div className={styles.body}>
      <Header />
      {character && (
        <div className={styles.characterInfo}>
          <h3>{character.name}</h3>
          <p>País: {character.country}</p>
          <p>Gênero: {character.gender}</p>
          <p>Cor de pele: {character.skinTone}</p>
        </div>
      )}
      <h1 className={styles.h1}>Gerar novo personagem?</h1>
      <div className={styles.buttonsContainer}>
        <button onClick={handleRandomize}>Sim</button>
        <button onClick={handleRandomize}>Não, vamos jogar</button>
      </div>
    </div>
  );
}
