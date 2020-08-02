import { Container } from "inversify";
import { TYPES } from "./types";
import { Database } from "./usecase/port/Database";
import { SqliteDatabase } from "./adapter/database/SqliteDatabase";
import { QueryBuilder } from "./details/QueryBuilder";
import { SqliteQueryBuilder } from "./adapter/database/SqliteQueryBuilder";
import { HabitRepository } from "./usecase/port/HabitRepository";
import { SqliteHabitRepository } from "./adapter/database/SqliteHabitRepository";
import { CreateHabit } from "./usecase/createHabit";
import { FindHabit } from "./usecase/findHabit";
import { UpdateHabit } from "./usecase/updateHabit";
import { Server } from "./usecase/port/Server";
import { ExpressServer } from "./adapter/server/ExpressServer";

const container = new Container();
container.bind<Database>(TYPES.Database).to(SqliteDatabase).inSingletonScope();
container.bind<QueryBuilder>(TYPES.QueryBuilder).to(SqliteQueryBuilder);
container
  .bind<HabitRepository>(TYPES.HabitRepository)
  .to(SqliteHabitRepository);
container.bind<CreateHabit>(TYPES.CreateHabit).to(CreateHabit);
container.bind<FindHabit>(TYPES.FindHabit).to(FindHabit);
container.bind<UpdateHabit>(TYPES.UpdateHabit).to(UpdateHabit);
container.bind<Server>(TYPES.Server).to(ExpressServer);

export { container };
