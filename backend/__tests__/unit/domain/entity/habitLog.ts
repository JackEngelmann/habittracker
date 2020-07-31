import { HabitLog } from "domain/entity/habitLog";
import moment from "moment";

test("Creation of a habit log to work", () => {
  // arrange
  const date = moment("2010-11-10");
  // act
  const habitLog = new HabitLog({ date });
  // assert
  expect(date.isSame(habitLog.date)).toBe(true);
});
