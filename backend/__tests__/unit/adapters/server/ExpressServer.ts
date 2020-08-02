import "reflect-metadata";
import { ExpressServer } from "../../../../src/adapter/server/ExpressServer";
import { CreateHabit } from "../../../../src/usecase/createHabit";
import { SqliteHabitRepository } from "../../../../src/adapter/database/SqliteHabitRepository";
import { SqliteDatabase } from "../../../../src/adapter/database/SqliteDatabase";
import { FindHabit } from "../../../../src/usecase/findHabit";
import supertest from "supertest";
import { UpdateHabit } from "../../../../src/usecase/updateHabit";
import { buildHabit } from "../../HabitBuilder";
import { DeleteHabit } from "../../../../src/usecase/deleteHabit";

async function createTestConfiguration() {
  const database = new SqliteDatabase();
  await database.createSchema();
  const habitRepository = new SqliteHabitRepository(database);
  const createHabit = new CreateHabit(habitRepository);
  const findHabit = new FindHabit(habitRepository);
  const updateHabit = new UpdateHabit(habitRepository);
  const deleteHabit = new DeleteHabit(habitRepository);
  const server = new ExpressServer(
    database,
    createHabit,
    findHabit,
    updateHabit,
    deleteHabit
  );
  const request = supertest(server.app);
  return {
    createHabit,
    findHabit,
    request,
  };
}

test("get habit", async (done) => {
  const { request, createHabit } = await createTestConfiguration();
  const id = await createHabit.create({
    title: "title",
    isGood: true,
    target: 10,
  });
  const response = await request.get(`/habit/${id}`);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(id);
  done();
});

test("create habit", async (done) => {
  const { request } = await createTestConfiguration();
  const createInput = {
    title: "title",
    isGood: true,
    target: 10,
  };
  const response = await request
    .post("/habit/")
    .send({ title: "title", isGood: true, target: 10 });
  expect(response.status).toBe(200);
  expect(response.body).toEqual(expect.objectContaining(createInput));
  done();
});

test("update habit", async (done) => {
  const { request, createHabit } = await createTestConfiguration();
  const id = await createHabit.create({
    title: "title",
    isGood: true,
    target: 10,
  });
  const updateInput = {
    title: "updated",
    isGood: false,
    target: 20,
  };
  const response = await request.put(`/habit/${id}`).send(updateInput);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(expect.objectContaining(updateInput));
  done();
});

test("get all habits", async (done) => {
  const { request, createHabit } = await createTestConfiguration();
  await createHabit.create({
    title: "title",
    isGood: true,
    target: 10,
  });
  await createHabit.create({
    title: "title",
    isGood: true,
    target: 10,
  });
  const response = await request.get(`/habit/`);
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(2);
  done();
});

test("delete habit", async (done) => {
  const { request, createHabit } = await createTestConfiguration();
  const habit = buildHabit().build();
  const id = await createHabit.create(habit);
  const response = await request.delete(`/habit/${id}`);
  expect(response.status).toBe(204);
  done();
});
