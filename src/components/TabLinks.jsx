import styled from "styled-components";
import {NavLink, useLocation} from "react-router-dom";
import React from "react";

const TabsContainer = styled.nav`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
`
const AddNewTab = styled.button`
  background-color: var(--dark);
  color: var(--light);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  border: 1px solid var(--light);
`

const Actions = styled.div``

const Action = styled.button`
  padding: 15px 25px;
  top: -10px;
  border: 2px solid var(--light);
  position: relative;
  justify-self: flex-end;
  align-self: flex-end;
  border-radius: 5px;
  margin-left: 15px;
  background-color: var(--dark);
  color: var(--light);
`

const NavList = styled.ul`
  display: flex;
  margin: 0;
  align-items: center;
  padding: 0;
  height: 50px;
  color: white;
`
const NavItem = styled.li`
  margin-right: 15px;
  color: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 10px 10px 0 0;
`

const Icon = styled.span``

const TabLinks = ({tabs, addTab, clearTabs, randomAll}) => {
  const slugID = useLocation().pathname.substring(1)

  return (
    <TabsContainer>
      <NavList>
        {
        tabs.map(({id, status}) => {
          let icon = "";
          
          if (slugID === id) {
            icon = "⚪"
          } if (status === "ok") {
            icon = "🟢"
          } else if (status === "error") {
            icon = "🔴"
          }

          return (
            <NavItem key={id} status={status}>
              <NavLink 
                className="tabLink"
                activeClassName="activeTab"
                to={`/${id}`}
              >
                <Icon>
                  {icon}
                </Icon>
                <span>
                  {id}
                </span>
              </NavLink>
            </NavItem>
        )})}
        <NavItem>
          <AddNewTab onClick={addTab}>
            ➕
          </AddNewTab>
        </NavItem>
      </NavList>
      <Actions>
        <Action onClick={randomAll}>
          RDM All
        </Action>
        <Action onClick={clearTabs}>
          CLR All
        </Action>
      </Actions>
    </TabsContainer>
  )
}


export default TabLinks;