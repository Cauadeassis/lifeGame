import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/pages/randomizer.module.css";
import Header from "../components/header"
import namesByCountry from "../data/namesByCountry";
export default function Randomizer() {
  const [character, setCharacter] = useState(null);

  function generateRandomCharacter() {
    const countries = Object.keys(namesByCountry);
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    const country = getRandomItem(countries);
    const genders = ["Masculino", "Feminino"]
    const gender = getRandomItem(genders);
    const skinTonesByGender = {
      "Masculino": ["Branco", "Moreno", "Negro"],
      "Feminino": ["Branca", "Morena", "Negra"],
    };
    const firstName = getRandomItem(namesByCountry[country][gender]);
    const lastName = getRandomItem(namesByCountry[country]["Sobrenome"]);
    const skinTone = getRandomItem(skinTonesByGender[gender]);
    return {
      firstName,
      lastName,
      country,
      gender,
      skinTone,
    };
  }

  const handleRandomize = () => {
    setCharacter(generateRandomCharacter());
  };
  useEffect(() => {
    handleRandomize();
  }, []);
  const router = useRouter();
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
