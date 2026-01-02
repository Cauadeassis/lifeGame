import { Requisitions } from "../types.js";

export interface Course {
  id: string;
  name: string;
  description: string;
  requisitions: Requisitions;
  price: number;
  duration: number;
}
