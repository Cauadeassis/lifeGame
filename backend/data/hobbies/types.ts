import { Effects, Requisitions } from "../types";

export interface Book {
  [title: string]: {
    description: string;
    requisitions: Requisitions;
    effects: Effects;
    message: string;
  };
}

export interface Game {
  [title: string]: {
    description: string;
    requisitions: Requisitions;
    effects: Effects;
    message: string;
  };
}

export interface Movie {
  [title: string]: {
    description: string;
    requisitions: Requisitions;
    effects: Effects;
    message: string;
  };
}
