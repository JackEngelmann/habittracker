import { Moment } from "moment";

export class HabitLog {
  date: Moment;
  constructor(options: { date: Moment }) {
    this.date = options.date;
  }
}
