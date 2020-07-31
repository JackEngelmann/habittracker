import express from "express";
import { Server, createServer } from "../../usecase/port/Server";
import { CreateHabit } from "../../usecase/createHabit";
import { FindHabit } from "../../usecase/findHabit";

export const createExpressServer: createServer = (
  createHabit: CreateHabit,
  findHabit: FindHabit
) => new ExpressServer(createHabit, findHabit);

export class ExpressServer implements Server {
  createHabit: CreateHabit;
  findHabit: FindHabit;

  constructor(createHabit: CreateHabit, findHabit: FindHabit) {
    this.createHabit = createHabit;
    this.findHabit = findHabit;
  }

  initialize(port: number): void {
    const app = express();

    app.get("/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const habit = this.findHabit.find(id);
      console.log(id);
      console.log(habit);
      res.json(habit);
    });

    app.listen(port);
  }
}
