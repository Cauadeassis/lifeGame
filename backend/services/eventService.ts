import { getRandomItem } from "./utilities";
import { Event, Option, Result, Risk } from "../data/events/types";

import birthEvents from "../data/events/age/birth.json";
import babyEvents from "../data/events/age/baby.json";
import childEvents from "../data/events/age/child.json";
import pubertyEvents from "../data/events/age/puberty.json";
import teenagerEvents from "../data/events/age/teenager.json";
import adultEvents from "../data/events/age/adult.json";
import elderlyEvents from "../data/events/age/elderly.json";

interface GetAvailableEventsParameters {
  age: number;
  career?: string;
  freelance?: string;
  academic?: string;
}

const ageEventsMap = {
  birth: birthEvents as Event[],
  baby: babyEvents as Event[],
  child: childEvents as Event[],
  puberty: pubertyEvents as Event[],
  teenager: teenagerEvents as Event[],
  adult: adultEvents as Event[],
  elderly: elderlyEvents as Event[],
} as const;

type AgeState = keyof typeof ageEventsMap;

class EventService {
  private eventsCache: Map<string, Event[]>;

  constructor() {
    this.eventsCache = new Map();
  }

  private getAgeState(age: number): AgeState {
    if (age === 0) return "birth";
    if (age > 0 && age <= 5) return "baby";
    if (age > 5 && age <= 11) return "child";
    if (age > 11 && age <= 13) return "puberty";
    if (age > 13 && age <= 17) return "teenager";
    if (age > 17 && age < 60) return "adult";
    return "elderly";
  }

  private getAgeEvents(ageState: AgeState): Event[] {
    return ageEventsMap[ageState];
  }

  private async loadDynamicEvents(
    type: "academic" | "career" | "freelance",
    name: string
  ): Promise<Event[]> {
    const cacheKey = `${type}:${name}`;

    if (this.eventsCache.has(cacheKey)) {
      return this.eventsCache.get(cacheKey)!;
    }

    try {
      let events: Event[];
      switch (type) {
        case "academic":
          events = (await import(`../data/events/academic/${name}.json`)).default as Event[];
          break;
        case "career":
          events = (await import(`../data/events/jobs/careers/${name}.json`)).default as Event[];
          break;
        case "freelance":
          events = (await import(`../data/events/jobs/${name}.json`)).default as Event[];
          break;
        default:
          return [];
      }

      this.eventsCache.set(cacheKey, events);
      return events;
    } catch (error) {
      console.error(`Failed to load ${type} events for ${name}:`, error);
      return [];
    }
  }

  public async getAvailableEvents({
    age,
    career,
    freelance,
    academic,
  }: GetAvailableEventsParameters): Promise<Event[]> {
    const allEvents: Event[] = [];

    const ageState = this.getAgeState(age);
    const ageEvents = this.getAgeEvents(ageState);
    allEvents.push(...ageEvents);

    if (academic) {
      const academicEvents = await this.loadDynamicEvents("academic", academic);
      allEvents.push(...academicEvents);
    }

    if (career) {
      const careerEvents = await this.loadDynamicEvents("career", career);
      allEvents.push(...careerEvents);
    }

    if (freelance) {
      const freelanceEvents = await this.loadDynamicEvents("freelance", freelance);
      allEvents.push(...freelanceEvents);
    }

    return allEvents;
  }

  public async getRandomEvent({
    age,
    career,
    freelance,
    academic,
  }: GetAvailableEventsParameters): Promise<Event | null> {
    const availableEvents = await this.getAvailableEvents({
      age,
      career,
      freelance,
      academic,
    });

    if (availableEvents.length === 0) return null;

    return getRandomItem(availableEvents);
  }

  public resolveOption(optionChosen: Option): Result {
    const result: Result = {
      text: optionChosen.text,
      effects: optionChosen.effects || {},
      message: optionChosen.message || "",
    };

    if (optionChosen.risk) {
      const riskResult = this.resolveRisk(optionChosen.risk);
      return riskResult;
    }

    return result;
  }

  private resolveRisk(risk: Risk): Result {
    const chance = Math.max(0, Math.min(1, risk.chance));
    const roll = Math.random();

    const outcome = roll < chance ? risk.onFail : risk.onSuccess;

    if (outcome.risk) {
      return this.resolveRisk(outcome.risk);
    }

    return {
      text: outcome.text,
      effects: outcome.effects || {},
      message: outcome.message,
    };
  }

  public clearCache(): void {
    this.eventsCache.clear();
  }

  public getCacheStats(): { size: number; categories: string[] } {
    return {
      size: this.eventsCache.size,
      categories: Array.from(this.eventsCache.keys()),
    };
  }
}

export default EventService;
