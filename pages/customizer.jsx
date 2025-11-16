import React, { useState } from "react";
import styles from "../styles/pages/customizer.module.css";
import Header from "../components/header";
import Head from "next/head";
import SkinSelector from "../components/skinSelector";
import IncomeSelector from "../components/incomeSelector";
import GameDifficulty from "../components/gameDifficulty";

export default function Customizer() {
  const [playerName, updatePlayerName] = useState("");
  const [country, setCountry] = useState("");
  const [skinTone, setSkinTone] = useState({ id: "middleTone", label: "Moreno" });
  const [income, setIncome] = useState({ id: "middle", label: "Classe Média" });
  const [difficulty, setDifficulty] = useState(3);
  const [gender, setGender] = useState("");

  function onStartGame(character) {
    localStorage.setItem("character", JSON.stringify(character));
    window.location.href = "/game";
  }
  function handleStartGame() {
    if (!playerName || !country || !gender || !income || !skinTone) {
      alert("Preencha todos os campos!");
      return;
    }
    onStartGame({
      name: playerName,
      country,
      gender,
      income,
      skinTone,
    });
  }

  return (
    <>
      <Head>
        <title>Customização</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.siteContent}>
          <Header />
          <section className={styles.section}>
            <label className={styles.label}>Nome</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Digite seu nome"
              value={playerName}
              onChange={(typing) => updatePlayerName(typing.target.value)}
            />
          </section>
          <section className={styles.section}>
            <label className={styles.label}>País de Origem</label>
            <select
              className={styles.input}
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="BR">Brasil</option>
              <option value="US">Estados Unidos</option>
              <option value="JP">Japão</option>
              <option value="DE">Alemanha</option>
              <option value="FR">França</option>
            </select>
          </section>
          <section className={styles.section}>
            <label className={styles.label}>Gênero</label>
            <select
              className={styles.input}
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </section>
          <SkinSelector
            skinTone={skinTone}
            gender={gender || "male"}
            setSkinTone={setSkinTone}
            className={styles.section}
          />
          <IncomeSelector
            income={income}
            gender={gender || "male"}
            setIncome={setIncome}
            className={styles.section}
          />
          <GameDifficulty
            income={income}
            skinTone={skinTone}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            className={styles.section}
          />
          <section className={styles.section}>
            <button
              className={styles.startGameButton}
              onClick={() => handleStartGame()}
            >
              Vamos jogar
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
