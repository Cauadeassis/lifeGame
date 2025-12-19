import fs from "fs";
import path from "path";
import { getRandomDamage } from "./utilities.js";
class CombatService {
  constructor() {
    this.dataPath = path.join(__dirname, "..", "data");
    this.attackMessages = this._loadAttackMessages();
  }

  _loadAttackMessages() {
    try {
      const filePath = path.join(this.dataPath, "attackMessages.json");
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error("Erro: attackMessages.json não encontrado");
      } else {
        console.error("Erro ao decodificar JSON:", error);
      }
      return {};
    }
  }

  resolveAttack(attackType) {
    const damage = getRandomDamage(0, 10);
    const attack = this.attackMessages[attackType];

    if (!attack) {
      console.error(`Tipo de ataque inválido: ${attackType}`);
      return {
        damage: 0,
        message: "Ataque inválido",
        attackName: "Erro",
      };
    }
    return {
      damage,
      message: attack.messages[damage.toString()] || "Mensagem não encontrada",
      attackName: attack.text,
    };
  }
}
export default CombatService;
