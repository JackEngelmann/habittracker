import { injectable, inject } from "inversify";
import { HabitLogRepository } from "../../../usecase/port/HabitLogRepository";
import { HabitLog } from "../../../domain/entity/HabitLog";
import { TYPES } from "../../../types";
import { Database } from "../../../usecase/port/Database";
import { createSqliteQueryBuilder } from "./SqliteQueryBuilder";
import moment from "moment";

const TABLE_NAME = "habitlog";

@injectable()
export class SqliteHabitLogRepository implements HabitLogRepository {
  constructor(@inject(TYPES.Database) private db: Database) {}

  async add(habitLog: HabitLog): Promise<number> {
    const query = createSqliteQueryBuilder()
      .table(TABLE_NAME)
      .values({
        amount: habitLog.amount,
        date: habitLog.date.toISOString(),
        habitId: habitLog.habitId,
      })
      .insertOne();
    return await this.db.executeQuery(query);
  }

  async get(id: number): Promise<HabitLog> {
    const query = createSqliteQueryBuilder()
      .table(TABLE_NAME)
      .where("id = :id", { id })
      .selectOne();
    const row = await this.db.executeQuery(query);
    return this.rowToHabitLog(row);
  }

  async update(habitLog: HabitLog): Promise<void> {
    const query = createSqliteQueryBuilder()
      .table(TABLE_NAME)
      .set({
        date: habitLog.date.toISOString(),
        amount: habitLog.amount,
        habitId: habitLog.habitId,
      })
      .update();
    return this.db.executeQuery(query);
  }

  async getAll(): Promise<HabitLog[]> {
    const query = createSqliteQueryBuilder().table(TABLE_NAME).select();
    const rows: any[] = await this.db.executeQuery(query);
    return rows.map((row) => this.rowToHabitLog(row));
  }

  async delete(id: number): Promise<void> {
    const query = createSqliteQueryBuilder()
      .table(TABLE_NAME)
      .where("id = :id", { id })
      .delete();
    return this.db.executeQuery(query);
  }

  private rowToHabitLog(row: any) {
    return new HabitLog({
      id: row.id,
      date: moment(row.date),
      amount: row.amount,
      habitId: row.habitId,
    });
  }
}
