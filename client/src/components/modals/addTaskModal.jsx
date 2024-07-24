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

const AddTaskModal = () => {
  //Set state for the task fields
  const [title, setTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState(dayjs());
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const { userData } = useUserContext();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([])

  const theme = useTheme();
  const [addTask] = useMutation(ADD_TASK);
  const [queryProject, { data }] = useLazyQuery(QUERY_PROJECT);

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

  //Get project id from url params
  let projectId = "";
  const paramString = window.location.pathname;
  const searchParams = new URLSearchParams(paramString);
  searchParams.forEach((value, key) => {
    projectId = value;
  });

  useEffect(() => {
    if (projectId !== "") {
      const getProjectData = async () => {
        try {
          const { data } = await queryProject({variables: {_id: projectId}})
          setUsers(data.proj.users)
        } catch (err) {
          console.error(err);
        }
      }
      getProjectData()
    }
  }, [projectId])

  console.log(users)


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
          projectId: projectId,
          priority: priority,
          dueDate: dueDate,
          assignedTo: "669b9af84718ef68df73102b"
        },

      });
      setUsers(data)
    } catch (err) {
      console.error(err);
    }

    setOpen(false)
    window.location.reload();
  };

  return (
    <div className="flex m-auto align">
      <Button onClick={handleOpen} sx={{ color: theme.palette.secondary.contrastText, backgroundColor: "var(--main-green)", borderRadius: "4px"}}>
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
              <Select labelId="status-label" id="status" value={status} label="Status" onChange={(e) => setStatus(e.target.value)} sx={{ mt: 2, mb: 1 }}>
                <MenuItem value={"to-do"}>Not started</MenuItem>
                <MenuItem value={"in-progress"}>In progress</MenuItem>
                <MenuItem value={"stuck"}>Stuck</MenuItem>
                <MenuItem value={"completed"}>Completed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
              <Select labelId="priority-label" id="priority" value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)} sx={{ mt: 2, mb: 1 }}>
                <MenuItem value={"-"}>-</MenuItem>
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
            <InputLabel id="assigned-to-label">Assigned to</InputLabel>
              <Select labelId="assigned-to-label" id="assigned-to" value={assignedTo} label="Assigned to" onChange={(e) => setAssignedTo(e.target.value)} sx={{ mt: 2, mb: 1 }}>
                {users.map((user) => {
return <MenuItem key={user._id} value={user._id}>
              <Avatar sx={{ width: 24, height: 24, fontSize: 12, marginRight: 2, backgroundColor: "var(--main-green)" }}>{user.initials}</Avatar>
              {user.first} {user.last}

</MenuItem>
                }
                )}
                {/* <MenuItem value={"-"}>-</MenuItem>
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem> */}
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

// const NavWrapper = styled.nav``;

// const ButtonNav = styled.button`
//   padding: 0.75rem 1rem;
//   color: var(--main-green);
//   border: none;
//   background-color: var(--gray-text);
//   border-radius: 18px;
//   font-weight: 700;
//   margin-left: auto;
//   margin-right: 1rem;
//   transition-timing-function: ease-in;
//   transition-duration: 0.2s;
//   font-size: 1rem;
//   width: 10rem;
//   display: flex;
//   justify-content: center;
//   &:hover {
//     opacity: 0.5;
//   }
// `;

export default AddTaskModal;
