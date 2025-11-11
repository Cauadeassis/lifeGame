import React, { useState, useEffect } from "react";
import styles from "../styles/pages/customizer.module.css";
import Header from "../components/header";
import SkinSelector from "../components/skinSelector";
import IncomeSelector from "../components/incomeSelector";

export default function Customizer() {
  const [playerName, updatePlayerName] = useState("");
  const [country, setCountry] = useState("");
  const [skinTone, setSkinTone] = useState("middleTone");
  const [income, setIncome] = useState("");
  const [difficulty, setDifficulty] = useState(3);
  const [gender, setGender] = useState("");

  function handleStartGame() {
    if (!playerName.trim()) return;
    onStartGame({
      name: playerName,
      country,
      gender,
      income,
      skinTone,
    });
  }
  const calculateDifficulty = (income, skin) => {
    let baseDifficulty = 3;
    if (income === "poor") baseDifficulty += 1;
    else if (income === "rich") baseDifficulty -= 1;
    if (skin === "black") baseDifficulty += 1;
    else if (skin === "white") baseDifficulty -= 1;
    if (baseDifficulty < 1) baseDifficulty = 1;
    if (baseDifficulty > 5) baseDifficulty = 5;
    return baseDifficulty;
  };
  useEffect(() => {
    const newDifficulty = calculateDifficulty(income, skinTone);
    setDifficulty(newDifficulty);
  }, [income, skinTone]);

  return (
    <div className={styles.body}>
      <div className={styles.siteContent}>
        <Header />
        <section className={styles.nameContainer}>
          <label className={styles.label}>Character Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite seu nome"
            value={playerName}
            onChange={(typing) => updatePlayerName(typing.target.value)}
          />
        </section>
        <SkinSelector skinTone={skinTone} setSkinTone={setSkinTone} />
        <IncomeSelector income={income} setIncome={setIncome} />
        <section className={styles.countrySelectorContainer}>
          <label className={styles.label}>País de Origem</label>
          <select
            className={styles.input}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="BR">Brasil</option>
            <option value="US">Estados Unidos</option>
            <option value="JP">Japão</option>
            <option value="DE">Alemanha</option>
            <option value="FR">França</option>
          </select>
        </section>
        <section className={styles.genderSelectorContainer}>
          <label className={styles.label}>Gênero</label>
          <select
            className={styles.input}
            value={gender}
            onChange={(event) => setGender(event.target.value)}>
            <option value="">Selecione...</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </section>
        <section>
          <label>Dificuldade do Jogo</label>
          <input
            type="range"
            min="1"
            max="5"
            value={difficulty}
            disabled
            step="1"
          />
          <div>
            {difficulty === 1 && "Modo Tutorial"}
            {difficulty === 2 && "Fácil"}
            {difficulty === 3 && "Médio"}
            {difficulty === 4 && "Difícil"}
            {difficulty === 5 && "Hardcore"}
          </div>
        </section>
      </div>
    </div>
  )
}