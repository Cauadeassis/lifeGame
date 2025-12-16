from common import json, random, Path
class EventService:
    def __init__(self):
        self.data_path = Path(__file__).parent.parent / "data"
        self.events_cache = {}
    def _load_events(self, event_file):
        if event_file in self.events_cache:
            return self.events_cache[event_file]
        try:
            file_path = self.data_path / "jobs" / "events" / event_file
            with open(file_path, encoding="utf-8") as f:
                events = json.load(f)
                self.events_cache[event_file] = events
                return events
        except FileNotFoundError:
            print(f"Erro: {event_file} não encontrado")
            return []
        except json.JSONDecodeError as e:
            print(f"Erro ao decodificar {event_file}: {e}")
            return []
    def get_random_event(self, event_type="police"):
        event_file = f"{event_type}.json"
        events = self._load_events(event_file)
        if not events:
            return {
                "error": f"Nenhum evento encontrado para {event_type}",
                "title": "Erro",
                "description": "Não foi possível carregar o evento.",
                "options": []
            }
        selected_event = random.choice(events)
        return {
            "title": selected_event.get("title", "Sem título"),
            "description": selected_event.get("description", "Sem descrição"),
            "options": selected_event.get("options", [])
        }
    def resolve_option(self, option_chosen):
      result = {
          "text": option_chosen.get("text", ""),
          "effects": option_chosen.get("effects", {}),
          "message": option_chosen.get("message", "")
      }
      if "risk" in option_chosen:
          risk_result = self._resolve_risk(option_chosen["risk"])
          result.update(risk_result)
      return result
    def _resolve_risk(self, risk):
      chance = risk.get("chance", 0)
      roll = random.random()
      if roll < chance:
          outcome = risk.get("onFail", {})
      else:
          outcome = risk.get("onSuccess", {})
      result = {
          "outcomeText": outcome.get("text", ""),
          "effects": outcome.get("effects", {}),
          "message": outcome.get("message", "")
      }
      if "risk" in outcome:
          result["nestedOutcome"] = self._resolve_risk(outcome["risk"])
      return result
