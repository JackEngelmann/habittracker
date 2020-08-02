import { Id } from "../domain/entity/Id";
import { Habit } from "../domain/entity/Habit";
import { HabitRepository } from "./port/HabitRepository";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";

@injectable()
export class FindHabit {
  constructor(
    @inject(TYPES.HabitRepository) private habitRepository: HabitRepository
  ) {}

  async find(id: Id): Promise<Habit> {
    return this.habitRepository.get(id);
  }

  async getAll(): Promise<Habit[]> {
    return this.habitRepository.getAll();
  }
}
