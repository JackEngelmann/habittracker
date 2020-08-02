import { CreateHabit } from "../createHabit";
import { FindHabit } from "../findHabit";
import { UpdateHabit } from "../updateHabit";

export type createServer = (
  createHabit: CreateHabit,
  findHabit: FindHabit,
  updateHabit: UpdateHabit
) => Server;

export interface Server {
  listen(port: number): void;
}
