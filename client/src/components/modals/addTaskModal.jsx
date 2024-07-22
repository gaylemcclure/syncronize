import { useState } from "react";
import styled from "styled-components";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { SubmitButton, CancelButton } from "../popupButtons";
import { ADD_PROJECT, ADD_TASK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useUserContext } from "../../utils/contexts";
import Auth from "../../utils/auth";

const AddTaskModal = () => {
    const [projectName, setProjectName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [status, setStatus] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userData } = useUserContext();
  
    const [addProject] = useMutation(ADD_PROJECT);
    const [addTask] = useMutation(ADD_TASK);
  
    const pathName = window.location.pathname;
    let projectId = "";
  
    if (pathName !== "/home") {
  
      const paramString = window.location.pathname;
      const searchParams = new URLSearchParams(paramString);
      searchParams.forEach((value, key) => {
        projectId = value;
      });
    }
  
  
    const NavButton = () => {
  
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
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
      try {
        const { data } = await addProject({
          variables: {
            projectName: projectName,
            description: description,
          },
        })
          
      } catch (err) {
        console.error(err);
      }
      setProjectName("")
      setDescription("")
      onClose()
    };
  
    const handleAddTask = async () => {
          // get token
          const token = Auth.loggedIn() ? Auth.getToken() : null;
  
          if (!token) {
            return false;
          }
          try {
            const { data } = await addTask({
              variables: {
                title: title,
                description: taskDescription,
                status: status,
                projectId: projectId
              },
            })
        
         
          } catch (err) {
            console.error(err);
          }
          setProjectName("")
          setDescription("")
          onClose()
          
          window.location.reload();
    };
  
    return (
        <NavWrapper>
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
                <SubmitButton submitText="Add project" submitFunction={handleAddProject} onClick={onClose} />
              </ModalFooter>
            </ModalContent>
          )}
  
          {window.location.pathname !== "/home" && (
            <ModalContent>
            <ModalHeader>Add task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="input-container flex-col">
                <label>Title</label>
                <input className="full-input" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="input-container flex-col">
                <label>Description</label>
                <textarea className="full-input" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
              </div>
              <div className="input-container flex-col">
              </div>
              <div className="input-container flex-col">
                <label>Status</label>
                <input className="full-input" value={status} onChange={(e) => setStatus(e.target.value)} />
              </div>
            </ModalBody>
            <ModalFooter>
              <CancelButton cancelText="Cancel" cancelFunction={onClose} />
              <SubmitButton submitText="Add task" submitFunction={handleAddTask} onClick={onClose} />
            </ModalFooter>
          </ModalContent>
          )}
        </Modal>
      </NavWrapper>
    );
  };

  
const NavWrapper = styled.nav`
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


  export default AddTaskModal;