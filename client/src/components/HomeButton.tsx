import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Home = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 2.5em;
  font-style: italic;
  height: 1.5em;
  padding-left: 0.5em;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;

  b {
    font-size: 1.2em;
    font-weight: bold;
  }
`;

export function HomeButton() {
  const history = useHistory();
  const goHome = useCallback(() => history.push("/"), []);
  return <Home onClick={goHome}>H</Home>;
}
