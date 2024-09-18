import { useEffect, useState } from "react";
import { UPDATE_TASK, ADD_COMMENT, ADD_SUBTASK, ADD_TASK, DELETE_COMMENT, DELETE_SUBTASK, UPDATE_SUBTASK } from "../../utils/mutations";
import { QUERY_TASK, QUERY_USERS, QUERY_USER } from "../../utils/queries";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useUserContext } from "../../utils/contexts";
import Auth from "../../utils/auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
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
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";
import Divider from "@mui/material/Divider";
import relativeTime from "dayjs/plugin/relativeTime";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SubtaskModal from "./addSubtaskModal";
import Checkbox from "@mui/material/Checkbox";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";

const EditUserModal = ({ id }) => {
  //Set state for the task fields
  const [user, setUser] = useState({})
  const [title, setTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState(dayjs());
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({});
  const [taskId, setTaskId] = useState("");
  const [titleEdit, setTitleEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [statusEdit, setStatusEdit] = useState(false);
  const [dueEdit, setDueEdit] = useState(false);
  const [assignedEdit, setAssignedEdit] = useState(false);
  const [priorityEdit, setPriorityEdit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState("");
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtaskStatus, setSubtaskStatus] = useState("");
  const [commentArr, setCommentArr] = useState([]);
  const [subtaskArr, setSubtaskArr] = useState([]);
  const [dueDateText, setDueDateText] = useState("")

//   const [checked, setChecked] = useState([1]);
//   dayjs.extend(relativeTime);

//   const theme = useTheme();
//   const { userData } = useUserContext();
//   const [updateTask] = useMutation(UPDATE_TASK);
//   const [queryTask, { data }] = useLazyQuery(QUERY_TASK);
//   const [queryUsers] = useLazyQuery(QUERY_USERS);
//   const [addComment] = useMutation(ADD_COMMENT);
//   const [addSubtask] = useMutation(ADD_SUBTASK);
//   const [deleteComment] = useMutation(DELETE_COMMENT);
//   const [deleteSubtask] = useMutation(DELETE_SUBTASK);
//   const [updateSubtask] = useMutation(UPDATE_SUBTASK);

  const [queryUser] = useLazyQuery(QUERY_USER);


  //Functions to open and close the modal
  const handleOpen = async (e) => {
    const { data } = await queryUser({ variables: { _id: e.target.id } });
    setUser(data)
    setIsLoaded(true)
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "4px",
    boxShadow: 24,
    p: 5,
    overflowY: "none",
    height: "75%",
    display: "block",
  };

const handleUpdateUser = () => {

}



  return (
    <div className="flex m-auto align">
      <IconButton variant="contained" size="small" id={id} onClick={(e) => handleOpen(e)}>
        <EditIcon id={id} />
      </IconButton>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} component="form" onSubmit={handleUpdateUser} noValidate>
          {isLoaded && (
            <>
          <div className="modal-header">
            <IconButton sx={{ display: "flex", marginLeft: "auto" }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>



            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default EditUserModal;
