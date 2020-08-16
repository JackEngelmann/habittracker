import { useState, useEffect, useContext } from "react";
import { Habit, Id } from "./types";
import { ApiContext } from "./ApiContext";
import { useReload } from "./useReload";

export function useHabit(id: Id): [Habit | null, () => void] {
  const { getHabit } = useContext(ApiContext);
  const [habit, setHabit] = useState<Habit | null>(null);
  const [reloadCounter, reload] = useReload();
  useEffect(() => {
    getHabit(id).then(setHabit);
  }, [reloadCounter, id, getHabit]);
  return [habit, reload];
}
