import { Id } from "../domain/entity/Id";
import { Habit } from "../domain/entity/Habit";
import { HabitRepository } from "./port/HabitRepository";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";

export type CreateHabitInput = {
  title: string;
  isGood: boolean;
  target: number;
};

@injectable()
export class CreateHabit {
  constructor(
    @inject(TYPES.HabitRepository) private habitRepository: HabitRepository
  ) {}

  async create(input: CreateHabitInput): Promise<Id> {
    const habit = new Habit({
      title: input.title,
      isGood: input.isGood,
      target: input.target,
    });
    return this.habitRepository.add(habit);
  }
}
