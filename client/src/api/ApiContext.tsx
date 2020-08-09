import React from "react";
import { CreateHabitInput, Id, Habit } from "./types";

interface ApiContextInterface {
  createHabit(input: CreateHabitInput): Promise<void>;
  deleteHabit(id: Id): Promise<void>;
  getHabit(id: Id): Promise<Habit>;
  getAllHabits(): Promise<Habit[]>;
}

const API_PROVIDER_NOT_FOUND = "Api context provider not given";

export const ApiContext = React.createContext<ApiContextInterface>({
  createHabit(input: CreateHabitInput) {
    throw new Error(API_PROVIDER_NOT_FOUND);
  },
  deleteHabit(id: Id) {
    throw new Error(API_PROVIDER_NOT_FOUND);
  },
  getHabit(id: Id): Promise<Habit> {
    throw new Error(API_PROVIDER_NOT_FOUND);
  },
  getAllHabits(): Promise<Habit[]> {
    throw new Error(API_PROVIDER_NOT_FOUND);
  },
});

export const RestApi = {
  async createHabit(input: CreateHabitInput) {
    await fetch("habit/", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async deleteHabit(id: Id) {
    await fetch(`/habit/${id}`, {
      method: "DELETE",
    });
  },
  async getHabit(id: Id): Promise<Habit> {
    const response = await fetch(`/habit/${id}`);
    return response.json();
  },
  async getAllHabits(): Promise<Habit[]> {
    const response = await fetch("habit");
    return response.json();
  },
};
