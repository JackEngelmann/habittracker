import { Moment } from "moment";
import { Id } from "./Id";

export class HabitLog {
  id: Id | undefined;
  date: Moment;
  amount: number;

  constructor(options: { date: Moment; amount: number; id?: Id }) {
    this.date = options.date;
    this.amount = options.amount;
    this.id = options.id;
  }
}
