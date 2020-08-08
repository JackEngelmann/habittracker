import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { CreateHabitLog } from "../../../usecase/createHabitLog";
import { FindHabitLog } from "../../../usecase/findHabitLog";
import { UpdateHabitLog } from "../../../usecase/updateHabitLog";
import { DeleteHabitLog } from "../../../usecase/deleteHabitLog";
import { Request, Response } from "express";

@injectable()
export class ExpressHabitLogController {
  constructor(
    @inject(TYPES.CreateHabitLog) private createHabitLog: CreateHabitLog,
    @inject(TYPES.FindHabitLog) private findHabitLog: FindHabitLog,
    @inject(TYPES.UpdateHabitLog) private updateHabitLog: UpdateHabitLog,
    @inject(TYPES.DeleteHabitLog) private deleteHabitLog: DeleteHabitLog
  ) {}

  handleGet = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const habitLog = await this.findHabitLog.find(id);
    res.json(habitLog);
  };

  handleGetAll = async (req: Request, res: Response) => {
    const habitLog = await this.findHabitLog.getAll();
    res.json(habitLog);
  };

  handleCreate = async (req: Request, res: Response) => {
    const createInput = req.body;
    const createdId = await this.createHabitLog.create(createInput);
    const createdHabitLog = await this.findHabitLog.find(createdId);
    res.json(createdHabitLog);
  };

  handleUpdate = async (req: Request, res: Response) => {
    const updateInput = req.body;
    const id = parseInt(req.params.id);
    await this.updateHabitLog.update(id, updateInput);
    const updatedHabitLog = await this.findHabitLog.find(id);
    res.json(updatedHabitLog);
  };

  handleDelete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await this.deleteHabitLog.delete(id);
    res.status(204);
    res.json();
  };
}
