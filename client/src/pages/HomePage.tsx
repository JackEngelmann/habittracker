import React, { useState } from "react";
import { useHabits } from "../api/useHabits";
import { CreateHabitModal } from "../components/CreateHabitModal";
import { createHabit } from "../api/createHabit";
import { Link } from "react-router-dom";

export function HomePage() {
  const [habits, reloadHabits] = useHabits();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div>
      {habits.map((h) => (
        <Link to={`/habit/${h.id}`}>
          <div>{h.title}</div>
        </Link>
      ))}
      {isCreateOpen && (
        <CreateHabitModal
          close={() => setIsCreateOpen(false)}
          createHabit={async (input) => {
            await createHabit(input);
            reloadHabits();
            setIsCreateOpen(false);
          }}
        />
      )}
      <button onClick={() => setIsCreateOpen(true)}>Create Habit</button>
    </div>
  );
}
