import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { HabitLogRepository } from "./port/HabitLogRepository";
import { Id } from "../domain/entity/Id";
import { HabitLog } from "../domain/entity/HabitLog";
import moment from "moment";

export type CreateHabitLogInput = {
  date: string; // TODO: or moment?
  amount: number;
  habitId: Id;
};

@injectable()
export class CreateHabitLog {
  constructor(
    @inject(TYPES.HabitLogRepository)
    private habitLogRepository: HabitLogRepository
  ) {}

  async create(input: CreateHabitLogInput): Promise<Id> {
    const habitLog = new HabitLog({
      date: moment(input.date),
      amount: input.amount,
      habitId: input.habitId,
    });
    return this.habitLogRepository.add(habitLog);
  }
}
