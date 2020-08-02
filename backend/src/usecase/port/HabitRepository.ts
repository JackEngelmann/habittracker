import { Habit } from "../../domain/entity/Habit";
import { Id } from "../../domain/entity/Id";

export interface HabitRepository {
  add(habit: Habit): Promise<Id>;
  get(id: Id): Promise<Habit>;
  update(habit: Habit): Promise<void>;
  getAll(): Promise<Habit[]>;
}
