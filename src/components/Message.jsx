import React from "react";
import styled from "styled-components";

const Info = styled.h2`
  color: var(--light);
  margin: 0;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 25px;
`

const Warning = styled(Info)`
  background-color: var(--warning);
`

const Success = styled(Info)`
  background-color: var(--success);
`

const Random = styled(Info)`
  background-color: var(--orangeRed);
`

const Icon = styled.span`
  height: 50px;
  width:  50px;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--light);
`

const Message = ({text, status}) => {
  switch (status) {
    case "warning":
      return <Warning><Icon>💀</Icon> {text}</Warning>
    case "info":
      return <Info><Icon>ℹ</Icon> {text}</Info> 
    case "success":
      return  <Success><Icon>👍</Icon> {text}</Success> 
    case "random":
      return  <Random><Icon>🎲</Icon> {text}</Random> 
    default: 
      return null;
  }
}

export default Message;