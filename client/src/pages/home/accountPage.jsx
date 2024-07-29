import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useOpenContext } from "../../utils/openContext";
import Avatar from "@mui/material/Avatar";
import { useUserContext } from "../../utils/contexts";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { QUERY_ACCOUNT } from "../../utils/queries";
import Divider from "@mui/material/Divider";
import CheckIcon from "@mui/icons-material/Check";

const AccountPage = () => {
  const [nameEdit, setNameEdit] = useState(false);
  const [lastNameEdit, setLastNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [colour, setColour] = useState("");

  const theme = useTheme();
  const { open, setOpen, drawerWidth } = useOpenContext();
  const { userData, setUserData } = useUserContext();
  const [ queryAcc ] = useLazyQuery(QUERY_ACCOUNT)
  const { data } = useQuery(QUERY_ACCOUNT);
  const [updateUser] = useMutation(UPDATE_USER);
  const account = data?.meAccount;

  const colourSelection = [
    { id: 1, colour: "5f48ea" },
    { id: 2, colour: "1090e0" },
    { id: 3, colour: "ee5e99" },
    { id: 4, colour: "b660e0" },
    { id: 5, colour: "6985ff" },
    { id: 6, colour: "e16b16" },
    { id: 7, colour: "0f9d9f" },
    { id: 8, colour: "595d66" },
    { id: 9, colour: "3db88b" },
    { id: 10, colour: "b83d3d" },
  ];

  useEffect(() => {
    if (account) {
      setName(account.first);
      setLastName(account.last);
      setEmail(account.email);
      setColour(account.avatarColour);
      setInitials(account.initials);
      setUserId(account._id);
    }
  }, [account]);

  const handleUpdateUser = () => {};

  const handleAvatar = async (e) => {
    try {
      if (e.target.value) {
        const col = e.currentTarget.value;
        setColour(col);
    
        const { data } = await updateUser({
          variables: {
            _id: userId,
            first: name,
            last: lastName,
            email: email,
            avatarColour: col,
            initials: initials,
          },
        });
        const account = await queryAcc({variables: {_id: userId}})
        setUserData({...userData, avatarColour: account.data.meAccount.avatarColour})
        console.log(userData)
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        <div className="flex-row accounts">
          {colour !== "" && (
            <Avatar sx={{ marginRight: "6rem", backgroundColor: `#${colour}`, fontSize: "50px", height: "10rem", width: "10rem" }}>{initials}</Avatar>
          )}

          <div className="flex-col account-inner">
            {!nameEdit && (
              <div className="flex-row acc-input">
                <p className="  project-title full">{name}</p>
                <Button
                  onClick={() => setNameEdit(true)}
                  sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                >
                  <EditIcon sx={{ fontSize: "16px", marginLeft: "auto" }} />
                </Button>
              </div>
            )}
            {nameEdit && (
              <div className="flex-row ">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  onClick={(e) => handleUpdateUser(e)}
                  sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                >
                  <SaveIcon sx={{ fontSize: "16px" }} />
                </Button>
                <Button
                  onClick={(e) => setNameEdit(false)}
                  sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                >
                  <CancelIcon sx={{ fontSize: "16px" }} />
                </Button>
              </div>
            )}

            {!lastNameEdit && (
              <div className="flex-row acc-input ">
                <p className="  project-title full">{lastName}</p>
                <Button
                  onClick={() => setLastNameEdit(true)}
                  sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                >
                  <EditIcon sx={{ fontSize: "16px", marginLeft: "auto" }} />
                </Button>
              </div>
            )}
            {lastNameEdit && (
              <div className="flex-row">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="last-name"
                  label="Last name"
                  name="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Button
                  onClick={(e) => handleUpdateUser(e)}
                  sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                >
                  <SaveIcon sx={{ fontSize: "16px" }} />
                </Button>
                <Button
                  onClick={(e) => setLastNameEdit(false)}
                  sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                >
                  <CancelIcon sx={{ fontSize: "16px" }} />
                </Button>
              </div>
            )}

            {!emailEdit && (
              <div className="flex-row ">
                <p className="  project-title full">{email}</p>
                <Button
                  onClick={() => setEmailEdit(true)}
                  sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                >
                  <EditIcon sx={{ fontSize: "16px", marginLeft: "auto" }} />
                </Button>
              </div>
            )}
            {emailEdit && (
              <div className="flex-row acc-input">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={(e) => handleUpdateUser(e)}
                  sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                >
                  <SaveIcon sx={{ fontSize: "16px" }} />
                </Button>
                <Button
                  onClick={(e) => setEmailEdit(false)}
                  sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
                >
                  <CancelIcon sx={{ fontSize: "16px", marginLeft: "auto" }} />
                </Button>
              </div>
            )}

            <div className="flex-row">
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                name="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
              <Button
                onClick={(e) => handleUpdateUser(e)}
                sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
              >
                <SaveIcon sx={{ fontSize: "16px", marginLeft: "auto" }} />
              </Button>
            </div>
            <Divider />
            <div className="flex-col ">
              <p>Select avatar colour</p>
              <div className="flex-row">
                {colourSelection.map((colour) => (
                  <Button
                    onClick={(e) => handleAvatar(e)}
                    className="av-colour"
                    id={colour.id}
                    key={colour.id}
                    style={{ backgroundColor: `#${colour.colour}` }}
                    value={colour.colour}
                  >
                    <CheckIcon id={colour.id} />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default AccountPage;
