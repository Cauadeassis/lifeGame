import React, { useState } from "react";
import styles from "../styles/pages/customizer.module.css"
import Header from "../components/header"
import SkinSelector from "../components/skinSelector";

export default function Customizer() {
  const [playerName, updatePlayerName] = useState("");
  const [country, setCountry] = useState("");
  const [income, setIncome] = useState("");
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
        <SkinSelector />
        <section className={styles.incomeContainer}>
          <label className={styles.label}>Renda Inicial</label>
          <div className={styles.incomeOptions}>
            {['poor', 'middleClass', 'rich'].map((option) => (
              <button
                key={option}
                className={`${styles.incomeButton} ${income === option ? styles.selected : ''}`}
                onClick={() => setIncome(option)}
              >
                {option === 'poor' && 'Pobre'}
                {option === 'middleClass' && 'Classe Média'}
                {option === 'rich' && 'Rico'}
              </button>
            ))}
          </div>
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
      </div>
    </div>
  )
}