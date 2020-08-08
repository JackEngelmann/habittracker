import sqlite from "sqlite3";
import { Database } from "../../../usecase/port/Database";
import { Id } from "../../../domain/entity/Id";
import { Query, QueryType } from "../../../usecase/port/Query";
import { injectable } from "inversify";

@injectable()
export class SqliteDatabase implements Database {
  database: sqlite.Database;

  constructor() {
    this.database = new sqlite.Database(":memory:");
  }

  public executeQuery(query: Query) {
    const queryHandlerByQueryType = {
      [QueryType.SelectOne]: this.selectOne,
      [QueryType.Select]: this.select,
      [QueryType.InsertOne]: this.insertOne,
      [QueryType.Update]: this.update,
      [QueryType.Delete]: this.delete,
      [QueryType.Run]: this.run,
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
    this.run(query);
  }

  private async delete(query: Query): Promise<void> {
    this.run(query);
  }

  private async run(query: Query): Promise<void> {
    return new Promise((resolve) => {
      this.database.run(query.rawSqlCommand, (err) => {
        if (err) console.error(err);
        resolve();
      });
    });
  }
}
