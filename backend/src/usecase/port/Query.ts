export enum QueryType {
  InsertOne,
  SelectOne,
  Select,
  Update,
  Delete,
}

export class Query {
  public rawSqlCommand: string;
  public type: QueryType;

  constructor(rawSqlCommand: string, type: QueryType) {
    this.rawSqlCommand = rawSqlCommand;
    this.type = type;
  }
}
