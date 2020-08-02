import "reflect-metadata";
import { SqliteDatabase } from "../../../../src/adapter/database/SqliteDatabase";
import { SqliteHabitRepository } from "../../../../src/adapter/database/SqliteHabitRepository";
import { SqliteQueryBuilder } from "../../../../src/details/sqlite/SqliteQueryBuilder";
import { Habit } from "../../../../src/domain/entity/Habit";

async function initializeTest() {
  const database = new SqliteDatabase();
  const queryBuilder = new SqliteQueryBuilder();
  await database.createSchema();
  const repository = new SqliteHabitRepository(database, queryBuilder);
  return { repository };
}

test("create and get a habit", async (done) => {
  // arrange
  const { repository } = await initializeTest();
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
  const { repository } = await initializeTest();
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

test("get all", async (done) => {
  // arrange
  const { repository } = await initializeTest();
  const habit1 = new Habit({
    title: "Habit 1",
    isGood: true,
    target: 1,
  });
  const habit2 = new Habit({
    title: "Habit 1",
    isGood: true,
    target: 1,
  });
  const id1 = await repository.add(habit1);
  const id2 = await repository.add(habit2);

  // act
  const result = await repository.getAll();

  // assert
  expect(result).toHaveLength(2);

  const habitFromRepository1 = result.find((h) => h.id === id1);
  expect(habitFromRepository1).toBeDefined();
  expect(habitFromRepository1?.title).toBe(habit1.title);

  const habitFromRepository2 = result.find((h) => h.id === id2);
  expect(habitFromRepository2).toBeDefined();
  expect(habitFromRepository2?.title).toBe(habit2.title);
  done();
});
