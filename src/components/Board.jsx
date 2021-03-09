import React from "react";
import styled from "styled-components";

const BoardContainer = styled.div`
  min-height: 40vh;
`
const NumbersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const BoardNumber = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
  margin-bottom: 15px;
  color: var(--light);
  border: 0;
  font-weight: bold;
  background-color: ${props => props.chosen 
    ?  "var(--orangeRed)" 
    :  "var(--lightGray)" 
  };
`
const Board = ({id, numbers, toggleNumber}) => {
  const boardNumbers = [];
  for (let i = 1; i < 50; i++) {
    boardNumbers.push(
      <BoardNumber 
        key={i}
        chosen={numbers.includes(i) && true}
        onClick={() => toggleNumber(id, i)}
      >
        {i}
      </BoardNumber>
    )
  }

  return (
    <BoardContainer>
      <NumbersContainer>
        {boardNumbers}
      </NumbersContainer>
    </BoardContainer>
  )
}


export default Board;


