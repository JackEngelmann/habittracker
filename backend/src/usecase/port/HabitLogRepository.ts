import { HabitLog } from "../../domain/entity/HabitLog";
import { Id } from "../../domain/entity/Id";

export interface HabitLogRepository {
  add(habitLog: HabitLog): Promise<Id>;
  get(id: Id): Promise<HabitLog>;
  update(habitLog: HabitLog): Promise<void>;
  getAll(): Promise<HabitLog[]>;
  delete(id: Id): Promise<void>;
  getForHabit(habitId: Id): Promise<HabitLog[]>;
}
