from common import json, random, Path
class CardService:
    def __init__(self):
        self.data_path = Path(__file__).parent.parent / "data"
        self.genders = self._load_genders()
    def _load_genders(self):
        try:
            with open(self.data_path / "genders.json", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            print("Erro: genders.json não encontrado")
            return []
        except json.JSONDecodeError as e:
            print(f"Erro ao decodificar JSON: {e}")
            return []
    def get_random_item(self, array):
        return random.choice(array)
    def create_bullying_card(self, id, male_text, female_text):
        return {
            "id": id,
            "type": "twoOptions",
            "aggressorGender": self.get_random_item(self.genders),
            "male": {
                "text": male_text
            },
            "female": {
                "text": female_text
            },
            "options": {
                "firstOption": {
                    "text": "Não fazer nada"
                },
                "secondOption": {
                    "mode": "select",
                    "text": {
                        "male": "Bater nele",
                        "female": "Bater nela"
                    },
                    "options": {
                        "male": [
                            {"label": "Chute na virilha", "value": "groinKick"},
                            {"label": "Soco no queixo", "value": "chinPunch"}
                        ],
                        "female": [
                            {"label": "Puxar o cabelo", "value": "hairPull"},
                            {"label": "Empurrar para longe", "value": "push"}
                        ]
                    }
                }
            }
        }
