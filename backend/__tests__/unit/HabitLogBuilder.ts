import { Id } from "../../src/domain/entity/Id";
import moment from "moment";
import { HabitLog } from "../../src/domain/entity/HabitLog";

test("avoid jest to complain about this utils module", () => {});

export class HabitLogBuilder {
  date: moment.Moment;
  amount: number;
  id: Id | undefined;
  habitId: Id;

  constructor() {
    this.date = moment("2013-02-04T22:44:30.652Z");
    this.amount = 10;
    this.habitId = 1;
  }

  withDate(date: moment.Moment) {
    this.date = date;
    return this;
  }

  withAmount(amount: number) {
    this.amount = amount;
    return this;
  }

  withHabitId(habitId: Id) {
    this.habitId = habitId;
    return this;
  }

  withId(id: Id) {
    this.id = id;
    return this;
  }

  build() {
    return new HabitLog({
      id: this.id,
      amount: this.amount,
      date: this.date,
      habitId: this.habitId,
    });
  }
}

export const buildHabitLog = () => new HabitLogBuilder();
