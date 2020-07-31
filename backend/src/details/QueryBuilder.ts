import { Query } from "./Query";

export interface QueryBuilder {
  table(tableName: string): QueryBuilder;

  where(
    whereExpression: string,
    variables: Record<string, string | number>
  ): QueryBuilder;

  values(variables: Record<string, string | number>): QueryBuilder;

  selectOne(): Query;

  insertOne(): Query;
}
