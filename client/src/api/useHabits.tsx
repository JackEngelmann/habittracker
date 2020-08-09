import { useState, useEffect, useContext } from "react";
import { Habit } from "./types";
import { ApiContext } from "./ApiContext";

export function useHabits(): [Habit[], () => void] {
  const { getAllHabits } = useContext(ApiContext);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [reloadCounter, setReloadCounter] = useState(0);
  useEffect(() => {
    getAllHabits().then(setHabits);
  }, [reloadCounter]);
  const reload = () => setReloadCounter((counter) => counter + 1);
  return [habits, reload];
}
