import "reflect-metadata";
import { container } from "../inversify.config";
import { Server } from "../usecase/port/Server";
import { TYPES } from "../types";
import { Database } from "../usecase/port/Database";

const PORT = 3001;

const server = container.get<Server>(TYPES.Server);
const database = container.get<Database>(TYPES.Database);

database.createSchema().then(() => server.listen(PORT));
