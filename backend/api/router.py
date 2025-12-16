from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
from pathlib import Path
backend_path = Path(__file__).parent.parent
sys.path.insert(0, str(backend_path))
from services.character_service import CharacterService
from services.combat_service import CombatService
from services.event_service import EventService
app = Flask(__name__)
CORS(app)
character_service = CharacterService()
combat_service = CombatService()
event_service = EventService()

@app.route("/api/events/<event_type>/random", methods=["GET"])
def get_random_event(event_type):
    try:
        event = event_service.get_random_event(event_type)
        return jsonify(event), 200
    except Exception as e:
        print(f"Erro ao buscar evento aleatório: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/events/resolve", methods=["POST"])
def resolve_event_option():
    try:
        data = request.get_json()
        option = data.get("option")
        if not option:
            return jsonify({"error": "Opção não fornecida"}), 400
        result = event_service.resolve_option(option)
        return jsonify(result), 200
    except Exception as e:
        print(f"Erro ao resolver opção de evento: {e}")
        return jsonify({"error": str(e)}), 500
