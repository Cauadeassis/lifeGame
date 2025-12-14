import json
import random
from pathlib import Path
from services.difficulty import calculate_difficulty

class CharacterService:
    def __init__(self):
        self.data_path = Path(__file__).parent.parent / "data"
        self.load_data()
    def load_data(self):
        with open(self.data_path / "genders.json", encoding="utf-8") as f:
            self.genders = json.load(f)
        with open(self.data_path / "skinTones.json", encoding="utf-8") as f:
            self.skin_tones = json.load(f)
        with open(self.data_path / "incomes.json", encoding="utf-8") as f:
            self.incomes = json.load(f)
        with open(self.data_path / "namesByCountry.json", encoding="utf-8") as f:
            self.names_by_country = json.load(f)
    def generate_random_status(self):
        all_status = [0] * 4
        sum_of_all = 0
        for single_stat in range(3):
            remaining_status = 4 - single_stat
            max_limit = min(100, 240 - sum_of_all)
            min_limit = max(0, 240 - sum_of_all - (remaining_status - 1) * 100)
            valor = random.randint(min_limit, max_limit)
            all_status[single_stat] = valor
            sum_of_all += valor
        all_status[3] = 240 - sum_of_all
        random.shuffle(all_status)
        return all_status
    def get_random_item(self, array):
        return random.choice(array)
    def generate_random_character(self):
        countries = list(self.names_by_country.keys())
        gender = self.get_random_item(self.genders)
        country = self.get_random_item(countries)
        first_name = self.get_random_item(
            self.names_by_country[country][gender["id"]]
        )
        last_name = self.get_random_item(
            self.names_by_country[country]["last"]
        )
        skin_tone = self.get_random_item(self.skin_tones[gender["id"]])
        income = self.get_random_item(self.incomes[gender["id"]])
        status = self.generate_random_status()
        difficulty = calculate_difficulty(income, skin_tone)
        return {
            "firstName": first_name,
            "lastName": last_name,
            "country": country,
            "gender": gender,
            "skinTone": skin_tone,
            "income": income,
            "difficulty": difficulty,
            "status": {
                "health": status[0],
                "happiness": status[1],
                "intelligence": status[2],
                "looks": status[3]
            },
        }
