import { SqliteQueryBuilder } from "../../../../src/details/sqlite/SqliteQueryBuilder";

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
