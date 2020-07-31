import sqlite from "sqlite3";
import { Database } from "../Database";
import { Id } from "../../domain/entity/Id";
import { Query, QueryType } from "../Query";

const CREATE_SCHEMA_SCRIPT = `
  CREATE TABLE IF NOT EXISTS habit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title string NOT NULL,
    isGood integer NOT NULL,
    target integer NOT NULL
  )
`;

export class SqliteDatabase implements Database {
  database: sqlite.Database;

  constructor() {
    this.database = new sqlite.Database(":memory:");
  }

  async createSchema(): Promise<void> {
    return new Promise((resolve) => {
      this.database.run(CREATE_SCHEMA_SCRIPT, (err) => {
        if (err) {
          console.error(err);
        }
        resolve();
      });
    });
  }

  executeQuery(query: Query) {
    if (query.type === QueryType.SelectOne) {
      return this.selectOne(query.rawSqlCommand);
    }
    if (query.type === QueryType.Select) {
      return this.select(query.rawSqlCommand);
    }
    if (query.type === QueryType.InsertOne) {
      return this.insertOne(query.rawSqlCommand);
    }
    throw new Error("unrecognized query type");
  }

  private async selectOne(sql: string): Promise<any> {
    return new Promise((resolve) => {
      return this.database.all(sql, function (err, rows) {
        if (err) {
          console.error(err);
        }
        resolve(rows[0]);
      });
    });
  }

  private async select(rawSqlCommand: string): Promise<any[]> {
    return new Promise((resolve) => {
      this.database.all(rawSqlCommand, (err, rows) => {
        if (err) {
          console.error(err);
        }
        return resolve(rows);
      });
    });
  }

  private async insertOne(rawSqlCommand: string): Promise<Id> {
    return new Promise((resolve) => {
      this.database.run(rawSqlCommand, function (err) {
        if (err) {
          console.error(err);
        }
        return resolve(this.lastID);
      });
    });
  }
}
