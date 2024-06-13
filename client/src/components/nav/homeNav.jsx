import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/sync-icon.png";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
import DropdownMenu from "../menus/dropdownMenu";



const AddTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavButton = () => {

    const pathName = window.location.pathname;
  
    if (pathName === "/home") {
      return <ButtonNav onClick={onOpen}>Add board</ButtonNav>;
    } else if (pathName === "/home/board") {
      return <ButtonNav onClick={onOpen}>Add task</ButtonNav>;
    }
  };

  return (
    <>
      <NavButton />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
          </ModalBody>

          <ModalFooter>
            <button  onClick={onClose}>
              Close
            </button>
            <button >Secondary Action</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

const HomeNav = () => {
    //TODO - set user initials
  const [userInitials, setUserInitials] = useState("GM");



  return (
    <ChakraProvider>
      <NavWrapper>
        <img className="logo" src={logo} alt="logo" />
        <div className="input-container">
          <input className="search-bar" placeholder="Search..." />
        </div>
        <AddTask />
        <DropdownMenu userInitials={userInitials} />
      </NavWrapper>

    </ChakraProvider>
  );
};

const NavWrapper = styled.nav`
  padding: 0.5rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  z-index: 5;
  width: 100%;
  background-color: #101010;
  .icon-size {
    height: 45px;
    width: 50px;
    font-size: 14px;
  }

  .logo {
    height: 3rem;
  }

  input {
    width: 20rem;
    align-self: center;
  }
  .input-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .search-bar {
    background-color: #D9D9D9;
    border: none;
    color: white;
    padding-left: 0.5rem;
  }
  .search-bar::placeholder {
    color: #7e7c7c;
  }
  .search-bar:focus {
    border: none;
  }
`;

const ButtonNav = styled.button`
  padding: 0.75rem 1rem;
  color: var(--main-green);
  border: none;
  background-color: var(--gray-text);
  border-radius: 18px;
  font-weight: 700;
  margin-left: auto;
  margin-right: 1rem;
  transition-timing-function: ease-in;
  transition-duration: 0.2s;
  font-size: 1rem;
  width: 9rem;

  &:hover {
    opacity: 0.5;
  }
`;

export default HomeNav;
