import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-au";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { ADD_SUBTASK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '4px',
  pt: 2,
  px: 4,
  pb: 3,
};


const SubtaskModal = ({ taskId, setSubtaskArr }) => {
    const [open, setOpen] = useState(false);
    const [subtask, setSubtask] = useState("");
    const [subtaskDate, setSubtaskDate] = useState(dayjs());
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const [addSubtask] = useMutation(ADD_SUBTASK);

      //Function to add task to db
  const handleAddTask = async (e) => {
    try {
      const { data } = await addSubtask({
        variables: {
            taskId: taskId,
            taskTitle: subtask,
            taskStatus: false,
            dueDate: subtaskDate
        },
      });
      setSubtaskArr(data.addSubtask.subtasks)
    } catch (err) {
      console.error(err);
    }

    setOpen(false);
  };
  
    return (
      <>
        <Button sx={{border: '2px solid var(--main-green)', color: 'var(--main-green)', height: '40px'}} onClick={handleOpen}>Add subtask</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
          <div className="modal-header">
            <Button sx={{ display: "flex", marginLeft: "auto" }} onClick={handleClose}>
              <CloseIcon />
            </Button>
          </div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={subtask}
            onChange={(e) => setSubtask(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due date"
              sx={{ mt: 2, mb: 1, width: "100%" }}
              value={subtaskDate}
              onChange={(newValue) => setSubtaskDate(newValue)}
              id="due-date"
            />
          </LocalizationProvider>



          <div className="flex flex-row gap-1 m-top-2">
            <Button type="cancel" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} id="add-project" onClick={(e) => handleAddTask(e)}>
              Add subtask
            </Button>
          </div>

          </Box>
        </Modal>
      </>
    );
  }

  export default SubtaskModal;
  