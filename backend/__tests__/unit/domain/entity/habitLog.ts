import { HabitLog } from "domain/entity/habitLog";
import moment from "moment";

test("Creation of a habit log to work", () => {
  // arrange
  const date = moment("2010-11-10");
  const habitId = 10;
  const amount = 120;
  // act
  const habitLog = new HabitLog({ date, habitId, amount });
  // assert
  expect(date.isSame(habitLog.date)).toBe(true);
  expect(habitLog.habitId).toBe(habitId);
  expect(habitLog.amount).toBe(amount);
});
