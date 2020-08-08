import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { CreateHabit } from "../../../usecase/createHabit";
import { FindHabit } from "../../../usecase/findHabit";
import { UpdateHabit } from "../../../usecase/updateHabit";
import { DeleteHabit } from "../../../usecase/deleteHabit";
import { Request, Response } from "express";

@injectable()
export class ExpressHabitController {
  constructor(
    @inject(TYPES.CreateHabit) private createHabit: CreateHabit,
    @inject(TYPES.FindHabit) private findHabit: FindHabit,
    @inject(TYPES.UpdateHabit) private updateHabit: UpdateHabit,
    @inject(TYPES.DeleteHabit) private deleteHabit: DeleteHabit
  ) {}

  handleGet = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const habit = await this.findHabit.find(id);
    res.json(habit);
  };

  handleGetAll = async (req: Request, res: Response) => {
    const habit = await this.findHabit.getAll();
    res.json(habit);
  };

  handleCreate = async (req: Request, res: Response) => {
    const createInput = req.body;
    const createdId = await this.createHabit.create(createInput);
    const createdHabit = await this.findHabit.find(createdId);
    res.json(createdHabit);
  };

  handleUpdate = async (req: Request, res: Response) => {
    const updateInput = req.body;
    const id = parseInt(req.params.id);
    await this.updateHabit.update(id, updateInput);
    const updatedHabit = await this.findHabit.find(id);
    res.json(updatedHabit);
  };

  handleDelete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await this.deleteHabit.delete(id);
    res.status(204);
    res.json();
  };
}
