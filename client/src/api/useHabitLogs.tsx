import { HabitLog, Id } from "./types";
import { useContext, useState, useEffect } from "react";
import { ApiContext } from "./ApiContext";
import { useReload } from "./useReload";

export function useHabitLogs(habitId: Id): [HabitLog[], () => void] {
  const { getHabitLogsForHabit } = useContext(ApiContext);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [reloadCounter, reload] = useReload();
  useEffect(() => {
    getHabitLogsForHabit(habitId).then(setHabitLogs);
  }, [reloadCounter, getHabitLogsForHabit, habitId]);
  return [habitLogs, reload];
}
