import { QueryBuilder } from "../QueryBuilder";
import { Query, QueryType } from "../Query";

export class SqliteQueryBuilder implements QueryBuilder {
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

  values(variables: Record<string, string | number>): QueryBuilder {
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

  table(tableName: string): QueryBuilder {
    this.tableName = tableName;
    return this;
  }

  where(
    whereExpression: string,
    variables: Record<string, string>
  ): QueryBuilder {
    Object.entries(variables).forEach((entry) => {
      const regExp = new RegExp(`:${entry[0]}`, "g");
      whereExpression = whereExpression.replace(regExp, entry[1]);
    });
    this.whereClause = ` WHERE ${whereExpression}`;
    return this;
  }

  set(variables: Record<string, string>): QueryBuilder {
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
}

function wrapValue(value: number | string) {
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return value;
}
