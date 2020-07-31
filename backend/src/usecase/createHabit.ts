import { Id } from "../domain/entity/Id";
import { Habit } from "../domain/entity/Habit";
import { HabitRepository } from "./port/HabitRepository";

export type CreateHabitInput = {
  title: string;
  isGood: boolean;
  target: number;
};

export class CreateHabit {
  habitRepository: HabitRepository;

  constructor(habitRepository: HabitRepository) {
    this.habitRepository = habitRepository;
  }

  async create(input: CreateHabitInput): Promise<Id> {
    const habit = new Habit({
      title: input.title,
      isGood: input.isGood,
      target: input.target,
    });
    return this.habitRepository.add(habit);
  }
}
