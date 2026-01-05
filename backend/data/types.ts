import { Stats } from "./character/types";

export interface Requisitions extends Partial<Stats> {
  college?: string;
  PClevel?: number;
}

export interface HealthConditions {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  effects: Partial<Stats>;
}
