import { Id } from "../domain/entity/Id";
import { Habit } from "../domain/entity/Habit";
import { HabitRepository } from "./port/HabitRepository";

export class FindHabit {
  habitRepository: HabitRepository;

  constructor(habitRepository: HabitRepository) {
    this.habitRepository = habitRepository;
  }

  async find(id: Id): Promise<Habit> {
    return this.habitRepository.get(id);
  }
}
