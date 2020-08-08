import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type Props = { className?: string; onClick?: () => void };

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

export function DeleteButton(props: Props) {
  return <StyledIcon icon={faTrash} {...props} />;
}
