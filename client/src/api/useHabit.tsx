import { useState, useEffect, useContext } from "react";
import { Habit, Id } from "./types";
import { ApiContext } from "./ApiContext";

export function useHabit(id: Id): [Habit | null, () => void] {
  const { getHabit } = useContext(ApiContext);
  const [habit, setHabit] = useState<Habit | null>(null);
  const [reloadCounter, setReloadCounter] = useState(0);
  useEffect(() => {
    getHabit(id).then(setHabit);
  }, [reloadCounter, id]);
  const reload = () => setReloadCounter((counter) => counter + 1);
  return [habit, reload];
}
