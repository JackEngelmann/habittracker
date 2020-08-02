import React, { useState } from "react";
import styled from "styled-components";
import { CreateHabitInput } from "../api/types";

const Modal = styled.div`
  background-color: lightblue;
`;

type Props = {
  close: () => void;
  createHabit: (input: CreateHabitInput) => Promise<void>;
};

export function CreateHabitModal(props: Props) {
  const [createInput, setCreateInput] = useState({
    title: "",
    isGood: true,
    target: 0,
  });
  console.log(createInput);
  return (
    <Modal>
      Create Habit:
      <br />
      <label>
        <span>Title</span>
        <input
          value={createInput.title}
          onChange={(e) =>
            setCreateInput({
              ...createInput,
              title: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        <span>Is Good</span>
        <input
          type="checkbox"
          checked={createInput.isGood}
          onChange={(e) =>
            setCreateInput({ ...createInput, isGood: e.target.checked })
          }
        />
      </label>
      <br />
      <label>
        <span>Target</span>
        <input
          type="number"
          value={createInput.target}
          onChange={(e) =>
            setCreateInput({ ...createInput, target: parseInt(e.target.value) })
          }
        />
      </label>
      <br />
      <button onClick={() => props.createHabit(createInput)}>Create</button>
      <button onClick={props.close}>Close</button>
    </Modal>
  );
}
