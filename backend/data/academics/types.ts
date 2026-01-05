import { Requisitions } from "../types";

export interface Course {
  id: string;
  name: string;
  description: string;
  requisitions: Requisitions;
  price: number;
  duration: number;
}
