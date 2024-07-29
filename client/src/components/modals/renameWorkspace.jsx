import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { UPDATE_WORKSPACE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useUserContext } from '../../utils/contexts';
import { useTheme } from '@mui/material';


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


const RenameWorkspace = () => {
    const [open, setOpen] = useState(false);
    const [wsName, setWsName] = useState("")
    const { userData } = useUserContext();

    const theme = useTheme();
    const pageTheme = theme.palette.mode;

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
console.log(userData)
    const [updateWs] = useMutation(UPDATE_WORKSPACE);

      //Function to add task to db
  const handleUpdate = async (e) => {
    try {
      const { data } = await updateWs({
        variables: {
            _id: userData._id,
            workspaceName: wsName
        },
      });
    } catch (err) {
      console.error(err);
    }

    setOpen(false);
  };
  
    return (
      <>
        <Button  sx={{textTransform: "capitalize", fontSize: '1rem', color: pageTheme === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}} onClick={handleOpen}>
          <div>Rename workspace</div>
          </Button>
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
            value={wsName}
            onChange={(e) => setWsName(e.target.value)}
          />


          <div className="flex flex-row gap-1 m-top-2">
            <Button type="cancel" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} id="add-project" onClick={(e) => handleUpdate(e)}>
              Rename
            </Button>
          </div>

          </Box>
        </Modal>
      </>
    );
  }

  export default RenameWorkspace;
  