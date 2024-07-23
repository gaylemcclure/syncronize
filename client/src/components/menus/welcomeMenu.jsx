import styled from "styled-components";
// import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";


//Menu component that shows when nav icon is clicked
const WelcomeMenu = () => {
  return (

    <WorkspaceContainer>
      {/* <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button} rightIcon={<span className="material-symbols-outlined">menu</span>}></MenuButton>
            <MenuList>
              <MenuItem>
                <span className="material-symbols-outlined space">edit</span>Product
              </MenuItem>
              <MenuItem onClick={() => alert("Kagebunshin")}>
                <span className="material-symbols-outlined space">settings</span>Solutions
              </MenuItem>
              <MenuItem onClick={() => alert("Kagebunshin")}>
                <span className="material-symbols-outlined space">group</span>Pricing
              </MenuItem>
              <MenuItem onClick={() => alert("Kagebunshin")}>
                <span className="material-symbols-outlined space">group</span>Log in
              </MenuItem>
              <MenuItem onClick={() => alert("Kagebunshin")}>
                <span className="material-symbols-outlined space">group</span>Sign up
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu> */}
    </WorkspaceContainer>

  );
};

const WorkspaceContainer = styled.div`
  .chakra-button.chakra-menu__menu-button {
    background-color: transparent;
  border: none;
  color: white;
  font-weight: 600;
  padding-right: 0;
  padding-left: 0;
  .material-symbols-outlined {
    font-size: 28px;
  }
  }
  .chakra-button.chakra-menu__menu-button:hover {
    opacity: 0.7;
  }
  .menu-header {
    padding: 0.5rem 1rem 1rem;
    border-bottom: 1px solid #d9d9d9;
  }
`;

export default WelcomeMenu;
