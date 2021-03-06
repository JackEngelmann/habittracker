import "reflect-metadata";
import { SqliteQueryBuilder } from "../../../../src/adapter/database/sqlite/SqliteQueryBuilder";

test("build select", () => {
  const query = new SqliteQueryBuilder().table("table").selectOne();

  expect(query.rawSqlCommand).toBe("SELECT * FROM table");
});

test("build select with where", () => {
  const query = new SqliteQueryBuilder()
    .table("table")
    .where("id = :id", { id: 3 })
    .selectOne();

  expect(query.rawSqlCommand).toBe("SELECT * FROM table WHERE id = 3");
});

test("build insert", () => {
  const query = new SqliteQueryBuilder()
    .table("table")
    .values({
      firstKey: "firstValue",
      secondKey: 10,
    })
    .insertOne();

  expect(query.rawSqlCommand).toBe(
    "INSERT INTO table (firstKey, secondKey) VALUES ('firstValue', 10)"
  );
});

test("build update", () => {
  const query = new SqliteQueryBuilder()
    .table("table")
    .set({
      column1: "value1",
      column2: 2,
    })
    .where("id = :id", { id: 3 })
    .update();
  expect(query.rawSqlCommand).toBe(
    "UPDATE table SET column1 = 'value1', column2 = 2 WHERE id = 3"
  );
});

test("build delete", () => {
  const query = new SqliteQueryBuilder()
    .table("table")
    .where("id = :id", { id: 3 })
    .delete();

  expect(query.rawSqlCommand).toBe("DELETE FROM table WHERE id = 3");
});
