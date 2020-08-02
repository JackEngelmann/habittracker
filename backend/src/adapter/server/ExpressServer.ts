import express from "express";
import { Server, createServer } from "../../usecase/port/Server";
import { CreateHabit } from "../../usecase/createHabit";
import { FindHabit } from "../../usecase/findHabit";
import { UpdateHabit } from "../../usecase/updateHabit";

export const createExpressServer: createServer = (
  createHabit: CreateHabit,
  findHabit: FindHabit,
  updateHabit: UpdateHabit
) => new ExpressServer(createHabit, findHabit, updateHabit);

export class ExpressServer implements Server {
  private createHabit: CreateHabit;
  private findHabit: FindHabit;
  private updateHabit: UpdateHabit;

  public app: express.Express;

  constructor(
    createHabit: CreateHabit,
    findHabit: FindHabit,
    updateHabit: UpdateHabit
  ) {
    this.createHabit = createHabit;
    this.findHabit = findHabit;
    this.updateHabit = updateHabit;

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

  public listen(port: number) {
    this.app.listen(port);
  }
}
