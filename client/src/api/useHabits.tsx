import { useState, useEffect } from "react";
import { Habit } from "./types";

export function useHabits(): [Habit[], () => void] {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [reloadCounter, setReloadCounter] = useState(0);
  useEffect(() => {
    fetchHabits().then(setHabits);
  }, [reloadCounter]);
  const reload = () => setReloadCounter((counter) => counter + 1);
  return [habits, reload];
}

async function fetchHabits() {
  const response = await fetch("habit");
  return response.json();
}
