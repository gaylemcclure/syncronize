import { useUserContext } from "../../utils/contexts";
import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import { useOpenContext } from "../../utils/openContext";
import { useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useMutation} from "@apollo/client";
import { DELETE_USER } from "../../utils/mutations";

const ManageUsers = () => {
    const { userData } = useUserContext();
    const [users, setUsers] = useState();
    const [projects, setProjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const theme = useTheme();
    const { open, setOpen, drawerWidth } = useOpenContext();
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedId, setSelectedId] = useState("")

    const [deleteUser] = useMutation(DELETE_USER)

    useEffect(() => {
        if (userData.projects) {
            setUsers(userData)
            setProjects(userData.projects)
            setIsLoaded(true)

        }
    }, [userData])

    const handleOpenAlert = (e) => {
        setSelectedId(e.currentTarget.id)
        setOpenAlert(true)

    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleDelete = async (e) => {
        const data = await deleteUser({variables: {_id: selectedId}});
        setUsers(userData)
        setOpenAlert(false)

    }


    return (
        <>
        <Box
        component="main"
        sx={{
          width: open ? `calc(100% - ${drawerWidth}px)` : "calc(100% - 65px)",
          flexGrow: 1,
          p: 3,
          marginLeft: open ? `${drawerWidth}px` : "65px",
          
        }}
      >
        {isLoaded && (
            <>
            <h1>Users</h1>
            {users.projects.map((proj) => (
                <div key={proj._id}>
                <h4>Project: {proj.projectName}</h4>
                {proj.users.map((user) => (
                    <div key={user._id} className="flex-row user-list">
                    <p>{user.first} {user.last}</p>
                    <p>{user.email}</p>

                    <Button id={user._id} name={proj.first} onClick={(e) => handleOpenAlert(e)}>
                    <DeleteIcon sx={{color: theme.palette.mode === "dark" ? theme.palette.primary.main: theme.palette.secondary.main}}/>

      </Button>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: theme.palette.mode === "dark" ? theme.palette.primary.main: theme.palette.secondary.main}} onClick={handleCloseAlert}>Cancel</Button>
          <Button sx={{color: theme.palette.mode === "dark" ? theme.palette.primary.main: theme.palette.secondary.main}} onClick={handleDelete} autoFocus>
            Delete User
          </Button>
        </DialogActions>
      </Dialog>
                    </div>
                ))}
                </div>

            ))}
            </>
        )}
        </Box>
        </>
    )
}

export default ManageUsers;