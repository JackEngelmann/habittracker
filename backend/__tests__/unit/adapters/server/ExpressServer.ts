import "reflect-metadata";
import { ExpressServer } from "../../../../src/adapter/server/ExpressServer";
import { CreateHabit } from "../../../../src/usecase/createHabit";
import { SqliteHabitRepository } from "../../../../src/adapter/database/sqlite/SqliteHabitRepository";
import { SqliteDatabase } from "../../../../src/adapter/database/sqlite/SqliteDatabase";
import { FindHabit } from "../../../../src/usecase/findHabit";
import supertest from "supertest";
import { UpdateHabit } from "../../../../src/usecase/updateHabit";
import { buildHabit } from "../../HabitBuilder";
import { DeleteHabit } from "../../../../src/usecase/deleteHabit";
import { ExpressHabitController } from "../../../../src/adapter/controller/express/ExpressHabitController";
import { ExpressHabitLogController } from "../../../../src/adapter/controller/express/ExpressHabitLogController";
import { CreateHabitLog } from "../../../../src/usecase/createHabitLog";
import { SqliteHabitLogRepository } from "../../../../src/adapter/database/sqlite/SqliteHabitLogRepository";
import { FindHabitLog } from "../../../../src/usecase/findHabitLog";
import { UpdateHabitLog } from "../../../../src/usecase/updateHabitLog";
import { DeleteHabitLog } from "../../../../src/usecase/deleteHabitLog";
import { SqliteSchemaCreator } from "../../../../src/adapter/database/sqlite/SqliteSchemaCreator";
import { buildHabitLog } from "../../HabitLogBuilder";

async function createTestConfiguration() {
  const database = new SqliteDatabase();
  const schemaCreator = new SqliteSchemaCreator(database);
  await schemaCreator.createSchema();
  const habitRepository = new SqliteHabitRepository(database);
  const habitLogRepository = new SqliteHabitLogRepository(database);
  const createHabit = new CreateHabit(habitRepository);
  const findHabit = new FindHabit(habitRepository);
  const updateHabit = new UpdateHabit(habitRepository);
  const deleteHabit = new DeleteHabit(habitRepository);
  const habitController = new ExpressHabitController(
    createHabit,
    findHabit,
    updateHabit,
    deleteHabit
  );

  const createHabitLog = new CreateHabitLog(habitLogRepository);
  const findHabitLog = new FindHabitLog(habitLogRepository);
  const updateHabitLog = new UpdateHabitLog(habitLogRepository);
  const deleteHabitLog = new DeleteHabitLog(habitLogRepository);
  const habitLogController = new ExpressHabitLogController(
    createHabitLog,
    findHabitLog,
    updateHabitLog,
    deleteHabitLog
  );
  const server = new ExpressServer(habitController, habitLogController);
  const request = supertest(server.app);
  return {
    habitLogRepository,
    habitRepository,
    request,
  };
}

describe("habit", () => {
  test("get habit", async (done) => {
    const { request, habitRepository } = await createTestConfiguration();
    const habit = buildHabit().build();
    const id = await habitRepository.add(habit);
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
    const { request, habitRepository } = await createTestConfiguration();
    const habit = buildHabit().build();
    const id = await habitRepository.add(habit);
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
    const { request, habitRepository } = await createTestConfiguration();
    const habit1 = buildHabit().build();
    const habit2 = buildHabit().build();
    await habitRepository.add(habit1);
    await habitRepository.add(habit2);
    const response = await request.get(`/habit/`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    done();
  });

  test("delete habit", async (done) => {
    const { request, habitRepository } = await createTestConfiguration();
    const habit = buildHabit().build();
    const id = await habitRepository.add(habit);
    const response = await request.delete(`/habit/${id}`);
    expect(response.status).toBe(204);
    done();
  });
});

describe("habit log", () => {
  test("get habit log", async (done) => {
    const { request, habitLogRepository } = await createTestConfiguration();
    const habitLog = buildHabitLog().build();
    const id = await habitLogRepository.add(habitLog);
    const response = await request.get(`/habitlog/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
    done();
  });

  test("create habit log", async (done) => {
    const { request } = await createTestConfiguration();
    const createInput = {
      date: "2013-02-04T22:44:30.652Z",
      habitId: 1,
      amount: 4,
    };
    const response = await request.post("/habitlog/").send(createInput);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(createInput));
    done();
  });

  test("update habit log", async (done) => {
    const { request, habitLogRepository } = await createTestConfiguration();
    const habitLog = buildHabitLog().build();
    const id = await habitLogRepository.add(habitLog);
    const updateInput = {
      habitId: 12,
      amount: 20,
      date: "2014-02-04T22:44:30.652Z",
    };
    const response = await request.put(`/habitlog/${id}`).send(updateInput);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updateInput));
    done();
  });

  test("get all habit logs", async (done) => {
    const { request, habitLogRepository } = await createTestConfiguration();
    const habitLog1 = buildHabitLog().build();
    const habitLog2 = buildHabitLog().build();
    await habitLogRepository.add(habitLog1);
    await habitLogRepository.add(habitLog2);
    const response = await request.get(`/habitlog/`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    done();
  });

  test("delete habit log", async (done) => {
    const { request, habitLogRepository } = await createTestConfiguration();
    const habitLog = buildHabitLog().build();
    const id = await habitLogRepository.add(habitLog);
    const response = await request.delete(`/habitlog/${id}`);
    expect(response.status).toBe(204);
    done();
  });
});
