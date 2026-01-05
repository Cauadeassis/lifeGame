import { getRandomItem } from "./utilities";
import { Event, Option, Result, Risk } from "../data/events/types";

interface GetAvailableEventsParameters {
  age: number;
  career?: string;
  freelance?: string;
  academic?: string;
}

class EventService {
  private eventsCache: Map<string, Event[]>;

  constructor() {
    this.eventsCache = new Map();
  }

  private getAgeState(age: number): string {
    if (age === 0) return "birth";
    if (age <= 5) return "baby";
    if (age <= 11) return "child";
    if (age <= 13) return "puberty";
    if (age <= 17) return "teenager";
    if (age <= 59) return "adult";
    return "elderly";
  }

  private async loadDynamicEvents(
    type: "academic" | "career" | "freelance",
    name: string,
  ): Promise<Event[]> {
    const cacheKey = `${type}:${name}`;

    if (this.eventsCache.has(cacheKey)) {
      return this.eventsCache.get(cacheKey)!;
    }

    try {
      let events: Event[];
      switch (type) {
        case "academic":
          events = (await import(`../data/events/academic/${name}.json`))
            .default as Event[];
          break;
        case "career":
          events = (await import(`../data/events/jobs/careers/${name}.json`))
            .default as Event[];
          break;
        case "freelance":
          events = (await import(`../data/events/jobs/${name}.json`))
            .default as Event[];
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
    const ageEventsModule = await import(`../data/events/age/${ageState}.json`);

    const ageEvents = ageEventsModule.default as Event[];
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
      const freelanceEvents = await this.loadDynamicEvents(
        "freelance",
        freelance,
      );
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
