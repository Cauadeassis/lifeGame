import json
import random
from pathlib import Path
class CombatService:
    def __init__(self):
        self.data_path = Path(__file__).parent.parent / "data"
        self.attack_messages = self._load_attack_messages()
    def _load_attack_messages(self):
        try:
            with open(self.data_path / "attackMessages.json", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            print("Erro: attackMessages.json não encontrado")
            return {}
        except json.JSONDecodeError as e:
            print(f"Erro ao decodificar JSON: {e}")
            return {}
    def get_random_damage(self, min_damage=0, max_damage=10):
        return random.randint(min_damage, max_damage)
    def resolve_attack(self, attack_type):
        damage = self.get_random_damage()
        attack = self.attack_messages.get(attack_type)
        if not attack:
            print(f"Tipo de ataque inválido: {attack_type}")
            return {
                "damage": 0,
                "message": "Ataque inválido",
                "attackName": "Erro"
            }
        return {
            "damage": damage,
            "message": attack["messages"].get(str(damage), "Mensagem não encontrada"),
            "attackName": attack["text"]
        }
    def get_all_attack_types(self):
        return list(self.attack_messages.keys())
    def get_attack_info(self, attack_type):
        return self.attack_messages.get(attack_type)
