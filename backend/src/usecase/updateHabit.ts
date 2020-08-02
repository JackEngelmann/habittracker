import { HabitRepository } from "./port/HabitRepository";
import { Id } from "../domain/entity/Id";

export type UpdateHabitInput = {
  title: string;
  isGood: boolean;
  target: number;
};

export class UpdateHabit {
  private habitRepository: HabitRepository;

  constructor(habitRepository: HabitRepository) {
    this.habitRepository = habitRepository;
  }

  async update(id: Id, updateInput: UpdateHabitInput) {
    const habit = await this.habitRepository.get(id);
    habit.isGood = updateInput.isGood;
    habit.target = updateInput.target;
    habit.title = updateInput.title;
    await this.habitRepository.update(habit);
  }
}
