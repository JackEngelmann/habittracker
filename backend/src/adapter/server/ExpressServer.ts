import express from "express";
import { Server } from "../../usecase/port/Server";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ExpressHabitController } from "../controller/express/ExpressHabitController";
import { ExpressHabitLogController } from "../controller/express/ExpressHabitLogController";

const ENDPOINTS = {
  habit: "/habit",
  habitLog: "/habitlog",
};

@injectable()
export class ExpressServer implements Server {
  public app: express.Express;

  constructor(
    @inject(TYPES.ExpressHabitController)
    private habitController: ExpressHabitController,
    @inject(TYPES.ExpressHabitLogController)
    private habitLogController: ExpressHabitLogController
  ) {
    this.app = express();
    this.app.use(express.json());
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.app.use(ENDPOINTS.habit, this.getHabitRoutes());
    this.app.use(ENDPOINTS.habitLog, this.getHabitLogRoutes());
  }

  private getHabitRoutes() {
    const habitRoutes = express();
    habitRoutes.get(`/:id`, this.habitController.handleGet);
    habitRoutes.get(`/`, this.habitController.handleGetAll);
    habitRoutes.post(`/`, this.habitController.handleCreate);
    habitRoutes.put(`/:id`, this.habitController.handleUpdate);
    habitRoutes.delete(`/:id`, this.habitController.handleDelete);
    return habitRoutes;
  }

  private getHabitLogRoutes() {
    const habitLogRoutes = express();
    habitLogRoutes.get(`/:id`, this.habitLogController.handleGet);
    habitLogRoutes.get(`/`, this.habitLogController.handleGetAll);
    habitLogRoutes.post(`/`, this.habitLogController.handleCreate);
    habitLogRoutes.put(`/:id`, this.habitLogController.handleUpdate);
    habitLogRoutes.delete(`/:id`, this.habitLogController.handleDelete);
    return habitLogRoutes;
  }

  public async listen(port: number) {
    this.app.listen(port);
  }
}
