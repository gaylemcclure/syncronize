import { useEffect, useState } from "react";
import { UPDATE_TASK, ADD_COMMENT, ADD_SUBTASK, ADD_TASK, DELETE_COMMENT, DELETE_SUBTASK, UPDATE_SUBTASK } from "../../utils/mutations";
import { QUERY_TASK, QUERY_USERS } from "../../utils/queries";
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

const EditTaskModal = ({ projectId, id }) => {
  //Set state for the task fields
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
  const [showSelect, setShowSelect] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState("");
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtaskStatus, setSubtaskStatus] = useState("");
  const [commentArr, setCommentArr] = useState([]);
  const [subtaskArr, setSubtaskArr] = useState([]);

  const [checked, setChecked] = useState([1]);
  dayjs.extend(relativeTime);

  const theme = useTheme();
  const { userData } = useUserContext();
  const [updateTask] = useMutation(UPDATE_TASK);
  const [queryTask, { data }] = useLazyQuery(QUERY_TASK);
  const [queryUsers] = useLazyQuery(QUERY_USERS);
  const [addComment] = useMutation(ADD_COMMENT);
  const [addSubtask] = useMutation(ADD_SUBTASK);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [deleteSubtask] = useMutation(DELETE_SUBTASK);
  const [updateSubtask] = useMutation(UPDATE_SUBTASK);

  //Functions to open and close the modal
  const handleOpen = (e) => {
    setTaskId(e.target.id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    height: "100%",
    display: "block",
  };

  useEffect(() => {
    if (taskId) {
      const getTaskData = async () => {
        try {
          const { data } = await queryTask({ variables: { _id: taskId } });
          console.log(data);
          setTask(data.singleTask);
          setStatus(data.singleTask.status);
          setPriority(data.singleTask.priority);
          setAssignedTo(data.singleTask.assignedTo._id);
          setUsers(data.singleTask.projectId.users);
          setTitle(data.singleTask.title);
          setCommentArr(data.singleTask.comments);
          setSubtaskArr(data.singleTask.subtasks);
        } catch (err) {
          console.error(err);
        }
      };
      getTaskData();
    }
  }, [taskId]);

  useEffect(() => {
    if (task.projectId) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [task]);

  //Function to add task to db
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    //Check if logged in still
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await updateTask({
        variables: {
          title: title,
          description: taskDescription,
          status: status,
          projectId: projectId,
          priority: priority,
          dueDate: dueDate,
          assignedTo: "669b9af84718ef68df73102b",
        },
      });
      setUsers(data);
    } catch (err) {
      console.error(err);
    }

    setOpen(false);
    window.location.reload();
  };

  const handleAddComment = async (e) => {
    const commentText = comment;
    const createdInitials = userData.initials;
    try {
      const { data } = await addComment({
        variables: { taskId: taskId, commentText: commentText, createdBy: `${userData.first} ${userData.last}`, createdInitials: createdInitials },
      });
      setCommentArr(data.addComment.comments);
    } catch (err) {
      console.error(err);
    }
    setComment("");
  };

  const handleDeleteComment = async (e) => {
    try {
      const { data } = await deleteComment({
        variables: { taskId: taskId, _id: e.currentTarget.id },
      });
      setCommentArr(data.deleteComment.comments);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (sub) => {
    const newStatus = !sub.taskStatus;
    const subtasks = subtaskArr.map((task) => {
      if (task._id === sub._id) {
        return {
          ...task,
          taskStatus: newStatus,
        };
      } else {
        return task;
      }
    });
    const newArr = {
      subtasks: {
        subtasks,
      },
    };
    console.log(newArr);
    setSubtaskArr(subtasks);
    // try{
    //   const { data } = await updateSubtask({ variables: {_id: taskId, subtasks: subtasks}});
    //   console.log(data)

    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="flex m-auto align">
      <IconButton variant="contained" size="small" id={id} onClick={(e) => handleOpen(e)}>
        <OpenInFullIcon id={id} />
      </IconButton>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} component="form" onSubmit={handleUpdateTask} noValidate>
          {isLoaded && (
            <>
              <div className="modal-header flex flex-row">
                <div className="flex-vol">
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
                    id="description"
                    label="Description"
                    name="description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>
                <IconButton sx={{ display: "flex", marginLeft: "auto" }} onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="flex-row">
                <div className="flex-col half">
                  <div className="status flex-row">
                    <ModeStandbyIcon />
                    <p>Status</p>
                    <FormControl fullWidth>
                      <Select labelId="status-label" id="status" value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                        <MenuItem value={"Not started"}>Not started</MenuItem>
                        <MenuItem value={"In progress"}>In progress</MenuItem>
                        <MenuItem value={"Stuck"}>Stuck</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="status flex-row">
                    <DateRangeIcon />
                    <p>Due date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Due date"
                        sx={{ marginTop: "1rem", width: "100%" }}
                        value={dayjs(task.dueDate)}
                        onChange={(newValue) => setDueDate(newValue)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="flex-col half">
                  <div className="status flex-row">
                    <PersonIcon />
                    <p>Assigned to</p>
                    <FormControl fullWidth>
                      <InputLabel id="assigned-to-label">Assigned to</InputLabel>
                      <Select
                        labelId="assigned-to-label"
                        id="assigned-to"
                        value={assignedTo}
                        label="Assigned to"
                        onChange={(e) => setAssignedTo(e.target.value)}
                        sx={{ mt: 2, mb: 1 }}
                      >
                        {task.projectId.users.map((user) => {
                          return (
                            // <></>
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
                  </div>

                  <div className="status flex-row">
                    <FlagIcon />
                    <p>Priority</p>
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
                        <MenuItem value={"None"}>None</MenuItem>
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div></div>
              </div>
              <Divider />
              <div className="">
                <div className="flex-row align">
                  <h3>Subtasks</h3>
                  <div className="m-auto">
                    <SubtaskModal taskId={taskId} setSubtaskArr={setSubtaskArr} />
                  </div>
                </div>
                <div className="flex-col">
                  <List dense sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                    {subtaskArr.map((sub) => {
                      const labelId = `checkbox-list-secondary-label-${sub.taskTitle}`;
                      console.log(sub);
                      return (
                        <ListItem
                          key={sub._id}
                          secondaryAction={
                            <Checkbox
                              id={sub._id}
                              edge="end"
                              onChange={() => handleToggle(sub)}
                              checked={sub.taskStatus}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          }
                          disablePadding
                        >
                          <ListItemButton>
                            <ListItemText id={labelId} primary={sub.taskTitle} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </div>
              <Divider />
              <div className="">
                <h3>Comments</h3>
                <div className="comment">
                  <FormControl fullWidth>
                    <TextField
                      id="comment"
                      multiline
                      placeholder="Add a comment..."
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FormControl>
                  <Button onClick={(e) => handleAddComment(e)} sx={{ backgroundColor: "var(--main-green)" }}>
                    Add comment
                  </Button>
                </div>
                <Divider />
                {commentArr.length > 0
                  ? commentArr.map((comment) => {
                      const diff = dayjs(comment.createdOn).fromNow();
                      return (
                        <div key={comment._id} className="flex-col m-top-1">
                          <div className="flex-row">
                            <Avatar>{comment.createdInitials}</Avatar>
                            <h4>{comment.createdBy}</h4>
                            <p className="m-auto">Created {diff} </p>
                            <Button id={comment._id} onClick={(e) => handleDeleteComment(e)}>
                              <DeleteIcon />
                            </Button>
                          </div>
                          <p>{comment.commentText}</p>
                          <Divider />
                        </div>
                      );
                    })
                  : null}
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default EditTaskModal;
