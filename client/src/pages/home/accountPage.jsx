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
// import { useUserContext } from "../../utils/contexts";
import { useQuery } from "@apollo/client";
import { QUERY_ACCOUNT } from "../../utils/queries";

const AccountPage = () => {
  const [nameEdit, setNameEdit] = useState(false);
  const [lastNameEdit, setLastNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [colourEdit, setColourEdit] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [colour, setColour] = useState("");

  const theme = useTheme();
  const { open, setOpen, drawerWidth } = useOpenContext();
  // const { userData } = useUserContext();
  const { data } = useQuery(QUERY_ACCOUNT);
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
      console.log(account);
      setName(account.first);
      setLastName(account.last);
      setEmail(account.email);
      setColour(account.colour)
    }
  }, [account]);

  const handleUpdateUser = () => {};

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
        <div className="flex-row"></div>
        {!nameEdit && (
          <div className="flex-row status ">
            <p className="  project-title">{name}</p>
            <Button
              onClick={() => setNameEdit(true)}
              sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
            >
              <EditIcon sx={{ fontSize: "16px" }} />
            </Button>
          </div>
        )}
        {nameEdit && (
          <div className="flex-row">
            <Avatar sx={{backgroundColor: colour }}></Avatar>
            <div className="flex-col">
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
          </div>
        )}
      </Box>
    </>
  );
};

export default AccountPage;
