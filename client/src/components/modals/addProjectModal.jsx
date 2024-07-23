import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { ADD_PROJECT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useUserContext } from "../../utils/contexts";
import Auth from "../../utils/auth";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-au";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

const AddProjectModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState(dayjs());
  const [description, setDescription] = useState("");
  const { userData } = useUserContext();

  const [addProject] = useMutation(ADD_PROJECT);

  const theme = useTheme();

  const handleAddProject = async (e) => {
    e.preventDefault();
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
          dueDate: dueDate,
        },
      });
    } catch (err) {
      console.error(err);
    }
    setOpen(false)
    window.location.reload();
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddIcon sx={{ color: theme.palette.secondary.contrastText, backgroundColor: "var(--main-green)", height: "1.5rem", width: "1.5rem", borderRadius: "4px" }} />
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} component="form" onSubmit={handleAddProject} noValidate>
          <div className="modal-header">
            <IconButton sx={{ display: "flex", marginLeft: "auto" }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <TextField margin="normal" required fullWidth id="projectName" label="Project name" name="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          <TextField margin="normal" required fullWidth name="description" label="Description" multiline rows={1} id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            label="Due date" 
            sx={{ marginTop: "1rem", width: "100%" }} 
            value={dueDate} 
            onChange={(newValue) => setDueDate(newValue)}
            />
          </LocalizationProvider>
          <div className="flex flex-row gap-1 m-top-2">
            <Button type="cancel" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} id="add-project" onClick={(e) => handleAddProject(e)}>
              Add project
            </Button>
          </div>

        </Box>
      </Modal>
    </div>
  );
};


export default AddProjectModal;
