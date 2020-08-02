import { useState, useEffect } from "react";
import { Habit, Id } from "./types";

export function useHabit(id: Id): [Habit | null, () => void] {
  const [habit, setHabit] = useState<Habit | null>(null);
  const [reloadCounter, setReloadCounter] = useState(0);
  useEffect(() => {
    fetchHabit(id).then(setHabit);
  }, [reloadCounter, id]);
  const reload = () => setReloadCounter((counter) => counter + 1);
  return [habit, reload];
}

async function fetchHabit(id: Id) {
  const response = await fetch(`/habit/${id}`);
  return response.json();
}
