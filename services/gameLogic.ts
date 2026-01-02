import { Character, Stats } from "../backend/data/character/types.ts";
import { Event } from "../backend/data/events/types.ts";

import EventService from "../backend/services/eventService.ts";
const eventService = new EventService();

const clamp = (value: number): number => Math.max(0, Math.min(100, value));

interface applyStatsChangeParameters {
  currentStats: Stats;
  changes: Partial<Stats>;
}

interface AdvanceYearParameters {
  age: number;
  stats: Stats;
  career?: string;
  freelance?: string;
  academic?: string;
}
interface AdvanceYearResult {
  newAge: number;
  newStats: Stats;
  newEvent: Event | null;
}

export function applyStatsChange({
  currentStats,
  changes,
}: applyStatsChangeParameters) {
  return {
    health: clamp(currentStats.health + (changes.health ?? 0)),
    beauty: clamp(currentStats.beauty + (changes.beauty ?? 0)),
    intellect: clamp(currentStats.intellect + (changes.intellect ?? 0)),
    mentalHealth: clamp(
      currentStats.mentalHealth + (changes.mentalHealth ?? 0),
    ),
  };
}

export function advanceYear({
  age,
  stats,
  career,
  freelance,
  academic,
}: AdvanceYearParameters): AdvanceYearResult {
  let updatedStats = { ...stats };

  const event = eventService.getRandomEvent({
    age,
    career,
    freelance,
    academic,
  });

  return {
    newAge: age + 1,
    newStats: updatedStats,
    newEvent: event,
  };
}
