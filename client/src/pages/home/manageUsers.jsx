import { useUserContext } from "../../utils/contexts";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { useOpenContext } from "../../utils/openContext";
import { useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { DELETE_USER, SEND_NEW_EMAIL, SEND_EXISTING_EMAIL } from "../../utils/mutations";
import UserTable from "../../components/userTable";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { QUERY_USERS_EMAIL, QUERY_PROJECT } from "../../utils/queries";

const ManageUsers = () => {
  const { userData } = useUserContext();
  const { open, setOpen, drawerWidth } = useOpenContext();
  const theme = useTheme();

  const [users, setUsers] = useState();
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState([]);
  const [errorText, setErrorText] = useState("hidden");
  // const [openAlert, setOpenAlert] = useState(false);
  // const [selectedId, setSelectedId] = useState("");

  const [usersEmail] = useLazyQuery(QUERY_USERS_EMAIL);
  const [proj] = useLazyQuery(QUERY_PROJECT);
  const [sendNewUserEmail] = useMutation(SEND_NEW_EMAIL);
  const [sendExistingUserEmail] = useMutation(SEND_EXISTING_EMAIL);
  const [deleteUser] = useMutation(DELETE_USER);

  //Gets all projects for current user, and other users linked to those projects
  useEffect(() => {
    if (userData.projects) {
      const userArr = [];
      userData.projects.map((proj) => {
        proj.users.forEach((user) => {
          userArr.push(user);
        });
      });
      const uniqueUsers = userArr.filter((user, i) => userArr.findIndex((item) => item._id === user._id) === i);
      const sortProjects = uniqueUsers.map((user) => {
        const projArr = [];
        userData.projects.forEach((proj) => {
          if (proj.users.find((e) => e._id === user._id)) {
            projArr.push(proj);
          }
        });
        return {
          ...user,
          projects: projArr,
        };
      });
      setUsers(sortProjects);
      setProjects(userData.projects);
      setIsLoaded(true);
    }
  }, [userData]);

  //Sends email to an existing user - who can add the project to their space
  const handleSendExistingEmail = async (userToken) => {
    try {
      const { data } = await sendExistingUserEmail({
        variables: {
          email: emailInput,
          senderEmail: userData.email,
          projectId: selectedProjectId,
          projectName: selectedProjectName,
          first: userData.first,
          last: userData.last,
          userToken: userToken,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  //Sends email to an new user - who can sign up and see the project in their space
  const handleSendNewEmail = async () => {
    try {
      const { data } = await sendNewUserEmail({
        variables: {
          email: emailInput,
          senderEmail: userData.email,
          projectId: selectedProjectId,
          projectName: selectedProjectName,
          first: userData.first,
          last: userData.last,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // const handleOpenAlert = (e) => {
  //   setSelectedId(e.currentTarget.id);
  //   setOpenAlert(true);
  // };

  // const handleCloseAlert = () => {
  //   setOpenAlert(false);
  // };

  // const handleDelete = async (e) => {
  //   const data = await deleteUser({ variables: { _id: selectedId } });
  //   setUsers(userData);
  //   setOpenAlert(false);
  // };

  //Sets the project name and project ID to use in the email message
  const handleProjectSelect = async (event) => {
    setSelectedProjectId(event.target.value);
    const { data } = await proj({ variables: { _id: event.target.value } });
    if (data) {
      setSelectedProjectName(data.proj.projectName);
    }
  };

  //Invite button - checks that both fields are populated, and queries if user is already registered
  const handleInviteUser = async (e) => {
    if (emailInput === "") {
      setErrorText("error");
    } else if (selectedProjectId === "") {
      setErrorText("error");
    } else {
      setErrorText("hidden");
      const { data } = await usersEmail({ variables: { email: emailInput } });
      if (data.usersEmail.length === 0) {
        //Sends new email template and asks user to signup
        handleSendNewEmail();
      } else if (data.usersEmail.length === 1) {
        //Sends existing email template and asks user to login
        handleSendExistingEmail(data.usersEmail[0]._id);
      }
    }
  };

  return (
    <UserWrapper className="manage-users">
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
            <div className="flex-row align">
              <h1 className="project-title">Manage users</h1>
            </div>
            <p className="project-description">Invite your team to join your project. On the BASIC plan, you can invite FOUR more users. </p>
            <div className="actions-panel ">
              <div className="search-section flex-row">
                <TextField
                  sx={{ marginTop: "1rem", width: "100%" }}
                  label="Search user"
                  size="small"
                  id="searchUser"
                  value={searchUser}
                  onInput={(e) => setSearchUser(e.target.value)}
                />
                <Button sx={{ backgroundColor: "var(--main-green)", marginTop: "1rem", padding: "0 2rem", marginLeft: '0.5rem'}} className="signup-button" id="signup-button" type="submit">
                  Search
                </Button>
              </div>
              <div className="invite-section">
                <div className="flex-row full">
                  <TextField
                    sx={{ marginTop: "1rem", width: "100%" }}
                    margin="normal"
                    required
                    id="projectName"
                    label="User email"
                    name="newUser"
                    size="small"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <div className="project-select">
                    <FormControl fullWidth>
                      <InputLabel id="project-select-label">Project</InputLabel>
                      <Select
                        sx={{ marginTop: "1rem", marginLeft: '0.5rem' }}
                        labelId="project-select"
                        id="project-select"
                        value={selectedProjectId}
                        label="Project"
                        onChange={handleProjectSelect}
                        size="small"
                      >
                        {userData.projects.map((proj, i) => {
                          return (
                            <MenuItem key={i} value={proj._id} name={proj.projectName}>
                              {proj.projectName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <Button
                    onClick={handleInviteUser}
                    sx={{ backgroundColor: "var(--main-green)", marginTop: "1rem",padding: "0 2rem", marginLeft: '0.5rem' }}
                    className="signup-button"
                    id="signup-button"
                    type="submit"
                  >
                    Invite
                  </Button>
                </div>
                <p id="invite-error" className={errorText}>
                  Please enter email address and project
                </p>
              </div>
            </div>
            {/* {users.projects.map((proj) => (
              <div key={proj._id}>
                <h4>Project: {proj.projectName}</h4>
                {proj.users.map((user) => (
                  <div key={user._id} className="flex-row user-list">
                    <p>
                      {user.first} {user.last}
                    </p>
                    <p>{user.email}</p>

                    <Button id={user._id} name={proj.first} onClick={(e) => handleOpenAlert(e)}>
                      <DeleteIcon sx={{ color: theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.main }} />
                    </Button>
                    <Dialog
                      open={openAlert}
                      onClose={handleCloseAlert}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">Do you want to delete this user?</DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.main }}
                          onClick={handleCloseAlert}
                        >
                          Cancel
                        </Button>
                        <Button
                          sx={{ color: theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.main }}
                          onClick={handleDelete}
                          autoFocus
                        >
                          Delete User
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                ))}
              </div>
            ))} */}
            <UserTable searchUser={searchUser} users={users} projects={projects} />
          </>
        )}
      </Box>
    </UserWrapper>
  );
};

const UserWrapper = styled.div`
  .actions-panel {
    display: flex;
    flex-direction: row;
  }

  .invite-section {
    display: flex;
    flex-direction: column;
    margin-left: auto;
  }
  .search-section,
  .invite-section {
    width: 40%;
  }
  .project-select {
    width: 100%;
  }
  .hidden {
    display: none;
  }
  .error {
    color: red;
    display: block;
  }
`;
export default ManageUsers;
