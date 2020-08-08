import { SchemaCreator } from "../../../usecase/port/SchemaCreator";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { Database } from "../../../usecase/port/Database";
import { Query, QueryType } from "../../../usecase/port/Query";

const CREATE_HABIT_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS habit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title string NOT NULL,
    isGood integer NOT NULL,
    target integer NOT NULL
  )
`;

const CREATE_HABITLOG_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS habitlog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date string NOT NULL,
    amount integer NOT NULL
  )
`;

@injectable()
export class SqliteSchemaCreator implements SchemaCreator {
  constructor(@inject(TYPES.Database) private database: Database) {}

  async createSchema(): Promise<void> {
    await this.runQuery(CREATE_HABIT_TABLE_SQL);
    await this.runQuery(CREATE_HABITLOG_TABLE_SQL);
  }

  private async runQuery(sql: string) {
    const query = new Query(sql, QueryType.Run);
    await this.database.executeQuery(query);
  }
}
