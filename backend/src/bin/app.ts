import "reflect-metadata";
import { container } from "../inversify.config";
import { Server } from "../usecase/port/Server";
import { TYPES } from "../types";
import { SchemaCreator } from "../usecase/port/SchemaCreator";

const PORT = 3001;

const server = container.get<Server>(TYPES.Server);
const schemaCreator = container.get<SchemaCreator>(TYPES.SchemaCreator);

schemaCreator.createSchema().then(() => server.listen(PORT));
