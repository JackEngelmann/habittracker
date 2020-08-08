import { Id } from "./types";

export async function deleteHabit(id: Id) {
  await fetch(`/habit/${id}`, {
    method: "DELETE",
  });
}
