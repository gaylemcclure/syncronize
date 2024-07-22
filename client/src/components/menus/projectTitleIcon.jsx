import { useState } from "react";
import styled from "styled-components";
import { ChakraProvider, Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Divider, ButtonGroup, Flex, Input } from "@chakra-ui/react";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@chakra-ui/react";
import { Editable, EditableInput, EditableTextarea, EditablePreview, useEditableControls } from "@chakra-ui/react";
import Save from "@mui/icons-material/Save";

//Component to house the icon button for the dropdown menu
const ProjectTitleIcon = ({ tasks }) => {
  const [project, setProject] = useState(tasks);
  const [toggleTitle, setToggleTitle] = useState(false);
  const [toggleDescription, setToggleDescription] = useState(false);
  const [title, setTitle] = useState(tasks.projectName);
  const [description, setDescription] = useState(tasks.description);

  const EditTitleModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleEditTitle = (e) => {
      e.preventDefault();
      setToggleTitle(true);
    };

    const EditableControls = () => {
      const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

      return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton icon={<SaveIcon />} {...getSubmitButtonProps()} />
          <IconButton icon={<CancelIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Flex justifyContent="center">
          <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
        </Flex>
      );
    };

    return (
      <IconWrapper>
        <Icon className="icon-size" onClick={onOpen}>
          <span className="material-symbols-outlined space-left">info</span>
        </Icon>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              {/* Edit the project name */}
              <Editable textAlign="center" defaultValue={title} fontSize="2xl" isPreviewFocusable={false}>
                <EditablePreview />
                <div className="flex flex-row">
                  <EditableInput />
                  <EditableControls />
                </div>
              </Editable>

              {/* Edit the project description */}
              <Editable textAlign="center" defaultValue={description} fontSize="lg" isPreviewFocusable={false}>
                <EditablePreview />
                <div className="flex flex-row">
                  <EditableInput />
                  <EditableControls />
                </div>
              </Editable>

              <Divider />
              <div className="flex flex-row">
                <div>Owner:</div>
                <div>{project.createdBy}</div>
              </div>
              <div className="flex flex-row">
                <div>Created on:</div>
                <div>{project.createdOn}</div>
              </div>
              <button>Delete project</button>
            </ModalBody>

            <ModalFooter>
              <button onClick={onClose}>Close</button>
              <button>Secondary Action</button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </IconWrapper>
    );
  };

  return (
    <ChakraProvider>
      <EditTitleModal />
    </ChakraProvider>
  );
};
const IconWrapper = styled.div`
  .chakra-editable {
    display: flex;
    flex-direction: row;
  }
`;
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
