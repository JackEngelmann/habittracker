import React, { useCallback, useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHabit } from "../api/useHabit";
import styled from "styled-components";
import { HomeButton } from "../components/HomeButton";
import { DeleteButton } from "../components/DeleteButton";
import { ApiContext } from "../api/ApiContext";
import { Calendar } from "../components/Calendar";
import moment from "moment";
import { useHabitLogs } from "../api/useHabitLogs";

type Params = {
  id: string;
};

const Root = styled.div`
  padding: 3em 4em;
  position: relative;
`;

const Header = styled.div``;
const ScrollingContent = styled.div``;
const Bold = styled.div`
  font-weight: bold;
`;
const Amount = styled.span`
  font-size: 1.5em;
  margin-right: 0.5em;
`;
const AmountLabel = styled.label`
  display: flex;
  align-items: baseline;
`;
const AmountInput = styled.input`
  border: none;
  font-size: 1.5em;
  width: 3em;
`;
const SaveButton = styled.button``;

export function HabitPage() {
  const { deleteHabit, updateHabitLog, createHabitLog } = useContext(
    ApiContext
  );
  const params = useParams<Params>();
  const habitId = parseInt(params.id);
  const [habit] = useHabit(habitId);
  const history = useHistory();
  const [habitLogs, reloadHabitLogs] = useHabitLogs(habitId);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [amount, setAmount] = useState(0);

  const onDelete = useCallback(async () => {
    await deleteHabit(habitId);
    history.push("/");
  }, [habitId, deleteHabit, history]);

  const matchingHabitLog = habitLogs.find((hl) =>
    hl.date.isSame(selectedDate, "day")
  );

  useEffect(() => {
    if (matchingHabitLog) {
      setAmount(matchingHabitLog.amount);
    } else {
      setAmount(0);
    }
  }, [matchingHabitLog]);

  async function onSave() {
    if (matchingHabitLog) {
      await updateHabitLog({
        id: matchingHabitLog.id,
        date: matchingHabitLog.date,
        amount,
        habitId,
      });
    } else {
      await createHabitLog({
        date: selectedDate,
        amount,
        habitId,
      });
    }
    reloadHabitLogs();
  }

  function renderScrollingContent() {
    if (!habit) {
      return <h1>Loading</h1>;
    }
    return (
      <>
        <h1>{habit.title}</h1>
        <div>Target: {habit.target}</div>
        <AmountLabel>
          <Amount>Amount:</Amount>
          <AmountInput
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <SaveButton onClick={onSave}>Save</SaveButton>
        </AmountLabel>
        <Calendar
          renderDay={(day) => (
            <Day
              day={day}
              isSelected={day.isSame(selectedDate, "day")}
              onClick={() => setSelectedDate(day)}
            />
          )}
        />
      </>
    );
  }

  return (
    <Root>
      <HomeButton />
      <Header>
        <DeleteButton onClick={onDelete} />
      </Header>
      <ScrollingContent>{renderScrollingContent()}</ScrollingContent>
    </Root>
  );
}

function Day(props: {
  isSelected: boolean;
  day: moment.Moment;
  onClick: () => void;
}) {
  const { isSelected, day, onClick } = props;
  if (isSelected) {
    return <Bold>{day.date()}</Bold>;
  }
  return <div onClick={onClick}>{day.date()}</div>;
}
