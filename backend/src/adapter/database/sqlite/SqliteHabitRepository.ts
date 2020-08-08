import { Habit } from "../../../domain/entity/Habit";
import { Database } from "../../../usecase/port/Database";
import { HabitRepository } from "../../../usecase/port/HabitRepository";
import { Id } from "../../../domain/entity/Id";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../types";
import { createSqliteQueryBuilder } from "./SqliteQueryBuilder";
import { relativeTimeThreshold } from "moment";

const TABLE_NAME = "habit";

@injectable()
export class SqliteHabitRepository implements HabitRepository {
  constructor(@inject(TYPES.Database) private db: Database) {}

  async get(id: Id): Promise<Habit> {
    const query = createSqliteQueryBuilder()
      .table(TABLE_NAME)
      .where("id = :id", { id })
      .selectOne();
    const row = await this.db.executeQuery(query);
    return this.rowToHabit(row);
  }

  async add(habit: Habit): Promise<number> {
    const query = createSqliteQueryBuilder()
      .table(TABLE_NAME)
      .values({
        title: habit.title,
        target: habit.target,
        isGood: habit.isGood ? 1 : 0,
      })
      .insertOne();
    return this.db.executeQuery(query);
  }

  async update(habit: Habit): Promise<void> {
    const query = createSqliteQueryBuilder()
      .table(TABLE_NAME)
      .set({
        title: habit.title,
        target: habit.target,
        isGood: habit.isGood ? 1 : 0,
      })
      .update();
    return this.db.executeQuery(query);
  }

  async getAll(): Promise<Habit[]> {
    const query = createSqliteQueryBuilder().table(TABLE_NAME).select();
    const rows: any[] = await this.db.executeQuery(query);
    return rows.map((row) => this.rowToHabit(row));
  }

  public async delete(id: number): Promise<void> {
    const query = createSqliteQueryBuilder()
      .table(TABLE_NAME)
      .where("id = :id", { id })
      .delete();
    return this.db.executeQuery(query);
  }

  private rowToHabit(row: any) {
    return new Habit({
      id: row.id,
      title: row.title,
      isGood: row.isGood === 1,
      target: row.target,
    });
  }
}
