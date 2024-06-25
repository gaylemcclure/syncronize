import React, { useState } from "react";
import styled from "styled-components";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

//Component to house the icon button for the dropdown menu
const ProjectTitleIcon = () => {
  
  const EditTitleModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Icon className="icon-size" onClick={onOpen}>
          <span className="material-symbols-outlined space-left">info</span>
        </Icon>

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

  return <ChakraProvider><EditTitleModal /></ChakraProvider>;
};

const Icon = styled.button`
  border: none;
  color: black;
  background-color: transparent;
  width: 3rem;

  &:hover {
    opacity: 0.5;
  }
`;

export default ProjectTitleIcon;
