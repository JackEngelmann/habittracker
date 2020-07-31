import { CreateHabit } from "../createHabit";
import { FindHabit } from "../findHabit";

export type createServer = (
  createHabit: CreateHabit,
  findHabit: FindHabit
) => Server;

export interface Server {
  initialize(port: number): void;
}
