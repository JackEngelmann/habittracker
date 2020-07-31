import { Habit } from "../../domain/entity/Habit";
import { Database } from "../../details/Database";
import { HabitRepository } from "../../usecase/port/HabitRepository";
import { QueryBuilder } from "../../details/QueryBuilder";
import { Id } from "../../domain/entity/Id";

const TABLE_NAME = "habit";

export class SqliteHabitRepository implements HabitRepository {
  db: Database;
  queryBuilder: QueryBuilder;

  constructor(db: Database, queryBuilder: QueryBuilder) {
    this.db = db;
    this.queryBuilder = queryBuilder;
  }

  async get(id: Id): Promise<Habit> {
    const query = this.queryBuilder
      .table(TABLE_NAME)
      .where("id = :id", { id })
      .selectOne();
    const row = await this.db.executeQuery(query);
    return new Habit({
      id: row.id,
      title: row.title,
      isGood: row.isGood === 1,
      target: row.target,
    });
  }

  async add(habit: Habit): Promise<number> {
    const query = this.queryBuilder
      .table(TABLE_NAME)
      .values({
        title: habit.title,
        target: habit.target,
        isGood: habit.isGood ? 1 : 0,
      })
      .insertOne();
    return this.db.executeQuery(query);
  }
}
