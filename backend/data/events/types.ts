import { Effects } from "../types";
export interface Event {
  type?: "twoOptions" | "multipleOptions";
  title: string;
  description: string;
  options?: Option[];
}

export interface Option {
  text: string;
  effects?: Effects;
  message?: string;
  risk?: Risk;
}

export interface Risk {
  chance: number;
  onFail: RiskOutcome;
  onSuccess: RiskOutcome;
}

export interface RiskOutcome {
  text: string;
  effects: Effects;
  message: string;
  risk?: Risk;
}

export interface Result {
  text: string;
  effects: Effects;
  message: string;
}

/* Lógica de jogo:
    baby: 1-6 anos de idade
    child: 6-12 anos de idade
    puberty: 12-13 anos de idade
    teenager: 13-18 anos de idade
    adult: 18-60 anos de idade
    elderly: 60-?? anos de idade
*/
