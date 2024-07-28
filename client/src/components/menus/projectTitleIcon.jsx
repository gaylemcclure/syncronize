import { useState, useEffect } from "react";
import styled from "styled-components";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { QUERY_USER } from "../../utils/queries";
import { UPDATE_PROJECT_NAME, UPDATE_PROJECT_DESCRIPTION, UPDATE_PROJECT_DATE } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-au";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ProjectTitleIcon = ({ projectData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const [titleEdit, setTitleEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [dateEdit, setDateEdit] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(dayjs());

  const [updateName] = useMutation(UPDATE_PROJECT_NAME)
  const [updateDesc] = useMutation(UPDATE_PROJECT_DESCRIPTION);
  const [updateDate] = useMutation(UPDATE_PROJECT_DATE)


  const createdBy = projectData.createdBy;
  const createdFirst = createdBy.first;
  const createdLast = createdBy.last;
  const createdDate = dayjs(projectData.createdOn).format('DD/MM/YYYY');
  const dueDateText = dayjs(dueDate).format('DD/MM/YYYY');

  useEffect(() => {
    setTitle(projectData.projectName)
    setDescription(projectData.description)
    setDueDate(dayjs(projectData.dueDate))
  }, [projectData])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleTitleEdit = async (e) => {
    try {
      const { data } = await updateName({
        variables: {
          _id: projectData._id,
          projectName: title
        },
      });
    } catch (err) {
      console.error(err);
    }
    setTitleEdit(false)
  }

  const handleDescEdit = async () => {
    try {
      const { data } = await updateDesc({
        variables: {
          _id: projectData._id,
          description: description
        },
      });
    } catch (err) {
      console.error(err);
    }
    setDescEdit(false)

  }

  const handleDateEdit = async () => {
    try {
      const { data } = await updateDate({
        variables: {
          _id: projectData._id,
          dueDate: dueDate
        },
      });
    } catch (err) {
      console.error(err);
    }
    setDateEdit(false)

  }
  return (
    <div>
      <Button
        sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText, paddingLeft: '0', backgroundColor: 'transparent', border: 'none', boxShadow: 'none', minWidth: '1rem'}}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <InfoOutlinedIcon sx={{fontSize: '1.2rem'}}/>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="popover">
          {!titleEdit && (
            <div className="flex-row ">
              <h3 className="project-title">{title}</h3>
              <Button
                onClick={(e) => setTitleEdit(true)}
                sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
              >
                <EditIcon sx={{ fontSize: "16px" }} />
              </Button>
            </div>
          )}
          {titleEdit && (
            <div className="flex-row ">
              <TextField className="project-title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              <Button
                onClick={(e) => handleTitleEdit(e)}
                sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
              >
                <SaveIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onClick={(e) => setTitleEdit(false)}
                sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
              >
                <CancelIcon sx={{ fontSize: "16px" }} />
              </Button>
            </div>
          )}
          {!descEdit && (
            <div className="flex-row">
              <p>{projectData.description}</p>
              <Button onClick={() => setDescEdit(true)} sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}>
                <EditIcon sx={{ fontSize: "16px" }} />
              </Button>
            </div>
          )}

          {descEdit && (
            <div className="flex-row">
            <TextField className="project-title" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <Button
              onClick={(e) => handleDescEdit(e)}
              sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
            >
              <SaveIcon sx={{ fontSize: "16px" }} />
            </Button>
            <Button
              onClick={(e) => setDescEdit(false)}
              sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
            >
              <CancelIcon sx={{ fontSize: "16px" }} />
            </Button>
          </div>
          )}
        </div>

        <Divider />
        <div className="popover">
          <h4>Project info</h4>
          <div className="flex-row m-top-2">
            <div>Project owner:</div>
            {createdBy !== "" && (
            <div className="space-left">{createdFirst} {createdLast} </div>
          )}
          </div>
          <div className="flex-row m-top-2">
            <div>Created on:</div>
            <div className="space-left">{createdDate}</div>
          </div>
          <div className="flex-row align-base">
            <div>Due date:</div>
            {!dateEdit && (
              <div className="flex-row m-top-2 ">
            <div className="space-left">{dueDateText}</div>
            <Button onClick={() => setDateEdit(true)} sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}>
                <EditIcon sx={{ fontSize: "16px" }} />
              </Button>
              </div>
              )}
                          {dateEdit && (
              <div className="flex-row ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            label="Due date" 
            sx={{ marginTop: "1rem", width: "100%" }} 
            value={dueDate} 
            onChange={(newValue) => setDueDate(newValue)}
            />
          </LocalizationProvider>
              <Button
                onClick={(e) => handleDateEdit(e)}
                sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
              >
                <SaveIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onClick={(e) => setDateEdit(false)}
                sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
              >
                <CancelIcon sx={{ fontSize: "16px" }} />
              </Button>
            </div>
              )}
          </div>
        </div>
      </Popover>
    </div>
  );
};

// //Component to house the icon button for the dropdown menu
// const ProjectTitleIcon = ({ tasks }) => {
//   const [project, setProject] = useState(tasks);
//   const [projectName, setProjectName] = useState(tasks.projectName);
//   const [description, setDescription] = useState(tasks.description);
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const createdDate = dayjs('2024-07-20T11:19:04.742+00:00');

//   const [updateProject] = useMutation(UPDATE_PROJECT);

//   const handleTitleEdit = async (e) => {
//     setProjectName(e);
//     try {
//       const { data } = await updateProject({
//         variables: {
//           _id: project._id,
//           projectName: e,
//           description: description
//         },
//       })

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDescriptionEdit = async (e) => {
//     setDescription(e);
//     try {
//       const { data } = await updateProject({
//         variables: {
//           _id: project._id,
//           projectName: projectName,
//           description: e
//         },
//       })

//     } catch (err) {
//       console.error(err);
//     }
//   }

//   //Function to create the popup modal with project info
//   const EditTitleModal = () => {
//     //Create the edit controls for the title and description fields
//     // const EditableControls = () => {
//     //   const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
//     //   return isEditing ? (
//     //     <ButtonGroup justifyContent="center" size="sm">
//     //       <IconButton icon={<SaveIcon />} {...getSubmitButtonProps()} />
//     //       <IconButton icon={<CancelIcon />} {...getCancelButtonProps()} />
//     //     </ButtonGroup>
//     //   ) : (
//     //     <Flex justifyContent="center">
//     //       <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
//     //     </Flex>
//     //   );
//     // };

//     return (
//       <IconWrapper>
//         <Icon className="icon-size" onClick={onOpen}>
//           <span className="material-symbols-outlined space-left">info</span>
//         </Icon>

//       </IconWrapper>
//     );
//   };

//   return (
//       <EditTitleModal />
//   );
// };
// const IconWrapper = styled.div`
//   .chakra-editable {
//     display: flex;
//     flex-direction: row;
//   }
// `;
// const Icon = styled.button`
//   border: none;
//   color: black;
//   background-color: transparent;
//   width: 3rem;

//   &:hover {
//     opacity: 0.5;
//   }
// `;

export default ProjectTitleIcon;
