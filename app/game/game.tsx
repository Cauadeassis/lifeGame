"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./game.module.css";

import Header from "../../components/header";
import ThemeToggle from "../../components/themeToggle";

import EventService from "../../backend/services/eventService";
const eventService = new EventService();

import {
  PlayerMessage,
  ParentMessage,
} from "./components/ui/descriptionContainer";
import { LoadingFallback, NoCharacterFallback } from "./components/ui/fallback";
import ActionButton from "./components/ui/actionButton";
import AdvanceYearButton from "./components/ui/advanceYearButton";
import StatBar from "./components/ui/statBar";
import EventCard from "./components/ui/eventCard";

import users from "./components/icons/Users.svg";
import graduationCap from "./components/icons/GraduationCap.svg";

import {
  loadGame,
  createGame,
  saveGame,
  GameState,
  GameData,
} from "../../services/gameStorage";
import { advanceYear, applyStatsChange } from "../../services/gameLogic";

import { Character, Stats } from "../../backend/data/character/types";
import { Event, Option, Result } from "../../backend/data/events/types";

const STORAGE_KEY = "player";
const GAME_STATE_KEY = "gameState";

export default function Game() {
  const router = useRouter();
  const lower = (text: string) => text.toLowerCase();

  const [player, setPlayer] = useState<Character | null>(null);
  const [father, setFather] = useState<Character | null>(null);
  const [mother, setMother] = useState<Character | null>(null);
  const [child, setChild] = useState<Character | null>(null);
  const [stats, setStats] = useState<Stats>({
    health: 60,
    mentalHealth: 60,
    intellect: 60,
    beauty: 60,
  });
  const [age, setAge] = useState<number>(0);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isGameIniting, setIsGameIniting] = useState<boolean>(true);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const initGame = async () => {
      try {
        const rawPlayer = localStorage.getItem(STORAGE_KEY);
        const savedPlayer: Character | null = rawPlayer
          ? JSON.parse(rawPlayer)
          : null;

        if (!savedPlayer) {
          console.error("Nenhum personagem encontrado");
          return;
        }

        const savedGameState = localStorage.getItem(GAME_STATE_KEY);
        const gameState: GameState | null = savedGameState
          ? JSON.parse(savedGameState)
          : null;

        const gameData: GameData = gameState
          ? loadGame({ savedPlayer, gameState })
          : await createGame(savedPlayer);

        setPlayer(gameData.player);
        setStats(gameData.stats);
        setAge(gameData.age);
        setCurrentEvent(gameData.currentEvent);
        setFather(gameData.father);
        setMother(gameData.mother);
        setChild(gameData.child);
      } catch (error) {
        console.error("Erro ao inicializar jogo:", error);
      } finally {
        setIsGameIniting(false);
      }
    };

    initGame();
  }, []);

  useEffect(() => {
    if (player && !isGameIniting) {
      const gameState: GameState = {
        stats,
        age,
        currentEvent,
        father: father || null,
        mother: mother || null,
        child: child || null,
      };
      saveGame(gameState);
    }
  }, [stats, age, father, mother, player, isGameIniting, currentEvent]);

  const handleAdvanceYear = (): void => {
    if (player)
{    const { newAge, newStats, newEvent } = advanceYear(player);
    setAge(newAge);
    setStats(newStats);
    setCurrentEvent(newEvent);}
  };

  const handleOptionSelect = (option: Option) => {
    const result = eventService.resolveOption(option);

    setResult(result);
    if (result.effects) {
      const newStats = applyStatsChange({
        currentStats: stats,
        changes: result.effects,
      });
      setStats(newStats);
    }
    setTimeout(() => {
      setCurrentEvent(null);
      setResult(null);
    }, 3000);
  };

  if (isGameIniting) return <LoadingFallback />;

  if (!player || !stats) return <NoCharacterFallback />;

  if (currentEvent)
    return (
      <EventCard event={currentEvent} onOptionSelect={handleOptionSelect} />
    );
  return (
    <div className={styles.body}>
      <Header />
      <ThemeToggle />

      <section className={styles.headerContainer}>
        <h1>
          {player.firstName} {player.lastName}
        </h1>
        <p>{age} anos</p>
      </section>

      <section className={styles.descriptionContainer}>
        <h2>Sobre</h2>
        <PlayerMessage player={player} />
        <ParentMessage character={father} parent="pai" />
        <ParentMessage character={mother} parent="mãe" />
      </section>

      <section className={styles.eventsContainer}>
        <h2>Eventos do ano</h2>
        <ul>
          <li>
            <p>Sei lá</p>
          </li>
        </ul>
      </section>

      <section className={styles.statsContainer}>
        <h2>Atributos</h2>
        <StatBar label="Saúde" value={stats.health} icon="heart" />
        <StatBar label="Beleza" value={stats.beauty} icon="sparkles" />
        <StatBar label="Intelecto" value={stats.intellect} icon="brain" />
        <StatBar label="Felicidade" value={stats.mentalHealth} icon="smile" />
      </section>

      <section className={styles.actionsContainer}>
        <ActionButton
          icon={graduationCap}
          label="Escola"
          onClick={() => router.push("school")}
        />
        <AdvanceYearButton onClick={handleAdvanceYear} />
        <ActionButton
          icon={users}
          label="Relacionamentos"
          onClick={() => router.push("relationship")}
        />
      </section>
    </div>
  );
}
