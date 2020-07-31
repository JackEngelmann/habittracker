import { CreateHabit } from "../usecase/createHabit";
import { FindHabit } from "../usecase/findHabit";
import { createExpressServer } from "../adapter/server/ExpressServer";
import { SqliteDatabase } from "../details/sqlite/SqliteDatabase";
import { SqliteQueryBuilder } from "../details/sqlite/SqliteQueryBuilder";
import { SqliteHabitRepository } from "../adapter/database/SqliteHabitRepository";

const PORT = 3000;

const database = new SqliteDatabase();
const queryBuilder = new SqliteQueryBuilder();
const habitRepository = new SqliteHabitRepository(database, queryBuilder);
const createHabit = new CreateHabit(habitRepository);
const findHabit = new FindHabit(habitRepository);
const server = createExpressServer(createHabit, findHabit);

database.createSchema().then(() => server.initialize(PORT));
