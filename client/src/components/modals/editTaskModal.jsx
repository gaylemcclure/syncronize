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

const EditTaskModal = ({ id }) => {
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
    p: 5,
    overflowY: "scroll",
    height: "75%",
    display: "block",
  };


  useEffect(() => {
    if (taskId) {
      const getTaskData = async () => {
        try {
          const { data } = await queryTask({ variables: { _id: taskId } });
          const date = dayjs(data.singleTask.dueDate).format("DD/MM/YYYY")
          setTask(data.singleTask);
          setTaskDescription(data.singleTask.description);
          setStatus(data.singleTask.status);
          setPriority(data.singleTask.priority);
          setAssignedTo(data.singleTask.assignedTo._id);
          setUsers(data.singleTask.projectId.users);
          setTitle(data.singleTask.title);
          setCommentArr(data.singleTask.comments);
          setSubtaskArr(data.singleTask.subtasks);
          setIsLoaded(true);
          setDueDateText(date)
          setDueDate(dayjs(data.singleTask.dueDate))

        } catch (err) {
          console.error(err);
        }
      };
      getTaskData();
    }
  }, [taskId]);

  //Function to add task to db
  const handleUpdateTask = async (e) => {
    //Check if logged in still
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await updateTask({
        variables: {
          _id: taskId, 
          title: title,
          description: taskDescription,
          status: status,
          priority: priority,
          dueDate: dueDate,
          assignedTo: assignedTo,
        },
      });
    } catch (err) {
      console.error(err);
    }
    setOpen(true);
    // window.location.reload();
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
                <div className="flex-col full">
                  <div className="status flex-row full align">
                    <TitleIcon sx={{marginBottom: '4px', height: '1rem'}}/>
                    <p>Title: </p>
                    {!titleEdit && (
                      <div className="flex-row status ">
                        <p className="  project-title">{title}</p>
                        <Button
                          onClick={() => setTitleEdit(true)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <EditIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                    {titleEdit && (
                      <div className="flex-row">
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
                        <Button
                          onClick={(e) => handleUpdateTask(e)}
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
                    <IconButton sx={{ display: "flex", marginLeft: "auto" }} onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <div className="status flex-row full align">
                    <DescriptionIcon sx={{marginBottom: '4px', height: '1rem'}}/>
                    <p>Description: </p>
                    {!descriptionEdit && (
                      <div className="flex-row ">
                        <p className="project-title">{taskDescription}</p>
                        <Button
                          onClick={() => setDescriptionEdit(true)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <EditIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                    {descriptionEdit && (
                      <div className="flex-row">
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
                        <Button
                          onClick={(e) => handleUpdateTask(e)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <SaveIcon sx={{ fontSize: "16px" }} />
                        </Button>
                        <Button
                          onClick={() => setDescriptionEdit(false)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <CancelIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col half">
                  <div className="status flex-row full align">
                    <ModeStandbyIcon sx={{marginBottom: '4px', height: '1rem'}}/>
                    <p>Status: </p>
                    {!statusEdit && (
                      <div className="flex-row ">
                        <p className="project-title">{status}</p>
                        <Button
                          onClick={() => setStatusEdit(true)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <EditIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                    {statusEdit && (
                      <div className="flex-row full align">
                        <FormControl fullWidth>
                          <Select labelId="status-label" id="status" value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                            <MenuItem value={"Not started"}>Not started</MenuItem>
                            <MenuItem value={"In progress"}>In progress</MenuItem>
                            <MenuItem value={"Stuck"}>Stuck</MenuItem>
                            <MenuItem value={"Completed"}>Completed</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                          onClick={(e) => handleUpdateTask(e)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <SaveIcon sx={{ fontSize: "16px" }} />
                        </Button>
                        <Button
                          onClick={(e) => setStatusEdit(false)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <CancelIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="status flex-row full align">
                    <DateRangeIcon sx={{marginBottom: '4px', height: '1rem'}}/>
                    <p>Due date: </p>
                    {!dueEdit && (
                      <div className="flex-row ">
                        <p className="project-title">{dayjs(dueDate).format("DD/MM/YYYY")}</p>
                        <Button
                          onClick={(e) => setDueEdit(true)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <EditIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                    {dueEdit && (
                      <div className="flex-row full align">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Due date"
                            sx={{ marginTop: "1rem", width: "100%" }}
                            value={dayjs(dueDate)}
                            onChange={(newValue) => setDueDate(newValue)}
                          />
                        </LocalizationProvider>
                        <Button
                          onClick={(e) => handleUpdateTask(e)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <SaveIcon sx={{ fontSize: "16px" }} />
                        </Button>
                        <Button
                          onClick={(e) => setDueEdit(false)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <CancelIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-col half">
                  <div className="status flex-row full align">
                    <PersonIcon sx={{marginBottom: '4px', height: '1rem'}}/>
                    <p>Assigned to: </p>
                    {!assignedEdit && (
                      <div className="flex-row ">
                        <p className="project-title">{task.assignedTo.first} {task.assignedTo.last}</p>
                        <Button
                          onClick={(e) => setAssignedEdit(true)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <EditIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                    {assignedEdit && (
                      <div className="flex-row">
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
                        <Button
                          onClick={(e) => handleUpdateTask(e)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <SaveIcon sx={{ fontSize: "16px" }} />
                        </Button>
                        <Button
                          onClick={(e) => setAssignedEdit(false)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <CancelIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="status flex-row full align">
                    <FlagIcon sx={{marginBottom: '4px', height: '1rem'}}/>
                    <p>Priority: </p>
                    {!priorityEdit && (
                      <div className="flex-row ">
                        <p className="project-title">{priority}</p>
                        <Button
                          onClick={(e) => handleUpdateTask(true)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <EditIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
                    {priorityEdit && (
                      <div className="flex-row">
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
                        <Button
                          onClick={(e) => handleUpdateTask(e)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <SaveIcon sx={{ fontSize: "16px" }} />
                        </Button>
                        <Button
                          onClick={(e) => setPriorityEdit(false)}
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                        >
                          <CancelIcon sx={{ fontSize: "16px" }} />
                        </Button>
                      </div>
                    )}
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
                    const dateData = dayjs(comment.createdOn)
                      const diff = dayjs(dateData).fromNow();
                      console.log(diff)

                      return (
                        <div key={comment._id} className="flex-col m-top-1">
                          <div className="flex-row align">
                            <Avatar>{comment.createdInitials}</Avatar>
                            <h4 className="comment-name">{comment.createdBy}</h4>
                            <p className="m-auto">Created {diff} </p>
                            <Button sx={{minWidth: '0.5rem'}} id={comment._id} onClick={(e) => handleDeleteComment(e)}>
                              <DeleteIcon sx={{height: '1rem', color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}/>
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
