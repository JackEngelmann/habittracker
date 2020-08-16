import { Container } from "inversify";
import { TYPES } from "./types";
import { Database } from "./usecase/port/Database";
import { SqliteDatabase } from "./adapter/database/sqlite/SqliteDatabase";
import { HabitRepository } from "./usecase/port/HabitRepository";
import { SqliteHabitRepository } from "./adapter/database/sqlite/SqliteHabitRepository";
import { CreateHabit } from "./usecase/createHabit";
import { FindHabit } from "./usecase/findHabit";
import { UpdateHabit } from "./usecase/updateHabit";
import { Server } from "./usecase/port/Server";
import { ExpressServer } from "./adapter/server/ExpressServer";
import { DeleteHabit } from "./usecase/deleteHabit";
import { SchemaCreator } from "./usecase/port/SchemaCreator";
import { SqliteSchemaCreator } from "./adapter/database/sqlite/SqliteSchemaCreator";
import { ExpressHabitController } from "./adapter/controller/express/ExpressHabitController";
import { ExpressHabitLogController } from "./adapter/controller/express/ExpressHabitLogController";
import { CreateHabitLog } from "./usecase/createHabitLog";
import { FindHabitLog } from "./usecase/findHabitLog";
import { DeleteHabitLog } from "./usecase/deleteHabitLog";
import { HabitLogRepository } from "./usecase/port/HabitLogRepository";
import { SqliteHabitLogRepository } from "./adapter/database/sqlite/SqliteHabitLogRepository";
import { UpdateHabitLog } from "./usecase/updateHabitLog";

const container = new Container();
container.bind<Database>(TYPES.Database).to(SqliteDatabase).inSingletonScope();
container
  .bind<HabitRepository>(TYPES.HabitRepository)
  .to(SqliteHabitRepository);
container.bind<CreateHabit>(TYPES.CreateHabit).to(CreateHabit);
container.bind<FindHabit>(TYPES.FindHabit).to(FindHabit);
container.bind<DeleteHabit>(TYPES.DeleteHabit).to(DeleteHabit);
container.bind<UpdateHabit>(TYPES.UpdateHabit).to(UpdateHabit);
container.bind<Server>(TYPES.Server).to(ExpressServer);
container.bind<SchemaCreator>(TYPES.SchemaCreator).to(SqliteSchemaCreator);
container
  .bind<ExpressHabitController>(TYPES.ExpressHabitController)
  .to(ExpressHabitController);
container
  .bind<ExpressHabitLogController>(TYPES.ExpressHabitLogController)
  .to(ExpressHabitLogController);
container.bind<CreateHabitLog>(TYPES.CreateHabitLog).to(CreateHabitLog);
container.bind<FindHabitLog>(TYPES.FindHabitLog).to(FindHabitLog);
container.bind<DeleteHabitLog>(TYPES.DeleteHabitLog).to(DeleteHabitLog);
container.bind<UpdateHabitLog>(TYPES.UpdateHabitLog).to(UpdateHabitLog);
container
  .bind<HabitLogRepository>(TYPES.HabitLogRepository)
  .to(SqliteHabitLogRepository);

export { container };
