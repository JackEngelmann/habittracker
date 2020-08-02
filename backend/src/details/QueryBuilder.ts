import { Query } from "../usecase/port/Query";

type Variables = Record<string, string | number>;

export interface QueryBuilder {
  table(tableName: string): QueryBuilder;
  where(whereExpression: string, variables: Variables): QueryBuilder;
  values(variables: Variables): QueryBuilder;
  set(variables: Variables): QueryBuilder;

  selectOne(): Query;
  insertOne(): Query;
  update(): Query;
  select(): Query;
}
