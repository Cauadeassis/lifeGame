import React, { useEffect, useState } from "react";
import styles from "./game.module.css";
import Header from "../../components/header/header.jsx";
import { generateRandomStatus } from "../../models/randomizer";
import namesByCountry from "../../data/namesByCountry.json";
import StatBar from "./components/ui/statBar/statBar.jsx";
import ThemeToggle from "../../components/themeToggle/themeToggle.jsx";
import ActionsContainer from "./components/ui/actionsContainer/actionsContainer.jsx";

const STORAGE_KEY = "character";
const GAME_STATE_KEY = "gameState";

export default function Game() {
  const [character, setCharacter] = useState(null);
  const [stats, setStats] = useState(null);
  const [age, setAge] = useState(1);
  const [timeline, setTimeline] = useState([]);
  const [currentYearEvents, setCurrentYearEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGameData = () => {
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
          // Primeiro jogo - gerar stats iniciais
          const [health, intellect, beauty, mentalHealth] =
            generateRandomStatus();
          const initialStats = { health, beauty, intellect, mentalHealth };
          setStats(initialStats);

          // Gerar eventos do primeiro ano
          const firstYearEvents = generateYearEvents(
            1,
            initialStats,
            JSON.parse(savedCharacter),
          );
          setCurrentYearEvents(firstYearEvents);
        }
      } catch (error) {
        console.error("Failed to load game data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGameData();
  }, []);

  // Salvar progresso automaticamente
  const saveGame = (newStats, newAge, newTimeline, newEvents) => {
    try {
      const gameState = {
        stats: newStats,
        age: newAge,
        timeline: newTimeline,
        currentYearEvents: newEvents,
      };
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.error("Failed to save game:", error);
    }
  };

  // Gerar eventos do ano baseado em contexto
  const generateYearEvents = (currentAge, currentStats, char) => {
    const events = [];
    const numEvents = Math.floor(Math.random() * 3) + 1; // 1-3 eventos por ano

    for (let i = 0; i < numEvents; i++) {
      const event = generateContextualEvent(currentAge, currentStats, char);
      if (event) events.push(event);
    }

    return events.length > 0
      ? events
      : [
        {
          description: "Foi um ano tranquilo.",
          statsChange: {},
        },
      ];
  };

  // Gerar evento baseado no contexto
  const generateContextualEvent = (currentAge, currentStats, char) => {
    const eventPool = [];

    // Eventos de infância (0-12)
    if (currentAge <= 12) {
      eventPool.push(
        {
          description: "Aprendeu a andar de bicicleta!",
          statsChange: { health: 2, mentalHealth: 5 },
        },
        {
          description: "Fez um novo melhor amigo na escola.",
          statsChange: { mentalHealth: 8 },
        },
        {
          description: "Ganhou um prêmio na feira de ciências.",
          statsChange: { intellect: 5, mentalHealth: 3 },
        },
        {
          description: "Ficou doente e perdeu algumas aulas.",
          statsChange: { health: -5, intellect: -2 },
        },
        {
          description: "Começou a praticar um esporte.",
          statsChange: { health: 5, beauty: 2 },
        },
      );
    }

    // Eventos de adolescência (13-17)
    if (currentAge >= 13 && currentAge <= 17) {
      eventPool.push(
        {
          description: "Passou em todas as matérias com boas notas.",
          statsChange: { intellect: 8, mentalHealth: 5 },
        },
        {
          description: "Começou a se interessar por um hobby novo.",
          statsChange: { mentalHealth: 6 },
        },
        {
          description: "Teve conflitos com os pais.",
          statsChange: { mentalHealth: -8 },
        },
        {
          description: "Entrou para um clube na escola.",
          statsChange: { mentalHealth: 7, intellect: 3 },
        },
        {
          description: "Sofreu bullying na escola.",
          statsChange: { mentalHealth: -12, beauty: -3 },
        },
      );
    }

    // Eventos de juventude (18-25)
    if (currentAge >= 18 && currentAge <= 25) {
      eventPool.push(
        {
          description: "Entrou na universidade!",
          statsChange: { intellect: 10, mentalHealth: 8 },
        },
        {
          description: "Conseguiu o primeiro emprego.",
          statsChange: { mentalHealth: 7, intellect: 5 },
        },
        {
          description: "Fez uma viagem incrível.",
          statsChange: { mentalHealth: 15, beauty: 3 },
        },
        {
          description: "Estresse com estudos e trabalho.",
          statsChange: { mentalHealth: -10, health: -5 },
        },
        {
          description: "Conheceu pessoas inspiradoras.",
          statsChange: { mentalHealth: 10, intellect: 5 },
        },
      );
    }

    // Eventos de vida adulta (26+)
    if (currentAge >= 26) {
      eventPool.push(
        {
          description: "Recebeu uma promoção no trabalho.",
          statsChange: { mentalHealth: 12, intellect: 5 },
        },
        {
          description: "Começou a cuidar melhor da saúde.",
          statsChange: { health: 10, beauty: 5 },
        },
        {
          description: "Passou por uma fase difícil.",
          statsChange: { mentalHealth: -15, health: -8 },
        },
        {
          description: "Alcançou um objetivo importante.",
          statsChange: { mentalHealth: 20, intellect: 8 },
        },
        {
          description: "Formou laços familiares mais fortes.",
          statsChange: { mentalHealth: 10 },
        },
      );
    }

    // Eventos baseados em stats baixos
    if (currentStats.health < 30) {
      eventPool.push({
        description: "Precisou ir ao médico.",
        statsChange: { health: 5, mentalHealth: -3 },
      });
    }
    if (currentStats.mentalHealth < 30) {
      eventPool.push({
        description: "Buscou ajuda para melhorar o bem-estar.",
        statsChange: { mentalHealth: 15 },
      });
    }
    if (currentStats.intellect < 30) {
      eventPool.push({
        description: "Fez cursos para se atualizar.",
        statsChange: { intellect: 10 },
      });
    }

    // Eventos baseados em classe social
    if (char?.income?.id === "low") {
      eventPool.push({
        description: "Enfrentou dificuldades financeiras.",
        statsChange: { mentalHealth: -8 },
      });
    } else if (char?.income?.id === "high") {
      eventPool.push({
        description: "Aproveitou oportunidades únicas.",
        statsChange: { mentalHealth: 8, intellect: 5 },
      });
    }

    return eventPool[Math.floor(Math.random() * eventPool.length)];
  };

  // Aplicar mudanças de stats com limites
  const applyStatsChange = (currentStats, changes) => {
    const clamp = (value) => Math.max(0, Math.min(100, value));

    return {
      health: clamp(currentStats.health + (changes.health || 0)),
      beauty: clamp(currentStats.beauty + (changes.beauty || 0)),
      intellect: clamp(currentStats.intellect + (changes.intellect || 0)),
      mentalHealth: clamp(
        currentStats.mentalHealth + (changes.mentalHealth || 0),
      ),
    };
  };

  // Avançar ano
  const handleAdvanceYear = () => {
    const newAge = age + 1;

    // Aplicar mudanças dos eventos do ano atual
    let updatedStats = { ...stats };
    currentYearEvents.forEach((event) => {
      updatedStats = applyStatsChange(updatedStats, event.statsChange);
    });

    // Envelhecimento natural (pequena degradação após 30 anos)
    if (newAge >= 30) {
      updatedStats = applyStatsChange(updatedStats, {
        health: -1,
        beauty: -0.5,
      });
    }

    // Verificar game over
    if (updatedStats.health <= 0) {
      alert("Sua saúde chegou ao limite... Fim de jogo!");
      handleResetGame();
      return;
    }

    if (newAge >= 100) {
      alert("Você viveu 100 anos! Que vida incrível! Fim de jogo.");
      handleResetGame();
      return;
    }

    // Adicionar ano ao histórico
    const newTimeline = [
      ...timeline,
      {
        age,
        events: currentYearEvents,
        finalStats: updatedStats,
      },
    ];

    // Gerar eventos do próximo ano
    const nextYearEvents = generateYearEvents(newAge, updatedStats, character);

    // Atualizar estado
    setAge(newAge);
    setStats(updatedStats);
    setTimeline(newTimeline);
    setCurrentYearEvents(nextYearEvents);

    // Salvar progresso
    saveGame(updatedStats, newAge, newTimeline, nextYearEvents);
  };

  // Resetar jogo
  const handleResetGame = () => {
    if (window.confirm("Deseja começar uma nova vida?")) {
      localStorage.removeItem(GAME_STATE_KEY);
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  if (isLoading || !character || !stats) {
    return (
      <div className={styles.body}>
        <Header />
        <p>Carregando personagem...</p>
      </div>
    );
  }

  const getDemonym = () => {
    return (
      namesByCountry[character.country]?.demonym[character.gender.id] || ""
    );
  };

  const lower = (text) => text?.toLowerCase() || "";

  return (
    <div className={styles.body}>
      <Header />
      <ThemeToggle />
      <section className={styles.characterHeader}>
        <div>
          <h1>
            {character.firstName} {character.lastName}
          </h1>
          <p>
            {age} {age === 1 ? "ano" : "anos"}
          </p>
        </div>
      </section>

      <section className={styles.characterDescription}>
        <h2>Sobre</h2>
        <p>
          Olá! Sou {lower(character.skinTone.label)}, {getDemonym()} e venho de
          uma família {lower(character.income.label)}.
        </p>
      </section>

      <section className={styles.statsContainer}>
        <h2>Atributos</h2>
        <StatBar label="Saúde" value={stats.health} icon="heart" />
        <StatBar label="Beleza" value={stats.beauty} icon="sparkles" />
        <StatBar label="Intelecto" value={stats.intellect} icon="brain" />
        <StatBar label="Felicidade" value={stats.mentalHealth} icon="smile" />
      </section>

      <section className={styles.eventsContainer}>
        <h2>Acontecimentos do Ano</h2>
        <ul>
          {currentYearEvents.map((event, index) => (
            <li key={index}>
              <p>{event.description}</p>
              {Object.keys(event.statsChange).length > 0 && (
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginTop: "4px",
                  }}
                >
                  {Object.entries(event.statsChange).map(
                    ([stat, value]) =>
                      value !== 0 && (
                        <span key={stat} style={{ marginRight: "8px" }}>
                          {stat}: {value > 0 ? "+" : ""}
                          {value}
                        </span>
                      ),
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <ActionsContainer onAdvanceYear={handleAdvanceYear} />
    </div>
  );
}
