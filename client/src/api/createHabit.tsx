import { CreateHabitInput } from "./types";

export async function createHabit(input: CreateHabitInput) {
  await fetch("habit/", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
