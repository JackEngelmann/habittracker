import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { HabitLogRepository } from "./port/HabitLogRepository";
import { Id } from "../domain/entity/Id";

@injectable()
export class DeleteHabitLog {
  constructor(
    @inject(TYPES.HabitLogRepository)
    private habitLogRepository: HabitLogRepository
  ) {}

  async delete(id: Id) {
    return this.habitLogRepository.delete(id);
  }
}
