import React from "react";
import {
  CreateHabitInput,
  Id,
  Habit,
  CreateHabitLogInput,
  HabitLog,
  UpdateHabitLogInput,
} from "./types";
import moment from "moment";

interface ApiContextInterface {
  createHabit(input: CreateHabitInput): Promise<void>;
  deleteHabit(id: Id): Promise<void>;
  getHabit(id: Id): Promise<Habit>;
  getAllHabits(): Promise<Habit[]>;

  getHabitLogsForHabit(habitId: Id): Promise<HabitLog[]>;
  createHabitLog(input: CreateHabitLogInput): Promise<void>;
  updateHabitLog(input: UpdateHabitLogInput): Promise<void>;
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

  getHabitLogsForHabit(habitId: Id): Promise<HabitLog[]> {
    throw new Error(API_PROVIDER_NOT_FOUND);
  },
  createHabitLog(input: CreateHabitLogInput): Promise<void> {
    throw new Error(API_PROVIDER_NOT_FOUND);
  },
  updateHabitLog(input: UpdateHabitLogInput): Promise<void> {
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

  async createHabitLog(input: CreateHabitLogInput) {
    await fetch("habitlog/", {
      method: "POST",
      body: JSON.stringify({
        ...input,
        date: input.date.toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async getHabitLogsForHabit(habitId: Id) {
    const response = await fetch(`habit/${habitId}/habitlogs`);
    const json = await response.json();
    return json.map(jsonToHabitLog);
  },
  async updateHabitLog(input: UpdateHabitLogInput) {
    await fetch("habitlog/", {
      method: "PUT",
      body: JSON.stringify({
        ...input,
        date: input.date.toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

function jsonToHabitLog(json: any) {
  return {
    ...json,
    date: moment(json.date),
  };
}
