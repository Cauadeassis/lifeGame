import React, { useEffect, useState } from "react";
import styles from "./game.module.css";
import Header from "../../components/header/header.jsx";
import ThemeToggle from "../../components/themeToggle/themeToggle.jsx";
import ActionsContainer from "./components/ui/actionsContainer/actionsContainer.jsx";
import StatBar from "./components/ui/statBar/statBar.jsx";

import { generateYearEvents, advanceYear } from "./gameLogic";

const STORAGE_KEY = "character";
const GAME_STATE_KEY = "gameState";

export default function Game() {
  const [character, setCharacter] = useState(null);
  const [stats, setStats] = useState(null);
  const [age, setAge] = useState(1);
  const [timeline, setTimeline] = useState([]);
  const [currentYearEvents, setCurrentYearEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function lower(text) {
    return text.toLowerCase();
  }

  useEffect(() => {
    try {
      const savedCharacter = localStorage.getItem(STORAGE_KEY);
      const savedGameState = localStorage.getItem(GAME_STATE_KEY);

      if (!savedCharacter) {
        console.error("Nenhum personagem encontrado!");
        setIsLoading(false);
        return;
      }

      const parsedCharacter = JSON.parse(savedCharacter);
      setCharacter(parsedCharacter);

      if (savedGameState) {

        const gameState = JSON.parse(savedGameState);
        setStats(gameState.stats);
        setAge(gameState.age);
        setTimeline(gameState.timeline || []);
        setCurrentYearEvents(gameState.currentYearEvents || []);
      } else {
        const initialStats = {
          health: parsedCharacter.status.health,
          beauty: parsedCharacter.status.beauty,
          intellect: parsedCharacter.status.intellect,
          mentalHealth: parsedCharacter.status.mentalHealth,
        };

        setStats(initialStats);

        const firstYearEvents = generateYearEvents(
          1,
          initialStats,
          parsedCharacter,
          /*generateContextualEvent,*/
        );

        setCurrentYearEvents(firstYearEvents);
      }
    } catch (error) {
      console.error("Erro ao carregar personagem:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveGame = (stats, age, timeline, events) => {
    localStorage.setItem(
      GAME_STATE_KEY,
      JSON.stringify({ stats, age, timeline, currentYearEvents: events }),
    );
  };

  const handleAdvanceYear = () => {
    const { newAge, newStats, newTimeline } = advanceYear({
      age,
      stats,
      timeline,
      currentYearEvents,
    });

    const nextEvents = generateYearEvents(
      newAge,
      newStats,
      character,
      /*generateContextualEvent*/
    );

    setAge(newAge);
    setStats(newStats);
    setTimeline(newTimeline);
    setCurrentYearEvents(nextEvents);

    saveGame(newStats, newAge, newTimeline, nextEvents);
  };

  if (isLoading) {
    return (
      <div className={styles.body}>
        <p>Carregando personagem...</p>
      </div>
    );
  }

  if (!character || !stats) {
    return (
      <div className={styles.body}>
        <p>Nenhum personagem encontrado. Por favor, crie um personagem primeiro.</p>
        <button onClick={() => window.location.href = "/randomizer"}>
          Criar Personagem
        </button>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <Header />
      <ThemeToggle />

      <section>
        <h2>
          {character.firstName} {character.lastName}
        </h2>
        <h2>{age} anos</h2>
      </section>

      <section>
        <h2>Sobre</h2>
        <p>
          Olá! Sou {lower(character.skinTone.label)}, {character.demonym}.
        </p>
      </section>

      <section>
        <StatBar label="Saúde" value={stats.health} icon="heart" />
        <StatBar label="Beleza" value={stats.beauty} icon="sparkles" />
        <StatBar label="Intelecto" value={stats.intellect} icon="brain" />
        <StatBar label="Felicidade" value={stats.mentalHealth} icon="smile" />
      </section>

      <ActionsContainer onAdvanceYear={handleAdvanceYear} />
    </div>
  );
}
