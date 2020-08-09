import React, { useState, useCallback, useContext } from "react";
import { CreateHabitForm } from "../components/CreateHabitForm";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { HomeButton } from "../components/HomeButton";
import { ApiContext } from "../api/ApiContext";

const Root = styled.div`
  padding: 3em 4em;
  position: relative;
`;

const CancelButton = styled.button`
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

const SaveButton = styled.button`
  border: #d5a021;
  background-color: #d5a021;
  font-size: 1.3em;
  text-transform: uppercase;
  padding: 0.2em 0.4em;
`;

export function CreateHabitPage() {
  const { createHabit } = useContext(ApiContext);
  const [createInput, setCreateInput] = useState({
    title: "",
    isGood: true,
    target: 0,
  });
  const history = useHistory();
  const cancel = useCallback(() => history.push("/habit/"), []);
  const create = useCallback(async () => {
    setIsInProgress(true);
    await createHabit(createInput);
    history.push("/habit/");
  }, [createInput]);
  const [isInProgress, setIsInProgress] = useState(false);
  return (
    <Root>
      <HomeButton />
      <CancelButton onClick={cancel}>x</CancelButton>
      <CreateHabitForm value={createInput} onChange={setCreateInput} />
      <br />
      <SaveButton onClick={create} disabled={isInProgress}>
        Save
      </SaveButton>
    </Root>
  );
}
