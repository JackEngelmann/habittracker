import { useState } from "react";

export function useReload(): [number, () => void] {
  const [reloadCounter, setReloadCounter] = useState(0);
  const reload = () => setReloadCounter((counter) => counter + 1);
  return [reloadCounter, reload];
}
