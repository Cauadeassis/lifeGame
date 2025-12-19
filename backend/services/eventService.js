import fs from "fs";
import path from "path";
import { getRandomItem } from "./utilities.js";

class EventService {
  constructor() {
    this.dataPath = path.join(__dirname, "..", "data");
    this.eventsCache = {};
  }
  _loadEvents(eventFile) {
    if (this.eventsCache[eventFile]) {
      return this.eventsCache[eventFile];
    }
    try {
      const filePath = path.join(this.dataPath, "jobs", "events", eventFile);
      const events = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      this.eventsCache[eventFile] = events;
      return events;
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error(`Erro: ${eventFile} não encontrado`);
      } else {
        console.error(`Erro ao decodificar ${eventFile}:`, error);
      }
      return [];
    }
  }

  getRandomEvent(eventType = "police") {
    const eventFile = `${eventType}.json`;
    const events = this._loadEvents(eventFile);

    if (!events || events.length === 0) {
      return {
        error: `Nenhum evento encontrado para ${eventType}`,
        title: "Erro",
        description: "Não foi possível carregar o evento.",
        options: [],
      };
    }
    const selectedEvent = getRandomItem(events);
    return {
      title: selectedEvent.title || "Sem título",
      description: selectedEvent.description || "Sem descrição",
      options: selectedEvent.options || [],
    };
  }

  resolveOption(optionChosen) {
    const result = {
      text: optionChosen.text || "",
      effects: optionChosen.effects || {},
      message: optionChosen.message || "",
    };

    if (optionChosen.risk) {
      const riskResult = this._resolveRisk(optionChosen.risk);
      Object.assign(result, riskResult);
    }

    return result;
  }

  _resolveRisk(risk) {
    const chance = risk.chance || 0;
    const roll = Math.random();
    const outcome = roll < chance ? risk.onFail || {} : risk.onSuccess || {};

    const result = {
      outcomeText: outcome.text || "",
      effects: outcome.effects || {},
      message: outcome.message || "",
    };

    if (outcome.risk) {
      result.nestedOutcome = this._resolveRisk(outcome.risk);
    }

    return result;
  }
}

export default EventService;
