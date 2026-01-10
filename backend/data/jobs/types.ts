import { Requisitions } from "../types";

export interface Level {
  id: string;
  name: string;
  minYears: number;
  salary: number;
}

export interface Career {
  id: string;
  name: string;
  description: string;
  requisitions: Requisitions;
  levels: Level[];
}
export interface AssignedJob {
  careerID: string;
  careerName: string;
  levelID: string;
  levelName: string;
  yearsWorked: number;
  salary: number;
}


