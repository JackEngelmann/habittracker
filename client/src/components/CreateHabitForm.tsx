import React from "react";
import styled from "styled-components";
import { CreateHabitInput } from "../api/types";

const Root = styled.div``;

const TitleInput = styled.input`
  font-size: 2.5em;
  border: none;
  min-width: 5em;
  width: auto;
`;

const IsGoodToggleButton = styled.button`
  font-size: 1.5em;
  border: none;
  background-color: transparent;
  padding: 0.5em 0;
  cursor: pointer;
`;

const Target = styled.span`
  font-size: 1.5em;
  margin-right: 0.5em;
`;

const TargetLabel = styled.label`
  display: flex;
  align-items: baseline;
`;

const TargetInput = styled.input`
  border: none;
  font-size: 1.5em;
  width: 3em;
`;

type Props = {
  value: CreateHabitInput;
  onChange(value: CreateHabitInput): void;
};

export function CreateHabitForm(props: Props) {
  const { value, onChange } = props;
  return (
    <Root>
      <TitleInput
        placeholder="My habit"
        value={value.title}
        onChange={(e) =>
          onChange({
            ...value,
            title: e.target.value,
          })
        }
      />
      <br />
      <IsGoodToggleButton
        onClick={() => onChange({ ...value, isGood: !value.isGood })}
      >
        {value.isGood ? "... is good" : "... is bad"}
      </IsGoodToggleButton>
      <br />
      <TargetLabel>
        <Target>Target:</Target>
        <TargetInput
          type="number"
          value={value.target}
          onChange={(e) =>
            onChange({ ...value, target: parseInt(e.target.value) })
          }
        />
      </TargetLabel>
    </Root>
  );
}
