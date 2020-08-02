import express from "express";
import { Server } from "../../usecase/port/Server";
import { CreateHabit } from "../../usecase/createHabit";
import { FindHabit } from "../../usecase/findHabit";
import { UpdateHabit } from "../../usecase/updateHabit";
import { Database } from "../../usecase/port/Database";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";

@injectable()
export class ExpressServer implements Server {
  public app: express.Express;

  constructor(
    @inject(TYPES.Database) private database: Database,
    @inject(TYPES.CreateHabit) private createHabit: CreateHabit,
    @inject(TYPES.FindHabit) private findHabit: FindHabit,
    @inject(TYPES.UpdateHabit) private updateHabit: UpdateHabit
  ) {
    this.app = express();
    this.app.use(express.json());
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // get habit
    this.app.get("/habit/:id", async (req, res) => {
      const id = parseInt(req.params.id);
      const habit = await this.findHabit.find(id);
      res.json(habit);
    });

    // get all habits
    this.app.get("/habit/", async (req, res) => {
      const habit = await this.findHabit.getAll();
      res.json(habit);
    });

    // create habit
    this.app.post("/habit/", async (req, res) => {
      const createInput = req.body;
      const createdId = await this.createHabit.create(createInput);
      const createdHabit = await this.findHabit.find(createdId);
      res.json(createdHabit);
    });

    // update habit
    this.app.put("/habit/:id", async (req, res) => {
      const updateInput = req.body;
      const id = parseInt(req.params.id);
      await this.updateHabit.update(id, updateInput);
      const updatedHabit = await this.findHabit.find(id);
      res.json(updatedHabit);
    });
  }

  public async listen(port: number) {
    await this.database.createSchema(); // TODO
    this.app.listen(port);
  }
}
