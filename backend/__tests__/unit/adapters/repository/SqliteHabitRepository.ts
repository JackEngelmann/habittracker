import { SqliteDatabase } from "../../../../src/details/sqlite/SqliteDatabase";
import { SqliteHabitRepository } from "../../../../src/adapter/database/SqliteHabitRepository";
import { SqliteQueryBuilder } from "../../../../src/details/sqlite/SqliteQueryBuilder";
import { Habit } from "../../../../src/domain/entity/Habit";

test("create and get a habit", async (done) => {
  // arrange
  const database = new SqliteDatabase();
  const queryBuilder = new SqliteQueryBuilder();
  await database.createSchema();
  const repository = new SqliteHabitRepository(database, queryBuilder);
  const title = "some-title";
  const isGood = true;
  const target = 10;

  // act
  const habit = new Habit({
    title,
    isGood,
    target,
  });
  const id = await repository.add(habit);
  const createdHabit = await repository.get(id);

  // assert
  expect(createdHabit.title).toBe(title);
  expect(createdHabit.isGood).toBe(isGood);
  expect(createdHabit.target).toBe(target);
  expect(createdHabit.id).toBeDefined();
  done();
});
