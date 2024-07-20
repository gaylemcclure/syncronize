
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import styled from "styled-components";

const WorkspaceMenu = () => {
  return (
    <WorkspaceContainer>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button} rightIcon={<span className="material-symbols-outlined">keyboard_arrow_down</span>}></MenuButton>
            <MenuList>
              <MenuItem><span className="material-symbols-outlined space">edit</span>Rename workspace</MenuItem>
              <MenuItem onClick={() => alert("Kagebunshin")}><span className="material-symbols-outlined space">settings</span>Manage workspace</MenuItem>
              <MenuItem onClick={() => alert("Kagebunshin")}><span className="material-symbols-outlined space">group</span>Manage users</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </WorkspaceContainer>
  );
};

const WorkspaceContainer = styled.div`
  .chakra-button {
    border: none;
    color: var(--ws-gray-text);
    background-color: transparent!important;
    width: 3rem;
  }
  .chakra-button.chakra-menu__menu-button:hover, .chakra-button.chakra-menu__menu-button:active {
    background-color: transparent;
    opacity: 0.5;
  }
`;


export default WorkspaceMenu;
