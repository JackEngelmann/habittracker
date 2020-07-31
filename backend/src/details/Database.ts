import { Query } from "./Query";

export interface Database {
  createSchema(): Promise<void>;
  executeQuery(query: Query): Promise<any>;
}
