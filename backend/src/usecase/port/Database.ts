import { Query } from "./Query";

export interface Database {
  executeQuery(query: Query): Promise<any>;
}
