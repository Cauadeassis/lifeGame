"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./randomizer.module.css";

import Header from "../../components/header";
import GameDifficulty from "../../components/gameDifficulty";
import ThemeToggle from "../../components/themeToggle";

import { Character } from "../../backend/data/character/types";
const Randomizer = () => {
  const router = useRouter();
  const [player, setPlayer] = useState<Character | null>(null);
  const [isGettingPlayer, setIsGettingPlayer] = useState<boolean>(false);

  const getPlayer = async (): Promise<void> => {
    setIsGettingPlayer(true);
    try {
      const response = await fetch("/api/generate-player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao gerar jogador: ${response.status}`);
      }

      const newPlayer: Character = await response.json();
      setPlayer(newPlayer);
    } catch (error) {
      console.error("Erro ao gerar jogador:", error);
      alert("Não foi possível gerar o jogador. Tente novamente.");
    } finally {
      setIsGettingPlayer(false);
    }
  };

  useEffect(() => {
    getPlayer();
  }, []);

  const handleStartGame = (): void => {
    if (!player) {
      alert("Por favor, gere um jogador primeiro!");
      return;
    }
    localStorage.setItem("player", JSON.stringify(player));
    router.push("/game");
  };

  return (
    <>
      <div className={styles.body}>
        <ThemeToggle />
        <main>
          <Header />
          {isGettingPlayer && (
            <div className={styles.loadingContainer}>
              <p>Gerando jogador...</p>
            </div>
          )}
          {player && !isGettingPlayer && (
            <>
              <section>
                <h2>
                  {player.firstName} {player.lastName}
                </h2>
                <div>
                  <p>País: {player.countryData.name}</p>
                  <p>Gênero: {player.gender.label}</p>
                  <p>Cor de pele: {player.skinTone.label}</p>
                  <p>Renda: {player.income.label}</p>
                </div>
              </section>
              <GameDifficulty
                income={player.income}
                skinTone={player.skinTone}
              />
            </>
          )}
          <section>
            <button
              type="button"
              onClick={handleStartGame}
              disabled={isGettingPlayer || !player}
              aria-label="Começar jogo com jogador atual"
            >
              {isGettingPlayer ? "Gerando..." : "Jogar"}
            </button>
            <button
              type="button"
              onClick={getPlayer}
              disabled={isGettingPlayer}
              aria-label="Gerar novo jogador"
            >
              {isGettingPlayer ? "Gerando..." : "Gerar novo jogador"}
            </button>
          </section>
        </main>
      </div>
    </>
  );
};

export default Randomizer;
