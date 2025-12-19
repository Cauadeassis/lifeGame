import React, { useEffect, useState } from "react";
import styles from "./game.module.css";
import Header from "../../components/header/header.jsx";
import ThemeToggle from "../../components/themeToggle/themeToggle.jsx";
import ActionsContainer from "./components/ui/actionsContainer/actionsContainer.jsx";
import StatBar from "./components/ui/statBar/statBar.jsx";

import { generateRandomStatus } from "../../models/randomizer";
import namesByCountry from "../../data/namesByCountry.json";

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
  function getDemonym(country, gender) {
    return namesByCountry[country].demonym[gender];
  }

  useEffect(() => {
    try {
      const savedCharacter = localStorage.getItem(STORAGE_KEY);
      const savedGameState = localStorage.getItem(GAME_STATE_KEY);

      if (savedCharacter) {
        setCharacter(JSON.parse(savedCharacter));
      }

      if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        setStats(gameState.stats);
        setAge(gameState.age);
        setTimeline(gameState.timeline || []);
        setCurrentYearEvents(gameState.currentYearEvents || []);
      } else {
        const [health, intellect, beauty, mentalHealth] =
          generateRandomStatus();

        const initialStats = {
          health,
          beauty,
          intellect,
          mentalHealth,
        };

        setStats(initialStats);

        const firstYearEvents = generateYearEvents(
          1,
          initialStats,
          JSON.parse(savedCharacter),
          generateContextualEvent
        );

        setCurrentYearEvents(firstYearEvents);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveGame = (stats, age, timeline, events) => {
    localStorage.setItem(
      GAME_STATE_KEY,
      JSON.stringify({ stats, age, timeline, currentYearEvents: events })
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
      generateContextualEvent
    );

    setAge(newAge);
    setStats(newStats);
    setTimeline(newTimeline);
    setCurrentYearEvents(nextEvents);

    saveGame(newStats, newAge, newTimeline, nextEvents);
  };

  if (isLoading || !character || !stats) {
    return <p>Carregando personagem...</p>;
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
        <p>
          Olá! Sou {lower(character.skinTone.label)},{" "}
          {getDemonym()}.
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
