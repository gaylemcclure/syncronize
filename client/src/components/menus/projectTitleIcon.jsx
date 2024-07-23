import { useState } from "react";
import styled from "styled-components";
// import { ChakraProvider, Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Divider, ButtonGroup, Flex } from "@chakra-ui/react";
// import SaveIcon from "@mui/icons-material/Save";
// import EditIcon from "@mui/icons-material/Edit";
// import CancelIcon from "@mui/icons-material/Close";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import { IconButton } from "@chakra-ui/react";
import { UPDATE_PROJECT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import dayjs from 'dayjs';

//Component to house the icon button for the dropdown menu
const ProjectTitleIcon = ({ tasks }) => {
  const [project, setProject] = useState(tasks);
  const [projectName, setProjectName] = useState(tasks.projectName);
  const [description, setDescription] = useState(tasks.description);
  const { isOpen, onOpen, onClose } = useDisclosure();

  

  const createdDate = dayjs('2024-07-20T11:19:04.742+00:00');

  const [updateProject] = useMutation(UPDATE_PROJECT);
  
  const handleTitleEdit = async (e) => {
    setProjectName(e);
    try {
      const { data } = await updateProject({
        variables: {
          _id: project._id,
          projectName: e,
          description: description
        },
      })
        
    } catch (err) {
      console.error(err);
    }
  };

  const handleDescriptionEdit = async (e) => {
    setDescription(e);
    try {
      const { data } = await updateProject({
        variables: {
          _id: project._id,
          projectName: projectName,
          description: e
        },
      })
        
    } catch (err) {
      console.error(err);
    }
  }

  //Function to create the popup modal with project info
  const EditTitleModal = () => {
    //Create the edit controls for the title and description fields
    // const EditableControls = () => {
    //   const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
    //   return isEditing ? (
    //     <ButtonGroup justifyContent="center" size="sm">
    //       <IconButton icon={<SaveIcon />} {...getSubmitButtonProps()} />
    //       <IconButton icon={<CancelIcon />} {...getCancelButtonProps()} />
    //     </ButtonGroup>
    //   ) : (
    //     <Flex justifyContent="center">
    //       <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    //     </Flex>
    //   );
    // };

    return (
      <IconWrapper>
        <Icon className="icon-size" onClick={onOpen}>
          <span className="material-symbols-outlined space-left">info</span>
        </Icon>

      </IconWrapper>
    );
  };

  return (
      <EditTitleModal />
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
