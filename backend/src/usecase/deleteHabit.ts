import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { HabitRepository } from "./port/HabitRepository";
import { Id } from "../domain/entity/Id";

@injectable()
export class DeleteHabit {
  constructor(
    @inject(TYPES.HabitRepository) private habitRepository: HabitRepository
  ) {}

  async delete(id: Id) {
    return this.habitRepository.delete(id);
  }
}
