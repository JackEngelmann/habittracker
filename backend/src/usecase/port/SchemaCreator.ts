export interface SchemaCreator {
  createSchema(): Promise<void>;
}
