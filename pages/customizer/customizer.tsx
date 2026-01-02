import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import styles from "./customizer.module.scss";

import Header from "../../components/header/header.tsx";
import GameDifficulty from "../../components/gameDifficulty/gameDifficulty.tsx";
import ThemeToggle from "../../components/themeToggle/themeToggle.tsx";

import NameInput from "./components/nameInput.tsx";
import CountrySelector from "./components/countrySelector.tsx";
import GenderSelector from "./components/genderSelector.tsx";
import SkinSelector from "./components/skinSelector/skinSelector.tsx";
import IncomeSelector from "./components/incomeSelector/incomeSelector.tsx";
import ErrorMessage from "./components/errorMessage/errorMessage.tsx";
import StartGameButton from "./components/startGameButton/startGameButton.tsx";

import { generateRandomStats } from "../../backend/services/utilities.ts";
import { saveCharacter } from "../../services/gameStorage.ts";

import {
  Character,
  Gender,
  SkinTone,
  Income,
} from "../../backend/data/character/types.ts";

import countries from "../../backend/data/character/countries.json" with { type: "json" };
type CountryCode = keyof typeof countries;

const Customizer: React.FC = () => {
  const router = useRouter();
  const goTo = (path: string) => router.push(path);
  const [playerName, setPlayerName] = useState<string>("");
  const [country, setCountry] = useState<CountryCode>("BR");
  const [skinTone, setSkinTone] = useState<SkinTone>({
    id: "middleTone",
    label: "Moreno",
    color: "#C68642",
  });
  const [income, setIncome] = useState<Income>({
    id: "middle",
    label: "Classe Média",
  });
  const [gender, setGender] = useState<Gender>({
    id: "male",
    label: "masculino", "pronoun": "ele",
    "possessive": "meu",
    "article": "um",
    "identity": "homem"
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const handleStartGame = (): void => {
    if (!playerName.trim() || !country || !gender || !income || !skinTone) {
      setErrorMessage("Preencha todos os campos!");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    const nameParts = playerName.trim().split(" ");
    const firstName = nameParts[0] || "Jogador";
    const lastName = nameParts.slice(1).join(" ") || "Anônimo";
    const stats = generateRandomStats();
    const countryData = countries[country];
    const character: Character = {
      firstName,
      lastName,
      demonym: countryData.demonym[gender.id],
      countryCode: country,
      countryData,
      gender,
      skinTone,
      income,
      stats: {
        health: stats[0],
        mentalHealth: stats[1],
        intellect: stats[2],
        beauty: stats[3],
      },
    };
    saveCharacter(character);
    goTo("/game/game");
  };
  const handleGenderChange = (value: string): void => {
    if (value === "male") {
      setGender({
        "id": "male",
        "label": "masculino",
        "pronoun": "ele",
        "possessive": "meu",
        "article": "um",
        "identity": "homem"
      });
    } else if (value === "female") {
      setGender({
        "id": "female",
        "label": "feminino",
        "pronoun": "ela",
        "possessive": "minha",
        "article": "uma",
        "identity": "mulher"
      });
    }
  };

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon.png"
        />
        <title>Customização</title>
      </Head>
      <div className={styles.body}>
        <ThemeToggle />
        <main className={styles.siteContent}>
          <Header />
          <NameInput playerName={playerName} setPlayerName={setPlayerName} />
          <CountrySelector country={country} setCountry={setCountry} />
          <GenderSelector
            gender={gender}
            handleGenderChange={handleGenderChange}
          />
          <SkinSelector
            skinTone={skinTone}
            gender={gender.id}
            setSkinTone={setSkinTone}
          />
          <IncomeSelector
            income={income}
            gender={gender.id}
            setIncome={setIncome}
          />
          <GameDifficulty income={income} skinTone={skinTone} />
          {errorMessage && (
            <ErrorMessage message={errorMessage} show={showError} />
          )}
          <StartGameButton onClick={handleStartGame} />
        </main>
      </div>
    </>
  );
};

export default Customizer;
