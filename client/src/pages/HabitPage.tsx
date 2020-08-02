import React from "react";
import { useParams } from "react-router-dom";
import { useHabit } from "../api/useHabit";

type Params = {
  id: string;
};

export function HabitPage() {
  const params = useParams<Params>();
  const id = parseInt(params.id);
  const [habit] = useHabit(id);
  return (
    <div>
      {habit ? (
        <>
          <h1>{habit.title}</h1>
          <div>Target: {habit.target}</div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
