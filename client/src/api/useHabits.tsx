import { useState, useEffect, useContext } from "react";
import { Habit } from "./types";
import { ApiContext } from "./ApiContext";
import { useReload } from "./useReload";

export function useHabits(): [Habit[], () => void] {
  const { getAllHabits } = useContext(ApiContext);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [reloadCounter, reload] = useReload();
  useEffect(() => {
    getAllHabits().then(setHabits);
  }, [reloadCounter, getAllHabits]);
  return [habits, reload];
}
