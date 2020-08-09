import React, { useCallback, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHabit } from "../api/useHabit";
import styled from "styled-components";
import { HomeButton } from "../components/HomeButton";
import { DeleteButton } from "../components/DeleteButton";
import { ApiContext } from "../api/ApiContext";

type Params = {
  id: string;
};

const Root = styled.div`
  padding: 3em 4em;
  position: relative;
`;

const Header = styled.div``;
const ScrollingContent = styled.div``;

export function HabitPage() {
  const { deleteHabit } = useContext(ApiContext);
  const params = useParams<Params>();
  const id = parseInt(params.id);
  const [habit] = useHabit(id);
  const history = useHistory();
  const onDelete = useCallback(async () => {
    await deleteHabit(id);
    history.push("/");
  }, [id]);
  return (
    <Root>
      <HomeButton />
      <Header>
        <DeleteButton onClick={onDelete} />
      </Header>
      <ScrollingContent>
        {habit ? (
          <>
            <h1>{habit.title}</h1>
            <div>Target: {habit.target}</div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </ScrollingContent>
    </Root>
  );
}
