import React, { useState } from "react";
import styles from "../styles/customizer.module.css"
import Header from "../components/header"

export default function Customizer() {
  const [playerName, updatePlayerName] = useState("");
  const [country, setCountry] = useState("");
  const [height, setHeight] = useState(1.20);
  const [gender, setGender] = useState("");

  function handleStart() {
    if (!playerName.trim()) return;
    onStartGame({
      name: playerName,
      country,
      height,
      gender
    });
  }

  return (
    <div className={styles.body}>
      <div className={styles.siteContent}>
        <Header />
        <section className={styles.nameInputContainer}>
          <label className={styles.label}>Character Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite seu nome"
            value={playerName}
            onChange={(typing) => updatePlayerName(typing.target.value)}
          />
        </section>
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
        <section className={styles.heightSelectorContainer}>
          <label className={styles.label}>
            Altura do Personagem aos 20 anos: {height.toFixed(2).replace(".", ",")} m
          </label>
          <input
            type="range"
            className={styles.rangeInput}
            min="1.20"
            max="2.00"
            step="0.01"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
          />
        </section>
        <section className={styles.genderSelectorContainer}>
          <label className={styles.label}>Gênero</label>
          <select
            className={styles.input}
            value={gender}
            onChange={(e) => setGender(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>
        </section>
      </div>
    </div>
  )
}