import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getRandomItem } from "./utilities";
import { Event, Option, Result, Risk } from "../data/events/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GetAvailableEventsParameters {
  age: number;
  career?: string;
  freelance?: string;
  academic?: string;
}

interface LoadEventsParameters {
  folder: string;
  category?: string;
  file: string;
}

class EventService {
  private eventsPath: string;
  private eventsCache: Map<string, Event[]>;

  constructor() {
    this.eventsPath = path.join(__dirname, "..", "data", "events");
    this.eventsCache = new Map();
  }

  private getAgeState(age: number): string {
    if (age === 0) return "birth";
    else if (age > 0 && age <= 5) return "baby";
    else if (age > 5 && age <= 11) return "child";
    else if (age > 11 && age <= 13) return "puberty";
    else if (age > 13 && age <= 17) return "teenager";
    else if (age > 17 && age < 60) return "adult";
    else return "elderly";
  }

  private loadEvents({
    folder,
    category,
    file,
  }: LoadEventsParameters): Event[] {
    const cacheKey = category
      ? `${folder}/${category}/${file}`
      : `${folder}/${file}`;

    if (this.eventsCache.has(cacheKey)) {
      return this.eventsCache.get(cacheKey)!;
    }

    try {
      const filePath = category
        ? path.join(this.eventsPath, folder, category, `${file}.json`)
        : path.join(this.eventsPath, folder, `${file}.json`);

      const eventsData = fs.readFileSync(filePath, "utf-8");
      const events: Event[] = JSON.parse(eventsData);

      this.eventsCache.set(cacheKey, events);

      return events;
    } catch (error) {
      console.error(`Failed to load events for ${cacheKey}:`, error);
      return [];
    }
  }

  public getAvailableEvents({
    age,
    career,
    freelance,
    academic,
  }: GetAvailableEventsParameters): Event[] {
    const allEvents: Event[] = [];

    const ageState = this.getAgeState(age);
    const ageEvents = this.loadEvents({
      folder: "age",
      file: ageState,
    });
    allEvents.push(...ageEvents);

    if (academic) {
      const academicEvents = this.loadEvents({
        folder: "academic",
        file: academic,
      });
      allEvents.push(...academicEvents);
    }

    if (career) {
      const careerEvents = this.loadEvents({
        folder: "jobs",
        category: "careers",
        file: career,
      });
      allEvents.push(...careerEvents);
    }

    if (freelance) {
      const freelanceEvents = this.loadEvents({
        folder: "jobs",
        file: freelance,
      });
      allEvents.push(...freelanceEvents);
    }

    return allEvents;
  }

  public getRandomEvent({
    age,
    career,
    freelance,
    academic,
  }: GetAvailableEventsParameters): Event | null {
    const availableEvents = this.getAvailableEvents({
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
