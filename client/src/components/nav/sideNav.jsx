import React from "react";
import styled from "styled-components";
import WorkspaceMenu from '../menus/workspaceMenu';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
//TODO - render the projects from the DB

const SideNav = ({ workspaceInitials, openMenu, menuFunction }) => {
  const AddBoardModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <button onClick={onOpen} className="add-button-icon">
          <span className="material-symbols-outlined">add</span>
        </button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

            <ModalFooter>
              <button onClick={onClose}>Close</button>
              <button>Secondary Action</button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <ChakraProvider>
      <Sidebar className={openMenu ? "sidebar open" : "sidebar closed"}>
        <div className="flex-col sidenav-header">
          <button className="sidebar-button" onClick={menuFunction}>
            <i className={openMenu ? "fa-solid fa-chevron-left" : "fa-solid fa-chevron-right"}></i>
          </button>
          <MenuItem href="/home">
            <span className="material-symbols-outlined space">home</span> {openMenu ? "Home" : ""}
          </MenuItem>
          <MenuItem href="/home">
            <span className="material-symbols-outlined space">inventory</span> {openMenu ? "My work" : ""}
          </MenuItem>
        </div>
        <div className="flex-col sidenav-main">
          <div className="flex-row workspace-main">
            <div className={openMenu ? "workspace-icon space" : "workspace-icon"}>M</div>
            <h4 className="workspace-name">{openMenu ? "Main workspace" : ""}</h4>
           {openMenu && (<WorkspaceMenu />)} 
           {openMenu && (<AddBoardModal />)}
           
          </div>
          <MenuItem href="home">
            <span className="material-symbols-outlined space">folder</span> {openMenu ? "Project 1" : ""}
          </MenuItem>
          <MenuItem href="home">
            <span className="material-symbols-outlined space">folder</span> {openMenu ? "Project 2" : ""}
          </MenuItem>
        </div>
      </Sidebar>
    </ChakraProvider>
  );
};

const Sidebar = styled.div`
  border-right: 1px solid #cdcdcd;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: linear-gradient(180deg, #101010 0%, #0d0e17 100%);
  overflow-x: hidden;
  transition: 0.5s;
  .sidebar-button {
    background-color: transparent;
    border: none;
    color: var(--main-green);
  }

  .sidenav-header {
    align-items: flex-start;
    border-bottom: 1px solid #4b4e69;
    padding-bottom: 2rem;
  }
  .workspace-icon {
    background-color: #550080;
    height: 30px;
    width: 30px;
    color: var(--ws-gray-text);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .workspace-name {
    margin: 0;
    color: var(--ws-gray-text);
  }

  .workspace-main {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

  .arrow-colour {
    color: var(--ws-gray-text);
    margin: 0 1.5rem 0 0.5rem;
  }
`;

const MenuItem = styled.a`
  display: flex;
  text-decoration: none;
  color: var(--ws-gray-text);
  font-size: 1rem;
  font-weight: 300;
  margin: 0.5rem 1rem 0.5rem 0;
  /* justify-content: center; */
`;

export default SideNav;
