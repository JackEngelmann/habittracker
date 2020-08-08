import "reflect-metadata";
import { SqliteDatabase } from "../../../../src/adapter/database/sqlite/SqliteDatabase";
import { SqliteSchemaCreator } from "../../../../src/adapter/database/sqlite/SqliteSchemaCreator";
import { SqliteHabitLogRepository } from "../../../../src/adapter/database/sqlite/SqliteHabitLogRepository";
import { HabitLog } from "../../../../src/domain/entity/HabitLog";
import moment from "moment";
import { buildHabitLog } from "../../HabitLogBuilder";

async function initializeTest() {
  const database = new SqliteDatabase();
  const schemaCreator = new SqliteSchemaCreator(database);
  await schemaCreator.createSchema();
  const repository = new SqliteHabitLogRepository(database);
  return { repository };
}

test("create and get habit log", async (done) => {
  const { repository } = await initializeTest();
  const habitLog = buildHabitLog().build();

  const id = await repository.add(habitLog);
  const createdHabitLog = await repository.get(id);

  expect(createdHabitLog.date.isSame(habitLog.date)).toBe(true);
  expect(createdHabitLog.amount).toBe(habitLog.amount);
  expect(createdHabitLog.habitId).toBe(habitLog.habitId);
  done();
});

test("update a habit log", async (done) => {
  const { repository } = await initializeTest();
  const originalHabit = buildHabitLog().build();
  const id = await repository.add(originalHabit);

  originalHabit.amount = 2;
  originalHabit.date = moment(originalHabit.date).add(1, "d");
  originalHabit.habitId = 22;
  await repository.update(originalHabit);
  const fromRepository = await repository.get(id);

  expect(fromRepository.amount).toBe(originalHabit.amount);
  expect(fromRepository.date.isSame(originalHabit.date)).toBe(true);
  expect(fromRepository.habitId).toBe(originalHabit.habitId);
  done();
});

test("get all habit logs", async (done) => {
  const { repository } = await initializeTest();
  const habitLog1 = buildHabitLog().build();
  const habitLog2 = buildHabitLog().build();
  const id1 = await repository.add(habitLog1);
  const id2 = await repository.add(habitLog2);

  const result = await repository.getAll();

  expect(result).toHaveLength(2);
  expect(result.some((r) => r.id === id1)).toBe(true);
  expect(result.some((r) => r.id === id2)).toBe(true);
  done();
});

test("delete habit log", async (done) => {
  const { repository } = await initializeTest();
  const habitLog1 = buildHabitLog().build();
  const habitLog2 = buildHabitLog().build();
  const id1 = await repository.add(habitLog1);
  const id2 = await repository.add(habitLog2);

  await repository.delete(id1);
  const result = await repository.getAll();

  expect(result).toHaveLength(1);
  expect(result[0].id).toBe(id2);
  done();
});
