import React, { useCallback } from "react";
import { useHabits } from "../api/useHabits";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { HomeButton } from "../components/HomeButton";

const Root = styled.div`
  position: relative;
  padding: 3em 4em;
`;

const CreateButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  font-size: 2.5em;
  height: 1.5em;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 1.5em;
  cursor: pointer;
`;

const Habit = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: block;
  font-size: 1.5em;
  margin-bottom: 0.5em;
`;

export function HomePage() {
  const [habits] = useHabits();
  const history = useHistory();
  const createHabit = useCallback(() => history.push("/habit/create"), [
    history,
  ]);

  return (
    <Root>
      <HomeButton />
      {habits.map((h) => (
        <Habit onClick={() => history.push(`/habit/${h.id}`)} key={h.id}>
          {h.title}
        </Habit>
      ))}
      <CreateButton onClick={createHabit}>+</CreateButton>
    </Root>
  );
}
