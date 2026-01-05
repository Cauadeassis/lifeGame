import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getRandomDamage } from "./utilities";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AttackType =
  | "groinKick"
  | "chinPunch"
  | "hairPull"
  | "push"
  | "boxing"
  | "jiu-jitsu";

export interface AttackData {
  text: string;
  messages: Record<string, string>;
}

export type Attack = {
  [key in AttackType]: AttackData;
};

export interface AttackResults {
  damage: number;
  message: string;
  attackName: string;
}

class CombatService {
  private dataPath: string;
  private attacks!: Attack;

  constructor() {
    this.dataPath = path.join(__dirname, "..", "data");
  }

  public resolveAttack(attackType: AttackType): AttackResults {
    const damage = getRandomDamage(0, 10);
    const attack = this.attacks[attackType];

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
