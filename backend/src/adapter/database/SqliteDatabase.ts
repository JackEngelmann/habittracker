import sqlite from "sqlite3";
import { Database } from "../../usecase/port/Database";
import { Id } from "../../domain/entity/Id";
import { Query, QueryType } from "../../usecase/port/Query";
import { injectable } from "inversify";

const CREATE_HABIT_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS habit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title string NOT NULL,
    isGood integer NOT NULL,
    target integer NOT NULL
  )
`;

@injectable()
export class SqliteDatabase implements Database {
  database: sqlite.Database;

  constructor() {
    this.database = new sqlite.Database(":memory:");
  }

  public async createSchema(): Promise<void> {
    await this.run(CREATE_HABIT_TABLE_SQL);
  }

  public executeQuery(query: Query) {
    const queryHandlerByQueryType = {
      [QueryType.SelectOne]: this.selectOne,
      [QueryType.Select]: this.select,
      [QueryType.InsertOne]: this.insertOne,
      [QueryType.Update]: this.update,
      [QueryType.Delete]: this.delete,
    };
    const handleQuery = queryHandlerByQueryType[query.type].bind(this);
    return handleQuery(query);
  }

  private async selectOne(query: Query): Promise<any> {
    return new Promise((resolve) => {
      return this.database.all(query.rawSqlCommand, function (err, rows) {
        if (err) console.error(err);
        resolve(rows[0]);
      });
    });
  }

  private async select(query: Query): Promise<any[]> {
    return new Promise((resolve) => {
      this.database.all(query.rawSqlCommand, (err, rows) => {
        if (err) console.error(err);
        resolve(rows);
      });
    });
  }

  private async insertOne(query: Query): Promise<Id> {
    return new Promise((resolve) => {
      this.database.run(query.rawSqlCommand, function (err) {
        if (err) console.error(err);
        resolve(this.lastID);
      });
    });
  }

  private async update(query: Query): Promise<void> {
    this.run(query.rawSqlCommand);
  }

  private async delete(query: Query): Promise<void> {
    this.run(query.rawSqlCommand);
  }

  private run(rawSqlCommand: string): Promise<void> {
    return new Promise((resolve) => {
      this.database.run(rawSqlCommand, (err) => {
        if (err) console.error(err);
        resolve();
      });
    });
  }
}
