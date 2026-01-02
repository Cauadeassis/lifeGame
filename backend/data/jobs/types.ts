import { Requisitions } from "../types.ts";

interface Level {
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
