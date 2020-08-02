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

test("update a habit", async (done) => {
  // arrange
  const database = new SqliteDatabase();
  const queryBuilder = new SqliteQueryBuilder();
  await database.createSchema();
  const repository = new SqliteHabitRepository(database, queryBuilder);
  const originalHabit = new Habit({
    title: "create",
    isGood: true,
    target: 10,
  });
  const id = await repository.add(originalHabit);
  const updatedHabit = new Habit({
    id,
    title: "updated",
    isGood: false,
    target: 20,
  });

  // act
  await repository.update(updatedHabit);
  const updatedHabitFromRepository = await repository.get(id);

  // assert
  expect(updatedHabitFromRepository.title).toBe(updatedHabit.title);
  expect(updatedHabitFromRepository.isGood).toBe(updatedHabit.isGood);
  expect(updatedHabitFromRepository.target).toBe(updatedHabit.target);
  expect(updatedHabitFromRepository.id).toBe(updatedHabit.id);
  done();
});
