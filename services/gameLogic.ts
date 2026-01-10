import { Character, Stats, CharacterActivities } from "../backend/data/character/types";
import { Event } from "../backend/data/events/types";

import EventService from "../backend/services/eventService";
const eventService = new EventService();

const clamp = (value: number): number => Math.max(0, Math.min(100, value));

interface applyStatsChangeProps {
  currentStats: Stats;
  changes: Partial<Stats>;
}

interface AdvanceYearResult {
  newAge: number;
  newStats: Stats;
  newEvent: Event;
}

export function applyStatsChange({
  currentStats,
  changes,
}: applyStatsChangeProps) {
  return {
    health: clamp(currentStats.health + (changes.health ?? 0)),
    beauty: clamp(currentStats.beauty + (changes.beauty ?? 0)),
    intellect: clamp(currentStats.intellect + (changes.intellect ?? 0)),
    mentalHealth: clamp(
      currentStats.mentalHealth + (changes.mentalHealth ?? 0),
    ),
  };
}

export function advanceYear(player: Character) : AdvanceYearResult {
  const { age, stats, income, academic, career, freelance } = player;
  let updatedStats = { ...stats };

  const characterActivities = {
    academic,
    career,
    freelance,
  } as CharacterActivities;

  const event = eventService.getRandomEvent({ characterActivities, age });

  return {
    newAge: age + 1,
    newStats: updatedStats,
    newEvent: event,
  };
}
