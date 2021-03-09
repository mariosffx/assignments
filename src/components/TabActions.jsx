import { useLocation } from "react-router";
import styled from "styled-components";
import React from "react";

const TabActionsContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  background-color: var(--gray);
`
  
const Action = styled.button`
  padding: 15px;
  border: 1px solid var(--light);
  border-radius: 5px;
  background-color: var(--gray);
  color: var(--light);
  margin-right: 15px;
`

const Actions = styled.div`
  border-radius: 0 0 10px 10px;
  height: 100%;
  flex-basis: 30%;
  padding: 15px 15px 15px 25px;
  background-color: var(--gray);
`

const StatusContainer = styled.div`
  flex-basis: 70%;
  background-color: var(--dark);
  border-radius-bottom-left: 500px;
  display: flex;
  padding: 15px;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`
  
  const Status = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  
`
const Prices = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

`
const BoardPrice = styled.h5`
  margin: 0;
`
const TotalPrice = styled.h4`
  margin: 0;
  color: var(--success);
  letter-spacing: 3px;
`
const PlayAllContainer = styled.div`
  margin-left: 15px;
`
const PlayAll = styled.button`
  background-color: var(--success);
  height 100%;
  border: 0;
  border-radius: 15px;
  padding: 25px 50px;
  font-weight: bold;
  color: var(--light);
`

const Player = styled.div``
const Name = styled.div``
const Cash = styled.div``
const Label = styled.label`
  display: inline-block;
  line-height: 1.4em;
  font-weight: bold;
`
const Select = styled.select`
  width: 120px;
  padding: 10px;
  margin-left: 15px;
  background-color: var(--dark);
  color: var(--success);
`

const Option = styled.option`
  background-color: var(--dark);
  color: var(--success);

`

const Span = styled.span`
  font-weight: bolder;
  color: var(--warning);
`
const TabActions = ({
  totalPrice, tabs, customNumbers, 
  getKeyByValue, playAll, cash,
  playerName, clear, random, handleChange

}) => {
  const slugID = useLocation().pathname.substring(1)
  const index = getKeyByValue(customNumbers, slugID);
  let tabPrice = 0;

  try {
    tabPrice = tabs[index].price.toFixed(2);
  } catch (error) {
    tabPrice = "0.00";
  }

  return (
    <TabActionsContainer>
      <Actions>
        <Action onClick={() => clear(index)}>
          CLR
        </Action>
        <Action onClick={() => random(index)}>
          RDM
        </Action>
      </Actions>
      <StatusContainer>
        <Status>
          <Player>
            <Name>
              <strong>Player Name: </strong>{playerName}
            </Name>
            <Label htmlFor="multiplier">
              Feeling Lucky? <Span>Bet x</Span>
            </Label>
            <Select id="multiplier" onChange={handleChange}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={4}>4</Option>
              <Option value={8}>8</Option>
              <Option value={16}>16</Option>
            </Select>
            <Cash>
              Cash: {cash}💲
            </Cash>
          </Player>
          <Prices>
            <BoardPrice>
              Board Price ${tabPrice}
            </BoardPrice>
            <TotalPrice>
              Total Price ${totalPrice}
            </TotalPrice>
          </Prices>
          <PlayAllContainer>
            <PlayAll onClick={playAll}>
              Play All
            </PlayAll>
          </PlayAllContainer>
        </Status>
      </StatusContainer>
    </TabActionsContainer>
  )
}

export default TabActions;