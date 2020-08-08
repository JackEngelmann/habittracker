import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { HabitLogRepository } from "./port/HabitLogRepository";
import moment from "moment";
import { Id } from "../domain/entity/Id";

export type UpdateHabitLogInput = {
  date: string;
  amount: number;
  habitId: Id;
};

@injectable()
export class UpdateHabitLog {
  constructor(
    @inject(TYPES.HabitLogRepository)
    private habitLogRepository: HabitLogRepository
  ) {}

  async update(id: Id, updateInput: UpdateHabitLogInput) {
    const habitLog = await this.habitLogRepository.get(id);
    habitLog.amount = updateInput.amount;
    habitLog.date = moment(updateInput.date);
    habitLog.habitId = updateInput.habitId;
    await this.habitLogRepository.update(habitLog);
  }
}
