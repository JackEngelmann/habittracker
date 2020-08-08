import { Query, QueryType } from "../../../usecase/port/Query";

export class SqliteQueryBuilder {
  private tableName: string | undefined;
  private whereClause: string;
  private insertColumns: string;
  private insertValues: string;
  private setClause: string;

  constructor() {
    this.whereClause = "";
    this.insertColumns = "";
    this.insertValues = "";
    this.setClause = "";
  }

  values(variables: Record<string, string | number>): SqliteQueryBuilder {
    let insertColumns = "(";
    let insertValues = "(";
    const entries = Object.entries(variables);
    entries.forEach((entry, entryIndex) => {
      insertColumns += entry[0];
      const value = entry[1];
      insertValues += wrapValue(value);
      if (entryIndex < entries.length - 1) {
        insertColumns += ", ";
        insertValues += ", ";
      }
    });
    insertColumns += ")";
    insertValues += ")";
    this.insertColumns = insertColumns;
    this.insertValues = insertValues;
    return this;
  }

  table(tableName: string): SqliteQueryBuilder {
    this.tableName = tableName;
    return this;
  }

  where(
    whereExpression: string,
    variables: Record<string, string | number>
  ): SqliteQueryBuilder {
    Object.entries(variables).forEach((entry) => {
      const regExp = new RegExp(`:${entry[0]}`, "g");
      whereExpression = whereExpression.replace(regExp, wrapValue(entry[1]));
    });
    this.whereClause = ` WHERE ${whereExpression}`;
    return this;
  }

  set(variables: Record<string, string | number>): SqliteQueryBuilder {
    const entries = Object.entries(variables);
    const parts = entries.map(
      (entry) => `${entry[0]} = ${wrapValue(entry[1])}`
    );
    const setClause = `SET ${parts.join(", ")}`;
    this.setClause = setClause;
    return this;
  }

  selectOne(): Query {
    const rawSqlCommand = `SELECT * FROM ${this.tableName}${this.whereClause}`;
    return new Query(rawSqlCommand, QueryType.SelectOne);
  }

  insertOne(): Query {
    const rawSqlCommand = `INSERT INTO ${this.tableName} ${this.insertColumns} VALUES ${this.insertValues}`;
    return new Query(rawSqlCommand, QueryType.InsertOne);
  }

  update(): Query {
    const rawSqlCommand = `UPDATE ${this.tableName} ${this.setClause}${this.whereClause}`;
    return new Query(rawSqlCommand, QueryType.Update);
  }

  select(): Query {
    const rawSqlCommand = `SELECT * FROM ${this.tableName}${this.whereClause}`;
    return new Query(rawSqlCommand, QueryType.Select);
  }

  delete(): Query {
    const rawSqlCommand = `DELETE FROM ${this.tableName}${this.whereClause}`;
    return new Query(rawSqlCommand, QueryType.Delete);
  }
}

function wrapValue(value: number | string) {
  if (typeof value === "string") {
    return `'${value}'`;
  }
  if (value === undefined) {
    return "NULL";
  }
  return value.toString();
}

export const createSqliteQueryBuilder = () => new SqliteQueryBuilder();
