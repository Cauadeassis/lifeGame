import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import styles from "./randomizer.module.scss";

import Header from "../../components/header/header.tsx";
import GameDifficulty from "../../components/gameDifficulty/gameDifficulty.tsx";
import ThemeToggle from "../../components/themeToggle/themeToggle.tsx";

import { Character } from "../../backend/data/character/types.ts";

const Randomizer: React.FC = () => {
  const router = useRouter();
  const goTo = (path: string) => router.push(path);
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getCharacter = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/characterGenerator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao gerar personagem: ${response.status}`);
      }

      const newCharacter: Character = await response.json();
      setCharacter(newCharacter);
    } catch (error) {
      console.error("Erro ao gerar personagem:", error);
      alert("Não foi possível gerar o personagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacter();
  }, []);

  const handleStartGame = (): void => {
    if (!character) {
      alert("Por favor, gere um personagem primeiro!");
      return;
    }
    localStorage.setItem("character", JSON.stringify(character));
    goTo("/game/game");
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
        <title>Randomização</title>
      </Head>

      <div className={styles.body}>
        <ThemeToggle />
        <main>
          <Header />
          {loading && (
            <div className={styles.loadingContainer}>
              <p>Gerando personagem...</p>
            </div>
          )}
          {character && !loading && (
            <>
              <section>
                <h2>
                  {character.firstName} {character.lastName}
                </h2>
                <div>
                  <p>País: {character.countryData.name}</p>
                  <p>Gênero: {character.gender.label}</p>
                  <p>Cor de pele: {character.skinTone.label}</p>
                  <p>Renda: {character.income.label}</p>
                </div>
              </section>
              <GameDifficulty
                income={character.income}
                skinTone={character.skinTone}
              />
            </>
          )}
          <section>
            <button
              type="button"
              onClick={handleStartGame}
              disabled={loading || !character}
              aria-label="Começar jogo com personagem atual"
            >
              {loading ? "Gerando..." : "Jogar"}
            </button>
            <button
              type="button"
              onClick={getCharacter}
              disabled={loading}
              aria-label="Gerar novo personagem"
            >
              {loading ? "Gerando..." : "Gerar novo personagem"}
            </button>
          </section>
        </main>
      </div>
    </>
  );
};

export default Randomizer;

/**
 * ]
 */
