import { useState } from "react";
import { useOutletContext } from "react-router";
import styled from "styled-components";
import logo from "../../assets/images/sync-icon.png";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import DropdownMenu from "../menus/dropdownMenu";
import { SubmitButton, CancelButton } from "../popupButtons";

const AddTask = () => {

  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavButton = () => {
    const pathName = window.location.pathname;

    if (pathName === "/home") {
      return (
        <ButtonNav onClick={onOpen}>
          <span className="material-symbols-outlined">add</span> Add project
        </ButtonNav>
      );
    } else {
      return (
        <ButtonNav onClick={onOpen}>
          <span className="material-symbols-outlined">add</span> Add task
        </ButtonNav>
      );
    }
  };

  const handleAddProject = async () => {
    const testUrl = `http://localhost:5001/api/project`;
    await fetch(testUrl, {
      method: 'POST',
      body: JSON.stringify({ projectName, description, dueDate }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(function(response) {
      if (!response.ok) {
        alert ('Error message')
      } else {
        return response.json()
      }
    }).then(function(data) {
      window.location.reload()
      return data
      
    })
  };
  
  const handleAddTask = () => {
    console.log("something")
  };

  return (
    <AddContainer>
      <NavButton />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {window.location.pathname === "/home" && (
          <ModalContent>
            <ModalHeader>Add project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="input-container flex-col">
                <label>Project name</label>
                <input className="full-input" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              </div>
              <div className="input-container flex-col">
                <label>Project description</label>
                <textarea className="full-input" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <div className="input-container flex-col">
                <label>Due Date</label>
                <input type="date" className="full-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>

            </ModalBody>

            <ModalFooter>
              <CancelButton cancelText="Cancel" cancelFunction={onClose} />
            {/* <button className="cancel-button" onClick={onClose}>Cancel</button> */}
            <SubmitButton submitText="Add project" submitFunction={handleAddProject} />
            </ModalFooter>
          </ModalContent>
        )}

        {window.location.pathname !== "/home" && (
          <ModalContent>
            <ModalHeader>Add task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

            <ModalFooter>
              <button className="cancel-button" onClick={onClose}>Cancel</button>
              <SubmitButton submitText="Add task" submitFunction={handleAddTask} />
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </AddContainer>
  );
};




const HomeNav = () => {
  //Use outlet context to get the user details from main App component
  const [user] = useOutletContext();

  return (
    <ChakraProvider>
      <NavWrapper>
        <img className="logo" src={logo} alt="logo" />
        <div className="input-container">
          <input className="search-bar" placeholder="Search..." />
        </div>
        <AddTask />
        {user && (<DropdownMenu user={user}/>)}
      </NavWrapper>
    </ChakraProvider>
  );
};

const AddContainer = styled.div`


`


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

  input, textarea {
    width: 20rem;
    align-self: center;
  }
  .input-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .search-bar {
    background-color: #d9d9d9;
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
  width: 10rem;
  display: flex;
  justify-content: center;
  &:hover {
    opacity: 0.5;
  }
`;

export default HomeNav;
