import React from "react";
import styled from "styled-components";
import Board from "./Board";

const BoardContainer = styled.main`
  background-color: var(--gray);
  padding: 25px;
`

const Tab = ({id, numbers, toggleNumber}) => (
  <BoardContainer>
    <Board id={id} numbers={numbers} toggleNumber={toggleNumber} />
  </BoardContainer>
)

export default Tab;