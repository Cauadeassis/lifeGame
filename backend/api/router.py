import sys
from pathlib import Path
from flask import Flask, jsonify
from flask_cors import CORS

backend_path = Path(__file__).parent.parent
sys.path.insert(0, str(backend_path))

from services.character_service import CharacterService

app = Flask(__name__)
CORS(app)
character_service = CharacterService()
@app.route("/api/character/generate", methods=["POST"])
def generate_character():
    try:
        character = character_service.generate_random_character()
        return jsonify(character), 200
    except Exception as e:
        print(f"Erro ao gerar personagem: {e}")
        return jsonify({"error": str(e)}), 500
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200
if __name__ == "__main__":
    print("Servidor rodando em http://localhost:5000")
    print("Endpoint disponível: POST /api/character/generate")
    app.run(debug=True, port=5000)
