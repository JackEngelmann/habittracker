import { HabitRepository } from "./port/HabitRepository";
import { Id } from "../domain/entity/Id";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

export type UpdateHabitInput = {
  title: string;
  isGood: boolean;
  target: number;
};

@injectable()
export class UpdateHabit {
  constructor(
    @inject(TYPES.HabitRepository) private habitRepository: HabitRepository
  ) {}

  async update(id: Id, updateInput: UpdateHabitInput) {
    const habit = await this.habitRepository.get(id);
    habit.isGood = updateInput.isGood;
    habit.target = updateInput.target;
    habit.title = updateInput.title;
    await this.habitRepository.update(habit);
  }
}
