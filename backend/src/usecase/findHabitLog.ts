import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { HabitLogRepository } from "./port/HabitLogRepository";
import { Id } from "../domain/entity/Id";
import { HabitLog } from "../domain/entity/HabitLog";

@injectable()
export class FindHabitLog {
  constructor(
    @inject(TYPES.HabitLogRepository)
    private habitLogRepository: HabitLogRepository
  ) {}

  async find(id: Id): Promise<HabitLog> {
    return this.habitLogRepository.get(id);
  }

  async getAll(): Promise<HabitLog[]> {
    return this.habitLogRepository.getAll();
  }
}
