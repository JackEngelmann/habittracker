import { Container } from "inversify";
import { TYPES } from "./types";
import { Database } from "./usecase/port/Database";
import { SqliteDatabase } from "./adapter/database/SqliteDatabase";
import { HabitRepository } from "./usecase/port/HabitRepository";
import { SqliteHabitRepository } from "./adapter/database/SqliteHabitRepository";
import { CreateHabit } from "./usecase/createHabit";
import { FindHabit } from "./usecase/findHabit";
import { UpdateHabit } from "./usecase/updateHabit";
import { Server } from "./usecase/port/Server";
import { ExpressServer } from "./adapter/server/ExpressServer";
import { DeleteHabit } from "./usecase/deleteHabit";

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

export { container };
