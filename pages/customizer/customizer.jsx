import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./customizer.module.css";
import Header from "../../components/header/header.jsx";
import SkinSelector from "./components/skinSelector.jsx";
import IncomeSelector from "./components/incomeSelector.jsx";
import GameDifficulty from "../../components/gameDifficulty/gameDifficulty.jsx";
import ThemeToggle from "../../components/themeToggle/themeToggle.jsx";
export default function Customizer() {
  const router = useRouter();
  const [playerName, updatePlayerName] = useState("");
  const [country, setCountry] = useState("");
  const [skinTone, setSkinTone] = useState({
    id: "middleTone",
    label: "Moreno",
  });
  const [income, setIncome] = useState({ id: "middle", label: "Classe Média" });
  const [difficulty, setDifficulty] = useState(3);
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  function onStartGame(character) {
    localStorage.setItem("character", JSON.stringify(character));
    router.push("../game/game");
  }
  function handleStartGame() {
    if (!playerName || !country || !gender || !income || !skinTone) {
      setErrorMessage("Preencha todos os campos!");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1000);
      return;
    }
    setShowError(false);
    setErrorMessage("");
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
        <ThemeToggle />
        <div className={styles.siteContent}>
          <Header />
          <section className={styles.section}>
            <label htmlFor="playerName" className={styles.label}>
              Nome
            </label>
            <input
              id="playerName"
              type="text"
              className={styles.input}
              placeholder="Digite seu nome"
              value={playerName}
              onChange={(typing) => updatePlayerName(typing.target.value)}
            />
          </section>
          <section className={styles.section}>
            <label htmlFor="country" className={styles.label}>
              País de Origem
            </label>
            <select
              id="country"
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
            <label htmlFor="gender" className={styles.label}>
              Gênero
            </label>
            <select
              id="gender"
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
          {errorMessage && (
            <p
              className={`${styles.errorMessage} ${!showError ? styles.fadeOut : ""
                }`}
            >
              {errorMessage}
            </p>
          )}
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
