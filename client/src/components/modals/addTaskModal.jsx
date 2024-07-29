import { useEffect, useState } from "react";
import { ADD_TASK } from "../../utils/mutations";
import { QUERY_PROJECT } from "../../utils/queries";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useUserContext } from "../../utils/contexts";
import Auth from "../../utils/auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-au";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Avatar } from "@mui/material";

const AddTaskModal = ({ projectData, callUpdate, setCallUpdate }) => {
  //Set state for the task fields
  const [title, setTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState(dayjs());
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("66a5c8cfb26ac60be343cbf0");
  const [assignedId, setAssignedId] = useState("");
  const [assignedInitials, setAssignedInitials] = useState("");
  const { userData, setUserData } = useUserContext();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [projData, setProjData] = useState({})

  const theme = useTheme();
  const [addTask] = useMutation(ADD_TASK);

  useEffect(() => {
    const getProjectData = async () => {
      if (projectData !== undefined) {
        setUsers(projectData[0].users);
        setProjData(projectData[0])

      }
    };
    getProjectData();
  }, [projectData]);

  //Functions to open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
  };

  //Function to add task to db
  const handleAddTask = async (e) => {
    e.preventDefault();
    //Check if logged in still
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
          projectId: projData._id,
          priority: priority,
          dueDate: dueDate,
          assignedTo: assignedTo,
        },
      });
    } catch (err) {
      console.error(err);
    }

    setCallUpdate(true);
    setTitle("")
    setTaskDescription("")
    setStatus("")
    setPriority("")
    setAssignedTo("")
    setOpen(false);
    // window.location.reload();
  };

  const handleAvatarChange = (e) => {
    setAssignedTo(e.target.value);
    setAssignedInitials(e.target.name);
    setAssignedId(e.target.id);
  };

  const handleUserSelect = (e) => {
    const initials = users.filter((user) => user._id === e.target.value)
    setAssignedTo(e.target.value)
    setAssignedInitials(initials[0].initials)
  }


  return (
    <div className="flex m-auto align">
      <Button onClick={handleOpen} sx={{ color: theme.palette.secondary.contrastText, backgroundColor: "var(--main-green)", borderRadius: "4px" }}>
        <AddIcon sx={{ height: "1.5rem", width: "1.5rem", borderRadius: "4px" }} />
        Add task
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} component="form" onSubmit={handleAddTask} noValidate>
          <div className="modal-header">
            <IconButton sx={{ display: "flex", marginLeft: "auto" }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="task-description"
            label="Description"
            multiline
            rows={1}
            id="task-description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due date"
              sx={{ mt: 2, mb: 1, width: "100%" }}
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              id="due-date"
            />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              sx={{ mt: 2, mb: 1 }}
            >
              <MenuItem value={"Not started"}>Not started</MenuItem>
              <MenuItem value={"In progress"}>In progress</MenuItem>
              <MenuItem value={"Stuck"}>Stuck</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
              sx={{ mt: 2, mb: 1 }}
            >
              <MenuItem value={"-"}>-</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="assigned-to-label">Assigned to</InputLabel>
            <Select
              labelId="assigned-to-label"
              id="assigned-to"
              value={assignedTo}
              name={assignedInitials}
              label="Assigned to"
              onChange={(e) => handleUserSelect(e)}
              sx={{ mt: 2, mb: 1 }}
            >
              {users.map((user) => {
                return (
                  <MenuItem key={user._id} value={user._id}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: 12, marginRight: 2, backgroundColor: "var(--main-green)" }}>
                      {user.initials}
                    </Avatar>
                    {user.first} {user.last}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div className="flex flex-row gap-1 m-top-2">
            <Button type="cancel" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} id="add-project" onClick={(e) => handleAddTask(e)}>
              Add project
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTaskModal;
