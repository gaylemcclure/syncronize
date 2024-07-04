import React from "react";
import styled from "styled-components";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import UserIconSmall from './userIconSmall';

//Menu component that shows when nav icon is clicked
const DropdownMenu = ({ user }) => {
  return (
    <WorkspaceContainer>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button} >
            {user.initials}
            </MenuButton>
            <MenuList>
            <div className="menu-header flex-row align">
        <UserIconSmall userInitials={user.initials} menuFunction={() => null} width="30px" height="30px" />
        <h4>{user.first} {user.last}</h4>
      </div>
              <MenuItem>
                <span className="material-symbols-outlined space">edit</span>Rename workspace
              </MenuItem>
              <MenuItem onClick={() => alert("Kagebunshin")}>
                <span className="material-symbols-outlined space">settings</span>Manage workspace
              </MenuItem>
              <MenuItem onClick={() => alert("Kagebunshin")}>
                <span className="material-symbols-outlined space">group</span>Manage users
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </WorkspaceContainer>
  );
};

const WorkspaceContainer = styled.div`
  .chakra-button.chakra-menu__menu-button {
    background-color: var(--main-green);
  border-radius: 50%;
  border: none;
  color: white;
  font-weight: 600;
  transition-timing-function: ease-in;
  transition-duration: 0.2s;
  height: 40px;
  width: 40px;
  padding: 8px;
  }
  .chakra-button.chakra-menu__menu-button:hover {
    opacity: 0.7;
  }
  .menu-header {
    padding: 0.5rem 1rem 1rem;
    border-bottom: 1px solid #d9d9d9;
  }
`;

export default DropdownMenu;
